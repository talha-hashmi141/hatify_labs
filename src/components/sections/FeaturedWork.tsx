import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { featuredProjects } from "@/lib/data";
import Reveal from "@/components/ui/Reveal";
import SectionHeader from "@/components/ui/SectionHeader";
import ProjectCard from "@/components/work/ProjectCard";

export default function FeaturedWork() {
  const [lead, ...rest] = featuredProjects;
  if (!lead) return null;

  return (
    <section className="section-y" aria-labelledby="work-title">
      <div className="container-x">
        <SectionHeader
          eyebrow="Selected work"
          title={
            <span id="work-title">
              Real systems, <span className="accent">measured</span> results.
            </span>
          }
          desc="Government, healthcare, enterprise and AI builds, each with the architecture behind it and the numbers it delivered."
          action={
            <Link href="/work" className="btn btn-secondary">
              View all work
              <ArrowRight className="size-4" aria-hidden />
            </Link>
          }
        />

        <div className="mt-14 grid gap-5">
          <Reveal className="min-w-0">
            <ProjectCard project={lead} layout="wide" />
          </Reveal>
          <div className="grid gap-5 md:grid-cols-2">
            {rest.map((p, i) => (
              <Reveal key={p.slug} delay={i * 0.05} className="min-w-0">
                <ProjectCard project={p} />
              </Reveal>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
