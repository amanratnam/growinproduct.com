"use client";

import { useState } from "react";
import Reveal from "./Reveal";
import { contactRows, site } from "@/lib/content";

/* Field styled as a ruled line rather than a box, so the form sits on the same
   hairline system as every other section. */
function Field({
  name,
  label,
  type = "text",
  required = false,
  textarea = false,
  placeholder,
}: {
  name: string;
  label: string;
  type?: string;
  required?: boolean;
  textarea?: boolean;
  placeholder?: string;
}) {
  const shared =
    "w-full border-0 border-b border-rule bg-transparent pb-3 pt-2 text-base text-ink outline-none transition-colors duration-300 placeholder:text-ink-20 focus:border-accent";

  return (
    /* Baseline alignment pairs a one-line label with a one-line input, but a
       textarea's first baseline sits far below its top edge, so those rows
       align to the top instead. */
    <div
      className={`grid grid-cols-12 gap-x-4 gap-y-2 py-5 ${
        textarea ? "items-start" : "items-baseline"
      }`}
    >
      <label
        htmlFor={name}
        className={`label col-span-12 text-ink-40 md:col-span-3 ${textarea ? "md:pt-3" : ""}`}
      >
        {label}
        {required && <span className="text-accent"> *</span>}
      </label>
      <div className="col-span-12 md:col-span-9">
        {textarea ? (
          <textarea
            id={name}
            name={name}
            rows={4}
            required={required}
            placeholder={placeholder}
            className={`${shared} resize-none`}
          />
        ) : (
          <input
            id={name}
            name={name}
            type={type}
            required={required}
            placeholder={placeholder}
            className={shared}
          />
        )}
      </div>
    </div>
  );
}

export default function ContactForm() {
  const [copied, setCopied] = useState(false);

  const copyEmail = async () => {
    try {
      await navigator.clipboard.writeText(site.email);
      setCopied(true);
      window.setTimeout(() => setCopied(false), 1800);
    } catch {
      /* clipboard blocked; the mailto link still works */
    }
  };

  /* No backend on this site, so the form composes a mailto. Stated plainly
     below the button rather than surprising the visitor. */
  const onSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const data = new FormData(e.currentTarget);
    const name = String(data.get("name") || "");
    const company = String(data.get("company") || "");
    const message = String(data.get("message") || "");

    const subject = encodeURIComponent(
      `New enquiry${name ? ` from ${name}` : ""}${company ? ` · ${company}` : ""}`
    );
    const body = encodeURIComponent(`${message}\n\n— ${name}${company ? `, ${company}` : ""}`);
    window.location.href = `mailto:${site.email}?subject=${subject}&body=${body}`;
  };

  return (
    <div className="grid gap-x-8 gap-y-14 md:grid-cols-12">
      {/* left: the terms of the conversation */}
      <div className="md:col-span-4">
        <p className="label text-ink-40">The invitation</p>
        <dl className="mt-6 rule-t">
          {contactRows.map(([term, detail], i) => (
            <div key={term} className="rule-b">
              <Reveal delay={i * 0.05} className="py-5">
                <dt className="label text-accent">{term}</dt>
                <dd className="mt-2 max-w-[34ch] text-sm leading-relaxed text-ink">{detail}</dd>
              </Reveal>
            </div>
          ))}
        </dl>

        <div className="mt-8">
          <p className="label text-ink-40">Prefer email</p>
          <div className="mt-3 flex flex-wrap items-center gap-3">
            <a href={`mailto:${site.email}`} className="ulink text-sm text-ink">
              {site.email}
            </a>
            <button
              type="button"
              onClick={copyEmail}
              className="label text-ink-40 transition-colors duration-300 hover:text-accent"
            >
              {copied ? "Copied" : "Copy"}
            </button>
          </div>
          <p className="label mt-6 flex items-center gap-2 text-ink-40">
            <span className="h-1.5 w-1.5 rounded-full bg-accent" aria-hidden />
            {site.availability}
          </p>
        </div>
      </div>

      {/* right: the form itself */}
      <form onSubmit={onSubmit} className="md:col-span-8">
        <div className="rule-t">
          <Field name="name" label="Your name" required placeholder="Jane Doe" />
          <div className="rule-t" />
          <Field name="company" label="Company" placeholder="Optional" />
          <div className="rule-t" />
          <Field
            name="message"
            label="The problem"
            textarea
            required
            placeholder="Tell me what's fuzzy. Half-formed is fine."
          />
        </div>

        <div className="mt-8 flex flex-wrap items-center gap-4">
          <button type="submit" className="pill pill--solid">
            Send it over
            <span aria-hidden>→</span>
          </button>
          <p className="max-w-[36ch] text-xs leading-relaxed text-ink-40">
            This opens your email client with the message drafted. Nothing is
            stored or sent anywhere else.
          </p>
        </div>
      </form>
    </div>
  );
}
