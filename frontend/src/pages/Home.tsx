// File: pages/Home.tsx
import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { TopNavigation } from "../components/TopNavigation";
import { BottomNavigation } from "../components/BottomNavigation";
import { CarCard } from "../components/CarCard";
import { ExpandedCarCard } from "../components/ExpandedCarCard";
import { CompareButton } from "../components/CompareButton";
import { CompareView } from "../components/CompareView";
import { Car } from "../types/car";
import { Search, SlidersHorizontal } from "lucide-react";
import { FilterPanel } from "../components/FilterPanel";
import { useCarFilter } from "../hooks/useCarFilter";
import defaultAdds from "../static/adds";

export const Home: React.FC = () => {
  const navigate = useNavigate();
  const [selectedCar, setSelectedCar] = useState<Car | null>(null);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [searchTerm, setSearchTerm] = useState("");
  const [showFilters, setShowFilters] = useState(false);
  const [carsToCompare, setCarsToCompare] = useState<Car[]>([]);
  const [showCompareView, setShowCompareView] = useState(false);
  const [carData, setCarData] = useState<Car[]>([]);

  const [skip, setSkip] = useState(0);
  const [isLoading, setIsLoading] = useState(false);
  const [hasMore, setHasMore] = useState(true);

  const { filters, updateFilters, clearFilters, filteredCars } = useCarFilter(carData, searchTerm);

  const fetchCars = async () => {
    if (isLoading || !hasMore) return;

    setIsLoading(true);
    try {
      const token =
        localStorage.getItem("token") ||
        "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...";

      const response = await fetch(`http://localhost:5000/home/home-listings?skip=${skip}&limit=30`, {
        method: "GET",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      if (!response.ok) throw new Error("Failed to fetch car listings");

      const data = await response.json();

      if (data.length === 0) {
        setHasMore(false);
      } else {
        const normalizedCars: Car[] = data.map((car: any) => ({
          ...car,
          id: car._id,
        }));
        // setCarData(prev => [...prev, ...normalizedCars]);
        setCarData(defaultAdds)
        setSkip(prev => prev + 10);
      }
    } catch (error) {
      console.error("Error fetching cars:", error);
      setCarData(defaultAdds); // fallback
      setHasMore(false);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchCars();
  }, []);

  useEffect(() => {
    const handleScroll = () => {
      const nearBottom =
        window.innerHeight + window.scrollY >= document.body.offsetHeight - 300;

      if (nearBottom) {
        fetchCars();
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, [skip, isLoading, hasMore]);

  const handleChatClick = (carId: number) => navigate(`/chat-seller/${carId}`);

  const handleRemoveFromCompare = (carId: number) => {
    setCarsToCompare(prev => prev.filter(car => car.id !== carId));
  };

  const handlePrevImage = () => {
    if (selectedCar) {
      setCurrentImageIndex(prev => (prev === 0 ? selectedCar.images.length - 1 : prev - 1));
    }
  };

  const handleNextImage = () => {
    if (selectedCar) {
      setCurrentImageIndex(prev => (prev === selectedCar.images.length - 1 ? 0 : prev + 1));
    }
  };

  const handleToggleCompare = (car: Car) => {
    setCarsToCompare(prev => {
      const exists = prev.some(c => c.id === car.id);
      return exists ? prev.filter(c => c.id !== car.id) : [...prev, car];
    });
  };

  const handleCompareClick = () => {
    if (carsToCompare.length >= 2) setShowCompareView(true);
  };

  return (
    <div className="min-h-screen bg-gray-50 relative">
      <TopNavigation />

      <div className={`max-w-7xl mx-auto px-4 py-8 pb-24 ${selectedCar ? "blur-sm" : ""}`}>
        {/* Header */}
        <div className="mb-8">
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-2xl font-bold">Featured Vehicles</h2>
            <div className="flex items-center gap-4">
              <div className="relative">
                <input
                  type="text"
                  placeholder="Search cars..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10 pr-4 py-2 border rounded-lg"
                />
                <Search className="h-5 w-5 text-gray-400 absolute left-3 top-1/2 -translate-y-1/2" />
              </div>
              <button
                onClick={() => setShowFilters(!showFilters)}
                className="flex items-center gap-2 px-4 py-2 border rounded-lg"
              >
                <SlidersHorizontal className="h-5 w-5" /> Filters
              </button>
            </div>
          </div>

          {showFilters && (
            <FilterPanel
              filters={filters}
              updateFilters={updateFilters}
              clearFilters={clearFilters}
            />
          )}
        </div>

        {/* Cars Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredCars.map((car) => (
            <CarCard
              key={car.id}
              car={car}
              onCardClick={() => {
                setSelectedCar(car);
                setCurrentImageIndex(0);
              }}
              onChatClick={handleChatClick}
              onToggleCompare={() => handleToggleCompare(car)}
              isInCompare={carsToCompare.some((c) => c.id === car.id)}
              compareDisabled={carsToCompare.length >= 4 && !carsToCompare.some((c) => c.id === car.id)}
            />
          ))}
        </div>

        {/* Loading / No more data */}
        <div className="text-center py-4">
          {isLoading && <span className="text-gray-500">Loading more cars...</span>}
          {!hasMore && <span className="text-gray-400">No more cars to load.</span>}
        </div>
      </div>

      {selectedCar && (
        <ExpandedCarCard
          car={selectedCar}
          onClose={() => setSelectedCar(null)}
          onChatClick={handleChatClick}
          currentImageIndex={currentImageIndex}
          onPrevImage={handlePrevImage}
          onNextImage={handleNextImage}
          onToggleCompare={() => handleToggleCompare(selectedCar)}
          isInCompare={carsToCompare.some((c) => c.id === selectedCar.id)}
          compareDisabled={carsToCompare.length >= 4 && !carsToCompare.some((c) => c.id === selectedCar.id)}
        />
      )}

      {showCompareView && (
        <CompareView
          cars={carsToCompare}
          onRemoveCar={handleRemoveFromCompare}
          onClose={() => setShowCompareView(false)}
        />
      )}

      <CompareButton carsToCompare={carsToCompare} onCompareClick={handleCompareClick} />

      <BottomNavigation />
    </div>
  );
};
