
import { ArrowRight } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Link } from 'react-router-dom';

const CallToAction = () => {
  return (
    <section className="py-20 bg-gradient-to-r from-brand-green/90 to-brand-blue/90 text-white">
      <div className="container mx-auto px-4">
        <div className="max-w-3xl mx-auto text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">Join Our Mission to Fight Hunger</h2>
          <p className="text-lg md:text-xl mb-8 opacity-90">
            Whether you're a food business looking to reduce waste or an organization serving vulnerable populations,
            we invite you to be part of the solution.
          </p>
          
          <div className="flex flex-col sm:flex-row justify-center gap-4">
            <Button asChild size="lg" className="bg-white text-brand-green hover:bg-gray-100">
              <Link to="/donate">
                Become a Food Donor
              </Link>
            </Button>
            <Button asChild size="lg" variant="outline" className="border-white text-white hover:bg-white/10">
              <Link to="/receive">
                Register as a Recipient
              </Link>
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default CallToAction;
