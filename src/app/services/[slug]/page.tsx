import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowRight } from "lucide-react";
import ContactCTA from "@/components/sections/ContactCTA";
import { ServiceCard } from "@/components/sections/ServicesOverview";
import Icon from "@/components/ui/Icon";
import PageHero from "@/components/ui/PageHero";
import Reveal from "@/components/ui/Reveal";
import SectionHeader from "@/components/ui/SectionHeader";
import ProjectCard from "@/components/work/ProjectCard";
import { getService, projectsForService, relatedServices, services, site } from "@/lib/data";

export function generateStaticParams() {
  return services.map((s) => ({ slug: s.slug }));
}

export const dynamicParams = false;

export async function generateMetadata({ params }: PageProps<"/services/[slug]">): Promise<Metadata> {
  const { slug } = await params;
  const service = getService(slug);
  if (!service) return {};
  return {
    title: service.title,
    description: service.excerpt,
    keywords: service.keywords,
    alternates: { canonical: `/services/${service.slug}` },
    openGraph: { title: `${service.title} — ${site.name}`, description: service.excerpt, url: `${site.url}/services/${service.slug}` },
  };
}

export default async function ServiceDetailPage({ params }: PageProps<"/services/[slug]">) {
  const { slug } = await params;
  const service = getService(slug);
  if (!service) notFound();

  const related = relatedServices(service.slug);
  const work = projectsForService(service.slug);

  const ld = [
    {
      "@context": "https://schema.org",
      "@type": "Service",
      name: service.title,
      description: service.description,
      serviceType: service.title,
      url: `${site.url}/services/${service.slug}`,
      provider: { "@type": "Organization", name: site.name, url: site.url },
      areaServed: "Worldwide",
    },
    {
      "@context": "https://schema.org",
      "@type": "BreadcrumbList",
      itemListElement: [
        { "@type": "ListItem", position: 1, name: "Home", item: site.url },
        { "@type": "ListItem", position: 2, name: "Services", item: `${site.url}/services` },
        { "@type": "ListItem", position: 3, name: service.title, item: `${site.url}/services/${service.slug}` },
      ],
    },
  ];

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(ld) }} />

      <PageHero
        crumbs={[{ label: "Home", href: "/" }, { label: "Services", href: "/services" }, { label: service.title }]}
        eyebrow={service.tag}
        title={service.title}
        desc={service.excerpt}
        aside={
          <div className="surface-sky relative overflow-hidden rounded-[var(--radius-card)] p-7 shadow-[var(--shadow-soft)]">
            <div aria-hidden className="bg-dots absolute inset-0 opacity-50" />
            <span className="relative flex size-12 items-center justify-center rounded-xl bg-brand-fill text-white shadow-[var(--shadow-glow)]">
              <Icon name={service.icon} className="size-6" />
            </span>
            <p className="relative mt-6 font-mono text-[11px] uppercase tracking-[0.14em] text-muted">Typical stack</p>
            <ul className="relative mt-3 flex flex-wrap gap-1.5">
              {service.stack.map((t) => (
                <li key={t} className="chip">
                  {t}
                </li>
              ))}
            </ul>
          </div>
        }
      >
        <Link href="/contact" className="btn btn-lg btn-brand">
          Discuss your project
          <ArrowRight className="size-4" aria-hidden />
        </Link>
      </PageHero>

      <section className="section-y" aria-labelledby="approach-title">
        <div className="container-x grid gap-10 lg:grid-cols-12">
          <div className="lg:col-span-4">
            <p className="eyebrow">Our approach</p>
            <h2 id="approach-title" className="display mt-4 text-[clamp(1.8rem,3.4vw,2.6rem)]">
              How we <span className="accent">approach</span> it.
            </h2>
          </div>
          <p className="lead lg:col-span-8">{service.description}</p>
        </div>

        <div className="container-x mt-14">
          <h2 className="sr-only">What we deliver</h2>
          <ul className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {service.features.map((f, i) => (
              <Reveal as="li" key={f.title} delay={Math.min(i * 0.04, 0.2)} className="card h-full p-6 sm:p-7">
                <span className="font-mono text-xs text-royal">{String(i + 1).padStart(2, "0")}</span>
                <h3 className="mt-4 text-lg font-bold">{f.title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-body">{f.desc}</p>
              </Reveal>
            ))}
          </ul>
        </div>
      </section>

      {work.length ? (
        <section className="section-y bg-surface" aria-labelledby="related-work-title">
          <div className="container-x">
            <SectionHeader
              eyebrow="Related case studies"
              title={<span id="related-work-title">Where we&rsquo;ve applied this</span>}
              action={
                <Link href="/work" className="btn btn-secondary">
                  All case studies
                  <ArrowRight className="size-4" aria-hidden />
                </Link>
              }
            />
            <div className={`mt-12 grid gap-5 ${work.length > 1 ? "md:grid-cols-2" : ""}`}>
              {work.slice(0, 2).map((p) => (
                <ProjectCard key={p.slug} project={p} layout={work.length > 1 ? "stack" : "wide"} />
              ))}
            </div>
          </div>
        </section>
      ) : null}

      <section className="section-y" aria-labelledby="related-services-title">
        <div className="container-x">
          <SectionHeader eyebrow="Related services" title={<span id="related-services-title">Often combined with</span>} />
          <div className="mt-12 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {related.map((s) => (
              <ServiceCard key={s.slug} s={s} />
            ))}
          </div>
        </div>
      </section>

      <ContactCTA />
    </>
  );
}
