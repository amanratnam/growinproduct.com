"use client";

import Link from "next/link";
import dynamic from "next/dynamic";
import Stars from "./Stars";
import { hero, reviews, site } from "@/lib/content";

/* The 3D scene is client-only and heavy; keep it out of the server bundle and
   off the critical path so the headline paints immediately. */
const ValueMachine = dynamic(() => import("./three/ValueMachine"), {
  ssr: false,
  loading: () => null,
});

/* Opening plate. The headline says what you get, the line under it says how,
   and everything else waits until after the buttons. The only thing moving
   is the machine on the right, which is the same promise drawn as a loop:
   budget goes in, product and revenue come out. */
export default function Hero() {
  return (
    <section
      id="top"
      className="relative overflow-hidden lg:flex lg:min-h-[min(860px,calc(100svh-var(--header-h)))] lg:items-center"
    >
      <div className="shell grid w-full items-center gap-y-6 pb-12 pt-[clamp(36px,6vw,72px)] lg:grid-cols-12 lg:gap-x-10 lg:py-16">
        <div className="lg:col-span-7">
          <h1 className="display h-hero">
            <span className="block">{hero.lines[0]}</span>
            <span className="block text-accent">{hero.lines[1]}</span>
          </h1>

          <p className="mt-6 max-w-[44ch] text-[clamp(1.0625rem,1.35vw,1.25rem)] leading-relaxed text-ink-2 md:mt-8">
            {hero.lead}
          </p>

          <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:items-center md:mt-10">
            <Link href="/contact" className="pill pill--solid">
              Start a conversation
              <span className="arrow" aria-hidden>
                &rarr;
              </span>
            </Link>
            <Link href="/work" className="pill">
              See the work
            </Link>
          </div>

          {/* Proof sits after the ask, not before it: a reader who needs
              convincing keeps going, one who doesn't has already clicked. */}
          <div className="mt-9 flex flex-wrap items-center gap-x-6 gap-y-3 text-[0.9375rem] text-muted md:mt-12">
            <p className="flex items-center gap-2.5">
              <Stars />
              <span>
                <strong className="font-semibold text-ink">5.0</strong> from {reviews.length} client
                reviews
              </span>
            </p>
            <span className="hidden h-4 w-px bg-rule-strong sm:block" aria-hidden />
            <p>
              Est. {site.founded} &middot; {site.years} in product
            </p>
          </div>
        </div>

        <div className="lg:col-span-5">
          <div
            className="relative -mx-[var(--pad)] h-[clamp(240px,62vw,400px)] sm:mx-0 lg:h-[clamp(400px,62vh,600px)]"
            aria-hidden
          >
            <ValueMachine />
          </div>
        </div>
      </div>
    </section>
  );
}
