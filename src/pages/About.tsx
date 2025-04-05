import { Globe, Award, Users, Heart } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import PageLayout from "@/components/PageLayout";
import { motion } from "framer-motion";

const About = () => {
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
                About Food Connect
              </h1>
              <p className="text-lg text-gray-600 mb-8">
                We're on a mission to create a more sustainable food system by
                connecting surplus food with those who need it most.
              </p>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Our Story */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="text-center mb-12"
            >
              <h2 className="text-3xl font-bold mb-4 text-brand-dark">
                Our Story
              </h2>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.3 }}
              className="prose prose-lg max-w-none text-gray-700"
            >
              <p>
                Food Connect was born from a simple observation: while millions
                struggle with food insecurity, restaurants and food businesses
                discard tons of perfectly good food every day. This paradox
                inspired our founder, who witnessed first-hand the disconnect
                between food waste and hunger.
              </p>

              <p>
                What began as a grassroots initiative connecting a few local
                restaurants with a nearby shelter has evolved into a
                comprehensive platform that leverages technology to bridge the
                gap between food waste and food insecurity at scale.
              </p>

              <p>
                Our team consists of food industry veterans, technology experts,
                and social impact leaders who share a common vision: a world
                where no one goes hungry while good food goes to waste.
              </p>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Our Values */}
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="text-center mb-12"
            >
              <h2 className="text-3xl font-bold mb-4 text-brand-dark">
                Our Values
              </h2>
              <p className="text-lg text-gray-600">
                These core principles guide everything we do at Food Connect
              </p>
            </motion.div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.2 }}
                className="bg-white/90 backdrop-blur-sm p-6 rounded-xl shadow-soft hover:shadow-hover transition-all duration-300 group border border-gray-100"
              >
                <div className="flex items-center mb-4">
                  <div className="w-12 h-12 rounded-full bg-brand-green/10 flex items-center justify-center mr-4 group-hover:scale-110 transition-transform">
                    <Heart className="w-6 h-6 text-brand-green" />
                  </div>
                  <h3 className="text-xl font-bold text-brand-dark">
                    Compassion
                  </h3>
                </div>
                <p className="text-gray-600">
                  We believe that everyone deserves access to nutritious food,
                  and we're driven by empathy for those facing food insecurity.
                </p>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.3 }}
                className="bg-white/90 backdrop-blur-sm p-6 rounded-xl shadow-soft hover:shadow-hover transition-all duration-300 group border border-gray-100"
              >
                <div className="flex items-center mb-4">
                  <div className="w-12 h-12 rounded-full bg-brand-orange/10 flex items-center justify-center mr-4 group-hover:scale-110 transition-transform">
                    <Globe className="w-6 h-6 text-brand-orange" />
                  </div>
                  <h3 className="text-xl font-bold text-brand-dark">
                    Sustainability
                  </h3>
                </div>
                <p className="text-gray-600">
                  We're committed to reducing food waste and its environmental
                  impact, creating a more sustainable food system for future
                  generations.
                </p>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.4 }}
                className="bg-white/90 backdrop-blur-sm p-6 rounded-xl shadow-soft hover:shadow-hover transition-all duration-300 group border border-gray-100"
              >
                <div className="flex items-center mb-4">
                  <div className="w-12 h-12 rounded-full bg-brand-blue/10 flex items-center justify-center mr-4 group-hover:scale-110 transition-transform">
                    <Users className="w-6 h-6 text-brand-blue" />
                  </div>
                  <h3 className="text-xl font-bold text-brand-dark">
                    Community
                  </h3>
                </div>
                <p className="text-gray-600">
                  We foster connections between food businesses and
                  organizations, building stronger communities through
                  collaboration and shared resources.
                </p>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.5 }}
                className="bg-white/90 backdrop-blur-sm p-6 rounded-xl shadow-soft hover:shadow-hover transition-all duration-300 group border border-gray-100"
              >
                <div className="flex items-center mb-4">
                  <div className="w-12 h-12 rounded-full bg-brand-green/10 flex items-center justify-center mr-4 group-hover:scale-110 transition-transform">
                    <Award className="w-6 h-6 text-brand-green" />
                  </div>
                  <h3 className="text-xl font-bold text-brand-dark">
                    Excellence
                  </h3>
                </div>
                <p className="text-gray-600">
                  We strive for excellence in everything we do, from food safety
                  to service delivery, ensuring the highest quality experience
                  for all stakeholders.
                </p>
              </motion.div>
            </div>
          </div>
        </div>
      </section>

      {/* Team Section */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="text-center mb-12"
            >
              <h2 className="text-3xl font-bold mb-4 text-brand-dark">
                Our Team
              </h2>
              <p className="text-lg text-gray-600">
                Meet the dedicated individuals behind Food Connect
              </p>
            </motion.div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {/* Team members would go here */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.2 }}
                className="bg-white/90 backdrop-blur-sm p-6 rounded-xl shadow-soft hover:shadow-hover transition-all duration-300 group border border-gray-100 text-center"
              >
                <div className="w-24 h-24 rounded-full bg-gray-200 mx-auto mb-4"></div>
                <h3 className="text-xl font-bold text-brand-dark mb-1">
                  Jane Doe
                </h3>
                <p className="text-brand-green mb-2">Founder & CEO</p>
                <p className="text-gray-600 text-sm">
                  With over 15 years in the food industry, Jane founded Food
                  Connect to address the critical issue of food waste and
                  hunger.
                </p>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.3 }}
                className="bg-white/90 backdrop-blur-sm p-6 rounded-xl shadow-soft hover:shadow-hover transition-all duration-300 group border border-gray-100 text-center"
              >
                <div className="w-24 h-24 rounded-full bg-gray-200 mx-auto mb-4"></div>
                <h3 className="text-xl font-bold text-brand-dark mb-1">
                  John Smith
                </h3>
                <p className="text-brand-orange mb-2">CTO</p>
                <p className="text-gray-600 text-sm">
                  John leads our technology team, developing innovative
                  solutions to connect food donors with recipients efficiently.
                </p>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.4 }}
                className="bg-white/90 backdrop-blur-sm p-6 rounded-xl shadow-soft hover:shadow-hover transition-all duration-300 group border border-gray-100 text-center"
              >
                <div className="w-24 h-24 rounded-full bg-gray-200 mx-auto mb-4"></div>
                <h3 className="text-xl font-bold text-brand-dark mb-1">
                  Sarah Johnson
                </h3>
                <p className="text-brand-blue mb-2">Operations Director</p>
                <p className="text-gray-600 text-sm">
                  Sarah ensures smooth operations across our platform,
                  coordinating with partners and optimizing our food
                  distribution network.
                </p>
              </motion.div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto text-center">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
            >
              <h2 className="text-3xl font-bold mb-4 text-brand-dark">
                Join Our Mission
              </h2>
              <p className="text-lg text-gray-600 mb-8">
                Whether you're a food business looking to reduce waste or an
                organization serving vulnerable populations, we invite you to be
                part of the solution.
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
              </div>
            </motion.div>
          </div>
        </div>
      </section>
    </PageLayout>
  );
};

export default About;
