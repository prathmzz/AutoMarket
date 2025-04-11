import { useState, useMemo } from "react";
import { Car } from "../types/car";

export const useCarFilter = (cars: Car[], searchTerm: string) => {
  const [filters, setFilters] = useState({
    minPrice: "",
    maxPrice: "",
    minYear: "",
    maxYear: "",
    location: "",
  });

  const updateFilters = (newFilters: Partial<typeof filters>) => {
    setFilters((prev) => ({ ...prev, ...newFilters }));
  };

  const clearFilters = () => {
    setFilters({
      minPrice: "",
      maxPrice: "",
      minYear: "",
      maxYear: "",
      location: "",
    });
  };

  const filteredCars = useMemo(() => {
    return cars.filter((car) => {
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
  }, [cars, searchTerm, filters]);

  return {
    filters,
    updateFilters,
    clearFilters,
    filteredCars,
  };
};
