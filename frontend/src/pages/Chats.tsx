import React from 'react';
import { useNavigate } from 'react-router-dom';
import { TopNavigation } from '../components/TopNavigation';
import { BottomNavigation } from '../components/BottomNavigation';

export const Chats: React.FC = () => {
  const navigate = useNavigate();

  // Dummy chat data
  const chats = [
    {
      id: 1,
      sellerName: "John Doe",
      lastMessage: "Is the price negotiable?",
      time: "2:30 PM",
      carImage: "https://images.unsplash.com/photo-1550355291-bbee04a92027?w=500&q=80",
      carName: "BMW M3 2023",
      price: "$75,000"
    },
    {
      id: 2,
      sellerName: "Jane Smith",
      lastMessage: "When can I see the car?",
      time: "Yesterday",
      carImage: "https://images.unsplash.com/photo-1583121274602-3e2820c69888?w=500&q=80",
      carName: "Mercedes C300 2022",
      price: "$45,000"
    },
    {
      id: 3,
      sellerName: "Mike Johnson",
      lastMessage: "Thanks for the information",
      time: "2 days ago",
      carImage: "https://images.unsplash.com/photo-1617654112368-307921291f42?w=500&q=80",
      carName: "Audi A4 2023",
      price: "$55,000"
    }
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      <TopNavigation />

      <div className="max-w-7xl mx-auto px-4 py-6 pb-24">
        <h1 className="text-xl font-bold text-gray-900 mb-6">Messages</h1>
        <div className="space-y-4">
          {chats.map((chat) => (
            <div
              key={chat.id}
              onClick={() => navigate(`/chat-seller/${chat.id}`)}
              className="bg-white rounded-lg shadow-sm p-4 flex space-x-4 cursor-pointer hover:bg-gray-50"
            >
              <img
                src={chat.carImage}
                alt={chat.carName}
                className="w-24 h-24 object-cover rounded-lg"
              />
              <div className="flex-1">
                <div className="flex justify-between items-start">
                  <h3 className="font-semibold text-gray-900">{chat.sellerName}</h3>
                  <span className="text-sm text-gray-500">{chat.time}</span>
                </div>
                <p className="text-sm text-gray-600 mt-1">{chat.carName}</p>
                <p className="text-sm font-semibold text-gray-900 mt-1">{chat.price}</p>
                <p className="text-sm text-gray-500 mt-2">{chat.lastMessage}</p>
              </div>
            </div>
          ))}
        </div>
      </div>

      <BottomNavigation />
    </div>
  );
};