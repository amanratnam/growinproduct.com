"use client";

import Link from "next/link";
import Marquee from "./Marquee";
import WordRotator from "./WordRotator";
import { RevealLines } from "./Reveal";
import { heroMarquee, heroRotator, site } from "@/lib/content";

/* Full-viewport opening plate. Giant display line with one rotating word, a
   standing statement underneath, and the marquee + explore cue pinned to the
   bottom edge so the fold reads as a single composed frame. */
export default function Hero() {
  return (
    <section
      id="top"
      className="relative flex flex-col"
      style={{ minHeight: "calc(100svh - var(--header-h))" }}
    >
      <div className="grain" aria-hidden />

      <div className="shell flex flex-1 flex-col justify-center pb-10 pt-[clamp(48px,9vh,96px)]">
        {/* meta row, aligned to the same gutter as everything below */}
        <div className="rule-b flex items-baseline justify-between gap-4 pb-4">
          <p className="label text-ink-40">Independent consultancy</p>
          <p className="label text-ink-40">Est. 2021</p>
        </div>

        <h1 className="display mt-[clamp(24px,5vh,56px)] text-[clamp(2.6rem,11.5vw,10.5rem)]">
          <RevealLines
            lines={[
              "Grow in",
              <span key="rotator" className="inline-flex items-baseline">
                <WordRotator words={heroRotator} className="text-accent" />
              </span>,
            ]}
            stagger={0.1}
          />
        </h1>

        {/* Statement column sits on the right half on wide screens so the
            display line keeps the full measure to itself. */}
        <div className="mt-[clamp(28px,6vh,64px)] grid gap-8 md:grid-cols-12">
          <div className="md:col-span-5 lg:col-span-4">
            <p className="label text-ink-40">What this is</p>
          </div>
          <div className="md:col-span-7 lg:col-span-8">
            <p className="prose-lead max-w-[52ch] text-ink">
              Most consultancies hand you a deck. I ship product with you, from
              strategy through launch, as one senior operator rather than a bench
              of juniors behind a pitch.
            </p>
            <div className="mt-7 flex flex-wrap items-center gap-3">
              <Link href="/projects" className="pill pill--solid">
                See the work
              </Link>
              <Link href="/contact" className="pill">
                Start a conversation
              </Link>
              <span className="label ml-1 flex items-center gap-2 text-ink-40">
                <span className="h-1.5 w-1.5 rounded-full bg-accent" aria-hidden />
                {site.availability}
              </span>
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
            href="#services"
            className="group label flex items-center gap-2 text-ink transition-colors duration-300 hover:text-accent"
          >
            Explore
            <span
              className="inline-block transition-transform duration-500 group-hover:translate-y-1"
              aria-hidden
            >
              ↓
            </span>
          </a>
        </div>
      </div>
    </section>
  );
}
