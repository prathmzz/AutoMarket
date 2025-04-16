import React from 'react';
import { MapPin, MessageCircle, ChevronLeft, ChevronRight, X } from 'lucide-react';
import { Car } from '../types/car';
import { AddToCompareButton } from './buttons/AddToCompareButton';
import { HeartButton } from './buttons/HeartButton';
import { ChatButton } from './buttons/ChatButton';

interface ExpandedCarCardProps {
  car: Car;
  onClose: () => void;
  onChatClick: (carId: number) => void;
  currentImageIndex: number;
  onPrevImage: () => void;
  onNextImage: () => void;
  onToggleCompare: () => void;
  isInCompare: boolean;
  compareDisabled: boolean;
}

export const ExpandedCarCard: React.FC<ExpandedCarCardProps> = ({
  car,
  onClose,
  onChatClick,
  currentImageIndex,
  onPrevImage,
  onNextImage,
  onToggleCompare,
  isInCompare,
  compareDisabled,
}) => {
  return (
    <div 
      className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4"
      onClick={onClose}
    >
      <div 
        className="bg-white rounded-lg max-w-4xl w-full max-h-[90vh] overflow-y-auto"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="relative">
          <img
            src={car.images[currentImageIndex]}
            alt={car.name}
            className="w-full h-[400px] object-cover"
          />
          <button
            onClick={onClose}
            className="absolute top-4 right-4 bg-white rounded-full p-1 shadow-lg hover:bg-gray-100"
          >
            <X className="h-6 w-6" />
          </button>
          {car.images.length > 1 && (
            <>
              <button
                onClick={onPrevImage}
                className="absolute left-4 top-1/2 -translate-y-1/2 bg-white rounded-full p-2 shadow-lg hover:bg-gray-100"
              >
                <ChevronLeft className="h-6 w-6" />
              </button>
              <button
                onClick={onNextImage}
                className="absolute right-4 top-1/2 -translate-y-1/2 bg-white rounded-full p-2 shadow-lg hover:bg-gray-100"
              >
                <ChevronRight className="h-6 w-6" />
              </button>
            </>
          )}
        </div>
        <div className="p-6">
          <div className="flex justify-between items-start mb-4">
            <div>
              <h2 className="text-2xl font-bold text-gray-900">{car.name}</h2>
              <p className="text-xl text-indigo-600 font-semibold">
                ₹ {car.price.toLocaleString()}
              </p>
            </div>
            <div className="flex gap-2">
              <AddToCompareButton
                isInCompare={isInCompare}
                onToggleCompare={onToggleCompare}
                disabled={compareDisabled}
              />
              <HeartButton carId={car.id} />
              <ChatButton onClick={() => onChatClick(car.id)} />
            </div>
          </div>
          
          <div className="grid grid-cols-2 gap-4 mb-6 text-gray-600">
            <div className="flex items-center gap-2">
              <MapPin className="h-5 w-5" />
              {car.location}
            </div>
            <div>
              <span className="font-medium">Purchase Year:</span> {car.year_of_purchase}
            </div>
            <div>
              <span className="font-medium">Kms Driven:</span> {car.mileage.toLocaleString()} km
            </div>
            <div>
              <span className="font-medium">Posted By:</span> {car.postedBy}
            </div>
            <div>
              <span className="font-medium">Posted On:</span> {new Date(car.postedAt).toLocaleDateString()}
            </div>
            {car.owners !== undefined && (
              <div>
                <span className="font-medium">Number of Owners:</span> {car.owners}
              </div>
            )}
            {car.transmission && (
              <div>
                <span className="font-medium">Transmission:</span> {car.transmission}
              </div>
            )}
            {car.fuel_type && (
              <div>
                <span className="font-medium">Fuel Type:</span> {car.fuel_type}
              </div>
            )}
            {car.engine_capacity && (
              <div>
                <span className="font-medium">Engine:</span> {car.engine_capacity}
              </div>
            )}
            {car.color && (
              <div>
                <span className="font-medium">Color:</span> {car.color}
              </div>
            )}
            {car.make && (
              <div>
                <span className="font-medium">Make:</span> {car.make}
              </div>
            )}
            {car.model && (
              <div>
                <span className="font-medium">Model:</span> {car.model}
              </div>
            )}
            {car.insurance_valid_until && (
              <div>
                <span className="font-medium">Insurance Valid Till:</span> {new Date(car.insurance_valid_until).toLocaleDateString()}
              </div>
            )}
          </div>

          <div className="border-t pt-4">
            <h3 className="text-lg font-semibold mb-2">Description</h3>
            <p className="text-gray-600">{car.description}</p>
          </div>
        </div>
      </div>
    </div>
  );
};
