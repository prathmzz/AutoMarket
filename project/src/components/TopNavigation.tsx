import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Car, Calculator } from 'lucide-react';

export const TopNavigation: React.FC = () => {
  const navigate = useNavigate();

  const handleLogout = () => {
    // Add logout logic here
    navigate('/login');
  };

  return (
    <nav className="bg-white shadow-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-20">
          <div className="flex">
            <div className="flex-shrink-0 flex items-center">
              <Car className="h-14 w-14 text-indigo-600" />
              <span className="ml-5 text-2xl font-bold text-gray-900">AutoMarket</span>
            </div>
          </div>
          <div className="flex items-center space-x-4">
            <button 
              onClick={() => navigate('/predict-car-price')}
              className="px-4 py-2 bg-indigo-600 text-white rounded-md hover:bg-indigo-700 flex items-center"
            >
              <Calculator className="h-5 w-5 mr-2" />
              Predict Price
            </button>
            <button 
              onClick={handleLogout}
              className="px-4 py-2 bg-red-600 text-white rounded-md hover:bg-red-700"
            >
              Logout
            </button>
          </div>
        </div>
      </div>
    </nav>
  );
};