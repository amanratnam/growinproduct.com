"use client";

import { useRef, useState } from "react";
import { motion } from "framer-motion";
import gsap from "gsap";

const EMAIL = "hello@growinproduct.com";

export default function ContactPanel() {
  const btnRef = useRef<HTMLButtonElement>(null);
  const [copied, setCopied] = useState(false);

  const magnet = (e: React.MouseEvent) => {
    const btn = btnRef.current;
    if (!btn) return;
    const rect = btn.getBoundingClientRect();
    gsap.to(btn, {
      x: (e.clientX - rect.left - rect.width / 2) * 0.25,
      y: (e.clientY - rect.top - rect.height / 2) * 0.3,
      duration: 0.4,
      ease: "power2.out",
    });
  };
  const release = () => {
    if (btnRef.current) gsap.to(btnRef.current, { x: 0, y: 0, duration: 0.6, ease: "elastic.out(1,0.5)" });
  };

  const copyEmail = async () => {
    try {
      await navigator.clipboard.writeText(EMAIL);
      setCopied(true);
      setTimeout(() => setCopied(false), 1800);
    } catch {
      // clipboard unavailable, the mailto link still works
    }
  };

  const onSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const data = new FormData(e.currentTarget);
    const name = String(data.get("name") || "");
    const company = String(data.get("company") || "");
    const message = String(data.get("message") || "");
    const subject = encodeURIComponent(`Project inquiry${company ? `, ${company}` : ""}`);
    const body = encodeURIComponent(`Hi,\n\n${message}\n\n${name}${company ? `\n${company}` : ""}`);
    window.location.href = `mailto:${EMAIL}?subject=${subject}&body=${body}`;
  };

  return (
    <div className="grid gap-14 lg:grid-cols-2 lg:gap-20">
      {/* left: pitch */}
      <div>
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-sm font-semibold uppercase tracking-widest text-accent"
        >
          Contact
        </motion.p>
        <motion.h1
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.08 }}
          className="mt-3 text-4xl font-bold tracking-tighter sm:text-5xl lg:text-6xl"
        >
          One conversation.
          <br />
          No theater.
        </motion.h1>
        <motion.p
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.16 }}
          className="mt-6 max-w-md text-lg leading-relaxed text-muted"
        >
          Bring the fuzzy problem. You&apos;ll get a straight answer on whether
          I can help, usually within a day.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.24 }}
          className="mt-10 space-y-5"
        >
          <div className="flex flex-wrap items-center gap-3">
            <a
              href={`mailto:${EMAIL}`}
              className="group relative inline-flex items-center gap-3 overflow-hidden rounded-full bg-foreground px-7 py-4 text-sm font-semibold text-white transition-transform duration-300 hover:scale-[1.03]"
            >
              <span className="relative z-10">{EMAIL}</span>
              <span className="absolute inset-0 -translate-x-full bg-accent transition-transform duration-500 ease-out group-hover:translate-x-0" />
            </a>
            <button
              onClick={copyEmail}
              className="rounded-full border border-line bg-white px-5 py-4 text-sm font-medium transition-all duration-300 hover:border-accent hover:text-accent-dark"
            >
              {copied ? "Copied ✓" : "Copy"}
            </button>
          </div>
          <p className="text-sm text-muted">
            Currently taking on <span className="font-semibold text-foreground">2 engagements</span> for Q3 2026.
          </p>
          <ul className="space-y-2 text-sm text-muted">
            {[
              "Fractional product leadership, 1 to 3 days a week",
              "Project-based strategy, analysis or AI builds",
              "Workshops and roadmap resets",
            ].map((line) => (
              <li key={line} className="flex items-center gap-2.5">
                <span className="h-1.5 w-1.5 rounded-full bg-accent" />
                {line}
              </li>
            ))}
          </ul>
        </motion.div>
      </div>

      {/* right: form */}
      <motion.form
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7, delay: 0.2 }}
        onSubmit={onSubmit}
        className="rounded-3xl border border-line bg-white p-8 shadow-[0_24px_60px_-30px_rgba(10,10,10,0.15)] sm:p-10"
      >
        <div className="space-y-5">
          <div>
            <label htmlFor="name" className="text-xs font-semibold uppercase tracking-widest text-muted">
              Name
            </label>
            <input
              id="name"
              name="name"
              required
              autoComplete="name"
              className="mt-2 w-full rounded-xl border border-line bg-white px-4 py-3 text-sm outline-none transition-all duration-300 focus:border-accent focus:shadow-[0_0_0_3px_rgba(16,185,129,0.15)]"
              placeholder="Ada Lovelace"
            />
          </div>
          <div>
            <label htmlFor="company" className="text-xs font-semibold uppercase tracking-widest text-muted">
              Company <span className="normal-case opacity-60">(optional)</span>
            </label>
            <input
              id="company"
              name="company"
              autoComplete="organization"
              className="mt-2 w-full rounded-xl border border-line bg-white px-4 py-3 text-sm outline-none transition-all duration-300 focus:border-accent focus:shadow-[0_0_0_3px_rgba(16,185,129,0.15)]"
              placeholder="Analytical Engines Inc."
            />
          </div>
          <div>
            <label htmlFor="message" className="text-xs font-semibold uppercase tracking-widest text-muted">
              What are you wrestling with?
            </label>
            <textarea
              id="message"
              name="message"
              required
              rows={5}
              className="mt-2 w-full resize-none rounded-xl border border-line bg-white px-4 py-3 text-sm outline-none transition-all duration-300 focus:border-accent focus:shadow-[0_0_0_3px_rgba(16,185,129,0.15)]"
              placeholder="Two sentences is plenty. What's the product, what's stuck?"
            />
          </div>
          <button
            ref={btnRef}
            type="submit"
            onMouseMove={magnet}
            onMouseLeave={release}
            className="group relative w-full overflow-hidden rounded-full bg-accent py-4 text-sm font-semibold text-white shadow-[0_16px_40px_-12px_rgba(16,185,129,0.6)] transition-shadow hover:shadow-[0_20px_50px_-10px_rgba(16,185,129,0.75)]"
          >
            <span className="relative z-10">Send it over ▸</span>
            <span className="absolute inset-0 -translate-x-full bg-accent-dark transition-transform duration-500 ease-out group-hover:translate-x-0" />
          </button>
          <p className="text-center text-xs text-muted/70">
            Opens your mail client, nothing is stored on this site.
          </p>
        </div>
      </motion.form>
    </div>
  );
}
