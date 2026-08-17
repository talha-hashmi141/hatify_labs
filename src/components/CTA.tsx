import Image from "next/image";
import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { site } from "@/lib/data";
import MagneticButton from "./MagneticButton";
import MarqueeBand from "./MarqueeBand";
import RevealText from "./RevealText";
import Reveal from "./Reveal";

export default function CTA() {
  return (
    <section data-theme="light" className="relative overflow-hidden border-t border-white/10 light:border-black/10">
      {/* Collaboration texture on the paper */}
      <div aria-hidden className="pointer-events-none absolute inset-0 select-none">
        <Image
          src="/images/cta-collaboration.jpg"
          alt=""
          fill
          className="object-cover opacity-[0.07] mix-blend-multiply"
          style={{ maskImage: "linear-gradient(to left, black 15%, transparent 60%)" }}
          sizes="100vw"
        />
      </div>

      <div className="relative border-b border-black/10 bg-[#0f0f0d]">
        <MarqueeBand
          items={["Let’s build together", "Have an impossible deadline?", "Ship something serious"]}
          tone="onMoss"
        />
      </div>

      <div className="container-x relative pt-4 pb-14 md:pt-6 md:pb-20">
        <div className="flex items-baseline justify-between gap-4">
          <span className="font-mono text-base font-semibold tracking-[0.2em] md:text-lg text-lime-700">[✳]</span>
          <span className="label-mono">Contact — First reply within 24h</span>
        </div>

        <h2 className="display mt-2 text-[clamp(2.6rem,6vw,6rem)]">
          <RevealText text="Have a complex problem?" />
          <br />
          <RevealText text="Good. We love those." accent="Good." delay={0.15} />
        </h2>

        <div className="mt-4 grid gap-8 md:mt-5 lg:grid-cols-12 lg:gap-12">
          {/* Pitch + actions */}
          <div className="lg:col-span-5">
            <p className="max-w-md text-base leading-relaxed text-[#39412c]">
              Tell us what you are building — or what is breaking. We will come back with an honest read on
              scope, timeline and the sharpest way to ship it.
            </p>
            <div className="mt-6 flex flex-wrap items-center gap-5">
              <MagneticButton>
                <Link href="/contact" className="btn-primary !px-9 !py-5">
                  Start a project
                  <ArrowUpRight className="size-4" />
                </Link>
              </MagneticButton>
            </div>
            <p className="mt-5 flex items-center gap-2.5 font-mono text-[11px] uppercase tracking-[0.2em] text-[#10160a]/60">
              <span className="size-1.5 rounded-full bg-lime-600 animate-pulse-dot" />
              {site.availability}
            </p>
          </div>

          {/* What happens next */}
          <div className="lg:col-span-7">
            <span className="label-mono">/ What happens next</span>
            <div className="mt-4 border-t border-black/10">
              {site.nextSteps.map((s, i) => (
                <Reveal key={s.step} delay={i * 0.06}>
                  <div className="grid grid-cols-[auto_1fr] items-baseline gap-5 border-b border-black/10 py-5 md:grid-cols-[70px_220px_1fr] md:gap-6">
                    <span className="font-mono text-base font-semibold text-lime-700">{s.step}</span>
                    <h3 className="display text-xl md:text-2xl">{s.title}</h3>
                    <p className="col-span-2 text-sm leading-relaxed text-[#39412c] md:col-span-1">{s.desc}</p>
                  </div>
                </Reveal>
              ))}
            </div>
          </div>
        </div>

        {/* Direct lines strip */}
        <div className="mt-5 grid gap-x-8 gap-y-6 border-t border-black/10 pt-4 sm:grid-cols-2 lg:grid-cols-4">
          <div>
            <p className="label-mono">Email</p>
            <a href={`mailto:${site.email}`} className="mt-2 block font-mono text-sm text-[#10160a] transition-colors hover:text-lime-700">
              {site.email}
            </a>
          </div>
          <div>
            <p className="label-mono">Phone</p>
            <a
              href={`tel:${site.phone.replace(/[^+\d]/g, "")}`}
              className="mt-2 block font-mono text-sm text-[#10160a] transition-colors hover:text-lime-700"
            >
              {site.phone}
            </a>
          </div>
          <div>
            <p className="label-mono">Office</p>
            <p className="mt-2 font-mono text-sm text-[#39412c]">{site.address}</p>
          </div>
          <div>
            <p className="label-mono">Elsewhere</p>
            <div className="mt-2 flex flex-wrap gap-x-4 gap-y-1">
              {site.socials.map((s) => (
                <a
                  key={s.label}
                  href={s.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="font-mono text-sm text-[#10160a] transition-colors hover:text-lime-700"
                >
                  {s.label} ↗
                </a>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
