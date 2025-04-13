export interface Car {
    id: number;
    name: string;
    price: number;
    location: string;
    year_of_purchase: number;
    postedAt: string;
    images: string[];
    description: string;
    mileage: number;
    postedBy: string;
    make?: string; // Optional property
    model?: string; // Optional property
    transmission?: string; // Optional property
      
  }