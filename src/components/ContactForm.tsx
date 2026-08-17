"use client";

import { useState, type FormEvent } from "react";
import { motion } from "framer-motion";
import { ArrowUpRight, Loader2 } from "lucide-react";
import { services } from "@/lib/data";

type Status = "idle" | "sending" | "sent";

const inputCls =
  "w-full rounded-lg border border-white/15 bg-white/[0.03] px-4 py-3 text-base text-white placeholder:text-zinc-600 transition-colors focus:border-lime-300 focus:outline-none light:border-black/15 light:bg-black/[0.04] light:text-zinc-950 light:placeholder:text-zinc-500 light:focus:border-lime-700";

function Field({ label, htmlFor, children }: { label: string; htmlFor: string; children: React.ReactNode }) {
  return (
    <div>
      <label htmlFor={htmlFor} className="label-mono mb-2 block">
        {label}
      </label>
      {children}
    </div>
  );
}

export default function ContactForm() {
  const [status, setStatus] = useState<Status>("idle");

  async function onSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    if (status !== "idle") return;
    setStatus("sending");
    // TODO: wire this to a real endpoint (e.g. /api/contact → email/CRM)
    // once real contact infrastructure is provided.
    await new Promise((r) => setTimeout(r, 1200));
    setStatus("sent");
  }

  if (status === "sent") {
    return (
      <motion.div
        initial={{ opacity: 0, y: 14 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
        className="flex h-full min-h-[420px] flex-col items-start justify-center rounded-2xl border border-white/10 p-10 light:border-black/15"
      >
        <span className="font-mono text-base font-semibold tracking-[0.2em] md:text-lg text-lime-300 light:text-lime-700">[ TRANSMISSION RECEIVED ]</span>
        <h3 className="display mt-5 text-3xl sm:text-4xl">
          Message <span className="text-accent">received.</span>
        </h3>
        <p className="mt-4 max-w-sm text-sm leading-relaxed text-zinc-400 light:text-zinc-600">
          Thanks for reaching out — we will get back to you within one business day.
        </p>
        <button type="button" onClick={() => setStatus("idle")} className="btn-ghost mt-9 !px-5 !py-3">
          Send another message
        </button>
      </motion.div>
    );
  }

  return (
    <form onSubmit={onSubmit} className="space-y-7 rounded-2xl border border-white/10 p-7 light:border-black/15 sm:p-10">
      <div className="grid gap-8 sm:grid-cols-2">
        <Field label="01 / Name" htmlFor="name">
          <input id="name" name="name" required placeholder="Jane Doe" className={inputCls} />
        </Field>
        <Field label="02 / Email" htmlFor="email">
          <input id="email" name="email" type="email" required placeholder="jane@company.com" className={inputCls} />
        </Field>
      </div>

      <div className="grid gap-8 sm:grid-cols-2">
        <Field label="03 / What do you need?" htmlFor="service">
          <select id="service" name="service" className={`${inputCls} appearance-none`} defaultValue="">
            <option value="" disabled className="bg-panel light:bg-white light:text-zinc-900">
              Select a service
            </option>
            {services.map((s) => (
              <option key={s.slug} value={s.slug} className="bg-panel light:bg-white light:text-zinc-900">
                {s.title}
              </option>
            ))}
            <option value="other" className="bg-panel light:bg-white light:text-zinc-900">
              Something else
            </option>
          </select>
        </Field>
        <Field label="04 / Budget range" htmlFor="budget">
          <select id="budget" name="budget" className={`${inputCls} appearance-none`} defaultValue="">
            <option value="" disabled className="bg-panel light:bg-white light:text-zinc-900">
              Select a range
            </option>
            {["< $10k", "$10k – $25k", "$25k – $75k", "$75k+", "Not sure yet"].map((b) => (
              <option key={b} value={b} className="bg-panel light:bg-white light:text-zinc-900">
                {b}
              </option>
            ))}
          </select>
        </Field>
      </div>

      <Field label="05 / Project details" htmlFor="message">
        <textarea
          id="message"
          name="message"
          required
          rows={4}
          placeholder="Tell us about the problem, the users and the deadline…"
          className={`${inputCls} resize-none`}
        />
      </Field>

      <button type="submit" disabled={status === "sending"} className="btn-primary w-full disabled:opacity-70">
        {status === "sending" ? (
          <>
            <Loader2 className="size-4 animate-spin" />
            Transmitting…
          </>
        ) : (
          <>
            Send message
            <ArrowUpRight className="size-4" />
          </>
        )}
      </button>
      <p className="text-center font-mono text-[10px] uppercase tracking-[0.2em] text-zinc-600">
        Reply within one business day — no lists, no spam
      </p>
    </form>
  );
}
