import React from 'react';
import { TopNavigation } from '../components/TopNavigation';
import { BottomNavigation } from '../components/BottomNavigation';
import { HeartButton } from '../components/buttons/HeartButton';

export const Favorites: React.FC = () => {
  const favoriteAds = [
    {
      id: 1,
      title: "BMW M3 2023",
      price: "$75,000",
      image: "https://images.unsplash.com/photo-1550355291-bbee04a92027?w=500&q=80",
      location: "New York, NY",
      postedDate: "2 days ago"
    },
    {
      id: 2,
      title: "Mercedes C300 2022",
      price: "$45,000",
      image: "https://images.unsplash.com/photo-1583121274602-3e2820c69888?w=500&q=80",
      location: "Los Angeles, CA",
      postedDate: "1 week ago"
    },
    {
      id: 3,
      title: "Audi A4 2023",
      price: "$55,000",
      image: "https://images.unsplash.com/photo-1617654112368-307921291f42?w=500&q=80",
      location: "Chicago, IL",
      postedDate: "3 days ago"
    },
    {
      id: 4,
      title: "Tesla Model 3 2023",
      price: "$65,000",
      image: "https://images.unsplash.com/photo-1536700503339-1e4b06520771?w=500&q=80",
      location: "Miami, FL",
      postedDate: "5 days ago"
    }
  ];

  const handleRemoveFromFavorites = (id: number) => {
    console.log('Remove from favorites:', id);
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <TopNavigation />

      <div className="max-w-7xl mx-auto px-4 py-6 pb-24">
        <h1 className="text-xl font-bold text-gray-900 mb-6">Favorites</h1>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {favoriteAds.map((ad) => (
            <div key={ad.id} className="bg-white rounded-lg shadow-sm overflow-hidden">
              <img
                src={ad.image}
                alt={ad.title}
                className="w-full h-48 object-cover"
              />
              <div className="p-4">
                <div className="flex justify-between items-start">
                  <div>
                    <h3 className="font-semibold text-gray-900">{ad.title}</h3>
                    <p className="text-lg font-bold text-gray-900 mt-1">{ad.price}</p>
                    <p className="text-sm text-gray-500 mt-1">{ad.location}</p>
                    <p className="text-sm text-gray-500">Posted {ad.postedDate}</p>
                  </div>
                  <HeartButton />
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
