import { useContext } from 'react';
import { CalendarContext } from '../store/calendarContext';

export function useCalendar() {
  return useContext(CalendarContext);
}
