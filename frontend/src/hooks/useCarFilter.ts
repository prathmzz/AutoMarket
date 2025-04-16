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
      const carName = car.name?.toLowerCase() ?? "";
      const carLocation = car.location?.toLowerCase() ?? "";
      const search = searchTerm.toLowerCase();

      const matchesSearch =
        carName.includes(search) || carLocation.includes(search);

      const matchesPrice =
        (!filters.minPrice || car.price >= Number(filters.minPrice)) &&
        (!filters.maxPrice || car.price <= Number(filters.maxPrice));

      const matchesYear =
        (!filters.minYear || car.year_of_purchase >= Number(filters.minYear)) &&
        (!filters.maxYear || car.year_of_purchase <= Number(filters.maxYear));

      const matchesLocation =
        !filters.location ||
        carLocation.includes(filters.location.toLowerCase());

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
