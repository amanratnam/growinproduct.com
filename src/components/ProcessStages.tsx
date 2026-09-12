"use client";

import Reveal from "./Reveal";
import Section from "./Section";
import { stages } from "@/lib/content";

/* Each stage gets a diagram that shows what actually happens in it, so the
   page argues visually instead of asking you to read five paragraphs. All
   schematic hairlines in the page's own ink, animated once on entry. */

const S = {
  fill: "none",
  stroke: "currentColor",
  strokeWidth: 1.25,
  vectorEffect: "non-scaling-stroke" as const,
};

function StageArt({ index }: { index: number }) {
  return (
    <svg viewBox="0 0 240 120" className="h-full w-full text-rule" aria-hidden>
      {index === 0 && (
        <>
          {/* Discover: scattered signals converging into one read */}
          {[
            [24, 22],
            [52, 84],
            [30, 58],
            [70, 34],
            [46, 104],
          ].map(([x, y], i) => (
            <g key={i} className="pa-fade" style={{ animationDelay: `${i * 0.09}s` }}>
              <circle cx={x} cy={y} r="4" {...S} />
              <line x1={x + 5} y1={y} x2="148" y2="60" {...S} strokeWidth="0.8" />
            </g>
          ))}
          <rect x="150" y="40" width="66" height="40" {...S} stroke="var(--accent)" />
          <line x1="160" y1="54" x2="206" y2="54" {...S} stroke="var(--accent)" />
          <line x1="160" y1="64" x2="192" y2="64" {...S} stroke="var(--accent)" />
        </>
      )}

      {index === 1 && (
        <>
          {/* Define: many candidates, one sized and chosen */}
          {[0, 1, 2, 3, 4].map((i) => (
            <rect
              key={i}
              x="20"
              y={14 + i * 20}
              width={i === 2 ? 150 : 92 - i * 6}
              height="13"
              {...S}
              stroke={i === 2 ? "var(--accent)" : "currentColor"}
              className="pa-grow"
              style={{ animationDelay: `${i * 0.08}s`, transformOrigin: "20px center" }}
            />
          ))}
          <text x="178" y="65" className="pa-num" fill="var(--accent)" fontSize="13" fontWeight="700">
            1 of 5
          </text>
        </>
      )}

      {index === 2 && (
        <>
          {/* Design: flow of screens with a spec attached */}
          {[0, 1, 2].map((i) => (
            <g key={i} className="pa-fade" style={{ animationDelay: `${i * 0.12}s` }}>
              <rect x={18 + i * 62} y="28" width="44" height="64" rx="4" {...S} />
              <line x1={26 + i * 62} y1="40" x2={54 + i * 62} y2="40" {...S} />
              <line x1={26 + i * 62} y1="50" x2={46 + i * 62} y2="50" {...S} />
              {i < 2 && (
                <path
                  d={`M${64 + i * 62} 60 H${76 + i * 62}`}
                  {...S}
                  stroke="var(--accent)"
                  markerEnd=""
                />
              )}
            </g>
          ))}
          <rect x="196" y="28" width="30" height="64" {...S} stroke="var(--accent)" strokeDasharray="4 4" />
        </>
      )}

      {index === 3 && (
        <>
          {/* Deliver: sprint cadence with a shipping line */}
          {[0, 1, 2, 3].map((i) => (
            <g key={i}>
              <rect
                x={18 + i * 56}
                y="34"
                width="42"
                height="30"
                {...S}
                className="pa-grow"
                style={{ animationDelay: `${i * 0.1}s`, transformOrigin: "center" }}
              />
              <circle cx={39 + i * 56} cy="84" r="4" {...S} stroke="var(--accent)" />
            </g>
          ))}
          <line x1="18" y1="84" x2="222" y2="84" {...S} className="pa-draw" />
          <polyline points="210,78 220,84 210,90" {...S} stroke="var(--accent)" />
        </>
      )}

      {index === 4 && (
        <>
          {/* Scale: a funnel that keeps widening at the bottom */}
          {[0, 1, 2].map((i) => (
            <path
              key={i}
              d={`M${30 + i * 8} ${24 + i * 26} H${210 - i * 8} L${196 - i * 8} ${42 + i * 26} H${44 + i * 8} Z`}
              {...S}
              className="pa-fade"
              style={{ animationDelay: `${i * 0.1}s` }}
            />
          ))}
          <polyline
            points="40,104 80,96 120,84 160,66 206,40"
            {...S}
            stroke="var(--accent)"
            strokeWidth="1.8"
            className="pa-draw"
          />
        </>
      )}
    </svg>
  );
}

export default function ProcessStages({ standalone = false }: { standalone?: boolean }) {
  const rows = (
    <ol className="rule-t">
      {stages.map((stage, i) => (
        <li key={stage.name} className="rule-b">
          <Reveal delay={i * 0.05} className="grid grid-cols-12 items-start gap-x-5 gap-y-4 py-6 md:gap-x-6 md:gap-y-6 md:py-9">
            {/* number + name */}
            <div className="col-span-7 md:col-span-3">
              <span className="label text-ink-40">{String(i + 1).padStart(2, "0")}</span>
              <h3 className="display mt-3 text-[clamp(1.4rem,3vw,2.2rem)]">{stage.name}</h3>
            </div>

            {/* the diagram carries the explanation */}
            <div className="col-span-5 h-20 self-center md:col-span-4 md:h-32 md:self-start">
              <StageArt index={i} />
            </div>

            <div className="col-span-12 md:col-span-3">
              <p className="max-w-[38ch] text-[13px] leading-relaxed text-muted md:text-sm">{stage.desc}</p>
            </div>

            <div className="col-span-12 md:col-span-2">
              <p className="label text-ink-40">Outputs</p>
              <ul className="mt-2.5 flex flex-wrap gap-x-4 gap-y-1 md:mt-3 md:block md:space-y-1.5">
                {stage.outputs.map((o) => (
                  <li key={o} className="text-[13px] text-ink md:text-sm">
                    {o}
                  </li>
                ))}
              </ul>
            </div>
          </Reveal>
        </li>
      ))}
    </ol>
  );

  if (standalone) return <div className="shell pb-[var(--block)]">{rows}</div>;

  return (
    <Section
      id="process"
      eyebrow="Process"
      index={`${String(stages.length).padStart(2, "0")} stages`}
      title={
        <>
          The same five
          <br />
          stages, every time
        </>
      }
      blurb="No methodology theatre. Five stages, each with a deliverable you can hold, run in tight loops until the product ships and compounds."
    >
      {rows}
    </Section>
  );
}
