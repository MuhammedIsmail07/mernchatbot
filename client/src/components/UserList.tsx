import React from 'react';
import { User } from '../types';

interface UserListProps {
  users: User[];
  currentUser: User | null;
  selectedUser: User | null;
  onUserSelect: (user: User) => void;
  onUserLogin: (user: User) => void;
}

const UserList: React.FC<UserListProps> = ({
  users,
  currentUser,
  selectedUser,
  onUserSelect,
  onUserLogin
}) => {
  if (!currentUser) {
    return (
      <div className="w-full max-w-md mx-auto p-6 bg-white dark:bg-gray-800 rounded-lg shadow-lg theme-transition">
        <h2 className="text-2xl font-bold text-gray-800 dark:text-white mb-6 text-center">
          Select Your Profile
        </h2>
        <div className="space-y-3">
          {users.map((user) => (
            <button
              key={user.id}
              onClick={() => onUserLogin(user)}
              className="w-full p-4 bg-gray-50 dark:bg-gray-700 hover:bg-gray-100 dark:hover:bg-gray-600 rounded-lg transition-colors duration-200 flex items-center space-x-3 theme-transition"
            >
              <img
                src={user.avatar || `https://ui-avatars.com/api/?name=${user.name}&background=3b82f6&color=fff`}
                alt={user.name}
                className="w-12 h-12 rounded-full object-cover"
              />
              <div className="text-left">
                <h3 className="font-semibold text-gray-800 dark:text-white">{user.name}</h3>
                <p className="text-sm text-gray-500 dark:text-gray-400">Click to login</p>
              </div>
            </button>
          ))}
        </div>
      </div>
    );
  }

  const availableUsers = users.filter(user => user.id !== currentUser.id);

  return (
    <div className="w-full md:w-80 bg-white dark:bg-gray-800 border-r border-gray-200 dark:border-gray-700 theme-transition">
      <div className="p-4 border-b border-gray-200 dark:border-gray-700">
        <div className="flex items-center space-x-3 mb-4">
          <img
            src={currentUser.avatar || `https://ui-avatars.com/api/?name=${currentUser.name}&background=3b82f6&color=fff`}
            alt={currentUser.name}
            className="w-10 h-10 rounded-full object-cover"
          />
          <div>
            <h3 className="font-semibold text-gray-800 dark:text-white">{currentUser.name}</h3>
            <p className="text-sm text-green-500">Online</p>
          </div>
        </div>
        <h2 className="text-lg font-semibold text-gray-800 dark:text-white">Chats</h2>
      </div>
      
      <div className="overflow-y-auto h-full">
        {availableUsers.map((user) => (
          <button
            key={user.id}
            onClick={() => onUserSelect(user)}
            className={`w-full p-4 text-left hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors duration-200 border-b border-gray-100 dark:border-gray-700 theme-transition ${
              selectedUser?.id === user.id ? 'bg-blue-50 dark:bg-blue-900/20' : ''
            }`}
          >
            <div className="flex items-center space-x-3">
              <img
                src={user.avatar || `https://ui-avatars.com/api/?name=${user.name}&background=3b82f6&color=fff`}
                alt={user.name}
                className="w-12 h-12 rounded-full object-cover"
              />
              <div>
                <h3 className="font-semibold text-gray-800 dark:text-white">{user.name}</h3>
                <p className="text-sm text-gray-500 dark:text-gray-400">Click to chat</p>
              </div>
            </div>
          </button>
        ))}
      </div>
    </div>
  );
};

export default UserList;