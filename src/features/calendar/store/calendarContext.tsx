import AsyncStorage from '@react-native-async-storage/async-storage';
import { generateId } from '@src/shared/utils/id';
import type { CalendarEvent } from '@src/shared/utils/types';
import React, { createContext, useCallback, useEffect, useState } from 'react';

type CalendarContextType = {
  events: CalendarEvent[];
  addEvent: (title: string, date: string, time?: string) => void;
  removeEvent: (id: string) => void;
  removeEventByTitle: (title: string) => void;
};

export const CalendarContext = createContext<CalendarContextType>({
  events: [],
  addEvent: () => {},
  removeEvent: () => {},
  removeEventByTitle: () => {},
});

const STORAGE_KEY = '@jarvis_calendar';

export function CalendarProvider({ children }: { children: React.ReactNode }) {
  const [events, setEvents] = useState<CalendarEvent[]>([]);

  useEffect(() => {
    AsyncStorage.getItem(STORAGE_KEY).then((data) => {
      if (data) setEvents(JSON.parse(data));
    });
  }, []);

  const persist = useCallback((updated: CalendarEvent[]) => {
    setEvents(updated);
    AsyncStorage.setItem(STORAGE_KEY, JSON.stringify(updated));
  }, []);

  const addEvent = useCallback(
    (title: string, date: string, time?: string) => {
      const event: CalendarEvent = { id: generateId(), title, date, time };
      persist([...events, event]);
    },
    [events, persist],
  );

  const removeEvent = useCallback(
    (id: string) => {
      persist(events.filter((e) => e.id !== id));
    },
    [events, persist],
  );

  const removeEventByTitle = useCallback(
    (title: string) => {
      const idx = events.findIndex(
        (e) => e.title.toLowerCase() === title.toLowerCase(),
      );
      if (idx === -1) return;
      const updated = [...events];
      updated.splice(idx, 1);
      persist(updated);
    },
    [events, persist],
  );

  return (
    <CalendarContext.Provider value={{ events, addEvent, removeEvent, removeEventByTitle }}>
      {children}
    </CalendarContext.Provider>
  );
}
