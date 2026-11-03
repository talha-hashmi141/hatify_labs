import { processSteps } from "@/lib/data";
import Reveal from "@/components/ui/Reveal";
import SectionHeader from "@/components/ui/SectionHeader";

export default function ProcessTimeline() {
  return (
    <section className="section-y" aria-labelledby="process-title">
      <div className="container-x">
        <SectionHeader
          eyebrow="Engineering process"
          title={
            <span id="process-title">
              How a project <span className="accent">moves</span> with us.
            </span>
          }
          desc="Six stages, and each one ends with something you can review. You always know where the work stands and what comes next."
        />

        <ol className="relative mt-14 grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          {processSteps.map((s, i) => (
            <Reveal as="li" key={s.step} delay={Math.min(i * 0.05, 0.25)} className="card card-hover group relative flex h-full flex-col overflow-hidden p-6 sm:p-7">
                <div
                  aria-hidden
                  className="absolute inset-x-0 top-0 h-1 origin-left scale-x-[0.18] bg-gradient-to-r from-royal via-electric to-cyan transition-transform duration-500 group-hover:scale-x-100"
                />
                <div className="flex items-baseline justify-between">
                  <span className="font-serif text-5xl italic leading-none text-royal/90 transition-transform duration-500 group-hover:-translate-y-1 group-hover:text-electric">{s.step}</span>
                  <span className="mono-label">Stage {i + 1} of {processSteps.length}</span>
                </div>
                <h3 className="mt-6 text-xl font-bold">{s.title}</h3>
                <p className="mt-2.5 text-sm leading-relaxed text-body">{s.desc}</p>
                <ul className="mt-auto flex flex-wrap gap-1.5 pt-6" aria-label={`${s.title} deliverables`}>
                  {s.deliverables.map((d) => (
                    <li key={d} className="chip !bg-tint/60">
                      {d}
                    </li>
                  ))}
                </ul>
            </Reveal>
          ))}
        </ol>
      </div>
    </section>
  );
}
