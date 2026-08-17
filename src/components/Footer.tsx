import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { services, site } from "@/lib/data";
import BackToTop from "./BackToTop";
import Logo from "./Logo";

export default function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="relative overflow-hidden border-t border-white/10 bg-[#030303]">
      <div className="container-x grid gap-12 py-16 md:grid-cols-12 md:py-20">
        <div className="md:col-span-5">
          <Link href="/" className="flex items-center gap-3">
            <Logo className="size-9" />
            <span className="font-mono text-sm font-medium uppercase tracking-[0.25em] text-white">
              Hatify<span className="text-accent">_</span>Labs
            </span>
          </Link>
          <p className="mt-6 max-w-sm text-sm leading-relaxed text-zinc-500">{site.tagline}</p>
          <ul className="mt-8 space-y-2">
            {site.socials.map((s) => (
              <li key={s.label}>
                <a
                  href={s.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group inline-flex items-center gap-2 font-mono text-sm font-medium uppercase tracking-[0.2em] text-zinc-500 md:text-base transition-colors hover:text-lime-300"
                >
                  {s.label}
                  <ArrowUpRight className="size-3.5 transition-transform duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
                </a>
              </li>
            ))}
          </ul>
        </div>

        <div className="md:col-span-3">
          <h3 className="label-mono">/ Services</h3>
          <ul className="mt-5 space-y-2.5">
            {services.slice(0, 6).map((s) => (
              <li key={s.slug}>
                <Link href={`/services/${s.slug}`} className="text-sm text-zinc-400 transition-colors hover:text-white">
                  {s.title}
                </Link>
              </li>
            ))}
            <li>
              <Link
                href="/services"
                className="font-mono text-xs uppercase tracking-[0.2em] text-lime-300/90 transition-colors hover:text-lime-200"
              >
                All services →
              </Link>
            </li>
          </ul>
        </div>

        <div className="md:col-span-2">
          <h3 className="label-mono">/ Sitemap</h3>
          <ul className="mt-5 space-y-2.5">
            {site.nav.map((item) => (
              <li key={item.href}>
                <Link href={item.href} className="text-sm text-zinc-400 transition-colors hover:text-white">
                  {item.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        <div className="md:col-span-2">
          <h3 className="label-mono">/ Contact</h3>
          <ul className="mt-5 space-y-2.5 text-sm text-zinc-400">
            <li>
              <a href={`mailto:${site.email}`} className="transition-colors hover:text-white">
                {site.email}
              </a>
            </li>
            <li>
              <a href={`tel:${site.phone.replace(/[^+\d]/g, "")}`} className="transition-colors hover:text-white">
                {site.phone}
              </a>
            </li>
            <li className="text-zinc-600">{site.address}</li>
          </ul>
        </div>
      </div>

      <div className="container-x flex flex-col items-start justify-between gap-3 border-t border-white/10 py-5 font-mono text-[11px] uppercase tracking-[0.2em] text-zinc-600 sm:flex-row sm:items-center">
        <p>
          © {year} {site.legalName} — All rights reserved
        </p>
        <p className="flex items-center gap-2">
          <span className="size-1.5 rounded-full bg-lime-300 animate-pulse-dot" />
          All systems operational
        </p>
        <BackToTop />
      </div>

      {/* Giant ghost wordmark */}
      <div
        aria-hidden
        className="display pointer-events-none select-none whitespace-nowrap text-center text-[17vw] leading-[0.78] text-white/[0.03]"
      >
        Hatify Labs
      </div>
    </footer>
  );
}
