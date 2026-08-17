import type { Metadata } from "next";
import ContactForm from "@/components/ContactForm";
import FAQ from "@/components/FAQ";
import PageHeader from "@/components/PageHeader";
import Reveal from "@/components/Reveal";
import RevealText from "@/components/RevealText";
import { faqs, site } from "@/lib/data";

export const metadata: Metadata = {
  title: "Contact Us",
  description:
    "Start a project with Hatify Labs. Tell us about your AI, web, cloud or data challenge and get an honest read on scope, timeline and approach within one business day.",
  alternates: { canonical: "/contact" },
};

const faqLd = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: faqs.map((f) => ({
    "@type": "Question",
    name: f.q,
    acceptedAnswer: { "@type": "Answer", text: f.a },
  })),
};

export default function ContactPage() {
  // NOTE: contact details in src/data/site.json are placeholders — swap them
  // for the real ones and this page updates everywhere automatically.
  const rows = [
    { label: "Email", value: site.email, href: `mailto:${site.email}` },
    { label: "Phone", value: site.phone, href: `tel:${site.phone.replace(/[^+\d]/g, "")}` },
    { label: "Office", value: site.address },
    { label: "Response", value: "Within one business day" },
  ];

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqLd) }} />

      <PageHeader
        kicker="Contact"
        title="Let’s build something serious"
        accent="serious"
        desc="Whether it is a scoped build, a rescue mission or a long-term product team — the first conversation is free and refreshingly honest."
        image="/images/cta-collaboration.jpg"
      />

      <section data-theme="light" className="section !pt-14">
        <div className="container-x grid gap-14 lg:grid-cols-[minmax(0,420px)_1fr] lg:gap-20">
          <div>
            <Reveal>
              <span className="label-mono">/ Direct lines</span>
            </Reveal>
            <div className="mt-6 border-t border-white/10 light:border-black/10">
              {rows.map((r, i) => (
                <Reveal key={r.label} delay={i * 0.05}>
                  <div className="flex items-center justify-between gap-6 border-b border-white/10 py-5 light:border-black/10">
                    <span className="label-mono">{r.label}</span>
                    {r.href ? (
                      <a
                        href={r.href}
                        className="text-right font-mono text-sm text-white transition-colors hover:text-lime-300 light:text-zinc-950 light:hover:text-lime-700"
                      >
                        {r.value}
                      </a>
                    ) : (
                      <span className="text-right font-mono text-sm text-zinc-300 light:text-zinc-700">{r.value}</span>
                    )}
                  </div>
                </Reveal>
              ))}
            </div>
            <Reveal delay={0.25}>
              <p className="mt-5 font-mono text-[10px] uppercase leading-relaxed tracking-[0.15em] text-zinc-600">
                * Contact details are placeholders while we finalize the new office — the form and email both
                reach the team.
              </p>
            </Reveal>
            <Reveal delay={0.3}>
              <div className="mt-10 space-y-2">
                <span className="label-mono">/ Elsewhere</span>
                <div className="flex flex-wrap gap-2 pt-3">
                  {site.socials.map((s) => (
                    <a
                      key={s.label}
                      href={s.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="tag-mono transition-colors hover:!border-lime-700 hover:!text-lime-700"
                    >
                      {s.label} ↗
                    </a>
                  ))}
                </div>
              </div>
            </Reveal>
          </div>

          <Reveal delay={0.1}>
            <ContactForm />
          </Reveal>
        </div>
      </section>

      <section className="border-t border-white/10 py-20 md:py-28">
        <div className="container-x">
          <div className="flex items-baseline justify-between gap-4">
            <span className="font-mono text-base font-semibold tracking-[0.2em] md:text-lg text-lime-300">[FAQ]</span>
            <span className="label-mono">Asked a lot</span>
          </div>
          <h2 className="display mt-8 text-[clamp(2.4rem,5vw,4.5rem)]">
            <RevealText text="Questions we hear on repeat" accent="repeat" />
          </h2>
          <div className="mt-12">
            <FAQ />
          </div>
        </div>
      </section>
    </>
  );
}
