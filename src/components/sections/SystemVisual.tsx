import { GitBranch, Lock, Sparkles } from "lucide-react";

/** Signature hero visual — an illustrative platform topology (not a claim about any specific client). */
const ROWS = [
  { layer: "Experience", nodes: ["Web app", "Mobile app", "Partner API"] },
  { layer: "Edge", nodes: ["Gateway", "Auth / SSO", "Rate limits"] },
  { layer: "Services", nodes: ["AI agents", "Workflows", "Billing"] },
  { layer: "Data", nodes: ["PostgreSQL", "Vector index", "Warehouse"] },
];

export default function SystemVisual() {
  return (
    <div className="relative mx-auto w-full max-w-[540px]" aria-hidden>
      {/* Glow */}
      <div className="absolute -inset-6 rounded-[2rem] bg-gradient-to-br from-electric/25 via-cyan/10 to-transparent blur-2xl" />

      <div className="surface-aurora relative overflow-hidden rounded-[1.75rem] p-5 shadow-[var(--shadow-lift)] sm:p-7">
        <div className="bg-dots absolute inset-0 opacity-50" />

        {/* Window chrome */}
        <div className="relative flex items-center justify-between">
          <div className="flex gap-1.5">
            <span className="size-2.5 rounded-full bg-royal/20" />
            <span className="size-2.5 rounded-full bg-royal/20" />
            <span className="size-2.5 rounded-full bg-royal/20" />
          </div>
          <span className="font-mono text-[10px] uppercase tracking-[0.16em] text-muted">platform / architecture</span>
          <span className="flex items-center gap-1.5 font-mono text-[10px] uppercase tracking-[0.16em] text-royal">
            <span className="size-1.5 animate-pulse-soft rounded-full bg-cyan" />
            live
          </span>
        </div>

        {/* Layers */}
        <div className="relative mt-6 space-y-3">
          {ROWS.map((row, i) => (
            <div key={row.layer}>
              <div className="grid grid-cols-1 items-center gap-1.5 sm:grid-cols-[96px_1fr] sm:gap-3">
                <span className="font-mono text-[10px] uppercase tracking-[0.14em] text-royal">{row.layer}</span>
                <div className="grid grid-cols-3 gap-2">
                  {row.nodes.map((n, j) => (
                    <span
                      key={n}
                      className={`truncate rounded-lg px-2 py-2 text-center text-[11px] font-medium sm:text-xs ${
                        i === 2 && j === 0
                          ? "tile-aurora-hot"
                          : "tile-aurora"
                      }`}
                    >
                      {n}
                    </span>
                  ))}
                </div>
              </div>
              {i < ROWS.length - 1 ? (
                <svg className="mt-1 h-3 w-full sm:ml-[108px] sm:w-[calc(100%-108px)]" viewBox="0 0 300 12" preserveAspectRatio="none">
                  {[50, 150, 250].map((x) => (
                    <line key={x} x1={x} y1="0" x2={x} y2="12" stroke="#087BFF" strokeOpacity="0.45" strokeWidth="1.5" strokeDasharray="3 3" className="animate-flow" vectorEffect="non-scaling-stroke" />
                  ))}
                </svg>
              ) : null}
            </div>
          ))}
        </div>

        {/* Footer strip */}
        <div className="relative mt-6 flex flex-wrap items-center gap-2 border-t border-aurora-line pt-5">
          {["Observability", "CI/CD", "IaC", "Audit trails"].map((t) => (
            <span key={t} className="chip">
              {t}
            </span>
          ))}
        </div>
      </div>

      {/* Floating chips */}
      <div className="absolute -top-5 left-6 hidden animate-float items-center gap-2 rounded-xl border border-line bg-surface px-3 py-2 text-xs font-semibold text-ink shadow-[var(--shadow-lift)] sm:flex">
        <span className="flex size-6 items-center justify-center rounded-lg bg-tint text-royal">
          <Sparkles className="size-3.5" />
        </span>
        RAG pipeline
      </div>
      <div className="absolute -right-4 bottom-11 hidden animate-float items-center gap-2 rounded-xl border border-line bg-surface px-3 py-2 text-xs font-semibold text-ink shadow-[var(--shadow-lift)] [animation-delay:-3s] sm:flex">
        <span className="flex size-6 items-center justify-center rounded-lg bg-tint text-royal">
          <Lock className="size-3.5" />
        </span>
        Tenant isolation
      </div>
      <div className="absolute -bottom-5 right-[30%] hidden animate-float items-center gap-2 rounded-xl border border-line bg-surface px-3 py-2 text-xs font-semibold text-ink shadow-[var(--shadow-lift)] [animation-delay:-5s] sm:flex">
        <span className="flex size-6 items-center justify-center rounded-lg bg-tint text-royal">
          <GitBranch className="size-3.5" />
        </span>
        Eval-gated releases
      </div>
    </div>
  );
}
