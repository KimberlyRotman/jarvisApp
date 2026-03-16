import AsyncStorage from '@react-native-async-storage/async-storage';
import { useAuth } from '@src/features/auth/hooks/useAuth';
import type { JarvisData } from '@src/services/googleDriveSync';
import { loadFromDrive, saveToDrive } from '@src/services/googleDriveSync';
import { generateId } from '@src/shared/utils/id';
import type { AppList, CalendarEvent, ListItem, Task } from '@src/shared/utils/types';
import React, {
    createContext,
    useCallback,
    useContext,
    useEffect,
    useRef,
    useState,
} from 'react';

// ── Context types ──────────────────────────────────────────
type DataContextType = {
  // Lists
  lists: AppList[];
  addList: (name: string) => void;
  removeList: (id: string) => void;
  addItem: (listId: string, text: string) => void;
  removeItem: (listId: string, itemId: string) => void;
  removeItemByText: (listName: string, itemText: string) => void;
  toggleItem: (listId: string, itemId: string) => void;
  findOrCreateList: (name: string) => string;
  // Tasks
  tasks: Task[];
  addTask: (title: string, dueDate?: string) => void;
  removeTask: (id: string) => void;
  removeTaskByTitle: (title: string) => void;
  toggleTask: (id: string) => void;
  // Calendar
  events: CalendarEvent[];
  addEvent: (title: string, date: string, time?: string) => void;
  removeEvent: (id: string) => void;
  removeEventByTitle: (title: string) => void;
};

const DataContext = createContext<DataContextType | null>(null);

const LOCAL_CACHE_KEY = '@jarvis_data';

export function DataProvider({ children }: { children: React.ReactNode }) {
  const { token } = useAuth();

  const [lists, setLists] = useState<AppList[]>([]);
  const [tasks, setTasks] = useState<Task[]>([]);
  const [events, setEvents] = useState<CalendarEvent[]>([]);
  const [loaded, setLoaded] = useState(false);

  // Keep a ref to the latest data for debounced saves
  const dataRef = useRef<JarvisData>({ lists: [], tasks: [], events: [] });
  const saveTimer = useRef<ReturnType<typeof setTimeout> | null>(null);

  // ── Persist helper: writes to local cache + schedules Drive sync ──
  const persist = useCallback(
    (next: JarvisData) => {
      dataRef.current = next;
      // Always update local cache immediately
      AsyncStorage.setItem(LOCAL_CACHE_KEY, JSON.stringify(next));
      // Debounce the Drive write to avoid excessive API calls
      if (saveTimer.current) clearTimeout(saveTimer.current);
      if (token) {
        saveTimer.current = setTimeout(() => {
          saveToDrive(token, dataRef.current).catch(() => {
            // Silent fail – local cache is the safety net
          });
        }, 1500);
      }
    },
    [token],
  );

  // ── Load data on mount: try Drive first, fallback to local cache ──
  useEffect(() => {
    if (loaded) return;
    (async () => {
      let data: JarvisData | null = null;

      // Try Google Drive first
      if (token) {
        try {
          data = await loadFromDrive(token);
        } catch {
          // Drive unavailable, fall through to local
        }
      }

      // Fallback to local cache
      if (!data || (!data.lists.length && !data.tasks.length && !data.events.length)) {
        try {
          const cached = await AsyncStorage.getItem(LOCAL_CACHE_KEY);
          if (cached) {
            const local = JSON.parse(cached) as JarvisData;
            // If local has data and Drive was empty, push local to Drive
            if (local.lists.length || local.tasks.length || local.events.length) {
              data = local;
              if (token) {
                saveToDrive(token, local).catch(() => {});
              }
            }
          }
        } catch {
          // ignore
        }
      }

      if (data) {
        setLists(data.lists);
        setTasks(data.tasks);
        setEvents(data.events);
        dataRef.current = data;
      }
      setLoaded(true);
    })();
  }, [token, loaded]);

  // ── Helpers to update state + trigger persist ──
  const updateLists = useCallback(
    (next: AppList[]) => {
      setLists(next);
      persist({ ...dataRef.current, lists: next });
    },
    [persist],
  );

  const updateTasks = useCallback(
    (next: Task[]) => {
      setTasks(next);
      persist({ ...dataRef.current, tasks: next });
    },
    [persist],
  );

  const updateEvents = useCallback(
    (next: CalendarEvent[]) => {
      setEvents(next);
      persist({ ...dataRef.current, events: next });
    },
    [persist],
  );

  // ── Lists ──────────────────────────────────────────────────
  const addList = useCallback(
    (name: string) => {
      const newList: AppList = { id: generateId(), name, items: [] };
      updateLists([...lists, newList]);
    },
    [lists, updateLists],
  );

  const removeList = useCallback(
    (id: string) => updateLists(lists.filter((l) => l.id !== id)),
    [lists, updateLists],
  );

  const addItem = useCallback(
    (listId: string, text: string) => {
      const updated = lists.map((l) => {
        if (l.id !== listId) return l;
        const item: ListItem = {
          id: generateId(),
          text,
          checked: false,
          createdAt: new Date().toISOString(),
        };
        return { ...l, items: [...l.items, item] };
      });
      updateLists(updated);
    },
    [lists, updateLists],
  );

  const removeItem = useCallback(
    (listId: string, itemId: string) => {
      const updated = lists.map((l) => {
        if (l.id !== listId) return l;
        return { ...l, items: l.items.filter((i) => i.id !== itemId) };
      });
      updateLists(updated);
    },
    [lists, updateLists],
  );

  const removeItemByText = useCallback(
    (listName: string, itemText: string) => {
      const updated = lists.map((l) => {
        if (l.name.toLowerCase() !== listName.toLowerCase()) return l;
        const idx = l.items.findIndex(
          (i) => i.text.toLowerCase() === itemText.toLowerCase(),
        );
        if (idx === -1) return l;
        const items = [...l.items];
        items.splice(idx, 1);
        return { ...l, items };
      });
      updateLists(updated);
    },
    [lists, updateLists],
  );

  const toggleItem = useCallback(
    (listId: string, itemId: string) => {
      const updated = lists.map((l) => {
        if (l.id !== listId) return l;
        return {
          ...l,
          items: l.items.map((i) =>
            i.id === itemId ? { ...i, checked: !i.checked } : i,
          ),
        };
      });
      updateLists(updated);
    },
    [lists, updateLists],
  );

  const findOrCreateList = useCallback(
    (name: string): string => {
      const existing = lists.find(
        (l) => l.name.toLowerCase() === name.toLowerCase(),
      );
      if (existing) return existing.id;
      const id = generateId();
      const newList: AppList = { id, name, items: [] };
      updateLists([...lists, newList]);
      return id;
    },
    [lists, updateLists],
  );

  // ── Tasks ──────────────────────────────────────────────────
  const addTask = useCallback(
    (title: string, dueDate?: string) => {
      const task: Task = {
        id: generateId(),
        title,
        done: false,
        dueDate,
        createdAt: new Date().toISOString(),
      };
      updateTasks([...tasks, task]);
    },
    [tasks, updateTasks],
  );

  const removeTask = useCallback(
    (id: string) => updateTasks(tasks.filter((t) => t.id !== id)),
    [tasks, updateTasks],
  );

  const removeTaskByTitle = useCallback(
    (title: string) => {
      const idx = tasks.findIndex(
        (t) => t.title.toLowerCase() === title.toLowerCase(),
      );
      if (idx === -1) return;
      const updated = [...tasks];
      updated.splice(idx, 1);
      updateTasks(updated);
    },
    [tasks, updateTasks],
  );

  const toggleTask = useCallback(
    (id: string) => {
      const updated = tasks.map((t) =>
        t.id === id ? { ...t, done: !t.done } : t,
      );
      updateTasks(updated);
    },
    [tasks, updateTasks],
  );

  // ── Calendar ───────────────────────────────────────────────
  const addEvent = useCallback(
    (title: string, date: string, time?: string) => {
      const event: CalendarEvent = { id: generateId(), title, date, time };
      updateEvents([...events, event]);
    },
    [events, updateEvents],
  );

  const removeEvent = useCallback(
    (id: string) => updateEvents(events.filter((e) => e.id !== id)),
    [events, updateEvents],
  );

  const removeEventByTitle = useCallback(
    (title: string) => {
      const idx = events.findIndex(
        (e) => e.title.toLowerCase() === title.toLowerCase(),
      );
      if (idx === -1) return;
      const updated = [...events];
      updated.splice(idx, 1);
      updateEvents(updated);
    },
    [events, updateEvents],
  );

  return (
    <DataContext.Provider
      value={{
        lists,
        addList,
        removeList,
        addItem,
        removeItem,
        removeItemByText,
        toggleItem,
        findOrCreateList,
        tasks,
        addTask,
        removeTask,
        removeTaskByTitle,
        toggleTask,
        events,
        addEvent,
        removeEvent,
        removeEventByTitle,
      }}
    >
      {children}
    </DataContext.Provider>
  );
}

// ── Convenience hooks ────────────────────────────────────────
function useData() {
  const ctx = useContext(DataContext);
  if (!ctx) throw new Error('useData must be used within DataProvider');
  return ctx;
}

export function useLists() {
  const d = useData();
  return {
    lists: d.lists,
    addList: d.addList,
    removeList: d.removeList,
    addItem: d.addItem,
    removeItem: d.removeItem,
    removeItemByText: d.removeItemByText,
    toggleItem: d.toggleItem,
    findOrCreateList: d.findOrCreateList,
  };
}

export function useTasks() {
  const d = useData();
  return {
    tasks: d.tasks,
    addTask: d.addTask,
    removeTask: d.removeTask,
    removeTaskByTitle: d.removeTaskByTitle,
    toggleTask: d.toggleTask,
  };
}

export function useCalendar() {
  const d = useData();
  return {
    events: d.events,
    addEvent: d.addEvent,
    removeEvent: d.removeEvent,
    removeEventByTitle: d.removeEventByTitle,
  };
}
