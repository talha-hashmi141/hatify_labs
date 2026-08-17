import { tech } from "@/lib/data";
import MarqueeBand from "./MarqueeBand";

/** Deep-moss band with lime type scrolling through it. */
export default function TechMarquee() {
  return (
    <section className="relative border-y border-lime-300/20 bg-[#121d09]" aria-label="Technologies we work with">
      <div className="container-x flex items-center justify-between py-4">
        <span className="font-mono text-base font-semibold tracking-[0.2em] md:text-lg text-lime-300">[02]</span>
        <span className="font-mono text-sm font-medium uppercase tracking-[0.2em] md:text-base text-lime-200/50">
          Stack — spoken fluently
        </span>
      </div>
      <div className="border-t border-lime-300/10">
        <MarqueeBand items={tech.row1} outline tone="onMoss" />
      </div>
      <div className="border-t border-lime-300/10">
        <MarqueeBand items={tech.row2} size="sm" reverse tone="onMoss" />
      </div>
    </section>
  );
}
