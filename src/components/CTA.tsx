"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const marqueeItems = [
  "Product Strategy",
  "Business Analysis",
  "PRDs",
  "Workflow Design",
  "AI & Automation",
  "Fractional Leadership",
];

/* the things we could build together, typed and retyped by a human hand */
const buildables = [
  "a roadmap with a spine",
  "PRDs engineers actually read",
  "your AI copilot",
  "workflows that run themselves",
  "a product that grows",
  "the thing you keep postponing",
];

function TypeCycle() {
  const [text, setText] = useState("");
  const [wordIdx, setWordIdx] = useState(0);

  useEffect(() => {
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reduced) {
      setText(buildables[0]);
      return;
    }

    const word = buildables[wordIdx];
    let pos = 0;
    let timer: ReturnType<typeof setTimeout>;

    const type = () => {
      pos += 1;
      setText(word.slice(0, pos));
      if (pos < word.length) {
        timer = setTimeout(type, 45 + Math.random() * 50); // human-ish rhythm
      } else {
        timer = setTimeout(erase, 1700);
      }
    };
    const erase = () => {
      pos -= 1;
      setText(word.slice(0, pos));
      if (pos > 0) timer = setTimeout(erase, 24);
      else setWordIdx((i) => (i + 1) % buildables.length);
    };

    timer = setTimeout(type, 300);
    return () => clearTimeout(timer);
  }, [wordIdx]);

  return (
    <span className="text-accent" aria-live="off">
      {text}
      <span className="caret-blink ml-0.5 inline-block h-[1em] w-[2px] translate-y-[2px] bg-accent" aria-hidden />
    </span>
  );
}

export default function CTA() {
  const sectionRef = useRef<HTMLElement>(null);
  const btnRef = useRef<HTMLAnchorElement>(null);

  useEffect(() => {
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const ctx = gsap.context(() => {
      gsap.fromTo(
        ".cta-line",
        { yPercent: 110 },
        {
          yPercent: 0,
          duration: 1.1,
          stagger: 0.12,
          ease: "power4.out",
          scrollTrigger: { trigger: sectionRef.current, start: "top 65%" },
        }
      );

      gsap.fromTo(
        ".cta-after",
        { y: 30, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 0.9,
          stagger: 0.12,
          ease: "power3.out",
          delay: 0.4,
          scrollTrigger: { trigger: sectionRef.current, start: "top 60%" },
        }
      );

      if (!reduced) {
        gsap.to(".cta-glow", {
          scale: 1.25,
          opacity: 0.8,
          duration: 4,
          yoyo: true,
          repeat: -1,
          ease: "sine.inOut",
        });
      }
    }, sectionRef);

    // magnetic button
    const btn = btnRef.current;
    if (btn && !reduced) {
      const onMove = (e: MouseEvent) => {
        const rect = btn.getBoundingClientRect();
        const x = e.clientX - rect.left - rect.width / 2;
        const y = e.clientY - rect.top - rect.height / 2;
        gsap.to(btn, { x: x * 0.3, y: y * 0.35, duration: 0.4, ease: "power2.out" });
      };
      const onLeave = () => gsap.to(btn, { x: 0, y: 0, duration: 0.6, ease: "elastic.out(1,0.5)" });
      btn.addEventListener("mousemove", onMove);
      btn.addEventListener("mouseleave", onLeave);
      return () => {
        btn.removeEventListener("mousemove", onMove);
        btn.removeEventListener("mouseleave", onLeave);
        ctx.revert();
      };
    }
    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      id="contact"
      className="relative overflow-hidden bg-foreground py-32 text-white lg:py-44"
    >
      <div
        className="cta-glow absolute left-1/2 top-1/2 h-[70vmax] w-[70vmax] -translate-x-1/2 -translate-y-1/2 rounded-full opacity-50"
        style={{
          background:
            "radial-gradient(circle, rgba(16,185,129,0.25) 0%, rgba(16,185,129,0.06) 40%, transparent 70%)",
        }}
        aria-hidden
      />

      {/* marquee */}
      <div className="absolute top-10 w-full overflow-hidden opacity-30" aria-hidden>
        <div className="marquee-track flex w-max gap-10 whitespace-nowrap">
          {[...marqueeItems, ...marqueeItems].map((item, i) => (
            <span key={i} className="flex items-center gap-10 text-sm font-medium uppercase tracking-widest">
              {item} <span className="text-accent">✦</span>
            </span>
          ))}
        </div>
      </div>

      <div className="relative z-10 mx-auto max-w-5xl px-6 text-center lg:px-8">
        <h2 className="text-5xl font-bold leading-[1.04] tracking-tighter sm:text-7xl lg:text-[6.5rem]">
          <span className="block overflow-hidden pb-1">
            <span className="cta-line inline-block">Ready to grow</span>
          </span>
          <span className="block overflow-hidden pb-2">
            <span className="cta-line inline-block">
              in <span className="text-accent">product</span>?
            </span>
          </span>
        </h2>

        {/* live-typed line: what we could build together */}
        <p className="cta-after mx-auto mt-8 min-h-[2em] max-w-2xl text-xl leading-relaxed text-white/70 sm:text-2xl">
          Together we could build <TypeCycle />
        </p>

        <p className="cta-after mx-auto mt-4 max-w-lg text-base leading-relaxed text-white/50">
          One honest conversation to start. No deck, no discovery-call
          theater, and no bots, the reply comes from me.
        </p>

        <div className="cta-after mt-12 flex flex-col items-center justify-center gap-4 sm:flex-row">
          <Link
            ref={btnRef}
            href="/contact"
            className="group relative inline-flex items-center gap-3 overflow-hidden rounded-full bg-accent px-10 py-5 text-base font-semibold text-white shadow-[0_20px_60px_-15px_rgba(16,185,129,0.6)] transition-shadow hover:shadow-[0_25px_70px_-12px_rgba(16,185,129,0.8)]"
          >
            <span className="relative z-10">Let&apos;s build it together</span>
            <svg viewBox="0 0 16 16" className="relative z-10 h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" fill="none" aria-hidden>
              <path d="M2 8h11M9 4l4 4-4 4" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
            <span className="absolute inset-0 -translate-x-full bg-accent-dark transition-transform duration-500 ease-out group-hover:translate-x-0" />
          </Link>
        </div>

        <p className="cta-after mt-8 text-sm text-white/40">
          Prefer email?{" "}
          <a href="mailto:hello@growinproduct.com" className="text-white/70 underline decoration-white/20 underline-offset-4 transition-colors hover:text-accent">
            hello@growinproduct.com
          </a>
        </p>
        <p className="cta-after mt-3 text-sm text-white/40">
          Currently taking on 2 engagements for Q3 2026.
        </p>
      </div>
    </section>
  );
}
