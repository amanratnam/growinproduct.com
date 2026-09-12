"use client";

import { useEffect, useRef } from "react";

/* ---------------------------------------------------------------------------
   A depth field of product-management vocabulary behind the contact form.

   Built with CSS 3D transforms rather than WebGL text: the words stay real,
   selectable, translatable text, there's no font to load into a GL context
   (the site's CSP pins font-src to 'self'), and a few dozen transformed spans
   are far cheaper than a canvas running a render loop.

   Each word sits at its own Z depth. Pointer movement parallaxes the whole
   field, and words nearer the camera move more, which is what sells the space
   as actually three-dimensional.
--------------------------------------------------------------------------- */

type Word = { text: string; x: number; y: number; z: number; size: number };

/* Hand-placed rather than random, so the composition is balanced and nothing
   ever lands behind the form's centre. */
const WORDS: Word[] = [
  /* Left field */
  { text: "Roadmap", x: -40, y: -34, z: 120, size: 1.45 },
  { text: "Problem statement", x: -45, y: 4, z: -60, size: 0.85 },
  { text: "Prioritisation", x: -37, y: 30, z: -20, size: 0.95 },
  { text: "Activation", x: -47, y: -14, z: 60, size: 1.05 },
  { text: "Instrumentation", x: -43, y: -24, z: -90, size: 0.75 },
  { text: "Time to value", x: -44, y: 20, z: 110, size: 1.1 },
  { text: "Trade-offs", x: -33, y: -46, z: 130, size: 1.2 },
  { text: "Hypothesis", x: -36, y: 44, z: 70, size: 1 },
  { text: "Discovery", x: -47, y: -18, z: 30, size: 0.9 },
  { text: "Cohorts", x: -48, y: 40, z: -50, size: 0.8 },
  { text: "Churn", x: -49, y: 12, z: 150, size: 1.3 },
  { text: "Scoping", x: -44, y: -38, z: -120, size: 0.75 },
  { text: "Win themes", x: -41, y: -4, z: 165, size: 1.25 },
  { text: "Stakeholders", x: -46, y: 38, z: 100, size: 0.95 },
  /* Right field */
  { text: "North star", x: 38, y: 14, z: 90, size: 1.3 },
  { text: "User research", x: 43, y: -10, z: -110, size: 0.8 },
  { text: "Jobs to be done", x: 31, y: 38, z: 30, size: 1 },
  { text: "Retention", x: 47, y: 30, z: -40, size: 0.9 },
  { text: "Velocity", x: 36, y: 2, z: 150, size: 1.25 },
  { text: "Backlog", x: 45, y: -28, z: 100, size: 1.15 },
  { text: "Ship it", x: 33, y: 46, z: 170, size: 1.5 },
  { text: "Guardrails", x: 45, y: -32, z: -70, size: 0.85 },
  { text: "Eval set", x: 48, y: 6, z: 40, size: 0.95 },
  { text: "Onboarding", x: 48, y: 22, z: -130, size: 0.75 },
  { text: "Unit economics", x: 41, y: -42, z: 60, size: 1.05 },
  { text: "Handoffs", x: 44, y: 8, z: 175, size: 1.35 },
  { text: "Feature flags", x: 46, y: 44, z: 110, size: 1 },
  { text: "Throughput", x: 49, y: -20, z: 20, size: 0.9 },
  /* Top and bottom bands — the centre column stays clear for the form */
  { text: "PRD", x: -8, y: -50, z: 160, size: 1.6 },
  { text: "Scope", x: 14, y: -52, z: -140, size: 0.8 },
  { text: "Acceptance criteria", x: -6, y: 52, z: -170, size: 0.75 },
  { text: "Automation", x: 10, y: 50, z: -100, size: 0.85 },
  { text: "Experiments", x: -16, y: -56, z: 40, size: 0.95 },
  { text: "Metrics", x: 4, y: 58, z: 120, size: 1.2 },
];

export default function KeywordField() {
  const fieldRef = useRef<HTMLDivElement>(null);
  const target = useRef({ x: 0, y: 0 });
  const current = useRef({ x: 0, y: 0 });

  useEffect(() => {
    const field = fieldRef.current;
    if (!field) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    const onMove = (e: PointerEvent) => {
      /* -1..1 across the viewport */
      target.current.x = (e.clientX / window.innerWidth) * 2 - 1;
      target.current.y = (e.clientY / window.innerHeight) * 2 - 1;
    };

    let frame = 0;
    const tick = () => {
      current.current.x += (target.current.x - current.current.x) * 0.055;
      current.current.y += (target.current.y - current.current.y) * 0.055;
      field.style.setProperty("--px", current.current.x.toFixed(4));
      field.style.setProperty("--py", current.current.y.toFixed(4));
      frame = requestAnimationFrame(tick);
    };

    window.addEventListener("pointermove", onMove, { passive: true });
    frame = requestAnimationFrame(tick);
    return () => {
      window.removeEventListener("pointermove", onMove);
      cancelAnimationFrame(frame);
    };
  }, []);

  return (
    <div className="kw-scene" aria-hidden>
      <div ref={fieldRef} className="kw-field">
        {WORDS.map((w, i) => (
          <span
            key={w.text}
            className="kw-word"
            style={
              {
                "--x": `${w.x}%`,
                "--y": `${w.y}%`,
                "--z": `${w.z}px`,
                /* nearer words parallax harder */
                "--depth": (w.z + 200) / 400,
                "--size": w.size,
                "--drift": `${16 + (i % 5) * 4}s`,
                "--drift-delay": `${-i * 1.3}s`,
              } as React.CSSProperties
            }
          >
            {w.text}
          </span>
        ))}
      </div>
    </div>
  );
}
