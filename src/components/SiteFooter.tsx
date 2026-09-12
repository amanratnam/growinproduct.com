"use client";

import { useEffect, useRef } from "react";
import Link from "next/link";
import Image from "next/image";
import { nav, site } from "@/lib/content";

/* Footer reveal: the black plate is fixed at the bottom of the viewport and a
   same-height spacer above it scrolls away, so the page slides off and
   uncovers the footer rather than pushing it down.

   Layout is the same 12-column grid as every other section, so the footer's
   columns land on the axes the page has been using all the way down. */
export default function SiteFooter() {
  const spacerRef = useRef<HTMLDivElement>(null);
  const plateRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const spacer = spacerRef.current;
    const plate = plateRef.current;
    if (!spacer || !plate) return;

    const root = document.documentElement;

    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      root.style.setProperty("--footer-progress", "1");
      root.classList.add("footer-taken");
      return;
    }

    let frame = 0;
    const update = () => {
      frame = 0;
      const rect = spacer.getBoundingClientRect();
      const vh = window.innerHeight;
      const progress = Math.min(1, Math.max(0, (vh - rect.top) / Math.max(rect.height, 1)));
      root.style.setProperty("--footer-progress", progress.toFixed(4));

      /* Invert the header only once the plate has actually risen behind it, so
         the fill and the ink flip on the same frame. */
      const headerH = parseFloat(getComputedStyle(root).getPropertyValue("--header-h")) || 68;
      root.classList.toggle("footer-taken", plate.getBoundingClientRect().top <= headerH);
    };

    const onScroll = () => {
      if (!frame) frame = requestAnimationFrame(update);
    };

    update();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);
    return () => {
      if (frame) cancelAnimationFrame(frame);
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
      root.style.removeProperty("--footer-progress");
      root.classList.remove("footer-taken");
    };
  }, []);

  return (
    <div className="relative">
      <div ref={spacerRef} className="h-[min(72svh,620px)]" aria-hidden />

      <footer
        ref={plateRef}
        className="fixed inset-x-0 bottom-0 z-0 flex h-[min(72svh,620px)] flex-col bg-ink text-bg"
        style={{ transform: "translateY(calc((1 - var(--footer-progress, 0)) * 14%))" }}
      >
        <div className="grain" aria-hidden />

        <div className="shell flex flex-1 flex-col justify-center py-8">
          {/* ---- the call to action, given the weight it deserves ---- */}
          <div className="grid items-end gap-x-8 gap-y-8 md:grid-cols-12">
            <div className="md:col-span-8">
              <p className="label text-white/40">Have a problem worth solving?</p>
              <Link href="/contact" className="group mt-3 block">
                <span className="display block text-[clamp(1.9rem,5.4vw,4.2rem)] leading-[0.9] transition-colors duration-500 group-hover:text-accent">
                  Let&apos;s talk
                  <span
                    className="ml-[0.1em] inline-block transition-transform duration-500 group-hover:translate-x-[0.08em]"
                    aria-hidden
                  >
                    &rarr;
                  </span>
                </span>
              </Link>
            </div>

            <div className="md:col-span-4 md:pb-2">
              <p className="max-w-[32ch] text-sm leading-relaxed text-white/60">
                Thirty honest minutes about your product. No deck, no
                discovery-call theatre, and the reply comes from me.
              </p>
              <Link href="/contact" className="pill pill--invert mt-4">
                Open the contact form
              </Link>
            </div>
          </div>

          {/* ---- one compact rail rather than three tall columns ---- */}
          <div className="mt-[clamp(24px,4vh,44px)] grid gap-x-8 gap-y-6 border-t border-white/15 pt-6 md:grid-cols-12">
            <div className="md:col-span-4">
              <div className="flex items-center gap-3">
                <Image
                  src="/logo-mark.png"
                  alt={site.name}
                  width={64}
                  height={64}
                  className="h-7 w-7 brightness-0 invert"
                />
                <p className="label text-white/50">{site.tagline}</p>
              </div>
              <p className="label mt-3 flex items-center gap-2 text-white/40">
                <span className="h-1.5 w-1.5 rounded-full bg-accent" aria-hidden />
                {site.availability}
              </p>
            </div>

            <nav aria-label="Footer" className="md:col-span-5">
              <ul className="flex flex-wrap gap-x-6 gap-y-2">
                {[...nav, { label: "Contact", href: "/contact" }].map((item) => (
                  <li key={item.href}>
                    <Link
                      href={item.href}
                      className="ulink text-sm text-white/70 transition-colors duration-300 hover:text-accent"
                    >
                      {item.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </nav>

            <div className="md:col-span-3">
              <a
                href={`mailto:${site.email}`}
                className="ulink block text-sm text-white/70 transition-colors duration-300 hover:text-accent"
              >
                {site.email}
              </a>
              <a
                href={site.linkedin}
                target="_blank"
                rel="noreferrer noopener"
                className="ulink mt-2 block text-sm text-white/70 transition-colors duration-300 hover:text-accent"
              >
                LinkedIn
              </a>
            </div>
          </div>
        </div>

        <div className="shell flex items-center justify-between border-t border-white/15 py-4">
          <p className="label text-white/40">
            &copy; {new Date().getFullYear()} {site.name}
          </p>
          <a
            href="#top"
            className="group label flex items-center gap-2 text-white/60 transition-colors duration-300 hover:text-accent"
          >
            <span
              className="inline-block transition-transform duration-500 group-hover:-translate-y-1"
              aria-hidden
            >
              &uarr;
            </span>
            Back to top
          </a>
        </div>
      </footer>
    </div>
  );
}
