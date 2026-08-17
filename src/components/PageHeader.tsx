import Image from "next/image";
import RevealText from "./RevealText";

interface PageHeaderProps {
  kicker: string;
  title: string;
  accent?: string;
  desc?: string;
  /** Full-bleed banner image (public path), cropped to the fixed banner height. */
  image?: string;
}

/** Fixed-height banner hero: full-opacity image, dark scrim on the text side. */
export default function PageHeader({ kicker, title, accent, desc, image }: PageHeaderProps) {
  return (
    <header className="relative flex h-[40vh] min-h-[360px] flex-col overflow-hidden border-b border-white/10">
      {image ? (
        <div aria-hidden className="pointer-events-none absolute inset-0 select-none">
          <Image src={image} alt="" fill className="object-cover object-center opacity-45" sizes="100vw" priority />
          {/* Scrim — keeps the headline readable, leaves the right side vivid */}
          <div className="absolute inset-0 bg-gradient-to-r from-ink via-ink/70 to-ink/15" />
          <div className="absolute inset-x-0 bottom-0 h-20 bg-gradient-to-t from-ink to-transparent" />
        </div>
      ) : (
        <div aria-hidden className="absolute inset-0 bg-grid mask-fade-b" />
      )}

      <div className="container-x relative flex flex-1 flex-col justify-end pb-7 pt-24">
        <div className="flex items-baseline justify-between gap-4">
          <span className="font-mono text-sm font-medium uppercase tracking-[0.2em] text-zinc-400 md:text-base">
            <span className="text-lime-300">Home</span> / {kicker}
          </span>
          <span className="label-mono hidden !text-zinc-400 sm:block">Hatify Labs — {kicker}</span>
        </div>
        <h1 className="display mt-4 max-w-5xl text-[clamp(2.4rem,6vw,5.2rem)]">
          <RevealText text={title} accent={accent} />
        </h1>
        {desc ? (
          <p className="mt-4 max-w-2xl text-sm leading-relaxed text-zinc-300 sm:text-base">{desc}</p>
        ) : null}
      </div>
    </header>
  );
}
