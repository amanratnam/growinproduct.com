import type { Metadata } from "next";
import PageHeader from "@/components/PageHeader";
import AboutBlock, { StandupScene } from "@/components/AboutBlock";
import CtaBand from "@/components/CtaBand";
import { about } from "@/lib/content";

export const metadata: Metadata = {
  title: "About",
  description:
    "One senior product operator, not an agency bench. A decade of turning fuzzy business problems into shipped, measurable product.",
};

export default function AboutPage() {
  return (
    <main>
      <PageHeader lines={about.title} intro={about.lead} aside={<StandupScene />} />
      <AboutBlock />
      <CtaBand />
    </main>
  );
}
