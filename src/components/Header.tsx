"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useRef, useState } from "react";

import { nav, site, hero } from "~/data/content";

export default function Header() {
  const [open, setOpen] = useState(false);
  const pathname = usePathname();
  const toggleRef = useRef<HTMLButtonElement>(null);
  const firstMobileLinkRef = useRef<HTMLAnchorElement>(null);

  useEffect(() => {
    setOpen(false);
  }, [pathname]);

  useEffect(() => {
    if (!open) return;
    firstMobileLinkRef.current?.focus();
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        e.preventDefault();
        setOpen(false);
        toggleRef.current?.focus();
      }
    };
    document.addEventListener("keydown", onKey);
    return () => document.removeEventListener("keydown", onKey);
  }, [open]);

  return (
    <header className="sticky top-0 z-40 border-b border-cream-200/70 bg-cream-50/85 backdrop-blur">
      <div className="container-x flex h-16 items-center justify-between md:h-20">
        <Link
          href="/"
          className="font-serif text-xl font-semibold tracking-tight text-ink-900 md:text-2xl"
          aria-label={`${site.brand} — inicio`}
        >
          {site.brand}
          <span className="ml-1 text-rose-gold">·</span>
        </Link>

        <nav aria-label="Principal" className="hidden md:block">
          <ul className="flex items-center gap-6 text-sm text-ink-700">
            {nav.map((item) => {
              const active =
                item.href === "/"
                  ? pathname === "/"
                  : pathname === item.href ||
                    pathname.startsWith(item.href + "/");
              return (
                <li key={item.href}>
                  <Link
                    href={item.href}
                    aria-current={active ? "page" : undefined}
                    className={`transition hover:text-rose-gold ${
                      active ? "text-rose-gold" : ""
                    }`}
                  >
                    {item.label}
                  </Link>
                </li>
              );
            })}
          </ul>
        </nav>

        <div className="hidden md:block">
          <Link href={hero.ctaPrimary.href} className="btn-primary">
            {hero.ctaPrimary.label}
          </Link>
        </div>

        <button
          ref={toggleRef}
          type="button"
          onClick={() => setOpen((v) => !v)}
          className="inline-flex h-10 w-10 items-center justify-center rounded-full border border-ink-900/15 text-ink-900 md:hidden"
          aria-label={open ? "Cerrar menú" : "Abrir menú"}
          aria-expanded={open}
          aria-controls="mobile-nav"
        >
          <svg
            width="18"
            height="18"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            aria-hidden="true"
          >
            {open ? (
              <>
                <line x1="18" y1="6" x2="6" y2="18" />
                <line x1="6" y1="6" x2="18" y2="18" />
              </>
            ) : (
              <>
                <line x1="3" y1="6" x2="21" y2="6" />
                <line x1="3" y1="12" x2="21" y2="12" />
                <line x1="3" y1="18" x2="21" y2="18" />
              </>
            )}
          </svg>
        </button>
      </div>

      {open && (
        <nav
          id="mobile-nav"
          aria-label="Móvil"
          className="border-t border-cream-200 bg-cream-50 md:hidden"
        >
          <ul className="container-x flex flex-col gap-1 py-3 text-sm text-ink-700">
            {nav.map((item, i) => (
              <li key={item.href}>
                <Link
                  ref={i === 0 ? firstMobileLinkRef : null}
                  href={item.href}
                  className="block rounded-lg px-3 py-3 transition hover:bg-cream-100 hover:text-rose-gold"
                >
                  {item.label}
                </Link>
              </li>
            ))}
            <li className="pt-2">
              <Link href={hero.ctaPrimary.href} className="btn-primary w-full">
                {hero.ctaPrimary.label}
              </Link>
            </li>
          </ul>
        </nav>
      )}
    </header>
  );
}
