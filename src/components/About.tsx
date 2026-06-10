"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import SectionShell from "./SectionShell";

gsap.registerPlugin(ScrollTrigger);

const timeline = [
  {
    period: "Early career",
    title: "Engineering & Business Analysis",
    desc: "Started on the technical side — building, then translating between business and engineering.",
  },
  {
    period: "Growth years",
    title: "Product Management",
    desc: "Owned products end to end across healthcare, SaaS and operations-heavy domains.",
  },
  {
    period: "Recent",
    title: "AI & Automation Practice",
    desc: "Shipped LLM-powered workflows and automation systems before it was a buzzword.",
  },
  {
    period: "Now",
    title: "Grow In Product",
    desc: "Independent consulting — fractional product leadership for teams that want senior judgment without senior overhead.",
  },
];

const skills = [
  "Product Strategy",
  "Roadmapping",
  "PRDs & Specs",
  "User Research",
  "Data Analysis",
  "Workflow Design",
  "LLM Integration",
  "Automation",
  "Stakeholder Management",
  "Agile Delivery",
  "Healthcare SaaS",
  "B2B Platforms",
];

export default function About() {
  const contentRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(
        ".about-copy > *",
        { y: 30, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 0.8,
          stagger: 0.12,
          ease: "power3.out",
          scrollTrigger: { trigger: ".about-copy", start: "top 80%" },
        }
      );

      gsap.fromTo(
        ".timeline-spine",
        { scaleY: 0 },
        {
          scaleY: 1,
          ease: "none",
          transformOrigin: "top center",
          scrollTrigger: {
            trigger: ".timeline-wrap",
            start: "top 75%",
            end: "bottom 65%",
            scrub: true,
          },
        }
      );

      gsap.utils.toArray<HTMLElement>(".timeline-item").forEach((item) => {
        gsap.fromTo(
          item,
          { x: -40, opacity: 0 },
          {
            x: 0,
            opacity: 1,
            duration: 0.8,
            ease: "power3.out",
            scrollTrigger: { trigger: item, start: "top 82%" },
          }
        );
      });

      gsap.fromTo(
        ".skill-chip",
        { scale: 0.6, opacity: 0 },
        {
          scale: 1,
          opacity: 1,
          duration: 0.5,
          stagger: 0.04,
          ease: "back.out(2)",
          scrollTrigger: { trigger: ".skills-wrap", start: "top 88%" },
        }
      );
    }, contentRef);
    return () => ctx.revert();
  }, []);

  return (
    <SectionShell
      id="about"
      eyebrow="About"
      title={
        <>
          One operator.
          <br />
          Full product brain.
        </>
      }
    >
      <div ref={contentRef}>
        <div className="about-copy max-w-xl">
          <p className="text-lg leading-relaxed text-muted">
            Grow In Product is run by a single senior product operator — not a
            bench of juniors behind a polished pitch. You get the person you
            talk to, on every document, every decision, every demo.
          </p>
          <p className="mt-4 leading-relaxed text-muted">
            The throughline of my career: turning fuzzy business problems into
            shipped, measurable product. Lately, with a heavy dose of AI and
            automation where it genuinely earns its keep.
          </p>
        </div>

        <div className="timeline-wrap relative mt-12 pl-8">
          <span className="absolute left-[5px] top-2 h-[calc(100%-1rem)] w-px bg-line" aria-hidden />
          <span className="timeline-spine absolute left-[5px] top-2 h-[calc(100%-1rem)] w-px bg-accent" aria-hidden />
          <div className="space-y-10">
            {timeline.map((t) => (
              <div key={t.title} className="timeline-item relative">
                <span className="absolute -left-8 top-1.5 h-[11px] w-[11px] rounded-full border-2 border-accent bg-white" />
                <p className="font-mono text-xs uppercase tracking-wider text-accent-dark">{t.period}</p>
                <h3 className="mt-1.5 text-xl font-semibold tracking-tight">{t.title}</h3>
                <p className="mt-2 max-w-lg text-sm leading-relaxed text-muted">{t.desc}</p>
              </div>
            ))}
          </div>
        </div>

        <div className="skills-wrap mt-12">
          <p className="text-xs font-semibold uppercase tracking-widest text-muted">Expertise</p>
          <div className="mt-4 flex flex-wrap gap-2">
            {skills.map((s) => (
              <span
                key={s}
                className="skill-chip cursor-default rounded-full border border-line bg-white px-3.5 py-1.5 text-xs font-medium transition-all duration-300 hover:border-accent hover:bg-accent-soft hover:text-accent-dark"
              >
                {s}
              </span>
            ))}
          </div>
        </div>
      </div>
    </SectionShell>
  );
}
