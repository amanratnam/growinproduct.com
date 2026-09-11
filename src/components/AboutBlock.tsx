import Section from "./Section";
import Reveal from "./Reveal";
import { aboutBody, expertise, timeline } from "@/lib/content";

export default function AboutBlock() {
  return (
    <Section
      id="about"
      eyebrow="About"
      index="One operator"
      title={
        <>
          One operator,
          <br />
          full product brain
        </>
      }
      blurb={aboutBody[0]}
    >
      <div className="grid gap-x-8 gap-y-12 md:grid-cols-12">
        {/* career track */}
        <div className="md:col-span-7">
          <p className="label text-ink-40">Track record</p>
          <ol className="mt-6 rule-t">
            {timeline.map((entry, i) => (
              <li key={entry.title} className="rule-b">
                <Reveal delay={i * 0.05} className="grid grid-cols-12 gap-x-4 py-6">
                  <p className="label col-span-12 text-accent md:col-span-4">{entry.period}</p>
                  <div className="col-span-12 mt-2 md:col-span-8 md:mt-0">
                    <h3 className="text-base font-semibold tracking-tight">{entry.title}</h3>
                    <p className="mt-2 max-w-[44ch] text-sm leading-relaxed text-muted">
                      {entry.desc}
                    </p>
                  </div>
                </Reveal>
              </li>
            ))}
          </ol>
        </div>

        {/* statement + expertise */}
        <div className="md:col-span-5">
          <Reveal as="p" className="max-w-[44ch] leading-relaxed text-ink">
            {aboutBody[1]}
          </Reveal>

          <div className="mt-10">
            <p className="label text-ink-40">Expertise</p>
            <ul className="mt-5 grid grid-cols-1 gap-px border border-rule bg-rule sm:grid-cols-2">
              {expertise.map((skill, i) => (
                <li key={skill} className="bg-bg">
                  <Reveal
                    delay={i * 0.02}
                    className="px-4 py-3 text-sm text-ink transition-colors duration-300 hover:text-accent"
                  >
                    {skill}
                  </Reveal>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </Section>
  );
}
