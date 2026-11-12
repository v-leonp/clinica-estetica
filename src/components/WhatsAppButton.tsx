"use client";

import { useCallback, useEffect, useId, useRef, useState } from "react";

import { site, whatsappWidget } from "~/data/content";
import { trackWhatsAppClick } from "~/lib/analytics";

function buildWhatsAppUrl(text: string) {
  return `https://wa.me/${site.whatsappNumber}?text=${encodeURIComponent(text)}`;
}

export default function WhatsAppButton() {
  const [panelOpen, setPanelOpen] = useState(false);
  const [showQr, setShowQr] = useState(false);
  const panelRef = useRef<HTMLDivElement>(null);
  const buttonRef = useRef<HTMLButtonElement>(null);
  const panelId = useId();

  const chatUrl = buildWhatsAppUrl(whatsappWidget.welcomeMessage);
  const qrSrc = `https://api.qrserver.com/v1/create-qr-code/?size=200x200&margin=10&data=${encodeURIComponent(chatUrl)}`;

  const closePanel = useCallback(() => {
    setPanelOpen(false);
    setShowQr(false);
  }, []);

  useEffect(() => {
    if (!panelOpen) return;
    const onPointerDown = (event: MouseEvent) => {
      const target = event.target as Node;
      if (
        panelRef.current?.contains(target) ||
        buttonRef.current?.contains(target)
      ) {
        return;
      }
      closePanel();
    };
    const onKey = (event: KeyboardEvent) => {
      if (event.key === "Escape") closePanel();
    };
    document.addEventListener("mousedown", onPointerDown);
    document.addEventListener("keydown", onKey);
    return () => {
      document.removeEventListener("mousedown", onPointerDown);
      document.removeEventListener("keydown", onKey);
    };
  }, [panelOpen, closePanel]);

  return (
    <div className="fixed bottom-20 right-4 z-50 sm:bottom-7 sm:right-7">
      {panelOpen && (
        <div
          ref={panelRef}
          id={panelId}
          role="dialog"
          aria-label="Chat de WhatsApp"
          className="mb-3 w-[min(100vw-2rem,20rem)] overflow-hidden rounded-2xl border border-cream-200 bg-white shadow-soft"
        >
          <div className="flex items-center justify-between bg-[#128C7E] px-4 py-3 text-cream-50">
            <div className="flex items-center gap-2 text-sm font-medium">
              <span aria-hidden="true" className="text-lg">
                WhatsApp
              </span>
            </div>
            <button
              type="button"
              onClick={closePanel}
              className="rounded-full p-1 hover:bg-white/10"
              aria-label="Cerrar"
            >
              ×
            </button>
          </div>
          <div className="bg-ink-900 px-4 py-5">
            <p className="max-w-[85%] rounded-2xl rounded-bl-md bg-ink-700 px-4 py-3 text-sm leading-relaxed text-cream-50">
              {whatsappWidget.welcomeMessage}
            </p>
          </div>
          <div className="relative bg-cream-50 px-4 py-4">
            <a
              href={chatUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex w-full items-center justify-center gap-2 rounded-full bg-[#128C7E] px-4 py-2.5 text-sm font-medium text-cream-50 transition hover:bg-[#0f7569]"
              onClick={() => {
                trackWhatsAppClick("floating");
              }}
              onMouseEnter={() => setShowQr(true)}
              onMouseLeave={() => setShowQr(false)}
              onFocus={() => setShowQr(true)}
              onBlur={() => setShowQr(false)}
            >
              Abrir chat
              <span aria-hidden="true">↗</span>
            </a>
            {showQr && (
              <div
                className="absolute bottom-full right-0 mb-2 rounded-xl border border-cream-200 bg-white p-3 shadow-soft"
                role="tooltip"
              >
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src={qrSrc}
                  alt="Código QR para abrir WhatsApp"
                  width={160}
                  height={160}
                  className="h-40 w-40"
                />
                <p className="mt-2 text-center text-[10px] text-ink-500">
                  Escanea para chatear
                </p>
              </div>
            )}
          </div>
        </div>
      )}

      <button
        ref={buttonRef}
        type="button"
        onClick={() => setPanelOpen((open) => !open)}
        onMouseEnter={() => setPanelOpen(true)}
        aria-label="Abrir asistente de WhatsApp"
        aria-expanded={panelOpen}
        aria-controls={panelId}
        className="flex h-14 w-14 items-center justify-center rounded-full bg-[#25D366] text-white shadow-soft transition hover:scale-105 focus:outline-none focus:ring-2 focus:ring-[#25D366] focus:ring-offset-2 focus:ring-offset-cream-50"
      >
        <svg
          viewBox="0 0 32 32"
          className="h-7 w-7"
          aria-hidden="true"
          fill="currentColor"
        >
          <path d="M19.1 17.3c-.3-.1-1.7-.8-2-.9-.3-.1-.5-.2-.7.2-.2.3-.8.9-1 1.1-.2.2-.4.2-.7.1-.3-.1-1.2-.5-2.3-1.4-.9-.8-1.4-1.8-1.6-2.1-.2-.3 0-.5.1-.6.1-.1.3-.3.4-.5.1-.2.2-.3.3-.5.1-.2 0-.4 0-.5 0-.1-.6-1.6-.9-2.1-.2-.6-.5-.5-.6-.5h-.6c-.2 0-.5.1-.8.4-.3.3-1 1-1 2.5s1 2.9 1.2 3.1c.1.2 2 3 4.8 4.2.7.3 1.2.5 1.6.6.7.2 1.3.2 1.8.1.6-.1 1.7-.7 2-1.4.2-.7.2-1.3.2-1.4-.1-.2-.3-.2-.6-.3zM16 3C8.8 3 3 8.8 3 16c0 2.3.6 4.4 1.7 6.3L3 29l6.9-1.8c1.8 1 3.9 1.5 6.1 1.5 7.2 0 13-5.8 13-13S23.2 3 16 3zm0 23.6c-2 0-3.8-.5-5.4-1.5l-.4-.2-4.1 1.1 1.1-4-.3-.4C5.6 19.9 5 18 5 16 5 9.9 9.9 5 16 5s11 4.9 11 11-4.9 10.6-11 10.6z" />
        </svg>
      </button>
    </div>
  );
}
