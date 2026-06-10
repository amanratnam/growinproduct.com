"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const stages = [
  {
    name: "Discover",
    icon: "🔍",
    desc: "Stakeholder interviews, data audits and market scans. We map what's actually happening before deciding what should.",
    detail: "User research · Analytics · Landscape",
  },
  {
    name: "Define",
    icon: "🎯",
    desc: "Problems get named, sized and prioritized. A sharp problem statement beats a hundred feature ideas.",
    detail: "Problem framing · Metrics · Priorities",
  },
  {
    name: "Design",
    icon: "✏️",
    desc: "Flows, specs and prototypes — designed with engineering constraints in the room, not discovered after.",
    detail: "PRDs · Flows · Prototypes",
  },
  {
    name: "Deliver",
    icon: "🚀",
    desc: "Tight build loops with weekly demos. Scope is managed ruthlessly so the date holds and quality doesn't slip.",
    detail: "Sprints · QA gates · Launch",
  },
  {
    name: "Scale",
    icon: "📈",
    desc: "Post-launch instrumentation, growth loops and automation so the product compounds without constant pushing.",
    detail: "Funnels · Experiments · Handoff",
  },
];

function Orb() {
  /* capsule the stage card bursts out of */
  return (
    <div className="orb pointer-events-none absolute left-1/2 top-1/2 z-20 h-16 w-16 -translate-x-1/2 -translate-y-1/2">
      <div className="relative h-full w-full overflow-hidden rounded-full border-[3px] border-foreground shadow-lg">
        <div className="absolute inset-x-0 top-0 h-1/2 bg-accent" />
        <div className="absolute inset-x-0 bottom-0 h-1/2 bg-white" />
        <div className="absolute inset-x-0 top-1/2 h-[5px] -translate-y-1/2 bg-foreground" />
        <div className="absolute left-1/2 top-1/2 h-5 w-5 -translate-x-1/2 -translate-y-1/2 rounded-full border-[3px] border-foreground bg-white" />
      </div>
    </div>
  );
}

export default function Process() {
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const mm = gsap.matchMedia();
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    mm.add("(min-width: 1024px)", () => {
      if (reduced) return;
      const slots = gsap.utils.toArray<HTMLElement>(".stage-slot");

      // start state: everything hidden
      slots.forEach((slot) => {
        gsap.set(slot.querySelector(".stage-card"), { scale: 0, opacity: 0, rotate: -10 });
        gsap.set(slot.querySelector(".orb"), { y: -160, scale: 0, opacity: 0 });
        gsap.set(slot.querySelector(".orb-flash"), { scale: 0, opacity: 0 });
      });
      gsap.set(".process-progress-fill", { scaleX: 0 });

      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top top",
          end: "+=" + slots.length * 900,
          pin: true,
          scrub: 0.6,
        },
      });

      slots.forEach((slot, i) => {
        const orb = slot.querySelector(".orb");
        const flash = slot.querySelector(".orb-flash");
        const card = slot.querySelector(".stage-card");

        tl.addLabel(`stage-${i}`);
        // ball drops in and bounces
        tl.to(orb, { y: 0, scale: 1, opacity: 1, duration: 0.7, ease: "bounce.out" });
        // wiggle — something inside wants out
        tl.to(orb, {
          keyframes: [
            { rotate: -16, duration: 0.1 },
            { rotate: 14, duration: 0.1 },
            { rotate: -10, duration: 0.1 },
            { rotate: 8, duration: 0.1 },
            { rotate: 0, duration: 0.08 },
          ],
        });
        // flash burst
        tl.to(flash, { scale: 3.2, opacity: 1, duration: 0.18, ease: "power2.in" });
        tl.to(flash, { opacity: 0, duration: 0.3 }, ">-0.02");
        // the stage erupts out, elastic — and stays
        tl.to(
          card,
          { scale: 1, opacity: 1, rotate: 0, duration: 0.9, ease: "elastic.out(1, 0.5)" },
          "<"
        );
        tl.to(orb, { scale: 0, opacity: 0, duration: 0.25, ease: "back.in(2)" }, "<+0.1");
        tl.to(
          ".process-progress-fill",
          { scaleX: (i + 1) / slots.length, duration: 0.4, ease: "power2.out" },
          "<"
        );
        // breathing room before the next capsule
        if (i < slots.length - 1) tl.to({}, { duration: 0.4 });
      });
      tl.addLabel("end");
    });

    // mobile / reduced motion: simple elastic pop per card, no pinning
    mm.add("(max-width: 1023px)", () => {
      gsap.utils.toArray<HTMLElement>(".stage-slot").forEach((slot) => {
        const card = slot.querySelector(".stage-card");
        gsap.set(slot.querySelector(".orb"), { opacity: 0 });
        gsap.fromTo(
          card,
          { scale: 0.4, opacity: 0, rotate: -8 },
          {
            scale: 1,
            opacity: 1,
            rotate: 0,
            duration: reduced ? 0.01 : 0.9,
            ease: "elastic.out(1, 0.55)",
            scrollTrigger: { trigger: slot, start: "top 85%" },
          }
        );
      });
      gsap.set(".process-progress-fill", { scaleX: 1 });
    });

    return () => mm.revert();
  }, []);

  return (
    <section ref={sectionRef} id="process" className="relative overflow-hidden bg-foreground/[0.018]">
      <div className="mx-auto grid min-h-screen max-w-7xl content-center gap-10 px-6 py-24 lg:grid-cols-[minmax(260px,1fr)_2.2fr] lg:gap-16 lg:px-12 lg:py-0">
        {/* left: title */}
        <div className="self-center">
          <p className="text-sm font-semibold uppercase tracking-widest text-accent">The game plan</p>
          <h2 className="mt-3 text-4xl font-bold tracking-tighter sm:text-5xl">
            Five stages.
            <br />
            Catch them all.
          </h2>
          <p className="mt-5 max-w-sm leading-relaxed text-muted">
            Every engagement runs the same five-stage loop. Keep scrolling —
            each stage breaks out of its capsule and stays in play.
          </p>
          <div className="mt-8 h-1.5 w-full max-w-[240px] overflow-hidden rounded-full bg-foreground/[0.08]">
            <div className="process-progress-fill h-full w-full origin-left rounded-full bg-accent" />
          </div>
        </div>

        {/* right: capsule slots */}
        <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 xl:grid-cols-3">
          {stages.map((s, i) => (
            <div key={s.name} className={`stage-slot relative ${i === 4 ? "sm:col-span-2 xl:col-span-1" : ""}`}>
              <Orb />
              <div
                className="orb-flash pointer-events-none absolute left-1/2 top-1/2 z-10 h-24 w-24 -translate-x-1/2 -translate-y-1/2 rounded-full bg-white"
                style={{ boxShadow: "0 0 80px 40px rgba(16,185,129,0.35)" }}
                aria-hidden
              />
              <div className="stage-card relative rounded-2xl border border-line bg-white p-6 shadow-sm will-change-transform">
                <div className="flex items-center justify-between">
                  <span className="flex h-11 w-11 items-center justify-center rounded-xl bg-accent-soft text-xl">
                    {s.icon}
                  </span>
                  <span className="font-mono text-xs text-muted/60">
                    0{i + 1}/0{stages.length}
                  </span>
                </div>
                <h3 className="mt-4 text-xl font-semibold tracking-tight">{s.name}</h3>
                <p className="mt-2 text-sm leading-relaxed text-muted">{s.desc}</p>
                <p className="mt-4 font-mono text-[10px] uppercase tracking-wider text-accent-dark">{s.detail}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
