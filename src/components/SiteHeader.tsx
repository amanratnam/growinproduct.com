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
        className="fixed inset-x-0 top-0 z-50 border-b border-rule bg-bg/90 backdrop-blur-md"
        style={{ minHeight: "var(--header-h)" }}
      >
        {/* Flex on phones, three-column grid from md up. The grid can't be used
            at both sizes: the centre nav is display:none on mobile, so it
            leaves the grid flow entirely and the right-hand group falls into
            column 2 — leaving a dead column at the right edge and the menu
            button stranded mid-bar. */}
        <div className="shell flex h-[var(--header-h)] items-center justify-between gap-3 md:grid md:gap-4 md:[grid-template-columns:1fr_auto_1fr]">
          {/* left: mark + standing line */}
          <Link href="/" aria-label={`${site.name}, home`} className="group tap-target flex min-w-0 shrink items-center gap-3 py-2">
            <Image
              src="/logo-mark.png"
              alt=""
              width={64}
              height={64}
              priority
              className="h-8 w-8 transition-transform duration-500 group-hover:rotate-[-8deg]"
            />
            <span className="label hidden whitespace-nowrap text-faint transition-colors duration-300 group-hover:text-accent xl:inline">
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
                      className={`label block rounded-full px-3.5 py-2 transition-colors duration-200 ${
                        active ? "bg-ink text-bg" : "hover:bg-sand"
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
              className={`pill pill--sm shrink-0 ${contactActive ? "" : "pill--solid"}`}
            >
              Let&apos;s talk
            </Link>

            <button
              type="button"
              onClick={() => setOpen((v) => !v)}
              aria-expanded={open}
              aria-controls="mobile-menu"
              aria-label={open ? "Close menu" : "Open menu"}
              className="-mr-2.5 flex h-11 w-11 shrink-0 flex-col items-center justify-center gap-[5px] md:hidden"
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
      </header>

      {/* mobile sheet */}
      <div
        id="mobile-menu"
        hidden={!open}
        className="fixed inset-0 z-40 overflow-y-auto overscroll-contain bg-bg pt-[var(--header-h)] pb-10 md:hidden"
      >
        <nav aria-label="Primary, mobile" className="shell pt-6">
          <ul>
            {nav.map((item, i) => (
              <li key={item.href} className="rule-b">
                <Link
                  href={item.href}
                  onClick={() => setOpen(false)}
                  className="flex items-baseline gap-4 py-3.5"
                >
                  <span className="label text-faint">{String(i + 1).padStart(2, "0")}</span>
                  <span className="display text-[clamp(1.9rem,10vw,2.8rem)] leading-none">{item.label}</span>
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
          <a href={`mailto:${site.email}`} className="tlink tap-target mt-6 inline-block py-2 text-[0.9375rem] text-muted">
            {site.email}
          </a>
        </nav>
      </div>
    </>
  );
}
