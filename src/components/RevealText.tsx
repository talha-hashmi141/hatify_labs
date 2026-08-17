"use client";

import { motion } from "framer-motion";

interface RevealTextProps {
  text: string;
  /** Space-separated words (as they appear in `text`) to tint lime. */
  accent?: string;
  className?: string;
  delay?: number;
}

const clean = (w: string) => w.toLowerCase().replace(/[^a-z0-9&+.'-]/gi, "");

/** Word-by-word masked slide-up reveal for display headlines. */
export default function RevealText({ text, accent, className, delay = 0 }: RevealTextProps) {
  const words = text.split(" ");
  const accentSet = new Set((accent ?? "").split(" ").filter(Boolean).map(clean));

  return (
    <span className={className} aria-label={text}>
      {words.map((word, i) => (
        <span key={i} aria-hidden className="inline-block overflow-hidden align-top pb-[0.09em] -mb-[0.09em]">
          <motion.span
            initial={{ y: "115%" }}
            whileInView={{ y: 0 }}
            viewport={{ once: true, margin: "-60px" }}
            transition={{ duration: 0.75, delay: delay + i * 0.05, ease: [0.22, 1, 0.36, 1] }}
            className={`inline-block ${accentSet.has(clean(word)) ? "text-accent" : ""}`}
          >
            {word}
            {i < words.length - 1 ? " " : ""}
          </motion.span>
        </span>
      ))}
    </span>
  );
}
