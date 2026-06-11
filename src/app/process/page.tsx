import type { Metadata } from "next";
import Link from "next/link";
import Process from "@/components/Process";

export const metadata: Metadata = {
  title: "Process",
  description:
    "Five stages from first insight to shipped outcome: Discover, Define, Design, Deliver, Scale.",
};

export default function ProcessPage() {
  return (
    <main>
      {/* intro strip */}
      <section className="bg-[#050807] pb-4 pt-28 text-white lg:pt-32">
        <div className="mx-auto max-w-7xl px-6 lg:px-12">
          <p className="font-mono text-[11px] uppercase tracking-[0.45em] text-accent">
            Campaign mode
          </p>
          <h1 className="mt-4 max-w-2xl text-4xl font-bold tracking-tighter sm:text-5xl lg:text-6xl">
            The road every engagement drives.
          </h1>
          <p className="mt-5 max-w-xl text-base leading-relaxed text-white/50">
            No mystery, no methodology theater. Five pitstops, each with a
            clear deliverable, run in tight loops until the product ships and
            compounds.
          </p>
        </div>
      </section>

      <Process />

      {/* hand-off */}
      <section className="bg-white py-24">
        <div className="mx-auto flex max-w-7xl flex-col items-start justify-between gap-8 px-6 sm:flex-row sm:items-center lg:px-12">
          <div>
            <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl">
              Want to see where the road ends?
            </h2>
            <p className="mt-3 max-w-md text-muted">
              The destinations are real products with real numbers. Browse the
              case studies or start your own drive.
            </p>
          </div>
          <div className="flex flex-wrap gap-3">
            <Link
              href="/projects"
              className="rounded-full border border-line bg-white px-7 py-3.5 text-sm font-semibold transition-all duration-300 hover:scale-[1.04] hover:border-foreground/30"
            >
              View the work
            </Link>
            <Link
              href="/contact"
              className="group relative overflow-hidden rounded-full bg-foreground px-7 py-3.5 text-sm font-semibold text-white transition-transform duration-300 hover:scale-[1.04]"
            >
              <span className="relative z-10">Start a project</span>
              <span className="absolute inset-0 -translate-x-full bg-accent transition-transform duration-500 ease-out group-hover:translate-x-0" />
            </Link>
          </div>
        </div>
      </section>
    </main>
  );
}
