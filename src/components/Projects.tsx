"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import SectionShell from "./SectionShell";

const projects = [
  {
    tag: "Healthcare SaaS",
    title: "Patient intake platform, rebuilt for scale",
    result: "−62% intake time",
    desc: "Intake and triage flow redesigned from 14 screens to 5, with automated insurance verification.",
    body: "A multi-clinic healthcare SaaS was losing patients mid-intake: 14 screens, duplicate questions and manual insurance checks. We shadowed front-desk staff, mapped every drop-off point, and rebuilt the flow around the three questions that actually gate triage. Insurance verification became an async background job with graceful fallbacks. The new flow shipped behind a feature flag clinic-by-clinic, with intake time and abandonment tracked from day one.",
    stats: [
      ["62%", "faster intake"],
      ["4.8★", "patient CSAT"],
      ["3 wks", "to first ship"],
    ],
    theme: "from-emerald-400/20 via-teal-300/10 to-transparent",
    bar: "bg-emerald-400",
  },
  {
    tag: "Workflow Optimization",
    title: "Ops workflow that ran itself",
    result: "31 hrs/week saved",
    desc: "A 40-step back-office process cut to rule-based routing, removing 17 manual handoffs.",
    body: "A logistics firm's back office ran on tribal knowledge: 40 steps, 17 handoffs, three spreadsheets and a prayer. We documented the real process (not the wiki version), found that 70% of approvals followed predictable rules, and built rule-based routing with human escalation for the rest. The remaining manual steps got checklists and SLAs. Total rebuild time: eight weeks. Errors post-launch: zero.",
    stats: [
      ["31h", "saved weekly"],
      ["17", "handoffs removed"],
      ["0", "errors post-launch"],
    ],
    theme: "from-zinc-400/20 via-stone-300/10 to-transparent",
    bar: "bg-foreground",
  },
  {
    tag: "Product Strategy",
    title: "From feature factory to focused roadmap",
    result: "2.3× activation",
    desc: "A B2B analytics product repositioned around one core workflow, roadmap cut by 60%.",
    body: "A B2B analytics startup shipped fast but retained poorly. The roadmap had 80 items and no spine. Usage data showed one workflow drove nearly all retained accounts. We repositioned the product around it, cut the roadmap 60%, and rewrote onboarding to reach that workflow in under five minutes. Activation went 2.3× in a quarter; 90-day retention followed.",
    stats: [
      ["2.3×", "activation lift"],
      ["60%", "roadmap cut"],
      ["+41%", "retention (90d)"],
    ],
    theme: "from-green-400/20 via-emerald-300/10 to-transparent",
    bar: "bg-accent",
  },
  {
    tag: "AI & Automation",
    title: "AI copilot for support operations",
    result: "78% auto-resolved",
    desc: "An LLM triage layer that drafts replies, routes edge cases and learns from corrections.",
    body: "Support volume was scaling faster than headcount. We built an LLM triage layer that classifies intent, drafts replies grounded in the help center, and routes anything low-confidence to humans, with every agent correction feeding the eval set. Shipped in six weeks with a kill switch and a weekly quality review. 78% of tickets now resolve without human touch; first-response time halved.",
    stats: [
      ["78%", "auto-resolved"],
      ["−54%", "first-response time"],
      ["6 wks", "concept to prod"],
    ],
    theme: "from-teal-400/20 via-cyan-300/10 to-transparent",
    bar: "bg-teal-400",
  },
];

function CardVisual({ bar, active }: { bar: string; active: boolean }) {
  return (
    <div className="relative h-36 overflow-hidden sm:h-44" aria-hidden>
      <div className="absolute inset-0 bg-foreground/[0.03]" />
      <div className="absolute inset-x-6 top-5 rounded-lg border border-foreground/[0.08] bg-white p-3 shadow-sm">
        <div className="flex items-center gap-1.5">
          <span className="h-1.5 w-1.5 rounded-full bg-foreground/15" />
          <span className="h-1.5 w-1.5 rounded-full bg-foreground/15" />
          <span className={`ml-auto h-1.5 w-10 rounded-full ${bar} opacity-70`} />
        </div>
        <div className="mt-2.5 flex gap-2">
          <div className="flex-1 space-y-1.5">
            <div className="h-1.5 w-3/4 rounded bg-foreground/[0.1]" />
            <div className="h-1.5 w-1/2 rounded bg-foreground/[0.07]" />
            <svg viewBox="0 0 120 30" className="mt-1 h-9 w-full">
              <polyline
                points="0,26 20,21 40,23 60,14 80,16 100,7 120,3"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeDasharray="200"
                strokeDashoffset={active ? "0" : "200"}
                className="text-accent transition-[stroke-dashoffset] duration-1000 ease-out"
              />
            </svg>
          </div>
          <div className="w-12 space-y-1.5">
            <div className={`h-5 rounded ${bar} opacity-80 ${active ? "animate-pulse" : ""}`} />
            <div className="h-5 rounded bg-foreground/[0.06]" />
          </div>
        </div>
      </div>
    </div>
  );
}

export default function Projects({ standalone = false }: { standalone?: boolean }) {
  const [index, setIndex] = useState(0);
  const [openIdx, setOpenIdx] = useState<number | null>(null);
  const hoverRef = useRef(false);
  const n = projects.length;

  const go = useCallback((i: number) => setIndex(((i % n) + n) % n), [n]);

  // autoplay unless hovered or modal open
  useEffect(() => {
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reduced) return;
    const t = setInterval(() => {
      if (!hoverRef.current && openIdx === null) go(index + 1);
    }, 4500);
    return () => clearInterval(t);
  }, [index, openIdx, go]);

  useEffect(() => {
    if (openIdx === null) return;
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && setOpenIdx(null);
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [openIdx]);

  const content = (
    <div
      onMouseEnter={() => (hoverRef.current = true)}
      onMouseLeave={() => (hoverRef.current = false)}
    >
      {/* track */}
      <div className="relative overflow-hidden py-4" style={{ touchAction: "pan-y" }}>
        <motion.div
          className="flex cursor-grab items-stretch active:cursor-grabbing"
          drag="x"
          dragConstraints={{ left: 0, right: 0 }}
          dragElastic={0.18}
          onDragEnd={(_, info) => {
            if (info.offset.x < -70 || info.velocity.x < -400) go(index + 1);
            else if (info.offset.x > 70 || info.velocity.x > 400) go(index - 1);
          }}
        >
          {projects.map((p, i) => {
            const offset = i - index;
            const active = i === index;
            return (
              <motion.article
                key={p.title}
                animate={{
                  x: `calc(${offset * 100}% + ${offset * 16}px)`,
                  scale: active ? 1 : 0.88,
                  opacity: Math.abs(offset) > 1 ? 0 : active ? 1 : 0.45,
                  rotateY: offset * -6,
                }}
                transition={{ type: "spring", stiffness: 220, damping: 28 }}
                className="left-0 top-0 h-full w-full"
                style={{ position: i === 0 ? "relative" : "absolute", transformPerspective: 1100 }}
              >
                <button
                  type="button"
                  onClick={() => active && setOpenIdx(i)}
                  onKeyDown={(e) => e.key === "Enter" && active && setOpenIdx(i)}
                  tabIndex={active ? 0 : -1}
                  aria-label={`Open case study: ${p.title}`}
                  className={`group block h-full w-full overflow-hidden rounded-2xl border bg-white text-left transition-shadow duration-500 ${
                    active
                      ? "border-accent/30 shadow-[0_30px_70px_-24px_rgba(10,10,10,0.25)]"
                      : "border-line shadow-sm"
                  }`}
                >
                  <div className={`bg-gradient-to-br ${p.theme}`}>
                    <CardVisual bar={p.bar} active={active} />
                  </div>
                  <div className="p-5 sm:p-6">
                    <div className="flex flex-wrap items-center justify-between gap-2">
                      <p className="text-[10px] font-semibold uppercase tracking-widest text-accent-dark">{p.tag}</p>
                      <span className="rounded-full bg-accent-soft px-2.5 py-1 text-[11px] font-semibold text-accent-dark">
                        {p.result}
                      </span>
                    </div>
                    <h3 className="mt-2 text-lg font-semibold leading-snug tracking-tight sm:text-xl">{p.title}</h3>
                    <p className="mt-1.5 text-sm leading-relaxed text-muted">{p.desc}</p>
                    <dl className="mt-4 grid grid-cols-3 gap-3 border-t border-line pt-4">
                      {p.stats.map(([value, label]) => (
                        <div key={label}>
                          <dd className="text-base font-bold tracking-tight sm:text-lg">{value}</dd>
                          <dt className="text-[9px] uppercase tracking-wider text-muted">{label}</dt>
                        </div>
                      ))}
                    </dl>
                    <p className={`mt-4 text-xs font-medium text-accent-dark transition-opacity duration-300 ${active ? "opacity-100" : "opacity-0"}`}>
                      Read the case study →
                    </p>
                  </div>
                </button>
              </motion.article>
            );
          })}
        </motion.div>
      </div>

      {/* controls */}
      <div className="mt-2 flex items-center justify-between">
        <div className="flex items-center gap-2">
          {projects.map((p, i) => (
            <button
              key={p.title}
              onClick={() => go(i)}
              aria-label={`Go to project: ${p.title}`}
              className="group flex h-8 items-center"
            >
              <span
                className={`h-1.5 rounded-full transition-all duration-400 ${
                  index === i ? "w-8 bg-accent" : "w-1.5 bg-foreground/15 group-hover:bg-foreground/35"
                }`}
              />
            </button>
          ))}
          <span className="ml-3 font-mono text-xs text-muted/60">
            {String(index + 1).padStart(2, "0")} / {String(n).padStart(2, "0")}
          </span>
        </div>
        <div className="flex gap-2">
          <motion.button
            whileHover={{ scale: 1.08, x: -2 }}
            whileTap={{ scale: 0.88 }}
            onClick={() => go(index - 1)}
            aria-label="Previous project"
            className="flex h-10 w-10 items-center justify-center rounded-full border border-line bg-white transition-colors hover:border-accent hover:text-accent-dark"
          >
            ←
          </motion.button>
          <motion.button
            whileHover={{ scale: 1.08, x: 2 }}
            whileTap={{ scale: 0.88 }}
            onClick={() => go(index + 1)}
            aria-label="Next project"
            className="flex h-10 w-10 items-center justify-center rounded-full border border-line bg-white transition-colors hover:border-accent hover:text-accent-dark"
          >
            →
          </motion.button>
        </div>
      </div>
    </div>
  );

  return (
    <>
      {standalone ? (
        <div className="mx-auto max-w-3xl px-6">{content}</div>
      ) : (
        <SectionShell
          id="work"
          eyebrow="Selected work"
          title="Outcomes, not deliverables."
          blurb="Swipe or use the controls. Open any card for the full case study. Details anonymized; the numbers aren't."
        >
          {content}
        </SectionShell>
      )}

      {/* case study modal */}
      <AnimatePresence>
        {openIdx !== null && (
          <motion.div
            className="fixed inset-0 z-[80] flex items-center justify-center p-4 sm:p-8"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setOpenIdx(null)}
          >
            <div className="absolute inset-0 bg-foreground/50 backdrop-blur-sm" />
            <motion.div
              role="dialog"
              aria-modal="true"
              aria-label={projects[openIdx].title}
              initial={{ scale: 0.8, y: 50, opacity: 0 }}
              animate={{ scale: 1, y: 0, opacity: 1 }}
              exit={{ scale: 0.85, y: 30, opacity: 0 }}
              transition={{ type: "spring", stiffness: 260, damping: 24 }}
              className="relative max-h-[85vh] w-full max-w-2xl overflow-y-auto rounded-3xl bg-white p-8 shadow-2xl sm:p-10"
              onClick={(e) => e.stopPropagation()}
            >
              <button
                onClick={() => setOpenIdx(null)}
                aria-label="Close case study"
                className="absolute right-5 top-5 flex h-9 w-9 items-center justify-center rounded-full bg-foreground/[0.06] transition-colors hover:bg-foreground hover:text-white"
              >
                ✕
              </button>
              <p className="text-xs font-semibold uppercase tracking-widest text-accent-dark">{projects[openIdx].tag}</p>
              <h3 className="mt-2 pr-10 text-2xl font-bold tracking-tight sm:text-3xl">{projects[openIdx].title}</h3>
              <span className="mt-4 inline-block rounded-full bg-accent-soft px-4 py-1.5 text-sm font-semibold text-accent-dark">
                {projects[openIdx].result}
              </span>
              <p className="mt-6 leading-relaxed text-foreground/80">{projects[openIdx].body}</p>
              <dl className="mt-8 grid grid-cols-3 gap-4 border-t border-line pt-6">
                {projects[openIdx].stats.map(([value, label]) => (
                  <div key={label}>
                    <dd className="text-2xl font-bold tracking-tight">{value}</dd>
                    <dt className="mt-0.5 text-[11px] uppercase tracking-wider text-muted">{label}</dt>
                  </div>
                ))}
              </dl>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
