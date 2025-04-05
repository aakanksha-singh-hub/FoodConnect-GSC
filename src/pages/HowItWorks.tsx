import {
  Package,
  Users,
  Truck,
  CheckCircle,
  BarChart4,
  ShieldCheck,
  RefreshCcw,
  Heart,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import PageLayout from "@/components/PageLayout";
import { motion } from "framer-motion";

const HowItWorks = () => {
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
              <h1 className="text-3xl md:text-4xl font-bold mb-4 text-brand-dark">
                How Food Connect Works
              </h1>
              <p className="text-lg text-gray-600 mb-8">
                Our platform uses technology to efficiently connect surplus food
                with those who need it most, creating a sustainable solution to
                reduce food waste and fight hunger.
              </p>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Process Section */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <div className="max-w-5xl mx-auto">
            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="text-3xl font-bold mb-12 text-center text-brand-green"
            >
              The Food Redistribution Process
            </motion.h2>

            <div className="relative">
              {/* Connecting line */}
              <div className="absolute left-1/2 top-0 bottom-0 w-1 bg-brand-green/20 -translate-x-1/2 hidden md:block"></div>

              <div className="space-y-16">
                {/* Step 1 */}
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: 0.2 }}
                  className="relative grid grid-cols-1 md:grid-cols-2 gap-8 items-center"
                >
                  <div className="order-2 md:order-1">
                    <h3 className="text-2xl font-bold mb-4 text-brand-dark">
                      1. Food Donors List Surplus
                    </h3>
                    <p className="text-gray-700 mb-4">
                      Restaurants, grocery stores, event venues, and other food
                      businesses register on our platform and list their surplus
                      food, specifying type, quantity, pickup time, and
                      location.
                    </p>
                    <ul className="space-y-2 text-gray-700">
                      <li className="flex items-start">
                        <CheckCircle className="w-5 h-5 text-brand-green mr-2 flex-shrink-0 mt-0.5" />
                        <span>Simple listing process takes just minutes</span>
                      </li>
                      <li className="flex items-start">
                        <CheckCircle className="w-5 h-5 text-brand-green mr-2 flex-shrink-0 mt-0.5" />
                        <span>
                          Specify food type, quantity, and pickup details
                        </span>
                      </li>
                      <li className="flex items-start">
                        <CheckCircle className="w-5 h-5 text-brand-green mr-2 flex-shrink-0 mt-0.5" />
                        <span>Set preferences for recipient organizations</span>
                      </li>
                    </ul>
                  </div>
                  <div className="order-1 md:order-2 flex justify-center">
                    <div className="bg-white/90 backdrop-blur-sm p-8 rounded-xl shadow-soft hover:shadow-hover transition-all duration-300 group border border-gray-100 w-full max-w-md">
                      <div className="w-16 h-16 rounded-full bg-brand-green/10 flex items-center justify-center mx-auto mb-6 group-hover:scale-110 transition-transform">
                        <Package className="w-8 h-8 text-brand-green" />
                      </div>
                      <h4 className="text-xl font-bold text-center mb-4 text-brand-dark">
                        Food Listing
                      </h4>
                      <p className="text-gray-600 text-center">
                        Donors easily list surplus food with details about type,
                        quantity, and pickup information.
                      </p>
                    </div>
                  </div>
                </motion.div>

                {/* Step 2 */}
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: 0.3 }}
                  className="relative grid grid-cols-1 md:grid-cols-2 gap-8 items-center"
                >
                  <div className="order-2">
                    <div className="bg-white/90 backdrop-blur-sm p-8 rounded-xl shadow-soft hover:shadow-hover transition-all duration-300 group border border-gray-100 w-full max-w-md mx-auto">
                      <div className="w-16 h-16 rounded-full bg-brand-orange/10 flex items-center justify-center mx-auto mb-6 group-hover:scale-110 transition-transform">
                        <Users className="w-8 h-8 text-brand-orange" />
                      </div>
                      <h4 className="text-xl font-bold text-center mb-4 text-brand-dark">
                        Recipients Claim
                      </h4>
                      <p className="text-gray-600 text-center">
                        Eligible organizations browse available food and claim
                        what they need for their clients.
                      </p>
                    </div>
                  </div>
                  <div className="order-1">
                    <h3 className="text-2xl font-bold mb-4 text-brand-dark">
                      2. Recipients Claim Available Food
                    </h3>
                    <p className="text-gray-700 mb-4">
                      Registered recipient organizations browse available food
                      listings and claim what they need for their clients,
                      ensuring they receive appropriate food types and
                      quantities.
                    </p>
                    <ul className="space-y-2 text-gray-700">
                      <li className="flex items-start">
                        <CheckCircle className="w-5 h-5 text-brand-orange mr-2 flex-shrink-0 mt-0.5" />
                        <span>
                          Browse available food by type, location, and quantity
                        </span>
                      </li>
                      <li className="flex items-start">
                        <CheckCircle className="w-5 h-5 text-brand-orange mr-2 flex-shrink-0 mt-0.5" />
                        <span>Claim food with a single click</span>
                      </li>
                      <li className="flex items-start">
                        <CheckCircle className="w-5 h-5 text-brand-orange mr-2 flex-shrink-0 mt-0.5" />
                        <span>
                          Receive confirmation and pickup instructions
                        </span>
                      </li>
                    </ul>
                  </div>
                </motion.div>

                {/* Step 3 */}
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: 0.4 }}
                  className="relative grid grid-cols-1 md:grid-cols-2 gap-8 items-center"
                >
                  <div className="order-2 md:order-1">
                    <h3 className="text-2xl font-bold mb-4 text-brand-dark">
                      3. Food is Collected and Delivered
                    </h3>
                    <p className="text-gray-700 mb-4">
                      Food is collected from donors and delivered to recipient
                      organizations, either by the recipients themselves, by our
                      volunteer network, or through our logistics partners.
                    </p>
                    <ul className="space-y-2 text-gray-700">
                      <li className="flex items-start">
                        <CheckCircle className="w-5 h-5 text-brand-blue mr-2 flex-shrink-0 mt-0.5" />
                        <span>Flexible pickup options to suit all parties</span>
                      </li>
                      <li className="flex items-start">
                        <CheckCircle className="w-5 h-5 text-brand-blue mr-2 flex-shrink-0 mt-0.5" />
                        <span>Food safety protocols followed throughout</span>
                      </li>
                      <li className="flex items-start">
                        <CheckCircle className="w-5 h-5 text-brand-blue mr-2 flex-shrink-0 mt-0.5" />
                        <span>Real-time tracking and confirmation</span>
                      </li>
                    </ul>
                  </div>
                  <div className="order-1 md:order-2 flex justify-center">
                    <div className="bg-white/90 backdrop-blur-sm p-8 rounded-xl shadow-soft hover:shadow-hover transition-all duration-300 group border border-gray-100 w-full max-w-md">
                      <div className="w-16 h-16 rounded-full bg-brand-blue/10 flex items-center justify-center mx-auto mb-6 group-hover:scale-110 transition-transform">
                        <Truck className="w-8 h-8 text-brand-blue" />
                      </div>
                      <h4 className="text-xl font-bold text-center mb-4 text-brand-dark">
                        Collection & Delivery
                      </h4>
                      <p className="text-gray-600 text-center">
                        Food is collected from donors and delivered to recipient
                        organizations through our network.
                      </p>
                    </div>
                  </div>
                </motion.div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="max-w-5xl mx-auto">
            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="text-3xl font-bold mb-12 text-center text-brand-dark"
            >
              Platform Features
            </motion.h2>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.2 }}
                className="bg-white/90 backdrop-blur-sm p-6 rounded-xl shadow-soft hover:shadow-hover transition-all duration-300 group border border-gray-100"
              >
                <div className="w-12 h-12 rounded-full bg-brand-green/10 flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                  <BarChart4 className="w-6 h-6 text-brand-green" />
                </div>
                <h3 className="text-xl font-bold mb-2 text-brand-dark">
                  Analytics Dashboard
                </h3>
                <p className="text-gray-600">
                  Track your impact with detailed analytics on food donated,
                  meals provided, and environmental benefits.
                </p>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.3 }}
                className="bg-white/90 backdrop-blur-sm p-6 rounded-xl shadow-soft hover:shadow-hover transition-all duration-300 group border border-gray-100"
              >
                <div className="w-12 h-12 rounded-full bg-brand-orange/10 flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                  <ShieldCheck className="w-6 h-6 text-brand-orange" />
                </div>
                <h3 className="text-xl font-bold mb-2 text-brand-dark">
                  Food Safety
                </h3>
                <p className="text-gray-600">
                  Our platform ensures food safety with guidelines, temperature
                  tracking, and quality verification.
                </p>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.4 }}
                className="bg-white/90 backdrop-blur-sm p-6 rounded-xl shadow-soft hover:shadow-hover transition-all duration-300 group border border-gray-100"
              >
                <div className="w-12 h-12 rounded-full bg-brand-blue/10 flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                  <RefreshCcw className="w-6 h-6 text-brand-blue" />
                </div>
                <h3 className="text-xl font-bold mb-2 text-brand-dark">
                  Sustainability Tracking
                </h3>
                <p className="text-gray-600">
                  Measure your environmental impact with metrics on CO2
                  reduction, water savings, and landfill diversion.
                </p>
              </motion.div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto text-center">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
            >
              <h2 className="text-3xl font-bold mb-4 text-brand-dark">
                Ready to Make a Difference?
              </h2>
              <p className="text-lg text-gray-600 mb-8">
                Join our platform today and start reducing food waste while
                helping those in need.
              </p>
              <div className="flex flex-col sm:flex-row justify-center gap-4">
                <Button
                  asChild
                  size="lg"
                  className="bg-brand-green hover:bg-brand-green/90 text-white font-bold text-lg group shadow-lg hover:shadow-xl transition-all duration-300"
                >
                  <Link
                    to="/auth?mode=register&role=donor"
                    className="flex items-center"
                  >
                    Become a Food Donor
                  </Link>
                </Button>
                <Button
                  asChild
                  size="lg"
                  variant="outline"
                  className="border-2 border-brand-blue text-brand-blue hover:bg-brand-blue hover:text-white font-bold text-lg group shadow-lg hover:shadow-xl transition-all duration-300"
                >
                  <Link
                    to="/auth?mode=register&role=recipient"
                    className="flex items-center"
                  >
                    Register as a Recipient
                  </Link>
                </Button>
                <Button
                  asChild
                  size="lg"
                  variant="outline"
                  className="border-2 border-brand-orange text-brand-orange hover:bg-brand-orange hover:text-white font-bold text-lg group shadow-lg hover:shadow-xl transition-all duration-300"
                >
                  <Link
                    to="/auth?mode=register&role=volunteer"
                    className="flex items-center"
                  >
                    Become a Volunteer
                  </Link>
                </Button>
              </div>
            </motion.div>
          </div>
        </div>
      </section>
    </PageLayout>
  );
};

export default HowItWorks;
