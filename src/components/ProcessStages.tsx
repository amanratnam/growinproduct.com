import SectionHead from "./SectionHead";
import StageArt from "./StageArt";
import { stages } from "@/lib/content";

const pad = (n: number) => String(n).padStart(2, "0");

/* Home-page process: the five stages on one rail, read left to right. A
   single dot travels the rail on a loop — the only motion in the section. */
export function ProcessStepper() {
  return (
    <section id="process" className="surface-sand section">
      <div className="shell">
        <SectionHead
          title={
            <>
              Same five stages,
              <br />
              every time
            </>
          }
          link={{ href: "/process", label: "How each stage works" }}
        />

        <div className="relative mt-[var(--head-gap)]">
          <div className="stepper__rail" aria-hidden>
            <span className="stepper__dot" />
          </div>

          <ol className="grid gap-y-8 lg:grid-cols-5 lg:gap-x-8">
            {stages.map((stage, i) => (
              <li key={stage.name} className="relative pl-8 lg:pl-0 lg:pt-10">
                {/* marker sits on the rail: left edge on phones, top edge on desktop */}
                <span
                  className="absolute left-0 top-[7px] h-[9px] w-[9px] rounded-full border border-rule-strong bg-sand lg:top-[-4px]"
                  aria-hidden
                />
                <p className="flex items-baseline gap-3">
                  <span className="display text-[1.5rem] text-accent">{pad(i + 1)}</span>
                  <span className="h-card">{stage.name}</span>
                </p>
                <div className="mt-6 hidden h-24 text-rule-strong lg:block">
                  <StageArt index={i} />
                </div>
                <p className="mt-2 max-w-[40ch] leading-relaxed text-muted lg:mt-6">{stage.line}</p>
              </li>
            ))}
          </ol>
        </div>
      </div>
    </section>
  );
}

/* Process page: each stage gets a full row — the diagram, what happens, and
   the thing you're holding at the end of it. */
export function StageRows() {
  return (
    <ol className="shell">
      {stages.map((stage, i) => (
        <li
          key={stage.name}
          className="grid gap-x-12 gap-y-6 border-t border-rule py-[clamp(36px,5vw,64px)] md:grid-cols-12"
        >
          <div className="md:col-span-4 lg:col-span-3">
            <p className="display text-[clamp(2.5rem,4vw,3.5rem)] text-accent">{pad(i + 1)}</p>
            <h2 className="display mt-3 text-[clamp(1.75rem,2.6vw,2.25rem)]">{stage.name}</h2>
          </div>

          <div className="md:col-span-8 lg:col-span-5">
            <p className="text-[1.0625rem] leading-relaxed text-ink-2">{stage.detail}</p>
            <div className="mt-6 rounded-[var(--radius-sm)] bg-sand px-5 py-4">
              <p className="label text-faint">You leave with</p>
              <p className="mt-1.5 font-semibold">{stage.output}</p>
            </div>
          </div>

          <div className="h-36 text-rule-strong md:col-span-8 md:col-start-5 lg:col-span-4 lg:col-start-auto lg:h-auto lg:min-h-36">
            <StageArt index={i} />
          </div>
        </li>
      ))}
    </ol>
  );
}
