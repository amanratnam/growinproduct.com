"use client";

import Section from "./Section";
import { reviews, type Review } from "@/lib/content";

function Card({ review, clone = false }: { review: Review; clone?: boolean }) {
  return (
    <figure
      aria-hidden={clone}
      className="flex h-full w-[78vw] max-w-[360px] shrink-0 flex-col justify-between border border-rule bg-bg p-6 transition-colors duration-300 hover:border-accent sm:w-[360px]"
    >
      <div>
        <div className="flex items-baseline justify-between gap-3">
          <span className="label text-accent" aria-label="5 out of 5">
            ★★★★★
          </span>
          <span className="label text-ink-40">{review.time}</span>
        </div>
        <blockquote className="mt-5 text-[15px] leading-relaxed text-ink">
          {review.quote}
        </blockquote>
      </div>
      <figcaption className="label mt-6 border-t border-rule pt-4 text-ink-40">
        {review.cat}
      </figcaption>
    </figure>
  );
}

/* Two counter-scrolling rails. The animation lives in CSS (.marquee) so it
   runs off the compositor and pauses on hover without a JS listener. */
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
      className="marquee"
      style={
        {
          "--marquee-dur": `${duration}s`,
          "--marquee-dir": reverse ? "reverse" : "normal",
        } as React.CSSProperties
      }
    >
      <div className="marquee__track items-stretch !gap-4 !pr-4">
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
  const mid = Math.ceil(reviews.length / 2);

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
        <Rail items={reviews.slice(0, mid)} duration={72} />
        <Rail items={reviews.slice(mid)} duration={88} reverse />
      </div>
    </Section>
  );
}
