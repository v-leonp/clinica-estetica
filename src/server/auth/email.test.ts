import { describe, expect, it } from "vitest";

import { decideDelivery } from "./email-delivery";

describe("envío de enlaces de acceso", () => {
  it("usa Resend solo cuando hay API key y remitente", () => {
    expect(decideDelivery({ apiKey: "re_test", from: "acceso@vigomedicalestetic.com" })).toBe(
      "email",
    );
  });

  it("si falta la API key no falla: el enlace se registra en el servidor", () => {
    expect(decideDelivery({ from: "acceso@vigomedicalestetic.com" })).toBe("log");
    expect(decideDelivery({ apiKey: "re_test" })).toBe("log");
    expect(decideDelivery({})).toBe("log");
  });
});
