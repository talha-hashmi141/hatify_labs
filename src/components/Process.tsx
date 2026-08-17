"use client";

import { useRef } from "react";
import Image from "next/image";
import { motion, useScroll, useSpring } from "framer-motion";
import { processSteps } from "@/lib/data";
import Reveal from "./Reveal";
import SectionHeading from "./SectionHeading";

export default function Process({ index = "04" }: { index?: string }) {
  const railRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: railRef, offset: ["start 75%", "end 55%"] });
  const scaleY = useSpring(scrollYProgress, { stiffness: 90, damping: 26 });

  return (
    <section className="section relative overflow-hidden">
      {/* Blueprint texture in the dark */}
      <div aria-hidden className="pointer-events-none absolute inset-0 select-none">
        <Image
          src="/images/process-blueprint.jpg"
          alt=""
          fill
          className="object-cover opacity-[0.09] mix-blend-lighten"
          style={{ maskImage: "linear-gradient(to right, black 20%, transparent 65%)" }}
          sizes="100vw"
        />
      </div>
      <div className="container-x relative">
        <SectionHeading
          index={index}
          label="Process — How we work"
          title="Built like a lab. Shipped like a product."
          accent="lab. product."
          desc="A disciplined path from ambiguous problem to hardened production system — demos every week, not surprises every quarter."
        />

        <div ref={railRef} className="relative mt-4 md:mt-5">
          {/* Rail that draws itself as you scroll */}
          <div aria-hidden className="absolute left-[7px] top-1 h-full w-px bg-white/10">
            <motion.div style={{ scaleY }} className="absolute inset-0 origin-top bg-lime-300" />
          </div>

          <div className="space-y-2">
            {processSteps.map((step) => (
              <Reveal key={step.step} className="relative pl-12 md:pl-20">
                <span
                  aria-hidden
                  className="absolute left-0 top-1.5 size-[15px] rounded-full border-2 border-lime-300 bg-ink"
                />
                <div className="grid gap-2 border-b border-white/10 pb-9 pt-2 md:grid-cols-[110px_260px_1fr] md:gap-8">
                  <span className="font-mono text-base font-semibold text-lime-300">ST/{step.step}</span>
                  <h3 className="display text-2xl md:text-3xl">{step.title}</h3>
                  <p className="max-w-2xl text-sm leading-relaxed text-zinc-400 sm:text-base">{step.desc}</p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
