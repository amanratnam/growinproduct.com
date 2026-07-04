"use client";

import Link from "next/link";
import Image from "next/image";

function TypistScene() {
  /* flat-vector workspace: a person typing away, screen filling with work */
  return (
    <svg
      viewBox="0 0 640 300"
      className="typist mx-auto w-full max-w-2xl"
      role="img"
      aria-label="Illustration of a person typing on a keyboard, shipping product work"
    >
      {/* backdrop blobs */}
      <ellipse cx="320" cy="282" rx="290" ry="14" fill="rgba(255,255,255,0.05)" />
      <circle cx="552" cy="70" r="38" fill="rgba(16,185,129,0.08)" />
      <circle cx="80" cy="56" r="26" fill="rgba(255,255,255,0.04)" />

      {/* hanging lamp */}
      <line x1="470" y1="0" x2="470" y2="52" stroke="rgba(255,255,255,0.25)" strokeWidth="2" />
      <path d="M450 52 h40 l-8 18 h-24 z" fill="#10b981" />
      <ellipse className="lamp-glow" cx="470" cy="84" rx="34" ry="10" fill="rgba(16,185,129,0.18)" />

      {/* desk */}
      <rect x="120" y="218" width="420" height="10" rx="5" fill="rgba(255,255,255,0.85)" />
      <rect x="150" y="228" width="10" height="60" fill="rgba(255,255,255,0.35)" />
      <rect x="500" y="228" width="10" height="60" fill="rgba(255,255,255,0.35)" />

      {/* monitor */}
      <g>
        <rect x="356" y="96" width="160" height="106" rx="10" fill="#0f1512" stroke="rgba(255,255,255,0.35)" strokeWidth="2.5" />
        <rect x="364" y="104" width="144" height="90" rx="6" fill="#101816" />
        {/* window chrome */}
        <circle cx="374" cy="113" r="2.6" fill="#ef4444" opacity="0.8" />
        <circle cx="383" cy="113" r="2.6" fill="#eab308" opacity="0.8" />
        <circle cx="392" cy="113" r="2.6" fill="#10b981" opacity="0.9" />
        {/* code lines typing themselves, looping */}
        <g>
          <rect className="code-line cl-1" x="372" y="124" width="78" height="5" rx="2.5" fill="#10b981" opacity="0.9" />
          <rect className="code-line cl-2" x="372" y="136" width="104" height="5" rx="2.5" fill="rgba(255,255,255,0.5)" />
          <rect className="code-line cl-3" x="382" y="148" width="64" height="5" rx="2.5" fill="rgba(255,255,255,0.35)" />
          <rect className="code-line cl-4" x="382" y="160" width="92" height="5" rx="2.5" fill="#10b981" opacity="0.6" />
          <rect className="code-line cl-5" x="372" y="172" width="56" height="5" rx="2.5" fill="rgba(255,255,255,0.45)" />
          <rect className="screen-caret" x="372" y="183" width="10" height="5" rx="2" fill="#10b981" />
        </g>
        {/* stand */}
        <rect x="426" y="202" width="14" height="14" fill="rgba(255,255,255,0.4)" />
        <rect x="408" y="214" width="52" height="5" rx="2.5" fill="rgba(255,255,255,0.5)" />
      </g>

      {/* coffee */}
      <g>
        <rect x="540" y="196" width="26" height="22" rx="4" fill="#10b981" />
        <path d="M566 200 q12 4 0 12" fill="none" stroke="#10b981" strokeWidth="3" strokeLinecap="round" />
        <path className="steam s-1" d="M548 188 q3 -6 0 -12" fill="none" stroke="rgba(255,255,255,0.5)" strokeWidth="2" strokeLinecap="round" />
        <path className="steam s-2" d="M557 188 q-3 -6 0 -12" fill="none" stroke="rgba(255,255,255,0.35)" strokeWidth="2" strokeLinecap="round" />
      </g>

      {/* plant */}
      <g>
        <path className="leaf" d="M178 218 q-6 -26 -22 -34 q14 2 22 14 q4 -18 -2 -30 q12 10 10 30 q12 -12 22 -12 q-16 10 -20 32 z" fill="#10b981" opacity="0.85" />
        <rect x="168" y="216" width="28" height="16" rx="3" fill="rgba(255,255,255,0.7)" />
      </g>

      {/* person, seated, typing */}
      <g>
        {/* chair */}
        <rect x="218" y="170" width="14" height="92" rx="6" fill="rgba(255,255,255,0.28)" />
        <rect x="206" y="256" width="80" height="8" rx="4" fill="rgba(255,255,255,0.28)" />
        {/* body */}
        <path d="M248 152 q26 -8 40 6 l8 44 q-2 16 -18 16 l-32 0 q-10 -28 2 -66" fill="#10b981" />
        {/* head, bobbing while focused */}
        <g className="head">
          <circle cx="276" cy="128" r="20" fill="#f4d7c0" />
          <path d="M258 122 q4 -18 24 -16 q14 2 12 16 q-2 -8 -16 -9 q-14 -1 -20 9z" fill="#0a0a0a" />
          {/* headphones */}
          <path d="M257 121 q2 -20 21 -19 q19 1 19 20" fill="none" stroke="#0a0a0a" strokeWidth="4" strokeLinecap="round" />
          <rect x="252" y="118" width="7" height="13" rx="3.5" fill="#0a0a0a" />
          <rect x="293" y="118" width="7" height="13" rx="3.5" fill="#0a0a0a" />
          {/* eye, blinking */}
          <circle className="eye" cx="290" cy="128" r="2.2" fill="#0a0a0a" />
        </g>
        {/* arms typing, alternating taps */}
        <g className="arm arm-l">
          <path d="M260 172 q16 22 44 32 l6 -8 q-24 -12 -38 -30 z" fill="#0c8c66" />
          <circle cx="308" cy="200" r="6" fill="#f4d7c0" />
        </g>
        <g className="arm arm-r">
          <path d="M282 168 q22 22 52 34 l5 -9 q-28 -12 -46 -31 z" fill="#10b981" />
          <circle cx="337" cy="198" r="6" fill="#f4d7c0" />
        </g>
      </g>

      {/* keyboard */}
      <g>
        <rect x="296" y="206" width="92" height="12" rx="4" fill="rgba(255,255,255,0.85)" />
        {[0, 1, 2, 3, 4, 5].map((i) => (
          <rect key={i} x={302 + i * 14} y={209} width="10" height="6" rx="1.5" fill="rgba(10,10,10,0.35)" />
        ))}
        {/* keystroke sparks */}
        <circle className="key-spark k-1" cx="318" cy="202" r="2" fill="#10b981" />
        <circle className="key-spark k-2" cx="348" cy="202" r="2" fill="#10b981" />
        <circle className="key-spark k-3" cx="368" cy="202" r="2" fill="#10b981" />
      </g>

      {/* floating shipped notifications */}
      <g className="notif n-1">
        <rect x="92" y="120" width="96" height="26" rx="13" fill="rgba(255,255,255,0.92)" />
        <circle cx="108" cy="133" r="7" fill="#10b981" />
        <path d="M105 133l2.4 2.4 4-4.8" stroke="white" strokeWidth="1.8" fill="none" strokeLinecap="round" />
        <rect x="122" y="130" width="54" height="6" rx="3" fill="rgba(10,10,10,0.5)" />
      </g>
      <g className="notif n-2">
        <rect x="74" y="166" width="78" height="24" rx="12" fill="rgba(16,185,129,0.9)" />
        <rect x="86" y="176" width="54" height="5" rx="2.5" fill="rgba(255,255,255,0.8)" />
      </g>
    </svg>
  );
}

export default function Footer() {
  return (
    <footer className="overflow-hidden border-t border-white/10 bg-foreground pb-10 pt-16 text-white">
      <div className="mx-auto max-w-7xl px-6 lg:px-12">
        {/* the workshop frame; the scene pops out over its top edge */}
        <div className="relative mx-auto max-w-2xl">
          <div
            className="absolute inset-x-2 bottom-1 top-[42%] rounded-3xl border border-white/10 bg-white/[0.03] shadow-[0_0_60px_rgba(16,185,129,0.07)_inset] sm:inset-x-6"
            aria-hidden
          >
            <span className="absolute bottom-3 right-4 hidden items-center gap-1.5 font-mono text-[9px] uppercase tracking-[0.3em] text-white/30 sm:flex">
              <span className="h-1.5 w-1.5 animate-pulse rounded-full bg-accent" />
              live · the workshop
            </span>
          </div>
          <div className="relative z-10">
            <TypistScene />
          </div>
        </div>
        <p className="mt-6 text-center font-mono text-xs uppercase tracking-[0.3em] text-white/40">
          shipping product, one keystroke at a time
        </p>

        <div className="mt-12 flex flex-col items-center justify-between gap-5 border-t border-white/10 pt-8 sm:flex-row">
          <Link href="/" aria-label="Grow In Product, home" className="flex items-center gap-2.5">
            <Image
              src="/logo-mark.png"
              alt=""
              width={28}
              height={28}
              className="h-7 w-7 brightness-0 invert"
            />
            <span className="text-sm font-semibold tracking-tight">
              Grow In Product<span className="text-accent">.</span>
            </span>
          </Link>
          <p className="text-xs text-white/40">
            © {new Date().getFullYear()} Grow In Product. Product management &amp; technology consulting.
          </p>
          <div className="flex gap-6 text-xs text-white/50">
            <Link href="/#services" className="transition-colors hover:text-white">Services</Link>
            <Link href="/projects" className="transition-colors hover:text-white">Work</Link>
            <Link href="/process" className="transition-colors hover:text-white">Process</Link>
            <Link href="/contact" className="transition-colors hover:text-white">Contact</Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
