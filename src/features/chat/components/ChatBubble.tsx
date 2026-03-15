import type { ChatMessage } from '@src/shared/utils/types';
import React from 'react';
import { Text, View } from 'react-native';
import { styles } from './ChatBubble.styles';

type Props = {
  message: ChatMessage;
};

export default function ChatBubble({ message }: Props) {
  const isUser = message.role === 'user';

  return (
    <View style={isUser ? styles.userRow : styles.aiRow}>
      <View style={isUser ? styles.userBubble : styles.aiBubble}>
        <Text style={isUser ? styles.userText : styles.aiText}>{message.text}</Text>
      </View>
    </View>
  );
}
