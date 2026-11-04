import Link from "next/link";
import { Quote } from "lucide-react";
import { getProject, isApprovedTestimonial, testimonials } from "@/lib/data";
import type { Testimonial } from "@/lib/types";
import { PlaceholderBadge } from "@/components/ui/Placeholder";
import Reveal from "@/components/ui/Reveal";
import SectionHeader from "@/components/ui/SectionHeader";

export function TestimonialCard({ t }: { t: Testimonial }) {
  const real = isApprovedTestimonial(t);
  const project = t.projectSlug ? getProject(t.projectSlug) : undefined;

  if (real) {
    return (
      <figure className="card flex h-full flex-col p-7">
        <Quote className="size-8 text-royal/30" aria-hidden />
        <blockquote className="mt-5 flex-1 text-[17px] leading-relaxed text-ink">&ldquo;{t.quote}&rdquo;</blockquote>
        <figcaption className="mt-7 border-t border-line pt-5">
          <p className="font-semibold text-ink">{t.author}</p>
          <p className="text-sm text-muted">{[t.role, t.company].filter(Boolean).join(", ")}</p>
        </figcaption>
      </figure>
    );
  }

  return (
    <figure data-placeholder className="placeholder-slot flex h-full flex-col p-7">
      <div className="flex items-center justify-between">
        <Quote className="size-8 text-royal/25" aria-hidden />
        <PlaceholderBadge>Testimonial</PlaceholderBadge>
      </div>
      <div className="mt-6 flex-1 space-y-2.5" aria-hidden>
        <div className="h-3 w-full rounded-full bg-ink/[0.07]" />
        <div className="h-3 w-[92%] rounded-full bg-ink/[0.07]" />
        <div className="h-3 w-[70%] rounded-full bg-ink/[0.07]" />
      </div>
      <p className="mt-5 text-sm text-muted">Client quote pending written approval.</p>
      <figcaption className="mt-6 flex items-center gap-3 border-t border-dashed border-royal/25 pt-5">
        <span className="size-10 rounded-full border border-dashed border-royal/35 bg-surface" aria-hidden />
        <div className="text-sm">
          <p className="font-semibold text-ink">Name, role</p>
          {project ? (
            <Link href={`/work/${project.slug}`} className="text-muted underline-offset-4 hover:text-royal hover:underline">
              {project.title}
            </Link>
          ) : (
            <p className="text-muted">Company</p>
          )}
        </div>
      </figcaption>
    </figure>
  );
}

export default function Testimonials() {
  // Only client-approved testimonials are shown; the section hides itself until one exists.
  const list = testimonials.filter(isApprovedTestimonial).slice(0, 3);
  if (list.length === 0) return null;

  return (
    <section className="section-y bg-surface" aria-labelledby="testimonials-title">
      <div className="container-x">
        <SectionHeader
          align="center"
          eyebrow="Testimonials"
          title={
            <span id="testimonials-title">
              In our clients&rsquo; <span className="accent">own words</span>.
            </span>
          }
          desc="Feedback appears here only after the client has approved it in writing."
        />
        <div className="mt-14 grid gap-5 md:grid-cols-3">
          {list.map((t, i) => (
            <Reveal key={t.id} delay={i * 0.05}>
              <TestimonialCard t={t} />
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
