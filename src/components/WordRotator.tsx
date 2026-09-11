"use client";

import { useEffect, useLayoutEffect, useRef, useState } from "react";

/* Swaps one word of the headline on a timer. The outgoing word slides up and
   out while the incoming one slides up and in, and the box animates to the new
   word's width so the rest of the line glides rather than jumps.

   Width is measured from a hidden span carrying the same type styles, which is
   the only reliable way to do this with a variable-width display face. */
export default function WordRotator({
  words,
  interval = 2600,
  className = "",
}: {
  words: readonly string[];
  interval?: number;
  className?: string;
}) {
  const [index, setIndex] = useState(0);
  const [prev, setPrev] = useState<number | null>(null);
  const [width, setWidth] = useState<number | null>(null);
  const measureRef = useRef<HTMLSpanElement>(null);

  /* Measure before paint so the first frame is already the right width. */
  useLayoutEffect(() => {
    const measure = () => {
      const el = measureRef.current;
      if (el) setWidth(el.getBoundingClientRect().width);
    };
    measure();
    /* Re-measure when the display font finishes loading, otherwise the width
       is captured against the fallback face and stays wrong. */
    document.fonts?.ready.then(measure).catch(() => {});
    window.addEventListener("resize", measure);
    return () => window.removeEventListener("resize", measure);
  }, [index]);

  useEffect(() => {
    if (words.length < 2) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    const timer = window.setInterval(() => {
      setPrev(index);
      setIndex((i) => (i + 1) % words.length);
    }, interval);
    return () => window.clearInterval(timer);
  }, [index, interval, words.length]);

  return (
    <span
      className={`rotator ${className}`}
      style={{ width: width ? `${width}px` : undefined }}
    >
      {/* hidden twin used purely for measurement */}
      <span ref={measureRef} className="rotator__measure" aria-hidden>
        {words[index]}
      </span>

      {/* announced once, so screen readers don't hear the carousel */}
      <span className="sr-only">{words[0]}</span>

      {prev !== null && prev !== index && (
        <span key={`out-${prev}`} className="rotator__item rotator__item--out" aria-hidden>
          {words[prev]}
        </span>
      )}
      <span key={`in-${index}`} className="rotator__item rotator__item--in" aria-hidden>
        {words[index]}
      </span>
    </span>
  );
}
