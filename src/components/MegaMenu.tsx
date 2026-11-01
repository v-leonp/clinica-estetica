"use client";

import Link from "next/link";
import { useEffect, useRef, useState } from "react";

import { categoriesFull } from "~/data/content";

export default function MegaMenu() {
  const [open, setOpen] = useState(false);
  const wrapRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!open) return;
    const onDoc = (e: MouseEvent) => {
      if (wrapRef.current && !wrapRef.current.contains(e.target as Node)) {
        setOpen(false);
      }
    };
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setOpen(false);
    };
    document.addEventListener("mousedown", onDoc);
    document.addEventListener("keydown", onKey);
    return () => {
      document.removeEventListener("mousedown", onDoc);
      document.removeEventListener("keydown", onKey);
    };
  }, [open]);

  return (
    <div ref={wrapRef} className="relative">
      <button
        type="button"
        className="inline-flex items-center gap-1 transition hover:text-rose-gold focus:outline-none focus-visible:text-rose-gold"
        aria-expanded={open}
        aria-haspopup="true"
        aria-controls="mega-tratamientos"
        onClick={() => setOpen((v) => !v)}
      >
        Tratamientos
        <span aria-hidden="true" className="text-[10px]">
          ▾
        </span>
      </button>
      {open && (
        <div
          id="mega-tratamientos"
          role="region"
          aria-label="Categorías de tratamientos"
          className="absolute left-1/2 top-full z-50 mt-3 w-[min(100vw-2rem,720px)] -translate-x-1/2 rounded-2xl border border-cream-200 bg-white p-6 shadow-soft"
        >
          <ul className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {categoriesFull.map((cat) => (
              <li key={cat.slug}>
                <Link
                  href={`/tratamientos/${cat.slug}`}
                  className="font-serif text-lg text-ink-900 hover:text-rose-gold"
                  onClick={() => setOpen(false)}
                >
                  {cat.title}
                </Link>
                <ul className="mt-2 space-y-1">
                  {cat.treatments.slice(0, 4).map((t) => (
                    <li key={t.slug}>
                      <Link
                        href={`/tratamientos/${cat.slug}/${t.slug}`}
                        className="text-sm text-ink-600 hover:text-rose-gold"
                        onClick={() => setOpen(false)}
                      >
                        {t.name}
                      </Link>
                    </li>
                  ))}
                </ul>
              </li>
            ))}
          </ul>
          <p className="mt-5 border-t border-cream-200 pt-4 text-center text-sm">
            <Link
              href="/tratamientos"
              className="font-medium text-rose-gold hover:underline"
              onClick={() => setOpen(false)}
            >
              Ver catálogo completo →
            </Link>
          </p>
        </div>
      )}
    </div>
  );
}
