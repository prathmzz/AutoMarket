import React from 'react';
import { Scale } from 'lucide-react';
import { Car } from '../types/car';

interface CompareButtonProps {
  carsToCompare: Car[];
  onCompareClick: () => void;
}

export const CompareButton: React.FC<CompareButtonProps> = ({ carsToCompare, onCompareClick }) => {
  return (
    <button
      onClick={onCompareClick}
      disabled={carsToCompare.length < 2}
      className="fixed bottom-20 right-4 z-40 bg-indigo-600 text-white rounded-full p-4 shadow-lg hover:bg-indigo-700 disabled:bg-gray-400 disabled:cursor-not-allowed"
    >
      <div className="relative">
        <Scale className="h-6 w-6" />
        {carsToCompare.length > 0 && (
          <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center">
            {carsToCompare.length}
          </span>
        )}
      </div>
    </button>
  );
};