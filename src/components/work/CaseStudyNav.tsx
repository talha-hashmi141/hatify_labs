"use client";

import { useEffect, useState } from "react";

interface Section {
  id: string;
  label: string;
}

/**
 * Sticky case-study table of contents with scroll-spy. The active entry is the
 * section whose top has most recently crossed a reading line ~35% down the
 * viewport. Sections that sit side by side (Problem / Solution) share a top
 * edge and are highlighted together.
 */
export default function CaseStudyNav({ sections }: { sections: Section[] }) {
  const [active, setActive] = useState<string[]>([]);

  useEffect(() => {
    const els = sections
      .map((s) => document.getElementById(s.id))
      .filter((el): el is HTMLElement => el !== null);
    if (!els.length) return;

    let frame = 0;
    const update = () => {
      frame = 0;
      const line = window.innerHeight * 0.35;
      const atBottom = window.innerHeight + window.scrollY >= document.documentElement.scrollHeight - 4;
      const tops = els.map((el) => ({ id: el.id, top: el.getBoundingClientRect().top }));

      let next: string[];
      if (atBottom) {
        const lastTop = tops[tops.length - 1].top;
        next = tops.filter((t) => Math.abs(t.top - lastTop) < 4).map((t) => t.id);
      } else {
        const passed = tops.filter((t) => t.top <= line);
        if (!passed.length) next = [tops[0].id];
        else {
          const maxTop = Math.max(...passed.map((t) => t.top));
          next = passed.filter((t) => Math.abs(t.top - maxTop) < 4).map((t) => t.id);
        }
      }
      setActive((prev) => (prev.join() === next.join() ? prev : next));
    };
    const onScroll = () => {
      if (!frame) frame = requestAnimationFrame(update);
    };

    update();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);
    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
      if (frame) cancelAnimationFrame(frame);
    };
  }, [sections]);

  return (
    <nav aria-label="Case study sections" className="hidden lg:block">
      <ul className="sticky top-28 space-y-1 border-l border-line">
        {sections.map((s, i) => {
          const on = active.includes(s.id);
          return (
            <li key={s.id}>
              <a
                href={`#${s.id}`}
                aria-current={on ? "location" : undefined}
                className={`-ml-px flex items-center gap-3 border-l-2 py-1.5 pl-4 text-sm transition-all duration-300 ${
                  on ? "border-royal font-semibold text-ink" : "border-transparent text-muted hover:border-line-strong hover:text-ink"
                }`}
              >
                <span className={`font-mono text-[11px] transition-colors duration-300 ${on ? "text-royal" : "text-faint"}`}>
                  {String(i + 1).padStart(2, "0")}
                </span>
                {s.label}
              </a>
            </li>
          );
        })}
      </ul>
    </nav>
  );
}
