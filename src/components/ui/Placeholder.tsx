import { CircleDashed } from "lucide-react";
import type { ReactNode } from "react";

/*
  Placeholder primitives
  ---------------------------------------------------------------------------
  Anything Hatify Labs still has to supply (client names, logos, testimonials,
  metrics, screenshots, links) renders through these components, so every
  placeholder looks the same and is easy to find (search "data-placeholder").
  Fill in the data in src/data/*.json and they disappear automatically.
*/

type Tone = "light" | "dark";

export function PlaceholderBadge({ children = "Placeholder", tone = "light" }: { children?: ReactNode; tone?: Tone }) {
  return (
    <span
      className={`inline-flex items-center gap-1.5 rounded-full px-2.5 py-1 font-mono text-[10px] font-medium whitespace-nowrap uppercase tracking-[0.12em] ${
        tone === "dark" ? "bg-white/10 text-white/70" : "bg-tint-strong text-royal-600"
      }`}
    >
      <CircleDashed className="size-3" aria-hidden />
      {children}
    </span>
  );
}

export function PlaceholderSlot({
  label,
  hint,
  tone = "light",
  className,
  children,
}: {
  label: string;
  hint?: string;
  tone?: Tone;
  className?: string;
  children?: ReactNode;
}) {
  return (
    <div
      data-placeholder
      className={`${tone === "dark" ? "placeholder-slot-dark" : "placeholder-slot"} flex flex-col items-center justify-center gap-2 p-5 text-center ${
        className ?? ""
      }`}
    >
      {children}
      <PlaceholderBadge tone={tone}>{label}</PlaceholderBadge>
      {hint ? <p className={`max-w-xs text-xs leading-snug ${tone === "dark" ? "text-white/50" : "text-muted"}`}>{hint}</p> : null}
    </div>
  );
}

/** Inline text placeholder, e.g. a client name inside a sentence or a fact list. */
export function PendingText({ children, tone = "light" }: { children: ReactNode; tone?: Tone }) {
  return (
    <span
      data-placeholder
      className={`inline-flex items-center gap-1.5 rounded-md border border-dashed px-2 py-0.5 text-[0.85em] font-medium ${
        tone === "dark" ? "border-white/25 text-white/60" : "border-royal/35 bg-tint/70 text-muted"
      }`}
    >
      <CircleDashed className="size-3 shrink-0" aria-hidden />
      {children}
    </span>
  );
}
