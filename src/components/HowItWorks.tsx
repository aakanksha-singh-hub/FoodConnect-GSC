
import { ArrowRight, Truck, Package, Users, CheckCircle } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Link } from 'react-router-dom';

const HowItWorks = () => {
  return (
    <section className="py-20 bg-brand-light" id="how-it-works">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold mb-4 text-brand-dark">How It Works</h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Our platform makes food redistribution simple, efficient, and impactful with just a few easy steps.
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          <div className="feature-card">
            <div className="w-14 h-14 rounded-full bg-brand-green/10 flex items-center justify-center mb-6">
              <Package className="w-7 h-7 text-brand-green" />
            </div>
            <h3 className="text-xl font-bold mb-3">1. List Surplus Food</h3>
            <p className="text-gray-600 mb-4">
              Restaurants, grocery stores, and event venues can list their surplus food, including quantity, type, and pickup time.
            </p>
          </div>
          
          <div className="feature-card">
            <div className="w-14 h-14 rounded-full bg-brand-orange/10 flex items-center justify-center mb-6">
              <Users className="w-7 h-7 text-brand-orange" />
            </div>
            <h3 className="text-xl font-bold mb-3">2. Match Recipients</h3>
            <p className="text-gray-600 mb-4">
              Our system matches food donations with recipient organizations based on their needs, location, and scheduling.
            </p>
          </div>
          
          <div className="feature-card">
            <div className="w-14 h-14 rounded-full bg-brand-blue/10 flex items-center justify-center mb-6">
              <Truck className="w-7 h-7 text-brand-blue" />
            </div>
            <h3 className="text-xl font-bold mb-3">3. Coordinate Pickup</h3>
            <p className="text-gray-600 mb-4">
              The platform coordinates pickup and delivery, ensuring food is transported safely and efficiently.
            </p>
          </div>
          
          <div className="feature-card">
            <div className="w-14 h-14 rounded-full bg-brand-green/10 flex items-center justify-center mb-6">
              <CheckCircle className="w-7 h-7 text-brand-green" />
            </div>
            <h3 className="text-xl font-bold mb-3">4. Track Impact</h3>
            <p className="text-gray-600 mb-4">
              Donors and recipients can track their impact, with detailed reports on food redistributed and people fed.
            </p>
          </div>
        </div>
        
        <div className="text-center mt-12">
          <Button asChild className="bg-brand-green hover:bg-brand-green/90 text-white">
            <Link to="/how-it-works">
              Learn More <ArrowRight className="ml-2 h-4 w-4" />
            </Link>
          </Button>
        </div>
      </div>
    </section>
  );
};

export default HowItWorks;
