import { projects } from "@/lib/data";

/** Fanned deck of case-study cards for the Work page header. Spreads out on hover. */
const POSE = [
  "-rotate-[9deg] -translate-x-10 translate-y-6 group-hover:-rotate-[14deg] group-hover:-translate-x-20 group-hover:translate-y-10",
  "-rotate-[3deg] -translate-x-3 translate-y-1 group-hover:-rotate-[5deg] group-hover:-translate-x-7 group-hover:translate-y-2",
  "rotate-[4deg] translate-x-5 -translate-y-3 group-hover:rotate-[6deg] group-hover:translate-x-10 group-hover:-translate-y-5",
  "rotate-[10deg] translate-x-12 -translate-y-8 group-hover:rotate-[15deg] group-hover:translate-x-24 group-hover:-translate-y-12",
];

export default function WorkStack() {
  const list = projects.slice(0, 4);
  return (
    <div className="group relative mx-auto hidden h-[340px] w-full max-w-[400px] lg:block" aria-hidden>
      <div className="absolute inset-8 rounded-full bg-gradient-to-br from-electric/25 to-cyan/15 blur-3xl" />
      {list.map((p, i) => (
        <div
          key={p.slug}
          className={`surface-aurora absolute left-1/2 top-1/2 -ml-[130px] -mt-[88px] flex h-[176px] w-[260px] flex-col justify-between overflow-hidden rounded-2xl p-5 shadow-[var(--shadow-lift)] transition-transform duration-500 ease-[var(--ease-out-soft)] hover:!z-10 hover:!-translate-y-6 ${POSE[i]}`}
          style={{ zIndex: i }}
        >
          <div className="bg-dots absolute inset-0 opacity-50" />
          <div className="relative flex items-center justify-between">
            <span className="rounded-full bg-gradient-to-r from-royal to-electric px-2.5 py-1 text-[10px] font-semibold uppercase tracking-wider text-white">{p.sector}</span>
            <span className="font-mono text-[10px] text-royal/70">0{i + 1}</span>
          </div>
          <div className="relative">
            <p className="line-clamp-2 text-[15px] font-bold leading-snug text-ink">{p.title}</p>
            <div className="mt-3 flex gap-1.5">
              {p.architecture.layers.slice(0, 4).map((l, j) => (
                <span key={l.name} className="h-1.5 flex-1 rounded-full bg-royal/10">
                  <span className="block h-full rounded-full bg-gradient-to-r from-electric to-cyan" style={{ width: `${45 + ((i + j) % 3) * 20}%` }} />
                </span>
              ))}
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}
