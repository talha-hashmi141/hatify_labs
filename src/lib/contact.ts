/* Shared contact-form contract — used by the client form and the API route,
   so validation rules can never drift apart. No dependencies on purpose. */

import servicesJson from "@/data/services.json";

export const BUDGETS = ["Under $10k", "$10k – $25k", "$25k – $75k", "$75k+", "Not sure yet"] as const;
export const TIMELINES = ["As soon as possible", "Within 1–3 months", "3–6 months", "Just exploring"] as const;

export const SERVICE_OPTIONS: { value: string; label: string }[] = [
  ...(servicesJson as { slug: string; title: string }[]).map((s) => ({ value: s.slug, label: s.title })),
  { value: "other", label: "Something else" },
];

export interface ContactInput {
  name: string;
  email: string;
  company: string;
  service: string;
  budget: string;
  timeline: string;
  message: string;
  consent: boolean;
  /** Honeypot — must stay empty. */
  website: string;
}

export type ContactField = Exclude<keyof ContactInput, "website">;
export type ContactErrors = Partial<Record<ContactField, string>>;

export const LIMITS = {
  name: { min: 2, max: 100 },
  company: { max: 120 },
  message: { min: 20, max: 5000 },
} as const;

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;

const str = (v: unknown) => (typeof v === "string" ? v.trim() : "");

export function normalizeContact(raw: Record<string, unknown>): ContactInput {
  return {
    name: str(raw.name),
    email: str(raw.email).toLowerCase(),
    company: str(raw.company),
    service: str(raw.service),
    budget: str(raw.budget),
    timeline: str(raw.timeline),
    message: str(raw.message),
    consent: raw.consent === true || raw.consent === "on" || raw.consent === "true",
    website: str(raw.website),
  };
}

export function validateContact(input: ContactInput): ContactErrors {
  const e: ContactErrors = {};

  if (!input.name) e.name = "Please enter your name.";
  else if (input.name.length < LIMITS.name.min) e.name = "Name looks too short.";
  else if (input.name.length > LIMITS.name.max) e.name = `Please keep your name under ${LIMITS.name.max} characters.`;

  if (!input.email) e.email = "Please enter your email address.";
  else if (!EMAIL_RE.test(input.email) || input.email.length > 254) e.email = "Please enter a valid email address.";

  if (input.company.length > LIMITS.company.max) e.company = `Please keep this under ${LIMITS.company.max} characters.`;

  if (!input.service) e.service = "Please choose what you need help with.";
  else if (!SERVICE_OPTIONS.some((o) => o.value === input.service)) e.service = "Please choose a service from the list.";

  if (input.budget && !(BUDGETS as readonly string[]).includes(input.budget)) e.budget = "Please choose a budget from the list.";
  if (input.timeline && !(TIMELINES as readonly string[]).includes(input.timeline))
    e.timeline = "Please choose a timeline from the list.";

  if (!input.message) e.message = "Please tell us a little about your project.";
  else if (input.message.length < LIMITS.message.min)
    e.message = `Please add a bit more detail (at least ${LIMITS.message.min} characters).`;
  else if (input.message.length > LIMITS.message.max)
    e.message = `Please keep this under ${LIMITS.message.max} characters.`;

  if (!input.consent) e.consent = "Please confirm we may use these details to reply to you.";

  return e;
}

/** API response contract. */
export type ContactResponse =
  | { ok: true }
  | { ok: false; code: "validation"; errors: ContactErrors }
  | { ok: false; code: "not_configured" | "rate_limited" | "delivery_failed" | "bad_request" };
