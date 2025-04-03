import { useState, useEffect } from 'react';
import { 
  Utensils, 
  Users, 
  Leaf, 
  DollarSign, 
  TrendingUp,
  Clock,
  MapPin
} from 'lucide-react';
import { Card } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';

// Mock data that would typically come from Firebase
const mockData = {
  totalMeals: 12500,
  totalDonations: 450,
  totalRecipients: 35,
  totalVolunteers: 120,
  foodWasteReduced: 8500, // in kg
  co2Reduced: 12000, // in kg
  moneySaved: 25000, // in dollars
  topDonors: [
    { name: 'Green Grocers', amount: 1200 },
    { name: 'Fresh Market', amount: 950 },
    { name: 'City Bakery', amount: 800 },
  ],
  topRecipients: [
    { name: 'Hope Shelter', meals: 2500 },
    { name: 'Community Kitchen', meals: 1800 },
    { name: 'Youth Center', meals: 1500 },
  ],
  monthlyStats: [
    { month: 'Jan', meals: 800, donations: 30 },
    { month: 'Feb', meals: 950, donations: 35 },
    { month: 'Mar', meals: 1100, donations: 40 },
    { month: 'Apr', meals: 1200, donations: 45 },
    { month: 'May', meals: 1300, donations: 50 },
    { month: 'Jun', meals: 1400, donations: 55 },
  ]
};

const Impact = () => {
  const [stats, setStats] = useState(mockData);

  // Simulate real-time updates
  useEffect(() => {
    const interval = setInterval(() => {
      setStats(prev => ({
        ...prev,
        totalMeals: prev.totalMeals + Math.floor(Math.random() * 10),
        totalDonations: prev.totalDonations + Math.floor(Math.random() * 2),
        foodWasteReduced: prev.foodWasteReduced + Math.floor(Math.random() * 5),
        co2Reduced: prev.co2Reduced + Math.floor(Math.random() * 8),
        moneySaved: prev.moneySaved + Math.floor(Math.random() * 15),
      }));
    }, 5000); // Update every 5 seconds

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="min-h-screen bg-gray-50 py-12">
      <div className="container mx-auto px-4">
        {/* Hero Section */}
        <div className="text-center mb-16">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">Our Impact</h1>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Together, we're making a difference in reducing food waste and fighting hunger.
            Every donation and delivery contributes to our growing impact.
          </p>
        </div>

        {/* Key Metrics */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-16">
          <Card className="p-6">
            <div className="flex items-center mb-4">
              <Utensils className="w-8 h-8 text-green-600 mr-3" />
              <h3 className="text-lg font-semibold">Meals Provided</h3>
            </div>
            <p className="text-3xl font-bold text-gray-900">{stats.totalMeals.toLocaleString()}</p>
            <p className="text-sm text-gray-500 mt-2">and counting...</p>
          </Card>

          <Card className="p-6">
            <div className="flex items-center mb-4">
              <Leaf className="w-8 h-8 text-green-600 mr-3" />
              <h3 className="text-lg font-semibold">Food Waste Reduced</h3>
            </div>
            <p className="text-3xl font-bold text-gray-900">{stats.foodWasteReduced.toLocaleString()} kg</p>
            <p className="text-sm text-gray-500 mt-2">of food saved from landfills</p>
          </Card>

          <Card className="p-6">
            <div className="flex items-center mb-4">
              <Users className="w-8 h-8 text-green-600 mr-3" />
              <h3 className="text-lg font-semibold">People Reached</h3>
            </div>
            <p className="text-3xl font-bold text-gray-900">{stats.totalRecipients.toLocaleString()}</p>
            <p className="text-sm text-gray-500 mt-2">organizations supported</p>
          </Card>

          <Card className="p-6">
            <div className="flex items-center mb-4">
              <DollarSign className="w-8 h-8 text-green-600 mr-3" />
              <h3 className="text-lg font-semibold">Money Saved</h3>
            </div>
            <p className="text-3xl font-bold text-gray-900">${stats.moneySaved.toLocaleString()}</p>
            <p className="text-sm text-gray-500 mt-2">in food costs</p>
          </Card>
        </div>

        {/* Monthly Progress */}
        <div className="mb-16">
          <h2 className="text-2xl font-bold text-gray-900 mb-6">Monthly Progress</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <Card className="p-6">
              <h3 className="text-lg font-semibold mb-4">Meals Provided</h3>
              <div className="space-y-4">
                {stats.monthlyStats.map((stat, index) => (
                  <div key={index}>
                    <div className="flex justify-between mb-1">
                      <span className="text-sm font-medium">{stat.month}</span>
                      <span className="text-sm text-gray-500">{stat.meals} meals</span>
                    </div>
                    <Progress value={(stat.meals / 1500) * 100} className="h-2" />
                  </div>
                ))}
              </div>
            </Card>

            <Card className="p-6">
              <h3 className="text-lg font-semibold mb-4">Donations Received</h3>
              <div className="space-y-4">
                {stats.monthlyStats.map((stat, index) => (
                  <div key={index}>
                    <div className="flex justify-between mb-1">
                      <span className="text-sm font-medium">{stat.month}</span>
                      <span className="text-sm text-gray-500">{stat.donations} donations</span>
                    </div>
                    <Progress value={(stat.donations / 60) * 100} className="h-2" />
                  </div>
                ))}
              </div>
            </Card>
          </div>
        </div>

        {/* Top Contributors */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <Card className="p-6">
            <h2 className="text-2xl font-bold text-gray-900 mb-6">Top Donors</h2>
            <div className="space-y-4">
              {stats.topDonors.map((donor, index) => (
                <div key={index} className="flex items-center justify-between">
                  <div className="flex items-center">
                    <div className="w-8 h-8 rounded-full bg-green-100 flex items-center justify-center mr-3">
                      <MapPin className="w-4 h-4 text-green-600" />
                    </div>
                    <span className="font-medium">{donor.name}</span>
                  </div>
                  <span className="text-green-600 font-semibold">{donor.amount} kg</span>
                </div>
              ))}
            </div>
          </Card>

          <Card className="p-6">
            <h2 className="text-2xl font-bold text-gray-900 mb-6">Top Recipients</h2>
            <div className="space-y-4">
              {stats.topRecipients.map((recipient, index) => (
                <div key={index} className="flex items-center justify-between">
                  <div className="flex items-center">
                    <div className="w-8 h-8 rounded-full bg-green-100 flex items-center justify-center mr-3">
                      <Users className="w-4 h-4 text-green-600" />
                    </div>
                    <span className="font-medium">{recipient.name}</span>
                  </div>
                  <span className="text-green-600 font-semibold">{recipient.meals} meals</span>
                </div>
              ))}
            </div>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default Impact; 