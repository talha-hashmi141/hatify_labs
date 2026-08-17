interface MarqueeBandProps {
  items: string[];
  /** Hollow outlined type instead of solid. */
  outline?: boolean;
  reverse?: boolean;
  size?: "lg" | "sm";
  /** "onLime" = dark ink for solid lime-300 surfaces; "onMoss" = lime ink for deep-moss surfaces. */
  tone?: "default" | "onLime" | "onMoss";
  className?: string;
}

/** Full-bleed scrolling text band — editorial divider between sections. */
export default function MarqueeBand({ items, outline, reverse, size = "lg", tone = "default", className }: MarqueeBandProps) {
  const doubled = [...items, ...items];
  const onLime = tone === "onLime";
  const onMoss = tone === "onMoss";

  const outlineCls = onLime ? "text-outline-dark" : onMoss ? "text-outline-lime" : "text-outline";
  const solidLgCls = onLime
    ? "text-[#0c1202]"
    : onMoss
      ? "text-lime-300 [text-shadow:0_0_28px_rgba(190,242,100,0.45)]"
      : "text-white light:text-zinc-950";
  const smCls = onLime ? "text-[#0c1202]/70" : onMoss ? "text-lime-200/60" : "text-zinc-500";

  const textCls =
    size === "lg"
      ? `font-display text-5xl font-extrabold uppercase leading-none tracking-tight md:text-7xl ${
          outline ? outlineCls : solidLgCls
        }`
      : `font-mono text-xs uppercase tracking-[0.25em] ${smCls}`;

  const sepCls = onLime ? "text-[#0c1202]" : onMoss ? "text-lime-300/80" : "text-accent";

  return (
    <div aria-hidden className={`marquee-mask overflow-hidden ${className ?? ""}`}>
      <div
        className={`flex w-max items-center ${reverse ? "animate-marquee-slow" : "animate-marquee"} hover:[animation-play-state:paused]`}
      >
        {doubled.map((item, i) => (
          <span key={i} className={`flex shrink-0 items-center whitespace-nowrap ${size === "lg" ? "px-8 py-6" : "px-6 py-4"}`}>
            <span className={textCls}>{item}</span>
            <span className={`${size === "lg" ? "ml-16 text-3xl md:text-5xl" : "ml-12 text-xs"} font-display ${sepCls}`}>
              ✳
            </span>
          </span>
        ))}
      </div>
    </div>
  );
}
