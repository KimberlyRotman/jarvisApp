import { useLocalSearchParams, useRouter } from 'expo-router';
import React, { useState } from 'react';
import {
    FlatList,
    Image,
    Text,
    TextInput,
    TouchableOpacity,
    View,
} from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { useLists } from '../hooks/useLists';
import { styles } from './ListDetailScreen.styles';

export default function ListDetailScreen() {
  const { listId } = useLocalSearchParams<{ listId: string }>();
  const router = useRouter();
  const insets = useSafeAreaInsets();
  const { lists, addItem, removeItem, toggleItem } = useLists();
  const [newItemText, setNewItemText] = useState('');

  const list = lists.find((l) => l.id === listId);

  const handleAddItem = () => {
    const text = newItemText.trim();
    if (!text || !listId) return;
    addItem(listId, text);
    setNewItemText('');
  };

  if (!list) {
    return (
      <View style={styles.container}>
        <Text style={styles.emptyText}>Lista não encontrada</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <View style={[styles.header, { paddingTop: insets.top + 12 }]}>
        <View style={styles.headerLeft}>
          <TouchableOpacity style={styles.backButton} onPress={() => router.back()}>
            <Text style={styles.backText}>←</Text>
          </TouchableOpacity>
          <Text style={styles.headerTitle}>{list.name}</Text>
        </View>
      </View>

      <FlatList
        data={list.items}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <View style={styles.listItem}>
            <TouchableOpacity
              style={[styles.checkbox, item.checked && styles.checkboxChecked]}
              onPress={() => toggleItem(listId, item.id)}
            >
              {item.checked && <Text style={styles.checkMark}>✓</Text>}
            </TouchableOpacity>
            <Text style={[styles.itemText, item.checked && styles.itemTextChecked]}>
              {item.text}
            </Text>
            <TouchableOpacity style={styles.deleteButton} onPress={() => removeItem(listId, item.id)}>
              <Image
                source={require('@/assets/images/trashIconItem.png')}
                style={styles.deleteIcon}
              />
            </TouchableOpacity>
          </View>
        )}
        ListEmptyComponent={<Text style={styles.emptyText}>Nenhum item ainda</Text>}
      />

      <View style={[styles.inputRow, { paddingBottom: insets.bottom + 12 }]}>
        <TextInput
          style={styles.input}
          placeholder="Novo item..."
          placeholderTextColor="#888"
          value={newItemText}
          onChangeText={setNewItemText}
          onSubmitEditing={handleAddItem}
          returnKeyType="done"
        />
        <TouchableOpacity style={styles.addItemButton} onPress={handleAddItem}>
          <Image
            source={require('@/assets/images/addItemListIcon.png')}
            style={styles.addItemIcon}
          />
        </TouchableOpacity>
      </View>
    </View>
  );
}
