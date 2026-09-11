"use client";

import { useEffect, useRef } from "react";
import Link from "next/link";
import Image from "next/image";
import { nav, site } from "@/lib/content";

/* Footer reveal: the black plate is fixed at the bottom of the viewport and a
   same-height spacer above it scrolls away, so the page appears to slide off
   and uncover the footer rather than push it down.

   The spacer's intersection ratio is written to --footer-progress, which the
   plate's own transform reads. */
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
      /* 0 while the spacer is still below the fold, 1 once it fully occupies
         the viewport. */
      const progress = Math.min(1, Math.max(0, (vh - rect.top) / Math.max(rect.height, 1)));
      /* Published on :root so the header can invert against the black plate,
         the way the rest of the accent system is wired. */
      root.style.setProperty("--footer-progress", progress.toFixed(4));

      /* Invert the header only once the plate has actually risen behind it.
         Keying off the plate's own edge rather than a magic progress value
         means the fill and the ink flip on the same frame. */
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
      {/* reserves the scroll distance the reveal consumes */}
      <div ref={spacerRef} className="h-[86svh] md:h-screen" aria-hidden />

      <footer
        ref={plateRef}
        className="fixed inset-x-0 bottom-0 z-0 flex h-[86svh] flex-col bg-ink text-bg md:h-screen"
        style={{
          transform: "translateY(calc((1 - var(--footer-progress, 0)) * 18%))",
        }}
      >
        <div className="grain" aria-hidden />

        <div className="shell flex flex-1 flex-col justify-center py-10">
          {/* big closing line */}
          <p className="label text-white/40">Let&apos;s talk</p>
          <Link
            href="/contact"
            className="group mt-4 block"
            aria-label="Start a conversation"
          >
            <span className="display block text-[clamp(2.4rem,10vw,9rem)] transition-colors duration-500 group-hover:text-accent">
              Ready to grow?
            </span>
          </Link>

          <div className="mt-[clamp(28px,6vh,64px)] grid gap-8 border-t border-white/15 pt-8 md:grid-cols-12">
            <div className="md:col-span-4">
              <Image
                src="/logo-mark.png"
                alt={site.name}
                width={64}
                height={64}
                className="h-9 w-9 brightness-0 invert"
              />
              <p className="label mt-4 text-white/40">{site.tagline}</p>
            </div>

            <nav aria-label="Footer" className="md:col-span-4">
              <p className="label text-white/40">Index</p>
              <ul className="mt-4 space-y-2">
                {[...nav, { label: "Contact", href: "/contact" }].map((item) => (
                  <li key={item.href}>
                    <Link
                      href={item.href}
                      className="ulink text-sm text-white/80 transition-colors duration-300 hover:text-accent"
                    >
                      {item.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </nav>

            <div className="md:col-span-4">
              <p className="label text-white/40">Direct</p>
              <a
                href={`mailto:${site.email}`}
                className="ulink mt-4 block text-sm text-white/80 transition-colors duration-300 hover:text-accent"
              >
                {site.email}
              </a>
              <a
                href={site.linkedin}
                target="_blank"
                rel="noreferrer noopener"
                className="ulink mt-2 block text-sm text-white/80 transition-colors duration-300 hover:text-accent"
              >
                LinkedIn
              </a>
              <p className="label mt-5 flex items-center gap-2 text-white/40">
                <span className="h-1.5 w-1.5 rounded-full bg-accent" aria-hidden />
                {site.availability}
              </p>
            </div>
          </div>
        </div>

        <div className="shell flex items-center justify-between border-t border-white/15 py-5">
          <p className="label text-white/40">
            © {new Date().getFullYear()} {site.name}
          </p>
          <a
            href="#top"
            className="group label flex items-center gap-2 text-white/60 transition-colors duration-300 hover:text-accent"
          >
            <span className="inline-block transition-transform duration-500 group-hover:-translate-y-1" aria-hidden>
              ↑
            </span>
            Back to top
          </a>
        </div>
      </footer>
    </div>
  );
}
