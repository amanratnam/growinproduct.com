import type { Metadata } from "next";
import AboutBlock from "@/components/AboutBlock";
import { RevealLines } from "@/components/Reveal";

export const metadata: Metadata = {
  title: "About",
  description:
    "One senior product operator, not an agency bench. A decade of turning fuzzy business problems into shipped, measurable product.",
};

export default function AboutPage() {
  return (
    <main>
      <section className="shell pb-[clamp(36px,6vh,72px)] pt-[clamp(40px,8vh,96px)]">
        <div className="rule-b flex items-baseline justify-between gap-4 pb-4">
          <p className="label text-ink-40">About</p>
          <p className="label text-ink-40">One operator</p>
        </div>

        <h1 className="display mt-[clamp(24px,5vh,56px)] text-[clamp(2.4rem,9vw,8rem)]">
          <RevealLines lines={["One operator,", "full product brain"]} stagger={0.1} />
        </h1>
      </section>

      <AboutBlock />
    </main>
  );
}
