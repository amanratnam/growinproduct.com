"use client";

import Link from "next/link";
import Section from "./Section";
import Reveal from "./Reveal";
import { cases } from "@/lib/content";

/* Home-page stand-in for the full work index. Numbers only, no fluff: the
   headline figure from every engagement, on a rail that never stops moving,
   plus one route into the detail. */

/* Flattened so the ticker reads as a single continuous stream of outcomes
   rather than four separate cards. */
const outcomes = cases.flatMap((c) =>
  c.stats.map(([value, label]) => ({ value, label, sector: c.sector }))
);

function Ticker({ reverse = false, duration }: { reverse?: boolean; duration: number }) {
  const run = [...outcomes, ...outcomes];
  return (
    <div
      className="marquee marquee--cards"
      style={
        {
          "--marquee-dur": `${duration}s`,
          "--marquee-dir": reverse ? "reverse" : "normal",
        } as React.CSSProperties
      }
      aria-hidden
    >
      <div className="marquee__track !gap-px !pr-px">
        {run.map((o, i) => (
          <div
            key={i}
            className="group flex w-[clamp(180px,20vw,240px)] shrink-0 flex-col justify-between border border-rule bg-bg px-5 py-6 transition-colors duration-300 hover:border-accent"
          >
            <p className="display text-[clamp(1.6rem,3vw,2.6rem)] transition-colors duration-300 group-hover:text-accent">
              {o.value}
            </p>
            <div className="mt-4">
              <p className="label text-ink">{o.label}</p>
              <p className="label mt-1.5 text-ink-40">{o.sector}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default function ImpactSummary() {
  return (
    <Section
      id="impact"
      eyebrow="Impact"
      index={`${String(cases.length).padStart(2, "0")} engagements`}
      title={
        <>
          The numbers,
          <br />
          not the narrative
        </>
      }
      blurb="Every figure below came out of a shipped engagement. Clients are anonymised; the results are not."
    >
      {/* two rails drifting opposite ways, so the section is never still */}
      <div className="space-y-px">
        <Ticker duration={64} />
        <Ticker duration={78} reverse />
      </div>

      <Reveal className="mt-12 flex flex-col items-start justify-between gap-6 border-t border-rule pt-8 md:flex-row md:items-center">
        <p className="max-w-[44ch] leading-relaxed text-muted">
          Each of these is a full case study &mdash; the problem, what we
          actually changed, and what moved as a result.
        </p>
        <Link href="/work" className="pill pill--solid shrink-0">
          See the work
          <span aria-hidden>&rarr;</span>
        </Link>
      </Reveal>
    </Section>
  );
}
