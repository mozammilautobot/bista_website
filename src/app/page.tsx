import Navbar from "@/components/Navbar";
import Hero from "@/components/sections/Hero";
import AgentShowcase from "@/components/sections/AgentShowcase";
import Solutions from "@/components/sections/Solutions";
import ProductShowcase from "@/components/sections/ProductShowcase";
import Comparison from "@/components/sections/Comparison";
import Industries from "@/components/sections/Industries";
import WhyChooseUs from "@/components/sections/WhyChooseUs";
import CaseStudies from "@/components/sections/CaseStudies";
import ResultsBand from "@/components/sections/ResultsBand";
import TechStack from "@/components/sections/TechStack";
import RoiCalculator from "@/components/sections/RoiCalculator";
import Innovation from "@/components/sections/Innovation";
import Testimonials from "@/components/sections/Testimonials";
import Blog from "@/components/sections/Blog";
import Pricing from "@/components/sections/Pricing";
import FinalCta from "@/components/sections/FinalCta";
import Footer from "@/components/Footer";
import PhenomFlow from "@/components/ui/PhenomFlow";

export default function Home() {
  return (
    <main className="relative">
      {/* phenom.com-style ambient: faint flowing pastel lines behind the whole page */}
      <div className="pointer-events-none fixed inset-0 -z-10">
        <PhenomFlow variant="page" />
      </div>
      <Navbar />
      <Hero />
      <ProductShowcase />
      <AgentShowcase />
      <Solutions />
      <Comparison />
      <Innovation />
      <Industries />
      <WhyChooseUs />
      <ResultsBand />
      <CaseStudies />
      <TechStack />
      <RoiCalculator />
      <Testimonials />
      <Blog />
      <Pricing />
      <FinalCta />
      <Footer />
    </main>
  );
}
