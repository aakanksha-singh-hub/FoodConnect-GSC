import HeroSection from "@/components/HeroSection";
import HowItWorks from "@/components/HowItWorks";
import Testimonials from "@/components/Testimonials";
import PageLayout from "@/components/PageLayout";

const Index = () => {
  return (
    <PageLayout>
      <HeroSection />
      <HowItWorks />
      <Testimonials />
    </PageLayout>
  );
};

export default Index;
