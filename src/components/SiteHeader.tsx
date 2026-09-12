"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { nav, site } from "@/lib/content";
import useScrollLock from "./useScrollLock";

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

  useScrollLock(open);

  const isActive = (href: string) => {
    /* Home is current only at the top of the home page — once a hash section
       owns the scroll position, that entry takes the marker instead. */
    if (href === "/") return pathname === "/" && section === null;
    if (href.startsWith("/#")) return pathname === "/" && section === href.slice(2);
    return pathname.startsWith(href);
  };

  const contactActive = pathname.startsWith("/contact");

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
            <span className="label hidden opacity-60 transition-colors duration-300 group-hover:text-accent group-hover:opacity-100 lg:inline">
              {site.location}
            </span>
          </Link>

          {/* centre: tabs. Active one is a filled box. */}
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
                        active ? "bg-ink text-bg" : "hover:text-accent"
                      }`}
                    >
                      {item.label}
                    </Link>
                  </li>
                );
              })}
            </ul>
          </nav>

          {/* right: the one action worth taking from anywhere on the site */}
          <div className="flex items-center justify-end gap-3">
            <Link
              href="/contact"
              aria-current={contactActive ? "page" : undefined}
              className={`header-cta pill !min-h-0 !px-4 !py-2.5 !text-[0.68rem] ${
                contactActive ? "pill--solid" : ""
              }`}
            >
              Let&apos;s talk
            </Link>

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
                  className="flex items-baseline gap-4 py-4"
                >
                  <span className="label text-ink-40">{String(i + 1).padStart(2, "0")}</span>
                  <span className="display text-[11vw] leading-none">{item.label}</span>
                </Link>
              </li>
            ))}
          </ul>
          <Link
            href="/contact"
            onClick={() => setOpen(false)}
            className="pill pill--solid mt-8 w-full"
          >
            Let&apos;s talk
          </Link>
          <p className="label mt-6 text-ink-40">{site.availability}</p>
          <a href={`mailto:${site.email}`} className="ulink mt-3 block text-sm text-muted">
            {site.email}
          </a>
        </nav>
      </div>
    </>
  );
}
