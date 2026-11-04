import type { Metadata } from "next";
import ContactCTA from "@/components/sections/ContactCTA";
import Testimonials from "@/components/sections/Testimonials";
import PageHero from "@/components/ui/PageHero";
import ProjectCard from "@/components/work/ProjectCard";
import WorkGrid from "@/components/work/WorkGrid";
import WorkStack from "@/components/visuals/WorkStack";
import { projects } from "@/lib/data";

export const metadata: Metadata = {
  title: "Work & Case Studies",
  description:
    "Technical case studies from Hatify Labs: a public-sector ERP, an omnichannel WhatsApp and email automation engine, a HIPAA-conscious multi-tenant data platform and an agentic RAG assistant.",
  alternates: { canonical: "/work" },
};

export default function WorkPage() {
  const cards = Object.fromEntries(projects.map((p) => [p.slug, <ProjectCard key={p.slug} project={p} headingLevel="h2" />]));

  return (
    <>
      <PageHero
        crumbs={[{ label: "Home", href: "/" }, { label: "Work" }]}
        eyebrow="Work & case studies"
        title={
          <>
            Engineering we&rsquo;re <span className="accent">proud</span> to put our name on.
          </>
        }
        aside={<WorkStack />}
        desc="Each case study covers the problem, the architecture we chose and why, the stack, the features we shipped and what changed for the client."
      />

      <section className="section-y !pt-14">
        <div className="container-x">
          <WorkGrid projects={projects.map(({ slug, sector }) => ({ slug, sector }))} cards={cards} />
        </div>
      </section>

      <Testimonials />
      <ContactCTA />
    </>
  );
}
