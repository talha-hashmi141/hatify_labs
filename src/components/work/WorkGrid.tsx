"use client";

import { useMemo, useState } from "react";
import type { Project } from "@/lib/types";

/** Sector filter for the work index. Cards are rendered on the server and passed in by slug. */
export default function WorkGrid({ projects, cards }: { projects: Pick<Project, "slug" | "sector">[]; cards: Record<string, React.ReactNode> }) {
  const sectors = useMemo(() => ["All", ...Array.from(new Set(projects.map((p) => p.sector)))], [projects]);
  const [active, setActive] = useState("All");
  const shown = active === "All" ? projects : projects.filter((p) => p.sector === active);

  return (
    <div>
      <div role="group" aria-label="Filter case studies by sector" className="flex flex-wrap gap-2">
        {sectors.map((s) => {
          const count = s === "All" ? projects.length : projects.filter((p) => p.sector === s).length;
          const on = s === active;
          return (
            <button
              key={s}
              type="button"
              onClick={() => setActive(s)}
              aria-pressed={on}
              className={`inline-flex min-h-10 items-center gap-2 rounded-full border px-4 text-sm font-medium transition-colors ${
                on ? "border-navy-900 bg-navy-900 text-white" : "border-line-strong bg-white text-body hover:border-royal hover:text-royal"
              }`}
            >
              {s}
              <span className={`rounded-full px-1.5 text-xs ${on ? "bg-white/15" : "bg-tint text-muted"}`}>{count}</span>
            </button>
          );
        })}
      </div>

      <p className="sr-only" aria-live="polite">
        Showing {shown.length} case {shown.length === 1 ? "study" : "studies"}
        {active === "All" ? "" : ` in ${active}`}.
      </p>

      <ul className="mt-10 grid gap-5 md:grid-cols-2">
        {shown.map((p) => (
          <li key={p.slug}>{cards[p.slug]}</li>
        ))}
      </ul>
    </div>
  );
}
