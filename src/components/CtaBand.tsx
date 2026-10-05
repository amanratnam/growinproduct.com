import Link from "next/link";
import { availability, cta } from "@/lib/content";

/* The closing ask on every page, on the one surface nothing else uses. The
   rings on the right are the idea in miniature: a wide fuzzy field narrowing
   to a single point. */
export default function CtaBand() {
  return (
    <section className="surface-accent relative overflow-hidden">
      <svg
        viewBox="0 0 400 400"
        className="pointer-events-none absolute -bottom-36 -right-36 h-[360px] text-white opacity-[0.16] lg:bottom-auto lg:right-[4%] lg:top-1/2 lg:h-[min(120%,560px)] lg:-translate-y-1/2"
        aria-hidden
      >
        {[190, 150, 112, 76, 42].map((r, i) => (
          <circle
            key={r}
            cx="200"
            cy="200"
            r={r}
            fill="none"
            stroke="currentColor"
            strokeWidth="1.2"
            strokeDasharray={i < 2 ? "3 7" : undefined}
          />
        ))}
        <circle cx="200" cy="200" r="9" fill="currentColor" />
      </svg>

      <div className="shell section relative">
        <h2 className="display h-page max-w-[14ch]">{cta.title}</h2>
        <p className="mt-6 max-w-[44ch] text-[1.125rem] leading-relaxed text-white md:mt-8">
          {cta.body}
        </p>
        <div className="mt-8 flex flex-col items-start gap-5 sm:flex-row sm:items-center sm:gap-7 md:mt-10">
          <Link href="/contact" className="pill pill--light">
            {cta.button}
            <span className="arrow" aria-hidden>
              &rarr;
            </span>
          </Link>
          <p className="flex items-center gap-2.5 text-[0.9375rem] font-medium text-white">
            <span className="h-2 w-2 shrink-0 rounded-full bg-white" aria-hidden />
            {availability()}
          </p>
        </div>
      </div>
    </section>
  );
}
