import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { TopNavigation } from "../components/TopNavigation";
import { BottomNavigation } from "../components/BottomNavigation";
import { CarCard } from "../components/CarCard";
import { ExpandedCarCard } from "../components/ExpandedCarCard";
import { CompareButton } from "../components/CompareButton";
import { Car } from "../types/car";
import { Search, SlidersHorizontal } from "lucide-react";
import { CompareView } from "../components/CompareView";


const sampleCars: Car[] = [
  {
    id: 1,
    title: "BMW M3",
    price: 75000,
    location: "New York, NY",
    year: 2023,
    postedAt: "2 days ago",
    images: [
      "https://images.unsplash.com/photo-1494976388531-d1058494cdd8?w=800&q=80",
      "https://images.unsplash.com/photo-1583121274602-3e2820c69888?w=800&q=80",
      "https://images.unsplash.com/photo-1617654112368-307921291f42?w=800&q=80",
    ],
    description:
      "Excellent condition BMW M3 with all premium features. Regular maintenance and service history available.",
    kmsDriven: 15000,
    postedBy: "John Doe",
  },
  {
    id: 2,
    title: "BMW w3",
    price: 78000,
    location: "New York, NY",
    year: 2023,
    postedAt: "25 days ago",
    images: [
      "https://images.unsplash.com/photo-1494976388531-d1058494cdd8?w=800&q=80",
      "https://images.unsplash.com/photo-1583121274602-3e2820c69888?w=800&q=80",
      "https://images.unsplash.com/photo-1617654112368-307921291f42?w=800&q=80",
    ],
    description:
      "Excellent condition BMW M3 with all premium features. Regular maintenance and service history available.",
    kmsDriven: 15000,
    postedBy: "John Doe",
  },
  // Add more sample cars here
];

export const Home: React.FC = () => {
  const navigate = useNavigate();
  const [selectedCar, setSelectedCar] = useState<Car | null>(null);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [searchTerm, setSearchTerm] = useState("");
  const [showFilters, setShowFilters] = useState(false);
  const [carsToCompare, setCarsToCompare] = useState<Car[]>([]);
  const [showCompareView, setShowCompareView] = useState(false);
  const [filters, setFilters] = useState({
    minPrice: "",
    maxPrice: "",
    minYear: "",
    maxYear: "",
    location: "",
  });

  const handleChatClick = (carId: number) => {
    navigate(`/chat-seller/${carId}`);
  };

  const handleRemoveFromCompare = (carId: number) => {
    setCarsToCompare((prevCars) => prevCars.filter((car) => car.id !== carId));
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
      const isInCompare = prev.some((c) => c.id === car.id);
      if (isInCompare) {
        return prev.filter((c) => c.id !== car.id);
      }
      return [...prev, car];
    });
  };

  const handleCompareClick = () => {
    if (carsToCompare.length >= 2) {
      setShowCompareView(true);
    }
  };

  const filteredCars = sampleCars.filter((car) => {
    const matchesSearch =
      car.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      car.location.toLowerCase().includes(searchTerm.toLowerCase());

    const matchesPrice =
      (!filters.minPrice || car.price >= Number(filters.minPrice)) &&
      (!filters.maxPrice || car.price <= Number(filters.maxPrice));

    const matchesYear =
      (!filters.minYear || car.year >= Number(filters.minYear)) &&
      (!filters.maxYear || car.year <= Number(filters.maxYear));

    const matchesLocation =
      !filters.location ||
      car.location.toLowerCase().includes(filters.location.toLowerCase());

    return matchesSearch && matchesPrice && matchesYear && matchesLocation;
  });

  return (
    <div className="min-h-screen bg-gray-50 relative">
      <TopNavigation />

      {/* Main Content */}
      <div
        className={`max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 pb-24 ${
          selectedCar ? "blur-sm" : ""
        }`}
      >
        {/* Header with Search and Filters */}
        <div className="mb-8">
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-2xl font-bold text-gray-900">
              Featured Vehicles
            </h2>
            <div className="flex items-center gap-4">
              <div className="relative">
                <input
                  type="text"
                  placeholder="Search cars..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
                />
                <Search className="h-5 w-5 text-gray-400 absolute left-3 top-1/2 -translate-y-1/2" />
              </div>
              <button
                onClick={() => setShowFilters(!showFilters)}
                className="flex items-center gap-2 px-4 py-2 bg-white border border-gray-300 rounded-lg hover:bg-gray-50"
              >
                <SlidersHorizontal className="h-5 w-5" />
                Filters
              </button>
            </div>
          </div>

          {/* Filters Panel */}
          {showFilters && (
            <div className="bg-white p-4 rounded-lg shadow-md mb-6">
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Price Range
                  </label>
                  <div className="flex gap-2">
                    <input
                      type="number"
                      placeholder="Min"
                      value={filters.minPrice}
                      onChange={(e) =>
                        setFilters({ ...filters, minPrice: e.target.value })
                      }
                      className="w-full px-3 py-2 border border-gray-300 rounded-md"
                    />
                    <input
                      type="number"
                      placeholder="Max"
                      value={filters.maxPrice}
                      onChange={(e) =>
                        setFilters({ ...filters, maxPrice: e.target.value })
                      }
                      className="w-full px-3 py-2 border border-gray-300 rounded-md"
                    />
                  </div>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Year Range
                  </label>
                  <div className="flex gap-2">
                    <input
                      type="number"
                      placeholder="Min"
                      value={filters.minYear}
                      onChange={(e) =>
                        setFilters({ ...filters, minYear: e.target.value })
                      }
                      className="w-full px-3 py-2 border border-gray-300 rounded-md"
                    />
                    <input
                      type="number"
                      placeholder="Max"
                      value={filters.maxYear}
                      onChange={(e) =>
                        setFilters({ ...filters, maxYear: e.target.value })
                      }
                      className="w-full px-3 py-2 border border-gray-300 rounded-md"
                    />
                  </div>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Location
                  </label>
                  <input
                    type="text"
                    placeholder="Enter location"
                    value={filters.location}
                    onChange={(e) =>
                      setFilters({ ...filters, location: e.target.value })
                    }
                    className="w-full px-3 py-2 border border-gray-300 rounded-md"
                  />
                </div>
                <div className="flex items-end">
                  <button
                    onClick={() =>
                      setFilters({
                        minPrice: "",
                        maxPrice: "",
                        minYear: "",
                        maxYear: "",
                        location: "",
                      })
                    }
                    className="w-full px-4 py-2 text-indigo-600 border border-indigo-600 rounded-md hover:bg-indigo-50"
                  >
                    Clear Filters
                  </button>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Car Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredCars.map((car) => (
            <CarCard
              key={car.id}
              car={car}
              onCardClick={(car) => {
                setSelectedCar(car);
                setCurrentImageIndex(0);
              }}
              onChatClick={handleChatClick}
              onToggleCompare={() => handleToggleCompare(car)}
              isInCompare={carsToCompare.some((c) => c.id === car.id)}
              compareDisabled={
                carsToCompare.length >= 4 &&
                !carsToCompare.some((c) => c.id === car.id)
              }
            />
          ))}
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


      <CompareButton
        carsToCompare={carsToCompare}
        onCompareClick={handleCompareClick}
      />

      <BottomNavigation />
    </div>
  );
};
