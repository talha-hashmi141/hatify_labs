import { BadgeCheck } from "lucide-react";
import { isVerifiedMetric, showPlaceholders } from "@/lib/data";
import type { Metric } from "@/lib/types";
import { PlaceholderBadge } from "./Placeholder";

/*
  Verified metrics
  ---------------------------------------------------------------------------
  A metric shows its value only when `verified: true` and a value is set.
  Otherwise it renders a placeholder (while site.content.showPlaceholders is
  on) or nothing at all — so unverified numbers never reach the live site.
*/

type Tone = "light" | "dark";

export function MetricCard({ metric, tone = "light" }: { metric: Metric; tone?: Tone }) {
  const verified = isVerifiedMetric(metric);
  if (!verified && !showPlaceholders) return null;
  const dark = tone === "dark";

  const shell = verified
    ? dark
      ? "rounded-2xl border border-white/10 bg-white/[0.04]"
      : "card"
    : dark
      ? "placeholder-slot-dark"
      : "placeholder-slot";

  return (
    <div className={`flex h-full flex-col justify-between gap-5 p-5 sm:gap-6 sm:p-6 ${shell}`} data-placeholder={verified ? undefined : true}>
      {verified ? (
        <p className={`text-[clamp(1.9rem,3.2vw,2.5rem)] font-bold leading-none tracking-tight whitespace-nowrap ${dark ? "text-white" : "text-ink"}`}>
          {metric.value}
        </p>
      ) : (
        <div className="flex flex-col items-start gap-3">
          <span
            aria-hidden
            className={`text-[clamp(1.9rem,3.2vw,2.5rem)] font-bold leading-none tracking-tight ${dark ? "text-white/25" : "text-ink/20"}`}
          >
            —
          </span>
          <PlaceholderBadge tone={tone}>Pending verification</PlaceholderBadge>
        </div>
      )}
      <div>
        <p className={`text-sm font-semibold ${dark ? "text-white/85" : "text-ink"}`}>{metric.label}</p>
        {verified && metric.source ? (
          <p className={`mt-1.5 flex items-start gap-1 text-xs leading-snug ${dark ? "text-white/50" : "text-muted"}`}>
            <BadgeCheck className={`mt-px size-3.5 shrink-0 ${dark ? "text-cyan" : "text-royal"}`} aria-hidden />
            Source: {metric.source}
          </p>
        ) : null}
      </div>
    </div>
  );
}

export function MetricGrid({
  metrics,
  tone = "light",
  className,
  maxCols = 4,
}: {
  metrics: Metric[];
  tone?: Tone;
  className?: string;
  /** Upper bound on columns at the lg breakpoint. */
  maxCols?: 2 | 3 | 4;
}) {
  const list = showPlaceholders ? metrics : metrics.filter(isVerifiedMetric);
  if (list.length === 0) return null;
  const n = Math.min(list.length, maxCols);
  const cols = n >= 4 ? "lg:grid-cols-4" : n === 3 ? "lg:grid-cols-3" : "";
  return (
    <div className={`grid grid-cols-2 gap-3 sm:gap-4 max-lg:[&>*:last-child:nth-child(odd)]:col-span-2 ${cols} ${className ?? ""}`}>
      {list.map((m) => (
        <MetricCard key={m.label} metric={m} tone={tone} />
      ))}
    </div>
  );
}
