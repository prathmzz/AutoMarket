import React from 'react';
import { Edit2, Trash2, Check, Plus } from 'lucide-react';
import { TopNavigation } from '../components/TopNavigation';
import { BottomNavigation } from '../components/BottomNavigation';
import { useNavigate } from 'react-router-dom';

export const MyAds: React.FC = () => {
  const navigate = useNavigate();
  // Dummy ads data
  const myAds = [
    {
      id: 1,
      title: "BMW M3 2023",
      price: "$75,000",
      image: "https://images.unsplash.com/photo-1550355291-bbee04a92027?w=500&q=80",
      status: "active",
      postedDate: "2 days ago"
    },
    {
      id: 2,
      title: "Mercedes C300 2022",
      price: "$45,000",
      image: "https://images.unsplash.com/photo-1583121274602-3e2820c69888?w=500&q=80",
      status: "active",
      postedDate: "1 week ago"
    }
  ];

  const handleEdit = (id: number) => {
    console.log('Edit ad:', id);
  };

  const handleDelete = (id: number) => {
    console.log('Delete ad:', id);
  };

  const handleMarkAsSold = (id: number) => {
    console.log('Mark as sold:', id);
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <TopNavigation />

      <div className="max-w-7xl mx-auto px-4 py-6 pb-24">
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-xl font-bold text-gray-900">My Ads</h1>
          <button
            onClick={() => navigate('/new-ad')}
            className="flex items-center gap-2 px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700"
          >
            <Plus className="h-5 w-5" />
            Post New Ad
          </button>
        </div>

        <div className="space-y-4">
          {myAds.map((ad) => (
            <div key={ad.id} className="bg-white rounded-lg shadow-sm p-4">
              <div className="flex space-x-4">
                <img
                  src={ad.image}
                  alt={ad.title}
                  className="w-32 h-32 object-cover rounded-lg"
                />
                <div className="flex-1">
                  <div className="flex justify-between items-start">
                    <div>
                      <h3 className="font-semibold text-gray-900">{ad.title}</h3>
                      <p className="text-lg font-bold text-gray-900 mt-1">{ad.price}</p>
                      <p className="text-sm text-gray-500 mt-1">Posted {ad.postedDate}</p>
                    </div>
                    <div className="flex space-x-2">
                      <button
                        onClick={() => handleEdit(ad.id)}
                        className="p-2 text-blue-600 hover:bg-blue-50 rounded-full"
                      >
                        <Edit2 className="h-5 w-5" />
                      </button>
                      <button
                        onClick={() => handleDelete(ad.id)}
                        className="p-2 text-red-600 hover:bg-red-50 rounded-full"
                      >
                        <Trash2 className="h-5 w-5" />
                      </button>
                      <button
                        onClick={() => handleMarkAsSold(ad.id)}
                        className="p-2 text-green-600 hover:bg-green-50 rounded-full"
                      >
                        <Check className="h-5 w-5" />
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      <BottomNavigation />
    </div>
  );
};