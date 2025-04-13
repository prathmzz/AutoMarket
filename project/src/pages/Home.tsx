import React, { useEffect, useState } from "react";
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
import axios from "axios";

export const Home: React.FC = () => {
  const navigate = useNavigate();
  const [allCars, setAllCars] = useState<Car[]>([]);
  const [visibleCars, setVisibleCars] = useState<Car[]>([]);
  const [selectedCar, setSelectedCar] = useState<Car | null>(null);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [searchTerm, setSearchTerm] = useState("");
  const [showFilters, setShowFilters] = useState(false);
  const [carsToCompare, setCarsToCompare] = useState<Car[]>([]);
  const [showCompareView, setShowCompareView] = useState(false);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [carsToShow, setCarsToShow] = useState(6); // Lazy loading: show 6 cars initially

  const { filters, updateFilters, clearFilters, filteredCars } = useCarFilter(allCars, searchTerm);

  const fetchCars = async () => {
    setLoading(true);
    setError("");

    try {
      const res = await axios.get("http://localhost:5000/home/home-listings", {
        headers: {
          Authorization:
            `Bearer ${localStorage.getItem("token")}` || "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJmcmVzaCI6ZmFsc2UsImlhdCI6MTc0NDUzMzI0OSwianRpIjoiMjBjZDZkMTctMzQ5Ni00NmU3LWE4ZDAtMTJmNTg5YzRiZjJhIiwidHlwZSI6ImFjY2VzcyIsInN1YiI6IjY3ZmFkNmU1YzdiODFiOGJmMmU4NzI4YyIsIm5iZiI6MTc0NDUzMzI0OSwiY3NyZiI6IjY0OTVmZDZhLTk4NGYtNDQwNC04MTkxLTg3NWU5YzU0ZDFkNSIsImV4cCI6MTc0NDUzNDE0OX0.HYRe3P7_oWbjw8uXEqttaDpZU6gpyKrhqa3M8pj60wA",
        },
      });

      const carsWithIds = res.data.map((car: any) => ({
        ...car,
        id: car._id, // Map _id to id
      }));

      setAllCars(carsWithIds);
    } catch (err) {
      setError("Failed to load car listings. Please try again later.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchCars();
  }, []);

  useEffect(() => {
    setVisibleCars(filteredCars.slice(0, carsToShow));
  }, [filteredCars, carsToShow]);

  const handleChatClick = (carId: string) => navigate(`/chat-seller/${carId}`);

  const handleRemoveFromCompare = (carId: string) => {
    setCarsToCompare((prev) => prev.filter((car) => car.id !== carId));
  };

  const handlePrevImage = () => {
    if (selectedCar) {
      setCurrentImageIndex((prev) =>
        prev === 0 ? selectedCar.images.length - 1 : prev - 1
      );
    }
  };

  const handleNextImage = () => {
    if (selectedCar) {
      setCurrentImageIndex((prev) =>
        prev === selectedCar.images.length - 1 ? 0 : prev + 1
      );
    }
  };

  const handleToggleCompare = (car: Car) => {
    setCarsToCompare((prev) => {
      const exists = prev.some((c) => c.id === car.id);
      return exists ? prev.filter((c) => c.id !== car.id) : [...prev, car];
    });
  };

  const handleCompareClick = () => {
    if (carsToCompare.length >= 2) setShowCompareView(true);
  };

  const handleLoadMore = () => {
    setCarsToShow((prev) => prev + 6);
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

        {/* Loading & Error */}
        {loading && <div className="text-center text-lg font-medium">Loading...</div>}
        {error && <div className="text-red-600 text-center mb-4">{error}</div>}

        {/* Cars Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {!loading &&
            visibleCars.map((car) => (
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
                compareDisabled={
                  carsToCompare.length >= 4 && !carsToCompare.some((c) => c.id === car.id)
                }
              />
            ))}
        </div>

        {!loading && visibleCars.length < filteredCars.length && (
          <div className="flex justify-center mt-6">
            <button
              onClick={handleLoadMore}
              className="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 transition"
            >
              Load More
            </button>
          </div>
        )}
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
          compareDisabled={
            carsToCompare.length >= 4 &&
            !carsToCompare.some((c) => c.id === selectedCar.id)
          }
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
