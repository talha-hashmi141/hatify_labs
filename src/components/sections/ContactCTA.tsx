import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { site } from "@/lib/data";
import Reveal from "@/components/ui/Reveal";

export default function ContactCTA({
  title = (
    <>
      Let&rsquo;s build something people <span className="font-serif font-normal italic">love</span> to use.
    </>
  ),
  desc = "Tell us what you are building, who it is for and where it is stuck. We will reply with a straight answer on approach, timeline and the team you would need.",
}: {
  title?: React.ReactNode;
  desc?: string;
}) {
  return (
    <section className="section-y" aria-labelledby="cta-title">
      <div className="container-x">
        <Reveal>
          <div className="surface-royal relative overflow-hidden rounded-[2rem] px-6 py-14 shadow-[var(--shadow-glow)] sm:px-12 md:py-20">
            <div aria-hidden className="bg-dots-dark absolute inset-0 opacity-60" />
            <div aria-hidden className="absolute -right-24 -top-32 size-[420px] rounded-full bg-cyan/15 blur-[100px]" />
            <div className="relative grid gap-12 lg:grid-cols-[1.1fr_1fr] lg:items-center">
              <div>
                <p className="eyebrow !text-white before:!bg-none before:!bg-white/70">Start a project</p>
                <h2 id="cta-title" className="display mt-4 text-[clamp(2rem,4.4vw,3.4rem)] !text-white">
                  {title}
                </h2>
                <p className="mt-5 max-w-lg text-base leading-relaxed text-white/95 sm:text-lg">{desc}</p>
                <div className="mt-9 flex flex-col gap-3 sm:flex-row">
                  <Link href="/contact" className="btn btn-lg btn-light">
                    Start a conversation
                    <ArrowRight className="size-4" aria-hidden />
                  </Link>
                  <Link href="/work" className="btn btn-lg btn-ghost-dark">
                    See our work
                  </Link>
                </div>
              </div>
              <ol className="grid gap-3">
                {site.nextSteps.map((s) => (
                  <li key={s.step} className="flex gap-4 rounded-2xl border border-white/20 bg-white/10 p-5 backdrop-blur-sm">
                    <span className="font-serif text-3xl italic leading-none text-white">{s.step}</span>
                    <div>
                      <p className="font-semibold text-white">{s.title}</p>
                      <p className="mt-1 text-sm leading-relaxed text-white/90">{s.desc}</p>
                    </div>
                  </li>
                ))}
              </ol>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
