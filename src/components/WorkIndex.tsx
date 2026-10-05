import CaseArt from "./CaseArt";
import { Pusher, Walker } from "./Characters";
import { cases, type Case } from "@/lib/content";

/* Each case lives on its own sand plate, so where one engagement ends and the
   next begins is never in doubt. Reading order inside a plate: what it was,
   the one number that moved, the story in two short paragraphs, then the
   evidence — the live diagram and the before/after table. */

/* Someone different inhabits each diagram, working the same problem. */
function Inhabitant({ index }: { index: number }) {
  if (index === 1) return <Pusher duration={26} />;
  if (index === 3)
    return (
      <>
        <Walker duration={22} />
        <Walker accent duration={30} delay={-12} reverse />
      </>
    );
  return <Walker accent={index === 0} duration={index === 0 ? 24 : 28} delay={-index * 5} />;
}

function CaseCard({ item, index }: { item: Case; index: number }) {
  return (
    <article
      id={item.id}
      aria-labelledby={`${item.id}-title`}
      className="scroll-mt-[calc(var(--header-h)+20px)] rounded-[28px] bg-sand p-5 sm:p-8 lg:p-12"
    >
      <p className="label text-faint">
        Case {String(index + 1).padStart(2, "0")} &middot; {item.sector}
      </p>

      <div className="mt-5 grid gap-x-12 gap-y-8 lg:mt-6 lg:grid-cols-12">
        <div className="lg:col-span-5">
          <h2 id={`${item.id}-title`} className="display text-[clamp(2rem,3.6vw,3rem)]">
            {item.title}
          </h2>

          <p className="mt-6 flex flex-wrap items-baseline gap-x-3 gap-y-1">
            <span className="display h-figure text-accent">{item.metric.value}</span>
            <span className="text-[1.0625rem] font-medium text-ink-2">{item.metric.label}</span>
          </p>

          <div className="mt-7 space-y-4 border-t border-rule-strong pt-6 leading-relaxed text-muted">
            <p>
              <strong className="font-semibold text-ink">The problem. </strong>
              {item.problem}
            </p>
            <p>
              <strong className="font-semibold text-ink">What changed. </strong>
              {item.change}
            </p>
          </div>
        </div>

        <div className="flex flex-col gap-3 lg:col-span-7">
          <div className="overflow-hidden rounded-[var(--radius)] bg-bg">
            <div className="h-[clamp(170px,24vw,260px)] px-4 pt-5 sm:px-8 sm:pt-7">
              <CaseArt id={item.id} className="text-rule-strong" />
            </div>
            <div className="char-strip h-9 border-t border-rule sm:h-11">
              <Inhabitant index={index} />
            </div>
          </div>

          <table className="w-full table-fixed border-collapse overflow-hidden rounded-[var(--radius)] bg-bg text-[0.9375rem]">
            <caption className="sr-only">Before and after: {item.title}</caption>
            <thead>
              <tr className="border-b border-rule">
                <th scope="col" className="label w-[42%] px-4 py-3.5 text-left text-faint sm:px-6">
                  Measure
                </th>
                <th scope="col" className="label px-3 py-3.5 text-left text-faint sm:px-6">
                  Before
                </th>
                <th scope="col" className="label px-3 py-3.5 text-left text-accent sm:px-6">
                  After
                </th>
              </tr>
            </thead>
            <tbody>
              {item.comparison.map((row) => (
                <tr key={row.label} className="border-b border-rule last:border-0">
                  <th scope="row" className="px-4 py-3.5 text-left font-medium text-ink sm:px-6">
                    {row.label}
                  </th>
                  <td className="px-3 py-3.5 text-faint sm:px-6">{row.before}</td>
                  <td className="px-3 py-3.5 font-semibold text-ink sm:px-6">{row.after}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </article>
  );
}

export default function WorkIndex() {
  return (
    <div className="shell flex flex-col gap-4 pb-[var(--section-y)] sm:gap-6">
      {cases.map((item, i) => (
        <CaseCard key={item.id} item={item} index={i} />
      ))}
    </div>
  );
}

/* Header aside for /work: the four results as a jump list. */
export function CaseIndex() {
  return (
    <ol className="border-t border-rule">
      {cases.map((c, i) => (
        <li key={c.id} className="border-b border-rule">
          <a
            href={`#${c.id}`}
            className="group flex items-center justify-between gap-4 py-4 transition-colors duration-200 hover:text-accent"
          >
            <span className="flex items-baseline gap-4">
              <span className="text-sm tabular-nums text-faint">{String(i + 1).padStart(2, "0")}</span>
              <span className="font-medium">{c.title}</span>
            </span>
            <span className="display shrink-0 text-[1.5rem] text-accent">{c.metric.value}</span>
          </a>
        </li>
      ))}
    </ol>
  );
}
