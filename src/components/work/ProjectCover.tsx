import Image from "next/image";
import type { Project } from "@/lib/types";

/**
 * Project cover. Uses `media.cover` when a screenshot has been supplied;
 * otherwise renders a branded architecture glyph generated from the project's
 * own architecture layers.
 */
export default function ProjectCover({
  project,
  size = "md",
  className,
  priority,
}: {
  project: Project;
  size?: "md" | "lg";
  className?: string;
  priority?: boolean;
}) {
  if (project.media.cover) {
    return (
      <div className={`relative overflow-hidden rounded-2xl bg-tint ${className ?? ""}`}>
        <Image
          src={project.media.cover}
          alt={`${project.title} — product screenshot`}
          fill
          sizes={size === "lg" ? "(min-width: 1024px) 60vw, 100vw" : "(min-width: 1024px) 40vw, 100vw"}
          className="object-cover"
          priority={priority}
        />
      </div>
    );
  }

  const layers = project.architecture.layers.slice(0, 3);

  return (
    <div
      className={`surface-aurora relative isolate overflow-hidden rounded-2xl ${className ?? ""}`}
      role="img"
      data-cover
      aria-label={`${project.title} — architecture illustration`}
    >
      <div aria-hidden className="bg-dots absolute inset-0 opacity-60" />
      <div aria-hidden className="absolute -right-16 -top-20 size-64 rounded-full bg-cyan/20 blur-3xl" />

      <div aria-hidden className="relative flex h-full items-center justify-center px-5 py-8 sm:px-8">
        <div className="flex w-full max-w-xl items-center">
          {layers.map((layer, i) => (
            <div key={layer.name} className="flex min-w-0 flex-1 items-center">
              <div className="min-w-0 flex-1">
                <p className="mb-2 truncate font-mono text-[9px] uppercase tracking-[0.14em] text-royal">{layer.name}</p>
                <div className="space-y-1.5">
                  {layer.nodes.slice(0, 3).map((n) => (
                    <div
                      key={n}
                      className={`truncate rounded-md px-2 py-1.5 text-[10px] font-medium sm:text-[11px] ${i === 1 && n === layer.nodes[0] ? "tile-aurora-hot" : "tile-aurora"}`}
                    >
                      {n}
                    </div>
                  ))}
                </div>
              </div>
              {i < layers.length - 1 ? (
                <svg className="mx-1.5 h-2 w-5 shrink-0 sm:mx-2.5 sm:w-8" viewBox="0 0 32 8" fill="none">
                  <line x1="0" y1="4" x2="26" y2="4" stroke="#087BFF" strokeOpacity="0.55" strokeWidth="1.5" strokeDasharray="3 3" className="animate-flow" />
                  <path d="M26 1l4 3-4 3" stroke="#087BFF" strokeOpacity="0.8" strokeWidth="1.5" fill="none" />
                </svg>
              ) : null}
            </div>
          ))}
        </div>
      </div>

    </div>
  );
}
