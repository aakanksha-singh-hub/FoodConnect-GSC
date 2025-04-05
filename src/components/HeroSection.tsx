import { ArrowRight, Heart, Users, Leaf } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";

const HeroSection = () => {
  return (
    <section className="relative overflow-hidden min-h-[90vh] flex items-center">
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

      {/* Main content */}
      <div className="relative w-full py-16 md:py-24">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            {/* Hero text */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="max-w-3xl mx-auto text-center mb-12"
            >
              <h1 className="text-4xl md:text-6xl font-bold mb-6 text-brand-dark">
                Join Our Mission to
                <br />
                <span className="text-brand-green mt-2 block">
                  Fight Hunger
                </span>
              </h1>
              <p className="text-lg md:text-xl text-gray-600 mb-8 max-w-2xl mx-auto">
                Together, we're making a difference in reducing food waste and
                fighting hunger. Every donation and delivery contributes to our
                growing impact.
              </p>

              {/* CTA Buttons - Moved up for better visibility */}
              <div className="flex flex-col sm:flex-row justify-center gap-4 mb-16">
                <Button
                  asChild
                  size="lg"
                  className="bg-brand-green hover:bg-brand-green/90 text-white font-bold text-lg group shadow-lg hover:shadow-xl transition-all duration-300"
                >
                  <Link
                    to="/"
                    className="flex items-center px-6 py-3"
                    onClick={(e) => {
                      e.preventDefault();
                      const howItWorksSection =
                        document.querySelector("#how-it-works");
                      if (howItWorksSection) {
                        howItWorksSection.scrollIntoView({
                          behavior: "smooth",
                        });
                      } else {
                        window.location.href = "/how-it-works";
                      }
                    }}
                  >
                    Learn More
                    <ArrowRight className="ml-2 h-5 w-5 group-hover:translate-x-1 transition-transform" />
                  </Link>
                </Button>
                <Button
                  asChild
                  size="lg"
                  variant="outline"
                  className="border-2 border-brand-blue text-brand-blue hover:bg-brand-blue hover:text-white font-bold text-lg group shadow-lg hover:shadow-xl transition-all duration-300"
                >
                  <Link
                    to="/auth?mode=register&role=donor"
                    className="flex items-center whitespace-nowrap px-6 py-3"
                  >
                    Become a Food Donor
                    <ArrowRight className="ml-2 h-5 w-5 group-hover:translate-x-1 transition-transform" />
                  </Link>
                </Button>
              </div>
            </motion.div>

            {/* Stats section */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="grid grid-cols-1 md:grid-cols-3 gap-6"
            >
              <div className="bg-white/90 backdrop-blur-sm p-6 rounded-xl shadow-soft hover:shadow-hover transition-all duration-300 group border border-gray-100">
                <div className="flex items-center mb-4">
                  <div className="w-12 h-12 rounded-full bg-brand-green/10 flex items-center justify-center mr-4 group-hover:scale-110 transition-transform">
                    <Heart className="w-6 h-6 text-brand-green" />
                  </div>
                  <div>
                    <div className="text-3xl font-bold text-brand-green mb-1">
                      2,500+
                    </div>
                    <div className="text-lg font-medium text-gray-700">
                      Meals Delivered
                    </div>
                  </div>
                </div>
                <p className="text-gray-600">
                  Nutritious meals provided to those who need them most every
                  day
                </p>
              </div>

              <div className="bg-white/90 backdrop-blur-sm p-6 rounded-xl shadow-soft hover:shadow-hover transition-all duration-300 group border border-gray-100">
                <div className="flex items-center mb-4">
                  <div className="w-12 h-12 rounded-full bg-brand-orange/10 flex items-center justify-center mr-4 group-hover:scale-110 transition-transform">
                    <Users className="w-6 h-6 text-brand-orange" />
                  </div>
                  <div>
                    <div className="text-3xl font-bold text-brand-orange mb-1">
                      450+
                    </div>
                    <div className="text-lg font-medium text-gray-700">
                      Active Donors
                    </div>
                  </div>
                </div>
                <p className="text-gray-600">
                  Restaurants, grocery stores, and event venues participating
                </p>
              </div>

              <div className="bg-white/90 backdrop-blur-sm p-6 rounded-xl shadow-soft hover:shadow-hover transition-all duration-300 group border border-gray-100">
                <div className="flex items-center mb-4">
                  <div className="w-12 h-12 rounded-full bg-brand-blue/10 flex items-center justify-center mr-4 group-hover:scale-110 transition-transform">
                    <Leaf className="w-6 h-6 text-brand-blue" />
                  </div>
                  <div>
                    <div className="text-3xl font-bold text-brand-blue mb-1">
                      120+
                    </div>
                    <div className="text-lg font-medium text-gray-700">
                      Recipient Organizations
                    </div>
                  </div>
                </div>
                <p className="text-gray-600">
                  Shelters, orphanages, and elderly care homes receiving food
                </p>
              </div>
            </motion.div>
          </div>
        </div>
      </div>

      {/* Enhanced decorative elements */}
      <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-white via-white/95 to-transparent"></div>
    </section>
  );
};

export default HeroSection;
