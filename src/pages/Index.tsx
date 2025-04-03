import HeroSection from '@/components/HeroSection';
import HowItWorks from '@/components/HowItWorks';
import Testimonials from '@/components/Testimonials';

const Index = () => {
  return (
    <main className="flex-grow">
      <HeroSection />
      <HowItWorks />
      <Testimonials />
    </main>
  );
};

export default Index;
