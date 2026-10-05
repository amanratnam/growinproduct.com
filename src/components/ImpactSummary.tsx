import Link from "next/link";
import SectionHead from "./SectionHead";
import CaseArt from "./CaseArt";
import { cases } from "@/lib/content";

/* Home-page proof. One headline result per engagement, each with its own live
   diagram, so the section is always in motion without the numbers themselves
   ever sliding out from under the reader. Every card opens its case study. */
export default function ImpactSummary() {
  return (
    <section id="impact" className="surface-ink section">
      <div className="shell">
        <SectionHead
          invert
          title={
            <>
              The numbers,
              <br />
              not the narrative
            </>
          }
          link={{ href: "/work", label: "Read the case studies" }}
        />

        <ul className="mt-[var(--head-gap)] grid grid-cols-2 gap-3 sm:gap-4 lg:grid-cols-4">
          {cases.map((c) => (
            <li key={c.id}>
              <Link
                href={`/work#${c.id}`}
                className="group flex h-full flex-col rounded-[var(--radius)] border border-[var(--rule-ink)] bg-white/[0.03] p-4 transition-colors duration-300 hover:border-white/40 hover:bg-white/[0.06] sm:p-6"
              >
                <div className="h-16 sm:h-28">
                  <CaseArt id={c.id} className="text-white/30" />
                </div>
                <p className="display h-figure mt-5 text-white sm:mt-7">{c.metric.value}</p>
                <p className="mt-2.5 text-[0.9375rem] leading-snug text-[var(--on-ink)] sm:text-base">
                  {c.metric.label}
                </p>
                {/* mt-auto pins the footer to the card floor, pt-6 keeps a
                    minimum gap above it when the label runs long */}
                <div className="mt-auto pt-6">
                  <p className="flex items-center justify-between gap-3 border-t border-[var(--rule-ink)] pt-4 text-sm text-[var(--on-ink-faint)] transition-colors duration-300 group-hover:text-white">
                    {c.sector}
                    <span aria-hidden className="transition-transform duration-300 group-hover:translate-x-1">
                      &rarr;
                    </span>
                  </p>
                </div>
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
