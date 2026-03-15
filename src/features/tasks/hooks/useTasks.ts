import { useContext } from 'react';
import { TasksContext } from '../store/tasksContext';

export function useTasks() {
  return useContext(TasksContext);
}
