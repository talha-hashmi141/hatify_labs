import type { Metadata } from "next";
import AboutIntro from "@/components/sections/AboutIntro";
import Capabilities from "@/components/sections/Capabilities";
import ClientShowcase from "@/components/sections/ClientShowcase";
import ContactCTA from "@/components/sections/ContactCTA";
import FeaturedWork from "@/components/sections/FeaturedWork";
import Hero from "@/components/sections/Hero";
import ProcessTimeline from "@/components/sections/ProcessTimeline";
import ServicesOverview from "@/components/sections/ServicesOverview";
import StackBand from "@/components/sections/StackBand";
import Testimonials from "@/components/sections/Testimonials";
import { site } from "@/lib/data";

export const metadata: Metadata = {
  description: site.description,
  alternates: { canonical: "/" },
};

export default function HomePage() {
  return (
    <>
      <Hero />
      <ClientShowcase />
      <AboutIntro />
      <ServicesOverview />
      <StackBand />
      <FeaturedWork />
      <Capabilities />
      <ProcessTimeline />
      <Testimonials />
      <ContactCTA />
    </>
  );
}
