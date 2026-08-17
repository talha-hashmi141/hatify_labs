"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { AnimatePresence, motion, useScroll, useSpring } from "framer-motion";
import { ArrowUpRight } from "lucide-react";
import { site } from "@/lib/data";
import Logo from "./Logo";

function Clock() {
  const [time, setTime] = useState("--:--");

  useEffect(() => {
    const tick = () => setTime(new Date().toLocaleTimeString("en-GB", { hour: "2-digit", minute: "2-digit" }));
    tick();
    const id = setInterval(tick, 15000);
    return () => clearInterval(id);
  }, []);

  return (
    <span className="label-mono hidden xl:flex items-center gap-2">
      Local
      <span className="text-zinc-300 tabular-nums">{time}</span>
    </span>
  );
}

export default function Navbar() {
  const pathname = usePathname();
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);

  const { scrollYProgress } = useScroll();
  const progress = useSpring(scrollYProgress, { stiffness: 140, damping: 30, restDelta: 0.001 });

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  const isActive = (href: string) => (href === "/" ? pathname === "/" : pathname.startsWith(href));

  return (
    <>
      {/* Reading progress hairline */}
      <motion.div
        style={{ scaleX: progress }}
        className="fixed left-0 top-0 z-[70] h-[2px] w-full origin-left bg-lime-300"
      />

      <header
        className={`fixed inset-x-0 top-0 z-[60] border-b transition-all duration-300 ${
          scrolled ? "border-white/10 bg-ink/80 backdrop-blur-xl" : "border-transparent bg-transparent"
        }`}
      >
        <nav className="container-x flex h-16 items-center justify-between md:h-[76px]" aria-label="Main">
          <Link href="/" className="flex items-center gap-3" aria-label={`${site.name} — home`}>
            <Logo className="size-8" />
            <span className="font-mono text-sm font-medium uppercase tracking-[0.25em] text-white">
              Hatify<span className="text-accent">_</span>Labs
            </span>
          </Link>

          <div className="hidden items-center gap-8 md:flex">
            {site.nav.map((item, i) => (
              <Link
                key={item.href}
                href={item.href}
                className={`group font-mono text-[11px] uppercase tracking-[0.2em] transition-colors duration-200 ${
                  isActive(item.href) ? "text-white" : "text-zinc-500 hover:text-white"
                }`}
              >
                <span className={`mr-1.5 ${isActive(item.href) ? "text-accent" : "text-zinc-600 group-hover:text-accent"}`}>
                  0{i + 1}
                </span>
                {item.label}
              </Link>
            ))}
            <Clock />
            <Link href="/contact" className="btn-primary !px-5 !py-3">
              Start a project
            </Link>
          </div>

          {/* Mobile burger */}
          <button
            type="button"
            onClick={() => setOpen((v) => !v)}
            className="relative flex size-10 items-center justify-center md:hidden"
            aria-label={open ? "Close menu" : "Open menu"}
            aria-expanded={open}
          >
            <span
              className={`absolute h-[2px] w-6 bg-white transition-all duration-300 ${
                open ? "rotate-45" : "-translate-y-[4px]"
              }`}
            />
            <span
              className={`absolute h-[2px] w-6 bg-white transition-all duration-300 ${
                open ? "-rotate-45" : "translate-y-[4px]"
              }`}
            />
          </button>
        </nav>
      </header>

      {/* Mobile menu overlay */}
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="fixed inset-0 z-[55] flex flex-col bg-ink/95 px-6 pt-28 backdrop-blur-2xl md:hidden"
          >
            <div className="flex flex-col">
              {[{ label: "Home", href: "/" }, ...site.nav].map((item, i) => (
                <motion.div
                  key={item.href}
                  initial={{ opacity: 0, y: 24 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.08 + i * 0.06, duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
                  className="border-b border-white/10"
                >
                  <Link
                    href={item.href}
                    onClick={() => setOpen(false)}
                    className="flex items-baseline gap-4 py-5"
                  >
                    <span className="font-mono text-base font-semibold text-lime-300">0{i}</span>
                    <span
                      className={`display text-4xl ${isActive(item.href) ? "text-accent" : "text-white"}`}
                    >
                      {item.label}
                    </span>
                  </Link>
                </motion.div>
              ))}
            </div>

            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.4 }}
              className="mt-auto mb-10"
            >
              <p className="label-mono">Get in touch</p>
              <a href={`mailto:${site.email}`} className="mt-2 flex items-center gap-2 font-mono text-base text-zinc-200">
                {site.email}
                <ArrowUpRight className="size-4 text-lime-300" />
              </a>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
