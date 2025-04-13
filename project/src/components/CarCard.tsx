import React from 'react';
import { Heart, MapPin, MessageCircle } from 'lucide-react';
import { Car } from '../types/car';
import { AddToCompareButton } from './AddToCompareButton';

interface CarCardProps {
  car: Car;
  onCardClick: (car: Car) => void;
  onChatClick: (carId: number) => void;
  onToggleCompare: () => void;
  isInCompare: boolean;
  compareDisabled: boolean;
}

export const CarCard: React.FC<CarCardProps> = ({
  car,
  onCardClick,
  onChatClick,
  onToggleCompare,
  isInCompare,
  compareDisabled
}) => {
  return (
    <div 
      className="bg-white rounded-lg shadow-md overflow-hidden cursor-pointer hover:shadow-lg transition-shadow"
      onClick={() => onCardClick(car)}
    >
      <img
        src={car.images[0]}
        alt={car.name}
        className="w-full h-48 object-cover"
      />
      <div className="p-4">
        <div className="grid grid-cols-2 gap-4">
          <div>
            <h3 className="text-lg font-semibold text-gray-900">
              {/* {car.name} | {car.make} {car.model} */}
              {car.name} | "model temp makee"
            </h3>
            <p className="text-xl font-semibold text-indigo-600">
              ₹ {car.price.toLocaleString()}
            </p>
          </div>
          <div>
            <div className="flex items-center text-sm text-gray-500">
              <MapPin className="h-4 w-4 mr-1 flex-shrink-0" />
              <span className="truncate">{car.location}</span>
            </div>
            <div className="mt-1">
              <span className="text-sm text-gray-500 block">
                <span className="font-medium">Purchase Year:</span> {car.year_of_purchase}
              </span>
              <span className="text-sm text-gray-500 block">
                <span className="font-medium">Driven:</span> {car.mileage.toLocaleString()} km
              </span>
            </div>
          </div>
        </div>
        <div className="mt-4 flex justify-between items-center">
          <div className="text-sm text-gray-500">
            {car.mileage.toLocaleString()} km driven
          </div>
          <div className="flex gap-2">
            <button 
              onClick={(e) => {
                e.stopPropagation();
                onChatClick(car.id);
              }}
              className="text-indigo-600 hover:text-indigo-800"
            >
              <MessageCircle className="h-5 w-5" />
            </button>
            <AddToCompareButton
              isInCompare={isInCompare}
              onToggleCompare={onToggleCompare}
              disabled={compareDisabled}
            />
            <button 
              onClick={(e) => {
                e.stopPropagation();
              }} 
              className="text-indigo-600 hover:text-indigo-800"
            >
              <Heart className="h-5 w-5" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
