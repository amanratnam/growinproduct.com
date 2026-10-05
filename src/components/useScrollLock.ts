"use client";

import { useEffect } from "react";

/* Locks page scrolling while an overlay is open.

   The lock goes on <html>, never on <body>. Setting `overflow: hidden` on the
   body makes it the scrollport for its descendants, which silently kills every
   `position: sticky` element on the page. On <html> the value is propagated to
   the viewport instead, so sticky is unaffected.

   Nested locks are counted, so an overlay closing doesn't unlock the page while
   another is still open. */
let locks = 0;

export default function useScrollLock(active: boolean) {
  useEffect(() => {
    if (!active) return;

    const root = document.documentElement;
    locks += 1;
    root.classList.add("scroll-locked");

    return () => {
      locks = Math.max(0, locks - 1);
      if (locks === 0) root.classList.remove("scroll-locked");
    };
  }, [active]);
}
