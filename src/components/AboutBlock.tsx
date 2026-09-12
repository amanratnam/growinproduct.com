import Link from "next/link";
import Reveal from "./Reveal";
import { Climber, Pusher, Standup, Walker } from "./Characters";
import { aboutBody, expertise, site, timeline } from "@/lib/content";

/* Long-form About. The text sits on the page's normal grid; the characters
   live in dedicated full-bleed strips between blocks so they never collide
   with anything readable. */
export default function AboutBlock() {
  return (
    <>
      {/* ---------------------------------------------------------- intro -- */}
      <section className="shell pb-[clamp(32px,6vh,64px)]">
        <div className="grid gap-x-8 gap-y-10 md:grid-cols-12">
          <div className="md:col-span-7">
            <Reveal as="p" className="max-w-[52ch] text-[clamp(1.05rem,1.3vw,1.3rem)] leading-relaxed text-ink">
              {aboutBody[0]}
            </Reveal>
            <Reveal as="p" delay={0.08} className="mt-6 max-w-[52ch] leading-relaxed text-muted">
              {aboutBody[1]}
            </Reveal>
          </div>
          <div className="md:col-span-4 md:col-start-9">
            {/* a standup happening quietly beside the text */}
            <div className="h-36 w-full">
              <Standup />
            </div>
            <p className="label mt-3 text-ink-40">In the room, not on a bench</p>
          </div>
        </div>
      </section>

      {/* someone walks the whole width, carrying a spec */}
      <div className="char-strip h-16 border-y border-rule">
        <Walker duration={38} />
        <Walker accent duration={46} delay={-14} />
      </div>

      {/* ------------------------------------------------------- timeline -- */}
      <section className="shell py-[clamp(48px,8vh,96px)]">
        <div className="flex items-center justify-between gap-4 pb-6">
          <p className="label text-ink-40">Track record</p>
          <p className="label text-ink-40">{timeline.length} chapters</p>
        </div>

        <div className="relative grid gap-x-8 md:grid-cols-12">
          {/* the ladder runs the height of the timeline, with someone on it */}
          <div className="relative hidden md:col-span-1 md:block">
            <div className="sticky top-[calc(var(--header-h)+3rem)] h-56 w-9">
              <Climber duration={18} />
            </div>
          </div>

          <ol className="md:col-span-11 rule-t">
            {timeline.map((entry, i) => (
              <li key={entry.title} className="rule-b">
                <Reveal delay={i * 0.05} className="grid grid-cols-12 gap-x-4 py-7">
                  <p className="label col-span-12 text-accent md:col-span-3">{entry.period}</p>
                  <div className="col-span-12 mt-2 md:col-span-9 md:mt-0">
                    <h3 className="display text-[clamp(1.1rem,2.2vw,1.7rem)]">{entry.title}</h3>
                    <p className="mt-3 max-w-[54ch] leading-relaxed text-muted">{entry.desc}</p>
                  </div>
                </Reveal>
              </li>
            ))}
          </ol>
        </div>
      </section>

      {/* the roadmap gets pushed along */}
      <div className="char-strip h-16 border-y border-rule">
        <Pusher duration={30} />
        <Walker duration={44} delay={-20} reverse />
      </div>

      {/* ------------------------------------------------------ expertise -- */}
      <section className="shell py-[clamp(48px,8vh,96px)]">
        <div className="grid gap-x-8 gap-y-10 md:grid-cols-12">
          <div className="md:col-span-4">
            <p className="label text-ink-40">Expertise</p>
            <h2 className="display mt-4 text-[clamp(1.6rem,3.4vw,2.8rem)]">
              What I actually
              <br />
              do all day
            </h2>
          </div>
          <div className="md:col-span-8">
            <ul className="grid grid-cols-2 gap-px border border-rule bg-rule sm:grid-cols-3">
              {expertise.map((skill, i) => (
                <li key={skill} className="bg-bg">
                  <Reveal
                    delay={i * 0.02}
                    className="px-4 py-5 text-sm text-ink transition-colors duration-300 hover:text-accent"
                  >
                    {skill}
                  </Reveal>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </section>

      {/* ------------------------------------------------------------ cta -- */}
      <section className="shell pb-[var(--block)]">
        <div className="rule-t" />
        <div className="flex flex-col items-start justify-between gap-8 pt-10 md:flex-row md:items-end">
          <div>
            <h2 className="display max-w-[16ch] text-[clamp(1.8rem,4.6vw,3.6rem)]">
              Work with the person doing the work
            </h2>
            <p className="label mt-5 flex items-center gap-2 text-ink-40">
              <span className="h-1.5 w-1.5 rounded-full bg-accent" aria-hidden />
              {site.availability}
            </p>
          </div>
          <Link href="/contact" className="pill pill--solid shrink-0">
            Start a conversation
            <span aria-hidden>&rarr;</span>
          </Link>
        </div>
      </section>
    </>
  );
}
