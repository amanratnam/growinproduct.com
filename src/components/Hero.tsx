"use client";

import Link from "next/link";
import dynamic from "next/dynamic";
import Marquee from "./Marquee";
import WordRotator from "./WordRotator";
import Reveal, { RevealLines } from "./Reveal";
import { heroMarquee, heroRotator, site } from "@/lib/content";

/* The 3D scene is client-only and heavy; keep it out of the server bundle and
   off the critical path so the headline paints immediately. */
const ValueMachine = dynamic(() => import("./three/ValueMachine"), {
  ssr: false,
  loading: () => null,
});

/* Opening plate: the statement holds the left column on one axis, and the
   perpetual value machine occupies the right. */
export default function Hero() {
  return (
    <section
      id="top"
      className="relative flex flex-col"
      style={{ minHeight: "calc(100svh - var(--header-h))" }}
    >
      <div className="grain" aria-hidden />

      <div className="shell flex flex-1 items-center pb-8 pt-[clamp(28px,5vh,64px)]">
        <div className="grid w-full items-center gap-x-10 gap-y-10 lg:grid-cols-12">
          {/* ---- left: the whole statement, left-aligned on one axis ---- */}
          <div className="lg:col-span-6">
            <h1 className="display text-[clamp(2.6rem,7.4vw,6.2rem)]">
              <RevealLines
                lines={[
                  "Grow in",
                  /* No wrapper: .reveal-line forces its child to display:block,
                     which knocks the rotator's own box out of alignment. */
                  <WordRotator key="rotator" words={heroRotator} className="text-accent" />,
                ]}
                stagger={0.1}
              />
            </h1>

            <Reveal
              as="p"
              delay={0.14}
              className="mt-7 max-w-[46ch] text-[clamp(1rem,1.15vw,1.15rem)] leading-relaxed text-muted"
            >
              Most consultancies hand you a deck. I ship product with you, from
              strategy through launch, as one senior operator rather than a bench
              of juniors behind a pitch.
            </Reveal>

            <Reveal delay={0.2} className="mt-8 flex flex-wrap items-center gap-3">
              <Link href="/work" className="pill pill--solid">
                See the work
              </Link>
              <Link href="/contact" className="pill">
                Start a conversation
              </Link>
            </Reveal>

            {/* Standing facts. Est. 2021 lives here as a credential rather than
                floating above the headline. */}
            <Reveal
              delay={0.26}
              className="mt-10 grid max-w-lg grid-cols-3 gap-px border border-rule bg-rule"
            >
              {[
                ["Est. 2021", "Independent"],
                ["10+ yrs", "Shipping product"],
                ["2 seats", "Open for Q3 2026"],
              ].map(([value, label]) => (
                <div key={label} className="bg-bg px-4 py-4">
                  <p className="display text-[clamp(0.95rem,1.5vw,1.3rem)]">{value}</p>
                  <p className="label mt-2 leading-relaxed text-ink-40">{label}</p>
                </div>
              ))}
            </Reveal>
          </div>

          {/* ---- right: the perpetual value machine ---- */}
          <div className="lg:col-span-6">
            <div
              className="relative h-[clamp(240px,38vh,460px)] w-full lg:h-[clamp(340px,54vh,560px)]"
              aria-hidden
            >
              <ValueMachine />
            </div>
            {/* Names what the loop is showing, so it argues rather than decorates. */}
            <div className="mt-1 grid grid-cols-3 gap-4 border-t border-rule pt-4">
              {[
                ["Capital in", "Budget, time, attention"],
                ["The work", "Strategy through build"],
                ["Product out", "Shipped, and compounding"],
              ].map(([head, sub]) => (
                <div key={head}>
                  <p className="label text-ink">{head}</p>
                  <p className="mt-1.5 text-[11px] leading-snug text-ink-40">{sub}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* bottom rail: marquee of disciplines + scroll cue */}
      <div className="relative">
        <div className="shell">
          <div className="rule-t" />
        </div>
        <Marquee
          items={heroMarquee.map((item) => (
            <span key={item} className="label text-ink">
              {item}
            </span>
          ))}
          duration={44}
          className="py-4"
        />
        <div className="shell">
          <div className="rule-t" />
        </div>

        <div className="shell flex items-center justify-between py-5">
          <p className="label text-ink-40">{site.tagline}</p>
          <a
            href="#impact"
            className="group label flex items-center gap-2 text-ink transition-colors duration-300 hover:text-accent"
          >
            Explore
            <span
              className="inline-block transition-transform duration-500 group-hover:translate-y-1"
              aria-hidden
            >
              &darr;
            </span>
          </a>
        </div>
      </div>
    </section>
  );
}
