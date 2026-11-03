import type { Metadata } from "next";
import { Clock, Mail, MapPin, Phone } from "lucide-react";
import ContactForm from "@/components/contact/ContactForm";
import FAQ from "@/components/contact/FAQ";
import { LinkedInIcon } from "@/components/ui/Icon";
import PageHero from "@/components/ui/PageHero";
import ContactVisual from "@/components/visuals/ContactVisual";
import { PendingText } from "@/components/ui/Placeholder";
import { contactEmail, faqs, linkedin, site } from "@/lib/data";

export const metadata: Metadata = {
  title: "Contact Us",
  description:
    "Start a project with Hatify Labs. Tell us about your AI, web, mobile, cloud or data challenge and get an honest view on scope, approach and timeline.",
  alternates: { canonical: "/contact" },
};

const faqLd = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: faqs.map((f) => ({ "@type": "Question", name: f.q, acceptedAnswer: { "@type": "Answer", text: f.a } })),
};

export default function ContactPage() {
  const { phone } = site.contact;
  const phoneValue = phone.verified ? phone.value : null;

  const channels = [
    {
      icon: Mail,
      label: "Email",
      content: contactEmail ? (
        <a href={`mailto:${contactEmail}`} className="link-underline font-semibold text-ink">
          {contactEmail}
        </a>
      ) : (
        <PendingText>Email address to be provided</PendingText>
      ),
    },
    {
      icon: Phone,
      label: "Phone",
      content: phoneValue ? (
        <a href={phone.href ?? `tel:${phoneValue.replace(/[^+\d]/g, "")}`} className="link-underline font-semibold text-ink">
          {phoneValue}
        </a>
      ) : (
        <PendingText>Phone number to be provided</PendingText>
      ),
    },
    {
      icon: LinkedInIcon,
      label: "LinkedIn",
      content: linkedin ? (
        <a href={linkedin} target="_blank" rel="noopener noreferrer" className="link-underline font-semibold text-ink">
          Hatify Labs on LinkedIn<span className="sr-only"> (opens in a new tab)</span>
        </a>
      ) : null,
    },
    { icon: MapPin, label: "Location", content: <span className="font-semibold text-ink">{site.location}</span> },
    { icon: Clock, label: "Response", content: <span className="text-body">{site.contact.responseTime}</span> },
  ].filter((c) => c.content);

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqLd) }} />

      <PageHero
        crumbs={[{ label: "Home", href: "/" }, { label: "Contact" }]}
        eyebrow="Contact"
        title={
          <>
            Let&rsquo;s talk about what you&rsquo;re <span className="accent">building</span>.
          </>
        }
        aside={<ContactVisual responseTime={site.contact.responseTime} />}
        desc="A new product, a modernisation or a system that needs rescuing. Tell us where things stand and we will map out a realistic way forward."
      />

      <section className="section-y !pt-14" aria-label="Contact form and details">
        <div className="container-x grid gap-10 lg:grid-cols-[minmax(0,1fr)_400px] lg:gap-14">
          <ContactForm linkedin={linkedin} email={contactEmail} />

          <aside className="space-y-5">
            <div className="card p-7">
              <h2 className="text-lg font-bold">Direct channels</h2>
              <ul className="mt-6 space-y-5">
                {channels.map((c) => (
                  <li key={c.label} className="flex gap-4">
                    <span className="flex size-10 shrink-0 items-center justify-center rounded-xl bg-tint text-royal">
                      <c.icon className="size-[18px]" aria-hidden />
                    </span>
                    <div className="min-w-0 text-[15px]">
                      <p className="text-xs font-medium uppercase tracking-wider text-muted">{c.label}</p>
                      <div className="mt-1">{c.content}</div>
                    </div>
                  </li>
                ))}
              </ul>
            </div>

            <div className="surface-sky rounded-[var(--radius-card)] p-7">
              <h2 className="text-lg font-bold">What happens next</h2>
              <ol className="mt-6 space-y-5">
                {site.nextSteps.map((s) => (
                  <li key={s.step} className="flex gap-4">
                    <span className="font-serif text-2xl italic leading-none text-royal">{s.step}</span>
                    <div>
                      <p className="font-semibold text-ink">{s.title}</p>
                      <p className="mt-1 text-sm leading-relaxed text-body">{s.desc}</p>
                    </div>
                  </li>
                ))}
              </ol>
            </div>
          </aside>
        </div>
      </section>

      <section className="section-y bg-white" aria-labelledby="faq-title">
        <div className="container-x grid gap-10 lg:grid-cols-12">
          <div className="lg:col-span-4">
            <p className="eyebrow">FAQ</p>
            <h2 id="faq-title" className="display mt-4 text-[clamp(1.9rem,3.6vw,2.8rem)]">
              Questions we hear <span className="accent">often</span>.
            </h2>
          </div>
          <div className="lg:col-span-8">
            <FAQ items={faqs} />
          </div>
        </div>
      </section>
    </>
  );
}
