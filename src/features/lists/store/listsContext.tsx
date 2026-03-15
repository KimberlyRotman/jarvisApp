import AsyncStorage from '@react-native-async-storage/async-storage';
import { generateId } from '@src/shared/utils/id';
import type { AppList, ListItem } from '@src/shared/utils/types';
import React, { createContext, useCallback, useEffect, useState } from 'react';

type ListsContextType = {
  lists: AppList[];
  addList: (name: string) => void;
  removeList: (id: string) => void;
  addItem: (listId: string, text: string) => void;
  removeItem: (listId: string, itemId: string) => void;
  toggleItem: (listId: string, itemId: string) => void;
  findOrCreateList: (name: string) => string;
};

export const ListsContext = createContext<ListsContextType>({
  lists: [],
  addList: () => {},
  removeList: () => {},
  addItem: () => {},
  removeItem: () => {},
  toggleItem: () => {},
  findOrCreateList: () => '',
});

const STORAGE_KEY = '@jarvis_lists';

export function ListsProvider({ children }: { children: React.ReactNode }) {
  const [lists, setLists] = useState<AppList[]>([]);

  useEffect(() => {
    AsyncStorage.getItem(STORAGE_KEY).then((data) => {
      if (data) setLists(JSON.parse(data));
    });
  }, []);

  const persist = useCallback((updated: AppList[]) => {
    setLists(updated);
    AsyncStorage.setItem(STORAGE_KEY, JSON.stringify(updated));
  }, []);

  const addList = useCallback(
    (name: string) => {
      const newList: AppList = { id: generateId(), name, items: [] };
      persist([...lists, newList]);
    },
    [lists, persist],
  );

  const removeList = useCallback(
    (id: string) => {
      persist(lists.filter((l) => l.id !== id));
    },
    [lists, persist],
  );

  const addItem = useCallback(
    (listId: string, text: string) => {
      const updated = lists.map((l) => {
        if (l.id !== listId) return l;
        const item: ListItem = { id: generateId(), text, checked: false };
        return { ...l, items: [...l.items, item] };
      });
      persist(updated);
    },
    [lists, persist],
  );

  const removeItem = useCallback(
    (listId: string, itemId: string) => {
      const updated = lists.map((l) => {
        if (l.id !== listId) return l;
        return { ...l, items: l.items.filter((i) => i.id !== itemId) };
      });
      persist(updated);
    },
    [lists, persist],
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
      persist(updated);
    },
    [lists, persist],
  );

  const findOrCreateList = useCallback(
    (name: string): string => {
      const existing = lists.find(
        (l) => l.name.toLowerCase() === name.toLowerCase(),
      );
      if (existing) return existing.id;
      const id = generateId();
      const newList: AppList = { id, name, items: [] };
      persist([...lists, newList]);
      return id;
    },
    [lists, persist],
  );

  return (
    <ListsContext.Provider
      value={{ lists, addList, removeList, addItem, removeItem, toggleItem, findOrCreateList }}
    >
      {children}
    </ListsContext.Provider>
  );
}
