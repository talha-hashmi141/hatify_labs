"use client";

import { useRef, useState, type ChangeEvent, type FormEvent } from "react";
import { AlertCircle, ArrowRight, CheckCircle2, ChevronDown, Loader2 } from "lucide-react";
import {
  BUDGETS,
  LIMITS,
  SERVICE_OPTIONS,
  TIMELINES,
  normalizeContact,
  validateContact,
  type ContactErrors,
  type ContactField,
  type ContactInput,
  type ContactResponse,
} from "@/lib/contact";
import { LinkedInIcon } from "@/components/ui/Icon";

type Status =
  | { kind: "idle" }
  | { kind: "submitting" }
  | { kind: "success" }
  | { kind: "error"; code: "not_configured" | "rate_limited" | "delivery_failed" | "bad_request" | "network" };

const EMPTY: ContactInput = {
  name: "",
  email: "",
  company: "",
  service: "",
  budget: "",
  timeline: "",
  message: "",
  consent: false,
  website: "",
};

const ORDER: ContactField[] = ["name", "email", "company", "service", "budget", "timeline", "message", "consent"];

const inputBase =
  "block w-full rounded-xl border bg-white px-4 py-3 text-[15px] text-ink placeholder:text-faint transition-[border-color,box-shadow] focus:outline-none focus:ring-4";
const ok = "border-line-strong focus:border-royal focus:ring-royal/10";
const bad = "border-red-500 focus:border-red-500 focus:ring-red-500/10";

function Field({
  id,
  label,
  optional,
  error,
  hint,
  children,
}: {
  id: string;
  label: string;
  optional?: boolean;
  error?: string;
  hint?: React.ReactNode;
  children: React.ReactNode;
}) {
  return (
    <div>
      <div className="mb-2 flex items-baseline justify-between gap-3">
        <label htmlFor={id} className="text-sm font-semibold text-ink">
          {label}
          {optional ? <span className="ml-1.5 font-normal text-muted">(optional)</span> : <span className="ml-0.5 text-royal" aria-hidden>*</span>}
        </label>
        {hint}
      </div>
      {children}
      {error ? (
        <p id={`${id}-error`} className="mt-2 flex items-center gap-1.5 text-sm text-red-600">
          <AlertCircle className="size-4 shrink-0" aria-hidden />
          {error}
        </p>
      ) : null}
    </div>
  );
}

export default function ContactForm({ linkedin, email }: { linkedin: string | null; email: string | null }) {
  const [values, setValues] = useState<ContactInput>(EMPTY);
  const [errors, setErrors] = useState<ContactErrors>({});
  const [touched, setTouched] = useState<Partial<Record<ContactField, boolean>>>({});
  const [status, setStatus] = useState<Status>({ kind: "idle" });
  const formRef = useRef<HTMLFormElement>(null);
  const statusRef = useRef<HTMLDivElement>(null);

  const set = (field: keyof ContactInput) => (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const value = e.target instanceof HTMLInputElement && e.target.type === "checkbox" ? e.target.checked : e.target.value;
    const next = { ...values, [field]: value } as ContactInput;
    setValues(next);
    if (field !== "website" && touched[field]) {
      const all = validateContact(normalizeContact({ ...next }));
      setErrors((prev) => ({ ...prev, [field]: all[field] }));
    }
  };

  const blur = (field: ContactField) => () => {
    setTouched((t) => ({ ...t, [field]: true }));
    const all = validateContact(normalizeContact({ ...values }));
    setErrors((prev) => ({ ...prev, [field]: all[field] }));
  };

  const a11y = (field: ContactField) => ({
    id: field,
    name: field,
    "aria-invalid": errors[field] ? true : undefined,
    "aria-describedby": errors[field] ? `${field}-error` : undefined,
    onBlur: blur(field),
  });

  function focusFirstError(errs: ContactErrors) {
    const first = ORDER.find((f) => errs[f]);
    if (first) formRef.current?.querySelector<HTMLElement>(`[name="${first}"]`)?.focus();
  }

  async function onSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    if (status.kind === "submitting") return;

    const data = normalizeContact({ ...values });
    const errs = validateContact(data);
    setTouched(Object.fromEntries(ORDER.map((f) => [f, true])));
    setErrors(errs);
    if (Object.keys(errs).length) {
      focusFirstError(errs);
      return;
    }

    setStatus({ kind: "submitting" });
    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });
      const body = (await res.json().catch(() => null)) as ContactResponse | null;

      if (res.ok && body?.ok) {
        setStatus({ kind: "success" });
        setValues(EMPTY);
        setTouched({});
        requestAnimationFrame(() => statusRef.current?.focus());
        return;
      }
      if (body && !body.ok && body.code === "validation") {
        setErrors(body.errors);
        setStatus({ kind: "idle" });
        focusFirstError(body.errors);
        return;
      }
      setStatus({ kind: "error", code: body && !body.ok ? body.code : "delivery_failed" });
    } catch {
      setStatus({ kind: "error", code: "network" });
    }
    requestAnimationFrame(() => statusRef.current?.focus());
  }

  if (status.kind === "success") {
    return (
      <div ref={statusRef} tabIndex={-1} role="status" className="card flex min-h-[520px] flex-col items-start justify-center p-8 outline-none sm:p-12">
        <span className="flex size-14 items-center justify-center rounded-2xl bg-gradient-to-br from-royal to-electric text-white shadow-[var(--shadow-glow)]">
          <CheckCircle2 className="size-7" aria-hidden />
        </span>
        <h2 className="display mt-7 text-3xl">Thank you. Your message has been sent.</h2>
        <p className="mt-4 max-w-md text-[15px] leading-relaxed text-body">
          Our team has received your enquiry and will reply to the email address you provided.
        </p>
        <button type="button" onClick={() => setStatus({ kind: "idle" })} className="btn btn-secondary mt-8">
          Send another message
        </button>
      </div>
    );
  }

  const submitting = status.kind === "submitting";
  const msgLen = values.message.trim().length;

  return (
    <form ref={formRef} onSubmit={onSubmit} noValidate className="card relative p-6 sm:p-10" aria-describedby="form-note">
      {status.kind === "error" ? (
        <div ref={statusRef} tabIndex={-1} role="alert" className="mb-8 rounded-xl border border-amber-300 bg-amber-50 p-5 text-sm text-amber-950 outline-none">
          <p className="flex items-center gap-2 font-semibold">
            <AlertCircle className="size-4 shrink-0" aria-hidden />
            {status.code === "not_configured"
              ? "Online enquiries are not connected yet."
              : status.code === "rate_limited"
                ? "Too many messages in a short time."
                : status.code === "network"
                  ? "We couldn’t reach the server."
                  : "Your message could not be sent."}
          </p>
          <p className="mt-2 leading-relaxed text-amber-900">
            {status.code === "not_configured"
              ? "Your message has not been sent. Please contact us directly instead. Your details are still in the form."
              : status.code === "rate_limited"
                ? "Please wait a few minutes and try again."
                : "Your message has not been sent. Please check your connection and try again, or contact us directly."}
          </p>
          {(linkedin || email) && status.code !== "rate_limited" ? (
            <div className="mt-4 flex flex-wrap gap-2">
              {email ? (
                <a href={`mailto:${email}`} className="btn !min-h-9 border border-amber-300 bg-white !px-4 !py-1.5 text-amber-950 hover:border-amber-500">
                  Email {email}
                </a>
              ) : null}
              {linkedin ? (
                <a href={linkedin} target="_blank" rel="noopener noreferrer" className="btn !min-h-9 border border-amber-300 bg-white !px-4 !py-1.5 text-amber-950 hover:border-amber-500">
                  <LinkedInIcon className="size-3.5" />
                  Message us on LinkedIn
                </a>
              ) : null}
            </div>
          ) : null}
        </div>
      ) : null}

      <div className="grid gap-6 sm:grid-cols-2">
        <Field id="name" label="Full name" error={errors.name}>
          <input {...a11y("name")} autoComplete="name" value={values.name} onChange={set("name")} maxLength={LIMITS.name.max} placeholder="Your name" className={`${inputBase} ${errors.name ? bad : ok}`} />
        </Field>
        <Field id="email" label="Work email" error={errors.email}>
          <input {...a11y("email")} type="email" inputMode="email" autoComplete="email" value={values.email} onChange={set("email")} placeholder="you@company.com" className={`${inputBase} ${errors.email ? bad : ok}`} />
        </Field>
        <Field id="company" label="Company" optional error={errors.company}>
          <input {...a11y("company")} autoComplete="organization" value={values.company} onChange={set("company")} maxLength={LIMITS.company.max} placeholder="Company or organisation" className={`${inputBase} ${errors.company ? bad : ok}`} />
        </Field>
        <Field id="service" label="What do you need?" error={errors.service}>
          <div className="relative">
            <select {...a11y("service")} value={values.service} onChange={set("service")} className={`${inputBase} appearance-none pr-10 ${values.service ? "" : "text-faint"} ${errors.service ? bad : ok}`}>
              <option value="" disabled>
                Select a service
              </option>
              {SERVICE_OPTIONS.map((o) => (
                <option key={o.value} value={o.value} className="text-ink">
                  {o.label}
                </option>
              ))}
            </select>
            <ChevronDown className="pointer-events-none absolute right-3.5 top-1/2 size-4 -translate-y-1/2 text-muted" aria-hidden />
          </div>
        </Field>
        <Field id="budget" label="Budget" optional error={errors.budget}>
          <div className="relative">
            <select {...a11y("budget")} value={values.budget} onChange={set("budget")} className={`${inputBase} appearance-none pr-10 ${values.budget ? "" : "text-faint"} ${errors.budget ? bad : ok}`}>
              <option value="">Select a range</option>
              {BUDGETS.map((b) => (
                <option key={b} value={b} className="text-ink">
                  {b}
                </option>
              ))}
            </select>
            <ChevronDown className="pointer-events-none absolute right-3.5 top-1/2 size-4 -translate-y-1/2 text-muted" aria-hidden />
          </div>
        </Field>
        <Field id="timeline" label="Timeline" optional error={errors.timeline}>
          <div className="relative">
            <select {...a11y("timeline")} value={values.timeline} onChange={set("timeline")} className={`${inputBase} appearance-none pr-10 ${values.timeline ? "" : "text-faint"} ${errors.timeline ? bad : ok}`}>
              <option value="">Select a timeline</option>
              {TIMELINES.map((t) => (
                <option key={t} value={t} className="text-ink">
                  {t}
                </option>
              ))}
            </select>
            <ChevronDown className="pointer-events-none absolute right-3.5 top-1/2 size-4 -translate-y-1/2 text-muted" aria-hidden />
          </div>
        </Field>
      </div>

      <div className="mt-6">
        <Field
          id="message"
          label="Project details"
          error={errors.message}
          hint={
            <span className={`text-xs tabular-nums ${msgLen > LIMITS.message.max ? "text-red-600" : "text-muted"}`} aria-hidden>
              {msgLen}/{LIMITS.message.max}
            </span>
          }
        >
          <textarea
            {...a11y("message")}
            rows={6}
            value={values.message}
            onChange={set("message")}
            placeholder="What are you building, who is it for, and what does success look like?"
            className={`${inputBase} resize-y ${errors.message ? bad : ok}`}
          />
        </Field>
      </div>

      {/* Honeypot — hidden from people and assistive tech */}
      <div aria-hidden className="absolute -left-[9999px] h-0 w-0 overflow-hidden">
        <label htmlFor="website">Website</label>
        <input id="website" name="website" tabIndex={-1} autoComplete="off" value={values.website} onChange={set("website")} />
      </div>

      <div className="mt-6">
        <label className="flex items-start gap-3 text-sm leading-relaxed text-body">
          <input
            {...a11y("consent")}
            type="checkbox"
            checked={values.consent}
            onChange={set("consent")}
            className="mt-0.5 size-5 shrink-0 rounded border-line-strong accent-royal"
          />
          <span>I agree that Hatify Labs may use these details to respond to my enquiry.</span>
        </label>
        {errors.consent ? (
          <p id="consent-error" className="mt-2 flex items-center gap-1.5 text-sm text-red-600">
            <AlertCircle className="size-4 shrink-0" aria-hidden />
            {errors.consent}
          </p>
        ) : null}
      </div>

      <button type="submit" disabled={submitting} className="btn btn-lg btn-brand mt-8 w-full">
        {submitting ? (
          <>
            <Loader2 className="size-4 animate-spin" aria-hidden />
            Sending…
          </>
        ) : (
          <>
            Send enquiry
            <ArrowRight className="size-4" aria-hidden />
          </>
        )}
      </button>
      <p id="form-note" className="mt-4 text-center text-xs text-muted">
        Fields marked <span className="text-royal">*</span> are required. We never share your details.
      </p>
    </form>
  );
}
