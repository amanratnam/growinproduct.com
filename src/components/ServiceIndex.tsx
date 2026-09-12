"use client";

import { useState } from "react";
import Section from "./Section";
import Reveal from "./Reveal";
import { services } from "@/lib/content";

/* An index list rather than a card grid. Each row is a rule-separated line
   that expands in place on hover or focus, which keeps the left edge of every
   title on one axis — cards never managed that. */
export default function ServiceIndex() {
  const [open, setOpen] = useState<number | null>(0);

  return (
    <Section
      id="services"
      eyebrow="Services"
      index={`${String(services.length).padStart(2, "0")} disciplines`}
      title={
        <>
          Every layer of
          <br />
          the product
        </>
      }
      blurb="Six disciplines, one operator, no handoffs between the person who scopes the work and the person who does it. Open a row to see what ships."
    >
      <ul className="rule-t">
        {services.map((service, i) => {
          const isOpen = open === i;
          return (
            <li key={service.id} className="rule-b">
              <Reveal delay={i * 0.04}>
                <button
                  type="button"
                  aria-expanded={isOpen}
                  aria-controls={`service-${service.id}`}
                  onMouseEnter={() => setOpen(i)}
                  onFocus={() => setOpen(i)}
                  onClick={() => setOpen(isOpen ? null : i)}
                  className="group grid w-full grid-cols-12 items-baseline gap-x-3 py-4 text-left transition-colors duration-300 md:gap-x-4 md:py-7"
                >
                  <span className="label col-span-2 text-ink-40 transition-colors duration-300 group-hover:text-accent md:col-span-1">
                    {String(i + 1).padStart(2, "0")}
                  </span>

                  <span
                    className={`display col-span-10 text-[clamp(1.3rem,3.4vw,2.6rem)] transition-colors duration-300 md:col-span-6 ${
                      isOpen ? "text-accent" : "text-ink group-hover:text-accent"
                    }`}
                  >
                    {service.title}
                  </span>

                  <span className="col-span-12 mt-2.5 pl-[calc(16.666%)] text-[13px] leading-relaxed text-muted md:col-span-4 md:mt-0 md:pl-0 md:text-sm">
                    {service.summary}
                  </span>

                  <span
                    className={`col-span-12 hidden justify-end text-xl text-ink-40 transition-transform duration-500 md:col-span-1 md:flex ${
                      isOpen ? "rotate-45 text-accent" : "group-hover:rotate-45"
                    }`}
                    aria-hidden
                  >
                    +
                  </span>
                </button>

                {/* grid-template-rows animates cleanly from 0 without needing a
                    measured pixel height */}
                <div
                  id={`service-${service.id}`}
                  className="grid transition-[grid-template-rows] duration-500 ease-[var(--ease)]"
                  style={{ gridTemplateRows: isOpen ? "1fr" : "0fr" }}
                >
                  <div className="overflow-hidden">
                    <div className="grid grid-cols-12 gap-x-4 gap-y-4 pb-7 md:pb-9">
                      <div className="col-span-12 pl-[calc(16.666%)] md:col-start-2 md:col-span-6 md:pl-0">
                        <p className="max-w-[54ch] leading-relaxed text-ink">{service.detail}</p>
                      </div>
                      <div className="col-span-12 pl-[calc(16.666%)] md:col-span-4 md:pl-0">
                        <p className="label text-ink-40">Deliverables</p>
                        <ul className="mt-3 flex flex-wrap gap-x-5 gap-y-2">
                          {service.deliverables.map((d) => (
                            <li key={d} className="text-sm text-muted">
                              {d}
                            </li>
                          ))}
                        </ul>
                      </div>
                    </div>
                  </div>
                </div>
              </Reveal>
            </li>
          );
        })}
      </ul>
    </Section>
  );
}
