"use client";

import { useEffect, useRef, useState } from "react";
import dynamic from "next/dynamic";
import { useRouter, usePathname } from "next/navigation";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { motion, AnimatePresence } from "framer-motion";
import type Lenis from "lenis";
import { navItems } from "./nav";

gsap.registerPlugin(ScrollTrigger);

const Hero3D = dynamic(() => import("./Hero3D"), { ssr: false });

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

  return (
    <section
      ref={sectionRef}
      id="top"
      className="relative flex min-h-screen items-center overflow-hidden bg-[#050807] text-white"
    >
      <Hero3D />
      {/* vignette + scanlines over the 3D layer */}
      <div className="hero-vignette pointer-events-none absolute inset-0" aria-hidden />
      <div className="hero-scanlines pointer-events-none absolute inset-0" aria-hidden />

      <div className="hero-inner relative z-10 mx-auto grid w-full max-w-7xl items-center gap-10 px-6 py-24 lg:grid-cols-[1.15fr_0.85fr] lg:px-12">
        <div>
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
            Strategy, systems and AI-powered execution, from first insight to
            shipped outcome. Select a destination.
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
                      {/* sweep + scan effects */}
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

        {/* right: live preview pane, AAA menu style */}
        <div className="hero-meta pointer-events-none hidden lg:block">
          <div className="preview-pane relative mx-auto aspect-[4/3] w-full max-w-md">
            {/* corner brackets */}
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
                        <p className="font-mono text-[10px] uppercase tracking-[0.4em] text-accent">
                          {preview.tag}
                        </p>
                        <p className="mt-3 text-3xl font-bold uppercase tracking-wide">{preview.label}</p>
                        <p className="mt-3 max-w-[28ch] text-sm leading-relaxed text-white/50">
                          {preview.desc}
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
                        <span className="font-mono text-[10px] tracking-[0.3em] text-white/30">
                          PRESS ENTER ▸
                        </span>
                      </div>
                    </>
                  ) : (
                    <>
                      <div>
                        <p className="font-mono text-[10px] uppercase tracking-[0.4em] text-accent/70">
                          SYSTEM ONLINE
                        </p>
                        <p className="mt-3 text-3xl font-bold uppercase tracking-wide text-white/80">
                          Main Menu
                        </p>
                        <p className="mt-3 max-w-[28ch] text-sm leading-relaxed text-white/40">
                          Hover a destination to scan it. Products shipped: many.
                          Decks produced: zero.
                        </p>
                      </div>
                      <span className="font-mono text-[10px] tracking-[0.3em] text-white/25">
                        AWAITING INPUT<span className="caret-blink">_</span>
                      </span>
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
