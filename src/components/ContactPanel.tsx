"use client";

import { useRef, useState } from "react";
import { motion } from "framer-motion";
import gsap from "gsap";

const EMAIL = "hello@growinproduct.com";

/* friendly greeter waving over the top edge of the invitation card */
function Greeter() {
  return (
    <svg viewBox="0 0 140 120" className="greeter h-full w-full" aria-hidden>
      {/* waving arm, behind the body */}
      <g className="greet-arm">
        <path d="M62 74 Q44 58 34 36" stroke="#0c8c66" strokeWidth="13" strokeLinecap="round" fill="none" />
        <circle cx="33" cy="32" r="9" fill="#f4d7c0" />
      </g>
      {/* torso hoodie, bottom edge hides behind the card border */}
      <path d="M46 120 q-3 -44 24 -50 q30 -4 30 50z" fill="#10b981" />
      {/* hood */}
      <path d="M56 74 q0 -10 20 -10 q18 0 18 10 q-10 -5 -18 -5 q-10 0 -20 5z" fill="#0c8c66" />
      {/* head */}
      <circle cx="78" cy="44" r="21" fill="#f4d7c0" />
      {/* hair */}
      <path d="M58 40 q2 -20 24 -18 q17 2 15 18 q-3 -9 -17 -10 q-16 -1 -22 10z" fill="#0a0a0a" />
      {/* eyes + smile */}
      <circle cx="72" cy="44" r="2.2" fill="#0a0a0a" />
      <circle cx="86" cy="44" r="2.2" fill="#0a0a0a" />
      <path d="M73 53 q6 5 12 0" stroke="#0a0a0a" strokeWidth="2" strokeLinecap="round" fill="none" />
      {/* blush */}
      <circle cx="66" cy="50" r="2.8" fill="#f0b7a0" opacity="0.7" />
      <circle cx="91" cy="50" r="2.8" fill="#f0b7a0" opacity="0.7" />
    </svg>
  );
}

/* floating celebration bits around the card, pure CSS, cheap on mobile */
function Confetti() {
  const bits = [
    { x: "6%", y: "12%", c: "bg-accent", s: "h-2 w-2 rounded-full", d: "5.2s", dl: "0s" },
    { x: "92%", y: "18%", c: "bg-accent/60", s: "h-3 w-3 rounded-full", d: "6.5s", dl: "0.4s" },
    { x: "12%", y: "72%", c: "bg-foreground/20", s: "h-2 w-2 rotate-45", d: "7s", dl: "0.8s" },
    { x: "88%", y: "78%", c: "bg-accent/40", s: "h-2.5 w-2.5 rotate-12", d: "5.8s", dl: "1.2s" },
    { x: "2%", y: "42%", c: "bg-accent/30", s: "h-4 w-1 rounded-full rotate-45", d: "6.2s", dl: "0.2s" },
    { x: "96%", y: "48%", c: "bg-foreground/15", s: "h-1 w-4 rounded-full -rotate-12", d: "7.4s", dl: "1s" },
    { x: "20%", y: "4%", c: "bg-accent/50", s: "h-1.5 w-1.5 rounded-full", d: "4.8s", dl: "0.6s" },
    { x: "76%", y: "2%", c: "bg-foreground/20", s: "h-2 w-2 rounded-sm rotate-6", d: "6.8s", dl: "1.4s" },
  ];
  return (
    <div className="pointer-events-none absolute inset-0" aria-hidden>
      {bits.map((b, i) => (
        <span
          key={i}
          className={`confetti-bit absolute ${b.c} ${b.s}`}
          style={{ left: b.x, top: b.y, "--dur": b.d, "--delay": b.dl } as React.CSSProperties}
        />
      ))}
    </div>
  );
}

const detailRows = [
  ["Who", "You, plus one senior product operator"],
  ["What", "Thirty honest minutes about your product"],
  ["When", "You'll hear back the same day, usually"],
  ["Dress code", "Come as you are, half-formed ideas welcome"],
];

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
    const message = String(data.get("message") || "");
    const subject = encodeURIComponent(`RSVP${name ? ` from ${name}` : ""}, let's build it together`);
    const body = encodeURIComponent(`Hi Aman,\n\n${message}\n\n${name}`);
    window.location.href = `mailto:${EMAIL}?subject=${subject}&body=${body}`;
  };

  return (
    <div className="relative mx-auto max-w-3xl">
      <Confetti />

      {/* the invitation card */}
      <motion.div
        initial={{ opacity: 0, y: 50, rotate: -1.2 }}
        animate={{ opacity: 1, y: 0, rotate: 0 }}
        transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
        className="relative"
      >
        {/* greeter pops out over the card's top edge */}
        <motion.div
          initial={{ y: 60, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.7, delay: 0.55, ease: [0.22, 1, 0.36, 1] }}
          className="absolute -top-[4.6rem] right-6 z-0 h-24 w-28 sm:-top-[5.6rem] sm:right-12 sm:h-28 sm:w-32"
          aria-hidden
        >
          <Greeter />
        </motion.div>

        <div className="relative z-10 overflow-hidden rounded-[1.75rem] border border-line bg-white shadow-[0_40px_90px_-40px_rgba(10,10,10,0.3)]">
          {/* self-drawing inner border, invitation style */}
          <svg className="pointer-events-none absolute inset-3 h-[calc(100%-1.5rem)] w-[calc(100%-1.5rem)]" aria-hidden>
            <motion.rect
              x="1"
              y="1"
              width="calc(100% - 2px)"
              height="calc(100% - 2px)"
              rx="20"
              fill="none"
              stroke="var(--accent)"
              strokeOpacity="0.35"
              strokeWidth="1.5"
              strokeDasharray="1"
              initial={{ pathLength: 0 }}
              animate={{ pathLength: 1 }}
              transition={{ duration: 1.6, delay: 0.4, ease: "easeInOut" }}
            />
          </svg>

          <div className="relative px-6 py-10 sm:px-12 sm:py-14">
            {/* header */}
            <div className="text-center">
              <motion.p
                initial={{ opacity: 0, letterSpacing: "0.1em" }}
                animate={{ opacity: 1, letterSpacing: "0.5em" }}
                transition={{ duration: 1, delay: 0.3 }}
                className="font-mono text-[11px] font-semibold uppercase text-accent"
              >
                You&apos;re invited
              </motion.p>
              <motion.h1
                initial={{ opacity: 0, y: 24 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.7, delay: 0.45 }}
                className="mx-auto mt-4 max-w-xl text-4xl font-bold tracking-tighter sm:text-5xl"
              >
                Come build something
                <br />
                great with me.
              </motion.h1>
              <motion.p
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.7, delay: 0.6 }}
                className="mx-auto mt-5 max-w-md text-base leading-relaxed text-muted"
              >
                Bring the messy workflow, the roadmap that got away, the AI
                idea you can&apos;t stop thinking about. I&apos;m Aman, and
                fuzzy problems are my favorite kind.
              </motion.p>
            </div>

            {/* invitation details */}
            <motion.dl
              initial="hidden"
              animate="show"
              variants={{ show: { transition: { staggerChildren: 0.12, delayChildren: 0.75 } } }}
              className="mx-auto mt-10 max-w-lg space-y-3"
            >
              {detailRows.map(([k, v]) => (
                <motion.div
                  key={k}
                  variants={{ hidden: { opacity: 0, x: -22 }, show: { opacity: 1, x: 0 } }}
                  transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
                  className="flex items-baseline gap-4 border-b border-line pb-3"
                >
                  <dt className="w-24 shrink-0 font-mono text-[10px] font-semibold uppercase tracking-widest text-accent-dark">
                    {k}
                  </dt>
                  <dd className="text-sm text-foreground/80">{v}</dd>
                </motion.div>
              ))}
            </motion.dl>

            {/* RSVP form */}
            <motion.form
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 1.15 }}
              onSubmit={onSubmit}
              className="mx-auto mt-10 max-w-lg space-y-4"
            >
              <div>
                <label htmlFor="name" className="text-xs font-semibold uppercase tracking-widest text-muted">
                  Your name
                </label>
                <input
                  id="name"
                  name="name"
                  required
                  autoComplete="name"
                  className="mt-2 w-full rounded-xl border border-line bg-white px-4 py-3 text-sm outline-none transition-all duration-300 focus:border-accent focus:shadow-[0_0_0_3px_rgba(16,185,129,0.15)]"
                  placeholder="The name on the invitation"
                />
              </div>
              <div>
                <label htmlFor="message" className="text-xs font-semibold uppercase tracking-widest text-muted">
                  What should we build?
                </label>
                <textarea
                  id="message"
                  name="message"
                  required
                  rows={4}
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
                <span className="relative z-10">Send my RSVP ▸</span>
                <span className="absolute inset-0 -translate-x-full bg-accent-dark transition-transform duration-500 ease-out group-hover:translate-x-0" />
              </button>
              <p className="text-center text-xs text-muted/70">
                Opens your mail app with everything pre-filled. Nothing is
                stored on this site.
              </p>
            </motion.form>

            {/* footer of the invite */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.7, delay: 1.4 }}
              className="mt-10 flex flex-col items-center gap-3 border-t border-line pt-8 text-center"
            >
              <p className="text-sm text-muted">
                Rather write it yourself?{" "}
                <a href={`mailto:${EMAIL}`} className="font-medium text-accent-dark underline decoration-accent/30 underline-offset-4 transition-colors hover:text-accent">
                  {EMAIL}
                </a>
                <button
                  onClick={copyEmail}
                  type="button"
                  className="ml-2 rounded-full border border-line px-3 py-1 text-xs font-medium transition-all duration-300 hover:border-accent hover:text-accent-dark"
                >
                  {copied ? "Copied ✓" : "Copy"}
                </button>
              </p>
              <p className="flex items-center gap-2 text-xs text-muted/80">
                <span className="h-1.5 w-1.5 animate-pulse rounded-full bg-accent" />
                2 seats left for Q3 2026, RSVP while they&apos;re warm.
              </p>
            </motion.div>
          </div>
        </div>
      </motion.div>
    </div>
  );
}
