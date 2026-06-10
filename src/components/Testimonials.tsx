"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import SectionShell from "./SectionShell";

const testimonials = [
  {
    emoji: "🎯",
    title: "The Roadmap Rescue",
    quote:
      "He walked into a roadmap that was 80 items long and walked out with the 6 that mattered. Activation doubled in a quarter.",
    name: "Sarah K.",
    role: "CEO, B2B Analytics Startup",
  },
  {
    emoji: "📜",
    title: "Specs That Spoke",
    quote:
      "The PRDs were so clear our engineers stopped scheduling clarification meetings. That alone paid for the engagement.",
    name: "Daniel M.",
    role: "VP Engineering, Healthcare SaaS",
  },
  {
    emoji: "⚡",
    title: "The 31-Hour Heist",
    quote:
      "We thought we needed more headcount. Turns out we needed our workflow redesigned. 31 hours a week back, immediately.",
    name: "Priya R.",
    role: "COO, Logistics Platform",
  },
  {
    emoji: "🤖",
    title: "Six Weeks To Live",
    quote:
      "Rare mix: thinks like a strategist, writes like an engineer, ships like a founder. Our AI triage went live in six weeks.",
    name: "Tom W.",
    role: "Head of Support, SaaS Scale-up",
  },
  {
    emoji: "🌱",
    title: "A System, Not A Dependency",
    quote:
      "As a fractional product lead he ran discovery, leveled up two junior PMs and left us a system — not a dependency.",
    name: "Elena V.",
    role: "Founder, HealthTech",
  },
];

export default function Testimonials() {
  const [index, setIndex] = useState(0);
  const [typed, setTyped] = useState("");
  const [done, setDone] = useState(false);
  const timerRef = useRef<ReturnType<typeof setInterval> | null>(null);
  const advanceRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const pausedRef = useRef(false);
  const reducedRef = useRef(false);

  const clearTimers = useCallback(() => {
    if (timerRef.current) clearInterval(timerRef.current);
    if (advanceRef.current) clearTimeout(advanceRef.current);
    timerRef.current = null;
    advanceRef.current = null;
  }, []);

  const goTo = useCallback(
    (i: number) => {
      clearTimers();
      setIndex(((i % testimonials.length) + testimonials.length) % testimonials.length);
      setTyped("");
      setDone(false);
    },
    [clearTimers]
  );

  // type the active quote character by character
  useEffect(() => {
    reducedRef.current = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const quote = testimonials[index].quote;

    if (reducedRef.current) {
      setTyped(quote);
      setDone(true);
      return;
    }

    let pos = 0;
    timerRef.current = setInterval(() => {
      pos += 1;
      setTyped(quote.slice(0, pos));
      if (pos >= quote.length) {
        if (timerRef.current) clearInterval(timerRef.current);
        timerRef.current = null;
        setDone(true);
        // hold the finished card, then advance
        advanceRef.current = setTimeout(() => {
          if (!pausedRef.current) goTo(index + 1);
        }, 3500);
      }
    }, 22);

    return clearTimers;
  }, [index, goTo, clearTimers]);

  const t = testimonials[index];

  return (
    <SectionShell
      id="praise"
      eyebrow="Word of mouth"
      title="People keep saying nice things."
      blurb="Live from the inbox — every quote typed out the way it arrived."
      tone="tint"
    >
      <div
        onMouseEnter={() => (pausedRef.current = true)}
        onMouseLeave={() => {
          pausedRef.current = false;
          if (done && !advanceRef.current) {
            advanceRef.current = setTimeout(() => goTo(index + 1), 2000);
          }
        }}
      >
        <div className="relative min-h-[340px] sm:min-h-[300px]">
          <AnimatePresence mode="wait">
            <motion.figure
              key={index}
              initial={{ opacity: 0, y: 40, rotate: -1.5 }}
              animate={{ opacity: 1, y: 0, rotate: 0 }}
              exit={{ opacity: 0, y: -30, rotate: 1.5 }}
              transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
              className="rounded-3xl border border-line bg-white p-8 shadow-[0_24px_60px_-24px_rgba(10,10,10,0.12)] sm:p-10"
            >
              <div className="flex items-center gap-4">
                <motion.span
                  initial={{ scale: 0, rotate: -30 }}
                  animate={{ scale: 1, rotate: 0 }}
                  transition={{ type: "spring", stiffness: 320, damping: 14, delay: 0.15 }}
                  className="flex h-14 w-14 items-center justify-center rounded-2xl bg-accent-soft text-2xl shadow-[inset_0_0_0_2px_rgba(16,185,129,0.25)]"
                  aria-hidden
                >
                  {t.emoji}
                </motion.span>
                <div>
                  <p className="text-lg font-bold tracking-tight">{t.title}</p>
                  <p className="font-mono text-[11px] uppercase tracking-wider text-accent-dark">
                    incoming transmission…
                  </p>
                </div>
              </div>

              <blockquote className="mt-6 min-h-[110px] text-lg leading-relaxed text-foreground/85 sm:text-xl">
                <span className="font-medium">{typed}</span>
                <span
                  className={`ml-0.5 inline-block h-[1.1em] w-[2px] translate-y-[3px] bg-accent ${done ? "animate-pulse" : ""}`}
                  aria-hidden
                />
              </blockquote>

              <motion.figcaption
                initial={false}
                animate={{ opacity: done ? 1 : 0.25 }}
                transition={{ duration: 0.4 }}
                className="mt-6 flex items-center justify-between border-t border-line pt-5"
              >
                <div>
                  <p className="text-sm font-semibold">{t.name}</p>
                  <p className="text-xs text-muted">{t.role}</p>
                </div>
                <span className="font-mono text-xs text-muted/60">
                  {index + 1} / {testimonials.length}
                </span>
              </motion.figcaption>
            </motion.figure>
          </AnimatePresence>
        </div>

        {/* carousel controls */}
        <div className="mt-6 flex items-center justify-between">
          <div className="flex gap-2">
            {testimonials.map((item, i) => (
              <button
                key={item.title}
                onClick={() => goTo(i)}
                aria-label={`Show testimonial: ${item.title}`}
                className={`flex h-10 w-10 items-center justify-center rounded-xl border text-base transition-all duration-300 ${
                  i === index
                    ? "border-accent bg-accent-soft shadow-[0_0_16px_rgba(16,185,129,0.25)]"
                    : "border-line bg-white opacity-50 grayscale hover:opacity-100 hover:grayscale-0"
                }`}
              >
                {item.emoji}
              </button>
            ))}
          </div>
          <div className="flex gap-2">
            <motion.button
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.85 }}
              onClick={() => goTo(index - 1)}
              aria-label="Previous testimonial"
              className="flex h-10 w-10 items-center justify-center rounded-full border border-line bg-white transition-colors hover:border-accent hover:text-accent-dark"
            >
              ←
            </motion.button>
            <motion.button
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.85 }}
              onClick={() => goTo(index + 1)}
              aria-label="Next testimonial"
              className="flex h-10 w-10 items-center justify-center rounded-full border border-line bg-white transition-colors hover:border-accent hover:text-accent-dark"
            >
              →
            </motion.button>
          </div>
        </div>
      </div>
    </SectionShell>
  );
}
