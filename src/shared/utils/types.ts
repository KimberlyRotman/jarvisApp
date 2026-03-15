export type ListItem = {
  id: string;
  text: string;
  checked: boolean;
  createdAt: string; // ISO string
};

export type AppList = {
  id: string;
  name: string;
  items: ListItem[];
};

export type Task = {
  id: string;
  title: string;
  done: boolean;
  dueDate?: string;
  createdAt: string; // ISO string
};

export type CalendarEvent = {
  id: string;
  title: string;
  date: string; // ISO string YYYY-MM-DD
  time?: string; // HH:mm
};

export type ChatMessage = {
  id: string;
  role: 'user' | 'assistant';
  text: string;
};

export type AIAction =
  | 'add_list'
  | 'add_list_item'
  | 'remove_list_item'
  | 'add_task'
  | 'remove_task'
  | 'add_event'
  | 'remove_event'
  | 'message';

export type AIResponse = {
  action: AIAction;
  listName?: string;
  itemText?: string;
  taskTitle?: string;
  taskDueDate?: string;
  eventTitle?: string;
  eventDate?: string;
  eventTime?: string;
  reply: string;
};
