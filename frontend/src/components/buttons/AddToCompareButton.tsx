import React from 'react';
import { Scale } from 'lucide-react';

interface AddToCompareButtonProps {
  isInCompare: boolean;
  onToggleCompare: () => void;
  disabled: boolean;
}

export const AddToCompareButton: React.FC<AddToCompareButtonProps> = ({
  isInCompare,
  onToggleCompare,
  disabled
}) => {
  return (
    <button
      onClick={(e) => {
        e.stopPropagation();
        onToggleCompare();
      }}
      disabled={disabled && !isInCompare}
      className={`p-2 rounded-full ${
        isInCompare
          ? 'text-indigo-600 hover:bg-indigo-50'
          : disabled
          ? 'text-gray-400 cursor-not-allowed'
          : 'text-gray-600 hover:bg-gray-50'
      }`}
    >
      <Scale className="h-5 w-5" />
    </button>
  );
};