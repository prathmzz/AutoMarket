export interface Car {
  id: number; // You'll need to map _id to id when transforming API data
  name: string;
  price: number;
  location: string;
  year_of_purchase: number;
  postedAt: string;
  images: string[];
  description: string;
  mileage: number;
  postedBy: string;

  // Optional / Additional fields from API
  make?: string;
  model?: string;
  transmission?: string;
  color?: string;
  engine_capacity?: string;
  fuel_type?: string;
  insurance_valid_until?: string;
  owners?: number;
}
