import { useId } from "react";

/**
 * Hatify Labs mark — vector redraw of the brand "H": two gradient pillars
 * joined by an interlocking hexagonal link. Kept in sync with src/app/icon.svg.
 * If an official SVG export becomes available, replace the paths in both.
 */
export function LogoMark({ className, title }: { className?: string; title?: string }) {
  const id = useId().replace(/[^a-zA-Z0-9_-]/g, "");
  const g = (n: string) => `url(#${id}${n})`;
  return (
    <svg viewBox="0 0 64 64" className={className} role={title ? "img" : undefined} aria-hidden={title ? undefined : true}>
      {title ? <title>{title}</title> : null}
      <defs>
        <linearGradient id={`${id}l`} x1="0" y1="0" x2="0.2" y2="1">
          <stop offset="0" stopColor="#0A72F0" />
          <stop offset="1" style={{ stopColor: "var(--logo-deep, #071B49)" }} />
        </linearGradient>
        <linearGradient id={`${id}r`} x1="0.8" y1="0" x2="0" y2="1">
          <stop offset="0" stopColor="#00C9E8" />
          <stop offset="0.5" stopColor="#087BFF" />
          <stop offset="1" stopColor="#0866E8" />
        </linearGradient>
        <linearGradient id={`${id}u`} x1="0" y1="0" x2="1" y2="0">
          <stop offset="0" stopColor="#0866E8" />
          <stop offset="1" stopColor="#00B4F0" />
        </linearGradient>
        <linearGradient id={`${id}d`} x1="0" y1="0" x2="1" y2="0">
          <stop offset="0" stopColor="#0A2E86" />
          <stop offset="1" stopColor="#0A72F0" />
        </linearGradient>
      </defs>
      <path d="M7.5 15.6 18.6 11.4v44.4L7.5 60Z" fill={g("l")} stroke={g("l")} strokeWidth="2" strokeLinejoin="round" />
      <path d="M45.4 12 56.5 7.8v44.4L45.4 56.4Z" fill={g("r")} stroke={g("r")} strokeWidth="2" strokeLinejoin="round" />
      <path d="M19.4 33.4 31.9 26.3l9.8 5.6" fill="none" stroke={g("u")} strokeWidth="5.6" strokeLinejoin="round" />
      <path d="M22.3 40.4l9.6 5.6 12.6-7.2" fill="none" stroke={g("d")} strokeWidth="5.6" strokeLinejoin="round" />
    </svg>
  );
}

export function Wordmark({ className, tone = "dark" }: { className?: string; tone?: "dark" | "light" }) {
  return (
    <span
      className={`text-[15px] font-extrabold tracking-[0.16em] whitespace-nowrap ${
        tone === "dark" ? "text-ink" : "text-white"
      } ${className ?? ""}`}
    >
      HATIFY <span className={tone === "dark" ? "text-royal" : "text-cyan"}>LABS</span>
    </span>
  );
}

export default function Logo({ tone = "dark", className }: { tone?: "dark" | "light"; className?: string }) {
  return (
    <span className={`inline-flex items-center gap-2.5 ${className ?? ""}`}>
      <LogoMark className="size-9 shrink-0" />
      <Wordmark tone={tone} />
    </span>
  );
}
