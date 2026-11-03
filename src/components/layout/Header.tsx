"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { AnimatePresence, motion, useScroll, useSpring } from "framer-motion";
import { ArrowRight, Menu, X } from "lucide-react";
import { linkedin, site } from "@/lib/data";
import Logo from "@/components/brand/Logo";
import { LinkedInIcon } from "@/components/ui/Icon";

export default function Header() {
  const pathname = usePathname();
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const { scrollYProgress } = useScroll();
  const progress = useSpring(scrollYProgress, { stiffness: 160, damping: 30, restDelta: 0.001 });

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 12);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Close the mobile menu on navigation.
  const [lastPath, setLastPath] = useState(pathname);
  if (pathname !== lastPath) {
    setLastPath(pathname);
    setOpen(false);
  }

  // Lock scroll + close on Escape while the mobile menu is open.
  useEffect(() => {
    if (!open) return;
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && setOpen(false);
    window.addEventListener("keydown", onKey);
    return () => {
      document.body.style.overflow = prev;
      window.removeEventListener("keydown", onKey);
    };
  }, [open]);

  const isActive = (href: string) => (href === "/" ? pathname === "/" : pathname === href || pathname.startsWith(`${href}/`));
  const solid = scrolled || open;

  return (
    <>
      <a
        href="#main"
        className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-[80] focus:rounded-full focus:bg-navy-900 focus:px-4 focus:py-2 focus:text-sm focus:text-white"
      >
        Skip to content
      </a>

      <motion.div
        aria-hidden
        style={{ scaleX: progress }}
        className="fixed inset-x-0 top-0 z-[60] h-[2px] origin-left bg-gradient-to-r from-royal via-electric to-cyan"
      />

      <header
        className={`fixed inset-x-0 top-0 z-50 transition-[background-color,box-shadow,border-color] duration-300 ${
          solid ? "border-b border-line/80 bg-white/85 shadow-[0_8px_30px_-20px_rgb(7_27_73/0.35)] backdrop-blur-xl" : "border-b border-transparent"
        }`}
      >
        <nav className="container-x flex h-[72px] items-center justify-between gap-6" aria-label="Main">
          <Link href="/" aria-label={`${site.name} — home`} className="rounded-lg">
            <Logo />
          </Link>

          <ul className="hidden items-center gap-1 md:flex">
            {site.nav.map((item) => {
              const active = isActive(item.href);
              return (
                <li key={item.href}>
                  <Link
                    href={item.href}
                    aria-current={active ? "page" : undefined}
                    className={`relative rounded-full px-4 py-2 text-sm font-medium transition-colors ${
                      active ? "text-royal" : "text-body hover:text-ink"
                    }`}
                  >
                    {item.label}
                    {active ? (
                      <motion.span
                        layoutId="nav-dot"
                        className="absolute inset-x-0 -bottom-0.5 mx-auto h-1 w-1 rounded-full bg-royal"
                        transition={{ type: "spring", stiffness: 380, damping: 30 }}
                      />
                    ) : null}
                  </Link>
                </li>
              );
            })}
          </ul>

          <div className="hidden items-center gap-3 md:flex">
            {linkedin ? (
              <a
                href={linkedin}
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Hatify Labs on LinkedIn (opens in a new tab)"
                className="flex size-10 items-center justify-center rounded-full text-body transition-colors hover:bg-tint hover:text-royal"
              >
                <LinkedInIcon className="size-[18px]" />
              </a>
            ) : null}
            <Link href="/contact" className="btn btn-primary">
              Start a project
              <ArrowRight className="size-4" aria-hidden />
            </Link>
          </div>

          <button
            type="button"
            onClick={() => setOpen((v) => !v)}
            className="flex size-11 items-center justify-center rounded-full text-ink transition-colors hover:bg-tint md:hidden"
            aria-label={open ? "Close menu" : "Open menu"}
            aria-expanded={open}
            aria-controls="mobile-menu"
          >
            {open ? <X className="size-5" /> : <Menu className="size-5" />}
          </button>
        </nav>
      </header>

      <AnimatePresence>
        {open ? (
          <motion.div
            id="mobile-menu"
            initial={{ opacity: 0, y: -8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            transition={{ duration: 0.22, ease: [0.22, 1, 0.36, 1] }}
            className="fixed inset-x-0 top-[72px] bottom-0 z-40 overflow-y-auto bg-white px-4 pb-10 pt-4 sm:px-8 md:hidden"
          >
            <ul className="divide-y divide-line border-y border-line">
              {[{ label: "Home", href: "/" }, ...site.nav].map((item) => (
                <li key={item.href}>
                  <Link
                    href={item.href}
                    aria-current={isActive(item.href) ? "page" : undefined}
                    className={`flex items-center justify-between py-4 text-xl font-semibold ${
                      isActive(item.href) ? "text-royal" : "text-ink"
                    }`}
                  >
                    {item.label}
                    <ArrowRight className="size-5 text-faint" aria-hidden />
                  </Link>
                </li>
              ))}
            </ul>
            <Link href="/contact" className="btn btn-lg btn-primary mt-8 w-full">
              Start a project
            </Link>
            {linkedin ? (
              <a
                href={linkedin}
                target="_blank"
                rel="noopener noreferrer"
                className="btn btn-lg btn-secondary mt-3 w-full"
              >
                <LinkedInIcon className="size-4" />
                Follow on LinkedIn
              </a>
            ) : null}
          </motion.div>
        ) : null}
      </AnimatePresence>
    </>
  );
}
