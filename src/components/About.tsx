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
    desc: "Started on the technical side, building, then translating between business and engineering.",
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
    desc: "Independent consulting, fractional product leadership for teams that want senior judgment without senior overhead.",
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
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const ctx = gsap.context(() => {
      // the whole section unveils top-to-bottom like a road appearing ahead
      if (!reduced) {
        gsap.fromTo(
          ".about-reveal",
          { clipPath: "inset(0% 0% 88% 0%)" },
          {
            clipPath: "inset(0% 0% 0% 0%)",
            ease: "none",
            scrollTrigger: {
              trigger: contentRef.current,
              start: "top 75%",
              end: "bottom 70%",
              scrub: 0.4,
            },
          }
        );
      }

      // the road line itself draws downward with scroll
      gsap.fromTo(
        ".about-road",
        { scaleY: 0 },
        {
          scaleY: 1,
          ease: "none",
          transformOrigin: "top center",
          scrollTrigger: {
            trigger: ".about-road-wrap",
            start: "top 75%",
            end: "bottom 65%",
            scrub: 0.4,
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
        <div className="about-reveal">
          <div className="max-w-xl">
            <p className="text-lg leading-relaxed text-muted">
              Grow In Product is run by a single senior product operator, not a
              bench of juniors behind a polished pitch. You get the person you
              talk to, on every document, every decision, every demo.
            </p>
            <p className="mt-4 leading-relaxed text-muted">
              The throughline of my career: turning fuzzy business problems into
              shipped, measurable product. Lately, with a heavy dose of AI and
              automation where it genuinely earns its keep.
            </p>
          </div>

          <div className="about-road-wrap relative mt-12 pl-10">
            {/* the road: dark strip with a dashed center line that draws in */}
            <div className="absolute left-0 top-2 h-[calc(100%-1rem)] w-4 rounded-full bg-foreground/[0.06]" aria-hidden />
            <div
              className="about-road absolute left-0 top-2 h-[calc(100%-1rem)] w-4 rounded-full bg-foreground"
              style={{
                backgroundImage:
                  "linear-gradient(to bottom, transparent 0 10px, rgba(52,211,153,0.95) 10px 22px)",
                backgroundSize: "2.5px 32px",
                backgroundPosition: "50% 0",
                backgroundRepeat: "repeat-y",
              }}
              aria-hidden
            />
            <div className="space-y-10">
              {timeline.map((t, i) => (
                <div key={t.title} className="timeline-item relative">
                  <span className="absolute -left-[34px] top-1 flex h-5 w-5 items-center justify-center rounded-full border-2 border-accent bg-white font-mono text-[8px] font-bold text-accent-dark">
                    {i + 1}
                  </span>
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
      </div>
    </SectionShell>
  );
}
