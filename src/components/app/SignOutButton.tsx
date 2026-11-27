"use client";

import { useState } from "react";

import { authClient } from "~/lib/auth-client";

export default function SignOutButton() {
  const [pending, setPending] = useState(false);

  return (
    <button
      type="button"
      className="mt-2 text-sm text-gold-ink underline-offset-4 hover:underline disabled:opacity-60"
      disabled={pending}
      onClick={() => {
        setPending(true);
        void authClient.signOut().finally(() => {
          window.location.href = "/app/login";
        });
      }}
    >
      Cerrar sesión
    </button>
  );
}
