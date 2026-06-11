"use client";

import { useEffect, type ReactNode } from "react";
import { usePathname } from "next/navigation";
import Lenis from "lenis";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

export default function SmoothScroll({ children }: { children: ReactNode }) {
  const pathname = usePathname();

  useEffect(() => {
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reduced) return;

    const lenis = new Lenis({
      lerp: 0.14,
      wheelMultiplier: 1.1,
      touchMultiplier: 1.4,
    });

    lenis.on("scroll", ScrollTrigger.update);
    (window as unknown as { lenis?: Lenis }).lenis = lenis;

    const raf = (time: number) => {
      try {
        lenis.raf(time * 1000);
      } catch {
        gsap.ticker.remove(raf);
      }
    };
    gsap.ticker.add(raf);
    gsap.ticker.lagSmoothing(0);

    // same-page anchor links stay smooth
    const onClick = (e: MouseEvent) => {
      const anchor = (e.target as HTMLElement).closest<HTMLAnchorElement>('a[href^="#"]');
      if (!anchor) return;
      const target = document.querySelector(anchor.getAttribute("href")!);
      if (target) {
        e.preventDefault();
        lenis.scrollTo(target as HTMLElement, { offset: -64 });
      }
    };
    document.addEventListener("click", onClick);

    return () => {
      document.removeEventListener("click", onClick);
      gsap.ticker.remove(raf);
      delete (window as unknown as { lenis?: Lenis }).lenis;
      lenis.destroy();
    };
  }, []);

  // on route change: honor hashes, otherwise reset to top, then re-measure triggers
  useEffect(() => {
    const lenis = (window as unknown as { lenis?: Lenis }).lenis;
    const hash = window.location.hash;
    const settle = window.setTimeout(() => {
      if (hash) {
        const el = document.querySelector(hash);
        if (el) {
          if (lenis) lenis.scrollTo(el as HTMLElement, { offset: -64 });
          else el.scrollIntoView();
        }
      } else {
        if (lenis) lenis.scrollTo(0, { immediate: true });
        else window.scrollTo(0, 0);
      }
      ScrollTrigger.refresh();
    }, 80);
    return () => window.clearTimeout(settle);
  }, [pathname]);

  return <>{children}</>;
}
