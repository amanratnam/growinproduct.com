"use client";

import Section from "./Section";
import { reviews, type Review } from "@/lib/content";

/* Review wall. The previous version forced every card to one fixed width and
   height, so long quotes overflowed their box. Cards are now sized in tiers by
   quote length and the track stretches to the tallest card in its row, so text
   is always fully contained. */

type Tier = "sm" | "md" | "lg";

function tierFor(quote: string): Tier {
  if (quote.length < 60) return "sm";
  if (quote.length < 200) return "md";
  return "lg";
}

const TIER_WIDTH: Record<Tier, string> = {
  sm: "w-[min(62vw,280px)] sm:w-[clamp(200px,24vw,280px)]",
  md: "w-[min(76vw,380px)] sm:w-[clamp(260px,30vw,380px)]",
  lg: "w-[min(82vw,460px)] sm:w-[clamp(300px,36vw,460px)]",
};

/* Short quotes get to be the loud ones — that's the keynote move: a handful of
   words set large, with the long testimonials as supporting body copy. */
const TIER_TYPE: Record<Tier, string> = {
  sm: "display text-[1.4rem] leading-[1.05] sm:text-[clamp(1.25rem,2.1vw,1.9rem)]",
  md: "text-[15px] leading-relaxed",
  lg: "text-[14px] leading-relaxed",
};

function Stars() {
  return (
    <span className="flex gap-[3px]" aria-label="5 out of 5">
      {Array.from({ length: 5 }).map((_, i) => (
        <svg key={i} viewBox="0 0 16 16" className="h-3 w-3 fill-accent" aria-hidden>
          <path d="M8 1.6l1.9 3.9 4.3.6-3.1 3 .7 4.3L8 11.4l-3.8 2 .7-4.3-3.1-3 4.3-.6L8 1.6z" />
        </svg>
      ))}
    </span>
  );
}

function Card({ review, clone = false }: { review: Review; clone?: boolean }) {
  const tier = tierFor(review.quote);
  const isFeature = tier === "sm";

  return (
    /* No h-full and no overflow clipping: h-full against an items-stretch
       track is circular and collapses every card to the shortest one, which is
       what was cutting the longer quotes off. Stretch alone already matches
       heights to the tallest card in the rail. */
    <figure
      aria-hidden={clone}
      className={`group flex shrink-0 flex-col justify-between rounded-2xl border border-rule p-5 transition-colors duration-300 hover:border-accent sm:p-7 ${TIER_WIDTH[tier]} ${
        isFeature ? "bg-ink text-bg" : "bg-bg"
      }`}
    >
      <div className="flex items-baseline justify-between gap-3">
        <Stars />
        <span className={`label ${isFeature ? "text-white/40" : "text-ink-40"}`}>
          {review.time}
        </span>
      </div>

      {/* flex-1 so the footer sits at the bottom of the stretched card, but no
          min-h-0 — that would let the quote shrink below its own content and
          clip again. */}
      <blockquote
        className={`mt-5 flex-1 sm:mt-6 ${TIER_TYPE[tier]} ${isFeature ? "text-bg" : "text-ink"}`}
      >
        {review.quote}
      </blockquote>

      <figcaption
        className={`label mt-5 border-t pt-3.5 sm:mt-6 sm:pt-4 ${
          isFeature ? "border-white/15 text-white/50" : "border-rule text-ink-40"
        }`}
      >
        {review.cat}
      </figcaption>
    </figure>
  );
}

function Rail({
  items,
  duration,
  reverse = false,
}: {
  items: readonly Review[];
  duration: number;
  reverse?: boolean;
}) {
  return (
    <div
      className="marquee marquee--cards"
      style={
        {
          "--marquee-dur": `${duration}s`,
          "--marquee-dir": reverse ? "reverse" : "normal",
        } as React.CSSProperties
      }
    >
      {/* items-stretch makes every card in a rail match the tallest, so no
          card ever clips its own quote */}
      <div className="marquee__track !gap-4 !pr-4">
        {items.map((r, i) => (
          <Card key={`a-${i}`} review={r} />
        ))}
        {items.map((r, i) => (
          <Card key={`b-${i}`} review={r} clone />
        ))}
      </div>
    </div>
  );
}

export default function Praise() {
  /* Interleave so each rail carries a mix of long and short cards rather than
     all the one-liners bunching together. */
  const railA = reviews.filter((_, i) => i % 2 === 0);
  const railB = reviews.filter((_, i) => i % 2 === 1);

  return (
    <Section
      id="praise"
      eyebrow="Word of mouth"
      index={`${reviews.length} reviews · 5.0 average`}
      title={
        <>
          Every review,
          <br />
          five stars
        </>
      }
      blurb="Feedback from real engagements spanning mock interviews, product strategy and hands-on delivery. Names withheld; hover to pause a rail."
    >
      <div className="space-y-4">
        <Rail items={railA} duration={76} />
        <Rail items={railB} duration={92} reverse />
      </div>
    </Section>
  );
}
