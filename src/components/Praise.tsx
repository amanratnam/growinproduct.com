"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import Stars from "./Stars";
import { reviews, type Review } from "@/lib/content";

/* Reviews as a carousel the reader drives. Nothing moves on its own — the
   previous auto-scrolling rails asked people to read text that was sliding
   away from them. Swipe, trackpad, or the arrow buttons; every card snaps to
   the page gutter. Card width follows quote length so short reviews don't sit
   in acres of empty box. */

function widthFor(quote: string) {
  if (quote.length < 60) return "w-[min(66vw,260px)]";
  if (quote.length < 160) return "w-[min(78vw,340px)]";
  return "w-[min(84vw,420px)]";
}

function Card({ review }: { review: Review }) {
  return (
    <figure
      className={`flex flex-col rounded-[var(--radius)] bg-sand p-6 sm:p-7 ${widthFor(review.quote)}`}
    >
      <span className="display text-[2.5rem] leading-[0.6] text-accent" aria-hidden>
        &ldquo;
      </span>
      <blockquote className="mt-4 flex-1 text-[1.0625rem] leading-relaxed text-ink-2">
        {review.quote}
      </blockquote>
      <figcaption className="mt-6 flex items-center justify-between gap-3 border-t border-rule-strong pt-4 text-sm text-faint">
        <span className="font-medium text-ink">{review.cat}</span>
        <span>{review.time}</span>
      </figcaption>
    </figure>
  );
}

function Arrow({
  dir,
  disabled,
  onClick,
}: {
  dir: "prev" | "next";
  disabled: boolean;
  onClick: () => void;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      disabled={disabled}
      aria-label={dir === "prev" ? "Previous reviews" : "Next reviews"}
      className="grid h-12 w-12 place-items-center rounded-full border border-ink text-lg transition-colors duration-200 hover:bg-ink hover:text-bg disabled:cursor-default disabled:border-rule-strong disabled:text-rule-strong disabled:hover:bg-transparent"
    >
      <span aria-hidden>{dir === "prev" ? "←" : "→"}</span>
    </button>
  );
}

export default function Praise() {
  const trackRef = useRef<HTMLDivElement>(null);
  const [atStart, setAtStart] = useState(true);
  const [atEnd, setAtEnd] = useState(false);

  const sync = useCallback(() => {
    const el = trackRef.current;
    if (!el) return;
    setAtStart(el.scrollLeft < 8);
    setAtEnd(el.scrollLeft + el.clientWidth >= el.scrollWidth - 8);
  }, []);

  useEffect(() => {
    const el = trackRef.current;
    if (!el) return;
    sync();
    el.addEventListener("scroll", sync, { passive: true });
    window.addEventListener("resize", sync);
    return () => {
      el.removeEventListener("scroll", sync);
      window.removeEventListener("resize", sync);
    };
  }, [sync]);

  const page = (dir: 1 | -1) => {
    const el = trackRef.current;
    if (!el) return;
    el.scrollBy({ left: dir * el.clientWidth * 0.8, behavior: "smooth" });
  };

  return (
    <section id="praise" className="section overflow-hidden">
      <div className="shell flex flex-col gap-6 md:flex-row md:items-end md:justify-between">
        <h2 className="display h-section">In their words</h2>
        <div className="hidden gap-3 md:flex">
          <Arrow dir="prev" disabled={atStart} onClick={() => page(-1)} />
          <Arrow dir="next" disabled={atEnd} onClick={() => page(1)} />
        </div>
      </div>

      <div
        ref={trackRef}
        className="carousel mt-[var(--head-gap)]"
        role="region"
        aria-label="Client reviews"
        tabIndex={0}
      >
        {/* the summary leads, so the score is read before any single quote */}
        <div className="flex w-[min(66vw,280px)] flex-col justify-between rounded-[var(--radius)] bg-ink p-6 text-bg sm:p-7">
          <div>
            <p className="display text-[clamp(4rem,7vw,5.5rem)] leading-none">5.0</p>
            <div className="mt-4">
              <Stars size={18} />
            </div>
          </div>
          <p className="mt-10 text-[1.0625rem] leading-snug text-[var(--on-ink)]">
            Every one of {reviews.length} client reviews rated five stars.
          </p>
        </div>

        {reviews.map((r) => (
          <Card key={r.quote} review={r} />
        ))}
      </div>

      <div className="shell mt-6 flex items-center justify-between gap-4 md:hidden">
        <p className="text-sm text-faint">Swipe for more</p>
        <div className="flex gap-3">
          <Arrow dir="prev" disabled={atStart} onClick={() => page(-1)} />
          <Arrow dir="next" disabled={atEnd} onClick={() => page(1)} />
        </div>
      </div>
    </section>
  );
}
