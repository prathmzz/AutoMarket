import React from 'react';
import { User, MapPin, Phone, Mail } from 'lucide-react';
import { TopNavigation } from '../components/TopNavigation';
import { BottomNavigation } from '../components/BottomNavigation';
import { useNavigate } from 'react-router-dom';


export const Profile: React.FC = () => {

      const navigate = useNavigate();
    
  // Dummy user data
  const user = {
    name: "John Doe",
    location: "New York, NY",
    phone: "+1 (555) 123-4567",
    email: "john.doe@example.com",
    recentAds: [
      {
        id: 1,
        title: "BMW M3 2023",
        price: "$75,000",
        image: "https://images.unsplash.com/photo-1550355291-bbee04a92027?w=500&q=80",
        status: "active"
      },
      {
        id: 2,
        title: "Mercedes C300 2022",
        price: "$45,000",
        image: "https://images.unsplash.com/photo-1583121274602-3e2820c69888?w=500&q=80",
        status: "sold"
      }
    ]
  };

  const handleLogout = () => {
    // Add logout logic here
    navigate('/login');
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <TopNavigation />

      <div className="max-w-7xl mx-auto px-4 py-6 pb-24">
        <div className="bg-white rounded-lg shadow-sm p-6">
          {/* User Info */}
          <div className="flex items-center mb-6">
            <div className="bg-indigo-100 rounded-full p-4">
              <User className="h-12 w-12 text-indigo-600" />
            </div>
            <div className="ml-4">
              <h2 className="text-2xl font-bold text-gray-900">{user.name}</h2>
              <p className="text-gray-500">Member since 2023</p>
            </div>
          </div>

          {/* Contact Information */}
          <div className="space-y-4 mb-8">
            <div className="flex items-center text-gray-600">
              <MapPin className="h-5 w-5 mr-3" />
              <span>{user.location}</span>
            </div>
            <div className="flex items-center text-gray-600">
              <Phone className="h-5 w-5 mr-3" />
              <span>{user.phone}</span>
            </div>
            <div className="flex items-center text-gray-600">
              <Mail className="h-5 w-5 mr-3" />
              <span>{user.email}</span>
            </div>
          </div>

          {/* Recent Ads */}
          <div className="mb-8">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Recent Ads</h3>
            <div className="space-y-4">
              {user.recentAds.map((ad) => (
                <div key={ad.id} className="flex items-center space-x-4 p-3 bg-gray-50 rounded-lg">
                  <img
                    src={ad.image}
                    alt={ad.title}
                    className="w-20 h-20 object-cover rounded-lg"
                  />
                  <div>
                    <h4 className="font-semibold text-gray-900">{ad.title}</h4>
                    <p className="text-gray-600">{ad.price}</p>
                    <span className={`text-sm ${
                      ad.status === 'active' ? 'text-green-600' : 'text-gray-500'
                    }`}>
                      {ad.status.charAt(0).toUpperCase() + ad.status.slice(1)}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Logout Button */}
          <button
            onClick={handleLogout}
            className="w-full bg-red-600 text-white py-3 rounded-lg hover:bg-red-700 transition-colors"
          >
            Logout
          </button>
        </div>
      </div>

      <BottomNavigation />
    </div>
  );
};