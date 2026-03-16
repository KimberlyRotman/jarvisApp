import { DrawerActions, useNavigation } from '@react-navigation/native';
import ProfileAvatar from '@src/shared/components/ProfileAvatar';
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
import { useTasks } from '../hooks/useTasks';
import { styles } from './TasksScreen.styles';

function formatDate(iso: string): string {
  const d = new Date(iso);
  const hh = String(d.getHours()).padStart(2, '0');
  const mm = String(d.getMinutes()).padStart(2, '0');
  const dd = String(d.getDate()).padStart(2, '0');
  const mo = String(d.getMonth() + 1).padStart(2, '0');
  const yy = d.getFullYear();
  return `${hh}:${mm} — ${dd}/${mo}/${yy}`;
}

export default function TasksScreen() {
  const insets = useSafeAreaInsets();
  const navigation = useNavigation();
  const { tasks, addTask, removeTask, toggleTask } = useTasks();
  const [newTaskTitle, setNewTaskTitle] = useState('');

  const openDrawer = useCallback(() => {
    navigation.dispatch(DrawerActions.openDrawer());
  }, [navigation]);

  const handleAddTask = () => {
    const title = newTaskTitle.trim();
    if (!title) return;
    addTask(title);
    setNewTaskTitle('');
  };

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
          <Text style={styles.headerTitle}>Tasks</Text>
        </View>
        <View style={{ flexDirection: 'row', alignItems: 'center' }}>
          <TouchableOpacity style={styles.addHeaderButton}>
            <Image
              source={require('@/assets/images/AddListMenuIcon.png')}
              style={styles.addHeaderIcon}
            />
          </TouchableOpacity>
          <ProfileAvatar />
        </View>
      </View>

      <FlatList
        data={tasks}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <View style={styles.card}>
            <TouchableOpacity
              style={[styles.checkbox, item.done && styles.checkboxDone]}
              onPress={() => toggleTask(item.id)}
            >
              {item.done && <Text style={styles.checkMark}>✓</Text>}
            </TouchableOpacity>
            <View style={styles.cardContent}>
              <Text style={[styles.cardTitle, item.done && styles.cardTitleDone]}>
                {item.title}
              </Text>
              {item.createdAt && (
                <Text style={styles.cardDate}>{formatDate(item.createdAt)}</Text>
              )}
              {item.dueDate && (
                <Text style={styles.cardDate}>Vence: {item.dueDate}</Text>
              )}
            </View>
            <TouchableOpacity style={styles.deleteButton} onPress={() => removeTask(item.id)}>
              <Image
                source={require('@/assets/images/trashIconItem.png')}
                style={styles.deleteIcon}
              />
            </TouchableOpacity>
          </View>
        )}
        ListEmptyComponent={<Text style={styles.emptyText}>Nenhuma tarefa ainda</Text>}
        contentContainerStyle={{ paddingBottom: 12 }}
      />

      <View style={[styles.inputRow, { paddingBottom: insets.bottom + 12 }]}>
        <TextInput
          style={styles.input}
          placeholder="Nova tarefa..."
          placeholderTextColor="#888"
          value={newTaskTitle}
          onChangeText={setNewTaskTitle}
          onSubmitEditing={handleAddTask}
          returnKeyType="done"
        />
        <TouchableOpacity style={styles.addButton} onPress={handleAddTask}>
          <Text style={styles.addButtonText}>+</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}
