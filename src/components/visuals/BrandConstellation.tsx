import { LogoMark } from "@/components/brand/Logo";
import { site } from "@/lib/data";

/** About-page header visual: the dotted network motif from the brand banner around the mark. */
const NODES: [number, number][] = [
  [40, 60], [120, 30], [210, 70], [300, 40], [350, 120], [320, 220], [360, 300],
  [260, 330], [150, 310], [60, 280], [30, 180], [110, 170], [290, 150],
];
const EDGES: [number, number][] = [
  [0, 1], [1, 2], [2, 3], [3, 4], [4, 12], [12, 2], [4, 5], [5, 6], [6, 7], [7, 8], [8, 9], [9, 10], [10, 0], [10, 11], [11, 1], [11, 8], [12, 5],
];

export default function BrandConstellation() {
  return (
    <div className="surface-sky relative mx-auto hidden aspect-[10/9] w-full max-w-[400px] overflow-hidden rounded-[2rem] shadow-[var(--shadow-soft)] lg:block" aria-hidden>
      <svg viewBox="0 0 390 350" className="absolute inset-0 h-full w-full">
        {EDGES.map(([a, b], i) => (
          <line
            key={i}
            x1={NODES[a][0]}
            y1={NODES[a][1]}
            x2={NODES[b][0]}
            y2={NODES[b][1]}
            stroke="#0866E8"
            strokeOpacity="0.22"
            strokeWidth="1.2"
            strokeDasharray="4 5"
            className="animate-flow"
          />
        ))}
        {NODES.map(([x, y], i) => (
          <g key={i}>
            <circle cx={x} cy={y} r="9" fill="#087BFF" opacity="0.12">
              <animate attributeName="r" values="5;11;5" dur={`${3 + (i % 4)}s`} repeatCount="indefinite" />
            </circle>
            <circle cx={x} cy={y} r="3.2" fill={i % 3 === 0 ? "#00C9E8" : "#0866E8"} />
          </g>
        ))}
      </svg>

      <div className="absolute inset-0 bg-[radial-gradient(closest-side,var(--veil)_55%,transparent_100%)]" />

      <div className="relative flex h-full flex-col items-center justify-center px-8 text-center">
        <span className="flex size-24 items-center justify-center rounded-3xl border border-line bg-surface shadow-[var(--shadow-glow)]">
          <LogoMark className="size-14" />
        </span>
        <p className="mt-6 font-serif text-[1.75rem] italic leading-tight text-ink">
          Built in <span className="text-royal">Lahore</span>,
          <br />
          for users everywhere.
        </p>
        <div className="mt-6 flex flex-wrap justify-center gap-2">
          <span className="chip">{site.teamSize} people</span>
          <span className="chip">Software & AI engineering</span>
        </div>
      </div>
    </div>
  );
}
