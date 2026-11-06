"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useRef, useState } from "react";

import { nav, cta, site } from "~/data/content";
import MegaMenu from "~/components/MegaMenu";
import BrandLogo from "~/components/BrandLogo";

const headerActions = [
  { label: "Precios", href: "/tratamientos" },
  { label: "Promos", href: "/promociones" },
  { label: cta.book.label, href: cta.book.href, primary: true },
] as const;

function isActive(pathname: string, href: string) {
  if (href === "/") return pathname === "/";
  return pathname === href || pathname.startsWith(href + "/");
}

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
    <header className="sticky top-0 z-40 border-b border-cream-200/80 bg-cream-50/95 backdrop-blur">
      <div className="container-x flex h-[4.75rem] items-center justify-between gap-3 xl:h-[5.5rem]">
        <Link href="/" aria-label={`${site.brandFull} — inicio`} className="shrink-0">
          <BrandLogo />
        </Link>

        <nav aria-label="Principal" className="hidden xl:block">
          <ul className="flex items-center gap-4 text-ink-700">
            {nav.map((item) => {
              if (item.href === "/") return null;
              const active = isActive(pathname, item.href);
              return (
                <li key={item.href}>
                  {item.href === "/tratamientos" ? (
                    <span className={active ? "text-gold-ink" : "text-ink-700"}>
                      <MegaMenu />
                    </span>
                  ) : (
                    <Link
                      href={item.href}
                      aria-current={active ? "page" : undefined}
                      className={`whitespace-nowrap font-serif text-[11px] uppercase tracking-[0.16em] transition hover:text-gold-ink ${
                        active ? "text-gold-ink" : ""
                      }`}
                    >
                      {item.label}
                    </Link>
                  )}
                </li>
              );
            })}
          </ul>
        </nav>

        <div className="hidden items-center gap-2 xl:flex">
          {headerActions.map((action) => {
            const active = isActive(pathname, action.href);
            if ("primary" in action && action.primary) {
              return (
                <Link
                  key={action.href}
                  href={action.href}
                  aria-current={active ? "page" : undefined}
                  className="inline-flex items-center justify-center rounded-full bg-ink-900 px-4 py-2 font-serif text-[11px] uppercase tracking-[0.14em] text-cream-50 transition hover:bg-ink-700 focus:outline-none focus-visible:ring-2 focus-visible:ring-gold-ink focus-visible:ring-offset-2"
                >
                  {action.label}
                </Link>
              );
            }
            return (
              <Link
                key={action.href}
                href={action.href}
                aria-current={active ? "page" : undefined}
                className={`inline-flex items-center justify-center rounded-full border px-3.5 py-2 font-serif text-[11px] uppercase tracking-[0.14em] transition focus:outline-none focus-visible:ring-2 focus-visible:ring-gold-ink focus-visible:ring-offset-2 ${
                  active
                    ? "border-gold-ink text-gold-ink"
                    : "border-ink-900/15 text-ink-900 hover:border-gold-ink hover:text-gold-ink"
                }`}
              >
                {action.label}
              </Link>
            );
          })}
        </div>

        <div className="flex items-center gap-2 xl:hidden">
          <Link
            href={cta.book.href}
            className="inline-flex items-center justify-center rounded-full bg-ink-900 px-3.5 py-2 font-serif text-[11px] uppercase tracking-[0.12em] text-cream-50"
          >
            Reservar
          </Link>
          <button
            ref={toggleRef}
            type="button"
            onClick={() => setOpen((v) => !v)}
            className="inline-flex h-10 w-10 items-center justify-center rounded-full border border-ink-900/15 text-ink-900"
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
      </div>

      {open && (
        <nav
          id="mobile-nav"
          aria-label="Móvil"
          className="border-t border-cream-200 bg-cream-50 xl:hidden"
        >
          <ul className="container-x flex flex-col gap-1 py-3 text-sm text-ink-700">
            {nav.map((item, i) => (
              <li key={item.href}>
                <Link
                  ref={i === 0 ? firstMobileLinkRef : null}
                  href={item.href}
                  aria-current={isActive(pathname, item.href) ? "page" : undefined}
                  className="block rounded-lg px-3 py-3 font-serif text-xs uppercase tracking-[0.14em] transition hover:bg-cream-100 hover:text-gold-ink"
                >
                  {item.label}
                </Link>
              </li>
            ))}
            <li>
              <Link
                href="/tratamientos"
                className="block rounded-lg px-3 py-3 font-serif text-xs uppercase tracking-[0.14em] transition hover:bg-cream-100 hover:text-gold-ink"
              >
                Precios
              </Link>
            </li>
            <li className="pt-2">
              <Link href={cta.book.href} className="btn-primary w-full uppercase tracking-[0.12em]">
                {cta.book.label}
              </Link>
            </li>
          </ul>
        </nav>
      )}
    </header>
  );
}
