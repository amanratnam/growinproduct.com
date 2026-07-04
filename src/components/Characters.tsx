"use client";

import { type ReactNode } from "react";
import { motion } from "framer-motion";

/* Positions a character straddling a section border and springs it into
   view. pointer-events-none so it never blocks taps on mobile. */
export function PopChar({ children, className = "" }: { children: ReactNode; className?: string }) {
  return (
    <motion.div
      initial={{ y: 46, opacity: 0, scale: 0.7 }}
      whileInView={{ y: 0, opacity: 1, scale: 1 }}
      viewport={{ once: true, margin: "-30px" }}
      transition={{ type: "spring", stiffness: 220, damping: 18 }}
      className={`pointer-events-none absolute z-20 ${className}`}
      aria-hidden
    >
      {children}
    </motion.div>
  );
}

const shadowFilter = "drop-shadow(0 14px 16px rgba(5, 8, 7, 0.25))";

/* Cross-legged coder with a laptop, floating docs behind her.
   Sits on the seam between the hero and the services section. */
export function SittingCoder() {
  return (
    <svg viewBox="0 0 220 190" className="w-full" style={{ filter: shadowFilter }} aria-hidden>
      <defs>
        <linearGradient id="sc-skin" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0%" stopColor="#fbe3cd" />
          <stop offset="100%" stopColor="#f0c8a8" />
        </linearGradient>
        <linearGradient id="sc-beanie" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#34d399" />
          <stop offset="100%" stopColor="#0e9f6e" />
        </linearGradient>
        <linearGradient id="sc-hoodie" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#fdf8f0" />
          <stop offset="100%" stopColor="#e8ddca" />
        </linearGradient>
        <linearGradient id="sc-pants" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#14655a" />
          <stop offset="100%" stopColor="#0b3f38" />
        </linearGradient>
        <linearGradient id="sc-laptop" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#f2f4f3" />
          <stop offset="100%" stopColor="#c9cfcc" />
        </linearGradient>
      </defs>

      {/* floating docs behind, like work hovering around her */}
      <g className="char-doc" style={{ "--rot": "6deg", "--dur": "4.4s" } as React.CSSProperties}>
        <rect x="168" y="34" width="40" height="30" rx="5" fill="#ffffff" stroke="#e2e5e3" />
        <rect x="174" y="41" width="20" height="3.5" rx="1.75" fill="#10b981" opacity="0.85" />
        <rect x="174" y="48" width="28" height="3" rx="1.5" fill="#d5d9d7" />
        <rect x="174" y="54" width="22" height="3" rx="1.5" fill="#d5d9d7" />
      </g>
      <g className="char-doc" style={{ "--rot": "-5deg", "--dur": "5.2s", "--delay": "0.6s" } as React.CSSProperties}>
        <rect x="8" y="52" width="34" height="26" rx="5" fill="#ffffff" stroke="#e2e5e3" />
        <path d="M14 70 l6 -7 5 4 8 -9" stroke="#10b981" strokeWidth="2.5" fill="none" strokeLinecap="round" strokeLinejoin="round" />
      </g>
      <circle className="char-doc" style={{ "--dur": "3.8s", "--delay": "1s" } as React.CSSProperties} cx="196" cy="86" r="5" fill="#10b981" opacity="0.55" />

      {/* ground shadow */}
      <ellipse cx="110" cy="180" rx="76" ry="9" fill="rgba(5,8,7,0.16)" />

      {/* crossed legs */}
      <g className="leg-swing">
        <path d="M46 154 q6 -30 64 -30 q58 0 64 30 q3 14 -14 16 l-100 0 q-17 -2 -14 -16z" fill="url(#sc-pants)" />
        <path d="M50 156 q20 -10 40 -4" stroke="rgba(255,255,255,0.12)" strokeWidth="3" fill="none" strokeLinecap="round" />
        {/* sneakers */}
        <path d="M88 164 q-16 -4 -26 4 q-3 6 6 7 l22 0 q6 -6 -2 -11z" fill="#fdf8f0" stroke="#d9cfc0" />
        <path d="M132 164 q16 -4 26 4 q3 6 -6 7 l-22 0 q-6 -6 2 -11z" fill="#fdf8f0" stroke="#d9cfc0" />
      </g>

      {/* torso */}
      <path d="M74 138 q-8 -50 36 -52 q44 2 36 52 q0 10 -10 12 l-52 0 q-10 -2 -10 -12z" fill="url(#sc-hoodie)" />
      <path d="M80 96 q10 12 30 12 q20 0 30 -12" stroke="#d9cfc0" strokeWidth="2.5" fill="none" opacity="0.8" />
      {/* highlight for volume */}
      <ellipse cx="92" cy="104" rx="12" ry="18" fill="rgba(255,255,255,0.5)" opacity="0.5" />

      {/* laptop lid facing us */}
      <g>
        <rect x="76" y="112" width="68" height="46" rx="7" fill="url(#sc-laptop)" stroke="#b3bab6" />
        <circle cx="110" cy="135" r="6.5" fill="#10b981" opacity="0.9" />
        <circle cx="110" cy="135" r="2.6" fill="#ffffff" opacity="0.9" />
      </g>

      {/* arms + typing hands over the lid edges */}
      <path d="M78 112 q-14 14 -4 30 q6 8 14 4" fill="none" stroke="url(#sc-hoodie)" strokeWidth="13" strokeLinecap="round" />
      <path d="M142 112 q14 14 4 30 q-6 8 -14 4" fill="none" stroke="#e8ddca" strokeWidth="13" strokeLinecap="round" />
      <circle className="type-hand-l" cx="90" cy="150" r="7" fill="url(#sc-skin)" />
      <circle className="type-hand-r" cx="130" cy="150" r="7" fill="url(#sc-skin)" />

      {/* head */}
      <g className="head-nod">
        {/* hair behind */}
        <path d="M82 58 q-6 26 8 34 q-16 2 -14 -16 q1 -12 6 -18z" fill="#4a3628" />
        <path d="M138 58 q6 26 -8 34 q16 2 14 -16 q-1 -12 -6 -18z" fill="#3d2c20" />
        <circle cx="110" cy="56" r="25" fill="url(#sc-skin)" />
        {/* fringe */}
        <path d="M86 52 q2 -22 24 -22 q23 0 24 22 q-4 -10 -14 -11 q4 4 3 8 q-8 -8 -20 -7 q-13 1 -17 10z" fill="#4a3628" />
        {/* beanie */}
        <path d="M84 46 q4 -26 26 -26 q22 0 26 26 q-4 -6 -26 -6 q-22 0 -26 6z" fill="url(#sc-beanie)" />
        <rect x="84" y="41" width="52" height="8" rx="4" fill="#0c8c66" />
        <circle cx="110" cy="17" r="6" fill="#34d399" />
        {/* glasses */}
        <circle cx="100" cy="58" r="7.5" fill="rgba(255,255,255,0.35)" stroke="#0f766e" strokeWidth="2" />
        <circle cx="121" cy="58" r="7.5" fill="rgba(255,255,255,0.35)" stroke="#0f766e" strokeWidth="2" />
        <path d="M107.5 58 h6" stroke="#0f766e" strokeWidth="2" />
        {/* eyes + smile + blush */}
        <circle cx="100" cy="58" r="2" fill="#2b2018" />
        <circle cx="121" cy="58" r="2" fill="#2b2018" />
        <path d="M105 69 q5.5 4.5 11 0" stroke="#b4785a" strokeWidth="2" strokeLinecap="round" fill="none" />
        <circle cx="92" cy="66" r="3" fill="#f4a988" opacity="0.6" />
        <circle cx="129" cy="66" r="3" fill="#f4a988" opacity="0.6" />
      </g>
    </svg>
  );
}

/* Presenter pointing at a floating results panel.
   Pops out of the "your project could be next" banner on /projects. */
export function Presenter() {
  return (
    <svg viewBox="0 0 240 200" className="w-full" style={{ filter: shadowFilter }} aria-hidden>
      <defs>
        <linearGradient id="pr-skin" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0%" stopColor="#f6d3b3" />
          <stop offset="100%" stopColor="#e4b48e" />
        </linearGradient>
        <linearGradient id="pr-shirt" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#22c58b" />
          <stop offset="100%" stopColor="#0c8c66" />
        </linearGradient>
        <linearGradient id="pr-pants" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#3f3a33" />
          <stop offset="100%" stopColor="#26221d" />
        </linearGradient>
        <linearGradient id="pr-panel" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#ffffff" />
          <stop offset="100%" stopColor="#eef1ef" />
        </linearGradient>
      </defs>

      {/* floating results panel */}
      <g className="char-doc" style={{ "--rot": "-2deg", "--dur": "4.6s" } as React.CSSProperties}>
        <rect x="14" y="26" width="112" height="86" rx="10" fill="url(#pr-panel)" stroke="#dfe4e1" />
        <rect x="26" y="38" width="44" height="5" rx="2.5" fill="#10b981" />
        <rect x="26" y="48" width="64" height="4" rx="2" fill="#d5d9d7" />
        {/* little bar chart */}
        <rect x="26" y="88" width="10" height="14" rx="2" fill="#c9dfd6" />
        <rect x="41" y="80" width="10" height="22" rx="2" fill="#7fd0b2" />
        <rect x="56" y="70" width="10" height="32" rx="2" fill="#10b981" />
        <rect x="71" y="60" width="10" height="42" rx="2" fill="#0c8c66" />
        {/* trend line */}
        <path d="M92 96 l10 -12 8 5 12 -16" stroke="#10b981" strokeWidth="2.5" fill="none" strokeLinecap="round" strokeLinejoin="round" />
        <circle cx="122" cy="73" r="3" fill="#10b981" />
      </g>
      {/* floating badge */}
      <g className="char-doc" style={{ "--rot": "5deg", "--dur": "3.9s", "--delay": "0.7s" } as React.CSSProperties}>
        <circle cx="140" cy="24" r="11" fill="#10b981" />
        <path d="M135 24 l3.5 3.5 6 -7" stroke="#fff" strokeWidth="2.4" fill="none" strokeLinecap="round" strokeLinejoin="round" />
      </g>

      {/* ground shadow */}
      <ellipse cx="176" cy="192" rx="46" ry="7" fill="rgba(5,8,7,0.16)" />

      {/* legs */}
      <path d="M162 138 l-4 46 q0 5 6 5 l8 0 2 -48z" fill="url(#pr-pants)" />
      <path d="M190 138 l4 46 q0 5 -6 5 l-8 0 -2 -48z" fill="#312c26" />
      {/* shoes */}
      <path d="M156 186 q-10 0 -10 6 q0 3 5 3 l16 0 0 -9z" fill="#fdf8f0" stroke="#d9cfc0" />
      <path d="M196 186 q10 0 10 6 q0 3 -5 3 l-16 0 0 -9z" fill="#fdf8f0" stroke="#d9cfc0" />

      {/* torso */}
      <path d="M152 142 q-6 -46 24 -48 q30 2 24 48 q0 8 -9 9 l-30 0 q-9 -1 -9 -9z" fill="url(#pr-shirt)" />
      <ellipse cx="164" cy="112" rx="8" ry="14" fill="rgba(255,255,255,0.35)" opacity="0.5" />

      {/* pointing arm toward the panel */}
      <g className="point-arm">
        <path d="M158 104 Q132 92 112 78" stroke="#0c8c66" strokeWidth="12" strokeLinecap="round" fill="none" />
        <circle cx="109" cy="76" r="7" fill="url(#pr-skin)" />
        <path d="M109 76 l-10 -5" stroke="url(#pr-skin)" strokeWidth="6" strokeLinecap="round" />
      </g>
      {/* other arm relaxed */}
      <path d="M196 106 q10 16 4 30" stroke="#0a7a58" strokeWidth="11" strokeLinecap="round" fill="none" />
      <circle cx="199" cy="139" r="6" fill="url(#pr-skin)" />

      {/* head */}
      <g className="head-nod">
        <circle cx="176" cy="72" r="22" fill="url(#pr-skin)" />
        {/* hair + beard */}
        <path d="M155 66 q0 -20 21 -20 q21 0 21 20 q-3 -9 -12 -10 q3 3 2 6 q-7 -6 -16 -5 q-12 1 -16 9z" fill="#191512" />
        <path d="M158 78 q2 12 18 12 q16 0 18 -12 q-2 14 -8 16 q-5 2 -10 2 q-5 0 -10 -2 q-6 -2 -8 -16z" fill="#191512" opacity="0.85" />
        {/* eyes + smile */}
        <circle cx="168" cy="72" r="2.2" fill="#191512" />
        <circle cx="185" cy="72" r="2.2" fill="#191512" />
        <path d="M171 82 q5 3.5 10 0" stroke="#fff" strokeWidth="2" strokeLinecap="round" fill="none" />
      </g>
    </svg>
  );
}

/* Rocket bursting off a laptop, launch clouds and all.
   Straddles the seam between the reviews and the final CTA. */
export function RocketLaptop() {
  return (
    <svg viewBox="0 0 220 170" className="w-full" style={{ filter: shadowFilter }} aria-hidden>
      <defs>
        <linearGradient id="rk-screen" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#123b31" />
          <stop offset="100%" stopColor="#0a241d" />
        </linearGradient>
        <linearGradient id="rk-body" x1="0" y1="0" x2="1" y2="0">
          <stop offset="0%" stopColor="#ffffff" />
          <stop offset="100%" stopColor="#cfd6d2" />
        </linearGradient>
        <linearGradient id="rk-nose" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#34d399" />
          <stop offset="100%" stopColor="#0c8c66" />
        </linearGradient>
      </defs>

      {/* sparks */}
      <path className="char-doc" style={{ "--dur": "3.6s" } as React.CSSProperties} d="M28 52 l3 7 7 3 -7 3 -3 7 -3 -7 -7 -3 7 -3z" fill="#34d399" opacity="0.8" />
      <path className="char-doc" style={{ "--dur": "4.4s", "--delay": "0.8s" } as React.CSSProperties} d="M192 40 l2.5 6 6 2.5 -6 2.5 -2.5 6 -2.5 -6 -6 -2.5 6 -2.5z" fill="#6ee7b7" opacity="0.7" />
      <circle className="char-doc" style={{ "--dur": "3.2s", "--delay": "0.4s" } as React.CSSProperties} cx="196" cy="96" r="4" fill="#10b981" opacity="0.5" />

      {/* screen with a chart going up and to the right */}
      <rect x="52" y="26" width="116" height="86" rx="9" fill="url(#rk-screen)" stroke="#2b5a4b" strokeWidth="2" />
      <rect x="60" y="34" width="36" height="4" rx="2" fill="#2b5a4b" />
      <rect x="60" y="88" width="12" height="16" rx="2" fill="#1d4a3c" />
      <rect x="76" y="78" width="12" height="26" rx="2" fill="#256b54" />
      <path d="M96 96 l18 -20 14 8 22 -28" stroke="#34d399" strokeWidth="3" fill="none" strokeLinecap="round" strokeLinejoin="round" />
      <circle cx="150" cy="56" r="3.5" fill="#34d399" />

      {/* keyboard base */}
      <path d="M40 112 l140 0 14 26 q2 6 -6 6 l-156 0 q-8 0 -6 -6z" fill="#1c3a30" stroke="#2b5a4b" />
      <path d="M52 118 l116 0 8 14 -132 0z" fill="rgba(255,255,255,0.05)" />

      {/* launch clouds */}
      <g>
        <circle className="puff" cx="88" cy="116" r="14" fill="#f3f6f4" />
        <circle className="puff" style={{ "--delay": "0.5s" } as React.CSSProperties} cx="72" cy="122" r="10" fill="#dfe7e2" />
        <circle className="puff" style={{ "--delay": "0.9s" } as React.CSSProperties} cx="134" cy="118" r="12" fill="#eef2ef" />
        <circle className="puff" style={{ "--delay": "0.3s" } as React.CSSProperties} cx="148" cy="124" r="8" fill="#dfe7e2" />
        <circle className="puff" style={{ "--delay": "0.7s" } as React.CSSProperties} cx="110" cy="122" r="9" fill="#e8ede9" />
      </g>

      {/* rocket */}
      <g className="rocket-hover">
        {/* flame */}
        <path className="flame" d="M104 104 q6 16 6 22 q0 -6 6 -22z" fill="#f59e0b" />
        <path className="flame" style={{ animationDelay: "0.1s" }} d="M107 104 q3 10 3 14 q0 -4 3 -14z" fill="#fde68a" />
        {/* body */}
        <path d="M110 28 q14 10 14 40 q0 22 -6 34 l-16 0 q-6 -12 -6 -34 q0 -30 14 -40z" fill="url(#rk-body)" stroke="#b7c0bb" />
        {/* nose */}
        <path d="M110 22 q10 6 13 20 l-26 0 q3 -14 13 -20z" fill="url(#rk-nose)" />
        <circle cx="110" cy="18" r="4" fill="#34d399" />
        {/* window */}
        <circle cx="110" cy="62" r="9" fill="#123b31" stroke="#0c8c66" strokeWidth="3" />
        <circle cx="107" cy="59" r="2.5" fill="rgba(255,255,255,0.5)" />
        {/* fins */}
        <path d="M96 78 q-12 6 -12 22 q8 -8 14 -8z" fill="url(#rk-nose)" />
        <path d="M124 78 q12 6 12 22 q-8 -8 -14 -8z" fill="#0c8c66" />
      </g>
    </svg>
  );
}
