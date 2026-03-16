import { DrawerActions, useNavigation } from '@react-navigation/native';
import { useCalendar } from '@src/features/calendar/hooks/useCalendar';
import { useLists } from '@src/features/lists/hooks/useLists';
import { useTasks } from '@src/features/tasks/hooks/useTasks';
import { sendMessageToAI } from '@src/services/geminiClient';
import ProfileAvatar from '@src/shared/components/ProfileAvatar';
import { generateId } from '@src/shared/utils/id';
import type { ChatMessage } from '@src/shared/utils/types';
import React, { useCallback, useRef, useState } from 'react';
import {
  FlatList,
  Image,
  ImageBackground,
  KeyboardAvoidingView,
  Platform,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import ChatBubble from '../components/ChatBubble';
import { styles } from './ChatScreen.styles';

export default function ChatScreen() {
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [input, setInput] = useState('');
  const [sending, setSending] = useState(false);
  const flatListRef = useRef<FlatList>(null);
  const insets = useSafeAreaInsets();
  const navigation = useNavigation();

  const { lists, findOrCreateList, addItem, removeItemByText } = useLists();
  const { addTask, removeTaskByTitle } = useTasks();
  const { addEvent, removeEventByTitle } = useCalendar();

  const handleSend = useCallback(async () => {
    const text = input.trim();
    if (!text || sending) return;

    const userMsg: ChatMessage = { id: generateId(), role: 'user', text };
    setMessages((prev) => [...prev, userMsg]);
    setInput('');
    setSending(true);

    try {
      const listNames = lists.map((l) => l.name);
      const aiResponse = await sendMessageToAI(text, listNames);

      switch (aiResponse.action) {
        case 'add_list': {
          if (aiResponse.listName) {
            findOrCreateList(aiResponse.listName);
          }
          break;
        }
        case 'add_list_item': {
          if (aiResponse.listName && aiResponse.itemText) {
            const listId = findOrCreateList(aiResponse.listName);
            addItem(listId, aiResponse.itemText);
          }
          break;
        }
        case 'remove_list_item': {
          if (aiResponse.listName && aiResponse.itemText) {
            removeItemByText(aiResponse.listName, aiResponse.itemText);
          }
          break;
        }
        case 'add_task': {
          if (aiResponse.taskTitle) {
            addTask(aiResponse.taskTitle, aiResponse.taskDueDate);
          }
          break;
        }
        case 'remove_task': {
          if (aiResponse.taskTitle) {
            removeTaskByTitle(aiResponse.taskTitle);
          }
          break;
        }
        case 'add_event': {
          if (aiResponse.eventTitle && aiResponse.eventDate) {
            addEvent(aiResponse.eventTitle, aiResponse.eventDate, aiResponse.eventTime);
          }
          break;
        }
        case 'remove_event': {
          if (aiResponse.eventTitle) {
            removeEventByTitle(aiResponse.eventTitle);
          }
          break;
        }
      }

      const aiMsg: ChatMessage = {
        id: generateId(),
        role: 'assistant',
        text: aiResponse.reply,
      };
      setMessages((prev) => [...prev, aiMsg]);
    } catch (error) {
        console.log("Erro ao chamar IA:", error);

        const errMsg: ChatMessage = {
        id: generateId(),
        role: 'assistant',
        text: 'Desculpe, ocorreu um erro. Tente novamente.',
  };
      setMessages((prev) => [...prev, errMsg]);
    } finally {
      setSending(false);
    }
  }, [input, sending, lists, findOrCreateList, addItem, removeItemByText, addTask, removeTaskByTitle, addEvent, removeEventByTitle]);

  const openDrawer = useCallback(() => {
    navigation.dispatch(DrawerActions.openDrawer());
  }, [navigation]);

  return (
    <KeyboardAvoidingView
      style={styles.container}
      behavior={Platform.OS === 'ios' ? 'padding' : undefined}
      keyboardVerticalOffset={0}
    >
      <ImageBackground
        source={require('@/assets/images/hexagonos.png')}
        style={styles.container}
        imageStyle={styles.backgroundImage}
      >
        {/* Header */}
        <View style={[styles.header, { paddingTop: insets.top + 12 }]}>
          <TouchableOpacity style={styles.menuButton} onPress={openDrawer}>
            <Image
              source={require('@/assets/images/hamburguer.png')}
              style={styles.menuIcon}
            />
          </TouchableOpacity>
          <Text style={styles.headerTitle}>Jarvis</Text>
          <ProfileAvatar />
        </View>

        {/* Messages */}
        <FlatList
          ref={flatListRef}
          data={messages}
          keyExtractor={(item) => item.id}
          renderItem={({ item }) => <ChatBubble message={item} />}
          style={styles.messagesList}
          contentContainerStyle={styles.messagesContent}
          onContentSizeChange={() =>
            flatListRef.current?.scrollToEnd({ animated: true })
          }
        />

        {/* Input */}
        <View style={[styles.inputContainer, { paddingBottom: insets.bottom + 10 }]}>
          <TextInput
            style={styles.textInput}
            placeholder="Digite sua mensagem..."
            placeholderTextColor="#888"
            value={input}
            onChangeText={setInput}
            multiline
            onSubmitEditing={handleSend}
            returnKeyType="send"
            editable={!sending}
          />
          <TouchableOpacity
            style={[styles.sendButton, (sending || !input.trim()) && styles.sendButtonDisabled]}
            onPress={handleSend}
            disabled={sending || !input.trim()}
            activeOpacity={0.7}
          >
            <Image
              source={require('@/assets/images/sendicon.png')}
              style={styles.sendIcon}
            />
          </TouchableOpacity>
        </View>
      </ImageBackground>
    </KeyboardAvoidingView>
  );
}