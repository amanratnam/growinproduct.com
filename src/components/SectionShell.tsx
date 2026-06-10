"use client";

import { useEffect, useRef, type ReactNode } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

/* Shared layout: sticky title column on the left, content on the right. */
export default function SectionShell({
  id,
  eyebrow,
  title,
  blurb,
  children,
  tone = "light",
}: {
  id?: string;
  eyebrow: string;
  title: ReactNode;
  blurb?: string;
  children: ReactNode;
  tone?: "light" | "tint";
}) {
  const ref = useRef<HTMLElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(
        ".shell-title > *",
        { y: 40, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 0.9,
          stagger: 0.1,
          ease: "power3.out",
          scrollTrigger: { trigger: ref.current, start: "top 75%" },
        }
      );
    }, ref);
    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={ref}
      id={id}
      className={`relative py-24 lg:py-32 ${tone === "tint" ? "bg-foreground/[0.018]" : "bg-white"}`}
    >
      <div className="mx-auto grid max-w-7xl gap-12 px-6 lg:grid-cols-[minmax(260px,1fr)_2.2fr] lg:gap-16 lg:px-12">
        <div>
          <div className="shell-title lg:sticky lg:top-28">
            <p className="text-sm font-semibold uppercase tracking-widest text-accent">{eyebrow}</p>
            <h2 className="mt-3 text-4xl font-bold tracking-tighter sm:text-5xl">{title}</h2>
            {blurb && <p className="mt-5 leading-relaxed text-muted">{blurb}</p>}
            <span className="mt-6 block h-px w-12 bg-accent" />
          </div>
        </div>
        <div className="min-w-0">{children}</div>
      </div>
    </section>
  );
}
