"use client";

import { useEffect } from "react";

/** Feeds the pointer position to [data-spotlight] cards so their hover glow follows the mouse. */
export default function SpotlightTracker() {
  useEffect(() => {
    const move = (e: PointerEvent) => {
      if (e.pointerType !== "mouse") return;
      const card = (e.target as Element | null)?.closest<HTMLElement>("[data-spotlight]");
      if (!card) return;
      const r = card.getBoundingClientRect();
      card.style.setProperty("--mx", `${e.clientX - r.left}px`);
      card.style.setProperty("--my", `${e.clientY - r.top}px`);
    };
    window.addEventListener("pointermove", move, { passive: true });
    return () => window.removeEventListener("pointermove", move);
  }, []);
  return null;
}
