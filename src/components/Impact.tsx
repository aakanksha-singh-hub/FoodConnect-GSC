import { useState, useEffect } from 'react';
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell
} from 'recharts';
import { Utensils, Leaf, Users, IndianRupee } from 'lucide-react';

const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042'];

// Mock data for demonstration
const foodTypeData = [
  { name: 'Fresh Produce', value: 15 },
  { name: 'Bakery Items', value: 10 },
  { name: 'Prepared Meals', value: 8 },
  { name: 'Groceries', value: 7 }
];

const locationData = [
  { name: 'Downtown', value: 12 },
  { name: 'Suburbs', value: 8 },
  { name: 'West End', value: 6 },
  { name: 'East Side', value: 4 }
];

export default function Impact() {
  const [completedDeliveries, setCompletedDeliveries] = useState(50); // Starting with 50 deliveries

  useEffect(() => {
    // Get the count from localStorage or initialize it
    const storedCount = localStorage.getItem('completedDeliveries');
    setCompletedDeliveries(storedCount ? parseInt(storedCount) : 50);
  }, []);

  // Calculate impact metrics based on completed deliveries
  const totalFoodSaved = completedDeliveries * 2.5; // 2.5kg per delivery (more realistic)
  const mealsProvided = totalFoodSaved * 2; // 2 meals per kg
  const moneyValue = totalFoodSaved * 100; // ₹100 per kg

  return (
    <section className="py-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">Our Impact</h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Together, we're making a difference in reducing food waste and fighting hunger. 
            Every donation and delivery contributes to our growing impact.
          </p>
        </div>

        {/* Impact Metrics */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-16">
          <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-100">
            <div className="flex items-center gap-3 mb-2">
              <Utensils className="w-6 h-6 text-brand-green" />
              <h3 className="text-lg font-medium text-gray-900">Meals Provided</h3>
            </div>
            <p className="text-3xl font-bold text-gray-900">{mealsProvided}</p>
            <p className="text-sm text-gray-500">and counting...</p>
          </div>

          <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-100">
            <div className="flex items-center gap-3 mb-2">
              <Leaf className="w-6 h-6 text-brand-green" />
              <h3 className="text-lg font-medium text-gray-900">Food Waste Reduced</h3>
            </div>
            <p className="text-3xl font-bold text-gray-900">{totalFoodSaved} kg</p>
            <p className="text-sm text-gray-500">of food saved from landfills</p>
          </div>

          <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-100">
            <div className="flex items-center gap-3 mb-2">
              <Users className="w-6 h-6 text-brand-green" />
              <h3 className="text-lg font-medium text-gray-900">People Reached</h3>
            </div>
            <p className="text-3xl font-bold text-gray-900">8</p>
            <p className="text-sm text-gray-500">organizations supported</p>
          </div>

          <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-100">
            <div className="flex items-center gap-3 mb-2">
              <IndianRupee className="w-6 h-6 text-brand-green" />
              <h3 className="text-lg font-medium text-gray-900">Money Saved</h3>
            </div>
            <p className="text-3xl font-bold text-gray-900">₹{moneyValue.toLocaleString()}</p>
            <p className="text-sm text-gray-500">in food costs</p>
          </div>
        </div>

        {/* Monthly Progress */}
        <div>
          <h2 className="text-2xl font-bold text-gray-900 mb-6">Monthly Progress</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-100">
              <h3 className="text-lg font-medium text-gray-900 mb-4">Meals Provided</h3>
              {/* Chart will go here */}
            </div>
            <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-100">
              <h3 className="text-lg font-medium text-gray-900 mb-4">Donations Received</h3>
              {/* Chart will go here */}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
