"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import SectionShell from "./SectionShell";

gsap.registerPlugin(ScrollTrigger);

/* ---------- compact mini visuals, replay on hover ---------- */

function StrategyVisual() {
  return (
    <svg viewBox="0 0 200 64" className="h-full w-full" aria-hidden>
      <path
        className="draw-path strategy-path"
        d="M10,52 C50,48 60,28 95,26 C130,24 140,12 185,8"
        fill="none"
        stroke="var(--accent)"
        strokeWidth="3"
        strokeLinecap="round"
      />
      <circle cx="185" cy="8" r="4" fill="var(--accent)" />
      <circle cx="185" cy="8" r="8" fill="var(--accent)" opacity="0.18" className="pulse-dot" />
      <circle cx="10" cy="52" r="3" fill="var(--foreground)" opacity="0.5" />
      <circle cx="95" cy="26" r="3" fill="var(--foreground)" opacity="0.5" />
    </svg>
  );
}

function AnalysisVisual() {
  const bars = [34, 52, 40, 66, 58, 82];
  return (
    <div className="flex h-full items-end justify-center gap-2 pb-1" aria-hidden>
      {bars.map((h, i) => (
        <div
          key={i}
          className={`bar-anim w-4 rounded-t ${i === bars.length - 1 ? "bg-accent" : "bg-foreground/[0.12]"}`}
          style={{ height: `${h}%`, animationDelay: `${i * 90}ms` }}
        />
      ))}
    </div>
  );
}

function PrdVisual() {
  const widths = ["w-11/12", "w-3/4", "w-1/2"];
  return (
    <div className="flex h-full flex-col justify-center gap-1.5 px-2" aria-hidden>
      <div className="flex items-center gap-1.5">
        <span className="h-2 w-2 rounded-[3px] bg-accent" />
        <div className="doc-line h-1.5 w-1/3 rounded bg-foreground/30" style={{ animationDelay: "0ms" }} />
      </div>
      {widths.map((w, i) => (
        <div
          key={i}
          className={`doc-line h-1 rounded bg-foreground/[0.1] ${w}`}
          style={{ animationDelay: `${120 + i * 110}ms` }}
        />
      ))}
    </div>
  );
}

function WorkflowVisual() {
  return (
    <svg viewBox="0 0 220 64" className="h-full w-full" aria-hidden>
      <path className="flow-line" d="M38,32 H92" stroke="var(--foreground)" strokeOpacity="0.3" strokeWidth="2" fill="none" />
      <path className="flow-line" d="M128,32 H182" stroke="var(--foreground)" strokeOpacity="0.3" strokeWidth="2" fill="none" />
      <rect className="wf-node wf-node-1" x="14" y="20" width="24" height="24" rx="6" fill="var(--accent-soft)" stroke="var(--accent)" strokeWidth="2" />
      <rect className="wf-node wf-node-2" x="97" y="20" width="24" height="24" rx="12" fill="white" stroke="var(--foreground)" strokeOpacity="0.4" strokeWidth="2" />
      <rect className="wf-node wf-node-3" x="180" y="20" width="24" height="24" rx="6" fill="var(--foreground)" />
      <path d="M188 32l3 3 6-7" stroke="white" strokeWidth="2" fill="none" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

function AiVisual() {
  return (
    <svg viewBox="0 0 200 64" className="h-full w-full" aria-hidden>
      {[
        [48, 16],
        [48, 48],
        [152, 16],
        [152, 48],
      ].map(([x, y], i) => (
        <g key={i} className="ai-node" style={{ animationDelay: `${i * 0.3}s` }}>
          <line x1={x} y1={y} x2="100" y2="32" stroke="var(--accent)" strokeOpacity="0.35" strokeWidth="1.5" />
          <circle cx={x} cy={y} r="4.5" fill="var(--foreground)" opacity="0.15" />
          <circle cx={x} cy={y} r="2.5" fill="var(--foreground)" opacity="0.5" />
        </g>
      ))}
      <circle cx="100" cy="32" r="11" fill="var(--accent)" opacity="0.15" className="pulse-dot" />
      <circle cx="100" cy="32" r="6.5" fill="var(--accent)" />
      <path d="M97.5 32l2 2 3.5-4" stroke="white" strokeWidth="1.6" fill="none" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

function LeadershipVisual() {
  return (
    <div className="flex h-full items-center justify-center" aria-hidden>
      <div className="flex -space-x-2">
        {["bg-foreground/20", "bg-foreground/35", "bg-accent", "bg-foreground/35", "bg-foreground/20"].map(
          (c, i) => (
            <div
              key={i}
              className={`lead-avatar flex h-8 w-8 items-center justify-center rounded-full border-2 border-white ${c} ${i === 2 ? "z-10 scale-125 text-white" : ""}`}
              style={{ animationDelay: `${Math.abs(i - 2) * 0.12}s` }}
            >
              {i === 2 && (
                <svg viewBox="0 0 16 16" className="h-3.5 w-3.5" fill="none">
                  <path d="M8 2l1.8 3.6L14 6.2l-3 2.9.7 4-3.7-1.9L4.3 13l.7-4-3-2.9 4.2-.6L8 2z" fill="currentColor" />
                </svg>
              )}
            </div>
          )
        )}
      </div>
    </div>
  );
}

const services = [
  {
    title: "Product Strategy",
    desc: "North-star definition, positioning and roadmaps that connect vision to outcomes.",
    visual: <StrategyVisual />,
    anim: { x: -50, rotate: -3 },
  },
  {
    title: "Business Analysis",
    desc: "Requirements, data deep-dives and opportunity sizing that turn ambiguity into decisions.",
    visual: <AnalysisVisual />,
    anim: { y: 60, scale: 0.9 },
  },
  {
    title: "PRD & Documentation",
    desc: "Crisp specs, user stories and acceptance criteria engineers actually want to read.",
    visual: <PrdVisual />,
    anim: { x: 50, rotate: 3 },
  },
  {
    title: "Workflow Design",
    desc: "Operational flows mapped, simplified and rebuilt, with fewer handoffs and faster cycles.",
    visual: <WorkflowVisual />,
    anim: { y: 60, rotate: -2 },
  },
  {
    title: "AI & Automation",
    desc: "Practical AI integrations and automation pipelines that remove busywork, not jobs.",
    visual: <AiVisual />,
    anim: { scale: 0.8, y: 30 },
  },
  {
    title: "Fractional Leadership",
    desc: "Senior product leadership embedded in your team, exactly as long as you need it.",
    visual: <LeadershipVisual />,
    anim: { x: -50, y: 30 },
  },
];

export default function Services() {
  const gridRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.utils.toArray<HTMLElement>(".service-card").forEach((card, i) => {
        const from = services[i]?.anim ?? { y: 50 };
        gsap.fromTo(
          card,
          { ...from, opacity: 0 },
          {
            x: 0,
            y: 0,
            rotate: 0,
            scale: 1,
            opacity: 1,
            duration: 0.9,
            ease: "power3.out",
            scrollTrigger: {
              trigger: card,
              start: "top 88%",
              onEnter: () => card.classList.add("in-view"),
            },
          }
        );

        const path = card.querySelector<SVGPathElement>(".draw-path");
        if (path) {
          const len = path.getTotalLength();
          gsap.fromTo(
            path,
            { strokeDasharray: len, strokeDashoffset: len },
            {
              strokeDashoffset: 0,
              duration: 1.2,
              ease: "power2.inOut",
              scrollTrigger: { trigger: card, start: "top 85%" },
            }
          );
        }
      });
    }, gridRef);
    return () => ctx.revert();
  }, []);

  return (
    <SectionShell
      id="services"
      eyebrow="What I do"
      title="Every layer of the product, handled."
      blurb="Six disciplines, one operator. Strategy through shipping, without the agency overhead. Hover a card to see it work."
    >
      <div ref={gridRef} className="grid gap-4 sm:grid-cols-2 xl:grid-cols-3">
        {services.map((s, i) => (
          <article key={s.title} className="service-card panel group flex flex-col p-4 will-change-transform">
            <div className="h-16 shrink-0 rounded-lg bg-foreground/[0.025] transition-colors duration-300 group-hover:bg-accent-soft/60">
              {s.visual}
            </div>
            <div className="mt-3 flex items-start justify-between gap-2">
              <h3 className="text-sm font-semibold tracking-tight">{s.title}</h3>
              <span className="font-mono text-[10px] text-muted/60">0{i + 1}</span>
            </div>
            <p className="mt-1.5 text-xs leading-relaxed text-muted">{s.desc}</p>
            <span className="mt-3 h-px w-6 bg-accent transition-all duration-500 group-hover:w-full" />
          </article>
        ))}
      </div>
    </SectionShell>
  );
}
