import { NextResponse } from "next/server";
import { services } from "@/lib/content";

/* Contact form endpoint.

   Delivery goes through Resend's REST API via plain fetch, so there's no SDK
   dependency to keep current. Set two environment variables in the hosting
   project:

     RESEND_API_KEY   - from resend.com
     CONTACT_FROM     - a verified sender on your Resend domain,
                        e.g. "Grow In Product <hello@growinproduct.com>"

   Without RESEND_API_KEY the route returns 503 and the form tells the visitor
   to email directly rather than pretending the message was sent. */

const TO = "aman.singh.ratnam@gmail.com";
const MAX = { name: 120, company: 160, email: 200, problem: 4000 } as const;

const VALID_SERVICES = new Set<string>(services.map((s) => s.title));

function clean(value: unknown, max: number) {
  return typeof value === "string" ? value.trim().slice(0, max) : "";
}

function escapeHtml(value: string) {
  return value
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;");
}

export async function POST(request: Request) {
  let payload: unknown;
  try {
    payload = await request.json();
  } catch {
    return NextResponse.json({ error: "Malformed request." }, { status: 400 });
  }

  const body = (payload ?? {}) as Record<string, unknown>;

  /* Honeypot: a field hidden from humans. Anything that fills it is a bot, so
     return success without sending, rather than teaching it what failed. */
  if (clean(body.website, 100)) {
    return NextResponse.json({ ok: true });
  }

  const name = clean(body.name, MAX.name);
  const company = clean(body.company, MAX.company);
  const email = clean(body.email, MAX.email);
  const problem = clean(body.problem, MAX.problem);
  const service = clean(body.service, 120);

  const errors: Record<string, string> = {};
  if (!name) errors.name = "Tell me who you are.";
  if (!email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
    errors.email = "A valid email, so I can reply.";
  }
  if (problem.length < 20) {
    errors.problem = "A sentence or two about the problem, please.";
  }
  if (!service || !VALID_SERVICES.has(service)) {
    errors.service = "Pick the closest service.";
  }
  if (Object.keys(errors).length) {
    return NextResponse.json({ errors }, { status: 422 });
  }

  const apiKey = process.env.RESEND_API_KEY;
  const from = process.env.CONTACT_FROM;
  if (!apiKey || !from) {
    return NextResponse.json(
      {
        error:
          "The contact form isn't connected to a mail service yet. Please email directly.",
      },
      { status: 503 }
    );
  }

  const subject = `New enquiry: ${service} — ${name}${company ? ` (${company})` : ""}`;
  const text = [
    `Name: ${name}`,
    `Company: ${company || "—"}`,
    `Email: ${email}`,
    `Service: ${service}`,
    "",
    "Problem statement:",
    problem,
  ].join("\n");

  const html = `
    <div style="font-family:system-ui,-apple-system,sans-serif;line-height:1.6;color:#0a0a0a">
      <h2 style="margin:0 0 16px">New enquiry via growinproduct.com</h2>
      <table cellpadding="0" cellspacing="0" style="border-collapse:collapse">
        <tr><td style="padding:4px 16px 4px 0"><strong>Name</strong></td><td>${escapeHtml(name)}</td></tr>
        <tr><td style="padding:4px 16px 4px 0"><strong>Company</strong></td><td>${escapeHtml(company) || "&mdash;"}</td></tr>
        <tr><td style="padding:4px 16px 4px 0"><strong>Email</strong></td><td>${escapeHtml(email)}</td></tr>
        <tr><td style="padding:4px 16px 4px 0"><strong>Service</strong></td><td>${escapeHtml(service)}</td></tr>
      </table>
      <h3 style="margin:24px 0 8px">Problem statement</h3>
      <p style="white-space:pre-wrap;margin:0">${escapeHtml(problem)}</p>
    </div>`;

  try {
    const res = await fetch("https://api.resend.com/emails", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${apiKey}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        from,
        to: [TO],
        /* so hitting reply in the inbox goes straight back to the sender */
        reply_to: email,
        subject,
        text,
        html,
      }),
    });

    if (!res.ok) {
      const detail = await res.text();
      console.error("Resend rejected the message:", res.status, detail);
      return NextResponse.json(
        { error: "The message couldn't be sent. Please email directly." },
        { status: 502 }
      );
    }
  } catch (err) {
    console.error("Contact route failed:", err);
    return NextResponse.json(
      { error: "The message couldn't be sent. Please email directly." },
      { status: 502 }
    );
  }

  return NextResponse.json({ ok: true });
}
