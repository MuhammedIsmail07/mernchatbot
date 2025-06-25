import { useEffect, useRef } from 'react';
import { io, Socket } from 'socket.io-client';
import { Message } from '../types';

const useSocket = (currentUserId: string | null, onMessageReceived: (message: Message) => void) => {
  const socketRef = useRef<Socket | null>(null);

  useEffect(() => {
    if (!currentUserId) return;

    // Initialize socket connection
    socketRef.current = io(process.env.REACT_APP_SERVER_URL || 'http://localhost:3010');

    const socket = socketRef.current;

  
    socket.emit('join-room', currentUserId);

   
    socket.on('message', (message: Message) => {
      onMessageReceived(message);
    });

   
    return () => {
      socket.disconnect();
    };
  }, [currentUserId, onMessageReceived]);

  const sendMessage = (messageData: Message) => {
    if (socketRef.current) {
      socketRef.current.emit('message', messageData);
    }
  };

  return { sendMessage };
};

export default useSocket;
