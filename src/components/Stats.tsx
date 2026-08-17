"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import { animate, useInView } from "framer-motion";
import { stats } from "@/lib/data";
import Reveal from "./Reveal";

function CountUp({ value, suffix }: { value: number; suffix: string }) {
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true, margin: "-60px" });
  const decimals = Number.isInteger(value) ? 0 : 1;
  const [display, setDisplay] = useState("0");

  useEffect(() => {
    if (!inView) return;
    const controls = animate(0, value, {
      duration: 1.8,
      ease: [0.16, 1, 0.3, 1],
      onUpdate: (v) => setDisplay(v.toFixed(decimals)),
    });
    return () => controls.stop();
  }, [inView, value, decimals]);

  return (
    <span ref={ref} className="tabular-nums">
      {display}
      <span className="text-accent">{suffix}</span>
    </span>
  );
}

/** Deep-moss data strip — the third tone of the palette. */
export default function Stats() {
  return (
    <section className="relative overflow-hidden border-y border-lime-300/20 bg-[#121d09]">
      {/* Data-viz glow rising through the moss */}
      <div aria-hidden className="pointer-events-none absolute inset-0 select-none">
        <Image
          src="/images/stats-dataviz.jpg"
          alt=""
          fill
          className="object-cover opacity-[0.12] mix-blend-lighten"
          style={{ maskImage: "linear-gradient(to left, black 25%, transparent 70%)" }}
          sizes="100vw"
        />
      </div>
      <div className="container-x relative flex items-center justify-between border-b border-lime-300/10 py-4">
        <span className="font-mono text-base font-semibold tracking-[0.2em] md:text-lg text-lime-300">[✚]</span>
        <span className="font-mono text-sm font-medium uppercase tracking-[0.2em] md:text-base text-lime-200/50">
          Vitals — measured, not claimed
        </span>
      </div>
      <div className="container-x relative grid grid-cols-2 md:grid-cols-4">
        {stats.map((s, i) => (
          <div
            key={s.label}
            className={`border-lime-300/10 p-7 md:p-12 ${i % 2 === 1 ? "border-l" : ""} ${
              i >= 2 ? "border-t" : ""
            } md:border-t-0 ${i > 0 ? "md:border-l" : ""}`}
          >
            <Reveal delay={i * 0.07}>
              <p className="display text-4xl sm:text-5xl md:text-6xl">
                <CountUp value={s.value} suffix={s.suffix} />
              </p>
              <p className="mt-4 font-mono text-sm font-medium uppercase tracking-[0.2em] md:text-base text-lime-200/60">{s.label}</p>
            </Reveal>
          </div>
        ))}
      </div>
    </section>
  );
}
