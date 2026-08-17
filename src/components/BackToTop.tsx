"use client";

export default function BackToTop() {
  return (
    <button
      type="button"
      onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
      className="font-mono text-[11px] uppercase tracking-[0.2em] text-zinc-500 transition-colors hover:text-lime-300"
    >
      Back to top ↑
    </button>
  );
}
