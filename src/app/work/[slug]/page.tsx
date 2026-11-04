import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowRight, CheckCircle2, CircleAlert, ExternalLink } from "lucide-react";
import ContactCTA from "@/components/sections/ContactCTA";
import { TestimonialCard } from "@/components/sections/Testimonials";
import { MetricGrid } from "@/components/ui/Metric";
import PageHero from "@/components/ui/PageHero";
import { PendingText } from "@/components/ui/Placeholder";
import Reveal from "@/components/ui/Reveal";
import CaseStudyNav from "@/components/work/CaseStudyNav";
import ArchitectureDiagram from "@/components/work/ArchitectureDiagram";
import ProjectCover from "@/components/work/ProjectCover";
import {
  adjacentProject,
  clientLabel,
  getProject,
  getService,
  getTestimonial,
  isApprovedTestimonial,
  isVerifiedMetric,
  projects,
  showPlaceholders,
  site,
} from "@/lib/data";

export function generateStaticParams() {
  return projects.map((p) => ({ slug: p.slug }));
}

export const dynamicParams = false;

export async function generateMetadata({ params }: PageProps<"/work/[slug]">): Promise<Metadata> {
  const { slug } = await params;
  const p = getProject(slug);
  if (!p) return {};
  return {
    title: `${p.title} — Case Study`,
    description: p.summary.slice(0, 160),
    alternates: { canonical: `/work/${p.slug}` },
    openGraph: { title: `${p.title} — ${site.name}`, description: p.summary, url: `${site.url}/work/${p.slug}`, type: "article" },
  };
}

const SECTIONS = [
  { id: "overview", label: "Overview" },
  { id: "problem", label: "Problem" },
  { id: "solution", label: "Solution" },
  { id: "architecture", label: "Architecture" },
  { id: "stack", label: "Technology stack" },
  { id: "features", label: "Features" },
  { id: "results", label: "Results" },
];

function Heading({ id, index, children }: { id: string; index: number; children: React.ReactNode }) {
  return (
    <div className="flex items-baseline gap-4">
      <span className="font-mono text-xs text-royal">{String(index).padStart(2, "0")}</span>
      <h2 id={`${id}-title`} className="display text-[clamp(1.6rem,3vw,2.25rem)]">
        {children}
      </h2>
    </div>
  );
}

export default async function CaseStudyPage({ params }: PageProps<"/work/[slug]">) {
  const { slug } = await params;
  const project = getProject(slug);
  if (!project) notFound();

  const client = clientLabel(project);
  const testimonial = getTestimonial(project.testimonialId);
  // Only client-approved testimonials are shown.
  const showTestimonial = testimonial && isApprovedTestimonial(testimonial);
  const showMetrics = showPlaceholders || project.results.some(isVerifiedMetric);
  const gallery = project.media.gallery.filter((g): g is { src: string; caption: string } => Boolean(g.src));
  const next = adjacentProject(project.slug);
  // The Results section (and its nav link) only appears once there is something real to show.
  const showResults = showMetrics || gallery.length > 0 || Boolean(showTestimonial);
  const sections = SECTIONS.filter((sec) => sec.id !== "results" || showResults);
  const relatedServices = project.services.map(getService).filter((s) => s !== undefined);

  const facts: { label: string; value: React.ReactNode }[] = [
    { label: "Client", value: client ?? (showPlaceholders ? <PendingText>Pending approval</PendingText> : "Confidential") },
    { label: "Sector", value: project.sector },
    { label: "Year", value: project.year ?? (showPlaceholders ? <PendingText>To be confirmed</PendingText> : null) },
    { label: "Engagement", value: project.engagement ?? (showPlaceholders ? <PendingText>To be confirmed</PendingText> : null) },
  ].filter((f) => f.value);

  const ld = [
    {
      "@context": "https://schema.org",
      "@type": "Article",
      headline: project.title,
      description: project.summary,
      about: project.sector,
      author: { "@type": "Organization", name: site.name, url: site.url },
      publisher: { "@type": "Organization", name: site.name, url: site.url },
      url: `${site.url}/work/${project.slug}`,
    },
    {
      "@context": "https://schema.org",
      "@type": "BreadcrumbList",
      itemListElement: [
        { "@type": "ListItem", position: 1, name: "Home", item: site.url },
        { "@type": "ListItem", position: 2, name: "Work", item: `${site.url}/work` },
        { "@type": "ListItem", position: 3, name: project.title, item: `${site.url}/work/${project.slug}` },
      ],
    },
  ];

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(ld) }} />

      <PageHero
        crumbs={[{ label: "Home", href: "/" }, { label: "Work", href: "/work" }, { label: project.title }]}
        eyebrow={`Case study · ${project.sector}`}
        title={project.title}
        desc={project.summary}
        aside={
          <dl className="card divide-y divide-line p-2">
            {facts.map((f) => (
              <div key={f.label} className="flex items-center justify-between gap-4 px-4 py-3.5">
                <dt className="text-sm text-muted">{f.label}</dt>
                <dd className="text-right text-sm font-semibold text-ink">{f.value}</dd>
              </div>
            ))}
            <div className="px-4 py-3.5">
              <dt className="text-sm text-muted">Services</dt>
              <dd className="mt-2.5 flex flex-wrap gap-1.5">
                {relatedServices.map((s) => (
                  <Link key={s.slug} href={`/services/${s.slug}`} className="chip transition-colors hover:border-royal hover:text-royal">
                    {s.title}
                  </Link>
                ))}
              </dd>
            </div>
            {project.links.live ? (
              <div className="p-2">
                <a href={project.links.live} target="_blank" rel="noopener noreferrer" className="btn btn-primary w-full">
                  View live product
                  <ExternalLink className="size-4" aria-hidden />
                  <span className="sr-only">(opens in a new tab)</span>
                </a>
              </div>
            ) : null}
          </dl>
        }
      />

      <div className="container-x pt-10 md:pt-14">
        <ProjectCover project={project} size="lg" priority className="aspect-[2/1] w-full md:aspect-[3/1] lg:aspect-[4/1]" />
      </div>

      <div className="container-x grid gap-12 py-16 md:py-24 lg:grid-cols-[220px_minmax(0,1fr)] lg:gap-16">
        {/* In-page navigation with scroll-spy */}
        <CaseStudyNav sections={sections} />

        <article className="min-w-0 space-y-20 md:space-y-24">
          <section id="overview" aria-labelledby="overview-title">
            <Heading id="overview" index={1}>
              Overview
            </Heading>
            <p className="lead mt-6 max-w-3xl">{project.overview}</p>
          </section>

          <div className="grid gap-5 md:grid-cols-2">
            <Reveal>
              <section id="problem" aria-labelledby="problem-title" className="card h-full p-7 sm:p-9">
                <Heading id="problem" index={2}>
                  The problem
                </Heading>
                <p className="mt-5 text-[15px] leading-relaxed text-body">{project.problem.summary}</p>
                <ul className="mt-6 space-y-3.5">
                  {project.problem.points.map((pt) => (
                    <li key={pt} className="flex gap-3 text-[15px] leading-relaxed text-body">
                      <CircleAlert className="mt-1 size-4 shrink-0 text-royal/70" aria-hidden />
                      {pt}
                    </li>
                  ))}
                </ul>
              </section>
            </Reveal>
            <Reveal delay={0.05}>
              <section id="solution" aria-labelledby="solution-title" className="surface-sky h-full rounded-[var(--radius-card)] p-7 sm:p-9">
                <div className="flex items-baseline gap-4">
                  <span className="font-mono text-xs text-royal">03</span>
                  <h2 id="solution-title" className="display text-[clamp(1.6rem,3vw,2.25rem)]">
                    Our solution
                  </h2>
                </div>
                <p className="mt-5 text-[15px] leading-relaxed text-body">{project.solution.summary}</p>
                <ul className="mt-6 space-y-3.5">
                  {project.solution.points.map((pt) => (
                    <li key={pt} className="flex gap-3 text-[15px] leading-relaxed text-body">
                      <CheckCircle2 className="mt-1 size-4 shrink-0 text-royal" aria-hidden />
                      {pt}
                    </li>
                  ))}
                </ul>
              </section>
            </Reveal>
          </div>

          <section id="architecture" aria-labelledby="architecture-title">
            <Heading id="architecture" index={4}>
              Architecture
            </Heading>
            <div className="mt-8">
              <ArchitectureDiagram architecture={project.architecture} />
            </div>
            <h3 className="mt-12 text-lg font-bold">Key decisions</h3>
            <div className="mt-5 grid gap-4 md:grid-cols-3">
              {project.architecture.decisions.map((d, i) => (
                <Reveal key={d.title} delay={i * 0.05} className="card h-full p-6">
                  <p className="font-mono text-[11px] uppercase tracking-[0.14em] text-royal">Decision {i + 1}</p>
                  <h4 className="mt-3 font-bold text-ink">{d.title}</h4>
                  <p className="mt-2 text-sm leading-relaxed text-body">{d.desc}</p>
                </Reveal>
              ))}
            </div>
          </section>

          <section id="stack" aria-labelledby="stack-title">
            <Heading id="stack" index={5}>
              Technology stack
            </Heading>
            <dl className="mt-8 grid gap-4 sm:grid-cols-2">
              {project.stack.map((g) => (
                <div key={g.group} className="card p-6">
                  <dt className="mono-label">{g.group}</dt>
                  <dd className="mt-4 flex flex-wrap gap-1.5">
                    {g.items.map((t) => (
                      <span key={t} className="chip !bg-tint/50">
                        {t}
                      </span>
                    ))}
                  </dd>
                </div>
              ))}
            </dl>
          </section>

          <section id="features" aria-labelledby="features-title">
            <Heading id="features" index={6}>
              Key features
            </Heading>
            <ul className="mt-8 grid gap-x-10 gap-y-8 sm:grid-cols-2">
              {project.features.map((f) => (
                <li key={f.title} className="flex gap-4">
                  <span className="mt-1 flex size-8 shrink-0 items-center justify-center rounded-lg bg-tint text-royal">
                    <CheckCircle2 className="size-4" aria-hidden />
                  </span>
                  <div>
                    <h3 className="font-bold text-ink">{f.title}</h3>
                    <p className="mt-1.5 text-[15px] leading-relaxed text-body">{f.desc}</p>
                  </div>
                </li>
              ))}
            </ul>
          </section>

          {showResults ? (
          <section id="results" aria-labelledby="results-title">
            <Heading id="results" index={7}>
              Results
            </Heading>
            {showMetrics ? (
              <>
                <p className="mt-4 max-w-2xl text-[15px] text-body">
                  Measured in production after launch.
                </p>
                <MetricGrid metrics={project.results} className="mt-8" maxCols={3} />
              </>
            ) : null}

            {gallery.length ? (
              <div className="mt-12">
                <h3 className="text-lg font-bold">Product gallery</h3>
                <ul className="mt-5 grid gap-4 sm:grid-cols-3">
                  {gallery.map((g) => (
                      <li key={g.caption}>
                        <figure>
                          <div className="relative aspect-[4/3] overflow-hidden rounded-xl border border-line bg-surface">
                            <Image src={g.src} alt={g.caption} fill sizes="(min-width: 640px) 30vw, 100vw" className="object-cover" />
                          </div>
                          <figcaption className="mt-2 text-sm text-muted">{g.caption}</figcaption>
                        </figure>
                      </li>
                  ))}
                </ul>
              </div>
            ) : null}

            {showTestimonial ? (
              <div className="mt-12 max-w-2xl">
                <TestimonialCard t={testimonial} />
              </div>
            ) : null}
          </section>
          ) : null}

          {/* Next case study */}
          {next.slug !== project.slug ? (
            <Link
              href={`/work/${next.slug}`}
              className="card card-hover group flex items-center justify-between gap-5 p-6 sm:gap-6 sm:p-9"
            >
              <div>
                <p className="mono-label">Next case study · {next.sector}</p>
                <p className="mt-2 text-xl font-bold text-ink sm:text-2xl">{next.title}</p>
              </div>
              <span className="flex size-12 shrink-0 items-center justify-center rounded-full bg-deep text-white transition-colors group-hover:bg-fill">
                <ArrowRight className="size-5" aria-hidden />
              </span>
            </Link>
          ) : null}
        </article>
      </div>

      <ContactCTA />
    </>
  );
}
