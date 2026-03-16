import { AIResponse } from '@src/shared/utils/types';

const GEMINI_API_KEY = process.env.EXPO_PUBLIC_GEMINI_KEY;
const GEMINI_MODEL = 'gemini-2.0-flash-lite';
const GEMINI_API_URL = `https://generativelanguage.googleapis.com/v1beta/models/${GEMINI_MODEL}:generateContent`;

const MAX_RETRIES = 3;
const INITIAL_DELAY_MS = 2000;

const SYSTEM_PROMPT = `
Você é um parser de comandos para um assistente pessoal inteligente.

O usuário vai enviar mensagens em linguagem natural.

Sua função é interpretar o que o usuário quer e retornar SEMPRE um JSON válido com a seguinte estrutura:

{
 "action": "add_list_item" | "create_list" | "add_task" | "add_event" | "message",
 "listName": "nome da lista (quando aplicável)",
 "itemText": "texto do item (quando aplicável)",
 "taskTitle": "título da tarefa (quando aplicável)",
 "taskDueDate": "YYYY-MM-DD (quando aplicável)",
 "eventTitle": "título do evento (quando aplicável)",
 "eventDate": "YYYY-MM-DD (quando aplicável)",
 "eventTime": "HH:mm (quando aplicável)",
 "reply": "mensagem amigável de confirmação para o usuário"
}

Regras:
- Se o usuário mencionar um livro, filme, série, música → action: "add_list_item".
- Se o usuário pedir para criar uma lista → action: "create_list".
- Se o usuário mencionar algo para fazer → action: "add_task".
- Se mencionar compromisso com data → action: "add_event".
- Conversa geral → action: "message".
- O campo "reply" deve estar em português.
- Retorne APENAS o JSON.
`;

export async function sendMessageToAI(
  userMessage: string,
  existingLists: string[],
): Promise<AIResponse> {
  const contextNote = existingLists.length
    ? `\nListas existentes do usuário: ${existingLists.join(', ')}`
    : '';

  const body = JSON.stringify({
    system_instruction: {
      parts: [{ text: SYSTEM_PROMPT + contextNote }],
    },
    contents: [
      {
        role: 'user',
        parts: [{ text: userMessage }],
      },
    ],
    generationConfig: {
      temperature: 0.3,
      maxOutputTokens: 300,
    },
  });

  let lastError: Error | null = null;

  for (let attempt = 0; attempt < MAX_RETRIES; attempt++) {
    const response = await fetch(`${GEMINI_API_URL}?key=${GEMINI_API_KEY}`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body,
    });

    if (response.status === 429) {
      const delay = INITIAL_DELAY_MS * Math.pow(2, attempt);
      lastError = new Error(`Gemini API rate limited (429). Retrying in ${delay}ms...`);
      await new Promise((resolve) => setTimeout(resolve, delay));
      continue;
    }

    if (!response.ok) {
      throw new Error(`Gemini API error: ${response.status}`);
    }

    const data = await response.json();
    const content = data.candidates?.[0]?.content?.parts?.[0]?.text ?? '';

    // Gemini pode retornar o JSON dentro de um bloco markdown ```json ... ```
    const jsonMatch = content.match(/```json\s*([\s\S]*?)```/) || content.match(/({[\s\S]*})/);
    const jsonString = jsonMatch ? jsonMatch[1].trim() : content.trim();

    try {
      return JSON.parse(jsonString) as AIResponse;
    } catch {
      return {
        action: 'message',
        reply: content || 'Desculpe, não entendi. Pode reformular?',
      };
    }
  }

  throw lastError ?? new Error('Gemini API: limite de tentativas excedido.');
}
