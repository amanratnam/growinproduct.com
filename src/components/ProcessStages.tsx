"use client";

import Reveal from "./Reveal";
import Section from "./Section";
import { stages } from "@/lib/content";

/* Five stages as a numbered editorial table. The counter rule on the left
   fills as each row enters, which is the only motion the section needs. */
export default function ProcessStages({ standalone = false }: { standalone?: boolean }) {
  const rows = (
    <ol className="rule-t">
      {stages.map((stage, i) => (
        <li key={stage.name} className="rule-b">
          <Reveal
            delay={i * 0.06}
            className="grid grid-cols-12 gap-x-4 gap-y-3 py-7 md:py-9"
          >
            <div className="col-span-2 md:col-span-1">
              <span className="label text-ink-40">{String(i + 1).padStart(2, "0")}</span>
            </div>

            <div className="col-span-10 md:col-span-3">
              <h3 className="display text-[clamp(1.4rem,3.2vw,2.4rem)]">{stage.name}</h3>
            </div>

            <div className="col-span-12 md:col-span-5 md:col-start-5">
              <p className="max-w-[46ch] leading-relaxed text-muted">{stage.desc}</p>
            </div>

            <div className="col-span-12 md:col-span-3">
              <p className="label text-ink-40">Outputs</p>
              <ul className="mt-3 space-y-1.5">
                {stage.outputs.map((o) => (
                  <li key={o} className="text-sm text-ink">
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

  if (standalone) {
    return <div className="shell pb-[var(--block)]">{rows}</div>;
  }

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
