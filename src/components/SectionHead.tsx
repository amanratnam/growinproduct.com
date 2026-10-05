import Link from "next/link";
import type { ReactNode } from "react";

/* The one section heading. A headline, at most one supporting line, and an
   optional link out on the right — no eyebrow, no counter, no chip. Every
   section on the site opens the same way, so the eye learns where to look. */
export default function SectionHead({
  title,
  intro,
  link,
  aside,
  invert = false,
}: {
  title: ReactNode;
  intro?: string;
  link?: { href: string; label: string };
  aside?: ReactNode;
  invert?: boolean;
}) {
  return (
    <div className="flex flex-col gap-5 md:flex-row md:items-end md:justify-between md:gap-12">
      <div className="max-w-[44rem]">
        <h2 className="display h-section">{title}</h2>
        {intro && (
          <p
            className={`mt-5 max-w-[50ch] text-[1.0625rem] leading-relaxed ${
              invert ? "text-[var(--on-ink)]" : "text-muted"
            }`}
          >
            {intro}
          </p>
        )}
      </div>
      {link && (
        <Link href={link.href} className={`alink shrink-0 ${invert ? "hover:!text-white" : ""}`}>
          {link.label}
        </Link>
      )}
      {aside}
    </div>
  );
}
