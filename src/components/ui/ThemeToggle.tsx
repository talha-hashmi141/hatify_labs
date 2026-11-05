"use client";

import { useSyncExternalStore } from "react";
import { Moon, Sun } from "lucide-react";

/**
 * The site always opens in light mode (no `.dark` class on <html>).
 * The toggle switches theme for the current visit only; it is not persisted,
 * so every fresh load starts light again.
 */

function applyTheme(dark: boolean) {
  const root = document.documentElement;
  // Flip every colour in a single frame instead of letting each element's
  // own transition fade at its own pace.
  root.classList.add("theme-switching");
  root.classList.toggle("dark", dark);
  document
    .querySelectorAll('meta[name="theme-color"]')
    .forEach((m) => m.setAttribute("content", dark ? "#050C22" : "#F8FAFF"));
  requestAnimationFrame(() => requestAnimationFrame(() => root.classList.remove("theme-switching")));
}

function subscribe(onChange: () => void) {
  const observer = new MutationObserver(onChange);
  observer.observe(document.documentElement, { attributes: true, attributeFilter: ["class"] });
  return () => observer.disconnect();
}
const getSnapshot = () => document.documentElement.classList.contains("dark");
const getServerSnapshot = () => false;

export default function ThemeToggle({ className = "" }: { className?: string }) {
  const isDark = useSyncExternalStore(subscribe, getSnapshot, getServerSnapshot);

  const toggle = () => applyTheme(!document.documentElement.classList.contains("dark"));

  return (
    <button
      type="button"
      onClick={toggle}
      aria-label="Dark theme"
      aria-pressed={isDark}
      title={isDark ? "Switch to light theme" : "Switch to dark theme"}
      className={`group relative flex size-10 items-center justify-center overflow-hidden rounded-full text-body transition-colors hover:bg-tint hover:text-royal ${className}`}
    >
      {/* Icons are swapped purely with CSS so the right one shows before hydration. */}
      <Sun
        aria-hidden
        data-theme-anim
        className="absolute size-[18px] rotate-90 scale-0 opacity-0 transition-[transform,opacity] duration-300 ease-[var(--ease-out-soft)] dark:rotate-0 dark:scale-100 dark:opacity-100"
      />
      <Moon
        aria-hidden
        data-theme-anim
        className="absolute size-[18px] rotate-0 scale-100 opacity-100 transition-[transform,opacity] duration-300 ease-[var(--ease-out-soft)] dark:-rotate-90 dark:scale-0 dark:opacity-0"
      />
    </button>
  );
}
