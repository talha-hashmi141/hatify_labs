"use client";

import { useEffect, useState } from "react";
import { MapPin } from "lucide-react";
import { LogoMark } from "@/components/brand/Logo";

/** Contact-page header visual: live Lahore time and an illustrative conversation. */
function LahoreClock() {
  const [time, setTime] = useState<string | null>(null);
  useEffect(() => {
    const fmt = new Intl.DateTimeFormat("en-GB", { hour: "2-digit", minute: "2-digit", timeZone: "Asia/Karachi" });
    const tick = () => setTime(fmt.format(new Date()));
    const first = setTimeout(tick, 0);
    const id = setInterval(tick, 15_000);
    return () => {
      clearTimeout(first);
      clearInterval(id);
    };
  }, []);
  return <span className="tabular-nums">{time ?? "--:--"}</span>;
}

export default function ContactVisual({ responseTime }: { responseTime: string }) {
  return (
    <div className="relative mx-auto hidden w-full max-w-[400px] lg:block" aria-hidden>
      <div className="absolute -inset-6 rounded-[2.5rem] bg-gradient-to-br from-electric/20 to-cyan/10 blur-2xl" />

      <div className="surface-aurora relative overflow-hidden rounded-[2rem] p-6 shadow-[var(--shadow-lift)]">
        <div className="bg-dots absolute inset-0 opacity-50" />

        <div className="relative flex items-center justify-between">
          <span className="flex items-center gap-2 text-sm font-semibold text-ink">
            <MapPin className="size-4 text-royal" />
            Lahore, Pakistan
          </span>
          <span className="rounded-full bg-gradient-to-r from-royal to-electric px-3 py-1 font-mono text-xs text-white shadow-[var(--shadow-glow)]">
            <LahoreClock /> PKT
          </span>
        </div>

        <div className="relative mt-7 space-y-3">
          <div className="ml-auto max-w-[85%] rounded-2xl rounded-br-md bg-gradient-to-br from-royal to-electric px-4 py-3 text-sm leading-relaxed text-white shadow-[var(--shadow-glow)]">
            Hi Hatify Labs, we are planning a new platform and would love your view on the architecture.
          </div>
          <div className="flex items-end gap-2.5">
            <span className="flex size-8 shrink-0 items-center justify-center rounded-full border border-[#d6e5ff] bg-white">
              <LogoMark className="size-5" />
            </span>
            <div className="flex items-center gap-1.5 rounded-2xl rounded-bl-md tile-aurora px-4 py-3.5">
              {[0, 1, 2].map((i) => (
                <span key={i} className="size-2 animate-bounce rounded-full bg-royal/60" style={{ animationDelay: `${i * 0.15}s` }} />
              ))}
            </div>
          </div>
        </div>

        <p className="relative mt-7 border-t border-[#d6e5ff] pt-4 text-sm text-body">{responseTime}</p>
      </div>
    </div>
  );
}
