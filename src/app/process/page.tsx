import type { Metadata } from "next";
import PageHeader from "@/components/PageHeader";
import { StageRows } from "@/components/ProcessStages";
import CtaBand from "@/components/CtaBand";

export const metadata: Metadata = {
  title: "Process",
  description:
    "Five stages from first insight to shipped outcome: Discover, Define, Design, Deliver and Scale. Each one ends with something you can hold.",
};

export default function ProcessPage() {
  return (
    <main>
      <PageHeader
        lines={["Same five stages,", "every time"]}
        intro="No methodology theatre and no black box. Each stage ends with something you can hold, and the loop keeps running after launch."
      />
      <div className="pb-[var(--section-y)]">
        <StageRows />
      </div>
      <CtaBand />
    </main>
  );
}
