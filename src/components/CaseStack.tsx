"use client";

import { useEffect, useRef, useState } from "react";
import { createPortal } from "react-dom";
import { cases, type Case } from "@/lib/content";
import useScrollLock from "./useScrollLock";

/* ------------------------------------------------------------------------- */

/* Abstract plate artwork per case. Deliberately schematic rather than
   illustrative: thin rules, a single accent stroke, nothing that competes with
   the display type. */
function CaseArt({ index, active }: { index: number; active: boolean }) {
  const common = {
    fill: "none",
    stroke: "currentColor",
    strokeWidth: 1,
    vectorEffect: "non-scaling-stroke" as const,
  };

  return (
    <svg
      viewBox="0 0 320 200"
      className="h-full w-full text-rule"
      preserveAspectRatio="xMidYMid meet"
      aria-hidden
    >
      {/* shared bed of hairlines */}
      {[40, 80, 120, 160].map((y) => (
        <line key={y} x1="0" y1={y} x2="320" y2={y} {...common} />
      ))}

      {index === 0 && (
        <>
          {/* funnel narrowing: 14 screens down to 5 */}
          {[0, 1, 2, 3, 4].map((i) => (
            <rect
              key={i}
              x={40 + i * 12}
              y={30 + i * 14}
              width={240 - i * 24}
              height="10"
              {...common}
              stroke={i === 4 ? "var(--accent)" : "currentColor"}
              strokeWidth={i === 4 ? 1.6 : 1}
              style={{
                transformOrigin: "160px 100px",
                transform: active ? "none" : "scaleX(0.6)",
                opacity: active ? 1 : 0,
                transition: `transform .7s var(--ease) ${i * 0.07}s, opacity .7s var(--ease) ${i * 0.07}s`,
              }}
            />
          ))}
        </>
      )}

      {index === 1 && (
        <>
          {/* 17 handoffs collapsing to one routed path */}
          {Array.from({ length: 9 }).map((_, i) => (
            <circle
              key={i}
              cx={30 + i * 32}
              cy={i % 2 ? 70 : 130}
              r="5"
              {...common}
              style={{
                opacity: active ? 1 : 0,
                transition: `opacity .5s var(--ease) ${i * 0.05}s`,
              }}
            />
          ))}
          <path
            d="M30 130 C 90 130, 90 70, 158 70 S 230 130, 286 130"
            {...common}
            stroke="var(--accent)"
            strokeWidth="1.6"
            style={{
              strokeDasharray: 460,
              strokeDashoffset: active ? 0 : 460,
              transition: "stroke-dashoffset 1.2s var(--ease) .2s",
            }}
          />
        </>
      )}

      {index === 2 && (
        <>
          {/* 80 roadmap items cut to a single rising line */}
          {Array.from({ length: 16 }).map((_, i) => (
            <line
              key={i}
              x1={24 + i * 18}
              y1="170"
              x2={24 + i * 18}
              y2={170 - (i < 6 ? 90 : 14)}
              {...common}
              style={{
                opacity: active ? (i < 6 ? 1 : 0.35) : 0,
                transition: `opacity .6s var(--ease) ${i * 0.03}s`,
              }}
            />
          ))}
          <polyline
            points="24,150 78,132 132,96 186,74 240,48 294,26"
            {...common}
            stroke="var(--accent)"
            strokeWidth="1.6"
            style={{
              strokeDasharray: 330,
              strokeDashoffset: active ? 0 : 330,
              transition: "stroke-dashoffset 1.1s var(--ease) .25s",
            }}
          />
        </>
      )}

      {index === 3 && (
        <>
          {/* triage: most tickets routed by the model, a few to a human */}
          <circle
            cx="160"
            cy="100"
            r="26"
            {...common}
            stroke="var(--accent)"
            strokeWidth="1.6"
          />
          {[
            [40, 46],
            [40, 100],
            [40, 154],
            [280, 62],
            [280, 138],
          ].map(([x, y], i) => (
            <g
              key={i}
              style={{
                opacity: active ? 1 : 0,
                transition: `opacity .6s var(--ease) ${0.15 + i * 0.08}s`,
              }}
            >
              <line
                x1={x}
                y1={y}
                x2={x < 160 ? 134 : 186}
                y2="100"
                {...common}
              />
              <circle cx={x} cy={y} r="5" {...common} />
            </g>
          ))}
        </>
      )}
    </svg>
  );
}

/* ------------------------------------------------------------------------- */

function CaseSection({
  item,
  index,
  total,
  onActive,
  onOpen,
}: {
  item: Case;
  index: number;
  total: number;
  onActive: (theme: Case["theme"]) => void;
  onOpen: () => void;
}) {
  const ref = useRef<HTMLElement>(null);
  const [active, setActive] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    /* The entrance is one-way. Toggling it back off left the title parked
       below its overflow mask whenever a fast scroll skipped the ratio the
       gate was watching for. */
    const entrance = new IntersectionObserver(
      ([entry]) => {
        if (entry.intersectionRatio > 0.3) {
          setActive(true);
          entrance.disconnect();
        }
      },
      { threshold: [0, 0.15, 0.3, 0.6, 0.9] },
    );
    entrance.observe(el);

    /* Theme is tracked separately against a thin band across the middle of the
       viewport, so it follows the reader in both directions. */
    const theme = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) onActive(item.theme);
      },
      { rootMargin: "-45% 0px -45% 0px", threshold: 0 },
    );
    theme.observe(el);

    return () => {
      entrance.disconnect();
      theme.disconnect();
    };
  }, [item.theme, onActive]);

  return (
    <section
      ref={ref}
      className="case-section"
      /* owns the accent inside its own plate */
      data-theme={item.theme}
      aria-label={`Case ${index + 1}: ${item.title.join(" ")}`}
    >
      <div className="case-plate">
        <div className="frame flex flex-col">
          <span className="frame__ticks" aria-hidden>
            <span />
            <span />
            <span />
            <span />
          </span>

          {/* top meta rail inside the plate */}
          <div className="flex items-center justify-between gap-4 px-[clamp(16px,3vw,36px)] py-[clamp(12px,2vw,20px)]">
            <p className="label text-ink-40">
              Case {String(index + 1).padStart(2, "0")} /{" "}
              {String(total).padStart(2, "0")}
            </p>
            <p className="label text-ink-40">{item.sector}</p>
          </div>

          {/* artwork occupies the middle, title block anchors the bottom */}
          <div className="case-art relative flex items-center justify-center overflow-hidden px-[clamp(16px,3vw,36px)]">
            <div
              className="h-full w-full max-w-3xl py-2"
              style={{
                opacity: active ? 1 : 0.25,
                transition: "opacity .6s var(--ease)",
              }}
            >
              <CaseArt index={index} active={active} />
            </div>

            {/* headline figure, floated over the artwork */}
            <p
              className="display pointer-events-none absolute right-[clamp(16px,3vw,36px)] top-0 text-[clamp(1.25rem,4vw,3.4rem)] text-accent"
              style={{
                opacity: active ? 1 : 0,
                transform: active ? "none" : "translateY(12px)",
                transition:
                  "opacity .7s var(--ease) .1s, transform .7s var(--ease) .1s",
              }}
            >
              {item.headline}
            </p>
          </div>

          <div className="mt-auto shrink-0 px-[clamp(16px,3vw,36px)] pb-[clamp(18px,3vw,36px)]">
            <div className="grid items-end gap-6 md:grid-cols-12">
              <div className="md:col-span-8">
                <h3 className="display text-[clamp(1.75rem,6.2vw,5.2rem)]">
                  {item.title.map((line, i) => (
                    <span key={i} className="reveal-line">
                      <span
                        style={{
                          transform: active ? "none" : "translateY(105%)",
                          transition: `transform .8s var(--ease) ${i * 0.07}s`,
                        }}
                      >
                        {line}
                      </span>
                    </span>
                  ))}
                </h3>
                <div className="mt-4 flex flex-wrap gap-x-6 gap-y-2">
                  {item.tags.map((tag) => (
                    <span key={tag} className="label text-ink-40">
                      {tag}
                    </span>
                  ))}
                </div>
              </div>

              <div className="md:col-span-4">
                <p className="max-w-[40ch] text-sm leading-relaxed text-muted">
                  {item.summary}
                </p>
                <button type="button" onClick={onOpen} className="pill mt-5">
                  Deep dive
                  <span aria-hidden>→</span>
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

/* ------------------------------------------------------------------------- */

function CaseDialog({ item, onClose }: { item: Case; onClose: () => void }) {
  const closeRef = useRef<HTMLButtonElement>(null);

  useScrollLock(true);

  useEffect(() => {
    closeRef.current?.focus();
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && onClose();
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [onClose]);

  /* Portalled to <body>. Rendered in place it would sit inside #main's
     stacking context (z-index 1), which the site header at z-50 paints over —
     the dialog's own close bar ended up underneath it. */
  return createPortal(
    <div
      role="dialog"
      aria-modal="true"
      aria-label={item.title.join(" ")}
      className="fixed inset-0 z-[60] overflow-y-auto bg-bg"
      data-theme={item.theme}
      style={{ animation: "rot-in .4s var(--ease) both" }}
    >
      <div className="shell sticky top-0 z-10 flex items-center justify-between bg-bg/95 py-4 backdrop-blur-md">
        <p className="label text-ink-40">{item.sector}</p>
        <button ref={closeRef} type="button" onClick={onClose} className="pill">
          Close
          <span aria-hidden>✕</span>
        </button>
      </div>

      <div className="shell pb-[clamp(60px,12vh,140px)] pt-6">
        <div className="rule-t" />
        <h2 className="display mt-8 text-[clamp(2.4rem,8vw,7rem)]">
          {item.title.join(" ")}
        </h2>

        <div className="mt-10 grid gap-10 md:grid-cols-12">
          <div className="md:col-span-4">
            <p className="label text-ink-40">Outcome</p>
            <p className="display mt-3 text-[clamp(1.8rem,4vw,3rem)] text-accent">
              {item.headline}
            </p>
            <div className="mt-8 flex flex-wrap gap-x-6 gap-y-2">
              {item.tags.map((tag) => (
                <span key={tag} className="label text-ink-40">
                  {tag}
                </span>
              ))}
            </div>
          </div>

          <div className="md:col-span-8">
            <p className="prose-lead text-ink">{item.summary}</p>
            <p className="mt-6 max-w-[62ch] leading-relaxed text-muted">
              {item.body}
            </p>

            <dl className="mt-10 grid grid-cols-1 gap-px border border-rule bg-rule sm:grid-cols-3">
              {item.stats.map(([value, label]) => (
                <div key={label} className="bg-bg p-6">
                  <dd className="display text-[clamp(1.6rem,3vw,2.4rem)]">
                    {value}
                  </dd>
                  <dt className="label mt-2 text-ink-40">{label}</dt>
                </div>
              ))}
            </dl>
          </div>
        </div>
      </div>
    </div>,
    document.body
  );
}

/* ------------------------------------------------------------------------- */

export default function CaseStack() {
  const [openIdx, setOpenIdx] = useState<number | null>(null);
  const wrapRef = useRef<HTMLDivElement>(null);

  /* Write the active case's accent onto :root so the header, buttons and
     footer all shift together, then hand it back when the stack is offscreen. */
  const applyTheme = (theme: Case["theme"]) => {
    document.documentElement.dataset.theme = theme;
  };

  useEffect(() => {
    const el = wrapRef.current;
    if (!el) return;
    const io = new IntersectionObserver(
      ([entry]) => {
        if (!entry.isIntersecting)
          delete document.documentElement.dataset.theme;
      },
      { threshold: 0 },
    );
    io.observe(el);
    return () => {
      io.disconnect();
      delete document.documentElement.dataset.theme;
    };
  }, []);

  /* A pinned plate completely hides the ones before it, but their buttons and
     links stay in the tab order, so keyboard focus lands on controls nobody
     can see. Mark every covered section inert.

     A section is covered exactly when the next one has reached the sticky
     position, since they all pin at the same offset and are the same height. */
  useEffect(() => {
    const wrap = wrapRef.current;
    if (!wrap) return;

    let frame = 0;
    const update = () => {
      frame = 0;
      const sections = Array.from(
        wrap.querySelectorAll<HTMLElement>(".case-section"),
      );
      const headerH =
        parseFloat(
          getComputedStyle(document.documentElement).getPropertyValue(
            "--header-h",
          ),
        ) || 68;

      sections.forEach((section, i) => {
        const nextPlate =
          sections[i + 1]?.querySelector<HTMLElement>(".case-plate");
        const covered =
          Boolean(nextPlate) &&
          nextPlate!.getBoundingClientRect().top <= headerH + 1;
        section.inert = covered;
      });
    };

    const onScroll = () => {
      if (!frame) frame = requestAnimationFrame(update);
    };

    update();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);
    return () => {
      if (frame) cancelAnimationFrame(frame);
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
      wrap
        .querySelectorAll<HTMLElement>(".case-section")
        .forEach((section) => (section.inert = false));
    };
  }, []);

  return (
    <div ref={wrapRef} id="work" className="relative">
      {cases.map((item, i) => (
        <CaseSection
          key={item.id}
          item={item}
          index={i}
          total={cases.length}
          onActive={applyTheme}
          onOpen={() => setOpenIdx(i)}
        />
      ))}

      {openIdx !== null && (
        <CaseDialog item={cases[openIdx]} onClose={() => setOpenIdx(null)} />
      )}
    </div>
  );
}
