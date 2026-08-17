import type { Metadata } from "next";
import CaseStudies from "@/components/CaseStudies";
import CTA from "@/components/CTA";
import Hero from "@/components/Hero";
import Process from "@/components/Process";
import ServicesSection from "@/components/ServicesSection";
import Stats from "@/components/Stats";
import TechMarquee from "@/components/TechMarquee";
import { site } from "@/lib/data";

export const metadata: Metadata = {
  description: site.description,
  alternates: { canonical: "/" },
};

export default function HomePage() {
  return (
    <>
      <Hero />
      <ServicesSection />
      <TechMarquee />
      <CaseStudies preview />
      <Stats />
      <Process />
      <CTA />
    </>
  );
}
