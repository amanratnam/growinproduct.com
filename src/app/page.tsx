import Hero from "@/components/Hero";
import ImpactSummary from "@/components/ImpactSummary";
import ServiceIndex from "@/components/ServiceIndex";
import ProcessStages from "@/components/ProcessStages";
import Praise from "@/components/Praise";

export default function Home() {
  return (
    <main>
      <Hero />
      <ImpactSummary />
      <ServiceIndex />
      <ProcessStages />
      <Praise />
    </main>
  );
}
