import React, { useState } from 'react';
import { Heart } from 'lucide-react';

interface HeartButtonProps {
  initialFavorite?: boolean;
  onToggle?: (isFav: boolean) => void; // optional callback
}

export const HeartButton: React.FC<HeartButtonProps> = ({
  initialFavorite = false,
  onToggle
}) => {
  const [isFavorite, setIsFavorite] = useState(initialFavorite);

  const handleClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    const updated = !isFavorite;
    setIsFavorite(updated);
    onToggle?.(updated);
  };

  return (
    <button onClick={handleClick} className="text-red-600 hover:text-red-800">
      <Heart
        className={`h-5 w-5 transition-colors ${isFavorite ? 'fill-red-600' : 'fill-transparent'}`}
      />
    </button>
  );
};
