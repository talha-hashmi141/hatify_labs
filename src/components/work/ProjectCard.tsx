import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { clientLabel, isVerifiedMetric, showPlaceholders } from "@/lib/data";
import type { Project } from "@/lib/types";
import { PendingText } from "@/components/ui/Placeholder";
import ProjectCover from "./ProjectCover";

/** Case-study card. `layout="wide"` puts the cover beside the content on large screens. */
export default function ProjectCard({ project, layout = "stack", headingLevel = "h3" }: { project: Project; layout?: "stack" | "wide"; headingLevel?: "h2" | "h3" }) {
  const H = headingLevel;
  const client = clientLabel(project);
  const wide = layout === "wide";
  const outcomes = project.results.filter(isVerifiedMetric).slice(0, 3);

  return (
    <article
      data-spotlight
      className={`card card-hover group relative flex h-full min-w-0 flex-col overflow-hidden p-3 ${wide ? "lg:grid lg:grid-cols-[1.15fr_1fr] lg:gap-2" : ""}`}
    >
      <ProjectCover project={project} size={wide ? "lg" : "md"} className={wide ? "aspect-[5/2] lg:aspect-auto lg:min-h-[260px]" : "aspect-[5/2]"} />

      <div className={`flex flex-1 flex-col p-4 pt-6 sm:p-6 ${wide ? "lg:justify-center lg:p-10" : ""}`}>
        <div className="flex flex-wrap items-center gap-2 text-xs">
          <span className="rounded-full bg-tint px-2.5 py-1 font-semibold text-royal">{project.sector}</span>
          {client ? (
            <span className="font-medium text-muted">{client}</span>
          ) : showPlaceholders ? (
            <PendingText>Client name pending approval</PendingText>
          ) : null}
        </div>

        <H className={`mt-4 font-bold tracking-tight text-ink ${wide ? "text-2xl sm:text-3xl" : "text-xl sm:text-2xl"}`}>
          <Link href={`/work/${project.slug}`} className="after:absolute after:inset-0 after:content-[''] focus-visible:outline-none">
            {project.title}
          </Link>
        </H>
        <p className={`mt-3 text-[15px] leading-relaxed text-body ${wide ? "" : "line-clamp-3"}`}>{project.summary}</p>

        {outcomes.length ? (
          <dl className="mt-6 grid grid-cols-3 divide-x divide-line rounded-xl border border-line bg-tint/40">
            {outcomes.map((m) => (
              <div key={m.label} className="flex flex-col gap-1.5 px-3 py-3.5 sm:px-4">
                <dt className="order-last text-[11px] leading-snug text-muted sm:text-xs">{m.label}</dt>
                <dd className={`font-bold leading-none tracking-tight text-ink tabular-nums ${wide ? "text-2xl sm:text-[1.75rem]" : "text-xl sm:text-2xl"}`}>{m.value}</dd>
              </div>
            ))}
          </dl>
        ) : null}

        <ul className="mt-5 flex flex-wrap gap-1.5" aria-label="Topics">
          {project.tags.map((t) => (
            <li key={t} className="chip">
              {t}
            </li>
          ))}
        </ul>

        <span className="mt-auto inline-flex items-center gap-1.5 pt-7 text-sm font-semibold text-royal">
          Read case study
          <ArrowUpRight className="size-4 transition-transform duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5" aria-hidden />
        </span>
      </div>
    </article>
  );
}
