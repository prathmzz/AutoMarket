import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Car } from '../types/car';
import { X } from 'lucide-react';

interface CompareViewProps {
  cars: Car[];
  onRemoveCar: (carId: number) => void;
}

export const CompareView: React.FC<CompareViewProps> = ({ cars, onRemoveCar }) => {
  const navigate = useNavigate();

  const metrics = [
    { label: 'Price', key: 'price', format: (value: number) => `$${value.toLocaleString()}` },
    { label: 'Year', key: 'year' },
    { label: 'Location', key: 'location' },
    { label: 'Kilometers Driven', key: 'kmsDriven', format: (value: number) => `${value.toLocaleString()} km` },
    { label: 'Posted By', key: 'postedBy' },
    { label: 'Posted At', key: 'postedAt' },
  ];

  return (
    <div className="min-h-screen bg-gray-50 py-8 px-4">
      <div className="max-w-7xl mx-auto">
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-2xl font-bold text-gray-900">Compare Vehicles</h1>
          <button
            onClick={() => navigate('/')}
            className="px-4 py-2 text-gray-600 hover:text-gray-800"
          >
            Back to Listings
          </button>
        </div>

        <div className="bg-white rounded-lg shadow-md overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr>
                <th className="p-4 text-left bg-gray-50 border-b"></th>
                {cars.map((car) => (
                  <th key={car.id} className="p-4 text-left bg-gray-50 border-b min-w-[300px]">
                    <div className="relative">
                      <button
                        onClick={() => onRemoveCar(car.id)}
                        className="absolute -top-2 -right-2 p-1 bg-white rounded-full shadow-md hover:bg-gray-100"
                      >
                        <X className="h-4 w-4" />
                      </button>
                      <img
                        src={car.images[0]}
                        alt={car.title}
                        className="w-full h-48 object-cover rounded-lg mb-4"
                      />
                      <h3 className="text-lg font-semibold text-gray-900">{car.title}</h3>
                    </div>
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {metrics.map((metric) => (
                <tr key={metric.key} className="border-b">
                  <td className="p-4 font-medium text-gray-700 bg-gray-50">{metric.label}</td>
                  {cars.map((car) => (
                    <td key={car.id} className="p-4">
                      {metric.format
                        ? metric.format(car[metric.key as keyof Car] as number)
                        : car[metric.key as keyof Car]}
                    </td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};