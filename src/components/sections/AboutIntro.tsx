import Link from "next/link";
import { ArrowRight, Compass, HeartHandshake, Layers } from "lucide-react";
import Reveal from "@/components/ui/Reveal";

const PILLARS = [
  {
    icon: HeartHandshake,
    title: "Integrity",
    desc: "We quote what the work will really take, put the trade-offs in writing and treat security as part of the job.",
  },
  {
    icon: Compass,
    title: "Purpose",
    desc: "Every feature has to earn its place. We begin with the outcome your users need and work back from there.",
  },
  {
    icon: Layers,
    title: "End-to-end ownership",
    desc: "Design, code, data and infrastructure stay with the same team, so nothing slips through the gaps between them.",
  },
];

export default function AboutIntro() {
  return (
    <section className="section-y" aria-labelledby="about-title">
      <div className="container-x">
        <div className="grid gap-12 lg:grid-cols-12 lg:items-center lg:gap-16">
          <div className="lg:col-span-5">
            <Reveal>
              <p className="eyebrow">About Hatify Labs</p>
              <h2 id="about-title" className="display mt-4 text-[clamp(2rem,4.2vw,3.25rem)]">
                The whole product, built by <span className="accent">one</span> team.
              </h2>
            </Reveal>
            <Reveal delay={0.05}>
              <p className="lead mt-6">
                Product designers, software engineers, AI specialists, data engineers and cloud architects work side by
                side at Hatify Labs. Decisions that usually bounce between vendors get settled in one conversation, which
                is why our larger builds hold together.
              </p>
              <p className="mt-4 text-[15px] leading-relaxed text-body">
                We do our best work where the margin for error is small: public-sector systems, regulated health data,
                platforms serving many tenants, and AI that people rely on for real answers.
              </p>
              <Link href="/about" className="btn btn-secondary mt-8">
                More about us
                <ArrowRight className="size-4" aria-hidden />
              </Link>
            </Reveal>
          </div>

          <div className="lg:col-span-7">
            <ul className="grid gap-4">
              {PILLARS.map((p, i) => (
                <Reveal as="li" key={p.title} delay={0.05 * i} className="card card-hover group flex items-start gap-5 p-6 sm:items-center sm:p-7">
                  <span className="flex size-12 shrink-0 items-center justify-center rounded-xl bg-brand-fill text-white shadow-[var(--shadow-glow)] transition-transform duration-300 group-hover:-rotate-6 group-hover:scale-110">
                    <p.icon className="size-5" strokeWidth={1.75} aria-hidden />
                  </span>
                  <div className="min-w-0">
                    <h3 className="text-lg font-bold">{p.title}</h3>
                    <p className="mt-1.5 text-sm leading-relaxed text-body sm:text-[15px]">{p.desc}</p>
                  </div>
                </Reveal>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </section>
  );
}
