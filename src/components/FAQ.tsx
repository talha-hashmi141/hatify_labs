"use client";

import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { Plus } from "lucide-react";
import { faqs } from "@/lib/data";
import Reveal from "./Reveal";

export default function FAQ() {
  const [open, setOpen] = useState<number | null>(0);

  return (
    <div className="space-y-3">
      {faqs.map((item, i) => {
        const isOpen = open === i;
        return (
          <Reveal key={item.q} delay={i * 0.03}>
            <div
              className={`rounded-xl border transition-colors duration-300 ${
                isOpen ? "border-lime-300/40 bg-white/[0.03]" : "border-white/10 bg-white/[0.015]"
              }`}
            >
              <button
                type="button"
                onClick={() => setOpen(isOpen ? null : i)}
                aria-expanded={isOpen}
                className="grid w-full grid-cols-[auto_1fr_auto] items-center gap-5 px-5 py-5 text-left md:gap-8 md:px-6"
              >
                <span className={`font-mono text-base font-semibold transition-colors ${isOpen ? "text-lime-300" : "text-zinc-600"}`}>
                  Q/{String(i + 1).padStart(2, "0")}
                </span>
                <span className="font-display text-lg font-bold text-white sm:text-xl md:text-2xl">{item.q}</span>
                <motion.span
                  animate={{ rotate: isOpen ? 45 : 0 }}
                  transition={{ duration: 0.3 }}
                  className={`flex size-9 shrink-0 items-center justify-center rounded-full border transition-colors ${
                    isOpen ? "border-lime-300 text-lime-300" : "border-white/15 text-zinc-400"
                  }`}
                >
                  <Plus className="size-4" />
                </motion.span>
              </button>
              <AnimatePresence initial={false}>
                {isOpen && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: "auto", opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
                    className="overflow-hidden"
                  >
                    <p className="max-w-3xl pb-6 pl-[4.7rem] pr-5 text-sm leading-relaxed text-zinc-400 sm:text-base md:pl-[5.6rem]">
                      {item.a}
                    </p>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </Reveal>
        );
      })}
    </div>
  );
}
