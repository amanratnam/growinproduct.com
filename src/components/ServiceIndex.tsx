import Link from "next/link";
import { services, type ServiceIcon } from "@/lib/content";

/* Line icons, one per discipline, so the grid can be scanned before it's
   read. Same 24px box and stroke as each other, accent only. */
function Icon({ name }: { name: ServiceIcon }) {
  const p = {
    fill: "none",
    stroke: "currentColor",
    strokeWidth: 1.6,
    strokeLinecap: "round" as const,
    strokeLinejoin: "round" as const,
  };
  return (
    <svg viewBox="0 0 24 24" width="22" height="22" aria-hidden>
      {name === "strategy" && (
        <>
          <circle cx="12" cy="12" r="9" {...p} />
          <path d="M15.5 8.5l-2 5-5 2 2-5 5-2z" {...p} />
        </>
      )}
      {name === "analysis" && (
        <>
          <path d="M4 20V13M8.5 20V9M13 20v-5" {...p} />
          <circle cx="17" cy="8" r="3.5" {...p} />
          <path d="M19.5 10.5L22 13" {...p} />
        </>
      )}
      {name === "spec" && (
        <>
          <path d="M6 3h8l4 4v14H6z" {...p} />
          <path d="M14 3v4h4M9 12h6M9 16h4" {...p} />
        </>
      )}
      {name === "workflow" && (
        <>
          <rect x="3" y="4" width="6" height="5" rx="1.2" {...p} />
          <rect x="15" y="15" width="6" height="5" rx="1.2" {...p} />
          <path d="M9 6.5h3.5a2 2 0 0 1 2 2v6.5" {...p} />
        </>
      )}
      {name === "ai" && (
        <>
          <path d="M12 3l1.8 5.2L19 10l-5.2 1.8L12 17l-1.8-5.2L5 10l5.2-1.8z" {...p} />
          <path d="M19 16l.7 1.8 1.8.7-1.8.7L19 21l-.7-1.8-1.8-.7 1.8-.7z" {...p} />
        </>
      )}
      {name === "lead" && (
        <>
          <circle cx="9" cy="7.5" r="3.5" {...p} />
          <path d="M3 20c0-3.6 2.7-6 6-6s6 2.4 6 6" {...p} />
          <path d="M17 11l3-3 0 0M20 8v3.2M20 8h-3.2" {...p} />
        </>
      )}
    </svg>
  );
}

/* Six disciplines as six readable cards. The old version hid the detail
   behind hover-to-expand rows, which shifted the page under the cursor and
   meant nobody saw more than one service at a time. */
export default function ServiceIndex() {
  return (
    <section id="services" className="section">
      <div className="shell grid gap-x-12 gap-y-[var(--head-gap)] lg:grid-cols-12">
        <div className="lg:col-span-4">
          <div className="lg:sticky lg:top-[calc(var(--header-h)+40px)]">
            <h2 className="display h-section">
              Bring me
              <br />
              in for
            </h2>
            <p className="mt-5 max-w-[34ch] text-[1.0625rem] leading-relaxed text-muted">
              Not sure which one you need? Most people aren&apos;t. Describe the problem and
              I&apos;ll tell you where to start.
            </p>
            <Link href="/contact" className="alink mt-6">
              Describe your problem
            </Link>
          </div>
        </div>

        <ul className="grid gap-4 sm:grid-cols-2 lg:col-span-8">
          {services.map((s) => (
            <li key={s.id} className="card flex flex-col p-5 sm:p-7">
              <div className="flex items-center gap-4">
                <span className="grid h-11 w-11 shrink-0 place-items-center rounded-[var(--radius-sm)] bg-sand text-accent">
                  <Icon name={s.icon} />
                </span>
                <h3 className="h-card">{s.title}</h3>
              </div>
              <p className="mt-4 leading-relaxed text-muted">{s.summary}</p>
              <p className="mt-auto pt-5 text-sm leading-relaxed text-faint">
                <span className="block border-t border-rule pt-4">
                  <span className="font-semibold text-ink">You get </span>
                  {s.deliverables.join(" · ")}
                </span>
              </p>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
