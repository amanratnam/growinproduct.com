import { Climber, Pusher, Standup, Walker } from "./Characters";
import { about, comparison, timeline } from "@/lib/content";

/* Header aside for /about: a standup in progress, on its own plate so the
   caption sits below the scene rather than on top of it. */
export function StandupScene() {
  return (
    <figure className="rounded-[var(--radius)] bg-sand px-6 pb-5 pt-7 sm:px-8">
      <Standup />
      <figcaption className="mt-4 text-sm text-faint">In the room, not on a bench.</figcaption>
    </figure>
  );
}

/* Long-form About. The characters live in their own full-bleed strips and in
   the ladder beside the timeline, so they never sit on anything readable. */
export default function AboutBlock() {
  return (
    <>
      {/* someone walks the whole width, carrying a spec */}
      <div className="char-strip h-14 border-y border-rule sm:h-16">
        <Walker duration={38} />
        <Walker accent duration={46} delay={-14} />
      </div>

      {/* ---------------------------------------------- versus an agency -- */}
      <section className="section">
        <div className="shell grid gap-x-12 gap-y-[var(--head-gap)] lg:grid-cols-12">
          <div className="lg:col-span-4">
            <h2 className="display h-section">
              Not an
              <br />
              agency
            </h2>
            <p className="mt-5 max-w-[40ch] text-[1.0625rem] leading-relaxed text-muted">
              {about.body}
            </p>
          </div>

          <div className="lg:col-span-8">
            {/* A real table from md up; on a phone each row stacks so neither
                answer gets squeezed into a third of the screen. */}
            <div role="table" aria-label="A typical agency compared with Grow In Product">
              <div role="row" className="hidden grid-cols-12 gap-6 border-b border-ink pb-3 md:grid">
                <span role="columnheader" className="col-span-4">
                  <span className="sr-only">Question</span>
                </span>
                <span role="columnheader" className="label col-span-4 text-faint">
                  A typical agency
                </span>
                <span role="columnheader" className="label col-span-4 text-accent">
                  Grow In Product
                </span>
              </div>
              {comparison.map((row) => (
                <div
                  role="row"
                  key={row.label}
                  className="grid grid-cols-2 gap-x-4 gap-y-2 border-b border-rule py-5 md:grid-cols-12 md:gap-6"
                >
                  <span role="rowheader" className="col-span-2 font-semibold md:col-span-4">
                    {row.label}
                  </span>
                  <span role="cell" className="text-faint md:col-span-4">
                    <span className="label mb-1 block md:hidden">Agency</span>
                    {row.them}
                  </span>
                  <span role="cell" className="font-medium text-ink md:col-span-4">
                    <span className="label mb-1 block text-accent md:hidden">Grow In Product</span>
                    {row.us}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ------------------------------------------------------- timeline -- */}
      <section className="surface-sand section">
        <div className="shell grid gap-x-12 gap-y-[var(--head-gap)] lg:grid-cols-12">
          <div className="lg:col-span-4">
            <h2 className="display h-section">
              How I
              <br />
              got here
            </h2>
          </div>

          <div className="relative grid grid-cols-[auto_1fr] gap-x-8 lg:col-span-8">
            {/* the ladder runs beside the timeline, with someone climbing it */}
            <div className="relative hidden w-9 sm:block">
              <div className="sticky top-[calc(var(--header-h)+3rem)] h-56 w-9">
                <Climber duration={18} />
              </div>
            </div>

            <ol className="col-span-2 border-t border-rule-strong sm:col-span-1">
              {timeline.map((entry) => (
                <li
                  key={entry.title}
                  className="grid gap-x-6 gap-y-2 border-b border-rule-strong py-6 md:grid-cols-[9rem_1fr]"
                >
                  <p className="label pt-1 text-accent">{entry.period}</p>
                  <div>
                    <h3 className="h-card">{entry.title}</h3>
                    <p className="mt-2 max-w-[54ch] leading-relaxed text-muted">{entry.desc}</p>
                  </div>
                </li>
              ))}
            </ol>
          </div>
        </div>
      </section>

      {/* the roadmap gets pushed along, into the call to action */}
      <div className="char-strip h-14 bg-sand sm:h-16">
        <Pusher duration={30} />
        <Walker duration={44} delay={-20} reverse />
      </div>
    </>
  );
}
