/* Shared themed icon set: 1.5px stroke, accent-aware, sized via className */

type IconProps = { className?: string };

export function RadarIcon({ className = "h-5 w-5" }: IconProps) {
  return (
    <svg viewBox="0 0 24 24" className={className} fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
      <circle cx="12" cy="12" r="9" opacity="0.35" />
      <circle cx="12" cy="12" r="5" opacity="0.55" />
      <circle cx="12" cy="12" r="1.4" fill="currentColor" stroke="none" />
      <path d="M12 12 L18.5 5.5" />
      <path d="M18.5 5.5 A9 9 0 0 1 21 12" opacity="0.7" />
    </svg>
  );
}

export function CrosshairIcon({ className = "h-5 w-5" }: IconProps) {
  return (
    <svg viewBox="0 0 24 24" className={className} fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" aria-hidden>
      <circle cx="12" cy="12" r="7" />
      <path d="M12 2v4M12 18v4M2 12h4M18 12h4" />
      <circle cx="12" cy="12" r="1.6" fill="currentColor" stroke="none" />
    </svg>
  );
}

export function VectorPenIcon({ className = "h-5 w-5" }: IconProps) {
  return (
    <svg viewBox="0 0 24 24" className={className} fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
      <path d="M4 20 L15 9" />
      <path d="M13.5 5.5 L18.5 10.5 L20.5 4.5 q.4 -1.4 -1 -1 z" />
      <rect x="2.5" y="18.5" width="3" height="3" rx="0.8" />
      <circle cx="15" cy="9" r="1.3" />
    </svg>
  );
}

export function RocketIcon({ className = "h-5 w-5" }: IconProps) {
  return (
    <svg viewBox="0 0 24 24" className={className} fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
      <path d="M12 16 q-5 -7 0 -13 q5 6 0 13z" />
      <circle cx="12" cy="8.5" r="1.6" />
      <path d="M9.5 12.5 q-3 .5 -3.5 4 q3.5 -.5 4 -3" opacity="0.7" />
      <path d="M14.5 12.5 q3 .5 3.5 4 q-3.5 -.5 -4 -3" opacity="0.7" />
      <path d="M11 18.5 q1 2 2 0M12 17.5 v3.5" opacity="0.8" />
    </svg>
  );
}

export function ChartUpIcon({ className = "h-5 w-5" }: IconProps) {
  return (
    <svg viewBox="0 0 24 24" className={className} fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
      <path d="M3 21h18" opacity="0.5" />
      <path d="M5 17l4.5-5 3.5 3 6-7" />
      <path d="M15.5 8H19v3.5" />
    </svg>
  );
}

export function DocIcon({ className = "h-5 w-5" }: IconProps) {
  return (
    <svg viewBox="0 0 24 24" className={className} fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
      <path d="M6 2.8h8l4 4V21.2H6z" />
      <path d="M14 2.8v4h4" opacity="0.7" />
      <path d="M9 11h6M9 14.5h6M9 18h4" opacity="0.7" />
    </svg>
  );
}

export function BoltIcon({ className = "h-5 w-5" }: IconProps) {
  return (
    <svg viewBox="0 0 24 24" className={className} fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinejoin="round" aria-hidden>
      <path d="M13 2.5 L5 13.5 h5.5 L11 21.5 L19 10.5 h-5.5z" />
    </svg>
  );
}

export function ChipIcon({ className = "h-5 w-5" }: IconProps) {
  return (
    <svg viewBox="0 0 24 24" className={className} fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" aria-hidden>
      <rect x="6.5" y="6.5" width="11" height="11" rx="2" />
      <rect x="10" y="10" width="4" height="4" rx="1" opacity="0.7" />
      <path d="M9 2.5v4M15 2.5v4M9 17.5v4M15 17.5v4M2.5 9h4M2.5 15h4M17.5 9h4M17.5 15h4" opacity="0.7" />
    </svg>
  );
}

export function SproutIcon({ className = "h-5 w-5" }: IconProps) {
  return (
    <svg viewBox="0 0 24 24" className={className} fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
      <path d="M12 21v-8" />
      <path d="M12 13 q-1 -6 -8 -6 q1 7 8 6z" />
      <path d="M12 11 q0 -6 7 -7 q0 7 -7 7z" opacity="0.7" />
      <path d="M8 21h8" opacity="0.5" />
    </svg>
  );
}

export function FlagIcon({ className = "h-5 w-5" }: IconProps) {
  return (
    <svg viewBox="0 0 24 24" className={className} fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
      <path d="M5 21V3.5" />
      <path d="M5 4 h13 l-3.5 4 3.5 4 H5" />
    </svg>
  );
}
