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
      className="fixed bottom-32 right-80 z-40 bg-indigo-600 text-white rounded-full p-4 shadow-lg hover:bg-indigo-700 disabled:bg-gray-400 disabled:cursor-not-allowed"
    >
      <div className="relative">
        <Scale className="h-12 w-12" />
        {carsToCompare.length > 0 && (
          <span className="absolute -top-5 -right-5 bg-red-500 text-white text-xs rounded-full h-6 w-6 flex items-center justify-center">
            {carsToCompare.length}
          </span>
        )}
      </div>
    </button>
  );
};