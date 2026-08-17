import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import CTA from "@/components/CTA";
import PageHeader from "@/components/PageHeader";
import Reveal from "@/components/Reveal";
import { services } from "@/lib/data";

export const metadata: Metadata = {
  title: "Services",
  description:
    "Full-stack engineering services: generative AI & RAG systems, AI chatbots, voice agents, web development, multi-tenant SaaS, cloud & DevOps, secure databases with sharding and HIPAA-conscious design, automation and UI/UX.",
  alternates: { canonical: "/services" },
};

export default function ServicesPage() {
  return (
    <>
      <PageHeader
        kicker="Services"
        title="One team for the whole stack"
        accent="whole stack"
        desc="Strategy, design, engineering, AI and infrastructure under one roof — so nothing gets lost between vendors, and someone always owns the outcome."
        image="/images/services-workspace.jpg"
      />

      <section data-theme="light" className="relative overflow-hidden py-6 md:py-10">
        {/* Section background image — bars sit on it as translucent glass */}
        <div aria-hidden className="pointer-events-none absolute inset-0 select-none">
          <Image
            src="/images/services-workspace.jpg"
            alt=""
            fill
            className="object-cover opacity-25 mix-blend-multiply"
            style={{ maskImage: "linear-gradient(to bottom, black 5%, black 90%, transparent)" }}
            sizes="100vw"
          />
        </div>
        <div className="container-x relative space-y-3">
          {services.map((s, i) => (
            <Reveal key={s.slug} delay={Math.min(i * 0.03, 0.2)}>
              <Link
                href={`/services/${s.slug}`}
                className="group grid grid-cols-[auto_1fr_auto] items-start gap-5 rounded-xl border border-black/20 bg-[#0f0f0d]/80 px-4 py-7 backdrop-blur-md transition-all duration-300 hover:border-lime-300 hover:bg-lime-300 hover:px-6 sm:px-6 sm:hover:px-8 md:grid-cols-[90px_1fr_minmax(0,340px)_auto] md:gap-10 md:py-8"
              >
                <span className="pt-1 font-mono text-xs text-zinc-500 transition-colors duration-300 group-hover:text-black/60">
                  /{String(i + 1).padStart(2, "0")}
                </span>
                <div className="min-w-0">
                  <span className="font-mono text-[10px] uppercase tracking-[0.2em] text-zinc-500 transition-colors duration-300 group-hover:text-black/60">
                    [{s.tag}]
                  </span>
                  <h2 className="display mt-2 text-2xl !text-white transition-colors duration-300 group-hover:!text-black sm:text-3xl md:text-4xl">
                    {s.title}
                  </h2>
                  <p className="mt-3 max-w-xl text-sm leading-relaxed text-zinc-400 transition-colors duration-300 group-hover:text-black/70">
                    {s.excerpt}
                  </p>
                </div>
                <ul className="hidden space-y-1.5 pt-1 md:block">
                  {s.features.slice(0, 3).map((f) => (
                    <li
                      key={f.title}
                      className="font-mono text-[11px] uppercase tracking-[0.12em] text-zinc-500 transition-colors duration-300 group-hover:text-black/60"
                    >
                      + {f.title}
                    </li>
                  ))}
                </ul>
                <ArrowUpRight className="size-6 justify-self-end text-zinc-500 transition-all duration-300 group-hover:rotate-45 group-hover:text-black md:size-8" />
              </Link>
            </Reveal>
          ))}
        </div>
      </section>

      <CTA />
    </>
  );
}
