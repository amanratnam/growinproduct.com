"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { nav, site } from "@/lib/content";
import useScrollLock from "./useScrollLock";

function MailIcon({ className = "" }: { className?: string }) {
  return (
    <svg viewBox="0 0 20 20" className={className} fill="none" aria-hidden>
      <path
        d="M2.5 5.5h15v9h-15z M2.5 6l7.5 5 7.5-5"
        stroke="currentColor"
        strokeWidth="1.4"
        strokeLinejoin="round"
      />
    </svg>
  );
}

function LinkedInIcon({ className = "" }: { className?: string }) {
  return (
    <svg viewBox="0 0 20 20" className={className} fill="currentColor" aria-hidden>
      <path d="M4.6 7.3H2.2V17h2.4V7.3zM3.4 3a1.4 1.4 0 100 2.8 1.4 1.4 0 000-2.8zM17.8 17h-2.4v-4.7c0-1.1-.4-1.9-1.4-1.9-.8 0-1.2.5-1.4 1-.1.2-.1.5-.1.8V17H10s0-8.1 0-9h2.4v1.3c.3-.5 1-1.2 2.3-1.2 1.7 0 3 1.1 3 3.5V17z" />
    </svg>
  );
}

export default function SiteHeader() {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);
  const [section, setSection] = useState<string | null>(null);

  useEffect(() => setOpen(false), [pathname]);

  /* Scroll-spy for the hash entries. Without it every in-page link lights up
     at once on the home page, because they all resolve to the same route. */
  useEffect(() => {
    setSection(null);
    const ids = nav
      .filter((item) => item.href.startsWith("/#"))
      .map((item) => item.href.slice(2));

    const targets = ids
      .map((id) => document.getElementById(id))
      .filter((el): el is HTMLElement => Boolean(el));
    if (!targets.length) return;

    /* A band across the upper-middle of the viewport decides which section
       counts as current, so the marker doesn't flicker at section seams. */
    const io = new IntersectionObserver(
      (entries) => {
        const hit = entries
          .filter((e) => e.isIntersecting)
          .sort((a, b) => a.boundingClientRect.top - b.boundingClientRect.top)[0];
        if (hit) setSection(hit.target.id);
        else if (entries.every((e) => !e.isIntersecting)) setSection(null);
      },
      { rootMargin: "-20% 0px -70% 0px", threshold: 0 }
    );

    targets.forEach((el) => io.observe(el));
    return () => io.disconnect();
  }, [pathname]);

  /* Lock the page while the mobile sheet is up. */
  useScrollLock(open);

  const isActive = (href: string) =>
    href.startsWith("/#")
      ? pathname === "/" && section === href.slice(2)
      : pathname.startsWith(href);

  return (
    <>
      <header
        className="site-header fixed inset-x-0 top-0 z-50 bg-bg/90 backdrop-blur-md transition-colors duration-300"
        style={{ minHeight: "var(--header-h)" }}
      >
        <div
          className="shell grid h-[var(--header-h)] items-center gap-4"
          style={{ gridTemplateColumns: "1fr auto 1fr" }}
        >
          {/* left: mark + standing line */}
          <Link href="/" aria-label={`${site.name}, home`} className="group flex items-center gap-3">
            <Image
              src="/logo-mark.png"
              alt=""
              width={64}
              height={64}
              priority
              className="header-mark h-7 w-7 transition-transform duration-500 group-hover:rotate-[-8deg] md:h-8 md:w-8"
            />
            {/* opacity rather than a fixed ink colour, so it follows the
                header when it inverts over the footer */}
            <span className="label hidden opacity-60 transition-colors duration-300 group-hover:text-accent group-hover:opacity-100 lg:inline">
              {site.location}
            </span>
          </Link>

          {/* centre: tabs. Active one is a filled box, the way the reference
              marks its current section. */}
          <nav aria-label="Primary" className="hidden md:block">
            <ul className="flex items-center gap-1">
              {nav.map((item) => {
                const active = isActive(item.href);
                return (
                  <li key={item.href}>
                    <Link
                      href={item.href}
                      aria-current={active ? "page" : undefined}
                      className={`label block px-3 py-2 transition-colors duration-300 ${
                        active
                          ? "bg-ink text-bg"
                          : "hover:text-accent"
                      }`}
                    >
                      {item.label}
                    </Link>
                  </li>
                );
              })}
            </ul>
          </nav>

          {/* right: contact rail */}
          <div className="flex items-center justify-end gap-4">
            <a
              href={`mailto:${site.email}`}
              className="ulink label hidden transition-colors duration-300 hover:text-accent lg:inline-block"
            >
              {site.email}
            </a>
            <a
              href={`mailto:${site.email}`}
              aria-label={`Email ${site.email}`}
              className="transition-colors duration-300 hover:text-accent lg:hidden"
            >
              <MailIcon className="h-[18px] w-[18px]" />
            </a>
            <a
              href={site.linkedin}
              target="_blank"
              rel="noreferrer noopener"
              aria-label="LinkedIn"
              className="transition-colors duration-300 hover:text-accent"
            >
              <LinkedInIcon className="h-[18px] w-[18px]" />
            </a>

            <button
              type="button"
              onClick={() => setOpen((v) => !v)}
              aria-expanded={open}
              aria-controls="mobile-menu"
              aria-label={open ? "Close menu" : "Open menu"}
              className="relative flex h-8 w-8 flex-col items-center justify-center gap-[5px] md:hidden"
            >
              <span
                className={`h-px w-5 bg-current transition-transform duration-300 ${
                  open ? "translate-y-[3px] rotate-45" : ""
                }`}
              />
              <span
                className={`h-px w-5 bg-current transition-transform duration-300 ${
                  open ? "-translate-y-[3px] -rotate-45" : ""
                }`}
              />
            </button>
          </div>
        </div>
        <div className="shell">
          <div className="header-rule rule-b" />
        </div>
      </header>

      {/* mobile sheet */}
      <div
        id="mobile-menu"
        hidden={!open}
        className="fixed inset-0 z-40 bg-bg pt-[var(--header-h)] md:hidden"
      >
        <nav aria-label="Primary, mobile" className="shell pt-6">
          <ul>
            {nav.map((item, i) => (
              <li key={item.href} className="rule-b">
                <Link
                  href={item.href}
                  onClick={() => setOpen(false)}
                  className="flex items-baseline gap-4 py-5"
                >
                  <span className="label text-ink-40">{String(i + 1).padStart(2, "0")}</span>
                  <span className="display text-[13vw] leading-none">{item.label}</span>
                </Link>
              </li>
            ))}
          </ul>
          <Link
            href="/contact"
            onClick={() => setOpen(false)}
            className="pill pill--solid mt-8 w-full"
          >
            Start a conversation
          </Link>
          <p className="label mt-6 text-ink-40">{site.availability}</p>
        </nav>
      </div>
    </>
  );
}
