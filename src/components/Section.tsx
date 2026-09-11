import type { ReactNode } from "react";
import Reveal from "./Reveal";

/* The one section wrapper. Its 12-column grid and gutter come from the same
   tokens as the header and footer, so a heading here sits on the exact axis as
   the nav above it — the thing the previous layout never did. */
export default function Section({
  id,
  index,
  eyebrow,
  title,
  blurb,
  aside,
  children,
  className = "",
}: {
  id?: string;
  index?: string;
  eyebrow: string;
  title: ReactNode;
  blurb?: string;
  aside?: ReactNode;
  children?: ReactNode;
  className?: string;
}) {
  return (
    <section id={id} className={`shell py-[var(--block)] ${className}`}>
      <div className="rule-t" />

      {/* meta rail, mirrors the case plate's top rail */}
      <div className="flex items-center justify-between gap-4 py-4">
        <p className="label text-ink-40">{eyebrow}</p>
        {index && <p className="label text-ink-40">{index}</p>}
      </div>

      <div className="grid gap-x-8 gap-y-10 md:grid-cols-12">
        <div className="md:col-span-7">
          <Reveal as="h2" className="display text-[clamp(2rem,5.6vw,4.6rem)]">
            {title}
          </Reveal>
        </div>

        {(blurb || aside) && (
          <div className="md:col-span-5 md:pt-2">
            {blurb && (
              <Reveal as="p" delay={0.08} className="max-w-[46ch] leading-relaxed text-muted">
                {blurb}
              </Reveal>
            )}
            {aside}
          </div>
        )}
      </div>

      {children && <div className="mt-[clamp(36px,6vh,72px)]">{children}</div>}
    </section>
  );
}
