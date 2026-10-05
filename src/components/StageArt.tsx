/* One diagram per process stage, showing what actually happens in it. Drawn
   static in hairlines with a single accent stroke — these explain, they don't
   perform. */

const S = {
  fill: "none",
  stroke: "currentColor",
  strokeWidth: 1.25,
  vectorEffect: "non-scaling-stroke" as const,
};

export default function StageArt({ index, className = "" }: { index: number; className?: string }) {
  return (
    <svg viewBox="0 0 240 120" className={`h-full w-full ${className}`} aria-hidden>
      {index === 0 && (
        <>
          {/* Discover: scattered signals converging into one read */}
          {[
            [24, 22],
            [52, 84],
            [30, 58],
            [70, 34],
            [46, 104],
          ].map(([x, y], i) => (
            <g key={i}>
              <circle cx={x} cy={y} r="4" {...S} />
              <line x1={x + 5} y1={y} x2="148" y2="60" {...S} strokeWidth="0.8" />
            </g>
          ))}
          <rect x="150" y="40" width="66" height="40" rx="3" {...S} stroke="var(--accent)" />
          <line x1="160" y1="54" x2="206" y2="54" {...S} stroke="var(--accent)" />
          <line x1="160" y1="64" x2="192" y2="64" {...S} stroke="var(--accent)" />
        </>
      )}

      {index === 1 && (
        <>
          {/* Define: many candidates, one sized and chosen */}
          {[0, 1, 2, 3, 4].map((i) => (
            <rect
              key={i}
              x="20"
              y={12 + i * 20}
              width={i === 2 ? 150 : 92 - i * 6}
              height="13"
              rx="2"
              {...S}
              stroke={i === 2 ? "var(--accent)" : "currentColor"}
            />
          ))}
          <text x="180" y="63" fill="var(--accent)" fontSize="13" fontWeight="700">
            1 of 5
          </text>
        </>
      )}

      {index === 2 && (
        <>
          {/* Design: a flow of screens with a spec attached */}
          {[0, 1, 2].map((i) => (
            <g key={i}>
              <rect x={18 + i * 62} y="28" width="44" height="64" rx="4" {...S} />
              <line x1={26 + i * 62} y1="40" x2={54 + i * 62} y2="40" {...S} />
              <line x1={26 + i * 62} y1="50" x2={46 + i * 62} y2="50" {...S} />
              {i < 2 && <path d={`M${64 + i * 62} 60 H${78 + i * 62}`} {...S} stroke="var(--accent)" />}
            </g>
          ))}
          <rect x="200" y="28" width="26" height="64" rx="3" {...S} stroke="var(--accent)" strokeDasharray="4 4" />
        </>
      )}

      {index === 3 && (
        <>
          {/* Deliver: sprint cadence along a shipping line */}
          {[0, 1, 2, 3].map((i) => (
            <g key={i}>
              <rect x={18 + i * 54} y="30" width="42" height="30" rx="3" {...S} />
              <circle cx={39 + i * 54} cy="84" r="4" {...S} stroke="var(--accent)" />
            </g>
          ))}
          <line x1="18" y1="84" x2="224" y2="84" {...S} />
          <polyline points="214,78 224,84 214,90" {...S} stroke="var(--accent)" />
        </>
      )}

      {index === 4 && (
        <>
          {/* Scale: a funnel with a curve climbing out of it */}
          {[0, 1, 2].map((i) => (
            <path
              key={i}
              d={`M${30 + i * 8} ${22 + i * 26} H${210 - i * 8} L${196 - i * 8} ${40 + i * 26} H${44 + i * 8} Z`}
              {...S}
            />
          ))}
          <polyline
            points="40,106 80,98 120,86 160,68 206,40"
            {...S}
            stroke="var(--accent)"
            strokeWidth="1.8"
          />
        </>
      )}
    </svg>
  );
}
