import { DrawerContentComponentProps } from '@react-navigation/drawer';
import { useLists } from '@src/features/lists/hooks/useLists';
import { useRouter } from 'expo-router';
import React, { useState } from 'react';
import {
    Image,
    ScrollView,
    Text,
    TextInput,
    TouchableOpacity,
    View,
} from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { styles } from './DrawerContent.styles';

export default function DrawerContent(props: DrawerContentComponentProps) {
  const insets = useSafeAreaInsets();
  const router = useRouter();
  const { lists, addList, removeList } = useLists();
  const [showNewListInput, setShowNewListInput] = useState(false);
  const [newListName, setNewListName] = useState('');

  const closeDrawer = () => props.navigation.closeDrawer();

  const navigateTo = (route: string) => {
    closeDrawer();
    router.push(route as any);
  };

  const handleCreateList = () => {
    const name = newListName.trim();
    if (!name) return;
    addList(name);
    setNewListName('');
    setShowNewListInput(false);
  };

  return (
    <View style={[styles.container, { paddingTop: insets.top }]}>
      <View style={styles.topSection}>
        <TouchableOpacity style={styles.closeButton} onPress={closeDrawer}>
          <Image
            source={require('@/assets/images/closeMenuIcon.png')}
            style={styles.closeIcon}
          />
        </TouchableOpacity>
      </View>

      <ScrollView style={{ flex: 1 }}>
        {/* Calendar */}
        <TouchableOpacity style={styles.menuItem} onPress={() => navigateTo('/(main)/calendar')}>
          <Image
            source={require('@/assets/images/calendarMenuIcon.png')}
            style={styles.menuIcon}
          />
          <Text style={styles.menuText}>Calendário</Text>
        </TouchableOpacity>

        {/* Tasks */}
        <TouchableOpacity style={styles.menuItem} onPress={() => navigateTo('/(main)/tasks')}>
          <Image
            source={require('@/assets/images/tasksMenuIcon.png')}
            style={styles.menuIcon}
          />
          <Text style={styles.menuText}>Tasks</Text>
        </TouchableOpacity>

        {/* Lists Section */}
        <Text style={styles.sectionTitle}>Listas</Text>
        {lists.map((list) => (
          <TouchableOpacity
            key={list.id}
            style={styles.listMenuItem}
            onPress={() => navigateTo(`/(main)/list/${list.id}`)}
          >
            <Text style={styles.listMenuText}>{list.name}</Text>
            <TouchableOpacity
              style={styles.listDeleteBtn}
              onPress={() => removeList(list.id)}
            >
              <Image
                source={require('@/assets/images/trashIconItem.png')}
                style={styles.listDeleteIcon}
              />
            </TouchableOpacity>
          </TouchableOpacity>
        ))}

        {/* Add New List */}
        {showNewListInput ? (
          <TextInput
            style={styles.newListInput}
            placeholder="Nome da lista..."
            placeholderTextColor="#888"
            value={newListName}
            onChangeText={setNewListName}
            onSubmitEditing={handleCreateList}
            onBlur={() => {
              if (!newListName.trim()) setShowNewListInput(false);
            }}
            autoFocus
            returnKeyType="done"
          />
        ) : (
          <TouchableOpacity
            style={styles.addListButton}
            onPress={() => setShowNewListInput(true)}
          >
            <Image
              source={require('@/assets/images/AddListMenuIcon.png')}
              style={styles.addListIcon}
            />
            <Text style={styles.addListText}>Nova Lista</Text>
          </TouchableOpacity>
        )}
      </ScrollView>

      {/* Chat Button */}
      <View style={[styles.bottomSection, { paddingBottom: insets.bottom + 20 }]}>
        <TouchableOpacity style={styles.chatButton} onPress={() => navigateTo('/(main)/chat')}>
          <Image
            source={require('@/assets/images/chatbutton.png')}
            style={styles.chatButtonIcon}
            resizeMode="contain"
          />
        </TouchableOpacity>
      </View>
    </View>
  );
}
