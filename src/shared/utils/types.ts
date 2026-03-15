export type ListItem = {
  id: string;
  text: string;
  checked: boolean;
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

export type AIResponse = {
  action: 'add_list_item' | 'create_list' | 'add_task' | 'add_event' | 'message';
  listName?: string;
  itemText?: string;
  taskTitle?: string;
  taskDueDate?: string;
  eventTitle?: string;
  eventDate?: string;
  eventTime?: string;
  reply: string;
};
