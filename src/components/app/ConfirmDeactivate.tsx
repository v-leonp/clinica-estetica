"use client";

import { useState } from "react";

export default function ConfirmDeactivate({
  action,
  id,
  title,
  description,
  trigger,
  disabled = false,
  disabledReason,
}: {
  action: (formData: FormData) => Promise<void>;
  id: string;
  title: string;
  description: string;
  trigger: string;
  disabled?: boolean;
  disabledReason?: string;
}) {
  const [open, setOpen] = useState(false);

  if (disabled) {
    return (
      <button
        type="button"
        disabled
        title={disabledReason}
        className="btn-outline cursor-not-allowed opacity-50"
      >
        {trigger}
      </button>
    );
  }

  return (
    <>
      <button type="button" className="btn-outline" onClick={() => setOpen(true)}>
        {trigger}
      </button>
      {open ? (
        <div
          className="fixed inset-0 z-50 flex items-end justify-center bg-ink-900/40 px-4 py-6 sm:items-center"
          role="alertdialog"
          aria-modal="true"
          aria-labelledby="confirm-title"
          aria-describedby="confirm-body"
        >
          <div className="w-full max-w-md rounded-2xl border border-cream-200 bg-cream-50 p-6 shadow-soft">
            <h2 id="confirm-title" className="font-serif text-2xl uppercase">
              {title}
            </h2>
            <p id="confirm-body" className="mt-3 leading-relaxed text-ink-700">
              {description}
            </p>
            <form action={action} className="mt-6 flex flex-wrap gap-3">
              <input type="hidden" name="id" value={id} />
              <input type="hidden" name="confirm" value="true" />
              <button className="btn-primary" type="submit">
                Sí, desactivar
              </button>
              <button className="btn-outline" type="button" onClick={() => setOpen(false)}>
                Cancelar
              </button>
            </form>
          </div>
        </div>
      ) : null}
    </>
  );
}
