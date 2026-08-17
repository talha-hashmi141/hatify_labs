import Image from "next/image";
import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { projects } from "@/lib/data";
import Reveal from "./Reveal";
import RevealText from "./RevealText";
import type { Project } from "@/lib/types";

export function ProjectRow({
  project,
  index,
  showStack,
  darker,
}: {
  project: Project;
  index: number;
  showStack?: boolean;
  /** Slightly darkened paper fill (used on the work page). */
  darker?: boolean;
}) {
  return (
    <article
      data-theme="light"
      className={`group rounded-2xl border border-black/10 p-6 transition-colors duration-300 hover:border-lime-700/40 sm:p-8 ${
        darker ? "!bg-[#dde6c2]" : ""
      }`}
    >
      <div className="flex items-baseline justify-between gap-4">
        <span className="font-mono text-base font-semibold text-lime-700">P/{String(index + 1).padStart(2, "0")}</span>
        <span className="label-mono">[{project.sector}]</span>
      </div>
      <h3 className="display mt-5 text-3xl transition-transform duration-500 group-hover:translate-x-3 md:text-4xl">
        {project.title}
      </h3>
      <p className="mt-4 max-w-2xl text-sm leading-relaxed text-zinc-600 sm:text-base">{project.summary}</p>

      <div className="mt-7 flex flex-wrap gap-x-12 gap-y-5">
        {project.outcomes.map((o) => (
          <div key={o.label}>
            <p className="font-display text-2xl font-extrabold text-accent sm:text-3xl">{o.value}</p>
            <p className="label-mono mt-1.5 !tracking-[0.15em]">{o.label}</p>
          </div>
        ))}
      </div>

      <div className="mt-6 flex flex-wrap items-center gap-2">
        {project.tags.map((t) => (
          <span key={t} className="tag-mono">
            {t}
          </span>
        ))}
      </div>

      {showStack ? (
        <p className="mt-5 font-mono text-[11px] uppercase tracking-[0.2em] text-[#10160a]/60">
          Stack — {project.stack.join(" · ")}
        </p>
      ) : null}
    </article>
  );
}

/** Split-screen section: pale-lime sticky panel left, ink-black scrolling rows right. */
export default function CaseStudies({ preview, index = "03" }: { preview?: boolean; index?: string }) {
  const list = preview ? projects.slice(0, 3) : projects;
  const sectors = [...new Set(projects.map((p) => p.sector))];

  return (
    <section className="grid border-y border-white/10 lg:grid-cols-[minmax(0,42%)_1fr]">
      {/* LEFT — neon lime, pins while the right side scrolls.
          NOTE: no overflow-hidden here — a clipping parent disables the sticky pinning. */}
      <div data-theme="lime" className="relative lg:border-r lg:border-black/20">
        <div className="relative px-5 py-14 sm:px-10 lg:sticky lg:top-0 lg:flex lg:min-h-svh lg:flex-col lg:justify-center lg:px-12 lg:py-24 xl:px-16">
          {/* Texture lives INSIDE the sticky element so it pins with the panel
              without a clipping wrapper that would break position: sticky. */}
          <div aria-hidden className="pointer-events-none absolute inset-0 select-none">
            <Image
              src="/images/casestudies-geometric.jpg"
              alt=""
              fill
              className="object-cover opacity-[0.05] mix-blend-multiply"
              style={{ maskImage: "linear-gradient(to top, black 30%, transparent 95%)" }}
              sizes="(min-width: 1024px) 42vw, 100vw"
            />
          </div>
          <div className="relative flex items-baseline justify-between gap-4">
            <span className="font-mono text-base font-semibold tracking-[0.2em] md:text-lg text-[#0c1202]">[{index}]</span>
            <span className="font-mono text-sm font-medium uppercase tracking-[0.2em] md:text-base text-[#0c1202]/60">Selected work</span>
          </div>
          <h2 className="display relative mt-2 text-[clamp(2.5rem,5vw,4.5rem)]">
            <RevealText text="Built where failure is not an option" accent="failure" />
          </h2>
          <p className="relative mt-2 max-w-sm text-base leading-relaxed text-[#0c1202]/70">
            Government departments, healthcare data, million-message pipelines — a sample of what we have
            shipped and kept running.
          </p>
          {preview ? (
            <div className="relative mt-5">
              <Link
                href="/work"
                className="inline-flex items-center justify-center gap-3 rounded-full border border-[#0c1202]/50 px-7 py-4 font-mono text-xs font-medium uppercase tracking-[0.2em] text-[#0c1202] transition-colors duration-300 hover:border-[#0c1202] hover:bg-[#0c1202] hover:text-lime-300 active:scale-[0.98]"
              >
                View all work
                <ArrowUpRight className="size-4" />
              </Link>
            </div>
          ) : null}

          <p className="relative mt-10 font-mono text-[10px] uppercase tracking-[0.2em] text-[#0c1202]/50 lg:absolute lg:bottom-8 lg:mt-0">
            Sectors — {sectors.join(" / ")}
          </p>
        </div>
      </div>

      {/* RIGHT — ink black rows */}
      <div className="space-y-4 bg-ink px-5 py-10 sm:px-10 lg:py-12 lg:pl-14 lg:pr-10 xl:pl-16">
        {list.map((p, i) => (
          <Reveal key={p.title} delay={0.05}>
            <ProjectRow project={p} index={i} showStack={!preview} />
          </Reveal>
        ))}
      </div>
    </section>
  );
}
