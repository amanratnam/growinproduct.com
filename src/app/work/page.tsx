import type { Metadata } from "next";
import PageHeader from "@/components/PageHeader";
import WorkIndex, { CaseIndex } from "@/components/WorkIndex";
import CtaBand from "@/components/CtaBand";

export const metadata: Metadata = {
  title: "Work",
  description:
    "Case studies in healthcare SaaS, logistics, B2B analytics and customer support AI. Clients anonymised, numbers real.",
};

export default function WorkPage() {
  return (
    <main>
      <PageHeader
        lines={["Outcomes,", "not decks"]}
        intro="Four recent engagements. The clients stay anonymous; the numbers are exactly as measured."
        aside={<CaseIndex />}
      />
      <WorkIndex />
      <CtaBand />
    </main>
  );
}
