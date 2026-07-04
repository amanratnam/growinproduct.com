"use client";

import { type ReactNode } from "react";
import SectionShell from "./SectionShell";
import { CrosshairIcon, ChartUpIcon, DocIcon } from "./Icons";
import { PopChar, RocketLaptop } from "./Characters";

type Category = "interview" | "strategy" | "articles";

const categories: Record<Category, { label: string; icon: ReactNode }> = {
  interview: { label: "Interview Prep", icon: <CrosshairIcon className="h-3.5 w-3.5" /> },
  strategy: { label: "Product Strategy & Roadmapping", icon: <ChartUpIcon className="h-3.5 w-3.5" /> },
  articles: { label: "Educational Articles", icon: <DocIcon className="h-3.5 w-3.5" /> },
};

type Review = { quote: string; time: string; cat: Category };

/* Real client feedback, names withheld. Time is when the review was left. */
const reviews: Review[] = [
  {
    quote:
      "Aman was great, I would highly recommend having mock interviews with him. Very understanding even when our schedules weren't aligning. I definitely learned some things from our mock interview and he was even willing to mock a case study if I wanted to.",
    time: "3 months ago",
    cat: "interview",
  },
  { quote: "Extremely knowledgeable.", time: "1 year ago", cat: "interview" },
  {
    quote: "I got actionable feedback on how to improve an interview use case presentation.",
    time: "1 year ago",
    cat: "interview",
  },
  { quote: "Great work!!", time: "1 year ago", cat: "strategy" },
  {
    quote:
      "After sending me a document reviewing an interview, he answered all my questions in detail and provided materials to help me develop the areas where I can improve. Overall I recommend him for providing feedback on your interviews.",
    time: "1 year ago",
    cat: "interview",
  },
  { quote: "An exceptional service was delivered.", time: "2 years ago", cat: "interview" },
  {
    quote:
      "I collaborated with Aman on a few side projects. He is professional and will always go the extra mile for you. Will definitely hire again, thanks Aman!",
    time: "2 years ago",
    cat: "articles",
  },
  {
    quote:
      "I enjoyed working with Aman so much that I signed up for two additional coaching sessions to get even more practice answering Product Management interview questions. I highly recommend his services to anyone looking to ace their upcoming PM interviews.",
    time: "2 years ago",
    cat: "interview",
  },
  {
    quote:
      "Aman was incredible to work with! A Product Management expert who demonstrated his knowledge during our 1:1 mock interview and coaching sessions. I went in with no idea how to answer RCA and product design questions, and by our last session I felt like a pro.",
    time: "2 years ago",
    cat: "interview",
  },
  { quote: "Great work.", time: "3 years ago", cat: "strategy" },
  {
    quote:
      "Excellent quality and efficient work as always. I've ordered from him multiple times at this point, and he never disappoints. It's always above and beyond. I'd highly recommend him for any product management assistance.",
    time: "3 years ago",
    cat: "strategy",
  },
  {
    quote:
      "Great work as always! Incredibly detailed, and gave me a lot to work off of to tailor it how I want. I really appreciate the assistance on product related tasks and would recommend him to anyone looking for interview case study guidance!",
    time: "4 years ago",
    cat: "strategy",
  },
  { quote: "Excellent work and delivery.", time: "4 years ago", cat: "strategy" },
  {
    quote:
      "Great seller! Answered any and all inquiries I had and displayed a wealth of knowledge. I gained valuable insight on product management concepts.",
    time: "4 years ago",
    cat: "interview",
  },
  {
    quote:
      "Aman is an expert product engineer with a keen eye for detail and truly understands how to bring a product to life. He has helped with our GTM strategy and plan and will continue to help until we launch. Thanks!",
    time: "4 years ago",
    cat: "strategy",
  },
  { quote: "Really good to work with. I definitely recommend Aman.", time: "4 years ago", cat: "interview" },
];

function Stars() {
  return (
    <span className="flex gap-0.5 text-accent" aria-label="5 out of 5 stars">
      {Array.from({ length: 5 }).map((_, i) => (
        <svg key={i} viewBox="0 0 16 16" className="h-3.5 w-3.5" fill="currentColor" aria-hidden>
          <path d="M8 2l1.8 3.6L14 6.2l-3 2.9.7 4-3.7-1.9L4.3 13l.7-4-3-2.9 4.2-.6L8 2z" />
        </svg>
      ))}
    </span>
  );
}

function Card({ r, clone = false }: { r: Review; clone?: boolean }) {
  const c = categories[r.cat];
  return (
    <figure
      aria-hidden={clone}
      className={`panel mr-4 flex h-full w-[80vw] max-w-[340px] shrink-0 flex-col p-5 sm:w-[360px] sm:p-6 ${clone ? "tm-clone" : ""}`}
    >
      <div className="flex items-center justify-between">
        <Stars />
        <span className="font-mono text-[10px] uppercase tracking-wider text-muted/70">{r.time}</span>
      </div>
      <blockquote className="mt-4 flex-1 text-[15px] leading-relaxed text-foreground/85">
        <span className="mr-0.5 font-serif text-lg leading-none text-accent/50">“</span>
        {r.quote}
      </blockquote>
      <figcaption className="mt-5 flex items-center gap-1.5 border-t border-line pt-4 text-[11px] font-medium text-accent-dark">
        {c.icon}
        <span className="tracking-wide">{c.label}</span>
      </figcaption>
    </figure>
  );
}

function Row({
  items,
  dur,
  reverse = false,
}: {
  items: Review[];
  dur: number;
  reverse?: boolean;
}) {
  return (
    <div className="tm-row">
      <div
        className="tm-track"
        style={
          {
            "--tm-dur": `${dur}s`,
            "--tm-dir": reverse ? "reverse" : "normal",
          } as React.CSSProperties
        }
      >
        {items.map((r, i) => (
          <Card key={`a-${i}`} r={r} />
        ))}
        {/* seamless-loop clones, hidden from AT and in reduced-motion */}
        {items.map((r, i) => (
          <Card key={`b-${i}`} r={r} clone />
        ))}
      </div>
    </div>
  );
}

export default function Testimonials() {
  const mid = Math.ceil(reviews.length / 2);
  const rowA = reviews.slice(0, mid);
  const rowB = reviews.slice(mid);

  return (
    <SectionShell
      id="praise"
      eyebrow="Word of mouth"
      title="People keep saying nice things."
      blurb="A wall of five-star reviews from real engagements, spanning mock interviews, product strategy and hands-on delivery."
      tone="tint"
    >
      <div className="flex flex-col gap-4">
        <div className="flex flex-wrap items-center gap-x-3 gap-y-1">
          <Stars />
          <span className="text-sm font-semibold">5.0 average</span>
          <span className="text-sm text-muted">· every review, five stars</span>
        </div>

        <div className="mt-2 space-y-4">
          <Row items={rowA} dur={68} />
          <Row items={rowB} dur={84} reverse />
        </div>

        <p className="mt-1 text-xs text-muted/70">
          Hover to pause. Names withheld for privacy.
        </p>
      </div>

      {/* rocket launching over the seam into the dark CTA below */}
      <PopChar className="-bottom-12 right-2 w-32 sm:-bottom-16 sm:right-10 sm:w-48 lg:right-16 lg:w-56">
        <RocketLaptop />
      </PopChar>
    </SectionShell>
  );
}
