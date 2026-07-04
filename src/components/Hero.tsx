"use client";

import { useEffect, useRef, useState } from "react";
import dynamic from "next/dynamic";
import Image from "next/image";
import { useRouter, usePathname } from "next/navigation";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { motion, AnimatePresence } from "framer-motion";
import type Lenis from "lenis";
import { navItems } from "./nav";
import {
  RadarIcon,
  VectorPenIcon,
  RocketIcon,
  ChartUpIcon,
  DocIcon,
  ChipIcon,
  FlagIcon,
} from "./Icons";

gsap.registerPlugin(ScrollTrigger);

const Hero3D = dynamic(() => import("./Hero3D"), { ssr: false });

function Stars({ className = "h-4 w-4" }: { className?: string }) {
  return (
    <span className="flex gap-1 text-accent" aria-hidden>
      {Array.from({ length: 5 }).map((_, i) => (
        <svg key={i} viewBox="0 0 16 16" className={className} fill="currentColor">
          <path d="M8 2l1.8 3.6L14 6.2l-3 2.9.7 4-3.7-1.9L4.3 13l.7-4-3-2.9 4.2-.6L8 2z" />
        </svg>
      ))}
    </span>
  );
}

/* contextual scan-preview for each destination, real content, not filler */
function PreviewBody({ label }: { label: string }) {
  switch (label) {
    case "Services":
      return (
        <div className="grid grid-cols-3 gap-2.5">
          {[
            [<ChartUpIcon key="s" className="h-4 w-4" />, "Strategy"],
            [<RadarIcon key="a" className="h-4 w-4" />, "Analysis"],
            [<DocIcon key="p" className="h-4 w-4" />, "PRDs"],
            [<VectorPenIcon key="w" className="h-4 w-4" />, "Workflows"],
            [<ChipIcon key="ai" className="h-4 w-4" />, "AI & Auto"],
            [<FlagIcon key="l" className="h-4 w-4" />, "Leadership"],
          ].map(([icon, name]) => (
            <div key={name as string} className="flex flex-col items-center gap-1.5 border border-white/[0.07] bg-white/[0.03] px-1 py-2.5 text-accent">
              {icon}
              <span className="text-[9px] font-medium tracking-wide text-white/60">{name}</span>
            </div>
          ))}
        </div>
      );
    case "Process":
      return (
        <div className="flex flex-wrap items-center gap-y-2">
          {["Discover", "Define", "Design", "Deliver", "Scale"].map((s, i) => (
            <span key={s} className="flex items-center">
              <span className="border border-accent/40 bg-accent/10 px-2 py-1 text-[10px] font-semibold uppercase tracking-wider text-accent">
                {s}
              </span>
              {i < 4 && <span className="px-1 text-accent/50">▸</span>}
            </span>
          ))}
        </div>
      );
    case "Work":
      return (
        <div className="grid grid-cols-3 gap-3">
          {[
            ["−62%", "intake time"],
            ["2.3×", "activation"],
            ["78%", "auto-resolved"],
          ].map(([v, l]) => (
            <div key={l}>
              <p className="text-xl font-bold text-white">{v}</p>
              <p className="mt-0.5 text-[9px] uppercase tracking-wider text-white/40">{l}</p>
            </div>
          ))}
        </div>
      );
    case "About":
      return (
        <div className="flex flex-wrap gap-2">
          {["Product Manager", "Business Analyst", "AI Builder", "10+ yrs shipping"].map((c) => (
            <span key={c} className="border border-white/10 bg-white/[0.04] px-2.5 py-1 text-[10px] font-medium tracking-wide text-white/70">
              {c}
            </span>
          ))}
        </div>
      );
    case "Praise":
      return (
        <div className="flex items-center gap-3">
          <Stars />
          <p className="text-sm text-white/70">
            <span className="font-bold text-white">5.0</span> across 16 reviews
          </p>
        </div>
      );
    case "Contact":
      return (
        <div className="space-y-1.5 text-sm text-white/70">
          <p className="flex items-center gap-2">
            <span className="h-1.5 w-1.5 animate-pulse rounded-full bg-accent" />
            2 seats open for Q3 2026
          </p>
          <p className="flex items-center gap-2">
            <RocketIcon className="h-3.5 w-3.5 text-accent" />
            Replies same day, from a human
          </p>
        </div>
      );
    default:
      return null;
  }
}

export default function Hero() {
  const sectionRef = useRef<HTMLElement>(null);
  const router = useRouter();
  const pathname = usePathname();
  const [hovered, setHovered] = useState<number | null>(null);
  const [launching, setLaunching] = useState<number | null>(null);

  useEffect(() => {
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const ctx = gsap.context(() => {
      gsap.fromTo(
        ".hero-word",
        { yPercent: 110, opacity: 0 },
        { yPercent: 0, opacity: 1, duration: 1, stagger: 0.07, ease: "power4.out", delay: 0.2 }
      );
      gsap.fromTo(
        ".menu-row",
        { x: -70, opacity: 0 },
        { x: 0, opacity: 1, duration: 0.7, stagger: 0.09, ease: "power3.out", delay: 0.7 }
      );
      gsap.fromTo(
        [".hero-sub", ".hero-meta"],
        { y: 20, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.8, stagger: 0.1, ease: "power3.out", delay: 0.55 }
      );

      if (!reduced) {
        gsap.to(".hero-inner", {
          opacity: 0,
          yPercent: -8,
          scale: 0.97,
          ease: "none",
          scrollTrigger: {
            trigger: sectionRef.current,
            start: "top top",
            end: "bottom 35%",
            scrub: true,
          },
        });
      }
    }, sectionRef);
    return () => ctx.revert();
  }, []);

  const navigate = (idx: number, href: string) => {
    setLaunching(idx);
    window.setTimeout(() => {
      setLaunching(null);
      if (href.startsWith("/#") && pathname === "/") {
        const lenis = (window as unknown as { lenis?: Lenis }).lenis;
        const el = document.querySelector(href.slice(1));
        if (lenis && el) lenis.scrollTo(el as HTMLElement, { offset: -60 });
        else el?.scrollIntoView({ behavior: "smooth" });
      } else {
        router.push(href);
      }
    }, 320);
  };

  const preview = hovered !== null ? navItems[hovered] : null;
  const hue = preview?.hue ?? 0;

  return (
    <section
      ref={sectionRef}
      id="top"
      className="relative flex min-h-screen items-center overflow-hidden bg-[#050807] text-white"
    >
      {/* 3D layer, tinted by the hovered destination */}
      <div
        className="absolute inset-0 transition-[filter] duration-700 ease-out"
        style={{ filter: `hue-rotate(${hue}deg)` }}
      >
        <Hero3D />
      </div>

      {/* destination glow that drifts toward the hovered item's side */}
      <motion.div
        aria-hidden
        className="pointer-events-none absolute h-[80vmax] w-[80vmax] rounded-full"
        animate={{
          background: `radial-gradient(circle, hsla(${160 + hue}, 75%, 45%, ${hovered !== null ? 0.16 : 0.07}) 0%, transparent 60%)`,
          x: hovered !== null ? (hovered % 2 === 0 ? "-12%" : "6%") : "-4%",
          y: hovered !== null ? `${-20 + hovered * 7}%` : "-10%",
        }}
        transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1] }}
        style={{ left: "10%", top: "-10%" }}
      />

      <div className="hero-vignette pointer-events-none absolute inset-0" aria-hidden />
      <div className="hero-scanlines pointer-events-none absolute inset-0" aria-hidden />

      <div className="hero-inner relative z-10 mx-auto grid w-full max-w-7xl items-center gap-10 px-6 py-24 lg:grid-cols-[1.15fr_0.85fr] lg:px-12">
        <div>
          <Image
            src="/logo-mark.png"
            alt="Grow In Product"
            width={64}
            height={64}
            priority
            className="hero-meta mb-6 h-14 w-14 brightness-0 invert drop-shadow-[0_0_20px_rgba(16,185,129,0.5)] sm:h-16 sm:w-16"
          />
          <p className="hero-meta font-mono text-[11px] uppercase tracking-[0.45em] text-accent/80">
            Product Management &amp; Technology Consulting
          </p>

          <h1 className="mt-5 text-5xl font-bold leading-[0.98] tracking-tighter sm:text-6xl lg:text-7xl">
            <span className="block overflow-hidden pb-1">
              <span className="hero-word inline-block">GROW IN</span>
            </span>
            <span className="block overflow-hidden pb-2">
              <span className="hero-word inline-block">
                PRODUCT<span className="text-accent">_</span>
              </span>
            </span>
          </h1>

          <p className="hero-sub mt-4 max-w-md text-sm leading-relaxed text-white/50">
            Most consultancies hand you a deck. I ship product with you,
            strategy through launch. Scan a destination to see the proof.
          </p>

          {/* AAA game menu */}
          <nav aria-label="Main menu" className="mt-9 max-w-lg">
            <ul>
              {navItems.map((item, idx) => {
                const isHover = hovered === idx;
                const isLaunch = launching === idx;
                return (
                  <li key={item.href} className="menu-row">
                    <button
                      type="button"
                      onClick={() => navigate(idx, item.href)}
                      onMouseEnter={() => setHovered(idx)}
                      onMouseLeave={() => setHovered(null)}
                      onFocus={() => setHovered(idx)}
                      onBlur={() => setHovered(null)}
                      className={`menu-item group relative flex w-full items-center gap-4 overflow-hidden border-l-2 px-5 py-3 text-left transition-[border-color,background-color] duration-300 ${
                        isHover ? "border-accent bg-accent/[0.07]" : "border-white/10 bg-transparent"
                      } ${isLaunch ? "menu-launch" : ""}`}
                    >
                      <span className={`menu-sweep ${isHover ? "menu-sweep-on" : ""}`} aria-hidden />
                      <span
                        className={`pointer-events-none absolute inset-y-0 left-0 w-0.5 bg-accent shadow-[0_0_12px_2px_rgba(16,185,129,0.7)] transition-transform duration-300 ${
                          isHover ? "scale-y-100" : "scale-y-0"
                        }`}
                        aria-hidden
                      />
                      <span className="relative z-10 w-7 font-mono text-[11px] text-white/30 transition-colors duration-300 group-hover:text-accent">
                        {String(idx + 1).padStart(2, "0")}
                      </span>
                      <span
                        className={`relative z-10 text-2xl font-bold uppercase transition-all duration-300 sm:text-[1.7rem] ${
                          isHover
                            ? "menu-label-flicker translate-x-1.5 tracking-[0.18em] text-white"
                            : "tracking-[0.06em] text-white/75"
                        }`}
                      >
                        {item.label}
                      </span>
                      <span
                        className={`relative z-10 ml-auto hidden font-mono text-[9px] uppercase tracking-[0.3em] transition-all duration-300 sm:block ${
                          isHover ? "text-accent opacity-100" : "translate-x-3 text-white/20 opacity-0"
                        }`}
                      >
                        {item.tag}
                      </span>
                      <span
                        className={`relative z-10 text-accent transition-all duration-300 ${
                          isHover ? "translate-x-0 opacity-100" : "-translate-x-2 opacity-0"
                        }`}
                        aria-hidden
                      >
                        ▸▸
                      </span>
                    </button>
                  </li>
                );
              })}
            </ul>
          </nav>
        </div>

        {/* right: live scan pane with real content per destination */}
        <div className="hero-meta pointer-events-none hidden lg:block">
          <div className="preview-pane relative mx-auto aspect-[4/3] w-full max-w-md">
            <span className="absolute left-0 top-0 h-6 w-6 border-l-2 border-t-2 border-accent/70" aria-hidden />
            <span className="absolute right-0 top-0 h-6 w-6 border-r-2 border-t-2 border-accent/70" aria-hidden />
            <span className="absolute bottom-0 left-0 h-6 w-6 border-b-2 border-l-2 border-accent/70" aria-hidden />
            <span className="absolute bottom-0 right-0 h-6 w-6 border-b-2 border-r-2 border-accent/70" aria-hidden />

            <div className="absolute inset-3 border border-white/5 bg-black/30 backdrop-blur-sm">
              <AnimatePresence mode="wait">
                <motion.div
                  key={hovered ?? "idle"}
                  initial={{ opacity: 0, y: 14, filter: "blur(4px)" }}
                  animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
                  exit={{ opacity: 0, y: -10, filter: "blur(4px)" }}
                  transition={{ duration: 0.25 }}
                  className="flex h-full flex-col justify-between p-7"
                >
                  {preview ? (
                    <>
                      <div>
                        <div className="flex items-center justify-between">
                          <p className="font-mono text-[10px] uppercase tracking-[0.4em] text-accent">
                            {preview.tag}
                          </p>
                          <p className="font-mono text-[9px] uppercase tracking-[0.2em] text-white/30">
                            {preview.stat}
                          </p>
                        </div>
                        <p className="mt-3 text-3xl font-bold uppercase tracking-wide">{preview.label}</p>
                        <p className="mt-3 max-w-[34ch] text-sm leading-relaxed text-white/50">
                          {preview.desc}
                        </p>
                      </div>
                      <div className="space-y-4">
                        <PreviewBody label={preview.label} />
                        <p className="text-right font-mono text-[10px] tracking-[0.3em] text-white/30">
                          CLICK TO ENTER ▸
                        </p>
                      </div>
                    </>
                  ) : (
                    <>
                      <div>
                        <p className="font-mono text-[10px] uppercase tracking-[0.4em] text-accent/70">
                          SYSTEM ONLINE
                        </p>
                        <p className="mt-3 text-3xl font-bold uppercase tracking-wide text-white/80">
                          Not another
                          <br />
                          consultancy.
                        </p>
                        <p className="mt-3 max-w-[30ch] text-sm leading-relaxed text-white/40">
                          Everything on this menu is a real thing I&apos;ve
                          shipped, not a slide. Hover a destination to scan it.
                        </p>
                      </div>
                      <div className="flex items-end justify-between">
                        <span className="preview-bars flex items-end gap-1" aria-hidden>
                          {[5, 9, 7, 12, 8, 14, 10].map((h, i) => (
                            <span
                              key={i}
                              className="w-1.5 bg-accent/70"
                              style={{ height: `${h * 4}px`, animationDelay: `${i * 90}ms` }}
                            />
                          ))}
                        </span>
                        <span className="font-mono text-[10px] tracking-[0.3em] text-white/25">
                          AWAITING INPUT<span className="caret-blink">_</span>
                        </span>
                      </div>
                    </>
                  )}
                </motion.div>
              </AnimatePresence>
            </div>
          </div>
        </div>
      </div>

      <div className="absolute bottom-6 left-1/2 z-10 -translate-x-1/2" aria-hidden>
        <div className="flex h-10 w-6 items-start justify-center rounded-full border border-white/20 p-1.5">
          <div className="h-2 w-1 animate-bounce rounded-full bg-accent/70" />
        </div>
      </div>
    </section>
  );
}
