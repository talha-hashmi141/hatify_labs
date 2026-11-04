"use client";

import { useId, useState } from "react";
import { Plus } from "lucide-react";
import type { FaqItem } from "@/lib/types";

/** Accessible accordion: buttons with aria-expanded controlling labelled regions. */
export default function FAQ({ items }: { items: FaqItem[] }) {
  const [open, setOpen] = useState<number | null>(0);
  const base = useId();

  return (
    <div className="divide-y divide-line border-y border-line">
      {items.map((item, i) => {
        const isOpen = open === i;
        const btn = `${base}-q${i}`;
        const panel = `${base}-a${i}`;
        return (
          <div key={item.q}>
            <h3>
              <button
                id={btn}
                type="button"
                aria-expanded={isOpen}
                aria-controls={panel}
                onClick={() => setOpen(isOpen ? null : i)}
                className="flex w-full items-center justify-between gap-6 py-6 text-left"
              >
                <span className="text-base font-semibold text-ink sm:text-lg">{item.q}</span>
                <span
                  className={`flex size-9 shrink-0 items-center justify-center rounded-full border transition-[transform,background-color,border-color,color] duration-300 ${
                    isOpen ? "rotate-45 border-fill bg-fill text-white" : "border-line-strong text-muted"
                  }`}
                >
                  <Plus className="size-4" aria-hidden />
                </span>
              </button>
            </h3>
            <div
              id={panel}
              role="region"
              aria-labelledby={btn}
              hidden={!isOpen}
              className="pb-6 pr-14 text-[15px] leading-relaxed text-body"
            >
              {item.a}
            </div>
          </div>
        );
      })}
    </div>
  );
}
