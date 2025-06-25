import React from 'react';
import { Message } from '../types';

interface MessageBubbleProps {
  message: Message;
  isOwn: boolean;
  senderName: string;
}

const MessageBubble: React.FC<MessageBubbleProps> = ({ message, isOwn, senderName }) => {
  const formatTime = (timestamp: Date) => {
    return new Date(timestamp).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
  };

  return (
    <div className={`flex ${isOwn ? 'justify-end' : 'justify-start'} message-enter`}>
      <div className={`max-w-xs lg:max-w-md px-4 py-2 rounded-lg ${
        isOwn 
          ? 'bg-blue-500 text-white' 
          : 'bg-white dark:bg-gray-700 text-gray-800 dark:text-white border border-gray-200 dark:border-gray-600'
      } theme-transition`}>
        {!isOwn && (
          <p className="text-xs font-semibold mb-1 text-gray-600 dark:text-gray-300">
            {senderName}
          </p>
        )}
        
        {message.messageType === 'image' && message.imageData ? (
          <div className="mb-2">
            <img
              src={message.imageData}
              alt="Shared image"
              className="image-preview rounded"
            />
          </div>
        ) : null}
        
        <p className="text-sm break-words">{message.message}</p>
        
        <p className={`text-xs mt-1 ${
          isOwn ? 'text-blue-100' : 'text-gray-500 dark:text-gray-400'
        }`}>
          {formatTime(message.timestamp)}
        </p>
      </div>
    </div>
  );
};

export default MessageBubble;