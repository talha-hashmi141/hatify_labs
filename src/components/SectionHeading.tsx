import RevealText from "./RevealText";

interface SectionHeadingProps {
  index: string;
  label: string;
  title: string;
  /** Words from `title` to tint lime. */
  accent?: string;
  desc?: string;
  className?: string;
}

/** Editorial section header: hairline rule, mono index row, oversized display title. */
export default function SectionHeading({ index, label, title, accent, desc, className }: SectionHeadingProps) {
  return (
    <div className={`border-t border-white/10 pt-2 light:border-black/10 ${className ?? ""}`}>
      <div className="flex items-baseline justify-between gap-4">
        <span className="font-mono text-base font-semibold tracking-[0.2em] md:text-lg text-lime-300 light:text-lime-700">[{index}]</span>
        <span className="label-mono">{label}</span>
      </div>
      <h2 className="display mt-1.5 max-w-5xl text-[clamp(2.6rem,6vw,5.5rem)]">
        <RevealText text={title} accent={accent} />
      </h2>
      {desc ? (
        <p className="mt-1.5 max-w-xl text-sm leading-relaxed text-zinc-400 light:text-zinc-600 sm:text-base">{desc}</p>
      ) : null}
    </div>
  );
}
