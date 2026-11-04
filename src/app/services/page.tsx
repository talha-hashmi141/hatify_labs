import type { Metadata } from "next";
import Capabilities from "@/components/sections/Capabilities";
import ContactCTA from "@/components/sections/ContactCTA";
import { ServiceRow } from "@/components/sections/ServicesOverview";
import PageHero from "@/components/ui/PageHero";
import Reveal from "@/components/ui/Reveal";
import ServiceOrbit from "@/components/visuals/ServiceOrbit";
import { serviceGroups, services } from "@/lib/data";

export const metadata: Metadata = {
  title: "Services",
  description:
    "Generative AI and LLM systems, machine learning, AI chatbots, voice agents, web and mobile apps, multi-tenant SaaS, cloud and DevOps, databases, ETL and migration, security, automation and UI/UX design.",
  alternates: { canonical: "/services" },
};

export default function ServicesPage() {
  return (
    <>
      <PageHero
        crumbs={[{ label: "Home", href: "/" }, { label: "Services" }]}
        eyebrow="Services"
        title={
          <>
            Specialists for every <span className="accent">layer</span>.
          </>
        }
        aside={<ServiceOrbit />}
        desc="AI, product engineering, data, security and design from a single team. The people who plan your system are the same people who build and run it."
      >
        <nav aria-label="Service groups" className="flex flex-wrap gap-2">
          {serviceGroups.map((g) => (
            <a key={g} href={`#${g.toLowerCase().replace(/[^a-z]+/g, "-")}`} className="chip min-h-9 px-4 transition-colors hover:border-royal hover:text-royal">
              {g}
            </a>
          ))}
        </nav>
      </PageHero>

      <div className="section-y !pt-16 space-y-20">
        {serviceGroups.map((group) => {
          const list = services.filter((s) => s.tag === group);
          if (!list.length) return null;
          const id = group.toLowerCase().replace(/[^a-z]+/g, "-");
          return (
            <section key={group} id={id} aria-labelledby={`${id}-title`} className="container-x">
              <div className="flex items-baseline justify-between gap-4 border-b border-line pb-5">
                <h2 id={`${id}-title`} className="text-2xl font-bold tracking-tight sm:text-3xl">
                  {group}
                </h2>
                <span className="mono-label">
                  {list.length} {list.length === 1 ? "service" : "services"}
                </span>
              </div>
              <div className="mt-8 space-y-3">
                {list.map((s, i) => (
                  <Reveal key={s.slug} delay={i * 0.04}>
                    <ServiceRow s={s} index={services.indexOf(s) + 1} />
                  </Reveal>
                ))}
              </div>
            </section>
          );
        })}
      </div>

      <Capabilities />
      <ContactCTA />
    </>
  );
}
