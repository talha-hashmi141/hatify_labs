import type { ReactNode } from "react";
import Reveal from "./Reveal";

interface Props {
  eyebrow: string;
  title: ReactNode;
  desc?: ReactNode;
  align?: "left" | "center";
  tone?: "light" | "dark";
  action?: ReactNode;
  className?: string;
  as?: "h1" | "h2";
}

/** Eyebrow + heading + optional description, with an optional right-aligned action. */
export default function SectionHeader({
  eyebrow,
  title,
  desc,
  align = "left",
  tone = "light",
  action,
  className,
  as = "h2",
}: Props) {
  const H = as;
  const center = align === "center";
  const dark = tone === "dark";
  return (
    <div
      className={`flex flex-col gap-6 ${center ? "items-center text-center" : "md:flex-row md:items-end md:justify-between"} ${
        className ?? ""
      }`}
    >
      <Reveal className={center ? "max-w-3xl" : "max-w-2xl"}>
        <p className={`eyebrow ${dark ? "!text-cyan" : ""}`}>{eyebrow}</p>
        <H className={`display mt-4 text-[clamp(2rem,4.2vw,3.25rem)] ${dark ? "!text-white" : ""}`}>{title}</H>
        {desc ? (
          <p
            className={`mt-5 text-base leading-relaxed sm:text-lg ${dark ? "text-white/70" : "text-body"} ${
              center ? "mx-auto max-w-2xl" : ""
            }`}
          >
            {desc}
          </p>
        ) : null}
      </Reveal>
      {action ? (
        <Reveal delay={0.1} className="shrink-0">
          {action}
        </Reveal>
      ) : null}
    </div>
  );
}
