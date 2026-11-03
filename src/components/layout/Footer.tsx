import Link from "next/link";
import { ArrowUpRight, MapPin } from "lucide-react";
import { contactEmail, linkedin, services, site } from "@/lib/data";
import Logo from "@/components/brand/Logo";
import { LinkedInIcon } from "@/components/ui/Icon";

export default function Footer() {
  const year = new Date().getFullYear();

  const company = [
    { label: "About", href: "/about" },
    { label: "Work & case studies", href: "/work" },
    { label: "Services", href: "/services" },
    { label: "Contact", href: "/contact" },
  ];

  return (
    <footer className="surface-navy-deep relative overflow-hidden">
      <div aria-hidden className="bg-dots-dark fade-mask-b pointer-events-none absolute inset-0 opacity-60" />

      <div className="container-x relative grid gap-12 py-16 md:py-20 lg:grid-cols-12">
        <div className="lg:col-span-4">
          <Link href="/" aria-label={`${site.name} — home`} className="inline-block rounded-lg">
            <Logo tone="light" />
          </Link>
          <p className="mt-6 max-w-sm text-[15px] leading-relaxed text-white/65">{site.tagline}</p>
          <p className="mt-5 inline-flex items-center gap-2 text-sm text-white/60">
            <MapPin className="size-4 text-cyan" aria-hidden />
            {site.location}
          </p>
          {linkedin ? (
            <div className="mt-6">
              <a
                href={linkedin}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 rounded-full border border-white/15 px-4 py-2 text-sm font-medium text-white/85 transition-colors hover:border-white/40 hover:text-white"
              >
                <LinkedInIcon className="size-4" />
                LinkedIn
                <span className="sr-only">(opens in a new tab)</span>
              </a>
            </div>
          ) : null}
        </div>

        <div className="grid gap-10 sm:grid-cols-3 lg:col-span-8">
          <div className="sm:col-span-2">
            <h2 className="mono-label !text-white/45">Services</h2>
            <ul className="mt-5 grid gap-x-8 gap-y-3 sm:grid-cols-2">
              {services.map((s) => (
                <li key={s.slug}>
                  <Link href={`/services/${s.slug}`} className="text-sm text-white/70 transition-colors hover:text-white">
                    {s.title}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
          <div>
            <h2 className="mono-label !text-white/45">Company</h2>
            <ul className="mt-5 space-y-3">
              {company.map((l) => (
                <li key={l.href}>
                  <Link href={l.href} className="text-sm text-white/70 transition-colors hover:text-white">
                    {l.label}
                  </Link>
                </li>
              ))}
              {contactEmail ? (
                <li>
                  <a href={`mailto:${contactEmail}`} className="text-sm text-white/70 transition-colors hover:text-white">
                    {contactEmail}
                  </a>
                </li>
              ) : null}
            </ul>
          </div>
        </div>
      </div>

      <div className="container-x relative">
        <div className="flex flex-col gap-6 rounded-2xl border border-white/10 bg-white/[0.03] p-6 sm:flex-row sm:items-center sm:justify-between sm:p-8">
          <div>
            <p className="text-lg font-semibold text-white">Got something worth building?</p>
            <p className="mt-1 text-sm text-white/60">Every enquiry is read by one of our engineers.</p>
          </div>
          <Link href="/contact" className="btn btn-lg btn-light shrink-0">
            Start a conversation
            <ArrowUpRight className="size-4" aria-hidden />
          </Link>
        </div>
      </div>

      <div className="container-x relative mt-12 flex flex-col gap-3 border-t border-white/10 py-6 text-xs text-white/45 sm:flex-row sm:items-center sm:justify-between">
        <p>
          © {year} {site.legalName}. All rights reserved.
        </p>
        <p>Innovation with Integrity · Transformation with Purpose</p>
      </div>
    </footer>
  );
}
