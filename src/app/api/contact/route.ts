import nodemailer, { type Transporter } from "nodemailer";
import { normalizeContact, SERVICE_OPTIONS, validateContact, type ContactInput, type ContactResponse } from "@/lib/contact";

/*
  POST /api/contact
  ---------------------------------------------------------------------------
  Delivers contact-form submissions by email over SMTP with Nodemailer.

  Required environment variables (see .env.example):
    SMTP_HOST           e.g. smtp.gmail.com
    SMTP_USER           SMTP login (for Gmail: the full address)
    SMTP_PASS           SMTP password (for Gmail: a 16-character App Password)
    CONTACT_TO_EMAIL    Inbox(es) that receive enquiries, comma-separated

  Optional:
    SMTP_PORT           465 (default, SSL) or 587 (STARTTLS)
    CONTACT_FROM_EMAIL  Sender, defaults to "Hatify Labs <SMTP_USER>"
    CONTACT_AUTOREPLY   "true" to also send the visitor a short confirmation

  When required ones are missing the route answers 503 { code: "not_configured" }
  and the form tells the visitor plainly — it never pretends a message was sent.
*/

// Nodemailer needs Node.js APIs (net/tls), not the Edge runtime.
export const runtime = "nodejs";

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

// SMTP has no idempotency, so duplicates are dropped here: an identical submission
// within 24h (or one still being sent) is not sent again. Per-instance memory only.
const DEDUPE_MS = 24 * 60 * 60 * 1000;
const sent = new Map<string, number>();
const inFlight = new Map<string, Promise<void>>();

function alreadySent(key: string) {
  const at = sent.get(key);
  if (at && Date.now() - at < DEDUPE_MS) return true;
  if (at) sent.delete(key);
  return false;
}

function markSent(key: string) {
  if (sent.size > 5000) sent.clear();
  sent.set(key, Date.now());
}

let transporter: Transporter | null = null;

function getTransporter(host: string, user: string, pass: string) {
  if (transporter) return transporter;
  const port = Number(process.env.SMTP_PORT) || 465;
  transporter = nodemailer.createTransport({
    host,
    port,
    secure: port === 465, // 465 = implicit TLS; 587 upgrades with STARTTLS
    auth: { user, pass },
    connectionTimeout: 10_000,
    greetingTimeout: 10_000,
    socketTimeout: 15_000,
  });
  return transporter;
}

// The confirmation goes to an address anyone can type in, so it contains NO
// free text from the form (name, message…). Echoing input would let spammers
// use the form to mail their content to strangers — and Gmail flags exactly that.
function buildAutoReply(d: ContactInput) {
  const serviceLabel = SERVICE_OPTIONS.find((o) => o.value === d.service)?.label ?? "your project";
  const paragraphs = [
    "Hello,",
    `Thank you for contacting Hatify Labs about ${serviceLabel}. We have received your enquiry, and a member of our team will reply to this address, usually within one business day.`,
    "If you did not submit an enquiry on our website, you can safely ignore this email.",
    "Kind regards,\nThe Hatify Labs team",
  ];
  const text = paragraphs.join("\n\n");
  const html = `<!doctype html><html lang="en"><body style="margin:0;padding:24px;font-family:Arial,Helvetica,sans-serif;font-size:15px;line-height:1.6;color:#1a2233">${paragraphs
    .map((p) => `<p style="margin:0 0 16px">${escapeHtml(p).replace(/\n/g, "<br>")}</p>`)
    .join("")}</body></html>`;
  return { subject: "We received your enquiry", text, html };
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

  const host = process.env.SMTP_HOST;
  const user = process.env.SMTP_USER;
  const pass = process.env.SMTP_PASS;
  const to = process.env.CONTACT_TO_EMAIL?.split(",").map((s) => s.trim()).filter(Boolean);
  if (!host || !user || !pass || !to?.length) {
    console.error("[contact] Email delivery is not configured (SMTP_HOST / SMTP_USER / SMTP_PASS / CONTACT_TO_EMAIL).");
    return json({ ok: false, code: "not_configured" }, 503);
  }
  const from = process.env.CONTACT_FROM_EMAIL || `"Hatify Labs" <${user}>`;
  const mailer = getTransporter(host, user, pass);

  const key = await sha256(JSON.stringify(data));
  if (alreadySent(key)) return json({ ok: true }, 200);

  let delivery = inFlight.get(key);
  if (!delivery) {
    delivery = mailer
      .sendMail({ from, to, replyTo: data.email, ...buildEmail(data) })
      .then(() => markSent(key))
      .finally(() => inFlight.delete(key));
    inFlight.set(key, delivery);
  } else {
    // An identical request is already sending: share its result, don't send twice.
    try {
      await delivery;
      return json({ ok: true }, 200);
    } catch {
      return json({ ok: false, code: "delivery_failed" }, 502);
    }
  }

  try {
    await delivery;
  } catch (err) {
    console.error("[contact] Delivery error", err);
    return json({ ok: false, code: "delivery_failed" }, 502);
  }

  // Confirmation to the visitor is best-effort: the enquiry is already delivered,
  // so a failure here is logged but never reported to the visitor as an error.
  if (process.env.CONTACT_AUTOREPLY === "true") {
    try {
      await mailer.sendMail({ from, to: data.email, replyTo: to[0], ...buildAutoReply(data) });
    } catch (err) {
      console.error("[contact] Auto-reply failed", err);
    }
  }

  return json({ ok: true }, 200);
}
