import React from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { ArrowLeft, Send } from 'lucide-react';

export const ChatSeller: React.FC = () => {
  const navigate = useNavigate();
  const { id } = useParams();

  // Dummy chat messages
  const messages = [
    {
      id: 1,
      sender: 'seller',
      message: 'Hello! Are you interested in the BMW M3?',
      time: '2:30 PM'
    },
    {
      id: 2,
      sender: 'user',
      message: 'Yes, I am. Is the price negotiable?',
      time: '2:31 PM'
    },
    {
      id: 3,
      sender: 'seller',
      message: 'We can discuss the price. What\'s your offer?',
      time: '2:32 PM'
    },
    {
      id: 4,
      sender: 'user',
      message: 'Would you consider $70,000?',
      time: '2:33 PM'
    },
    {
      id: 5,
      sender: 'seller',
      message: 'Let me think about it and get back to you.',
      time: '2:34 PM'
    }
  ];

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">
      {/* Header */}
      <div className="bg-white shadow-sm">
        <div className="max-w-7xl mx-auto px-4 py-4">
          <div className="flex items-center space-x-4">
            <button
              onClick={() => navigate(-1)}
              className="text-gray-600"
            >
              <ArrowLeft className="h-6 w-6" />
            </button>
            <div>
              <h1 className="font-semibold text-gray-900">BMW M3 2023</h1>
              <p className="text-sm text-gray-500">John Doe</p>
            </div>
          </div>
        </div>
      </div>

      {/* Chat Messages */}
      <div className="flex-1 overflow-y-auto p-4">
        <div className="max-w-7xl mx-auto space-y-4">
          {messages.map((message) => (
            <div
              key={message.id}
              className={`flex ${message.sender === 'user' ? 'justify-end' : 'justify-start'}`}
            >
              <div
                className={`max-w-[70%] rounded-lg p-3 ${
                  message.sender === 'user'
                    ? 'bg-indigo-600 text-white'
                    : 'bg-white text-gray-900'
                }`}
              >
                <p>{message.message}</p>
                <p className={`text-xs mt-1 ${
                  message.sender === 'user' ? 'text-indigo-200' : 'text-gray-500'
                }`}>
                  {message.time}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Message Input */}
      <div className="bg-white border-t border-gray-200 p-4">
        <div className="max-w-7xl mx-auto flex space-x-4">
          <input
            type="text"
            placeholder="Type a message..."
            className="flex-1 rounded-full border-gray-300 focus:border-indigo-500 focus:ring-indigo-500"
          />
          <button className="bg-indigo-600 text-white rounded-full p-3 hover:bg-indigo-700">
            <Send className="h-5 w-5" />
          </button>
        </div>
      </div>
    </div>
  );
};