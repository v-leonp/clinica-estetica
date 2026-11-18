import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";

import { createCaller } from "~/server/api/root";
import { signLeadWebhook } from "~/server/booking/notify-lead";

const fetchMock = vi.fn();
const SECRET = "secreto-de-prueba-1234";
const WEBHOOK = "https://script.google.com/macros/s/DEMO/exec";

const leadCreate = vi.fn();

function caller() {
  return createCaller({
    db: { lead: { create: leadCreate } } as never,
    headers: new Headers({ "user-agent": "vitest" }),
    ip: "127.0.0.1",
  });
}

function reservaInput(overrides: Record<string, unknown> = {}) {
  return {
    nombre: "Ana Ejemplo",
    email: "",
    telefono: "999000111",
    tratamiento: "Limpieza facial profunda",
    diaHoraPreferida: "20/11/2026 · Tarde",
    mensaje: "",
    acepto: true as const,
    website: "",
    startedAt: Date.now() - 10_000,
    origen: "reserva" as const,
    ...overrides,
  };
}

beforeEach(() => {
  leadCreate.mockReset();
  leadCreate.mockResolvedValue({
    id: "lead_demo",
    createdAt: new Date("2026-11-18T15:00:00.000Z"),
  });
  fetchMock.mockReset();
  fetchMock.mockRejectedValue(new Error("red caída"));
  vi.stubGlobal("fetch", fetchMock);
  vi.stubEnv("APPS_SCRIPT_WEBHOOK_URL", "");
  vi.stubEnv("APPS_SCRIPT_SECRET", "");
  vi.spyOn(console, "info").mockImplementation(() => {});
  vi.spyOn(console, "warn").mockImplementation(() => {});
  vi.spyOn(console, "error").mockImplementation(() => {});
});

afterEach(() => {
  vi.unstubAllEnvs();
  vi.unstubAllGlobals();
  vi.restoreAllMocks();
});

describe("createLead y el aviso", () => {
  it("guarda la preferencia y no falla si el webhook no está configurado", async () => {
    const result = await caller().contact.createLead(reservaInput());

    expect(result).toMatchObject({ ok: true, id: "lead_demo" });
    expect(leadCreate).toHaveBeenCalledWith(
      expect.objectContaining({
        data: expect.objectContaining({
          diaHoraPreferida: "20/11/2026 · Tarde",
          source: "reserva",
        }),
      }),
    );
    expect(fetchMock).not.toHaveBeenCalled();
    expect(console.info).toHaveBeenCalledWith(
      expect.stringContaining("APPS_SCRIPT_WEBHOOK_URL"),
    );
    expect(console.info).toHaveBeenCalledWith(
      expect.stringContaining("APPS_SCRIPT_SECRET"),
    );
  });

  it("no falla si el webhook responde mal, se corta o rechaza la firma", async () => {
    vi.stubEnv("APPS_SCRIPT_WEBHOOK_URL", WEBHOOK);
    vi.stubEnv("APPS_SCRIPT_SECRET", SECRET);

    fetchMock.mockRejectedValueOnce(new Error("red caída"));
    await expect(caller().contact.createLead(reservaInput())).resolves.toMatchObject({
      ok: true,
      id: "lead_demo",
    });

    fetchMock.mockResolvedValueOnce(
      new Response(JSON.stringify({ ok: false, error: "firma" }), { status: 200 }),
    );
    await expect(caller().contact.createLead(reservaInput())).resolves.toMatchObject({
      ok: true,
    });

    fetchMock.mockResolvedValueOnce(new Response("caído", { status: 500 }));
    await expect(caller().contact.createLead(reservaInput())).resolves.toMatchObject({
      ok: true,
    });

    const abort = new Error("The operation was aborted");
    abort.name = "AbortError";
    fetchMock.mockRejectedValueOnce(abort);
    await expect(caller().contact.createLead(reservaInput())).resolves.toMatchObject({
      ok: true,
    });

    const logged = vi.mocked(console.error).mock.calls.flat().join(" ");
    expect(logged).not.toContain(SECRET);
    expect(logged).toContain("quedó guardada");
  });

  it("firma el cuerpo exacto cuando el webhook está configurado", async () => {
    vi.stubEnv("APPS_SCRIPT_WEBHOOK_URL", WEBHOOK);
    vi.stubEnv("APPS_SCRIPT_SECRET", SECRET);
    fetchMock.mockResolvedValueOnce(
      new Response(JSON.stringify({ ok: true }), { status: 200 }),
    );

    await caller().contact.createLead(reservaInput());

    expect(fetchMock).toHaveBeenCalledOnce();
    const [rawUrl, init] = fetchMock.mock.calls[0] as [string, RequestInit];
    const url = new URL(rawUrl);
    const body = String(init.body);
    const timestamp = url.searchParams.get("timestamp") ?? "";
    const signature = url.searchParams.get("signature");

    expect(url.origin + url.pathname).toBe(WEBHOOK);
    expect(signature).toBe(signLeadWebhook(SECRET, timestamp, body));
    expect(JSON.parse(body)).toMatchObject({
      id: "lead_demo",
      nombre: "Ana Ejemplo",
      celular: "999000111",
      tratamiento: "Limpieza facial profunda",
      diaHoraPreferida: "20/11/2026 · Tarde",
      origen: "Reserva",
    });
    expect(body).not.toContain("@");
    const headers = init.headers as Record<string, string>;
    expect(headers["x-vme-timestamp"]).toBe(timestamp);
    expect(headers["x-vme-signature"]).toBe(signature);
  });

  it("no avisa ni guarda si la preferencia es inválida o es un honeypot", async () => {
    vi.stubEnv("APPS_SCRIPT_WEBHOOK_URL", WEBHOOK);
    vi.stubEnv("APPS_SCRIPT_SECRET", SECRET);

    await expect(
      caller().contact.createLead(reservaInput({ diaHoraPreferida: "32/13/2026" })),
    ).rejects.toThrow();

    await caller().contact.createLead(reservaInput({ website: "https://spam.example" }));

    expect(leadCreate).not.toHaveBeenCalled();
    expect(fetchMock).not.toHaveBeenCalled();
  });
});
