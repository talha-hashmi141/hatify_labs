import Link from "next/link";
import { ArrowRight, ArrowUpRight } from "lucide-react";
import { services } from "@/lib/data";
import type { Service } from "@/lib/types";
import Icon from "@/components/ui/Icon";
import Reveal from "@/components/ui/Reveal";
import SectionHeader from "@/components/ui/SectionHeader";

function FeaturedCard({ s }: { s: Service }) {
  return (
    <article data-spotlight="dark" className="surface-royal group relative flex h-full flex-col overflow-hidden rounded-[var(--radius-card)] p-7 shadow-[var(--shadow-glow)] sm:p-9">
      <div aria-hidden className="bg-dots-dark absolute inset-0 opacity-60" />
      <div aria-hidden className="absolute -right-20 -top-20 size-72 rounded-full bg-cyan/15 blur-3xl transition-opacity duration-500 group-hover:opacity-80" />
      <div className="relative flex items-start justify-between gap-4">
        <span className="flex size-12 items-center justify-center rounded-xl bg-white/15 text-white ring-1 ring-white/25">
          <Icon name={s.icon} className="size-6" />
        </span>
        <span className="rounded-full bg-white/15 px-3 py-1 text-[11px] font-semibold text-white">{s.tag}</span>
      </div>
      <h3 className="relative mt-8 text-2xl font-bold tracking-tight !text-white sm:text-[1.75rem]">
        <Link href={`/services/${s.slug}`} className="after:absolute after:inset-0 after:content-['']">
          {s.title}
        </Link>
      </h3>
      <p className="relative mt-3 max-w-lg text-[15px] leading-relaxed text-white/95">{s.excerpt}</p>
      <ul className="relative mt-6 grid gap-2 sm:grid-cols-2">
        {s.features.slice(0, 4).map((f) => (
          <li key={f.title} className="flex items-center gap-2 text-sm text-white/90">
            <span className="size-1.5 rounded-full bg-white" aria-hidden />
            {f.title}
          </li>
        ))}
      </ul>
      <span className="relative mt-auto inline-flex items-center gap-1.5 pt-8 text-sm font-semibold text-white">
        Explore service
        <ArrowUpRight className="size-4 transition-transform duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5" aria-hidden />
      </span>
    </article>
  );
}

/**
 * Brand-colour fill that sweeps in behind a card on hover/focus. Text inside the
 * card flips to white via `group-hover:` / `group-focus-within:` classes.
 */
function ColourSweep({ from = "left" }: { from?: "left" | "bottom" }) {
  return (
    <span
      aria-hidden
      className={`bg-brand-fill absolute inset-0 -z-10 transition-transform duration-500 ease-[var(--ease-out-soft)] ${
        from === "left"
          ? "origin-left scale-x-0 group-hover:scale-x-100 group-focus-within:scale-x-100"
          : "origin-bottom scale-y-0 group-hover:scale-y-100 group-focus-within:scale-y-100"
      }`}
    />
  );
}

/** Grid card (home page, related services). */
export function ServiceCard({ s }: { s: Service }) {
  return (
    <article className="card card-hover group relative isolate flex h-full flex-col overflow-hidden p-6 hover:!border-transparent hover:shadow-[var(--shadow-glow)] sm:p-7">
      <ColourSweep from="bottom" />
      <div className="flex items-start justify-between gap-4">
        <span className="flex size-11 items-center justify-center rounded-xl bg-tint text-royal ring-1 ring-royal/10 transition-[background-color,color,transform] duration-300 group-hover:-rotate-6 group-hover:scale-110 group-hover:bg-white/15 group-hover:text-white group-hover:ring-white/25">
          <Icon name={s.icon} className="size-5" />
        </span>
        <ArrowUpRight className="size-5 text-faint transition-all duration-300 group-hover:rotate-45 group-hover:text-white" aria-hidden />
      </div>
      <p className="mt-6 font-mono text-[10px] uppercase tracking-[0.14em] text-muted transition-colors duration-300 group-hover:text-white/75">{s.tag}</p>
      <h3 className="mt-1.5 text-lg font-bold tracking-tight transition-colors duration-300 group-hover:text-white">
        <Link href={`/services/${s.slug}`} className="after:absolute after:inset-0 after:content-[''] focus-visible:outline-none">
          {s.title}
        </Link>
      </h3>
      <p className="mt-2.5 text-sm leading-relaxed text-body transition-colors duration-300 group-hover:text-white/90">{s.excerpt}</p>
    </article>
  );
}

/** Full-width horizontal row (services index): number · title & summary · highlights · arrow. */
export function ServiceRow({ s, index }: { s: Service; index: number }) {
  return (
    <article className="group relative isolate grid grid-cols-[auto_minmax(0,1fr)_auto] items-start gap-4 overflow-hidden rounded-2xl border border-line bg-surface px-5 py-7 shadow-[var(--shadow-soft)] transition-[padding,border-color,box-shadow] duration-500 ease-[var(--ease-out-soft)] hover:border-transparent hover:shadow-[var(--shadow-glow)] sm:gap-6 sm:px-7 sm:hover:px-9 md:grid-cols-[64px_minmax(0,1fr)_minmax(0,280px)_auto] md:gap-10 md:py-8">
      <ColourSweep />
      <span className="pt-1 font-mono text-xs text-muted transition-colors duration-300 group-hover:text-white/70">
        /{String(index).padStart(2, "0")}
      </span>
      <div className="min-w-0">
        <p className="font-mono text-[10px] uppercase tracking-[0.18em] text-muted transition-colors duration-300 group-hover:text-white/70">{s.tag}</p>
        <h3 className="mt-2 text-2xl font-bold tracking-tight transition-colors duration-300 group-hover:text-white sm:text-3xl">
          <Link href={`/services/${s.slug}`} className="after:absolute after:inset-0 after:content-[''] focus-visible:outline-none">
            {s.title}
          </Link>
        </h3>
        <p className="mt-3 max-w-xl text-sm leading-relaxed text-body transition-colors duration-300 group-hover:text-white/90 sm:text-[15px]">{s.excerpt}</p>
      </div>
      <ul className="hidden space-y-2 pt-1 md:block" aria-label={`${s.title} highlights`}>
        {s.features.slice(0, 3).map((f) => (
          <li key={f.title} className="flex items-center gap-2 font-mono text-[11px] uppercase tracking-[0.12em] text-muted transition-colors duration-300 group-hover:text-white/85">
            <span className="text-royal transition-colors duration-300 group-hover:text-white" aria-hidden>+</span>
            {f.title}
          </li>
        ))}
      </ul>
      <span className="flex size-10 items-center justify-center rounded-full border border-line-strong text-ink transition-all duration-500 group-hover:rotate-45 group-hover:border-white/40 group-hover:bg-white group-hover:text-royal sm:size-12">
        <ArrowUpRight className="size-5" aria-hidden />
      </span>
    </article>
  );
}

export default function ServicesOverview() {
  const featured = services.find((s) => s.featured) ?? services[0];
  const rest = services.filter((s) => s.slug !== featured.slug);

  return (
    <section className="section-y relative bg-surface" aria-labelledby="services-title">
      <div className="container-x">
        <SectionHeader
          eyebrow="Services"
          title={
            <span id="services-title">
              Specialists for every layer of your <span className="accent">product</span>.
            </span>
          }
          desc="Eleven practice areas, from LLM pipelines to database migrations. Each engagement is staffed with the people best suited to the work in front of it."
          action={
            <Link href="/services" className="btn btn-secondary">
              All services
              <ArrowRight className="size-4" aria-hidden />
            </Link>
          }
        />

        <div className="mt-14 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          <Reveal className="sm:col-span-2">
            <FeaturedCard s={featured} />
          </Reveal>
          {rest.map((s, i) => (
            <Reveal key={s.slug} delay={Math.min(i * 0.03, 0.2)}>
              <ServiceCard s={s} />
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
