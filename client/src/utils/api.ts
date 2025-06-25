import { User, Message } from '../types';

const API_BASE_URL = process.env.REACT_APP_API_URL || 'http://localhost:3010/api';

export const fetchUsers = async (): Promise<User[]> => {
  try {
    const response = await fetch(`${API_BASE_URL}/users`);
    if (!response.ok) {
      throw new Error('Failed to fetch users');
    }
    return await response.json();
  } catch (error) {
    console.error('Error fetching users:', error);
    throw error;
  }
};

export const fetchMessages = async (userId: string, otherUserId: string): Promise<Message[]> => {
  try {
    const response = await fetch(`${API_BASE_URL}/messages/${userId}/${otherUserId}`);
    if (!response.ok) {
      throw new Error('Failed to fetch messages');
    }
    return await response.json();
  } catch (error) {
    console.error('Error fetching messages:', error);
    throw error;
  }
};

export const saveMessage = async (message: Omit<Message, '_id' | 'timestamp'>): Promise<Message> => {
  try {
    const response = await fetch(`${API_BASE_URL}/messages`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(message),
    });
    
    if (!response.ok) {
      throw new Error('Failed to save message');
    }
    
    return await response.json();
  } catch (error) {
    console.error('Error saving message:', error);
    throw error;
  }
};