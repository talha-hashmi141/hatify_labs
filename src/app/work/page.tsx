import type { Metadata } from "next";
import CTA from "@/components/CTA";
import PageHeader from "@/components/PageHeader";
import Reveal from "@/components/Reveal";
import Stats from "@/components/Stats";
import { ProjectRow } from "@/components/CaseStudies";
import { projects } from "@/lib/data";

export const metadata: Metadata = {
  title: "Our Work",
  description:
    "Selected work by Hatify Labs: government ERP systems, WhatsApp & email automation engines processing millions of messages, HIPAA-grade multi-tenant data platforms and agentic RAG systems.",
  alternates: { canonical: "/work" },
};

export default function WorkPage() {
  return (
    <>
      <PageHeader
        kicker="Work"
        title="Built where failure is not an option"
        accent="failure"
        desc="Government departments, healthcare data, million-message pipelines — a sample of what we have shipped and kept running."
        image="/images/casestudies-geometric.jpg"
      />

      <section className="section !pt-10">
        <div className="container-x space-y-4">
          {projects.map((p, i) => (
            <Reveal key={p.title} delay={0.05}>
              <ProjectRow project={p} index={i} showStack darker />
            </Reveal>
          ))}
        </div>
      </section>

      <Stats />
      <CTA />
    </>
  );
}
