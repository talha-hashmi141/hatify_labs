"use client";

import { motion } from "framer-motion";
import type { ReactNode } from "react";

interface RevealProps {
  children: ReactNode;
  delay?: number;
  y?: number;
  className?: string;
  /** Render as a list item so it can sit directly inside <ul>/<ol>. */
  as?: "div" | "li";
}

/**
 * Subtle fade-up on first view. The initial state is identical on server and
 * client (no hydration mismatch); reduced-motion users get the fade without
 * movement via <MotionConfig reducedMotion="user"> in MotionProvider.
 */
export default function Reveal({ children, delay = 0, y = 18, className, as = "div" }: RevealProps) {
  const Cmp = as === "li" ? motion.li : motion.div;
  return (
    <Cmp
      initial={{ opacity: 0, y }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "0px 0px -40px 0px" }}
      transition={{ duration: 0.6, delay, ease: [0.22, 1, 0.36, 1] }}
      className={className}
    >
      {children}
    </Cmp>
  );
}
