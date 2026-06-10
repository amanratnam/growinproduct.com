"use client";

import { useEffect, useRef } from "react";
import dynamic from "next/dynamic";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { HeroMenu } from "./GameMenu";

gsap.registerPlugin(ScrollTrigger);

const Hero3D = dynamic(() => import("./Hero3D"), { ssr: false });

function MetricCard() {
  return (
    <div className="float-card w-44 rounded-2xl p-4">
      <p className="text-[10px] font-medium uppercase tracking-wider text-muted">Activation</p>
      <p className="mt-1 text-2xl font-bold tracking-tight">+38%</p>
      <svg viewBox="0 0 120 36" className="mt-2 w-full" aria-hidden>
        <polyline
          points="0,30 18,26 36,28 54,18 72,20 90,10 108,12 120,4"
          fill="none"
          stroke="var(--accent)"
          strokeWidth="2.5"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
    </div>
  );
}

function ShipCard() {
  return (
    <div className="float-card flex w-44 items-center gap-3 rounded-2xl p-3.5">
      <span className="flex h-8 w-8 items-center justify-center rounded-full bg-accent text-white">
        <svg viewBox="0 0 16 16" className="h-4 w-4" fill="none" aria-hidden>
          <path d="M3 8.5l3.5 3.5L13 5" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      </span>
      <div>
        <p className="text-xs font-semibold">Shipped</p>
        <p className="text-[10px] text-muted">v2.4 → production</p>
      </div>
    </div>
  );
}

function PrdCard() {
  return (
    <div className="float-card w-44 rounded-2xl p-4">
      <div className="flex items-center gap-2">
        <span className="flex h-6 w-6 items-center justify-center rounded-md bg-accent-soft text-[10px] font-bold text-accent-dark">
          PRD
        </span>
        <p className="text-[10px] font-medium text-foreground/80">Checkout v2 spec</p>
      </div>
      <div className="mt-3 space-y-1.5">
        <div className="h-1.5 w-full rounded bg-foreground/[0.08]" />
        <div className="h-1.5 w-5/6 rounded bg-foreground/[0.08]" />
        <div className="h-1.5 w-3/4 rounded bg-accent/30" />
      </div>
    </div>
  );
}

export default function Hero() {
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const ctx = gsap.context(() => {
      gsap.fromTo(
        ".hero-word",
        { yPercent: 110, opacity: 0 },
        { yPercent: 0, opacity: 1, duration: 1, stagger: 0.08, ease: "power4.out", delay: 0.25 }
      );
      gsap.fromTo(
        [".hero-badge", ".hero-sub"],
        { y: 24, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.9, stagger: 0.12, ease: "power3.out", delay: 0.6 }
      );
      gsap.fromTo(
        ".hero-float",
        { y: 60, opacity: 0, scale: 0.9 },
        { y: 0, opacity: 1, scale: 1, duration: 1.1, stagger: 0.18, ease: "power3.out", delay: 1.2 }
      );

      if (!reduced) {
        gsap.utils.toArray<HTMLElement>(".hero-float").forEach((el, i) => {
          gsap.to(el, {
            y: i % 2 === 0 ? -14 : 12,
            duration: 3 + i * 0.7,
            yoyo: true,
            repeat: -1,
            ease: "sine.inOut",
            delay: 2 + i * 0.3,
          });
        });

        gsap.to(".hero-inner", {
          opacity: 0,
          yPercent: -6,
          scale: 0.97,
          ease: "none",
          scrollTrigger: {
            trigger: sectionRef.current,
            start: "top top",
            end: "bottom 30%",
            scrub: true,
          },
        });
      }
    }, sectionRef);
    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      id="top"
      className="relative flex min-h-screen items-center overflow-hidden"
    >
      {/* 3D animation layer */}
      <Hero3D />
      <div className="hero-glow pointer-events-none absolute left-1/3 top-1/2 h-[55vmax] w-[55vmax] -translate-x-1/2 -translate-y-1/2" aria-hidden />

      <div className="hero-inner relative z-10 mx-auto grid w-full max-w-7xl items-center gap-12 px-6 pt-20 lg:grid-cols-[1.2fr_1fr] lg:gap-8 lg:px-12 lg:pt-8">
        {/* left: title + game menu */}
        <div>
          <p className="hero-badge inline-flex items-center gap-2 rounded-full border border-line bg-white/70 px-4 py-1.5 text-xs font-medium text-muted backdrop-blur">
            <span className="h-1.5 w-1.5 animate-pulse rounded-full bg-accent" />
            PLAYER 1 — PRODUCT CONSULTANT
          </p>

          <h1 className="mt-6 text-5xl font-bold leading-[1.02] tracking-tighter sm:text-6xl lg:text-7xl">
            <span className="block overflow-hidden pb-1">
              <span className="hero-word inline-block">Grow In</span>
            </span>
            <span className="block overflow-hidden pb-2">
              <span className="hero-word inline-block">
                Product<span className="text-accent">.</span>
              </span>
            </span>
          </h1>

          <p className="hero-sub mt-5 max-w-md text-base leading-relaxed text-muted">
            Product strategy, systems and AI-powered execution.
            Pick a quest to begin.
          </p>

          <div className="mt-8 max-w-md">
            <HeroMenu />
          </div>
        </div>

        {/* right: floating proof-of-work cards above the 3D layer */}
        <div className="pointer-events-none relative hidden h-[480px] lg:block" aria-hidden>
          <div className="hero-float absolute right-8 top-4"><MetricCard /></div>
          <div className="hero-float absolute left-4 top-44"><PrdCard /></div>
          <div className="hero-float absolute right-16 bottom-10"><ShipCard /></div>
        </div>
      </div>

      <div className="absolute bottom-6 left-1/2 z-10 -translate-x-1/2" aria-hidden>
        <div className="flex h-10 w-6 items-start justify-center rounded-full border border-foreground/20 p-1.5">
          <div className="h-2 w-1 animate-bounce rounded-full bg-foreground/40" />
        </div>
      </div>
    </section>
  );
}
