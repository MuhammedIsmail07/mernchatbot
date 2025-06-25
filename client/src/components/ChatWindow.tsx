import React, { useState, useRef, useEffect } from 'react';
import { User, Message } from '../types';
import MessageBubble from './MessageBubble';
import MessageInput from './MessageInput';

interface ChatWindowProps {
  currentUser: User;
  selectedUser: User;
  messages: Message[];
  onSendMessage: (message: string, messageType: 'text' | 'image', imageData?: string) => void;
  onBack: () => void;
}

const ChatWindow: React.FC<ChatWindowProps> = ({
  currentUser,
  selectedUser,
  messages,
  onSendMessage,
  onBack
}) => {
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  return (
    <div className="flex-1 flex flex-col bg-white dark:bg-gray-800 theme-transition">
      {/* Chat Header */}
      <div className="p-4 border-b border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 theme-transition">
        <div className="flex items-center space-x-3">
          <button
            onClick={onBack}
            className="md:hidden p-2 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-full transition-colors"
          >
            <svg className="w-5 h-5 text-gray-600 dark:text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
            </svg>
          </button>
          <img
            src={selectedUser.avatar || `https://ui-avatars.com/api/?name=${selectedUser.name}&background=3b82f6&color=fff`}
            alt={selectedUser.name}
            className="w-10 h-10 rounded-full object-cover"
          />
          <div>
            <h3 className="font-semibold text-gray-800 dark:text-white">{selectedUser.name}</h3>
            <p className="text-sm text-green-500">Online</p>
          </div>
        </div>
      </div>

      {/* Messages Area */}
      <div className="flex-1 overflow-y-auto p-4 space-y-4 bg-gray-50 dark:bg-gray-900 theme-transition">
        {messages.length === 0 ? (
          <div className="text-center text-gray-500 dark:text-gray-400 mt-8">
            <p>No messages yet. Start the conversation!</p>
          </div>
        ) : (
          messages.map((message, index) => (
            <MessageBubble
              key={message._id || index}
              message={message}
              isOwn={message.sender === currentUser.id}
              senderName={message.sender === currentUser.id ? currentUser.name : selectedUser.name}
            />
          ))
        )}
        <div ref={messagesEndRef} />
      </div>

      {/* Message Input */}
      <MessageInput onSendMessage={onSendMessage} />
    </div>
  );
};

export default ChatWindow;