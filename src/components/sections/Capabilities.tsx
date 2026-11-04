import { CheckCircle2 } from "lucide-react";
import { capabilities } from "@/lib/data";
import Icon from "@/components/ui/Icon";
import Reveal from "@/components/ui/Reveal";
import SectionHeader from "@/components/ui/SectionHeader";

const STANDARDS = [
  "Code review on every change",
  "Automated tests and CI/CD",
  "Security and access control by default",
  "Infrastructure as code",
  "Observability before launch",
  "Documentation and clean handover",
];

export default function Capabilities() {
  return (
    <section className="surface-navy-deep section-y relative overflow-hidden" aria-labelledby="capabilities-title">
      <div aria-hidden className="bg-dots-dark fade-mask-b pointer-events-none absolute inset-0 opacity-60" />
      <div className="container-x relative">
        <SectionHeader
          tone="dark"
          eyebrow="Technical capabilities"
          title={
            <span id="capabilities-title">
              Tools we know <span className="accent-on-dark">inside out</span>.
            </span>
          }
          desc="We pick technology to suit the problem in front of us. These are the tools our engineers ship to production week after week."
        />

        <div className="mt-14 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {capabilities.map((c, i) => (
            <Reveal key={c.title} delay={Math.min(i * 0.04, 0.2)}>
              <div data-spotlight="dark" className="group h-full rounded-[var(--radius-card)] border border-white/10 bg-white/[0.035] p-6 transition-colors duration-300 hover:border-white/20 hover:bg-white/[0.055] sm:p-7">
                <div className="flex items-center gap-3">
                  <span className="flex size-10 items-center justify-center rounded-xl bg-brand-fill text-white transition-transform duration-300 group-hover:-rotate-6 group-hover:scale-110">
                    <Icon name={c.icon} className="size-5" />
                  </span>
                  <h3 className="text-lg font-bold !text-white">{c.title}</h3>
                </div>
                <p className="mt-3 text-sm leading-relaxed text-white/60">{c.desc}</p>
                <ul className="mt-5 flex flex-wrap gap-1.5">
                  {c.items.map((t) => (
                    <li key={t} className="chip-dark">
                      {t}
                    </li>
                  ))}
                </ul>
              </div>
            </Reveal>
          ))}
        </div>

        <Reveal className="mt-10">
          <div className="rounded-[var(--radius-card)] border border-white/10 bg-gradient-to-r from-royal/20 via-electric/10 to-cyan/10 p-6 sm:p-8">
            <h3 className="text-base font-semibold !text-white">What every engagement includes</h3>
            <ul className="mt-5 grid gap-x-8 gap-y-3 sm:grid-cols-2 lg:grid-cols-3">
              {STANDARDS.map((s) => (
                <li key={s} className="flex items-center gap-2.5 text-sm text-white/80">
                  <CheckCircle2 className="size-4 shrink-0 text-cyan" aria-hidden />
                  {s}
                </li>
              ))}
            </ul>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
