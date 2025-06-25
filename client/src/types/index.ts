export interface User {
  id: string;
  name: string;
  avatar?: string;
  status?: 'online' | 'offline';
}

export interface Message {
  _id?: string;
  sender: string;
  receiver: string;
  message: string;
  messageType: 'text' | 'image';
  imageData?: string;
  timestamp: Date;
}

export interface ChatState {
  currentUser: User | null;
  selectedUser: User | null;
  users: User[];
  messages: Message[];
  theme: 'light' | 'dark';
}