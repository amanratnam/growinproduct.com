"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import Reveal from "./Reveal";
import { Standup, Walker } from "./Characters";
import { cases, type Case } from "@/lib/content";

/* ---------------------------------------------------------------------------
   Full case index. Each case is a tall editorial spread rather than a mostly
   empty plate: a live diagram, a before/after table, the outcome figures, and
   a small inhabitant, so the space is earned rather than padded.
--------------------------------------------------------------------------- */

const S = {
  fill: "none",
  stroke: "currentColor",
  strokeWidth: 1.25,
  vectorEffect: "non-scaling-stroke" as const,
};

/* Per-case before/after, so the table says something specific. */
const COMPARISON: Record<string, { label: string; before: string; after: string }[]> = {
  "patient-intake": [
    { label: "Screens to complete", before: "14", after: "5" },
    { label: "Insurance check", before: "Manual, blocking", after: "Async, fallback" },
    { label: "Median intake", before: "11m 20s", after: "4m 18s" },
    { label: "Abandonment", before: "31%", after: "9%" },
  ],
  "ops-workflow": [
    { label: "Process steps", before: "40", after: "12" },
    { label: "Manual handoffs", before: "17", after: "0" },
    { label: "Approval routing", before: "Tribal knowledge", after: "Rule-based" },
    { label: "Weekly hours", before: "44h", after: "13h" },
  ],
  "focused-roadmap": [
    { label: "Roadmap items", before: "80", after: "32" },
    { label: "Time to core value", before: "3 sessions", after: "< 5 min" },
    { label: "Activation", before: "8.4%", after: "19.3%" },
    { label: "90-day retention", before: "41%", after: "58%" },
  ],
  "support-copilot": [
    { label: "Tickets touched by a human", before: "100%", after: "22%" },
    { label: "First response", before: "3h 40m", after: "1h 42m" },
    { label: "Quality review", before: "Ad hoc", after: "Weekly eval set" },
    { label: "Escalation path", before: "None", after: "Confidence-gated" },
  ],
};

/* ------------------------------------------------------------- diagrams -- */

function CaseArt({ index, live }: { index: number; live: boolean }) {
  /* `live` drives the one-shot draw-in; the ambient loops run regardless so a
     card is never completely still. */
  const on = live ? "wa-on" : "";

  return (
    <svg viewBox="0 0 320 200" className="h-full w-full text-rule" aria-hidden>
      {[40, 80, 120, 160].map((y) => (
        <line key={y} x1="0" y1={y} x2="320" y2={y} {...S} strokeWidth="0.8" />
      ))}

      {index === 0 && (
        <>
          {/* funnel collapsing 14 steps to 5 */}
          {Array.from({ length: 5 }).map((_, i) => (
            <rect
              key={i}
              x={44 + i * 14}
              y={26 + i * 16}
              width={232 - i * 28}
              height="11"
              {...S}
              stroke={i === 4 ? "var(--accent)" : "currentColor"}
              strokeWidth={i === 4 ? 1.8 : 1.25}
              className={`wa-slide ${on}`}
              style={{ animationDelay: `${i * 0.08}s` }}
            />
          ))}
          {/* a packet travelling the finished flow, forever */}
          <circle r="4.5" fill="var(--accent)">
            <animateMotion dur="4.5s" repeatCount="indefinite" path="M58 170 H262" />
          </circle>
          <line x1="58" y1="170" x2="262" y2="170" {...S} strokeDasharray="3 5" />
        </>
      )}

      {index === 1 && (
        <>
          {/* 17 handoffs replaced by one routed path */}
          {Array.from({ length: 9 }).map((_, i) => (
            <circle
              key={i}
              cx={32 + i * 32}
              cy={i % 2 ? 62 : 128}
              r="5"
              {...S}
              className={`wa-fade ${on}`}
              style={{ animationDelay: `${i * 0.05}s` }}
            />
          ))}
          <path
            d="M32 128 C 96 128, 96 62, 160 62 S 236 128, 288 128"
            {...S}
            stroke="var(--accent)"
            strokeWidth="1.8"
            className={`wa-draw ${on}`}
          />
          <circle r="5" fill="var(--accent)">
            <animateMotion
              dur="5.5s"
              repeatCount="indefinite"
              path="M32 128 C 96 128, 96 62, 160 62 S 236 128, 288 128"
            />
          </circle>
        </>
      )}

      {index === 2 && (
        <>
          {/* 80 items cut down, one line rising */}
          {Array.from({ length: 18 }).map((_, i) => (
            <line
              key={i}
              x1={22 + i * 16}
              y1="176"
              x2={22 + i * 16}
              y2={176 - (i < 7 ? 96 : 12)}
              {...S}
              className={`wa-fade ${on}`}
              style={{
                animationDelay: `${i * 0.025}s`,
                opacity: i < 7 ? undefined : 0.4,
              }}
            />
          ))}
          <polyline
            points="22,152 76,134 130,98 184,74 238,46 296,22"
            {...S}
            stroke="var(--accent)"
            strokeWidth="1.8"
            className={`wa-draw ${on}`}
          />
          <circle r="4.5" fill="var(--accent)" className="wa-pulse">
            <animateMotion
              dur="5s"
              repeatCount="indefinite"
              path="M22 152 L76 134 L130 98 L184 74 L238 46 L296 22"
            />
          </circle>
        </>
      )}

      {index === 3 && (
        <>
          {/* triage hub: most routed by model, a few to a human */}
          <circle cx="160" cy="100" r="30" {...S} stroke="var(--accent)" strokeWidth="1.8" />
          <circle cx="160" cy="100" r="30" {...S} stroke="var(--accent)" className="wa-ring" />
          {[
            [36, 40],
            [36, 100],
            [36, 160],
            [284, 56],
            [284, 144],
          ].map(([x, y], i) => (
            <g key={i} className={`wa-fade ${on}`} style={{ animationDelay: `${0.1 + i * 0.07}s` }}>
              <line x1={x} y1={y} x2={x < 160 ? 130 : 190} y2="100" {...S} />
              <rect x={x - 9} y={y - 7} width="18" height="14" rx="2" {...S} />
            </g>
          ))}
          {[0, 1, 2].map((i) => (
            <circle key={i} r="3.5" fill="var(--accent)">
              <animateMotion
                dur="3.4s"
                begin={`${i * 1.1}s`}
                repeatCount="indefinite"
                path={`M36 ${40 + i * 60} L130 100`}
              />
            </circle>
          ))}
        </>
      )}
    </svg>
  );
}

/* ----------------------------------------------------------------- card -- */

function CaseCard({ item, index, total }: { item: Case; index: number; total: number }) {
  const ref = useRef<HTMLElement>(null);
  const [live, setLive] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const io = new IntersectionObserver(
      ([entry]) => {
        if (entry.intersectionRatio > 0.2) {
          setLive(true);
          io.disconnect();
        }
      },
      { threshold: [0, 0.2, 0.5] }
    );
    io.observe(el);
    return () => io.disconnect();
  }, []);

  const rows = COMPARISON[item.id] ?? [];

  return (
    <section
      ref={ref}
      data-theme={item.theme}
      aria-label={`Case ${index + 1}: ${item.title.join(" ")}`}
      className="rule-b py-[clamp(36px,6vh,104px)]"
    >
      {/* meta rail */}
      <div className="flex items-baseline justify-between gap-4">
        <p className="label text-ink-40">
          Case {String(index + 1).padStart(2, "0")} / {String(total).padStart(2, "0")}
        </p>
        <p className="label text-ink-40">{item.sector}</p>
      </div>

      <div className="mt-8 grid gap-x-8 gap-y-10 lg:grid-cols-12">
        {/* ---- title + summary ---- */}
        <div className="lg:col-span-5">
          <Reveal>
            <h2 className="display text-[clamp(1.9rem,4.6vw,3.6rem)]">
              {item.title.map((line) => (
                <span key={line} className="block">
                  {line}
                </span>
              ))}
            </h2>
          </Reveal>

          <div className="mt-5 flex flex-wrap gap-x-5 gap-y-2">
            {item.tags.map((tag) => (
              <span key={tag} className="label text-ink-40">
                {tag}
              </span>
            ))}
          </div>

          <p className="display mt-8 text-[clamp(1.6rem,3.2vw,2.6rem)] text-accent">
            {item.headline}
          </p>

          <p className="mt-6 max-w-[46ch] leading-relaxed text-muted">{item.summary}</p>
          <p className="mt-4 max-w-[52ch] text-sm leading-relaxed text-muted">{item.body}</p>

          {/* outcome figures */}
          {/* Label and figure share a row on a phone; three columns only once
              there's width for them. */}
          <dl className="mt-8 grid grid-cols-1 gap-px border border-rule bg-rule sm:grid-cols-3">
            {item.stats.map(([value, label]) => (
              <div
                key={label}
                className="flex items-baseline justify-between gap-3 bg-bg px-4 py-3 sm:block sm:py-5"
              >
                <dd className="display order-2 text-[1.1rem] sm:order-none sm:text-[clamp(1.1rem,2vw,1.7rem)]">
                  {value}
                </dd>
                <dt className="label order-1 text-ink-40 sm:order-none sm:mt-2">{label}</dt>
              </div>
            ))}
          </dl>
        </div>

        {/* ---- diagram + before/after table ---- */}
        <div className="lg:col-span-7">
          <div className="relative border border-rule">
            <span className="frame__ticks" aria-hidden>
              <span />
              <span />
              <span />
              <span />
            </span>
            <div className="h-[clamp(180px,26vh,300px)] w-full p-3 sm:p-5">
              <CaseArt index={index} live={live} />
            </div>
          </div>

          <table className="mt-px w-full table-fixed border-collapse border border-rule text-[13px] sm:text-sm">
            <caption className="sr-only">
              Before and after for {item.title.join(" ")}
            </caption>
            <thead>
              <tr className="border-b border-rule">
                <th scope="col" className="label px-2.5 py-2.5 text-left text-ink-40 sm:px-4 sm:py-3">
                  Measure
                </th>
                <th scope="col" className="label px-2.5 py-2.5 text-left text-ink-40 sm:px-4 sm:py-3">
                  Before
                </th>
                <th scope="col" className="label px-2.5 py-2.5 text-left text-accent sm:px-4 sm:py-3">
                  After
                </th>
              </tr>
            </thead>
            <tbody>
              {rows.map((row) => (
                <tr key={row.label} className="border-b border-rule last:border-0">
                  <th scope="row" className="px-2.5 py-2.5 text-left font-medium text-ink sm:px-4 sm:py-3">
                    {row.label}
                  </th>
                  <td className="px-2.5 py-2.5 text-muted line-through decoration-ink-20 sm:px-4 sm:py-3">
                    {row.before}
                  </td>
                  <td className="px-2.5 py-2.5 font-semibold text-ink sm:px-4 sm:py-3">{row.after}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </section>
  );
}

/* ---------------------------------------------------------------- index -- */

export default function WorkIndex() {
  return (
    <div id="work">
      <div className="shell">
        {cases.map((item, i) => (
          <CaseCard key={item.id} item={item} index={i} total={cases.length} />
        ))}
      </div>

      {/* someone walks out of the index and into the CTA */}
      <div className="char-strip h-16 border-b border-rule">
        <Walker duration={36} />
        <Walker accent duration={48} delay={-16} />
      </div>

      <section className="shell py-[var(--block)]">
        <div className="grid items-end gap-8 md:grid-cols-12">
          <div className="md:col-span-7">
            <h2 className="display text-[clamp(1.8rem,4.6vw,3.6rem)]">
              Your project could be next
            </h2>
            <p className="mt-5 max-w-[42ch] leading-relaxed text-muted">
              Every one of these started as a single conversation about a problem
              nobody had framed properly yet.
            </p>
            <Link href="/contact" className="pill pill--solid mt-8">
              Start the conversation
              <span aria-hidden>&rarr;</span>
            </Link>
          </div>
          <div className="md:col-span-4 md:col-start-9">
            <div className="h-36 w-full">
              <Standup />
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
