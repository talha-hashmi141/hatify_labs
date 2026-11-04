/*
  "The stack we ship with" band.
  Two counter-scrolling rows: large outlined display type, then a quieter
  mono row. Pauses on hover; static under reduced motion (global CSS rule).
  Edit the lists below to change what scrolls.
*/

const PRIMARY = ["Next.js", "React", "TypeScript", "Node.js", "Python", "FastAPI", "PostgreSQL", "MongoDB", "Redis", "Kafka", "GraphQL", "Prisma"];

const SECONDARY = [
  "Anthropic Claude",
  "OpenAI",
  "LangChain",
  "LangGraph",
  "pgvector",
  "Pinecone",
  "Elasticsearch",
  "AWS",
  "GCP",
  "Azure",
  "Docker",
  "Kubernetes",
  "Terraform",
  "GitHub Actions",
  "LiveKit",
  "Twilio",
];

function Spark({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" className={className} aria-hidden fill="none">
      <path d="M12 2v20M2 12h20M4.9 4.9l14.2 14.2M19.1 4.9 4.9 19.1" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
    </svg>
  );
}

function Row({ items, big, reverse }: { items: string[]; big?: boolean; reverse?: boolean }) {
  return (
    <div className="group flex w-max">
      {[0, 1].map((copy) => (
        <ul
          key={copy}
          aria-hidden={copy === 1 || undefined}
          className={`flex shrink-0 items-center group-hover:[animation-play-state:paused] ${
            reverse ? "animate-marquee-reverse" : "animate-marquee"
          }`}
        >
          {items.map((t) => (
            <li key={t} className={`flex shrink-0 items-center ${big ? "gap-10 pr-10 md:gap-14 md:pr-14" : "gap-8 pr-8"}`}>
              <span
                className={
                  big
                    ? "text-stroke-cyan select-none whitespace-nowrap py-5 text-[clamp(2.75rem,7vw,5.5rem)] font-extrabold uppercase leading-none tracking-[-0.02em] transition-colors duration-300 hover:text-cyan md:py-7"
                    : "whitespace-nowrap py-4 font-mono text-[12px] uppercase tracking-[0.24em] text-white/75"
                }
              >
                {t}
              </span>
              <Spark
                className={big ? "size-7 shrink-0 animate-[spin_14s_linear_infinite] text-electric md:size-10" : "size-3 shrink-0 text-cyan/80"}
              />
            </li>
          ))}
        </ul>
      ))}
    </div>
  );
}

export default function StackBand() {
  return (
    <section aria-labelledby="stack-title" className="surface-navy-deep relative overflow-hidden border-y border-white/10">
      <div aria-hidden className="bg-dots-dark pointer-events-none absolute inset-0 opacity-40" />

      <div className="container-x relative flex items-center gap-3 py-5">
        <span className="h-px w-6 bg-gradient-to-r from-electric to-cyan" aria-hidden />
        <h2 id="stack-title" className="font-mono text-xs font-medium uppercase tracking-[0.24em] text-white/80 sm:text-sm">
          The stack we ship with
        </h2>
      </div>

      <p className="sr-only">
        Technologies we work with: {[...PRIMARY, ...SECONDARY].join(", ")}.
      </p>

      <div aria-hidden className="fade-mask-x relative overflow-hidden border-t border-white/10">
        <Row items={PRIMARY} big />
      </div>
      <div aria-hidden className="fade-mask-x relative overflow-hidden border-t border-white/10 bg-white/[0.02]">
        <Row items={SECONDARY} reverse />
      </div>
    </section>
  );
}
