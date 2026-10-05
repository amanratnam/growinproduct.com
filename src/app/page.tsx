import Hero from "@/components/Hero";
import ImpactSummary from "@/components/ImpactSummary";
import ServiceIndex from "@/components/ServiceIndex";
import { ProcessStepper } from "@/components/ProcessStages";
import Praise from "@/components/Praise";
import CtaBand from "@/components/CtaBand";

/* White, ink, white, sand, white, accent: every section change is also a
   surface change, so the page reads as distinct chapters. */
export default function Home() {
  return (
    <main>
      <Hero />
      <ImpactSummary />
      <ServiceIndex />
      <ProcessStepper />
      <Praise />
      <CtaBand />
    </main>
  );
}
