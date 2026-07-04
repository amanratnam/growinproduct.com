import type { Metadata } from "next";
import Link from "next/link";
import Projects from "@/components/Projects";
import { PopChar, Presenter } from "@/components/Characters";

export const metadata: Metadata = {
  title: "Past Projects",
  description:
    "Case studies across healthcare SaaS, workflow optimization, product strategy and AI automation.",
};

export default function ProjectsPage() {
  return (
    <main>
      <section className="bg-white pb-8 pt-28 lg:pt-32">
        <div className="mx-auto max-w-7xl px-6 lg:px-12">
          <p className="text-sm font-semibold uppercase tracking-widest text-accent">
            Past projects
          </p>
          <h1 className="mt-3 max-w-2xl text-4xl font-bold tracking-tighter sm:text-5xl lg:text-6xl">
            Outcomes, not deliverables.
          </h1>
          <p className="mt-5 max-w-xl text-lg leading-relaxed text-muted">
            A sample of engagements across healthcare SaaS, operations,
            strategy and AI. Details anonymized; the numbers aren&apos;t.
            Swipe through and open any card for the full story.
          </p>
        </div>
      </section>

      <section className="bg-white pb-24">
        <Projects standalone />
      </section>

      <section className="relative border-t border-line bg-foreground/[0.018] py-20">
        {/* presenter pops out of the banner, pointing back up at the work */}
        <PopChar className="-top-14 right-3 w-32 sm:-top-24 sm:right-12 sm:w-48 lg:right-24 lg:w-52">
          <Presenter />
        </PopChar>
        <div className="mx-auto flex max-w-7xl flex-col items-start justify-between gap-8 px-6 sm:flex-row sm:items-center lg:px-12">
          <div>
            <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl">
              Your project could be next.
            </h2>
            <p className="mt-3 max-w-md text-muted">
              Every one of these started with a single conversation about a
              fuzzy problem.
            </p>
          </div>
          <Link
            href="/contact"
            className="group relative overflow-hidden rounded-full bg-foreground px-7 py-3.5 text-sm font-semibold text-white transition-transform duration-300 hover:scale-[1.04]"
          >
            <span className="relative z-10">Start the conversation</span>
            <span className="absolute inset-0 -translate-x-full bg-accent transition-transform duration-500 ease-out group-hover:translate-x-0" />
          </Link>
        </div>
      </section>
    </main>
  );
}
