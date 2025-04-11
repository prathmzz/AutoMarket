import React, { useState } from 'react';
import { TopNavigation } from '../components/TopNavigation';
import { BottomNavigation } from '../components/BottomNavigation';

export const PredictCarPrice: React.FC = () => {
  const [formData, setFormData] = useState({
    purchasedYear: '',
    sellingPrice: '',
    presentPrice: '',
    kmsDriven: '',
    fuelType: 'Petrol',
    sellerType: 'Individual',
    transmission: 'Manual',
    owner: 'First Owner'
  });

  const [isLoading, setIsLoading] = useState(false);
  const [predictedPrice, setPredictedPrice] = useState<string | null>(null);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setPredictedPrice(null);

    // Simulating backend delay
    setTimeout(() => {
      setIsLoading(false);
      setPredictedPrice('₹3,85,000'); // static price for now
    }, 3000);
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <TopNavigation />

      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8 pb-48">
        <div className="bg-white rounded-lg shadow-md p-6">
          <h1 className="text-4xl font-serif font-bold text-blue-500 mb-8 mt-2">Predict Car Price</h1>

          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* All Input Fields */}
              {[
                { label: 'Purchased Year', name: 'purchasedYear' },
                { label: 'Selling Price', name: 'sellingPrice' },
                { label: 'Present Price', name: 'presentPrice' },
                { label: 'Kilometers Driven', name: 'kmsDriven' }
              ].map(({ label, name }) => (
                <div key={name}>
                  <label className="block text-lg font-medium text-gray-700">{label}</label>
                  <input
                    type="number"
                    name={name}
                    value={formData[name as keyof typeof formData]}
                    onChange={handleChange}
                    className="mt-2 block w-full py-2 px-4 text-base rounded-md border border-gray-400 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
                    required
                  />
                </div>
              ))}

              {/* Selects */}
              {[
                { label: 'Fuel Type', name: 'fuelType', options: ['Petrol', 'Diesel', 'CNG'] },
                { label: 'Seller Type', name: 'sellerType', options: ['Individual', 'Dealer'] },
                { label: 'Transmission', name: 'transmission', options: ['Manual', 'Automatic'] },
                { label: 'Owner', name: 'owner', options: ['First Owner', 'Second Owner', 'Third Owner', 'Fourth & Above Owner'] }
              ].map(({ label, name, options }) => (
                <div key={name}>
                  <label className="block text-lg font-medium text-gray-700">{label}</label>
                  <select
                    name={name}
                    value={formData[name as keyof typeof formData]}
                    onChange={handleChange}
                    className="mt-2 block w-full py-2 px-4 text-base rounded-md border border-gray-400 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
                  >
                    {options.map(opt => (
                      <option key={opt} value={opt}>{opt}</option>
                    ))}
                  </select>
                </div>
              ))}
            </div>

            {/* Predict Button & Price Box */}
            <div className="flex flex-col md:flex-row items-center justify-between mt-10 gap-6">
              {/* Predicted Price Box */}
              {(isLoading || predictedPrice) && (
                <div className="w-full md:w-1/2 bg-yellow-100 border-2 border-yellow-400 text-yellow-800 text-xl font-semibold px-6 py-4 rounded-lg shadow-sm text-center">
                  {isLoading ? (
                    <div className="animate-pulse">Predicting price...</div>
                  ) : (
                    <div>Predicted Price: <span className="text-2xl font-bold text-green-600">{predictedPrice}</span></div>
                  )}
                </div>
              )}

              {/* Submit Button */}
              <button
                type="submit"
                className="w-full md:w-auto bg-indigo-600 text-white px-6 py-3 text-lg rounded-md hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
              >
                Predict Price
              </button>
            </div>
          </form>
        </div>
      </div>

      <BottomNavigation />
    </div>
  );
};
