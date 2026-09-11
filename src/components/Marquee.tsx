"use client";

import type { ReactNode } from "react";

/* Seamless marquee. The track holds the items twice and translates -50%, so
   the loop point is invisible. Pauses on hover. */
export default function Marquee({
  items,
  duration = 42,
  reverse = false,
  separator = "·",
  className = "",
  itemClassName = "",
}: {
  items: readonly ReactNode[];
  duration?: number;
  reverse?: boolean;
  separator?: ReactNode;
  className?: string;
  itemClassName?: string;
}) {
  const run = [...items, ...items];

  return (
    <div
      className={`marquee ${className}`}
      style={
        {
          "--marquee-dur": `${duration}s`,
          "--marquee-dir": reverse ? "reverse" : "normal",
        } as React.CSSProperties
      }
      aria-hidden
    >
      <div className="marquee__track">
        {run.map((item, i) => (
          <span key={i} className={`flex shrink-0 items-center gap-10 ${itemClassName}`}>
            {item}
            {separator ? <span className="text-accent">{separator}</span> : null}
          </span>
        ))}
      </div>
    </div>
  );
}
