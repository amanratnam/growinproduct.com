"use client";

import { useEffect, useRef, type ElementType, type ReactNode } from "react";

/* One IntersectionObserver shared by every revealing element on the page.
   Cheaper than a ScrollTrigger per element and it keeps the timing identical
   across sections, which is most of why the old layout felt uneven. */
let observer: IntersectionObserver | null = null;

function getObserver() {
  if (typeof window === "undefined") return null;
  if (!observer) {
    observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) {
            entry.target.classList.add("is-in");
            observer?.unobserve(entry.target);
          }
        }
      },
      { rootMargin: "0px 0px -12% 0px", threshold: 0.08 }
    );
  }
  return observer;
}

export function useReveal<T extends HTMLElement>() {
  const ref = useRef<T>(null);
  useEffect(() => {
    const el = ref.current;
    const io = getObserver();
    if (!el || !io) return;
    io.observe(el);
    return () => io.unobserve(el);
  }, []);
  return ref;
}

export default function Reveal({
  as,
  delay = 0,
  className = "",
  children,
  ...rest
}: {
  as?: ElementType;
  delay?: number;
  className?: string;
  children: ReactNode;
} & Record<string, unknown>) {
  /* Typed as a plain component of loose props on purpose. Resolving `as`
     against every intrinsic element makes TS build a union it can't represent,
     and a precise polymorphic signature is far heavier than this component
     warrants. */
  const Tag = (as ?? "div") as React.FC<
    Record<string, unknown> & { ref?: React.Ref<HTMLElement> }
  >;
  const ref = useReveal<HTMLElement>();

  return (
    <Tag
      ref={ref}
      className={`reveal ${className}`}
      style={{ "--reveal-delay": `${delay}s` } as React.CSSProperties}
      {...rest}
    >
      {children}
    </Tag>
  );
}

/* Masked line that slides up from below its own overflow box. Used for
   display headlines, where a fade alone looks weak at that scale. */
export function RevealLines({
  lines,
  className = "",
  stagger = 0.08,
}: {
  lines: ReactNode[];
  className?: string;
  stagger?: number;
}) {
  const ref = useReveal<HTMLDivElement>();
  return (
    <div ref={ref} className={className}>
      {lines.map((line, i) => (
        <span
          key={i}
          className="reveal-line"
          style={{ "--reveal-delay": `${i * stagger}s` } as React.CSSProperties}
        >
          <span>{line}</span>
        </span>
      ))}
    </div>
  );
}
