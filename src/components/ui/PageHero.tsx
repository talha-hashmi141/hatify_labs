import Link from "next/link";
import { ChevronRight } from "lucide-react";
import type { ReactNode } from "react";

interface Crumb {
  label: string;
  href?: string;
}

interface Props {
  eyebrow: string;
  title: ReactNode;
  desc?: ReactNode;
  crumbs: Crumb[];
  children?: ReactNode;
  aside?: ReactNode;
}

/** Inner-page header: breadcrumbs, eyebrow, H1 and lead, on the soft-white brand atmosphere. */
export default function PageHero({ eyebrow, title, desc, crumbs, children, aside }: Props) {
  return (
    <header className="relative overflow-hidden border-b border-line pt-24 pb-14 sm:pt-28 md:pt-32 md:pb-20">
      <div aria-hidden className="pointer-events-none absolute inset-0">
        <div className="bg-dots fade-mask-b absolute inset-0 opacity-70" />
        <div className="absolute -top-40 -right-32 h-[520px] w-[520px] rounded-full bg-electric/15 blur-[120px]" />
        <div className="absolute -bottom-48 -left-40 h-[420px] w-[420px] rounded-full bg-cyan/10 blur-[120px]" />
      </div>

      <div className="container-x relative">
        <nav aria-label="Breadcrumb">
          <ol className="flex flex-wrap items-center gap-1.5 text-sm text-muted">
            {crumbs.map((c, i) => (
              <li key={c.label} className="flex items-center gap-1.5">
                {i > 0 ? <ChevronRight className="size-3.5 text-faint" aria-hidden /> : null}
                {c.href ? (
                  <Link href={c.href} className="transition-colors hover:text-royal">
                    {c.label}
                  </Link>
                ) : (
                  <span aria-current="page" className="font-medium text-ink">
                    {c.label}
                  </span>
                )}
              </li>
            ))}
          </ol>
        </nav>

        <div className={`mt-8 grid gap-10 ${aside ? "lg:grid-cols-[minmax(0,1fr)_400px] lg:items-start" : ""}`}>
          <div className="max-w-3xl">
            <p className="eyebrow">{eyebrow}</p>
            <h1 className="display mt-4 text-[clamp(2.4rem,5.4vw,4.25rem)]">{title}</h1>
            {desc ? <p className="lead mt-6 max-w-2xl">{desc}</p> : null}
            {children ? <div className="mt-8">{children}</div> : null}
          </div>
          {aside ? <div>{aside}</div> : null}
        </div>
      </div>
    </header>
  );
}
