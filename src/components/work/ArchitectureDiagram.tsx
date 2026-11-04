import type { Architecture } from "@/lib/types";

/** Layered system diagram rendered from case-study data: one row per layer, request flow top → bottom. */
export default function ArchitectureDiagram({ architecture }: { architecture: Architecture }) {
  const { layers } = architecture;
  return (
    <figure className="surface-aurora relative overflow-hidden rounded-3xl p-5 shadow-[var(--shadow-soft)] sm:p-7 lg:p-8">
      <div aria-hidden className="bg-dots absolute inset-0 opacity-50" />
      <div aria-hidden className="absolute -right-24 -top-24 size-80 rounded-full bg-cyan/20 blur-3xl" />

      <div className="relative">
        <div className="mb-8 flex flex-wrap items-center justify-between gap-3">
          <p className="font-mono text-[11px] uppercase tracking-[0.16em] text-royal">System architecture</p>
          <p className="font-mono text-[11px] uppercase tracking-[0.16em] text-muted">{layers.length} layers · request flow ↓</p>
        </div>

        <ol>
          {layers.map((layer, i) => (
            <li key={layer.name}>
              <div className="grid gap-3 rounded-2xl border border-aurora-line bg-surface/60 p-4 sm:grid-cols-[150px_1fr] sm:items-center sm:gap-5 sm:p-5">
                <p className="flex items-center gap-2.5 font-mono text-[11px] uppercase tracking-[0.14em] text-ink">
                  <span className="flex size-6 shrink-0 items-center justify-center rounded-full bg-tint-strong text-[11px] text-royal">{i + 1}</span>
                  {layer.name}
                </p>
                <ul className="flex flex-wrap gap-2">
                  {layer.nodes.map((n) => (
                    <li
                      key={n}
                      className={`rounded-lg px-3 py-2 text-[13px] font-medium leading-none ${
                        i === Math.floor(layers.length / 2)
                          ? "tile-aurora-hot"
                          : "tile-aurora"
                      }`}
                    >
                      {n}
                    </li>
                  ))}
                </ul>
              </div>
              {i < layers.length - 1 ? (
                <div aria-hidden className="flex h-7 items-center pl-[1.6rem] sm:pl-[1.85rem]">
                  <svg className="h-full w-3" viewBox="0 0 12 28" fill="none">
                    <line x1="6" y1="0" x2="6" y2="22" stroke="#087BFF" strokeOpacity="0.6" strokeWidth="1.5" strokeDasharray="3 3" className="animate-flow" />
                    <path d="M2.5 20 6 25.5 9.5 20" stroke="#087BFF" strokeWidth="1.5" />
                  </svg>
                </div>
              ) : null}
            </li>
          ))}
        </ol>

        <figcaption className="mt-8 max-w-3xl border-t border-aurora-line pt-6 text-[15px] leading-relaxed text-body">
          {architecture.summary}
        </figcaption>
      </div>
    </figure>
  );
}
