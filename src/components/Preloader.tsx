"use client";

import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";

const DURATION_MS = 1600;

const BOOT_LINES = [
  "> initializing core modules",
  "> loading design system",
  "> calibrating ai pipelines",
  "> uplink established — welcome",
];

export default function Preloader() {
  const [progress, setProgress] = useState(0);
  const [done, setDone] = useState(false);

  useEffect(() => {
    const start = performance.now();
    let raf = 0;
    const tick = (t: number) => {
      const p = Math.min(1, (t - start) / DURATION_MS);
      // ease-out so the counter decelerates like a real loader
      setProgress(Math.round((1 - Math.pow(1 - p, 3)) * 100));
      if (p < 1) raf = requestAnimationFrame(tick);
      else setTimeout(() => setDone(true), 250);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, []);

  useEffect(() => {
    document.body.style.overflow = done ? "" : "hidden";
    return () => {
      document.body.style.overflow = "";
    };
  }, [done]);

  const visibleLines = BOOT_LINES.filter((_, i) => progress > i * 26);

  return (
    <AnimatePresence>
      {!done && (
        <motion.div
          className="fixed inset-0 z-[100] flex flex-col justify-between bg-ink p-6 md:p-10"
          exit={{ y: "-100%" }}
          transition={{ duration: 0.8, ease: [0.76, 0, 0.24, 1] }}
          aria-hidden
        >
          {/* Top meta row */}
          <div className="flex items-center justify-between">
            <span className="label-mono">[ Hatify Labs ]</span>
            <span className="label-mono hidden sm:block">EST. 2019 — Software · AI · Cloud</span>
          </div>

          {/* Boot log */}
          <div className="font-mono text-xs leading-6 text-lime-300/80 sm:text-sm">
            {visibleLines.map((line, i) => (
              <motion.p key={line} initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.2 }}>
                {line}
                {i === visibleLines.length - 1 ? <span className="blink ml-1">▌</span> : null}
              </motion.p>
            ))}
          </div>

          {/* Bottom row — wordmark + giant counter */}
          <div className="flex items-end justify-between gap-6">
            <div className="overflow-hidden">
              <motion.p
                initial={{ y: "110%" }}
                animate={{ y: 0 }}
                transition={{ duration: 0.7, delay: 0.15, ease: [0.22, 1, 0.36, 1] }}
                className="display text-3xl sm:text-5xl"
              >
                Hatify<span className="text-accent">®</span>
              </motion.p>
            </div>
            <p className="display text-right text-[clamp(4.5rem,16vw,12rem)] tabular-nums">
              {progress}
              <span className="text-accent">%</span>
            </p>
          </div>

          {/* Progress hairline */}
          <div className="absolute inset-x-0 top-0 h-px bg-white/10">
            <div className="h-full bg-lime-300 transition-[width] duration-100 ease-out" style={{ width: `${progress}%` }} />
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
