"use client";

import { useEffect, useRef, type ReactNode } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { RadarIcon, CrosshairIcon, VectorPenIcon, RocketIcon, ChartUpIcon } from "./Icons";

gsap.registerPlugin(ScrollTrigger);

const stages: {
  name: string;
  icon: ReactNode;
  desc: string;
  detail: string;
}[] = [
  {
    name: "Discover",
    icon: <RadarIcon className="h-5 w-5" />,
    desc: "Stakeholder interviews, data audits and market scans. We map what's actually happening before deciding what should.",
    detail: "User research · Analytics · Landscape",
  },
  {
    name: "Define",
    icon: <CrosshairIcon className="h-5 w-5" />,
    desc: "Problems get named, sized and prioritized. A sharp problem statement beats a hundred feature ideas.",
    detail: "Problem framing · Metrics · Priorities",
  },
  {
    name: "Design",
    icon: <VectorPenIcon className="h-5 w-5" />,
    desc: "Flows, specs and prototypes, designed with engineering constraints in the room, not discovered after.",
    detail: "PRDs · Flows · Prototypes",
  },
  {
    name: "Deliver",
    icon: <RocketIcon className="h-5 w-5" />,
    desc: "Tight build loops with weekly demos. Scope is managed ruthlessly so the date holds and quality doesn't slip.",
    detail: "Sprints · QA gates · Launch",
  },
  {
    name: "Scale",
    icon: <ChartUpIcon className="h-5 w-5" />,
    desc: "Post-launch instrumentation, growth loops and automation so the product compounds without constant pushing.",
    detail: "Funnels · Experiments · Handoff",
  },
];

/* rear-view car sitting on the road */
function Car() {
  return (
    <svg viewBox="0 0 160 90" className="w-36 sm:w-44" aria-hidden>
      {/* glow under car */}
      <ellipse cx="80" cy="84" rx="62" ry="7" fill="rgba(16,185,129,0.25)" />
      {/* wheels */}
      <rect x="18" y="62" width="22" height="20" rx="6" fill="#0a0f0d" stroke="#10b981" strokeWidth="1.5" />
      <rect x="120" y="62" width="22" height="20" rx="6" fill="#0a0f0d" stroke="#10b981" strokeWidth="1.5" />
      {/* body */}
      <path
        d="M22 66 q-2 -18 8 -22 l8 -16 q2 -5 8 -5 h68 q6 0 8 5 l8 16 q10 4 8 22 q0 6 -6 6 h-104 q-6 0 -6 -6z"
        fill="#0d1411"
        stroke="#10b981"
        strokeWidth="2"
      />
      {/* rear window */}
      <path d="M44 44 l6 -14 q1 -3 5 -3 h50 q4 0 5 3 l6 14 z" fill="#10241c" stroke="#10b981" strokeWidth="1.5" opacity="0.9" />
      {/* tail lights */}
      <rect className="tail-light" x="30" y="52" width="22" height="6" rx="3" fill="#34d399" />
      <rect className="tail-light" x="108" y="52" width="22" height="6" rx="3" fill="#34d399" />
      {/* plate */}
      <rect x="64" y="56" width="32" height="10" rx="2" fill="#0a0f0d" stroke="rgba(255,255,255,0.3)" />
      <text x="80" y="64" textAnchor="middle" fontSize="7" fill="rgba(255,255,255,0.7)" fontFamily="monospace">
        GIP-01
      </text>
    </svg>
  );
}

export default function Process() {
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const mm = gsap.matchMedia();
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    mm.add("(min-width: 1024px)", () => {
      if (reduced) return;

      const signs = gsap.utils.toArray<HTMLElement>(".pitstop-sign");
      const docks = gsap.utils.toArray<HTMLElement>(".dock-card");

      signs.forEach((s) => gsap.set(s, { xPercent: -50, yPercent: -50, scale: 0.04, opacity: 0, x: 0, y: 0 }));
      docks.forEach((d) => gsap.set(d, { scale: 0, opacity: 0, y: 24 }));
      gsap.set(".road-progress-fill", { scaleX: 0 });

      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top top",
          end: "+=" + stages.length * 850,
          pin: true,
          scrub: 0.5,
        },
      });

      // road rushing under the car for the whole drive
      tl.to(".road-surface", { backgroundPosition: "50% 2600px, 0 2600px", ease: "none", duration: stages.length * 2.6 }, 0);

      stages.forEach((_, i) => {
        const side = i % 2 === 0 ? 1 : -1; // alternate roadside
        const sign = signs[i];
        const dock = docks[i];
        const at = i * 2.6;

        // sign appears at the horizon and races toward the viewer
        tl.to(sign, { opacity: 1, scale: 0.32, x: side * 70, y: -30, duration: 0.9, ease: "power1.in" }, at + 0.3);
        tl.to(sign, { scale: 1.25, x: side * 430, y: 180, duration: 0.85, ease: "power2.in" }, at + 1.2);
        tl.to(sign, { opacity: 0, scale: 1.5, duration: 0.2 }, at + 2.0);
        // car dodges slightly as the pitstop flies past
        tl.to(".car-rig", { x: side * -26, rotate: side * -2, duration: 0.4, ease: "power2.out" }, at + 1.3);
        tl.to(".car-rig", { x: 0, rotate: 0, duration: 0.6, ease: "power2.inOut" }, at + 1.8);
        // stage docks into the collected stack and stays
        tl.to(dock, { scale: 1, opacity: 1, y: 0, duration: 0.7, ease: "elastic.out(1, 0.6)" }, at + 1.9);
        tl.to(".road-progress-fill", { scaleX: (i + 1) / stages.length, duration: 0.4, ease: "power2.out" }, at + 1.9);
      });

      // idle car bob, independent of scroll
      const bob = gsap.to(".car-body", {
        y: -3,
        duration: 0.42,
        yoyo: true,
        repeat: -1,
        ease: "sine.inOut",
      });
      return () => {
        bob.kill();
      };
    });

    /* mobile + reduced motion: vertical road, car drives down between cards */
    mm.add("(max-width: 1023px)", () => {
      gsap.fromTo(
        ".mobile-car",
        { top: "0%" },
        {
          top: "96%",
          ease: "none",
          scrollTrigger: {
            trigger: ".mobile-road-wrap",
            start: "top 65%",
            end: "bottom 80%",
            scrub: reduced ? false : 0.5,
          },
        }
      );
      gsap.utils.toArray<HTMLElement>(".mobile-stage").forEach((card) => {
        gsap.fromTo(
          card,
          { scale: 0.6, opacity: 0, y: 30 },
          {
            scale: 1,
            opacity: 1,
            y: 0,
            duration: reduced ? 0.01 : 0.8,
            ease: "elastic.out(1, 0.6)",
            scrollTrigger: { trigger: card, start: "top 80%" },
          }
        );
      });
    });

    return () => mm.revert();
  }, []);

  return (
    <section ref={sectionRef} id="process" className="relative overflow-hidden bg-[#050807] text-white">
      {/* ============ desktop: pinned 3D drive ============ */}
      <div className="relative hidden h-screen lg:block">
        {/* sky */}
        <div className="absolute inset-x-0 top-0 h-[42%] bg-gradient-to-b from-[#050807] via-[#071210] to-[#0a1f18]" />
        {/* horizon glow */}
        <div className="absolute left-1/2 top-[40%] h-24 w-[120%] -translate-x-1/2 -translate-y-1/2 bg-[radial-gradient(ellipse_50%_100%_at_50%_100%,rgba(16,185,129,0.35),transparent_70%)]" aria-hidden />

        {/* 3D road plane */}
        <div className="absolute inset-x-0 bottom-0 h-[60%]" style={{ perspective: "750px", perspectiveOrigin: "50% 0%" }}>
          <div
            className="absolute left-1/2 top-0 h-[260%] w-[min(58rem,76vw)] origin-top"
            style={{ transform: "translateX(-50%) rotateX(58deg)" }}
          >
            {/* asphalt, visibly lighter than the void around it */}
            <div
              className="absolute inset-0"
              style={{
                backgroundColor: "#101a16",
                backgroundImage:
                  "linear-gradient(to right, transparent 0 6%, rgba(16,185,129,0.9) 6% calc(6% + 5px), transparent calc(6% + 5px))," +
                  "linear-gradient(to right, transparent 0 calc(94% - 5px), rgba(16,185,129,0.9) calc(94% - 5px) 94%, transparent 94%)",
                boxShadow: "0 0 60px rgba(16,185,129,0.18)",
              }}
            />
            {/* moving layer: center dashes + asphalt texture bands */}
            <div
              className="road-surface absolute inset-0"
              style={{
                backgroundImage:
                  "linear-gradient(to bottom, rgba(52,211,153,0.85) 0 44px, transparent 44px 120px)," +
                  "linear-gradient(to bottom, rgba(255,255,255,0.025) 0 60px, transparent 60px 120px)",
                backgroundSize: "7px 120px, 100% 120px",
                backgroundPosition: "50% 0, 0 0",
                backgroundRepeat: "repeat-y, repeat-y",
              }}
            />
            {/* outer glow edges */}
            <div className="road-edge-l absolute inset-y-0 left-0 w-1.5 bg-accent/80" style={{ boxShadow: "0 0 22px 3px rgba(16,185,129,0.65)" }} />
            <div className="road-edge-r absolute inset-y-0 right-0 w-1.5 bg-accent/80" style={{ boxShadow: "0 0 22px 3px rgba(16,185,129,0.65)" }} />
          </div>
        </div>
        {/* fade the far end of the road into the horizon */}
        <div className="pointer-events-none absolute inset-x-0 top-[38%] h-[14%] bg-gradient-to-b from-[#050807] via-[#050807]/70 to-transparent" aria-hidden />

        {/* pitstop signs flying past (origin at horizon center) */}
        {stages.map((s, i) => (
          <div key={s.name} className="pitstop-sign pointer-events-none absolute left-1/2 top-[38%] z-20 will-change-transform">
            <div className="w-56 border border-accent/60 bg-[#071210]/95 p-4 shadow-[0_0_40px_rgba(16,185,129,0.35)]">
              <div className="flex items-center gap-2 text-accent">
                {s.icon}
                <span className="font-mono text-[10px] uppercase tracking-[0.3em]">Pitstop 0{i + 1}</span>
              </div>
              <p className="mt-2 text-2xl font-bold uppercase tracking-wide">{s.name}</p>
              <p className="mt-1 font-mono text-[10px] text-white/40">{s.detail}</p>
            </div>
            {/* sign post */}
            <div className="mx-auto h-10 w-1 bg-accent/60" />
          </div>
        ))}

        {/* car */}
        <div className="car-rig absolute bottom-[7%] left-1/2 z-30 -translate-x-1/2">
          <div className="car-body">
            <Car />
          </div>
        </div>

        {/* overlay: heading + collected stages dock */}
        <div className="absolute left-0 top-0 z-40 flex h-full w-full max-w-md flex-col justify-between p-10 lg:p-14">
          <div>
            <p className="font-mono text-[11px] uppercase tracking-[0.4em] text-accent">The game plan</p>
            <h2 className="mt-3 text-4xl font-bold tracking-tighter xl:text-5xl">
              Five pitstops to shipped.
            </h2>
            <p className="mt-3 max-w-xs text-sm leading-relaxed text-white/50">
              Keep scrolling. Every engagement drives the same road, and every
              pitstop you pass stays on the dash.
            </p>
            <div className="mt-5 h-1 w-56 overflow-hidden rounded-full bg-white/10">
              <div className="road-progress-fill h-full w-full origin-left bg-accent shadow-[0_0_12px_rgba(16,185,129,0.8)]" />
            </div>
          </div>

          <div className="space-y-2.5">
            {stages.map((s, i) => (
              <div key={s.name} className="dock-card flex items-start gap-3 border border-white/10 bg-white/[0.04] p-3.5 backdrop-blur-sm will-change-transform">
                <span className="mt-0.5 text-accent">{s.icon}</span>
                <div>
                  <p className="text-sm font-bold uppercase tracking-wider">
                    {s.name}
                    <span className="ml-2 font-mono text-[9px] font-normal text-white/30">0{i + 1}/05</span>
                  </p>
                  <p className="mt-0.5 text-xs leading-relaxed text-white/45">{s.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* ============ mobile: vertical road ============ */}
      <div className="mobile-road-wrap relative px-6 py-20 lg:hidden">
        <div className="mb-10">
          <p className="font-mono text-[11px] uppercase tracking-[0.4em] text-accent">The game plan</p>
          <h2 className="mt-3 text-3xl font-bold tracking-tighter">Five pitstops to shipped.</h2>
        </div>

        <div className="relative">
          {/* the road */}
          <div className="absolute left-1/2 top-0 h-full w-10 -translate-x-1/2 rounded-full bg-[#0a0f0d]"
            style={{ boxShadow: "inset 2px 0 0 rgba(16,185,129,0.5), inset -2px 0 0 rgba(16,185,129,0.5)" }}
          >
            <div className="absolute inset-y-2 left-1/2 w-0.5 -translate-x-1/2"
              style={{ background: "repeating-linear-gradient(to bottom, rgba(52,211,153,0.8) 0 14px, transparent 14px 30px)" }}
            />
          </div>
          {/* car (top view) driving down */}
          <div className="mobile-car absolute left-1/2 z-10 -translate-x-1/2" style={{ top: 0 }}>
            <svg viewBox="0 0 30 52" className="w-7" aria-hidden>
              <rect x="4" y="4" width="22" height="44" rx="9" fill="#0d1411" stroke="#10b981" strokeWidth="2" />
              <rect x="8" y="12" width="14" height="12" rx="3" fill="#10241c" stroke="#10b981" strokeWidth="1" />
              <rect x="8" y="30" width="14" height="10" rx="3" fill="#10241c" opacity="0.7" />
              <rect x="7" y="2" width="6" height="4" rx="2" fill="#34d399" />
              <rect x="17" y="2" width="6" height="4" rx="2" fill="#34d399" />
            </svg>
          </div>

          <div className="space-y-10 py-6">
            {stages.map((s, i) => (
              <div key={s.name} className={`mobile-stage flex ${i % 2 === 0 ? "justify-start pr-[55%]" : "justify-end pl-[55%]"}`}>
                <div className="w-full border border-white/10 bg-white/[0.04] p-4">
                  <div className="flex items-center gap-2 text-accent">
                    {s.icon}
                    <span className="font-mono text-[9px] uppercase tracking-[0.25em]">Pitstop 0{i + 1}</span>
                  </div>
                  <p className="mt-2 text-lg font-bold uppercase tracking-wide">{s.name}</p>
                  <p className="mt-1.5 text-xs leading-relaxed text-white/50">{s.desc}</p>
                  <p className="mt-2.5 font-mono text-[9px] uppercase tracking-wider text-accent/70">{s.detail}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
