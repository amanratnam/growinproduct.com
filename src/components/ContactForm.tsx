"use client";

import { useState } from "react";
import { services, site } from "@/lib/content";

type Status = "idle" | "sending" | "sent" | "error";

export default function ContactForm() {
  const [status, setStatus] = useState<Status>("idle");
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [message, setMessage] = useState("");

  async function onSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const form = event.currentTarget;
    const data = Object.fromEntries(new FormData(form).entries());

    setStatus("sending");
    setErrors({});
    setMessage("");

    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });
      const payload = await res.json().catch(() => ({}));

      if (res.ok) {
        setStatus("sent");
        form.reset();
        return;
      }
      if (res.status === 422 && payload.errors) {
        setErrors(payload.errors);
        setStatus("idle");
        return;
      }
      setStatus("error");
      setMessage(payload.error || "Something went wrong. Please email directly.");
    } catch {
      setStatus("error");
      setMessage("Couldn't reach the server. Please email directly.");
    }
  }

  if (status === "sent") {
    return (
      <div className="glass p-8 text-center sm:p-12">
        <p className="label text-accent">Message sent</p>
        <h2 className="display mt-4 text-[clamp(1.6rem,3.4vw,2.6rem)]">
          Thanks &mdash; I&apos;ll be in touch
        </h2>
        <p className="mx-auto mt-4 max-w-[38ch] leading-relaxed text-muted">
          It lands in my inbox directly, and the reply comes from me. Usually the
          same day.
        </p>
        <button
          type="button"
          onClick={() => setStatus("idle")}
          className="pill mt-8"
        >
          Send another
        </button>
      </div>
    );
  }

  return (
    <form onSubmit={onSubmit} className="glass p-6 sm:p-10" noValidate>
      <div className="flex items-baseline justify-between gap-4">
        <p className="label text-ink-40">Start a conversation</p>
        <p className="label flex items-center gap-2 text-ink-40">
          <span className="h-1.5 w-1.5 rounded-full bg-accent" aria-hidden />
          {site.availability}
        </p>
      </div>

      <div className="mt-7 grid gap-5 sm:grid-cols-2">
        <Field
          label="Your name"
          name="name"
          required
          placeholder="Jane Doe"
          error={errors.name}
        />
        <Field
          label="Company"
          name="company"
          placeholder="Optional"
          error={errors.company}
        />
      </div>

      <div className="mt-5 grid gap-5 sm:grid-cols-2">
        <Field
          label="Email"
          name="email"
          type="email"
          required
          placeholder="jane@company.com"
          error={errors.email}
        />
        <div>
          <label htmlFor="service" className="label block text-ink-40">
            Service <span className="text-accent">*</span>
          </label>
          <select
            id="service"
            name="service"
            required
            defaultValue=""
            className="glass-field mt-2.5"
            aria-invalid={Boolean(errors.service)}
          >
            <option value="" disabled>
              Select a service
            </option>
            {services.map((s) => (
              <option key={s.id} value={s.title}>
                {s.title}
              </option>
            ))}
          </select>
          {errors.service && <Err>{errors.service}</Err>}
        </div>
      </div>

      <div className="mt-5">
        <label htmlFor="problem" className="label block text-ink-40">
          Problem statement <span className="text-accent">*</span>
        </label>
        <textarea
          id="problem"
          name="problem"
          rows={5}
          required
          placeholder="What's fuzzy? Half-formed is fine — that's usually where the useful work is."
          className="glass-field mt-2.5 resize-none"
          aria-invalid={Boolean(errors.problem)}
        />
        {errors.problem && <Err>{errors.problem}</Err>}
      </div>

      {/* honeypot: hidden from people, irresistible to bots */}
      <div className="absolute h-0 w-0 overflow-hidden" aria-hidden>
        <label htmlFor="website">Leave this empty</label>
        <input id="website" name="website" tabIndex={-1} autoComplete="off" />
      </div>

      <div className="mt-8 flex flex-wrap items-center gap-4">
        <button type="submit" className="pill pill--solid" disabled={status === "sending"}>
          {status === "sending" ? "Sending…" : "Send it over"}
          {status !== "sending" && <span aria-hidden>&rarr;</span>}
        </button>
        <p className="text-xs leading-relaxed text-ink-40">
          Or email{" "}
          <a href={`mailto:${site.email}`} className="ulink text-ink">
            {site.email}
          </a>
        </p>
      </div>

      <p
        role="status"
        aria-live="polite"
        className={`mt-4 text-sm ${status === "error" ? "text-accent" : "sr-only"}`}
      >
        {message}
      </p>
    </form>
  );
}

function Err({ children }: { children: React.ReactNode }) {
  return <p className="mt-2 text-xs text-accent">{children}</p>;
}

function Field({
  label,
  name,
  type = "text",
  required = false,
  placeholder,
  error,
}: {
  label: string;
  name: string;
  type?: string;
  required?: boolean;
  placeholder?: string;
  error?: string;
}) {
  return (
    <div>
      <label htmlFor={name} className="label block text-ink-40">
        {label}
        {required && <span className="text-accent"> *</span>}
      </label>
      <input
        id={name}
        name={name}
        type={type}
        required={required}
        placeholder={placeholder}
        className="glass-field mt-2.5"
        aria-invalid={Boolean(error)}
      />
      {error && <Err>{error}</Err>}
    </div>
  );
}
