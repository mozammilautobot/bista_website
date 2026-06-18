import Navbar from "@/components/Navbar";
import Hero from "@/components/sections/Hero";
import AgentShowcase from "@/components/sections/AgentShowcase";
import Solutions from "@/components/sections/Solutions";
import ProductShowcase from "@/components/sections/ProductShowcase";
import Comparison from "@/components/sections/Comparison";
import HowItWorks from "@/components/sections/HowItWorks";
import Industries from "@/components/sections/Industries";
import WhyChooseUs from "@/components/sections/WhyChooseUs";
import CaseStudies from "@/components/sections/CaseStudies";
import TechStack from "@/components/sections/TechStack";
import RoiCalculator from "@/components/sections/RoiCalculator";
import Innovation from "@/components/sections/Innovation";
import Testimonials from "@/components/sections/Testimonials";
import Blog from "@/components/sections/Blog";
import Pricing from "@/components/sections/Pricing";
import FinalCta from "@/components/sections/FinalCta";
import Footer from "@/components/Footer";

export default function Home() {
  return (
    <main className="relative">
      <Navbar />
      <Hero />
      <AgentShowcase />
      <Solutions />
      <ProductShowcase />
      <Comparison />
      <HowItWorks />
      <Industries />
      <WhyChooseUs />
      <CaseStudies />
      <TechStack />
      <RoiCalculator />
      <Innovation />
      <Testimonials />
      <Blog />
      <Pricing />
      <FinalCta />
      <Footer />
    </main>
  );
}
