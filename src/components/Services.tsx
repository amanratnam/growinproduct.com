"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import SectionShell from "./SectionShell";

gsap.registerPlugin(ScrollTrigger);

/* ---------- mini visuals, one per service; each replays on hover ---------- */

function StrategyVisual() {
  return (
    <svg viewBox="0 0 200 90" className="h-24 w-full" aria-hidden>
      <path
        className="draw-path strategy-path"
        d="M10,75 C50,70 60,40 95,38 C130,36 140,18 185,12"
        fill="none"
        stroke="var(--accent)"
        strokeWidth="3"
        strokeLinecap="round"
      />
      <circle cx="185" cy="12" r="5" fill="var(--accent)" />
      <circle cx="185" cy="12" r="10" fill="var(--accent)" opacity="0.18" className="pulse-dot" />
      <circle cx="10" cy="75" r="3.5" fill="var(--foreground)" opacity="0.5" />
      <circle cx="95" cy="38" r="3.5" fill="var(--foreground)" opacity="0.5" />
    </svg>
  );
}

function AnalysisVisual() {
  const bars = [34, 52, 40, 66, 58, 82];
  return (
    <div className="flex h-24 items-end justify-center gap-3" aria-hidden>
      {bars.map((h, i) => (
        <div
          key={i}
          className={`bar-anim w-6 rounded-t-md ${i === bars.length - 1 ? "bg-accent" : "bg-foreground/[0.12]"}`}
          style={{ height: `${h}%`, animationDelay: `${i * 90}ms` }}
        />
      ))}
    </div>
  );
}

function PrdVisual() {
  const widths = ["w-11/12", "w-3/4", "w-5/6", "w-1/2", "w-2/3"];
  return (
    <div className="flex h-24 flex-col justify-center gap-2.5 px-2" aria-hidden>
      <div className="flex items-center gap-2">
        <span className="h-3 w-3 rounded-sm bg-accent" />
        <div className="doc-line h-2 w-1/3 rounded bg-foreground/30" style={{ animationDelay: "0ms" }} />
      </div>
      {widths.map((w, i) => (
        <div
          key={i}
          className={`doc-line h-1.5 rounded bg-foreground/[0.1] ${w}`}
          style={{ animationDelay: `${120 + i * 110}ms` }}
        />
      ))}
    </div>
  );
}

function WorkflowVisual() {
  return (
    <svg viewBox="0 0 220 90" className="h-24 w-full" aria-hidden>
      <path className="flow-line" d="M38,45 H92" stroke="var(--foreground)" strokeOpacity="0.3" strokeWidth="2" fill="none" />
      <path className="flow-line" d="M128,45 H182" stroke="var(--foreground)" strokeOpacity="0.3" strokeWidth="2" fill="none" />
      <rect className="wf-node wf-node-1" x="10" y="30" width="30" height="30" rx="8" fill="var(--accent-soft)" stroke="var(--accent)" strokeWidth="2" />
      <rect className="wf-node wf-node-2" x="95" y="30" width="30" height="30" rx="15" fill="white" stroke="var(--foreground)" strokeOpacity="0.4" strokeWidth="2" />
      <rect className="wf-node wf-node-3" x="180" y="30" width="30" height="30" rx="8" fill="var(--foreground)" />
      <path d="M190 45l4 4 7-8" stroke="white" strokeWidth="2" fill="none" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

function AiVisual() {
  return (
    <svg viewBox="0 0 200 90" className="h-24 w-full" aria-hidden>
      {[
        [40, 25],
        [40, 65],
        [160, 25],
        [160, 65],
      ].map(([x, y], i) => (
        <g key={i} className="ai-node" style={{ animationDelay: `${i * 0.3}s` }}>
          <line x1={x} y1={y} x2="100" y2="45" stroke="var(--accent)" strokeOpacity="0.35" strokeWidth="1.5" />
          <circle cx={x} cy={y} r="6" fill="var(--foreground)" opacity="0.15" />
          <circle cx={x} cy={y} r="3" fill="var(--foreground)" opacity="0.5" />
        </g>
      ))}
      <circle cx="100" cy="45" r="14" fill="var(--accent)" opacity="0.15" className="pulse-dot" />
      <circle cx="100" cy="45" r="8" fill="var(--accent)" />
      <path d="M97 45l2 2 4-4" stroke="white" strokeWidth="1.8" fill="none" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

function LeadershipVisual() {
  return (
    <div className="flex h-24 items-center justify-center" aria-hidden>
      <div className="flex -space-x-3">
        {["bg-foreground/20", "bg-foreground/35", "bg-accent", "bg-foreground/35", "bg-foreground/20"].map(
          (c, i) => (
            <div
              key={i}
              className={`lead-avatar flex h-12 w-12 items-center justify-center rounded-full border-2 border-white ${c} ${i === 2 ? "z-10 scale-125 text-white" : ""}`}
              style={{ animationDelay: `${Math.abs(i - 2) * 0.12}s` }}
            >
              {i === 2 && (
                <svg viewBox="0 0 16 16" className="h-5 w-5" fill="none">
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
    desc: "North-star definition, market positioning and roadmaps that connect vision to measurable outcomes.",
    visual: <StrategyVisual />,
    anim: { x: -60, rotate: -3 },
  },
  {
    title: "Business Analysis",
    desc: "Requirements, data deep-dives and opportunity sizing that turn ambiguity into decisions.",
    visual: <AnalysisVisual />,
    anim: { y: 80, scale: 0.9 },
  },
  {
    title: "PRD & Documentation",
    desc: "Crisp specs, user stories and acceptance criteria your engineers actually want to read.",
    visual: <PrdVisual />,
    anim: { x: 60, rotate: 3 },
  },
  {
    title: "Workflow Design",
    desc: "Operational flows mapped, simplified and rebuilt — fewer handoffs, faster cycle time.",
    visual: <WorkflowVisual />,
    anim: { y: 80, rotate: -2 },
  },
  {
    title: "AI & Automation",
    desc: "Practical AI integrations and automation pipelines that remove busywork, not jobs.",
    visual: <AiVisual />,
    anim: { scale: 0.8, y: 40 },
  },
  {
    title: "Fractional Product Leadership",
    desc: "Senior product leadership embedded in your team — at the stage you need, for as long as you need.",
    visual: <LeadershipVisual />,
    anim: { x: -60, y: 40 },
  },
];

export default function Services() {
  const gridRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.utils.toArray<HTMLElement>(".service-card").forEach((card, i) => {
        const from = services[i]?.anim ?? { y: 60 };
        gsap.fromTo(
          card,
          { ...from, opacity: 0 },
          {
            x: 0,
            y: 0,
            rotate: 0,
            scale: 1,
            opacity: 1,
            duration: 1,
            ease: "power3.out",
            scrollTrigger: {
              trigger: card,
              start: "top 85%",
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
              duration: 1.4,
              ease: "power2.inOut",
              scrollTrigger: { trigger: card, start: "top 80%" },
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
      title={
        <>
          Every layer of the product, handled.
        </>
      }
      blurb="Six disciplines, one operator. Strategy through shipping — without the agency overhead. Hover a card to see it work."
    >
      <div ref={gridRef} className="grid gap-6 sm:grid-cols-2">
        {services.map((s, i) => (
          <article key={s.title} className="service-card panel group flex flex-col p-7 will-change-transform">
            <div className="rounded-xl bg-foreground/[0.025] transition-colors duration-300 group-hover:bg-accent-soft/60">
              {s.visual}
            </div>
            <div className="mt-6 flex items-start justify-between gap-4">
              <h3 className="text-xl font-semibold tracking-tight">{s.title}</h3>
              <span className="font-mono text-xs text-muted/60">0{i + 1}</span>
            </div>
            <p className="mt-2.5 text-sm leading-relaxed text-muted">{s.desc}</p>
            <span className="mt-5 h-px w-8 bg-accent transition-all duration-500 group-hover:w-full" />
          </article>
        ))}
      </div>
    </SectionShell>
  );
}
