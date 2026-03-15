import AsyncStorage from '@react-native-async-storage/async-storage';
import { generateId } from '@src/shared/utils/id';
import type { Task } from '@src/shared/utils/types';
import React, { createContext, useCallback, useEffect, useState } from 'react';

type TasksContextType = {
  tasks: Task[];
  addTask: (title: string, dueDate?: string) => void;
  removeTask: (id: string) => void;
  removeTaskByTitle: (title: string) => void;
  toggleTask: (id: string) => void;
};

export const TasksContext = createContext<TasksContextType>({
  tasks: [],
  addTask: () => {},
  removeTask: () => {},
  removeTaskByTitle: () => {},
  toggleTask: () => {},
});

const STORAGE_KEY = '@jarvis_tasks';

export function TasksProvider({ children }: { children: React.ReactNode }) {
  const [tasks, setTasks] = useState<Task[]>([]);

  useEffect(() => {
    AsyncStorage.getItem(STORAGE_KEY).then((data) => {
      if (data) setTasks(JSON.parse(data));
    });
  }, []);

  const persist = useCallback((updated: Task[]) => {
    setTasks(updated);
    AsyncStorage.setItem(STORAGE_KEY, JSON.stringify(updated));
  }, []);

  const addTask = useCallback(
    (title: string, dueDate?: string) => {
      const task: Task = { id: generateId(), title, done: false, dueDate, createdAt: new Date().toISOString() };
      persist([...tasks, task]);
    },
    [tasks, persist],
  );

  const removeTask = useCallback(
    (id: string) => {
      persist(tasks.filter((t) => t.id !== id));
    },
    [tasks, persist],
  );

  const removeTaskByTitle = useCallback(
    (title: string) => {
      const idx = tasks.findIndex(
        (t) => t.title.toLowerCase() === title.toLowerCase(),
      );
      if (idx === -1) return;
      const updated = [...tasks];
      updated.splice(idx, 1);
      persist(updated);
    },
    [tasks, persist],
  );

  const toggleTask = useCallback(
    (id: string) => {
      const updated = tasks.map((t) =>
        t.id === id ? { ...t, done: !t.done } : t,
      );
      persist(updated);
    },
    [tasks, persist],
  );

  return (
    <TasksContext.Provider value={{ tasks, addTask, removeTask, removeTaskByTitle, toggleTask }}>
      {children}
    </TasksContext.Provider>
  );
}
