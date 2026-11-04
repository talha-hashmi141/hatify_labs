import { normalizeContact, SERVICE_OPTIONS, validateContact, type ContactInput, type ContactResponse } from "@/lib/contact";

/*
  POST /api/contact
  ---------------------------------------------------------------------------
  Delivers contact-form submissions by email through the Resend HTTP API
  (https://resend.com/docs/api-reference/emails/send-email) — no SDK needed.

  Required environment variables (see .env.example):
    RESEND_API_KEY      API key from Resend
    CONTACT_TO_EMAIL    Inbox(es) that receive enquiries, comma-separated
    CONTACT_FROM_EMAIL  Verified sender, e.g. "Hatify Labs Website <website@hatifylabs.com>"

  Optional:
    CONTACT_AUTOREPLY   "true" to also send the visitor a short confirmation

  When they are missing the route answers 503 { code: "not_configured" } and
  the form tells the visitor plainly — it never pretends a message was sent.
*/

const MAX_BODY_BYTES = 20_000;
const WINDOW_MS = 10 * 60 * 1000;
const MAX_PER_WINDOW = 5;

// Best-effort, per-instance limiter. On serverless platforms each instance has
// its own memory, so pair this with a platform firewall rule for hard limits.
const hits = new Map<string, number[]>();

function rateLimited(key: string): boolean {
  const now = Date.now();
  const recent = (hits.get(key) ?? []).filter((t) => now - t < WINDOW_MS);
  recent.push(now);
  hits.set(key, recent);
  if (hits.size > 5000) hits.clear();
  return recent.length > MAX_PER_WINDOW;
}

function json(body: ContactResponse, status: number) {
  return Response.json(body, { status, headers: { "Cache-Control": "no-store" } });
}

const escapeHtml = (s: string) =>
  s.replace(/[&<>"']/g, (c) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" })[c]!);

// Strip control characters so user input can never break the subject line.
const oneLine = (s: string) => s.replace(/[\r\n\t]+/g, " ").trim();

async function sha256(input: string) {
  const buf = await crypto.subtle.digest("SHA-256", new TextEncoder().encode(input));
  return Array.from(new Uint8Array(buf), (b) => b.toString(16).padStart(2, "0")).join("");
}

interface ResendPayload {
  from: string;
  to: string[];
  subject: string;
  text: string;
  html: string;
  reply_to?: string;
}

async function sendViaResend(apiKey: string, payload: ResendPayload, idempotencyKey: string) {
  const res = await fetch("https://api.resend.com/emails", {
    method: "POST",
    headers: {
      Authorization: `Bearer ${apiKey}`,
      "Content-Type": "application/json",
      // Resend drops repeats of the same key for 24h — stops double submits sending twice.
      "Idempotency-Key": idempotencyKey,
    },
    body: JSON.stringify(payload),
    signal: AbortSignal.timeout(10_000),
  });
  if (!res.ok) throw new Error(`Resend responded ${res.status}: ${await res.text().catch(() => "")}`);
}

function buildAutoReply(d: ContactInput) {
  const first = d.name.split(/\s+/)[0];
  const text = [
    `Hi ${first},`,
    "Thanks for getting in touch with Hatify Labs. We've received your enquiry and will reply to this address, usually within one business day.",
    "For reference, here is what you sent:",
    d.message,
    "— The Hatify Labs team",
  ].join("\n\n");
  const html = `<div style="font-family:system-ui,sans-serif;font-size:15px;line-height:1.6;color:#1a2233"><p>Hi ${escapeHtml(
    first
  )},</p><p>Thanks for getting in touch with Hatify Labs. We've received your enquiry and will reply to this address, usually within one business day.</p><p style="color:#66738f">For reference, here is what you sent:</p><blockquote style="margin:0;padding:12px 16px;border-left:3px solid #d5dbe8;color:#3a4558;white-space:pre-wrap">${escapeHtml(
    d.message
  )}</blockquote><p>— The Hatify Labs team</p></div>`;
  return { subject: "We've received your enquiry — Hatify Labs", text, html };
}

function buildEmail(d: ContactInput) {
  const serviceLabel = SERVICE_OPTIONS.find((o) => o.value === d.service)?.label ?? d.service;
  const rows: [string, string][] = [
    ["Name", d.name],
    ["Email", d.email],
    ["Company", d.company || "—"],
    ["Service", serviceLabel],
    ["Budget", d.budget || "—"],
    ["Timeline", d.timeline || "—"],
  ];
  const text = `${rows.map(([k, v]) => `${k}: ${v}`).join("\n")}\n\n${d.message}`;
  const html = `<table cellpadding="6" style="font-family:system-ui,sans-serif;font-size:14px;border-collapse:collapse">${rows
    .map(([k, v]) => `<tr><td style="color:#66738f">${k}</td><td><strong>${escapeHtml(v)}</strong></td></tr>`)
    .join("")}</table><p style="font-family:system-ui,sans-serif;font-size:14px;white-space:pre-wrap">${escapeHtml(
    d.message
  )}</p>`;
  return { subject: oneLine(`New enquiry — ${serviceLabel} — ${d.name}`), text, html };
}

export async function POST(request: Request) {
  const length = Number(request.headers.get("content-length") ?? 0);
  if (length > MAX_BODY_BYTES) return json({ ok: false, code: "bad_request" }, 413);

  let raw: Record<string, unknown>;
  try {
    const parsed = await request.json();
    if (!parsed || typeof parsed !== "object" || Array.isArray(parsed)) throw new Error("not an object");
    raw = parsed as Record<string, unknown>;
  } catch {
    return json({ ok: false, code: "bad_request" }, 400);
  }

  const data = normalizeContact(raw);

  // Honeypot filled → silently accept so bots learn nothing, but send nothing.
  if (data.website) return json({ ok: true }, 200);

  const errors = validateContact(data);
  if (Object.keys(errors).length > 0) return json({ ok: false, code: "validation", errors }, 422);

  const ip = request.headers.get("x-forwarded-for")?.split(",")[0]?.trim() || request.headers.get("x-real-ip") || "unknown";
  if (rateLimited(ip)) return json({ ok: false, code: "rate_limited" }, 429);

  const apiKey = process.env.RESEND_API_KEY;
  const to = process.env.CONTACT_TO_EMAIL?.split(",").map((s) => s.trim()).filter(Boolean);
  const from = process.env.CONTACT_FROM_EMAIL;
  if (!apiKey || !to?.length || !from) {
    console.error("[contact] Email delivery is not configured (RESEND_API_KEY / CONTACT_TO_EMAIL / CONTACT_FROM_EMAIL).");
    return json({ ok: false, code: "not_configured" }, 503);
  }

  const key = await sha256(JSON.stringify([data.email, data.service, data.message]));
  try {
    await sendViaResend(apiKey, { from, to, reply_to: data.email, ...buildEmail(data) }, `enquiry-${key}`);
  } catch (err) {
    console.error("[contact] Delivery error", err);
    return json({ ok: false, code: "delivery_failed" }, 502);
  }

  // Confirmation to the visitor is best-effort: the enquiry is already delivered,
  // so a failure here is logged but never reported to the visitor as an error.
  if (process.env.CONTACT_AUTOREPLY === "true") {
    try {
      await sendViaResend(apiKey, { from, to: [data.email], reply_to: to[0], ...buildAutoReply(data) }, `autoreply-${key}`);
    } catch (err) {
      console.error("[contact] Auto-reply failed", err);
    }
  }

  return json({ ok: true }, 200);
}
