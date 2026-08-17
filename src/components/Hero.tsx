"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { AnimatePresence, motion, useScroll, useTransform } from "framer-motion";
import { ArrowDown, ArrowUpRight } from "lucide-react";
import { site } from "@/lib/data";
import MagneticButton from "./MagneticButton";

const ROTATING = ["Intelligent", "Autonomous", "Regulated", "Resilient", "Relentless"];

const EASE = [0.22, 1, 0.36, 1] as const;

/* One size for all three headline lines — bound by width AND height so the
   whole hero always fits a single screen. */
const HEADLINE_SIZE = "text-[clamp(2.5rem,min(9vw,13.5vh),9.5rem)]";

function Line({ children, delay }: { children: React.ReactNode; delay: number }) {
  return (
    <span className="block overflow-hidden pb-[0.06em] -mb-[0.06em]">
      <motion.span
        initial={{ y: "112%" }}
        animate={{ y: 0 }}
        transition={{ duration: 0.95, delay, ease: EASE }}
        className="block"
      >
        {children}
      </motion.span>
    </span>
  );
}

export default function Hero() {
  const ref = useRef<HTMLElement>(null);
  const [index, setIndex] = useState(0);

  const { scrollYProgress } = useScroll({ target: ref, offset: ["start start", "end start"] });
  const imageY = useTransform(scrollYProgress, [0, 1], [0, 80]);

  useEffect(() => {
    const id = setInterval(() => setIndex((i) => (i + 1) % ROTATING.length), 2300);
    return () => clearInterval(id);
  }, []);

  return (
    <section
      ref={ref}
      className="relative flex h-svh min-h-[640px] flex-col overflow-hidden"
      aria-label="We engineer intelligent systems that ship"
    >
      {/* ---------- TOP HALF — ink (exactly 50%) ---------- */}
      <div className="relative flex flex-1 flex-col justify-between overflow-hidden pt-20 md:pt-24">
        <div aria-hidden className="absolute inset-0 bg-grid mask-fade-b" />
        <div
          aria-hidden
          className="absolute -top-40 right-[-10%] h-[480px] w-[480px] rounded-full bg-lime-300/[0.05] blur-[140px]"
        />

        {/* Hero atmosphere image */}
        <motion.div
          aria-hidden
          style={{ y: imageY }}
          className="pointer-events-none absolute right-0 top-0 hidden h-full w-[65%] select-none md:block"
        >
          <Image
            src="/images/hero-bg.jpg"
            alt=""
            fill
            className="object-cover object-center opacity-[0.3] mix-blend-lighten"
            style={{
              maskImage:
                "linear-gradient(to left, black 10%, transparent 70%), linear-gradient(to bottom, black 30%, transparent 90%)",
              WebkitMaskImage:
                "linear-gradient(to left, black 10%, transparent 70%), linear-gradient(to bottom, black 30%, transparent 90%)",
              maskComposite: "intersect",
              WebkitMaskComposite: "source-in",
            }}
            sizes="65vw"
            priority
          />
        </motion.div>

        {/* Meta row */}
        <div className="container-x relative flex flex-wrap items-center justify-end gap-4 pt-1">
          <motion.span
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.2, duration: 0.6 }}
            className="label-mono"
          >
            {/* EST. {site.founded} — Software · AI · Cloud · Security */}
          </motion.span>
        </div>

        {/* Headline lines 1–2 — the changing word ends right on the seam */}
        <div className="container-x relative">
          <h1 aria-hidden className={`display ${HEADLINE_SIZE}`}>
            <Line delay={0.1}>We engineer</Line>
            <Line delay={0.22}>
              <span className="relative inline-block h-[1em] overflow-hidden align-top text-accent">
                <AnimatePresence mode="wait" initial={false}>
                  <motion.span
                    key={ROTATING[index]}
                    initial={{ y: "105%" }}
                    animate={{ y: 0 }}
                    exit={{ y: "-105%" }}
                    transition={{ duration: 0.45, ease: EASE }}
                    className="block"
                  >
                    {ROTATING[index]}
                  </motion.span>
                </AnimatePresence>
              </span>
            </Line>
          </h1>
        </div>
      </div>

      {/* ---------- BOTTOM HALF — paper (exactly 50%) ---------- */}
      <div className="relative flex flex-1 flex-col bg-[#ecf3da]">
        <div aria-hidden className="absolute inset-0 bg-grid-ink" />

        {/* Headline line 3 — dark skeleton type on paper */}
        <div className="container-x relative">
          <p aria-hidden className={`display ${HEADLINE_SIZE}`}>
            <Line delay={0.34}>
              <span className="text-outline-dark">systems that ship.</span>
            </Line>
          </p>
        </div>

        {/* Sub row — always inside the first screen */}
        <div className="container-x relative flex flex-1 items-center py-4">
          <div className="grid w-full gap-6 md:grid-cols-12 md:items-center">
            <motion.p
              initial={{ opacity: 0, y: 18 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.55, duration: 0.7, ease: EASE }}
              className="max-w-md text-sm leading-relaxed text-[#39412c] sm:text-base md:col-span-6 lg:col-span-5"
            >
              {site.name} is a software house obsessed with the hard problems — production AI, multi-tenant
              platforms, regulated data and infrastructure that holds under pressure.
            </motion.p>
            <motion.div
              initial={{ opacity: 0, y: 18 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.65, duration: 0.7, ease: EASE }}
              className="flex flex-wrap gap-4 md:col-span-6 md:justify-end lg:col-span-7"
            >
              <MagneticButton>
                <Link
                  href="/contact"
                  className="inline-flex items-center justify-center gap-3 rounded-full bg-[#10160a] px-6 py-3.5 font-mono text-xs font-medium uppercase tracking-[0.2em] text-lime-300 transition-colors duration-300 hover:bg-[#1d2810] hover:text-lime-200 active:scale-[0.98] sm:px-7 sm:py-4"
                >
                  Start a project
                  <ArrowUpRight className="size-4" />
                </Link>
              </MagneticButton>
              <Link
                href="/services"
                className="inline-flex items-center justify-center gap-3 rounded-full border border-[#10160a]/30 px-6 py-3.5 font-mono text-xs font-medium uppercase tracking-[0.2em] text-[#262c1a] transition-colors duration-300 hover:border-lime-700 hover:text-lime-700 active:scale-[0.98] sm:px-7 sm:py-4"
              >
                Explore services
              </Link>
            </motion.div>
          </div>
        </div>

        {/* Bottom strip */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.9, duration: 0.8 }}
          className="relative hidden border-t border-black/10 md:block"
        >
          <div className="container-x flex flex-wrap items-center justify-between gap-x-8 gap-y-3 py-4">
            <div className="flex flex-wrap items-center gap-x-8 gap-y-2">
              {site.trustBadges.map((b) => (
                <span key={b.label} className="font-mono text-[11px] uppercase tracking-[0.15em] text-[#10160a]/60">
                  / {b.label}
                </span>
              ))}
            </div>
            <span className="hidden items-center gap-2 font-mono text-sm font-medium uppercase tracking-[0.2em] md:text-base text-[#10160a]/60 lg:flex">
              Scroll
              <ArrowDown className="size-3.5 animate-bounce text-lime-700" />
            </span>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
