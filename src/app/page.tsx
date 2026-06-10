import SmoothScroll from "@/components/SmoothScroll";
import { SideRail, MobileNav } from "@/components/GameMenu";
import Hero from "@/components/Hero";
import Services from "@/components/Services";
import Process from "@/components/Process";
import Projects from "@/components/Projects";
import Testimonials from "@/components/Testimonials";
import About from "@/components/About";
import CTA from "@/components/CTA";
import Footer from "@/components/Footer";

export default function Home() {
  return (
    <SmoothScroll>
      <MobileNav />
      <SideRail />
      <main>
        <Hero />
        <Services />
        <Process />
        <Projects />
        <Testimonials />
        <About />
        <CTA />
      </main>
      <Footer />
    </SmoothScroll>
  );
}
