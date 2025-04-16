import React from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { Home as HomeIcon, MessageCircle, Car, Heart, User } from 'lucide-react';

export const BottomNavigation: React.FC = () => {
  const navigate = useNavigate();
  const location = useLocation();

  const isActive = (path: string) => location.pathname === path;

  return (
    <div className="fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200">
      <div className="max-w-7xl mx-auto px-4">
        <div className="flex justify-around py-5">
          <button 
            onClick={() => navigate('/home')}
            className={`flex flex-col items-center ${isActive('/') ? 'text-indigo-600' : 'text-gray-600 hover:text-indigo-600'}`}
          >
            <HomeIcon className="h-8 w-8" />
            <span className="text-xs mt-1">Home</span>
          </button>
          <button 
            onClick={() => navigate('/chats')}
            className={`flex flex-col items-center ${isActive('/chats') ? 'text-indigo-600' : 'text-gray-600 hover:text-indigo-600'}`}
          >
            <MessageCircle className="h-8 w-8" />
            <span className="text-xs mt-1">Chats</span>
          </button>
          <button 
            onClick={() => navigate('/my-ads')}
            className={`flex flex-col items-center ${isActive('/my-ads') ? 'text-indigo-600' : 'text-gray-600 hover:text-indigo-600'}`}
          >
            <Car className="h-8 w-8" />
            <span className="text-xs mt-1">My Ads</span>
          </button>
          <button 
            onClick={() => navigate('/favorites')}
            className={`flex flex-col items-center ${isActive('/favorites') ? 'text-indigo-600' : 'text-gray-600 hover:text-indigo-600'}`}
          >
            <Heart className="h-8 w-8" />
            <span className="text-xs mt-1">Favorites</span>
          </button>
          <button 
            onClick={() => navigate('/profile')}
            className={`flex flex-col items-center ${isActive('/profile') ? 'text-indigo-600' : 'text-gray-600 hover:text-indigo-600'}`}
          >
            <User className="h-8 w-8" />
            <span className="text-xs mt-1">Profile</span>
          </button>
        </div>
      </div>
    </div>
  );
};