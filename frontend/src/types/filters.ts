// types/filters.ts

export type Filters = {
    brand?: string;
    model?: string;
    yearRange?: [number, number];
    priceRange?: [number, number];
    fuelType?: string;
    transmission?: string;
    location?: string;
  };
  