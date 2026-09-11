import type { Metadata } from "next";
import Link from "next/link";
import CaseStack from "@/components/CaseStack";
import Reveal, { RevealLines } from "@/components/Reveal";
import { cases } from "@/lib/content";

export const metadata: Metadata = {
  title: "Work",
  description:
    "Case studies across healthcare SaaS, workflow optimisation, product strategy and AI automation. Details anonymised, numbers real.",
};

export default function ProjectsPage() {
  return (
    <main>
      <section className="shell pb-[clamp(36px,6vh,72px)] pt-[clamp(40px,8vh,96px)]">
        <div className="rule-b flex items-baseline justify-between gap-4 pb-4">
          <p className="label text-ink-40">Selected work</p>
          <p className="label text-ink-40">
            {String(cases.length).padStart(2, "0")} cases
          </p>
        </div>

        <h1 className="display mt-[clamp(24px,5vh,56px)] text-[clamp(2.4rem,9vw,8rem)]">
          <RevealLines lines={["Outcomes,", "not decks"]} stagger={0.1} />
        </h1>

        <div className="mt-[clamp(28px,6vh,64px)] grid gap-8 md:grid-cols-12">
          <div className="md:col-span-5 lg:col-span-4">
            <p className="label text-ink-40">The sample</p>
          </div>
          <div className="md:col-span-7 lg:col-span-8">
            <Reveal as="p" className="prose-lead max-w-[52ch] text-ink">
              Four engagements across healthcare SaaS, operations, strategy and
              AI. Clients are anonymised; the numbers are not. Open any case for
              the full story.
            </Reveal>
          </div>
        </div>
      </section>

      <CaseStack />

      <section className="shell py-[var(--block)]">
        <div className="rule-t" />
        <div className="flex flex-col items-start justify-between gap-8 pt-10 md:flex-row md:items-end">
          <h2 className="display max-w-[16ch] text-[clamp(1.8rem,4.6vw,3.6rem)]">
            Your project could be next
          </h2>
          <Link href="/contact" className="pill pill--solid shrink-0">
            Start the conversation
            <span aria-hidden>→</span>
          </Link>
        </div>
      </section>
    </main>
  );
}
