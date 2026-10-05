/* ---------------------------------------------------------------------------
   Small inhabitants for the long-form pages. They live in their own strip of
   the layout rather than sitting inside content: one walks the full width, one
   climbs a ladder between sections, one pushes a roadmap block along.

   Deliberately flat SVG in the page's own ink/accent, so they read as part of
   the editorial system rather than clip-art. All motion is CSS so it runs off
   the compositor and stops under prefers-reduced-motion.
--------------------------------------------------------------------------- */

function Figure({ accent = false }: { accent?: boolean }) {
  const body = accent ? "var(--accent)" : "var(--ink)";
  return (
    <>
      <circle cx="12" cy="7" r="4.6" fill={body} />
      <path d="M12 12.4c-3.6 0-6 2.2-6 5.6v6.2h12V18c0-3.4-2.4-5.6-6-5.6z" fill={body} />
    </>
  );
}

/* A figure that walks the full width of the screen, carrying a spec. */
export function Walker({
  accent = false,
  duration = 34,
  delay = 0,
  reverse = false,
}: {
  accent?: boolean;
  duration?: number;
  delay?: number;
  reverse?: boolean;
}) {
  return (
    <div
      className="char-walk"
      style={
        {
          "--char-dur": `${duration}s`,
          "--char-delay": `${delay}s`,
          "--char-dir": reverse ? "reverse" : "normal",
        } as React.CSSProperties
      }
      aria-hidden
    >
      {/* mirrored when walking right-to-left, so nobody moonwalks */}
      <svg
        viewBox="0 0 46 30"
        className="h-full w-auto"
        style={{ overflow: "visible", transform: reverse ? "scaleX(-1)" : undefined }}
      >
        <g className="char-bob">
          <Figure accent={accent} />
          {/* legs, alternating */}
          <g stroke={accent ? "var(--accent)" : "var(--ink)"} strokeWidth="1.8" strokeLinecap="round">
            <line className="char-leg char-leg--a" x1="10" y1="24" x2="8" y2="29" />
            <line className="char-leg char-leg--b" x1="14" y1="24" x2="16" y2="29" />
          </g>
          {/* the document being carried */}
          <g transform="translate(26 12)">
            <rect width="15" height="18" rx="1.5" fill="none" stroke="var(--rule-strong)" strokeWidth="1.4" />
            <line x1="3" y1="5" x2="12" y2="5" stroke="var(--rule-strong)" strokeWidth="1.4" />
            <line x1="3" y1="9" x2="12" y2="9" stroke="var(--rule-strong)" strokeWidth="1.4" />
            <line x1="3" y1="13" x2="8" y2="13" stroke="var(--accent)" strokeWidth="1.4" />
          </g>
          <line
            x1="17"
            y1="17"
            x2="26"
            y2="19"
            stroke={accent ? "var(--accent)" : "var(--ink)"}
            strokeWidth="1.8"
            strokeLinecap="round"
          />
        </g>
      </svg>
    </div>
  );
}

/* A figure climbing a ladder — used on the seam between two sections, so it
   reads as moving up through the page. */
export function Climber({ duration = 16 }: { duration?: number }) {
  return (
    <div className="char-ladder" aria-hidden>
      <svg viewBox="0 0 34 220" className="h-full w-full" style={{ overflow: "visible" }}>
        {/* rails */}
        <line x1="9" y1="0" x2="9" y2="220" stroke="var(--rule-strong)" strokeWidth="1.6" />
        <line x1="25" y1="0" x2="25" y2="220" stroke="var(--rule-strong)" strokeWidth="1.6" />
        {Array.from({ length: 11 }).map((_, i) => (
          <line
            key={i}
            x1="9"
            y1={12 + i * 20}
            x2="25"
            y2={12 + i * 20}
            stroke="var(--rule-strong)"
            strokeWidth="1.6"
          />
        ))}
        <g
          className="char-climb"
          style={{ "--char-dur": `${duration}s` } as React.CSSProperties}
        >
          <g transform="translate(5 0) scale(1.05)">
            <Figure accent />
            <g stroke="var(--accent)" strokeWidth="1.8" strokeLinecap="round">
              <line className="char-leg char-leg--a" x1="10" y1="24" x2="7" y2="29" />
              <line className="char-leg char-leg--b" x1="14" y1="24" x2="17" y2="29" />
            </g>
          </g>
        </g>
      </svg>
    </div>
  );
}

/* A figure pushing a block along a rule — the roadmap being moved forward. */
export function Pusher({ duration = 28, delay = 0 }: { duration?: number; delay?: number }) {
  return (
    <div
      className="char-walk"
      style={
        {
          "--char-dur": `${duration}s`,
          "--char-delay": `${delay}s`,
        } as React.CSSProperties
      }
      aria-hidden
    >
      <svg viewBox="0 0 60 30" className="h-full w-auto" style={{ overflow: "visible" }}>
        <g className="char-bob">
          <Figure />
          <g stroke="var(--ink)" strokeWidth="1.8" strokeLinecap="round">
            <line className="char-leg char-leg--a" x1="10" y1="24" x2="8" y2="29" />
            <line className="char-leg char-leg--b" x1="14" y1="24" x2="16" y2="29" />
            {/* arms out to the block */}
            <line x1="17" y1="16" x2="28" y2="18" />
          </g>
          {/* the block, nudging as it's pushed */}
          <g className="char-push">
            <rect x="29" y="12" width="18" height="18" fill="var(--accent)" />
            <rect x="33" y="16" width="10" height="2" fill="var(--bg)" />
            <rect x="33" y="20" width="7" height="2" fill="var(--bg)" />
          </g>
        </g>
      </svg>
    </div>
  );
}

/* Two figures at a whiteboard, one pointing, one nodding. Sits still and
   loops in place — for a column edge rather than a full-width strip. */
export function Standup() {
  return (
    <div aria-hidden>
      {/* viewBox is cropped to the drawing itself, so the svg's box is the
          scene's box and nothing placed after it can overlap the figures */}
      <svg viewBox="0 0 120 60" className="block h-auto w-full">
        <line x1="0" y1="56.5" x2="120" y2="56.5" stroke="var(--rule-strong)" strokeWidth="1.2" />
        {/* board */}
        <rect x="46" y="4" width="70" height="48" fill="none" stroke="var(--rule-strong)" strokeWidth="1.6" />
        <polyline
          className="char-chart"
          points="54,44 68,36 82,40 96,24 108,14"
          fill="none"
          stroke="var(--accent)"
          strokeWidth="2"
          strokeLinecap="round"
        />
        <line x1="54" y1="12" x2="76" y2="12" stroke="var(--rule-strong)" strokeWidth="1.6" />
        {/* presenter */}
        <g transform="translate(6 26) scale(1.15)">
          <Figure accent />
          <line
            className="char-point"
            x1="17"
            y1="16"
            x2="30"
            y2="10"
            stroke="var(--accent)"
            strokeWidth="1.8"
            strokeLinecap="round"
          />
        </g>
        {/* listener */}
        <g transform="translate(28 30)">
          <g className="char-nod">
            <Figure />
          </g>
        </g>
      </svg>
    </div>
  );
}
