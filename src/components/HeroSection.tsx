import { ArrowRight } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Link } from 'react-router-dom';

const HeroSection = () => {
  return (
    <section className="hero-section py-20 md:py-28 bg-gradient-to-r from-brand-green/20 to-brand-blue/20">
      <div className="container mx-auto px-4">
        <div className="max-w-3xl mx-auto text-center">
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6 text-black">
            Join Our Mission to <span className="text-brand-green font-extrabold">Fight Hunger</span>
          </h1>
          <p className="text-lg md:text-xl text-black mb-8 font-medium">
            Whether you're a food business looking to reduce waste or an organization
            serving vulnerable populations, we invite you to be part of the solution.
          </p>
          <div className="flex flex-col sm:flex-row justify-center gap-4">
            <Button asChild size="lg" className="bg-brand-green hover:bg-brand-green/90 text-white font-bold text-lg">
              <Link to="/auth?mode=register&role=donor">
                Become a Food Donor
              </Link>
            </Button>
            <Button asChild size="lg" variant="outline" className="border-2 border-brand-blue text-brand-blue hover:bg-brand-blue hover:text-white font-bold text-lg">
              <Link to="/auth?mode=register&role=recipient">
                Register as a Recipient
              </Link>
            </Button>
          </div>
        </div>
      </div>
      
      {/* Hero Stats */}
      <div className="container mx-auto px-4 mt-16">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="bg-white p-6 rounded-lg shadow-md">
            <div className="text-4xl font-bold text-brand-green mb-2">2,500+</div>
            <div className="text-xl font-bold text-black mb-2">Meals Delivered</div>
            <p className="text-black font-medium">
              Nutritious meals provided to those who need them most every day
            </p>
          </div>
          <div className="bg-white p-6 rounded-lg shadow-md">
            <div className="text-4xl font-bold text-brand-orange mb-2">450+</div>
            <div className="text-xl font-bold text-black mb-2">Active Donors</div>
            <p className="text-black font-medium">
              Restaurants, grocery stores, and event venues participating
            </p>
          </div>
          <div className="bg-white p-6 rounded-lg shadow-md">
            <div className="text-4xl font-bold text-brand-blue mb-2">120+</div>
            <div className="text-xl font-bold text-black mb-2">Recipient Organizations</div>
            <p className="text-black font-medium">
              Shelters, orphanages, and elderly care homes receiving food
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
