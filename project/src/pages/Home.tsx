import React from 'react';
import { Heart } from 'lucide-react';
import { TopNavigation } from '../components/TopNavigation';
import { BottomNavigation } from '../components/BottomNavigation';

export const Home: React.FC = () => {
  return (
    <div className="min-h-screen bg-gray-50">
      <TopNavigation />

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 pb-24">
        {/* Featured Listings */}
        <div className="mb-8">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">Featured Vehicles</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {/* Sample Vehicle Cards */}
            {[1, 2, 3,4,5,6,7,8,9,10,11,12].map((i) => (
              <div key={i} className="bg-white rounded-lg shadow-md overflow-hidden">
                <img
                  src={`https://images.unsplash.com/photo-1494976388531-d1058494cdd8?w=500&q=80`}
                  alt="Vehicle"
                  className="w-full h-48 object-cover"
                />
                <div className="p-4">
                  <h3 className="text-lg font-semibold text-gray-900">BMW M3 2023</h3>
                  <p className="text-gray-600">$75,000</p>
                  <div className="mt-4 flex justify-between items-center">
                    <span className="text-sm text-gray-500">Posted 2 days ago</span>
                    <button className="text-indigo-600 hover:text-indigo-800">
                      <Heart className="h-5 w-5" />
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      <BottomNavigation />
    </div>
  );
};