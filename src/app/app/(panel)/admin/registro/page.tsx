import type { Metadata } from "next";

import { formatLima } from "~/components/app/format";
import { assertCan } from "~/server/app/domain/permissions";
import { auditLog } from "~/server/app/services";
import { requireActor } from "~/server/auth/session";

export const metadata: Metadata = {
  title: { absolute: "Registro de cambios · Área interna" },
  robots: { index: false, follow: false },
};

export default async function AuditPage() {
  const actor = await requireActor();
  assertCan(actor.roles, "audit.read");
  const entries = await auditLog.listRecent(200);

  return (
    <section>
      <h1 className="font-serif text-4xl uppercase">Registro de cambios</h1>
      <p className="mt-2 max-w-2xl text-ink-700">
        Quién hizo cada cambio, cuándo, y el antes y el después. No guarda contraseñas. El registro
        no se borra desde esta pantalla.
      </p>
      <div className="mt-6 overflow-x-auto rounded-3xl border border-cream-200 bg-white">
        <table className="min-w-full text-left text-sm">
          <thead className="text-xs uppercase tracking-wide text-gold-ink">
            <tr>
              <th className="px-4 py-3 font-normal">Cuándo</th>
              <th className="px-4 py-3 font-normal">Quién</th>
              <th className="px-4 py-3 font-normal">Qué hizo</th>
            </tr>
          </thead>
          <tbody>
            {entries.length === 0 ? (
              <tr>
                <td colSpan={3} className="px-4 py-8 text-ink-700">
                  Todavía no hay cambios. El primer acceso y cada alta, edición o desactivación
                  quedarán aquí.
                </td>
              </tr>
            ) : (
              entries.map((entry) => (
                <tr key={entry.id} className="border-t border-cream-100 align-top">
                  <td className="whitespace-nowrap px-4 py-3">{formatLima(entry.createdAt)}</td>
                  <td className="px-4 py-3">
                    {entry.actorName ?? "Sistema"}
                    {entry.actorEmail ? (
                      <span className="mt-1 block text-ink-500">{entry.actorEmail}</span>
                    ) : null}
                  </td>
                  <td className="px-4 py-3">
                    <p>{entry.summary}</p>
                    <details className="mt-2">
                      <summary className="cursor-pointer text-gold-ink">Antes y después</summary>
                      <div className="mt-2 grid gap-3 md:grid-cols-2">
                        <pre className="overflow-x-auto rounded-xl bg-cream-50 p-3 text-xs">
                          {pretty(entry.before)}
                        </pre>
                        <pre className="overflow-x-auto rounded-xl bg-cream-50 p-3 text-xs">
                          {pretty(entry.after)}
                        </pre>
                      </div>
                    </details>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </section>
  );
}

function pretty(value: unknown): string {
  if (value === null || value === undefined) return "—";
  return JSON.stringify(value, null, 2);
}
