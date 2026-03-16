import { DrawerActions, useNavigation } from '@react-navigation/native';
import ProfileAvatar from '@src/shared/components/ProfileAvatar';
import { useLocalSearchParams } from 'expo-router';
import React, { useCallback, useState } from 'react';
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

function formatDate(iso: string): string {
  const d = new Date(iso);
  const hh = String(d.getHours()).padStart(2, '0');
  const mm = String(d.getMinutes()).padStart(2, '0');
  const dd = String(d.getDate()).padStart(2, '0');
  const mo = String(d.getMonth() + 1).padStart(2, '0');
  const yy = d.getFullYear();
  return `${hh}:${mm} — ${dd}/${mo}/${yy}`;
}

export default function ListDetailScreen() {
  const { listId } = useLocalSearchParams<{ listId: string }>();
  const insets = useSafeAreaInsets();
  const navigation = useNavigation();
  const { lists, addItem, removeItem } = useLists();
  const [newItemText, setNewItemText] = useState('');

  const list = lists.find((l) => l.id === listId);

  const openDrawer = useCallback(() => {
    navigation.dispatch(DrawerActions.openDrawer());
  }, [navigation]);

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
          <TouchableOpacity style={styles.menuButton} onPress={openDrawer}>
            <Image
              source={require('@/assets/images/hamburguer.png')}
              style={styles.menuIcon}
            />
          </TouchableOpacity>
          <Text style={styles.headerTitle}>{list.name}</Text>
        </View>
        <View style={{ flexDirection: 'row', alignItems: 'center' }}>
          <TouchableOpacity style={styles.addButton} onPress={() => setNewItemText('')}>
            <Image
              source={require('@/assets/images/AddListMenuIcon.png')}
              style={styles.addIcon}
            />
          </TouchableOpacity>
          <ProfileAvatar />
        </View>
      </View>

      <FlatList
        data={list.items}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <View style={styles.card}>
            <View style={styles.cardContent}>
              <Text style={styles.cardTitle}>{item.text}</Text>
              {item.createdAt && (
                <Text style={styles.cardDate}>{formatDate(item.createdAt)}</Text>
              )}
            </View>
            <TouchableOpacity style={styles.deleteButton} onPress={() => removeItem(listId, item.id)}>
              <Image
                source={require('@/assets/images/trashIconItem.png')}
                style={styles.deleteIcon}
              />
            </TouchableOpacity>
          </View>
        )}
        ListEmptyComponent={<Text style={styles.emptyText}>Nenhum item ainda</Text>}
        contentContainerStyle={{ paddingBottom: 12 }}
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
