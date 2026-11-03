import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { clientLabel, showPlaceholders } from "@/lib/data";
import type { Project } from "@/lib/types";
import { PendingText } from "@/components/ui/Placeholder";
import ProjectCover from "./ProjectCover";

/** Case-study card. `layout="wide"` puts the cover beside the content on large screens. */
export default function ProjectCard({ project, layout = "stack", headingLevel = "h3" }: { project: Project; layout?: "stack" | "wide"; headingLevel?: "h2" | "h3" }) {
  const H = headingLevel;
  const client = clientLabel(project);
  const wide = layout === "wide";
  const stack = project.stack.flatMap((g) => g.items).slice(0, wide ? 6 : 4);

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

        <ul className="mt-5 flex flex-wrap gap-1.5" aria-label="Technology">
          {stack.map((t) => (
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
