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
      <div aria-hidden className="absolute -right-20 -top-20 size-72 rounded-full bg-cyan/30 blur-3xl transition-opacity duration-500 group-hover:opacity-80" />
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

export function ServiceCard({ s }: { s: Service }) {
  return (
    <article data-spotlight className="card card-hover group relative flex h-full flex-col p-6 sm:p-7">
      <div className="flex items-start justify-between gap-4">
        <span className="flex size-11 items-center justify-center rounded-xl bg-tint text-royal ring-1 ring-royal/10 transition-[background-color,color,transform] duration-300 group-hover:-rotate-6 group-hover:scale-110 group-hover:bg-royal group-hover:text-white">
          <Icon name={s.icon} className="size-5" />
        </span>
        <ArrowUpRight className="size-5 text-faint transition-all duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:text-royal" aria-hidden />
      </div>
      <p className="mt-6 font-mono text-[10px] uppercase tracking-[0.14em] text-muted">{s.tag}</p>
      <h3 className="mt-1.5 text-lg font-bold tracking-tight">
        <Link href={`/services/${s.slug}`} className="after:absolute after:inset-0 after:content-['']">
          {s.title}
        </Link>
      </h3>
      <p className="mt-2.5 text-sm leading-relaxed text-body">{s.excerpt}</p>
    </article>
  );
}

export default function ServicesOverview() {
  const featured = services.find((s) => s.featured) ?? services[0];
  const rest = services.filter((s) => s.slug !== featured.slug);

  return (
    <section className="section-y relative bg-white" aria-labelledby="services-title">
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
