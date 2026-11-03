import type { Metadata } from "next";
import Link from "next/link";
import { ArrowUpRight, Boxes, CalendarRange, Compass, HeartHandshake, Layers, ShieldCheck, Users } from "lucide-react";
import ContactCTA from "@/components/sections/ContactCTA";
import { LinkedInIcon } from "@/components/ui/Icon";
import { MetricGrid } from "@/components/ui/Metric";
import PageHero from "@/components/ui/PageHero";
import Reveal from "@/components/ui/Reveal";
import SectionHeader from "@/components/ui/SectionHeader";
import BrandConstellation from "@/components/visuals/BrandConstellation";
import { achievements, linkedin, site } from "@/lib/data";

export const metadata: Metadata = {
  title: "About Us",
  description:
    "Hatify Labs is a full-stack software and AI engineering studio in Lahore, Pakistan. A multidisciplinary team building government ERPs, multi-tenant SaaS, production AI and regulated data platforms.",
  alternates: { canonical: "/about" },
};

const VALUES = [
  { icon: HeartHandshake, title: "Integrity first", desc: "Realistic estimates and trade-offs in writing. If an idea will hurt the product, we say so early." },
  { icon: Compass, title: "Purpose over output", desc: "Success is measured by what changes for your users. Tickets closed and hours billed are side notes." },
  { icon: ShieldCheck, title: "Security by default", desc: "Encryption, least-privilege access and audit trails are part of the first sprint, not the last invoice." },
  { icon: Layers, title: "Own the whole system", desc: "Design, engineering, data and infrastructure decisions are made together, so the system stays coherent." },
];

const DISCIPLINES = [
  "Full-stack engineering",
  "AI & LLM engineering",
  "Machine learning",
  "Mobile development",
  "Cloud & DevOps",
  "Data engineering & databases",
  "Security engineering",
  "Product & UI/UX design",
  "QA & test automation",
  "Project & delivery management",
];

const MODELS = [
  { icon: Boxes, title: "Fixed-scope build", desc: "For well-defined projects. A scoped discovery produces a written plan, timeline and price before the build starts." },
  { icon: CalendarRange, title: "Monthly retainer", desc: "Ongoing product work with a steady team, a shared roadmap and regular demos." },
  { icon: Users, title: "Dedicated team", desc: "A cross-functional team embedded in your long-running program, scaled to the work." },
];

export default function AboutPage() {
  return (
    <>
      <PageHero
        crumbs={[{ label: "Home", href: "/" }, { label: "About" }]}
        eyebrow="About Hatify Labs"
        title={
          <>
            Innovation with <span className="accent">integrity</span>. Transformation with purpose.
          </>
        }
        desc={site.description}
        aside={<BrandConstellation />}
      />

      {/* Story */}
      <section className="section-y" aria-labelledby="story-title">
        <div className="container-x grid gap-12 lg:grid-cols-12 lg:gap-16">
          <div className="lg:col-span-5">
            <p className="eyebrow">Who we are</p>
            <h2 id="story-title" className="display mt-4 text-[clamp(1.9rem,3.8vw,3rem)]">
              A multidisciplinary studio built for <span className="accent">complex</span> work.
            </h2>
          </div>
          <div className="space-y-5 text-[17px] leading-relaxed text-body lg:col-span-7">
            <p>
              Hatify Labs brings engineers, designers and specialists with different expertise into a single team. That
              mix is deliberate. Projects involving regulated data, public-sector workflows, multi-tenant platforms or
              production AI rarely fail inside one discipline. They fail at the hand-off between two.
            </p>
            <p>
              So we keep those people in one room. Architecture, security, data and user experience are decided
              together and written down, then delivered in short iterations you can see and test.
            </p>
            <p>
              Based in {site.location}, we work with organisations that need software to be dependable, secure and
              pleasant to use for every one of their users.
            </p>
          </div>
        </div>
        <div className="container-x mt-14">
          <MetricGrid metrics={achievements} />
        </div>
      </section>

      {/* Values */}
      <section className="section-y bg-white" aria-labelledby="values-title">
        <div className="container-x">
          <SectionHeader
            eyebrow="Our values"
            title={
              <span id="values-title">
                The principles behind <span className="accent">every</span> build.
              </span>
            }
          />
          <div className="mt-12 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {VALUES.map((v, i) => (
              <Reveal key={v.title} delay={i * 0.05} className="card h-full p-7">
                <span className="flex size-11 items-center justify-center rounded-xl bg-gradient-to-br from-royal to-electric text-white shadow-[var(--shadow-glow)]">
                  <v.icon className="size-5" strokeWidth={1.75} aria-hidden />
                </span>
                <h3 className="mt-6 text-lg font-bold">{v.title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-body">{v.desc}</p>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* Team disciplines — roles only, no personal information */}
      <section className="surface-navy-deep section-y relative overflow-hidden" aria-labelledby="team-title">
        <div aria-hidden className="bg-dots-dark fade-mask-b absolute inset-0 opacity-60" />
        <div className="container-x relative grid gap-12 lg:grid-cols-2 lg:items-center">
          <div>
            <p className="eyebrow !text-cyan">The team</p>
            <h2 id="team-title" className="display mt-4 text-[clamp(1.9rem,3.8vw,3rem)] !text-white">
              Different expertise, <span className="accent-on-dark">one</span> standard.
            </h2>
            <p className="mt-5 max-w-lg text-base leading-relaxed text-white/70 sm:text-lg">
              A team of {site.teamSize} people with distinct expertise. Each engagement is staffed with the mix of
              specialists it actually needs.
            </p>
            {linkedin ? (
              <a href={linkedin} target="_blank" rel="noopener noreferrer" className="btn btn-lg btn-light mt-8">
                <LinkedInIcon className="size-4" />
                Follow Hatify Labs on LinkedIn
                <span className="sr-only">(opens in a new tab)</span>
              </a>
            ) : null}
          </div>
          <ul className="grid gap-2.5 sm:grid-cols-2">
            {DISCIPLINES.map((d) => (
              <li key={d} className="flex items-center gap-3 rounded-xl border border-white/10 bg-white/[0.04] px-4 py-3.5 text-sm font-medium text-white/85">
                <span className="size-1.5 shrink-0 rounded-full bg-cyan" aria-hidden />
                {d}
              </li>
            ))}
          </ul>
        </div>
      </section>

      {/* Engagement models */}
      <section className="section-y" aria-labelledby="models-title">
        <div className="container-x">
          <SectionHeader
            eyebrow="How we engage"
            title={<span id="models-title">Engagement models that fit the work</span>}
            desc="Every engagement starts with a scoped discovery so estimates are grounded in reality."
            action={
              <Link href="/contact" className="btn btn-secondary">
                Discuss your project
                <ArrowUpRight className="size-4" aria-hidden />
              </Link>
            }
          />
          <div className="mt-12 grid gap-4 md:grid-cols-3">
            {MODELS.map((m, i) => (
              <Reveal key={m.title} delay={i * 0.05} className="card h-full p-7">
                <m.icon className="size-6 text-royal" strokeWidth={1.6} aria-hidden />
                <h3 className="mt-5 text-lg font-bold">{m.title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-body">{m.desc}</p>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <ContactCTA />
    </>
  );
}
