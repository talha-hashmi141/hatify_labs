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
  return { subject: `New enquiry — ${serviceLabel} — ${d.name}`, text, html };
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

  const email = buildEmail(data);
  try {
    const res = await fetch("https://api.resend.com/emails", {
      method: "POST",
      headers: { Authorization: `Bearer ${apiKey}`, "Content-Type": "application/json" },
      body: JSON.stringify({ from, to, reply_to: data.email, ...email }),
      signal: AbortSignal.timeout(10_000),
    });
    if (!res.ok) {
      console.error("[contact] Resend responded", res.status, await res.text().catch(() => ""));
      return json({ ok: false, code: "delivery_failed" }, 502);
    }
  } catch (err) {
    console.error("[contact] Delivery error", err);
    return json({ ok: false, code: "delivery_failed" }, 502);
  }

  return json({ ok: true }, 200);
}
