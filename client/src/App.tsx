import React, { useState, useEffect, useCallback } from 'react';
import { User, Message } from './types';
import UserList from './components/UserList';
import ChatWindow from './components/ChatWindow';
import ThemeToggle from './components/ThemeToggle';
import useSocket from './hooks/useSocket';
import useTheme from './hooks/useTheme';
import { fetchUsers, fetchMessages, saveMessage } from './utils/api';

function App() {
  const [currentUser, setCurrentUser] = useState<User | null>(null);
  const [selectedUser, setSelectedUser] = useState<User | null>(null);
  const [users, setUsers] = useState<User[]>([]);
  const [messages, setMessages] = useState<Message[]>([]);
  const [loading, setLoading] = useState(true);
  const [showChat, setShowChat] = useState(false);

  const { theme, toggleTheme } = useTheme();

  // Handle incoming messages from socket
  const handleMessageReceived = useCallback((message: Message) => {
    setMessages(prev => {
      // Avoid duplicates
      const exists = prev.some(m => m._id === message._id);
      if (exists) return prev;
      return [...prev, message];
    });
  }, []);

  const { sendMessage } = useSocket(currentUser?.id || null, handleMessageReceived);

  // Load users on component mount
  useEffect(() => {
    const loadUsers = async () => {
      try {
        const usersData = await fetchUsers();
        setUsers(usersData);
      } catch (error) {
        console.error('Failed to load users:', error);
      } finally {
        setLoading(false);
      }
    };

    loadUsers();
  }, []);

  // Load messages when a user is selected
  useEffect(() => {
    const loadMessages = async () => {
      if (currentUser && selectedUser) {
        try {
          const messagesData = await fetchMessages(currentUser.id, selectedUser.id);
          setMessages(messagesData);
        } catch (error) {
          console.error('Failed to load messages:', error);
        }
      }
    };

    loadMessages();
  }, [currentUser, selectedUser]);

  const handleUserLogin = (user: User) => {
    setCurrentUser(user);
  };

  const handleUserSelect = (user: User) => {
    setSelectedUser(user);
    setShowChat(true);
  };

  const handleSendMessage = async (messageText: string, messageType: 'text' | 'image', imageData?: string) => {
    if (!currentUser || !selectedUser) return;

    const messageData: Message = {
      sender: currentUser.id,
      receiver: selectedUser.id,
      message: messageText,
      messageType,
      imageData,
      timestamp: new Date()
    };

    try {
      // Save to database
      const savedMessage = await saveMessage(messageData);
      
      // Add to local state
      setMessages(prev => [...prev, savedMessage]);
      
      // Send via socket
      sendMessage(savedMessage);
    } catch (error) {
      console.error('Failed to send message:', error);
    }
  };

  const handleBack = () => {
    setShowChat(false);
    setSelectedUser(null);
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-100 dark:bg-gray-900 flex items-center justify-center theme-transition">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500 mx-auto mb-4"></div>
          <p className="text-gray-600 dark:text-gray-400">Loading...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-100 dark:bg-gray-900 theme-transition">
      <ThemeToggle theme={theme} onToggle={toggleTheme} />
      
      {!currentUser ? (
        <div className="min-h-screen flex items-center justify-center p-4">
          <UserList
            users={users}
            currentUser={currentUser}
            selectedUser={selectedUser}
            onUserSelect={handleUserSelect}
            onUserLogin={handleUserLogin}
          />
        </div>
      ) : (
        <div className="h-screen flex">
          {/* Mobile: Show either user list or chat */}
          <div className={`md:flex ${showChat ? 'hidden' : 'flex'} md:w-auto w-full`}>
            <UserList
              users={users}
              currentUser={currentUser}
              selectedUser={selectedUser}
              onUserSelect={handleUserSelect}
              onUserLogin={handleUserLogin}
            />
          </div>

          {/* Chat Window */}
          {selectedUser && (
            <div className={`${showChat ? 'flex' : 'hidden'} md:flex flex-1`}>
              <ChatWindow
                currentUser={currentUser}
                selectedUser={selectedUser}
                messages={messages}
                onSendMessage={handleSendMessage}
                onBack={handleBack}
              />
            </div>
          )}

          {/* Desktop: Show placeholder when no chat selected */}
          {!selectedUser && currentUser && (
            <div className="hidden md:flex flex-1 items-center justify-center bg-gray-50 dark:bg-gray-900 theme-transition">
              <div className="text-center text-gray-500 dark:text-gray-400">
                <svg className="w-16 h-16 mx-auto mb-4 opacity-50" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
                </svg>
                <p className="text-lg">Select a chat to start messaging</p>
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
}

export default App;