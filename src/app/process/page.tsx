import type { Metadata } from "next";
import Link from "next/link";
import ProcessStages from "@/components/ProcessStages";
import Reveal, { RevealLines } from "@/components/Reveal";
import { stages } from "@/lib/content";

export const metadata: Metadata = {
  title: "Process",
  description:
    "Five stages from first insight to shipped outcome: Discover, Define, Design, Deliver, Scale.",
};

export default function ProcessPage() {
  return (
    <main>
      <section className="shell pb-[clamp(36px,6vh,72px)] pt-[clamp(40px,8vh,96px)]">
        <div className="rule-b flex items-baseline justify-between gap-4 pb-4">
          <p className="label text-ink-40">How the work runs</p>
          <p className="label text-ink-40">
            {String(stages.length).padStart(2, "0")} stages
          </p>
        </div>

        <h1 className="display mt-[clamp(24px,5vh,56px)] text-[clamp(2.4rem,9vw,8rem)]">
          <RevealLines lines={["Same five", "stages, always"]} stagger={0.1} />
        </h1>

        <div className="mt-[clamp(28px,6vh,64px)] grid gap-8 md:grid-cols-12">
          <div className="md:col-span-5 lg:col-span-4">
            <p className="label text-ink-40">No mystery</p>
          </div>
          <div className="md:col-span-7 lg:col-span-8">
            <Reveal as="p" className="prose-lead max-w-[52ch] text-ink">
              No methodology theatre and no black box. Five stages, each with a
              deliverable you can hold, run in tight loops until the product
              ships and keeps compounding after.
            </Reveal>
          </div>
        </div>
      </section>

      <ProcessStages standalone />

      <section className="shell pb-[var(--block)]">
        <div className="rule-t" />
        <div className="flex flex-col items-start justify-between gap-8 pt-10 md:flex-row md:items-end">
          <h2 className="display max-w-[18ch] text-[clamp(1.8rem,4.6vw,3.6rem)]">
            See where the road ends
          </h2>
          <div className="flex shrink-0 flex-wrap gap-3">
            <Link href="/projects" className="pill">
              View the work
            </Link>
            <Link href="/contact" className="pill pill--solid">
              Start a project
              <span aria-hidden>→</span>
            </Link>
          </div>
        </div>
      </section>
    </main>
  );
}
