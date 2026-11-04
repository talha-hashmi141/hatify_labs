import Link from "next/link";
import { ArrowRight, Boxes, Cloud, Code, Database, Sparkles, Workflow } from "lucide-react";
import { achievements, site } from "@/lib/data";
import Reveal from "@/components/ui/Reveal";
import Tilt from "@/components/ui/Tilt";
import HeroHeadline from "./HeroHeadline";
import SystemVisual from "./SystemVisual";

/** Capability capsule — echoes the navy service bar of the brand banner. */
const CAPSULE = [
  { label: "AI & LLM Systems", href: "/services/generative-ai", icon: Sparkles },
  { label: "Web & Mobile Apps", href: "/services/web-development", icon: Code },
  { label: "Cloud App Development", href: "/services/cloud-devops", icon: Cloud },
  { label: "DB Development & Migration", href: "/services/data-engineering", icon: Database },
  { label: "Multi-tenant SaaS", href: "/services/multi-tenant-saas", icon: Boxes },
  { label: "Automation & Workflows", href: "/services/automation-workflows", icon: Workflow },
];

export default function Hero() {
  return (
    <section className="relative overflow-hidden pt-24 pb-16 sm:pt-28 md:pt-[7.5rem] md:pb-24" aria-labelledby="hero-title">
      {/* Atmosphere — soft brand curves at the edges, as in the banner */}
      <div aria-hidden className="pointer-events-none absolute inset-0">
        <div className="bg-dots fade-mask-b absolute inset-0 opacity-60" />
        <div className="animate-drift absolute -left-40 top-24 h-[520px] w-[300px] rounded-full bg-gradient-to-b from-electric/30 to-cyan/10 blur-[90px]" />
        <div className="animate-drift absolute -right-24 -top-24 h-[620px] w-[520px] rounded-full [animation-delay:-9s] bg-gradient-to-bl from-electric/25 via-royal/10 to-transparent blur-[100px]" />
      </div>

      <div className="container-x relative">
        <div className="grid items-center gap-14 lg:grid-cols-[minmax(0,1.05fr)_minmax(0,0.95fr)] lg:gap-12">
          <div>
            <Reveal>
              <p className="inline-flex max-w-full items-center gap-2 rounded-full border border-line bg-surface/80 py-1.5 pl-1.5 pr-4 text-xs font-medium text-body shadow-[var(--shadow-soft)] backdrop-blur">
                <span className="shrink-0 whitespace-nowrap rounded-full bg-deep px-2.5 py-1 text-[11px] font-semibold text-white">Est. {site.founded}</span>
                <span className="truncate">
                  Software & AI engineering studio<span className="hidden sm:inline"> · {site.location.split(",")[0]}</span>
                </span>
              </p>
            </Reveal>

            <HeroHeadline />

            <Reveal delay={0.45}>
              <p className="lead mt-6 max-w-xl">
                Hatify Labs designs, builds and modernises the software organisations depend on: AI systems, web and
                mobile apps, cloud platforms and the data underneath them.
              </p>
            </Reveal>

            <Reveal delay={0.55} className="mt-9 flex flex-col gap-3 sm:flex-row">
              <Link href="/contact" className="btn btn-lg btn-brand">
                Start a project
                <ArrowRight className="size-4" aria-hidden />
              </Link>
              <Link href="/work" className="btn btn-lg btn-secondary">
                Explore case studies
              </Link>
            </Reveal>

          </div>

          <Reveal delay={0.35} y={28}>
            <Tilt>
              <SystemVisual />
            </Tilt>
          </Reveal>
        </div>

        {/* Company stats: full-width, centred, every value on one baseline */}
        <Reveal delay={0.1} className="mt-16 md:mt-20">
          <dl className="card grid grid-cols-2 overflow-hidden md:grid-cols-4">
            {achievements.map((a, i) => (
              <div
                key={a.id}
                className={`flex flex-col items-center gap-2 px-4 py-6 text-center sm:py-8 ${i % 2 ? "border-l border-line" : ""} ${
                  i >= 2 ? "border-t border-line md:border-t-0" : ""
                } ${i === 2 ? "md:border-l" : ""}`}
              >
                <dt className="order-last max-w-[26ch] text-xs leading-snug text-muted sm:text-sm">{a.label}</dt>
                <dd className="text-[clamp(1.9rem,3.4vw,2.75rem)] font-bold leading-none tracking-tight text-ink tabular-nums">{a.value}</dd>
              </div>
            ))}
          </dl>
        </Reveal>

        {/* Capability capsule */}
        <Reveal delay={0.1} className="mt-5">
          <nav aria-label="Core capabilities" className="surface-royal relative overflow-hidden rounded-2xl p-2 shadow-[var(--shadow-glow)] ring-1 ring-white/20">
            <ul className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6">
              {CAPSULE.map(({ label, href, icon: Ico }, i) => (
                <li key={label} className={`relative ${i > 0 ? "lg:before:absolute lg:before:inset-y-5 lg:before:left-0 lg:before:w-px lg:before:bg-white/20" : ""}`}>
                  <Link
                    href={href}
                    data-spotlight="dark"
                    className="group flex h-full flex-col items-center gap-2.5 rounded-xl px-3 py-5 text-center transition-colors hover:bg-white/[0.12]"
                  >
                    <Ico className="size-6 text-white transition-transform duration-300 group-hover:-translate-y-1 group-hover:scale-110" strokeWidth={1.6} aria-hidden />
                    <span className="text-[13px] font-semibold leading-tight text-white">{label}</span>
                  </Link>
                </li>
              ))}
            </ul>
          </nav>
        </Reveal>
      </div>
    </section>
  );
}
