import Hero from "@/components/Hero";
import ServiceIndex from "@/components/ServiceIndex";
import CaseStack from "@/components/CaseStack";
import ProcessStages from "@/components/ProcessStages";
import AboutBlock from "@/components/AboutBlock";
import Praise from "@/components/Praise";

export default function Home() {
  return (
    <main>
      <Hero />
      <ServiceIndex />
      <CaseStack />
      <ProcessStages />
      <AboutBlock />
      <Praise />
    </main>
  );
}
