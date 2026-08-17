"use client";

import { useEffect, useState } from "react";
import { motion, useMotionValue, useSpring } from "framer-motion";

/** Lime dot + ring that trails the pointer and swells over interactive elements.
 *  CSS-gated to fine pointers only — never rendered on touch devices. */
export default function CustomCursor() {
  const [hovering, setHovering] = useState(false);
  const x = useMotionValue(-100);
  const y = useMotionValue(-100);
  const rx = useSpring(x, { stiffness: 300, damping: 25, mass: 0.4 });
  const ry = useSpring(y, { stiffness: 300, damping: 25, mass: 0.4 });

  useEffect(() => {
    const move = (e: MouseEvent) => {
      x.set(e.clientX);
      y.set(e.clientY);
    };
    const over = (e: MouseEvent) => {
      const target = e.target as Element | null;
      setHovering(Boolean(target?.closest?.("a, button, [role='button'], input, textarea, select, summary")));
    };
    window.addEventListener("mousemove", move, { passive: true });
    window.addEventListener("mouseover", over, { passive: true });
    return () => {
      window.removeEventListener("mousemove", move);
      window.removeEventListener("mouseover", over);
    };
  }, [x, y]);

  return (
    <motion.div
      style={{ x: rx, y: ry }}
      aria-hidden
      className="pointer-events-none fixed left-0 top-0 z-[95] hidden pointer-fine:block"
    >
      <motion.div
        animate={{ scale: hovering ? 2.6 : 1, opacity: hovering ? 1 : 0.55 }}
        transition={{ duration: 0.25, ease: "easeOut" }}
        className="absolute -left-3 -top-3 size-6 rounded-full border border-lime-300/80"
      />
      <div className="absolute -left-[2.5px] -top-[2.5px] size-[5px] rounded-full bg-lime-300" />
    </motion.div>
  );
}
