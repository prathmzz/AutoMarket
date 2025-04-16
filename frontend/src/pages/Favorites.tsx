import React, { useEffect, useState } from 'react';
import { TopNavigation } from '../components/TopNavigation';
import { BottomNavigation } from '../components/BottomNavigation';
import { HeartButton } from '../components/buttons/HeartButton';
import { Car } from '../types/car';

export const Favorites: React.FC = () => {
  const [cars, setCars] = useState<Car[]>([]);
  const [isApiLoaded, setIsApiLoaded] = useState(false);

  const fallbackAds: Car[] = [
    {
      id: 1,
      name: "BMW M3 2023",
      price: 75000,
      images: ["https://images.unsplash.com/photo-1550355291-bbee04a92027?w=500&q=80"],
      location: "New York, NY",
      postedAt: new Date().toISOString(),
      year_of_purchase: 2023,
      description: "Sporty luxury sedan with M performance.",
      mileage: 12000,
      postedBy: "Static Seller"
    },
    {
      id: 2,
      name: "Mercedes C300 2022",
      price: 45000,
      images: ["https://images.unsplash.com/photo-1583121274602-3e2820c69888?w=500&q=80"],
      location: "Los Angeles, CA",
      postedAt: new Date().toISOString(),
      year_of_purchase: 2022,
      description: "Luxury sedan with advanced tech features.",
      mileage: 15000,
      postedBy: "Static Seller"
    },
    {
      id: 3,
      name: "Audi A4 2023",
      price: 55000,
      images: ["https://images.unsplash.com/photo-1617654112368-307921291f42?w=500&q=80"],
      location: "Chicago, IL",
      postedAt: new Date().toISOString(),
      year_of_purchase: 2023,
      description: "Stylish compact executive car.",
      mileage: 9000,
      postedBy: "Static Seller"
    },
    {
      id: 4,
      name: "Tesla Model 3 2023",
      price: 65000,
      images: ["https://images.unsplash.com/photo-1536700503339-1e4b06520771?w=500&q=80"],
      location: "Miami, FL",
      postedAt: new Date().toISOString(),
      year_of_purchase: 2023,
      description: "Electric sedan with autopilot features.",
      mileage: 8000,
      postedBy: "Static Seller"
    }
  ];

  useEffect(() => {
    const fetchFavorites = async () => {
      try {
        const token = localStorage.getItem('token');
        const response = await fetch('http://localhost:5000/my-favs', {
          method: 'GET',
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        if (!response.ok) {
          throw new Error('Failed to fetch favorites');
        }

        const data = await response.json();

        const transformedCars: Car[] = data.map((car: any) => ({
          id: car?._id || Math.random(),
          name: car?.name || 'Unnamed Car',
          price: car?.price || 0,
          images: car?.images || ['https://via.placeholder.com/400x300?text=No+Image'],
          location: car?.location || 'Unknown location',
          year_of_purchase: car?.year_of_purchase || 2000,
          postedAt: car?.posted_at || new Date().toISOString(),
          description: car?.description || 'No description provided',
          mileage: car?.mileage || 0,
          postedBy: car?.seller_id || 'Unknown Seller',
          make: car?.make,
          model: car?.model,
          transmission: car?.transmission,
          color: car?.color,
          engine_capacity: car?.engine_capacity,
          fuel_type: car?.fuel_type,
          insurance_valid_until: car?.insurance_valid_until,
          owners: car?.owners,
        }));

        setCars(transformedCars);
        setIsApiLoaded(true);
      } catch (err) {
        console.error('Error fetching favorites:', err);
        setIsApiLoaded(false);
      }
    };

    fetchFavorites();
  }, []);

  const displayedCars = isApiLoaded && cars.length > 0 ? cars : fallbackAds;

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">
      <TopNavigation />

      <div className="flex-1 max-w-7xl mx-auto px-4 py-6 pb-24">
        <h1 className="text-2xl font-bold text-gray-900 mb-6">Favorites</h1>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 overflow-y-auto max-h-[calc(100vh-220px)]">
          {displayedCars.map((car) => (
            <div
              key={car.id}
              className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow duration-300"
            >
              <div className="relative h-48">
                <img
                  src={car.images?.[0] || 'https://via.placeholder.com/400x300?text=No+Image'}
                  alt={car.name}
                  className="w-full h-full object-cover"
                />
                <div className="absolute top-4 right-4">
                  <HeartButton carId={car.id} initialFavorite={true}/>
                </div>
              </div>
              <div className="p-4">
                <div className="flex justify-between items-start mb-2">
                  <h2 className="text-xl font-semibold text-gray-800 line-clamp-1">{car.name}</h2>
                </div>
                <p className="text-lg text-indigo-600 font-bold">
                  ₹ {car.price?.toLocaleString() || 'N/A'}
                </p>
                <div className="mt-2 space-y-1">
                  <p className="text-sm text-gray-500 flex items-center">
                    <span className="w-20">Location:</span>
                    <span className="text-gray-700">{car.location}</span>
                  </p>
                  <p className="text-sm text-gray-500 flex items-center">
                    <span className="w-20">Year:</span>
                    <span className="text-gray-700">{car.year_of_purchase}</span>
                  </p>
                  <p className="text-sm text-gray-500 flex items-center">
                    <span className="w-20">Mileage:</span>
                    <span className="text-gray-700">{car.mileage?.toLocaleString()} km</span>
                  </p>
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

export default Favorites