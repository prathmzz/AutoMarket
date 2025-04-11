import { Car } from '../types/car';

const sampleCars: Car[] = [
    {
      id: 1,
      title: 'BMW M3',
      price: 75000,
      location: 'New York, NY',
      year: 2023,
      postedAt: '2 days ago',
      images: [
        'https://images.unsplash.com/photo-1494976388531-d1058494cdd8?w=800&q=80',
        'https://images.unsplash.com/photo-1583121274602-3e2820c69888?w=800&q=80',
        'https://images.unsplash.com/photo-1617654112368-307921291f42?w=800&q=80',
      ],
      description:
        'Excellent condition BMW M3 with all premium features. Regular maintenance and service history available.',
      kmsDriven: 15000,
      postedBy: 'John Doe',
    },
    {
      id: 2,
      title: 'Tesla Model S',
      price: 90000,
      location: 'San Francisco, CA',
      year: 2022,
      postedAt: '5 hours ago',
      images: [
        'https://images.unsplash.com/photo-1617225731314-bcd21c1e4e54?w=800&q=80',
        'https://images.unsplash.com/photo-1622190926106-3b4b7c3321df?w=800&q=80',
      ],
      description:
        'Long range Tesla Model S with autopilot. No accidents and in showroom condition.',
      kmsDriven: 8000,
      postedBy: 'Alice Smith',
    },
    {
      id: 3,
      title: 'Ford Mustang GT',
      price: 45000,
      location: 'Austin, TX',
      year: 2020,
      postedAt: '1 week ago',
      images: [
        'https://images.unsplash.com/photo-1619746941603-d54f2781a6fc?w=800&q=80',
        'https://images.unsplash.com/photo-1592194996308-7b43878e84c7?w=800&q=80',
      ],
      description:
        'Muscle car in top shape with custom exhaust and wheels. Great for performance lovers.',
      kmsDriven: 30000,
      postedBy: 'Mike Johnson',
    },
    {
      id: 4,
      title: 'Toyota Corolla',
      price: 18000,
      location: 'Chicago, IL',
      year: 2019,
      postedAt: '3 days ago',
      images: ['https://images.unsplash.com/photo-1627454821018-41c21e8f35fc?w=800&q=80'],
      description: 'Reliable and fuel-efficient sedan. Perfect for daily commute.',
      kmsDriven: 45000,
      postedBy: 'Sarah Lee',
    },
    {
      id: 5,
      title: 'Honda Civic',
      price: 21000,
      location: 'Los Angeles, CA',
      year: 2021,
      postedAt: '6 hours ago',
      images: ['https://images.unsplash.com/photo-1604847022160-3e91cda8d801?w=800&q=80'],
      description:
        'Sporty Civic with sunroof, touch display, and backup camera. One owner only.',
      kmsDriven: 25000,
      postedBy: 'David Kim',
    },
    {
      id: 6,
      title: 'Mahindra Thar',
      price: 13000,
      location: 'Mumbai, India',
      year: 2022,
      postedAt: '1 day ago',
      images: ['https://images.unsplash.com/photo-1631748351803-e40c12bb1044?w=800&q=80'],
      description: 'Adventure-ready SUV with 4x4 capabilities. Ideal for off-roading and travel.',
      kmsDriven: 18000,
      postedBy: 'Rahul Verma',
    },
    {
      id: 7,
      title: 'Hyundai Creta',
      price: 20000,
      location: 'Bangalore, India',
      year: 2020,
      postedAt: '2 days ago',
      images: ['https://images.unsplash.com/photo-1655907321812-b4ec4a73e879?w=800&q=80'],
      description:
        'Mid-size SUV in great condition with leather seats and Android Auto.',
      kmsDriven: 30000,
      postedBy: 'Sneha Reddy',
    },
  ];
  
  export default sampleCars;
  