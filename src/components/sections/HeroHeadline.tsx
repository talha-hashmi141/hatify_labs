"use client";

import { motion } from "framer-motion";

const WORDS: { w: string; accent?: boolean }[] = [
  { w: "For" },
  { w: "millions" },
  { w: "of" },
  { w: "users," },
  { w: "we" },
  { w: "build" },
  { w: "delightful", accent: true },
  { w: "solutions." },
];

/** Hero H1 with a masked word-by-word rise. Full sentence stays in the accessible name. */
export default function HeroHeadline() {
  return (
    <h1 id="hero-title" className="display mt-7 text-[clamp(2.6rem,6.2vw,4.9rem)]" aria-label={WORDS.map((x) => x.w).join(" ")}>
      {WORDS.map(({ w, accent }, i) => (
        <span key={w} aria-hidden className="inline-block overflow-hidden pb-[0.12em] -mb-[0.12em] align-bottom">
          <motion.span
            className={`inline-block ${accent ? "accent" : ""}`}
            initial={{ y: "105%", opacity: 0 }}
            animate={{ y: "0%", opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.08 + i * 0.06, ease: [0.22, 1, 0.36, 1] }}
          >
            {w}
          </motion.span>
          {i < WORDS.length - 1 ? " " : null}
        </span>
      ))}
    </h1>
  );
}
