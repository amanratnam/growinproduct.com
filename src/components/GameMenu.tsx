"use client";

import { useCallback, useEffect, useState } from "react";
import { motion, AnimatePresence, type TargetAndTransition } from "framer-motion";
import type Lenis from "lenis";

export const menuItems = [
  { label: "Services", href: "#services", icon: "◆", fx: "wave" },
  { label: "Process", href: "#process", icon: "▶", fx: "charge" },
  { label: "Work", href: "#work", icon: "★", fx: "flip" },
  { label: "Praise", href: "#praise", icon: "❝", fx: "jelly" },
  { label: "About", href: "#about", icon: "●", fx: "glitch" },
  { label: "Contact", href: "#contact", icon: "✦", fx: "pulse" },
] as const;

type Fx = (typeof menuItems)[number]["fx"];

function scrollToTarget(href: string, delay = 0) {
  window.setTimeout(() => {
    const lenis = (window as unknown as { lenis?: Lenis }).lenis;
    const el = document.querySelector(href);
    if (lenis && el) lenis.scrollTo(el as HTMLElement, { offset: -40 });
    else el?.scrollIntoView({ behavior: "smooth" });
  }, delay);
}

/* per-item hover variants — every entry animates differently */
const hoverFx: Record<Fx, { whileHover: TargetAndTransition; whileTap: TargetAndTransition }> = {
  wave: {
    // letters bounce — handled per-letter below; container gets a lift
    whileHover: { x: 14 },
    whileTap: { scale: 0.92, rotate: -2 },
  },
  charge: {
    whileHover: { x: 18, transition: { type: "spring", stiffness: 400, damping: 12 } },
    whileTap: { x: 40, opacity: 0.4, transition: { duration: 0.18 } },
  },
  flip: {
    whileHover: { rotateX: 360, transition: { duration: 0.6, ease: "easeInOut" } },
    whileTap: { scale: 1.15, rotate: 6 },
  },
  jelly: {
    whileHover: {
      scaleX: [1, 1.18, 0.92, 1.06, 1],
      scaleY: [1, 0.85, 1.1, 0.96, 1],
      transition: { duration: 0.6 },
    },
    whileTap: { scaleY: 0.7, scaleX: 1.2 },
  },
  glitch: {
    whileHover: {
      x: [0, -3, 4, -2, 2, 0],
      skewX: [0, 6, -6, 3, 0],
      transition: { duration: 0.4 },
    },
    whileTap: { opacity: [1, 0.2, 1, 0.3, 1], transition: { duration: 0.3 } },
  },
  pulse: {
    whileHover: {
      scale: [1, 1.08, 1.04],
      transition: { duration: 0.5, repeat: Infinity, repeatType: "reverse" as const },
    },
    whileTap: { scale: 1.3, transition: { type: "spring", stiffness: 500, damping: 10 } },
  },
};

function WaveLabel({ text, hovered }: { text: string; hovered: boolean }) {
  return (
    <span className="inline-flex">
      {text.split("").map((ch, i) => (
        <motion.span
          key={i}
          className="inline-block"
          animate={hovered ? { y: [0, -10, 0] } : { y: 0 }}
          transition={{ duration: 0.45, delay: i * 0.035 }}
        >
          {ch}
        </motion.span>
      ))}
    </span>
  );
}

/* ---------- the big hero game menu ---------- */
export function HeroMenu() {
  const [hovered, setHovered] = useState<string | null>(null);

  const onSelect = useCallback((href: string) => {
    scrollToTarget(href, 260); // let the click animation play first
  }, []);

  return (
    <nav aria-label="Main menu" className="hero-menu">
      <ul className="space-y-1.5">
        {menuItems.map((item, idx) => {
          const fx = hoverFx[item.fx];
          const isHover = hovered === item.label;
          return (
            <motion.li
              key={item.label}
              initial={{ x: -60, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              transition={{ delay: 0.9 + idx * 0.1, duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
            >
              <motion.button
                type="button"
                onClick={() => onSelect(item.href)}
                onHoverStart={() => setHovered(item.label)}
                onHoverEnd={() => setHovered(null)}
                whileHover={fx.whileHover}
                whileTap={fx.whileTap}
                className="group flex w-full items-center gap-4 rounded-xl px-4 py-2.5 text-left"
                style={{ transformStyle: "preserve-3d" }}
              >
                <span className="font-mono text-xs text-muted/60 transition-colors group-hover:text-accent">
                  0{idx + 1}
                </span>
                <span
                  className={`flex h-8 w-8 items-center justify-center rounded-lg border text-sm transition-all duration-300 ${
                    isHover
                      ? "border-accent bg-accent text-white shadow-[0_0_24px_rgba(16,185,129,0.5)]"
                      : "border-line bg-white/70 text-foreground/60"
                  }`}
                >
                  {item.icon}
                </span>
                <span className="text-2xl font-bold tracking-tight sm:text-3xl">
                  {item.fx === "wave" ? (
                    <WaveLabel text={item.label} hovered={isHover} />
                  ) : (
                    item.label
                  )}
                </span>
                <motion.span
                  className="ml-auto text-accent"
                  animate={isHover ? { opacity: 1, x: 0 } : { opacity: 0, x: -12 }}
                  transition={{ duration: 0.25 }}
                  aria-hidden
                >
                  ▸
                </motion.span>
              </motion.button>
            </motion.li>
          );
        })}
      </ul>
    </nav>
  );
}

/* ---------- slim left rail, appears after the hero ---------- */
export function SideRail() {
  const [visible, setVisible] = useState(false);
  const [active, setActive] = useState("");

  useEffect(() => {
    const onScroll = () => {
      setVisible(window.scrollY > window.innerHeight * 0.8);
      let current = "";
      for (const item of menuItems) {
        const el = document.querySelector(item.href);
        if (el && el.getBoundingClientRect().top < window.innerHeight * 0.5) {
          current = item.href;
        }
      }
      setActive(current);
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <AnimatePresence>
      {visible && (
        <motion.nav
          aria-label="Section navigation"
          initial={{ x: -80, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          exit={{ x: -80, opacity: 0 }}
          transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
          className="fixed left-5 top-1/2 z-50 hidden -translate-y-1/2 lg:block"
        >
          <ul className="flex flex-col gap-2 rounded-2xl border border-line bg-white/80 p-2 shadow-lg backdrop-blur-xl">
            {menuItems.map((item) => (
              <li key={item.href}>
                <motion.button
                  type="button"
                  onClick={() => scrollToTarget(item.href, 120)}
                  whileHover={{ scale: 1.15 }}
                  whileTap={{ scale: 0.85 }}
                  className={`group relative flex h-10 w-10 items-center justify-center rounded-xl text-sm transition-colors duration-300 ${
                    active === item.href
                      ? "bg-accent text-white shadow-[0_0_16px_rgba(16,185,129,0.4)]"
                      : "text-foreground/50 hover:bg-accent-soft hover:text-accent-dark"
                  }`}
                  aria-label={item.label}
                >
                  {item.icon}
                  <span className="pointer-events-none absolute left-12 whitespace-nowrap rounded-lg bg-foreground px-2.5 py-1 text-xs font-medium text-white opacity-0 transition-all duration-200 group-hover:translate-x-1 group-hover:opacity-100">
                    {item.label}
                  </span>
                </motion.button>
              </li>
            ))}
          </ul>
        </motion.nav>
      )}
    </AnimatePresence>
  );
}

/* ---------- mobile top bar ---------- */
export function MobileNav() {
  const [open, setOpen] = useState(false);

  return (
    <header className="fixed inset-x-0 top-0 z-50 lg:hidden">
      <div className="flex h-14 items-center justify-between border-b border-line bg-white/85 px-5 backdrop-blur-xl">
        <a href="#top" className="flex items-center gap-2 text-sm font-semibold tracking-tight">
          <span className="flex h-6 w-6 items-center justify-center rounded-md bg-foreground text-[10px] font-bold text-white">
            G
          </span>
          Grow In Product<span className="text-accent">.</span>
        </a>
        <button
          aria-label="Toggle menu"
          aria-expanded={open}
          onClick={() => setOpen(!open)}
          className="flex h-10 w-10 flex-col items-center justify-center gap-1.5"
        >
          <span className={`h-0.5 w-5 bg-foreground transition-transform duration-300 ${open ? "translate-y-1 rotate-45" : ""}`} />
          <span className={`h-0.5 w-5 bg-foreground transition-transform duration-300 ${open ? "-translate-y-1 -rotate-45" : ""}`} />
        </button>
      </div>
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
            className="overflow-hidden border-b border-line bg-white/95 backdrop-blur-xl"
          >
            <ul className="px-4 py-3">
              {menuItems.map((item, idx) => (
                <li key={item.href}>
                  <button
                    type="button"
                    onClick={() => {
                      setOpen(false);
                      scrollToTarget(item.href, 150);
                    }}
                    className="flex w-full items-center gap-3 rounded-lg px-3 py-3 text-left font-medium transition-colors hover:bg-accent-soft"
                  >
                    <span className="font-mono text-xs text-muted/60">0{idx + 1}</span>
                    <span className="text-accent">{item.icon}</span>
                    {item.label}
                  </button>
                </li>
              ))}
            </ul>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
