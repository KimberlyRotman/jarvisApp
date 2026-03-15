import { AIResponse } from '@src/shared/utils/types';

const OPENAI_API_URL = 'https://api.openai.com/v1/chat/completions';

// Replace with your OpenAI API key
const OPENAI_API_KEY = 'process.env.EXPO_PUBLIC_OPENAI_KEY';

const SYSTEM_PROMPT = `Você é um parser de comandos para um assistente pessoal inteligente.
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
- Se o usuário mencionar um livro, filme, série, música → action: "add_list_item" com listName adequado (ex: "Livros", "Filmes").
- Se o usuário pedir para criar uma lista → action: "create_list".
- Se o usuário mencionar algo para fazer, uma tarefa → action: "add_task".
- Se o usuário mencionar um compromisso, reunião, evento com data → action: "add_event".
- Se a mensagem for uma conversa geral → action: "message" com uma resposta útil.
- O campo "reply" SEMPRE deve ter uma resposta amigável em português.
- Retorne APENAS o JSON, sem markdown, sem texto extra.`;

export async function sendMessageToAI(
  userMessage: string,
  existingLists: string[],
): Promise<AIResponse> {
  const contextNote = existingLists.length
    ? `\nListas existentes do usuário: ${existingLists.join(', ')}`
    : '';

  const response = await fetch(OPENAI_API_URL, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${OPENAI_API_KEY}`,
    },
    body: JSON.stringify({
      model: 'gpt-3.5-turbo',
      messages: [
        { role: 'system', content: SYSTEM_PROMPT + contextNote },
        { role: 'user', content: userMessage },
      ],
      temperature: 0.3,
      max_tokens: 300,
    }),
  });

  if (!response.ok) {
    throw new Error(`OpenAI API error: ${response.status}`);
  }

  const data = await response.json();
  const content = data.choices?.[0]?.message?.content ?? '';

  try {
    return JSON.parse(content) as AIResponse;
  } catch {
    return {
      action: 'message',
      reply: content || 'Desculpe, não entendi. Pode reformular?',
    };
  }
}
