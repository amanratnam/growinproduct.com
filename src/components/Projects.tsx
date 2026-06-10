"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { motion, AnimatePresence } from "framer-motion";
import SectionShell from "./SectionShell";

gsap.registerPlugin(ScrollTrigger);

const projects = [
  {
    tag: "Healthcare SaaS",
    title: "Patient intake platform, rebuilt for scale",
    result: "−62% intake time",
    desc: "Redesigned the intake and triage flow for a multi-clinic healthcare SaaS — from 14 screens to 5, with automated insurance verification.",
    body: "A multi-clinic healthcare SaaS was losing patients mid-intake: 14 screens, duplicate questions and manual insurance checks. We shadowed front-desk staff, mapped every drop-off point, and rebuilt the flow around the three questions that actually gate triage. Insurance verification became an async background job with graceful fallbacks. The new flow shipped behind a feature flag clinic-by-clinic, with intake time and abandonment tracked from day one.",
    stats: [
      ["62%", "faster intake"],
      ["4.8★", "patient CSAT"],
      ["3 wks", "to first ship"],
    ],
    theme: "from-emerald-50 to-teal-50",
    accentBar: "bg-emerald-400",
  },
  {
    tag: "Workflow Optimization",
    title: "Ops workflow that ran itself",
    result: "31 hrs/week saved",
    desc: "Mapped a 40-step back-office process for a logistics firm, eliminated 17 manual handoffs and automated approvals with rule-based routing.",
    body: "A logistics firm's back office ran on tribal knowledge: 40 steps, 17 handoffs, three spreadsheets and a prayer. We documented the real process (not the wiki version), found that 70% of approvals followed predictable rules, and built rule-based routing with human escalation for the rest. The remaining manual steps got checklists and SLAs. Total rebuild time: eight weeks. Errors post-launch: zero.",
    stats: [
      ["31h", "saved weekly"],
      ["17", "handoffs removed"],
      ["0", "errors post-launch"],
    ],
    theme: "from-zinc-50 to-stone-100",
    accentBar: "bg-foreground",
  },
  {
    tag: "Product Strategy",
    title: "From feature factory to focused roadmap",
    result: "2.3× activation",
    desc: "Repositioned a B2B analytics product around one core workflow. Cut the roadmap by 60% and doubled down on the moments users valued.",
    body: "A B2B analytics startup shipped fast but retained poorly — the roadmap had 80 items and no spine. Usage data showed one workflow drove nearly all retained accounts. We repositioned the product around it, cut the roadmap 60%, and rewrote onboarding to reach that workflow in under five minutes. Activation went 2.3× in a quarter; 90-day retention followed.",
    stats: [
      ["2.3×", "activation lift"],
      ["60%", "roadmap cut"],
      ["+41%", "retention (90d)"],
    ],
    theme: "from-green-50 to-emerald-50",
    accentBar: "bg-accent",
  },
  {
    tag: "AI & Automation",
    title: "AI copilot for support operations",
    result: "78% auto-resolved",
    desc: "Designed and shipped an LLM-powered triage layer that drafts replies, routes edge cases and learns from agent corrections.",
    body: "Support volume was scaling faster than headcount. We built an LLM triage layer that classifies intent, drafts replies grounded in the help center, and routes anything low-confidence to humans — with every agent correction feeding the eval set. Shipped in six weeks with a kill switch and a weekly quality review. 78% of tickets now resolve without human touch; first-response time halved.",
    stats: [
      ["78%", "auto-resolved"],
      ["−54%", "first-response time"],
      ["6 wks", "concept to prod"],
    ],
    theme: "from-teal-50 to-cyan-50",
    accentBar: "bg-teal-400",
  },
];

function CardFace({ p }: { p: (typeof projects)[number] }) {
  return (
    <div className={`flex h-full flex-col overflow-hidden rounded-2xl border border-line bg-gradient-to-br shadow-xl ${p.theme}`}>
      <div className="relative flex-1 p-5">
        <div className="flex h-full flex-col rounded-xl border border-foreground/[0.07] bg-white/85 p-4 backdrop-blur">
          <div className="flex items-center gap-1.5">
            <span className="h-2 w-2 rounded-full bg-foreground/10" />
            <span className="h-2 w-2 rounded-full bg-foreground/10" />
            <span className="h-2 w-2 rounded-full bg-foreground/10" />
            <span className={`ml-auto h-1.5 w-12 rounded-full ${p.accentBar} opacity-70`} />
          </div>
          <div className="mt-3 grid flex-1 grid-cols-3 gap-2">
            <div className="col-span-2 space-y-2">
              <div className="h-1.5 w-3/4 rounded bg-foreground/[0.12]" />
              <div className="h-1.5 w-1/2 rounded bg-foreground/[0.08]" />
              <div className="h-12 rounded-lg bg-foreground/[0.05]">
                <svg viewBox="0 0 160 48" className="h-full w-full">
                  <polyline
                    points="0,40 25,33 50,37 75,24 100,27 125,14 160,6"
                    fill="none"
                    stroke="currentColor"
                    className="text-foreground/40"
                    strokeWidth="2"
                    strokeLinecap="round"
                  />
                </svg>
              </div>
            </div>
            <div className="space-y-2">
              <div className={`h-7 rounded-md ${p.accentBar} opacity-80`} />
              <div className="h-7 rounded-md bg-foreground/[0.06]" />
            </div>
          </div>
        </div>
        <span className="absolute right-4 top-4 rounded-full bg-white/95 px-3 py-1 text-[11px] font-semibold shadow-sm">
          {p.result}
        </span>
      </div>
      <div className="bg-white/90 px-5 py-4 backdrop-blur">
        <p className="text-[10px] font-semibold uppercase tracking-widest text-accent-dark">{p.tag}</p>
        <h3 className="mt-1 text-base font-semibold leading-snug tracking-tight">{p.title}</h3>
        <p className="mt-2 text-xs font-medium text-accent-dark">Click to open case study →</p>
      </div>
    </div>
  );
}

export default function Projects() {
  const stageRef = useRef<HTMLDivElement>(null);
  const ringRef = useRef<HTMLDivElement>(null);
  const angleRef = useRef(0);
  const targetRef = useRef(0);
  const draggingRef = useRef<{ startX: number; startAngle: number } | null>(null);
  const hoverRef = useRef(false);
  const [front, setFront] = useState(0);
  const [openIdx, setOpenIdx] = useState<number | null>(null);
  const openRef = useRef<number | null>(null);
  openRef.current = openIdx;

  const n = projects.length;
  const step = 360 / n;

  useEffect(() => {
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    let raf = 0;
    let last = performance.now();

    const loop = (now: number) => {
      const dt = Math.min((now - last) / 1000, 0.05);
      last = now;
      // slow idle rotation unless hovered, dragging, or a modal is open
      if (!reduced && !hoverRef.current && !draggingRef.current && openRef.current === null) {
        targetRef.current -= dt * 5;
      }
      angleRef.current += (targetRef.current - angleRef.current) * 0.09;
      if (ringRef.current) {
        ringRef.current.style.transform = `translateZ(-340px) rotateY(${angleRef.current}deg)`;
      }
      // which card faces the viewer
      const norm = ((-angleRef.current % 360) + 360) % 360;
      setFront(Math.round(norm / step) % n);
      raf = requestAnimationFrame(loop);
    };
    raf = requestAnimationFrame(loop);

    const ctx = gsap.context(() => {
      gsap.fromTo(
        stageRef.current,
        { opacity: 0, scale: 0.8, rotateX: 18 },
        {
          opacity: 1,
          scale: 1,
          rotateX: 0,
          duration: 1.2,
          ease: "power3.out",
          scrollTrigger: { trigger: stageRef.current, start: "top 80%" },
        }
      );
    }, stageRef);

    return () => {
      cancelAnimationFrame(raf);
      ctx.revert();
    };
  }, [n, step]);

  useEffect(() => {
    if (openIdx === null) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setOpenIdx(null);
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [openIdx]);

  const rotateTo = useCallback(
    (idx: number) => {
      // shortest path to put card idx in front
      const want = -idx * step;
      const cur = targetRef.current;
      const delta = ((want - cur) % 360 + 540) % 360 - 180;
      targetRef.current = cur + delta;
    },
    [step]
  );

  const onPointerDown = (e: React.PointerEvent) => {
    draggingRef.current = { startX: e.clientX, startAngle: targetRef.current };
    (e.currentTarget as HTMLElement).setPointerCapture(e.pointerId);
  };
  const onPointerMove = (e: React.PointerEvent) => {
    if (!draggingRef.current) return;
    const dx = e.clientX - draggingRef.current.startX;
    targetRef.current = draggingRef.current.startAngle + dx * 0.35;
  };
  const onPointerUp = (e: React.PointerEvent) => {
    if (!draggingRef.current) return;
    const moved = Math.abs(e.clientX - draggingRef.current.startX);
    draggingRef.current = null;
    // snap to nearest card
    targetRef.current = Math.round(targetRef.current / step) * step;
    if (moved < 6) {
      // treat as a click on the front card
      setOpenIdx(front);
    }
  };

  return (
    <>
      <SectionShell
        id="work"
        eyebrow="Selected work"
        title="Outcomes, not deliverables."
        blurb="Spin the carousel — drag it, or use the controls. Click a card to read the full case study. Details anonymized; the numbers aren't."
        tone="light"
      >
        <div
          ref={stageRef}
          className="relative select-none"
          style={{ perspective: "1400px" }}
          onMouseEnter={() => (hoverRef.current = true)}
          onMouseLeave={() => (hoverRef.current = false)}
        >
          <div
            className="relative mx-auto h-[420px] w-full max-w-[420px] cursor-grab touch-pan-y active:cursor-grabbing sm:h-[460px]"
            style={{ transformStyle: "preserve-3d" }}
            onPointerDown={onPointerDown}
            onPointerMove={onPointerMove}
            onPointerUp={onPointerUp}
            role="group"
            aria-label="3D project carousel"
          >
            <div
              ref={ringRef}
              className="absolute inset-0"
              style={{ transformStyle: "preserve-3d", transform: "translateZ(-340px)" }}
            >
              {projects.map((p, i) => (
                <div
                  key={p.title}
                  className="absolute left-1/2 top-1/2 h-[380px] w-[300px] -translate-x-1/2 -translate-y-1/2 transition-opacity duration-300 sm:h-[420px] sm:w-[330px]"
                  style={{
                    transform: `translate(-50%, -50%) rotateY(${i * step}deg) translateZ(340px)`,
                    transformStyle: "preserve-3d",
                    opacity: front === i ? 1 : 0.55,
                  }}
                >
                  <CardFace p={p} />
                </div>
              ))}
            </div>
          </div>

          {/* floor shadow */}
          <div
            className="pointer-events-none mx-auto -mt-6 h-8 w-72 rounded-[100%] bg-foreground/10 blur-xl"
            aria-hidden
          />

          {/* controls */}
          <div className="mt-6 flex items-center justify-center gap-4">
            <motion.button
              whileHover={{ scale: 1.1, x: -2 }}
              whileTap={{ scale: 0.85 }}
              onClick={() => rotateTo((front - 1 + n) % n)}
              className="flex h-11 w-11 items-center justify-center rounded-full border border-line bg-white shadow-sm transition-colors hover:border-accent hover:text-accent-dark"
              aria-label="Previous project"
            >
              ←
            </motion.button>
            <div className="flex gap-2">
              {projects.map((_, i) => (
                <button
                  key={i}
                  onClick={() => rotateTo(i)}
                  aria-label={`Go to project ${i + 1}`}
                  className={`h-2 rounded-full transition-all duration-300 ${
                    front === i ? "w-7 bg-accent" : "w-2 bg-foreground/15 hover:bg-foreground/30"
                  }`}
                />
              ))}
            </div>
            <motion.button
              whileHover={{ scale: 1.1, x: 2 }}
              whileTap={{ scale: 0.85 }}
              onClick={() => rotateTo((front + 1) % n)}
              className="flex h-11 w-11 items-center justify-center rounded-full border border-line bg-white shadow-sm transition-colors hover:border-accent hover:text-accent-dark"
              aria-label="Next project"
            >
              →
            </motion.button>
          </div>
        </div>
      </SectionShell>

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
              initial={{ scale: 0.7, y: 60, opacity: 0, rotateX: 12 }}
              animate={{ scale: 1, y: 0, opacity: 1, rotateX: 0 }}
              exit={{ scale: 0.8, y: 40, opacity: 0 }}
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
              <p className="text-xs font-semibold uppercase tracking-widest text-accent-dark">
                {projects[openIdx].tag}
              </p>
              <h3 className="mt-2 pr-10 text-2xl font-bold tracking-tight sm:text-3xl">
                {projects[openIdx].title}
              </h3>
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
