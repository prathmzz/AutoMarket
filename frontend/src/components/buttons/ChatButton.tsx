import React from 'react';
import { MessageCircle } from 'lucide-react';

interface ChatButtonProps {
  onClick: () => void;
}

export const ChatButton: React.FC<ChatButtonProps> = ({ onClick }) => {
  return (
    <button onClick={(e) => {
      e.stopPropagation();
      onClick();
    }} className="text-indigo-600 hover:text-indigo-800">
      <MessageCircle className="h-5 w-5" />
    </button>
  );
};
