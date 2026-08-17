"use client";

import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowUpRight } from "lucide-react";
import { services } from "@/lib/data";
import SectionHeading from "./SectionHeading";

export default function ServicesSection({ index = "01" }: { index?: string }) {
  return (
    <section className="relative overflow-hidden pt-10 pb-20 md:pt-14 md:pb-28">
      {/* Atmosphere image — faint workspace texture in the dark */}
      <div aria-hidden className="pointer-events-none absolute inset-0 select-none">
        <Image
          src="/images/services-workspace.jpg"
          alt=""
          fill
          className="object-cover opacity-[0.07] mix-blend-lighten"
          style={{ maskImage: "linear-gradient(to bottom, transparent, black 25%, black 85%, transparent)" }}
          sizes="100vw"
        />
      </div>
      <div className="container-x relative">
        <SectionHeading
          index={index}
          label="Services — Index"
          title="Everything to ship serious software"
          accent="serious"
          desc="From generative AI and voice agents to multi-tenant platforms and HIPAA-conscious data layers — one team, full stack, no hand-offs."
        />

        <div className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {services.map((s, i) => {
            // Featured long card = neon; every other card = dark green
            const cardCls = s.featured
              ? "border-black/25 hover:border-lime-300 hover:!bg-[#0f0f0d]"
              : "border-lime-300/20 bg-[#1e2d0e] hover:border-lime-300 hover:bg-lime-300";
            const metaCls = s.featured
              ? "text-[#0c1202]/60 group-hover:text-lime-300/80"
              : "text-zinc-500 group-hover:text-black/60";
            const titleHoverCls = s.featured ? "group-hover:!text-lime-300" : "group-hover:!text-black";
            const excerptCls = s.featured
              ? "text-[#0c1202]/75 group-hover:text-zinc-400"
              : "text-zinc-300 group-hover:text-black/70";
            const exploreCls = s.featured
              ? "text-[#0c1202] group-hover:text-lime-300"
              : "text-lime-300/90 group-hover:text-black";
            return (
              <motion.div
                key={s.slug}
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-40px" }}
                transition={{ duration: 0.55, delay: (i % 3) * 0.07, ease: [0.22, 1, 0.36, 1] }}
                className={s.featured ? "sm:col-span-2" : undefined}
              >
                <Link
                  href={`/services/${s.slug}`}
                  data-theme={s.featured ? "lime" : undefined}
                  className={`group flex h-full flex-col rounded-2xl border p-6 transition-all duration-300 hover:-translate-y-1 md:p-7 ${cardCls}`}
                >
                  <div className="flex items-baseline justify-between gap-4">
                    <span className={`font-mono text-base font-semibold transition-colors duration-300 ${metaCls}`}>
                      /{String(i + 1).padStart(2, "0")}
                    </span>
                    <span className={`font-mono text-[10px] uppercase tracking-[0.2em] transition-colors duration-300 ${metaCls}`}>
                      [{s.tag}]
                    </span>
                  </div>
                  <h3 className={`display mt-5 text-2xl transition-colors duration-300 sm:text-3xl ${titleHoverCls}`}>
                    {s.title}
                  </h3>
                  <p className={`mt-2.5 flex-1 text-sm leading-relaxed transition-colors duration-300 ${excerptCls}`}>
                    {s.excerpt}
                  </p>
                  <span
                    className={`mt-6 inline-flex items-center gap-2 font-mono text-[11px] uppercase tracking-[0.2em] transition-colors duration-300 ${exploreCls}`}
                  >
                    Explore
                    <ArrowUpRight className="size-4 transition-transform duration-300 group-hover:rotate-45" />
                  </span>
                </Link>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
