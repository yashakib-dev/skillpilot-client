import Hero from "@/components/homepage/Hero";
import Features from "@/components/homepage/Features";
import HowItWorks from "@/components/homepage/HowItWorks";
import AIFeatures from "@/components/homepage/AIFeatures";
import Categories from "@/components/homepage/Categories";
import Statistics from "@/components/homepage/Statistics";
import FAQ from "@/components/homepage/FAQ";
import CTA from "@/components/homepage/CTA";

export default function Home() {
  return (
    <>
      <Hero />
      <Features />
      <HowItWorks />
      <AIFeatures />
      <Categories />
      <Statistics />
      <FAQ />
      <CTA />
    </>
  );
}
