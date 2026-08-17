import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowUpRight } from "lucide-react";
import MagneticButton from "@/components/MagneticButton";
import Reveal from "@/components/Reveal";
import RevealText from "@/components/RevealText";
import { getService, relatedServices, services, site } from "@/lib/data";

interface Props {
  params: Promise<{ slug: string }>;
}

export function generateStaticParams() {
  return services.map((s) => ({ slug: s.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const service = getService(slug);
  if (!service) return {};
  return {
    title: service.title,
    description: `${service.excerpt} ${service.description}`.slice(0, 160),
    keywords: service.keywords,
    alternates: { canonical: `/services/${service.slug}` },
    openGraph: {
      title: `${service.title} — ${site.name}`,
      description: service.excerpt,
      url: `${site.url}/services/${service.slug}`,
    },
  };
}

export default async function ServiceDetailPage({ params }: Props) {
  const { slug } = await params;
  const service = getService(slug);
  if (!service) notFound();

  const related = relatedServices(service.slug);
  const position = services.findIndex((s) => s.slug === service.slug) + 1;

  const serviceLd = {
    "@context": "https://schema.org",
    "@type": "Service",
    name: service.title,
    description: service.description,
    serviceType: service.title,
    url: `${site.url}/services/${service.slug}`,
    provider: { "@type": "Organization", name: site.name, url: site.url },
    areaServed: "Worldwide",
  };

  const breadcrumbLd = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Home", item: site.url },
      { "@type": "ListItem", position: 2, name: "Services", item: `${site.url}/services` },
      { "@type": "ListItem", position: 3, name: service.title, item: `${site.url}/services/${service.slug}` },
    ],
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify([serviceLd, breadcrumbLd]) }}
      />

      {/* Fixed-height banner */}
      <header className="relative flex h-[40vh] min-h-[360px] flex-col overflow-hidden border-b border-white/10">
        <div aria-hidden className="pointer-events-none absolute inset-0 select-none">
          <Image src="/images/process-blueprint.jpg" alt="" fill className="object-cover object-center opacity-45" sizes="100vw" priority />
          <div className="absolute inset-0 bg-gradient-to-r from-ink via-ink/70 to-ink/15" />
          <div className="absolute inset-x-0 bottom-0 h-20 bg-gradient-to-t from-ink to-transparent" />
        </div>

        <div className="container-x relative flex flex-1 flex-col justify-end pb-7 pt-24">
          <div className="flex items-baseline justify-between gap-4">
            <span className="font-mono text-sm font-medium uppercase tracking-[0.2em] text-zinc-400 md:text-base">
              <Link href="/services" className="text-lime-300 transition-colors hover:text-lime-200">
                Services
              </Link>{" "}
              / {service.tag}
            </span>
            <span className="label-mono hidden !text-zinc-400 sm:block">
              SRV — {String(position).padStart(2, "0")}/{String(services.length).padStart(2, "0")}
            </span>
          </div>
          <h1 className="display mt-4 max-w-5xl text-[clamp(2.4rem,6vw,5.2rem)]">
            <RevealText text={service.title} />
          </h1>
        </div>
      </header>

      {/* Intro + stack */}
      <section className="border-b border-white/10 py-12 md:py-16">
        <div className="container-x">
          <div className="grid gap-8 md:grid-cols-12">
            <p className="text-lg leading-relaxed text-zinc-300 md:col-span-5">{service.excerpt}</p>
            <p className="text-base leading-relaxed text-zinc-500 md:col-span-7">{service.description}</p>
          </div>
          <div className="mt-10 flex flex-wrap gap-2">
            {service.stack.map((t) => (
              <span key={t} className="tag-mono">
                {t}
              </span>
            ))}
          </div>
        </div>
      </section>

      {/* Deliverables index */}
      <section data-theme="light" className="py-20 md:py-24">
        <div className="container-x">
          <Reveal>
            <div className="flex items-baseline justify-between gap-4">
              <span className="font-mono text-base font-semibold tracking-[0.2em] md:text-lg text-lime-700">[A]</span>
              <span className="label-mono">What we deliver</span>
            </div>
          </Reveal>
          <div className="mt-8 border-t border-black/10">
            {service.features.map((f, i) => (
              <Reveal key={f.title} delay={Math.min(i * 0.04, 0.25)}>
                <div className="grid gap-2 border-b border-black/10 py-7 md:grid-cols-[110px_320px_1fr] md:gap-10">
                  <span className="font-mono text-base font-semibold text-lime-700">F/{String(i + 1).padStart(2, "0")}</span>
                  <h3 className="display text-xl md:text-2xl">{f.title}</h3>
                  <p className="max-w-2xl text-sm leading-relaxed text-zinc-600 sm:text-base">{f.desc}</p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* Inline CTA */}
      <section className="py-16 md:py-20">
        <div className="container-x">
          <Reveal>
            <div className="flex flex-col items-start justify-between gap-8 rounded-2xl border border-white/10 p-8 md:flex-row md:items-center md:p-12">
              <div>
                <span className="label-mono">Next step</span>
                <h2 className="display mt-3 text-2xl sm:text-3xl md:text-4xl">
                  Need this done <span className="text-accent">properly?</span>
                </h2>
                <p className="mt-3 max-w-xl text-sm text-zinc-400 sm:text-base">
                  Tell us where you are and where it hurts — we will map the shortest safe path to production.
                </p>
              </div>
              <MagneticButton className="shrink-0">
                <Link href="/contact" className="btn-primary">
                  Talk to an engineer
                  <ArrowUpRight className="size-4" />
                </Link>
              </MagneticButton>
            </div>
          </Reveal>
        </div>
      </section>

      {/* Related services */}
      <section className="pb-24">
        <div className="container-x">
          <Reveal>
            <div className="flex items-baseline justify-between gap-4">
              <span className="font-mono text-base font-semibold tracking-[0.2em] md:text-lg text-lime-300">[B]</span>
              <span className="label-mono">You might also need</span>
            </div>
          </Reveal>
          <div className="mt-8 space-y-3">
            {related.map((r) => (
              <Reveal key={r.slug}>
                <Link
                  href={`/services/${r.slug}`}
                  className="group grid grid-cols-[1fr_auto] items-center gap-6 rounded-xl border border-white/10 bg-lime-300/[0.05] px-5 py-6 transition-all duration-300 hover:border-lime-300 hover:bg-lime-300 hover:px-7"
                >
                  <div className="min-w-0">
                    <h3 className="display text-2xl transition-colors duration-300 group-hover:text-black sm:text-3xl">
                      {r.title}
                    </h3>
                    <p className="mt-1.5 hidden text-sm text-zinc-500 transition-colors duration-300 group-hover:text-black/70 sm:block">
                      {r.excerpt}
                    </p>
                  </div>
                  <ArrowUpRight className="size-6 text-zinc-600 transition-all duration-300 group-hover:rotate-45 group-hover:text-black" />
                </Link>
              </Reveal>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
