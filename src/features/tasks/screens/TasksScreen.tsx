import { useRouter } from 'expo-router';
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
import { useTasks } from '../hooks/useTasks';
import { styles } from './TasksScreen.styles';

export default function TasksScreen() {
  const router = useRouter();
  const insets = useSafeAreaInsets();
  const { tasks, addTask, removeTask, toggleTask } = useTasks();
  const [newTaskTitle, setNewTaskTitle] = useState('');

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
          <TouchableOpacity style={styles.backButton} onPress={() => router.back()}>
            <Text style={styles.backText}>←</Text>
          </TouchableOpacity>
          <Text style={styles.headerTitle}>Tasks</Text>
        </View>
      </View>

      <FlatList
        data={tasks}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <View style={styles.taskItem}>
            <TouchableOpacity
              style={[styles.checkbox, item.done && styles.checkboxDone]}
              onPress={() => toggleTask(item.id)}
            >
              {item.done && <Text style={styles.checkMark}>✓</Text>}
            </TouchableOpacity>
            <View style={styles.taskContent}>
              <Text style={[styles.taskTitle, item.done && styles.taskTitleDone]}>
                {item.title}
              </Text>
              {item.dueDate && <Text style={styles.taskDate}>{item.dueDate}</Text>}
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
