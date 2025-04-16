import React, { useEffect, useState } from 'react';
import { Heart } from 'lucide-react';
import axios from 'axios';

interface HeartButtonProps {
  initialFavorite?: boolean;
  carId: string | number;
  onToggle?: (isFav: boolean) => void;
}

export const HeartButton: React.FC<HeartButtonProps> = ({
  initialFavorite = false,
  carId,
  onToggle
}) => {
  const [isFavorite, setIsFavorite] = useState(initialFavorite);

  useEffect(() => {
    setIsFavorite(initialFavorite);
  }, [initialFavorite]);

  const handleClick = async (e: React.MouseEvent) => {
    e.stopPropagation();

    const token = localStorage.getItem('token');
    if (!token) {
      console.error('Token not found in localStorage');
      return;
    }

    const url = isFavorite
      ? 'http://localhost:5000/remove-from-fav'
      : 'http://localhost:5000/add-to-fav';

    try {
      await axios.post(
        url,
        { car_id: carId },
        {
          headers: {
            Authorization: `Bearer ${token}`,
            'Content-Type': 'application/json'
          }
        }
      );
      setIsFavorite(!isFavorite);
      onToggle?.(!isFavorite);
    } catch (error) {
      console.error('Favorite toggle failed:', error);
    }
  };

  return (
    <button onClick={handleClick} className="text-red-600 hover:text-red-800">
      <Heart
        className={`h-5 w-5 transition-colors ${isFavorite ? 'fill-red-600' : 'fill-transparent'}`}
      />
    </button>
  );
};
