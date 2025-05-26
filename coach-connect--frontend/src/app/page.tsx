import {
  Header,
  HeroSection,
  FeaturesSection,
  TestimonialsSection,
  PricingSection,
  Footer,
} from '@/landing/components';

export default function Home() {
  return (
    <div className="flex flex-col min-h-screen bg-aesthetic-light">
      <Header />
      <main className="flex-1">
        <HeroSection />
        <FeaturesSection />
        <TestimonialsSection />
        <PricingSection />
      </main>
      <Footer />
    </div>
  );
}
