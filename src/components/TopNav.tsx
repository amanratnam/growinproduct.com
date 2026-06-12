"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import { navItems } from "./nav";

/* Fixed top menu. On the home page it slides in once you scroll past the
   hero; on every other page it is always present. Blurred + translucent. */
export default function TopNav() {
  const pathname = usePathname();
  const isHome = pathname === "/";
  const [past, setPast] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    if (!isHome) {
      setPast(true);
      return;
    }
    const onScroll = () => setPast(window.scrollY > window.innerHeight * 0.75);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, [isHome]);

  useEffect(() => setOpen(false), [pathname]);

  const visible = past || open;

  return (
    <AnimatePresence>
      {visible && (
        <motion.header
          initial={{ y: -72, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ y: -72, opacity: 0 }}
          transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
          className="fixed inset-x-0 top-0 z-50 border-b border-foreground/[0.06] bg-white/55 backdrop-blur-2xl"
        >
          <nav className="mx-auto flex h-16 max-w-7xl items-center justify-between px-6 lg:px-10">
            <Link href="/" aria-label="Grow In Product, home" className="group flex items-center gap-2.5 font-semibold tracking-tight">
              <Image
                src="/logo-mark.png"
                alt=""
                width={32}
                height={32}
                priority
                className="h-8 w-8 transition-transform duration-300 group-hover:scale-105"
              />
              <span className="hidden sm:inline">
                Grow In Product<span className="text-accent">.</span>
              </span>
            </Link>

            <div className="hidden items-center gap-1 md:flex">
              {navItems.map((item) => {
                const active =
                  item.href === pathname ||
                  (item.href.startsWith("/#") && isHome === false && false);
                return (
                  <Link
                    key={item.href}
                    href={item.href}
                    className={`group relative rounded-full px-4 py-2 text-sm transition-colors duration-300 ${
                      active ? "text-accent-dark" : "text-foreground/60 hover:text-foreground"
                    }`}
                  >
                    {item.label}
                    <span
                      className={`absolute inset-x-4 -bottom-px h-px bg-accent transition-transform duration-300 ${
                        active ? "scale-x-100" : "scale-x-0 group-hover:scale-x-100"
                      }`}
                    />
                  </Link>
                );
              })}
              <Link
                href="/contact"
                className="group relative ml-3 overflow-hidden rounded-full bg-foreground px-5 py-2 text-sm font-medium text-white transition-transform duration-300 hover:scale-[1.04] active:scale-95"
              >
                <span className="relative z-10">Let&apos;s talk</span>
                <span className="absolute inset-0 -translate-x-full bg-accent transition-transform duration-400 ease-out group-hover:translate-x-0" />
              </Link>
            </div>

            <button
              aria-label="Toggle menu"
              aria-expanded={open}
              onClick={() => setOpen(!open)}
              className="flex h-10 w-10 flex-col items-center justify-center gap-1.5 md:hidden"
            >
              <span className={`h-0.5 w-5 bg-foreground transition-transform duration-300 ${open ? "translate-y-1 rotate-45" : ""}`} />
              <span className={`h-0.5 w-5 bg-foreground transition-transform duration-300 ${open ? "-translate-y-1 -rotate-45" : ""}`} />
            </button>
          </nav>

          <AnimatePresence>
            {open && (
              <motion.div
                initial={{ height: 0, opacity: 0 }}
                animate={{ height: "auto", opacity: 1 }}
                exit={{ height: 0, opacity: 0 }}
                transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
                className="overflow-hidden border-t border-foreground/[0.06] bg-white/85 backdrop-blur-2xl md:hidden"
              >
                <ul className="px-4 py-3">
                  {navItems.map((item, idx) => (
                    <li key={item.href}>
                      <Link
                        href={item.href}
                        onClick={() => setOpen(false)}
                        className="flex w-full items-center gap-3 rounded-lg px-3 py-3 font-medium transition-colors hover:bg-accent-soft"
                      >
                        <span className="font-mono text-xs text-muted/60">0{idx + 1}</span>
                        {item.label}
                        <span className="ml-auto font-mono text-[9px] uppercase tracking-widest text-accent-dark/70">
                          {item.tag}
                        </span>
                      </Link>
                    </li>
                  ))}
                </ul>
              </motion.div>
            )}
          </AnimatePresence>
        </motion.header>
      )}
    </AnimatePresence>
  );
}
