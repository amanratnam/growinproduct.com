import type { Metadata } from "next";
import WorkIndex from "@/components/WorkIndex";
import Reveal, { RevealLines } from "@/components/Reveal";
import { cases } from "@/lib/content";

export const metadata: Metadata = {
  title: "Work",
  description:
    "Case studies across healthcare SaaS, workflow optimisation, product strategy and AI automation. Details anonymised, numbers real.",
};

export default function WorkPage() {
  return (
    <main>
      <section className="shell pb-[clamp(22px,4vh,56px)] pt-[clamp(24px,5vh,96px)]">
        <div className="rule-b flex flex-wrap items-baseline justify-between gap-x-4 gap-y-1 pb-3 md:pb-4">
          <p className="label text-ink-40">Selected work</p>
          <p className="label text-ink-40">
            {String(cases.length).padStart(2, "0")} cases
          </p>
        </div>

        <h1 className="display mt-[clamp(24px,5vh,56px)] text-[clamp(2.4rem,9vw,8rem)]">
          <RevealLines lines={["Outcomes,", "not decks"]} stagger={0.1} />
        </h1>

        <Reveal as="p" delay={0.14} className="mt-7 max-w-[52ch] leading-relaxed text-muted">
          Four engagements across healthcare SaaS, operations, strategy and AI.
          Clients are anonymised; the numbers are not. Each one shows what the
          product looked like before, and what changed.
        </Reveal>
      </section>

      <WorkIndex />
    </main>
  );
}
