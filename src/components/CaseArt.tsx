/* ---------------------------------------------------------------------------
   One schematic per case. The structure is drawn static, so the point of the
   diagram reads on the first frame; only the accent packets keep moving
   through it. Strokes take currentColor, so the caller sets the tone for a
   light or dark surface.
--------------------------------------------------------------------------- */

const S = {
  fill: "none",
  stroke: "currentColor",
  strokeWidth: 1.25,
  vectorEffect: "non-scaling-stroke" as const,
};

export default function CaseArt({ id, className = "" }: { id: string; className?: string }) {
  return (
    <svg viewBox="0 0 320 200" className={`h-full w-full ${className}`} aria-hidden>
      {[40, 80, 120, 160].map((y) => (
        <line key={y} x1="0" y1={y} x2="320" y2={y} {...S} strokeWidth="0.6" opacity="0.6" />
      ))}

      {id === "patient-intake" && (
        <>
          {/* fourteen screens narrowing to five */}
          {Array.from({ length: 5 }).map((_, i) => (
            <rect
              key={i}
              x={44 + i * 14}
              y={26 + i * 22}
              width={232 - i * 28}
              height="12"
              rx="2"
              {...S}
              stroke={i === 4 ? "var(--accent)" : "currentColor"}
              strokeWidth={i === 4 ? 1.8 : 1.25}
            />
          ))}
          <circle className="packet" r="4.5" fill="var(--accent)">
            <animateMotion
              dur="4.5s"
              repeatCount="indefinite"
              path="M160 18 L160 32 L160 54 L160 76 L160 98 L160 120 L160 186"
            />
          </circle>
        </>
      )}

      {id === "ops-workflow" && (
        <>
          {/* seventeen handoffs replaced by one routed path */}
          {Array.from({ length: 9 }).map((_, i) => (
            <circle key={i} cx={32 + i * 32} cy={i % 2 ? 62 : 128} r="5" {...S} />
          ))}
          <path
            d="M32 128 C 96 128, 96 62, 160 62 S 236 128, 288 128"
            {...S}
            stroke="var(--accent)"
            strokeWidth="1.8"
          />
          <circle className="packet" r="5" fill="var(--accent)">
            <animateMotion
              dur="5.5s"
              repeatCount="indefinite"
              path="M32 128 C 96 128, 96 62, 160 62 S 236 128, 288 128"
            />
          </circle>
        </>
      )}

      {id === "focused-roadmap" && (
        <>
          {/* eighty items cut down, one line rising */}
          {Array.from({ length: 18 }).map((_, i) => (
            <line
              key={i}
              x1={22 + i * 16}
              y1="176"
              x2={22 + i * 16}
              y2={176 - (i < 7 ? 96 : 12)}
              {...S}
              opacity={i < 7 ? 1 : 0.45}
            />
          ))}
          <polyline
            points="22,152 76,134 130,98 184,74 238,46 296,22"
            {...S}
            stroke="var(--accent)"
            strokeWidth="1.8"
          />
          <circle className="packet" r="4.5" fill="var(--accent)">
            <animateMotion
              dur="5s"
              repeatCount="indefinite"
              path="M22 152 L76 134 L130 98 L184 74 L238 46 L296 22"
            />
          </circle>
        </>
      )}

      {id === "support-copilot" && (
        <>
          {/* triage hub: most tickets routed by the model, a few to a person */}
          <circle cx="160" cy="100" r="30" {...S} stroke="var(--accent)" strokeWidth="1.8" />
          <circle cx="160" cy="100" r="30" {...S} stroke="var(--accent)" className="wa-ring packet" />
          {[
            [36, 40],
            [36, 100],
            [36, 160],
            [284, 56],
            [284, 144],
          ].map(([x, y], i) => (
            <g key={i}>
              <line x1={x} y1={y} x2={x < 160 ? 130 : 190} y2="100" {...S} />
              <rect x={x - 9} y={y - 7} width="18" height="14" rx="2" {...S} />
            </g>
          ))}
          {[0, 1, 2].map((i) => (
            <circle key={i} className="packet" r="3.5" fill="var(--accent)">
              <animateMotion
                dur="3.4s"
                begin={`${i * 1.1}s`}
                repeatCount="indefinite"
                path={`M36 ${40 + i * 60} L130 100`}
              />
            </circle>
          ))}
        </>
      )}
    </svg>
  );
}
