import { useState, useEffect } from "react";
import {
  Utensils,
  Users,
  Leaf,
  DollarSign,
  TrendingUp,
  Clock,
  MapPin,
  Award,
  Heart,
  Globe,
} from "lucide-react";
import { Card } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import PageLayout from "@/components/PageLayout";
import { motion } from "framer-motion";

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
    { name: "Green Grocers", amount: 1200 },
    { name: "Fresh Market", amount: 950 },
    { name: "City Bakery", amount: 800 },
  ],
  topRecipients: [
    { name: "Hope Shelter", meals: 2500 },
    { name: "Community Kitchen", meals: 1800 },
    { name: "Youth Center", meals: 1500 },
  ],
  monthlyStats: [
    { month: "Jan", meals: 800, donations: 30 },
    { month: "Feb", meals: 950, donations: 35 },
    { month: "Mar", meals: 1100, donations: 40 },
    { month: "Apr", meals: 1200, donations: 45 },
    { month: "May", meals: 1300, donations: 50 },
    { month: "Jun", meals: 1400, donations: 55 },
  ],
};

const Impact = () => {
  const [stats, setStats] = useState(mockData);

  // Simulate real-time updates
  useEffect(() => {
    const interval = setInterval(() => {
      setStats((prev) => ({
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
    <PageLayout>
      {/* Hero Section */}
      <section className="relative overflow-hidden">
        {/* Enhanced background with gradient and patterns */}
        <div className="absolute inset-0">
          {/* Main gradient background */}
          <div className="absolute inset-0 bg-gradient-to-br from-brand-green/10 via-white to-brand-blue/10"></div>

          {/* Animated gradient overlay */}
          <div className="absolute inset-0 bg-gradient-to-tr from-brand-orange/5 via-transparent to-brand-green/5 animate-gradient"></div>

          {/* Subtle pattern overlay */}
          <div className="absolute inset-0 bg-grid-pattern opacity-[0.03]"></div>

          {/* Decorative circles */}
          <div className="absolute top-20 left-10 w-64 h-64 bg-brand-green/5 rounded-full blur-3xl"></div>
          <div className="absolute bottom-20 right-10 w-64 h-64 bg-brand-blue/5 rounded-full blur-3xl"></div>
        </div>

        <div className="relative py-16 md:py-24">
          <div className="container mx-auto px-4">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="max-w-3xl mx-auto text-center"
            >
              <motion.h2
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6 }}
                className="text-3xl font-bold mb-12 text-center text-brand-green"
              >
                Our Impact
              </motion.h2>
              <p className="text-lg text-gray-600 mb-8">
                Together, we're making a difference in reducing food waste and
                fighting hunger. Every donation and delivery contributes to our
                growing impact.
              </p>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Key Metrics */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <div className="max-w-6xl mx-auto">
            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="text-3xl font-bold mb-12 text-center text-brand-dark"
            >
              Key Metrics
            </motion.h2>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.1 }}
                className="bg-white/90 backdrop-blur-sm p-6 rounded-xl shadow-soft hover:shadow-hover transition-all duration-300 group border border-gray-100"
              >
                <div className="w-12 h-12 rounded-full bg-brand-green/10 flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                  <Utensils className="w-6 h-6 text-brand-green" />
                </div>
                <h3 className="text-xl font-bold mb-2 text-brand-dark">
                  Meals Provided
                </h3>
                <p className="text-3xl font-bold text-brand-green mb-2">
                  {stats.totalMeals.toLocaleString()}
                </p>
                <p className="text-sm text-gray-500">and counting...</p>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.2 }}
                className="bg-white/90 backdrop-blur-sm p-6 rounded-xl shadow-soft hover:shadow-hover transition-all duration-300 group border border-gray-100"
              >
                <div className="w-12 h-12 rounded-full bg-brand-orange/10 flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                  <Leaf className="w-6 h-6 text-brand-orange" />
                </div>
                <h3 className="text-xl font-bold mb-2 text-brand-dark">
                  Food Waste Reduced
                </h3>
                <p className="text-3xl font-bold text-brand-orange mb-2">
                  {stats.foodWasteReduced.toLocaleString()} kg
                </p>
                <p className="text-sm text-gray-500">
                  of food saved from landfills
                </p>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.3 }}
                className="bg-white/90 backdrop-blur-sm p-6 rounded-xl shadow-soft hover:shadow-hover transition-all duration-300 group border border-gray-100"
              >
                <div className="w-12 h-12 rounded-full bg-brand-blue/10 flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                  <Users className="w-6 h-6 text-brand-blue" />
                </div>
                <h3 className="text-xl font-bold mb-2 text-brand-dark">
                  People Reached
                </h3>
                <p className="text-3xl font-bold text-brand-blue mb-2">
                  {stats.totalRecipients.toLocaleString()}
                </p>
                <p className="text-sm text-gray-500">organizations supported</p>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.4 }}
                className="bg-white/90 backdrop-blur-sm p-6 rounded-xl shadow-soft hover:shadow-hover transition-all duration-300 group border border-gray-100"
              >
                <div className="w-12 h-12 rounded-full bg-brand-green/10 flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                  <DollarSign className="w-6 h-6 text-brand-green" />
                </div>
                <h3 className="text-xl font-bold mb-2 text-brand-dark">
                  Money Saved
                </h3>
                <p className="text-3xl font-bold text-brand-green mb-2">
                  ${stats.moneySaved.toLocaleString()}
                </p>
                <p className="text-sm text-gray-500">in food costs</p>
              </motion.div>
            </div>
          </div>
        </div>
      </section>

      {/* Monthly Progress */}
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="max-w-6xl mx-auto">
            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="text-3xl font-bold mb-12 text-center text-brand-dark"
            >
              Monthly Progress
            </motion.h2>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.2 }}
                className="bg-white/90 backdrop-blur-sm p-8 rounded-xl shadow-soft hover:shadow-hover transition-all duration-300 group border border-gray-100"
              >
                <div className="flex items-center mb-6">
                  <div className="w-12 h-12 rounded-full bg-brand-green/10 flex items-center justify-center mr-4 group-hover:scale-110 transition-transform">
                    <Heart className="w-6 h-6 text-brand-green" />
                  </div>
                  <h3 className="text-xl font-bold text-brand-dark">
                    Meals Provided
                  </h3>
                </div>
                <div className="space-y-4">
                  {stats.monthlyStats.map((stat, index) => (
                    <div key={index}>
                      <div className="flex justify-between mb-1">
                        <span className="text-sm font-medium">
                          {stat.month}
                        </span>
                        <span className="text-sm text-gray-500">
                          {stat.meals} meals
                        </span>
                      </div>
                      <Progress
                        value={(stat.meals / 1500) * 100}
                        className="h-2 bg-gray-100"
                      />
                    </div>
                  ))}
                </div>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.3 }}
                className="bg-white/90 backdrop-blur-sm p-8 rounded-xl shadow-soft hover:shadow-hover transition-all duration-300 group border border-gray-100"
              >
                <div className="flex items-center mb-6">
                  <div className="w-12 h-12 rounded-full bg-brand-orange/10 flex items-center justify-center mr-4 group-hover:scale-110 transition-transform">
                    <Award className="w-6 h-6 text-brand-orange" />
                  </div>
                  <h3 className="text-xl font-bold text-brand-dark">
                    Donations Received
                  </h3>
                </div>
                <div className="space-y-4">
                  {stats.monthlyStats.map((stat, index) => (
                    <div key={index}>
                      <div className="flex justify-between mb-1">
                        <span className="text-sm font-medium">
                          {stat.month}
                        </span>
                        <span className="text-sm text-gray-500">
                          {stat.donations} donations
                        </span>
                      </div>
                      <Progress
                        value={(stat.donations / 60) * 100}
                        className="h-2 bg-gray-100"
                      />
                    </div>
                  ))}
                </div>
              </motion.div>
            </div>
          </div>
        </div>
      </section>

      {/* Top Contributors */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <div className="max-w-6xl mx-auto">
            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="text-3xl font-bold mb-12 text-center text-brand-dark"
            >
              Top Contributors
            </motion.h2>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.2 }}
                className="bg-white/90 backdrop-blur-sm p-8 rounded-xl shadow-soft hover:shadow-hover transition-all duration-300 group border border-gray-100"
              >
                <div className="flex items-center mb-6">
                  <div className="w-12 h-12 rounded-full bg-brand-green/10 flex items-center justify-center mr-4 group-hover:scale-110 transition-transform">
                    <MapPin className="w-6 h-6 text-brand-green" />
                  </div>
                  <h3 className="text-xl font-bold text-brand-dark">
                    Top Donors
                  </h3>
                </div>
                <div className="space-y-4">
                  {stats.topDonors.map((donor, index) => (
                    <div
                      key={index}
                      className="flex items-center justify-between p-3 rounded-lg hover:bg-gray-50 transition-colors"
                    >
                      <div className="flex items-center">
                        <div className="w-10 h-10 rounded-full bg-brand-green/10 flex items-center justify-center mr-3">
                          <MapPin className="w-5 h-5 text-brand-green" />
                        </div>
                        <span className="font-medium text-brand-dark">
                          {donor.name}
                        </span>
                      </div>
                      <span className="text-brand-green font-semibold">
                        {donor.amount} kg
                      </span>
                    </div>
                  ))}
                </div>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.3 }}
                className="bg-white/90 backdrop-blur-sm p-8 rounded-xl shadow-soft hover:shadow-hover transition-all duration-300 group border border-gray-100"
              >
                <div className="flex items-center mb-6">
                  <div className="w-12 h-12 rounded-full bg-brand-orange/10 flex items-center justify-center mr-4 group-hover:scale-110 transition-transform">
                    <Users className="w-6 h-6 text-brand-orange" />
                  </div>
                  <h3 className="text-xl font-bold text-brand-dark">
                    Top Recipients
                  </h3>
                </div>
                <div className="space-y-4">
                  {stats.topRecipients.map((recipient, index) => (
                    <div
                      key={index}
                      className="flex items-center justify-between p-3 rounded-lg hover:bg-gray-50 transition-colors"
                    >
                      <div className="flex items-center">
                        <div className="w-10 h-10 rounded-full bg-brand-orange/10 flex items-center justify-center mr-3">
                          <Users className="w-5 h-5 text-brand-orange" />
                        </div>
                        <span className="font-medium text-brand-dark">
                          {recipient.name}
                        </span>
                      </div>
                      <span className="text-brand-orange font-semibold">
                        {recipient.meals} meals
                      </span>
                    </div>
                  ))}
                </div>
              </motion.div>
            </div>
          </div>
        </div>
      </section>

      {/* Environmental Impact */}
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="max-w-6xl mx-auto">
            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="text-3xl font-bold mb-12 text-center text-brand-dark"
            >
              Environmental Impact
            </motion.h2>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="bg-white/90 backdrop-blur-sm p-8 rounded-xl shadow-soft hover:shadow-hover transition-all duration-300 group border border-gray-100"
            >
              <div className="flex items-center mb-6">
                <div className="w-12 h-12 rounded-full bg-brand-blue/10 flex items-center justify-center mr-4 group-hover:scale-110 transition-transform">
                  <Globe className="w-6 h-6 text-brand-blue" />
                </div>
                <h3 className="text-xl font-bold text-brand-dark">
                  CO2 Emissions Reduced
                </h3>
              </div>
              <div className="flex flex-col md:flex-row items-center justify-between gap-6">
                <div className="text-center md:text-left">
                  <p className="text-4xl font-bold text-brand-blue mb-2">
                    {stats.co2Reduced.toLocaleString()} kg
                  </p>
                  <p className="text-gray-600">of CO2 emissions prevented</p>
                </div>
                <div className="w-full md:w-1/2">
                  <div className="h-4 bg-gray-100 rounded-full overflow-hidden">
                    <div
                      className="h-full bg-brand-blue rounded-full"
                      style={{
                        width: `${Math.min(
                          100,
                          (stats.co2Reduced / 15000) * 100
                        )}%`,
                      }}
                    ></div>
                  </div>
                  <p className="text-sm text-gray-500 mt-2 text-right">
                    Goal: 15,000 kg
                  </p>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>
    </PageLayout>
  );
};

export default Impact;
