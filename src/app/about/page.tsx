import type { Metadata } from "next";
import Image from "next/image";
import CTA from "@/components/CTA";
import PageHeader from "@/components/PageHeader";
import Reveal from "@/components/Reveal";
import Stats from "@/components/Stats";
import { site } from "@/lib/data";

export const metadata: Metadata = {
  title: "About Us",
  description:
    "Hatify Labs is a dedicated team of engineers and designers building complex software: government ERP systems, production AI, secure multi-tenant platforms and automation at scale.",
  alternates: { canonical: "/about" },
};

const values = [
  {
    title: "Security is a default",
    desc: "Encryption, least privilege and audit trails are in the first sprint, not the last invoice. We build like an auditor is watching — because eventually, one is.",
  },
  {
    title: "Complexity is the job",
    desc: "Multi-tenancy, regulated data, realtime AI — we chose the hard problems on purpose. Simple sites are lovely; complex systems are why we exist.",
  },
  {
    title: "Own the outcome",
    desc: "We measure success in systems running in production, not tickets closed. If it breaks at 2 a.m., it is our problem too — and we architect so it rarely does.",
  },
  {
    title: "Ship, then sharpen",
    desc: "Weekly demos, short iterations, honest trade-offs. Momentum beats perfection — and perfection arrives faster when something real is running.",
  },
];

const roles = [
  "Full-stack Engineers",
  "AI / LLM Engineers",
  "Cloud & DevOps Architects",
  "Data Engineers",
  "Security Engineers",
  "Product Designers",
  "QA & Automation",
];

export default function AboutPage() {
  return (
    <>
      <PageHeader
        kicker="About"
        title="A lab, not a factory"
        accent="factory"
        desc={site.tagline}
        image="/images/about-collaboration.jpg"
      />

      {/* Manifesto */}
      <section data-theme="light" className="section relative overflow-hidden !py-20 md:!py-28">
        <div aria-hidden className="pointer-events-none absolute inset-0 select-none">
          <Image
            src="/images/about-collaboration.jpg"
            alt=""
            fill
            className="object-cover opacity-[0.08] mix-blend-multiply"
            style={{ maskImage: "linear-gradient(to right, transparent 40%, black 90%)" }}
            sizes="100vw"
          />
        </div>
        <div className="container-x relative grid gap-10 lg:grid-cols-12">
          <div className="lg:col-span-3">
            <Reveal>
              <span className="label-mono">/ The short version</span>
            </Reveal>
          </div>
          <div className="lg:col-span-9">
            <Reveal>
              <p className="font-display text-[clamp(1.7rem,3.2vw,2.8rem)] font-bold leading-[1.25] text-zinc-500">
                Most agencies optimize for volume — so the hard projects get quietly avoided.{" "}
                <span className="text-white light:text-zinc-950">
                  We built a team that runs toward exactly those projects
                </span>{" "}
                — regulated data, government scale, and <span className="text-accent">AI that has to be right.</span>
              </p>
            </Reveal>
            <Reveal
              delay={0.1}
              className="mt-10 grid gap-6 text-base leading-relaxed text-zinc-400 light:text-zinc-600 md:grid-cols-2"
            >
              <p>
                Since {site.founded}, we have shipped ERP platforms inside government departments where audit
                trails are non-negotiable, automation engines pushing over a million WhatsApp and email
                messages a month, and HIPAA-conscious data architectures with database-per-tenant isolation.
              </p>
              <p>
                We stay deliberately senior and deliberately small. Every project gets engineers who have done
                this before — no hand-offs to a bench, no juniors learning on your budget, and LLM systems
                whose accuracy is measured by eval suites instead of vibes.
              </p>
            </Reveal>
          </div>
        </div>
      </section>

      {/* Principles */}
      <section className="pb-20">
        <div className="container-x">
          <Reveal>
            <div className="flex items-baseline justify-between gap-4">
              <span className="font-mono text-base font-semibold tracking-[0.2em] md:text-lg text-lime-300">[A]</span>
              <span className="label-mono">Principles — How we think</span>
            </div>
          </Reveal>
          <div className="mt-8 border-t border-white/10">
            {values.map((v, i) => (
              <Reveal key={v.title} delay={Math.min(i * 0.04, 0.2)}>
                <div className="grid gap-2 border-b border-white/10 py-8 md:grid-cols-[110px_320px_1fr] md:gap-10">
                  <span className="font-mono text-base font-semibold text-lime-300">PR/{String(i + 1).padStart(2, "0")}</span>
                  <h3 className="display text-2xl md:text-3xl">{v.title}</h3>
                  <p className="max-w-2xl text-sm leading-relaxed text-zinc-400 sm:text-base">{v.desc}</p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* Team */}
      <section className="pb-24">
        <div className="container-x">
          <Reveal>
            <div className="rounded-2xl border border-white/10 p-8 md:p-12">
              <span className="label-mono">/ The team</span>
              <h2 className="display mt-4 text-2xl sm:text-3xl md:text-4xl">
                One dedicated team, <span className="text-accent">every discipline</span>
              </h2>
              <p className="mt-4 max-w-2xl text-sm leading-relaxed text-zinc-400 sm:text-base">
                Product, design, engineering, AI, infrastructure and security sit in one room — decisions take
                a conversation, not a committee. This is the whole reason our complex builds stay coherent.
              </p>
              <div className="mt-8 flex flex-wrap gap-2">
                {roles.map((r) => (
                  <span key={r} className="tag-mono">
                    {r}
                  </span>
                ))}
              </div>
            </div>
          </Reveal>
        </div>
      </section>

      <Stats />
      <CTA />
    </>
  );
}
