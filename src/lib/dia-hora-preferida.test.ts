import { describe, expect, it } from "vitest";

import { formatDiaHoraPreferida, isDiaHoraPreferida } from "./dia-hora-preferida";

describe("día y hora preferida", () => {
  it("arma fecha y franja, y descarta lo que no es válido", () => {
    expect(formatDiaHoraPreferida("2026-11-20", "Tarde")).toBe(
      "20/11/2026 · Tarde",
    );
    expect(formatDiaHoraPreferida("2026-11-20", "")).toBe("20/11/2026");
    expect(formatDiaHoraPreferida("", "Mañana")).toBe("Mañana");
    expect(formatDiaHoraPreferida("2026-02-31", "Mañana")).toBe("Mañana");
    expect(formatDiaHoraPreferida("", "Noche")).toBe("");
  });

  it("acepta vacío, fecha, franja o las dos, y rechaza fechas imposibles", () => {
    expect(isDiaHoraPreferida("")).toBe(true);
    expect(isDiaHoraPreferida("20/11/2026 · Tarde")).toBe(true);
    expect(isDiaHoraPreferida("Mañana")).toBe(true);
    expect(isDiaHoraPreferida("31/02/2026")).toBe(false);
    expect(isDiaHoraPreferida("32/13/2026")).toBe(false);
    expect(isDiaHoraPreferida("mañana")).toBe(false);
    expect(isDiaHoraPreferida("20/11/2026 · Noche")).toBe(false);
  });
});
