import type { ReactNode } from "react";

/* Opening block for every inner page: one headline, one line under it, and an
   optional aside on the right. Same size, same spacing on every route. */
export default function PageHeader({
  lines,
  intro,
  aside,
}: {
  lines: readonly string[];
  intro: string;
  aside?: ReactNode;
}) {
  return (
    <section className="shell pb-[clamp(48px,6vw,88px)] pt-[clamp(40px,6vw,96px)]">
      <div className="grid gap-x-12 gap-y-10 lg:grid-cols-12 lg:items-end">
        <div className={aside ? "lg:col-span-7" : "lg:col-span-10"}>
          <h1 className="display h-page">
            {lines.map((line) => (
              <span key={line} className="block">
                {line}
              </span>
            ))}
          </h1>
          <p className="lead mt-6 max-w-[48ch] md:mt-8">{intro}</p>
        </div>
        {aside && <div className="lg:col-span-5">{aside}</div>}
      </div>
    </section>
  );
}
