import Link from "next/link";
import Image from "next/image";
import { nav, site } from "@/lib/content";

/* Compact sign-off. The call to action lives in the band above it on every
   page, so the footer only has to do the housekeeping: who, where, how to
   reach. One row on desktop, two short blocks on a phone. */
export default function SiteFooter() {
  return (
    <footer className="surface-ink">
      <div className="shell py-10 md:py-12">
        <div className="flex flex-col gap-7 lg:flex-row lg:items-center lg:justify-between lg:gap-10">
          <Link href="/" aria-label={`${site.name}, home`} className="flex items-center gap-3">
            <Image
              src="/logo-mark.png"
              alt=""
              width={64}
              height={64}
              className="h-8 w-8 brightness-0 invert"
            />
            <span className="text-[0.9375rem] font-semibold tracking-tight">{site.name}</span>
          </Link>

          <nav aria-label="Footer">
            <ul className="flex flex-wrap gap-x-6 gap-y-2">
              {[...nav, { label: "Contact", href: "/contact" }].map((item) => (
                <li key={item.href}>
                  <Link
                    href={item.href}
                    className="tap-target text-[0.9375rem] text-[var(--on-ink)] transition-colors duration-200 hover:text-white"
                  >
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>

          <div className="flex flex-wrap items-center gap-x-6 gap-y-2 text-[0.9375rem]">
            <a
              href={`mailto:${site.email}`}
              className="tap-target text-[var(--on-ink)] transition-colors duration-200 hover:text-white"
            >
              {site.email}
            </a>
            <a
              href={site.linkedin}
              target="_blank"
              rel="noreferrer noopener"
              className="tap-target text-[var(--on-ink)] transition-colors duration-200 hover:text-white"
            >
              LinkedIn
            </a>
          </div>
        </div>

        <div className="mt-8 flex items-center justify-between gap-4 border-t border-[var(--rule-ink)] pt-6 text-sm text-[var(--on-ink-faint)]">
          <p>
            &copy; {new Date().getFullYear()} {site.name}
          </p>
          <a href="#main" className="tap-target transition-colors duration-200 hover:text-white">
            Back to top &uarr;
          </a>
        </div>
      </div>
    </footer>
  );
}
