import type { EstadoCita as EstadoPrisma } from "../../../generated/prisma";
import { describe, expect, it } from "vitest";

import {
  Agenda,
  DRA_MELISSA_VIGO,
  etiquetaEstado,
  filaDesdeRegla,
  formatearLima,
  desdeLimaLocal,
  reglaDesdeFila,
  seSolapan,
  slotsLibres,
  solicitarCita,
  transicionarCita,
  ventanasDesdeReglas,
  ZONA_LIMA,
  type Actor,
  type Cita,
  type EstadoCita,
  type Intervalo,
  type ReglaDisponibilidad,
  type Resultado,
  type SolicitudCita,
  type Ventana,
} from "./index";

/**
 * Aceptación de S1-04, S1-05 y S1-06.
 *
 * GWT-1  Una cita nueva nace en Solicitada.
 * GWT-2  Un admin recorre Solicitada → Confirmada → Atendida y cada paso
 *        agrega historial (usuario, antes, después, America/Lima) sin
 *        reescribir el paso anterior.
 * GWT-3  Cancelada y No asistió son salidas válidas para un admin.
 * GWT-4  Una salida fuera del grafo responde TRANSICION_INVALIDA y no cambia la cita.
 * GWT-5  Sin rol ADMIN la cita no cambia.
 * GWT-6  Los slots de la Dra. Melissa no incluyen el pasado ni se solapan;
 *        una Confirmada no está libre; de varias confirmaciones simultáneas
 *        queda una sola.
 */

const ADMIN: Actor = { id: "usuario-admin", rol: "ADMIN" };
const MELISSA = "melissa-vigo";

const REGLA_LUNES: ReglaDisponibilidad = {
  profesionalId: MELISSA,
  sedeId: null,
  diaSemana: 1,
  horaInicio: "09:00",
  horaFin: "12:00",
};

function debe<T>(resultado: Resultado<T>): T {
  if (!resultado.ok) throw new Error(resultado.codigo);
  return resultado.valor;
}

function solicitud(parcial: Partial<SolicitudCita> = {}): SolicitudCita {
  return {
    id: "cita-1",
    pacienteId: "paciente-1",
    profesionalId: MELISSA,
    servicioId: "consulta",
    sedeId: null,
    inicio: desdeLimaLocal("2026-11-09", "09:00"),
    fin: desdeLimaLocal("2026-11-09", "10:00"),
    ...parcial,
  };
}

function citaEn(estado: EstadoCita): Cita {
  const ahora = desdeLimaLocal("2026-11-09", "08:00");
  const base = debe(solicitarCita(solicitud(), ahora));
  if (estado === "Solicitada") return base;
  if (estado === "Cancelada") return debe(transicionarCita(base, "Cancelada", ADMIN, ahora));
  const confirmada = debe(transicionarCita(base, "Confirmada", ADMIN, ahora));
  if (estado === "Confirmada") return confirmada;
  return debe(transicionarCita(confirmada, estado, ADMIN, ahora));
}

function ventanasDelLunes(): Ventana[] {
  return ventanasDesdeReglas(
    [REGLA_LUNES],
    desdeLimaLocal("2026-11-09", "00:00"),
    desdeLimaLocal("2026-11-10", "00:00"),
  );
}

function horaLima(fecha: Date): string {
  return formatearLima(fecha).slice(11, 16);
}

function ida(estado: EstadoCita): EstadoPrisma {
  return estado;
}

function vuelta(estado: EstadoPrisma): EstadoCita {
  return estado;
}

describe("S1-04 modelos y dominio", () => {
  it("alinea el enum de Prisma con el estado del dominio", () => {
    expect(ida("Solicitada")).toBe("Solicitada");
    expect(vuelta("NoAsistio")).toBe("NoAsistio");
    expect(etiquetaEstado("NoAsistio")).toBe("No asistió");
  });

  it("traduce la fila de disponibilidad a horario de Lima y de vuelta", () => {
    expect(filaDesdeRegla(REGLA_LUNES)).toEqual({
      profesionalId: MELISSA,
      sedeId: null,
      diaSemana: 1,
      inicioMinuto: 9 * 60,
      finMinuto: 12 * 60,
    });
    expect(reglaDesdeFila(filaDesdeRegla(REGLA_LUNES))).toEqual(REGLA_LUNES);
  });

  it("identifica a la Dra. Melissa sin sede ni contacto", () => {
    expect(DRA_MELISSA_VIGO).toEqual({
      nombre: "Dra. Melissa Vigo",
      cmp: "101245",
      especialidad: "Medicina estética",
    });
  });
});

describe("GWT-1 solicitud por defecto", () => {
  const ahora = desdeLimaLocal("2026-11-09", "08:00");

  it("crea la cita en Solicitada, con sede vacía e historial vacío", () => {
    const cita = debe(solicitarCita(solicitud(), ahora));

    expect(cita.estado).toBe("Solicitada");
    expect(cita.sedeId).toBeNull();
    expect(cita.historial).toEqual([]);
    expect(cita.profesionalId).toBe(MELISSA);
  });

  it("rechaza un intervalo que no avanza", () => {
    const inicio = desdeLimaLocal("2026-11-09", "09:00");
    const resultado = solicitarCita(solicitud({ inicio, fin: inicio }), ahora);

    expect(resultado).toEqual({ ok: false, codigo: "INTERVALO_INVALIDO" });
  });
});

describe("GWT-2 Solicitada → Confirmada → Atendida", () => {
  it("registra cada paso sin reescribir el anterior, en hora de Lima", () => {
    const ahora = new Date("2026-11-09T15:00:00.000Z");
    const luego = new Date("2026-11-09T15:01:00.000Z");
    const cita = debe(solicitarCita(solicitud(), desdeLimaLocal("2026-11-09", "08:00")));

    const confirmada = debe(transicionarCita(cita, "Confirmada", ADMIN, ahora));
    const primera = confirmada.historial[0];
    expect(primera).toBeDefined();
    if (!primera) return;

    expect(confirmada.estado).toBe("Confirmada");
    expect(confirmada.historial).toHaveLength(1);
    expect(primera.usuarioId).toBe(ADMIN.id);
    expect(primera.rol).toBe("ADMIN");
    expect(primera.antes).toBe("Solicitada");
    expect(primera.despues).toBe("Confirmada");
    expect(primera.zonaHoraria).toBe(ZONA_LIMA);
    expect(primera.ocurridoEn.toISOString()).toBe("2026-11-09T15:00:00.000Z");
    expect(primera.ocurridoEnLima).toBe("2026-11-09T10:00:00-05:00");

    const atendida = debe(transicionarCita(confirmada, "Atendida", ADMIN, luego));
    expect(atendida.estado).toBe("Atendida");
    expect(atendida.historial).toHaveLength(2);
    expect(atendida.historial[0]).toEqual(primera);
    expect(atendida.historial[1]).toMatchObject({
      usuarioId: ADMIN.id,
      antes: "Confirmada",
      despues: "Atendida",
      zonaHoraria: ZONA_LIMA,
      ocurridoEnLima: "2026-11-09T10:01:00-05:00",
    });
    expect(cita.estado).toBe("Solicitada");
    expect(cita.historial).toHaveLength(0);
    expect(Object.isFrozen(atendida.historial)).toBe(true);
    expect(() => {
      (atendida.historial as unknown as EntradaMutable[]).push(primera);
    }).toThrow(TypeError);

    expect(formatearLima(new Date("2026-06-15T15:00:00.000Z"))).toBe("2026-06-15T10:00:00-05:00");
    expect(formatearLima(new Date("2026-12-15T15:00:00.000Z"))).toBe("2026-12-15T10:00:00-05:00");
    expect(formatearLima(new Date("2026-11-10T05:00:00.000Z"))).toBe("2026-11-10T00:00:00-05:00");
  });
});

type EntradaMutable = { id: string };

describe("GWT-3 Cancelada y No asistió", () => {
  const ahora = desdeLimaLocal("2026-11-09", "08:30");

  it("cancela una solicitud", () => {
    const cita = citaEn("Solicitada");
    const cancelada = debe(transicionarCita(cita, "Cancelada", ADMIN, ahora));

    expect(cancelada.estado).toBe("Cancelada");
    expect(cancelada.historial.at(-1)).toMatchObject({
      usuarioId: ADMIN.id,
      antes: "Solicitada",
      despues: "Cancelada",
      zonaHoraria: ZONA_LIMA,
    });
  });

  it("cancela una cita confirmada", () => {
    const cancelada = debe(transicionarCita(citaEn("Confirmada"), "Cancelada", ADMIN, ahora));

    expect(cancelada.estado).toBe("Cancelada");
    expect(cancelada.historial.at(-1)).toMatchObject({
      antes: "Confirmada",
      despues: "Cancelada",
    });
  });

  it("marca No asistió solo desde una cita confirmada", () => {
    const inasistencia = debe(transicionarCita(citaEn("Confirmada"), "NoAsistio", ADMIN, ahora));

    expect(inasistencia.estado).toBe("NoAsistio");
    expect(etiquetaEstado(inasistencia.estado)).toBe("No asistió");
    expect(inasistencia.historial.at(-1)).toMatchObject({
      usuarioId: ADMIN.id,
      antes: "Confirmada",
      despues: "NoAsistio",
      ocurridoEnLima: formatearLima(ahora),
    });
  });
});

describe("GWT-4 transición inválida", () => {
  const ahora = desdeLimaLocal("2026-11-09", "08:30");
  const invalidas: Array<[EstadoCita, EstadoCita]> = [
    ["Solicitada", "Atendida"],
    ["Solicitada", "NoAsistio"],
    ["Solicitada", "Solicitada"],
    ["Confirmada", "Solicitada"],
    ["Atendida", "Cancelada"],
    ["Atendida", "Confirmada"],
    ["Cancelada", "Confirmada"],
    ["Cancelada", "Solicitada"],
    ["NoAsistio", "Atendida"],
    ["NoAsistio", "Cancelada"],
  ];

  it.each(invalidas)("de %s a %s responde TRANSICION_INVALIDA y conserva la cita", (desde, hacia) => {
    const cita = citaEn(desde);
    const foto = structuredClone(cita);
    const resultado = transicionarCita(cita, hacia, ADMIN, ahora);

    expect(resultado).toEqual({ ok: false, codigo: "TRANSICION_INVALIDA" });
    expect(cita.estado).toBe(foto.estado);
    expect(cita.historial).toEqual(foto.historial);
  });
});

describe("GWT-5 sin admin no cambia", () => {
  const ahora = desdeLimaLocal("2026-11-09", "08:30");
  const actores: Actor[] = [
    { id: "paciente-1", rol: "PACIENTE" },
    { id: "melissa-vigo", rol: "PROFESIONAL" },
    { id: "   ", rol: "ADMIN" },
  ];

  it.each(actores)("el actor $rol $id no confirma ni cancela", async (actor) => {
    const cita = citaEn("Solicitada");
    const foto = structuredClone(cita);

    expect(transicionarCita(cita, "Confirmada", actor, ahora)).toEqual({
      ok: false,
      codigo: "REQUIERE_ADMIN",
    });
    expect(transicionarCita(cita, "Cancelada", actor, ahora)).toEqual({
      ok: false,
      codigo: "REQUIERE_ADMIN",
    });
    expect(cita).toEqual(foto);

    const agenda = new Agenda([cita]);
    const enAgenda = await agenda.confirmar(cita.id, actor, ahora);
    expect(enAgenda).toEqual({ ok: false, codigo: "REQUIERE_ADMIN" });
    expect(agenda.listar()[0]?.estado).toBe("Solicitada");
    expect(agenda.listar()[0]?.historial).toHaveLength(0);
  });

  it("prioriza el permiso aunque el slot ya esté ocupado", async () => {
    const ocupada = citaEn("Confirmada");
    const pendiente = debe(
      solicitarCita(
        solicitud({ id: "pendiente", pacienteId: "paciente-2" }),
        desdeLimaLocal("2026-11-09", "08:00"),
      ),
    );
    const agenda = new Agenda([ocupada, pendiente]);
    const resultado = await agenda.confirmar(pendiente.id, { id: "paciente-2", rol: "PACIENTE" }, ahora);

    expect(resultado).toEqual({ ok: false, codigo: "REQUIERE_ADMIN" });
    expect(agenda.listar().find((cita) => cita.id === "pendiente")?.estado).toBe("Solicitada");
  });
});

describe("GWT-6 slots de la Dra. Melissa", () => {
  const ahora = desdeLimaLocal("2026-11-09", "08:00");
  const ventanas = ventanasDelLunes();

  it("ofrece bloques contiguos, futuros y sin solape", () => {
    expect(ventanas).toHaveLength(1);
    expect(horaLima(ventanas[0]!.inicio)).toBe("09:00");
    expect(horaLima(ventanas[0]!.fin)).toBe("12:00");

    const slots = slotsLibres({
      profesionalId: MELISSA,
      ventanas,
      citas: [],
      duracionMinutos: 60,
      ahora,
    });

    expect(slots.map((slot) => horaLima(slot.inicio))).toEqual(["09:00", "10:00", "11:00"]);
    expect(slots.every((slot) => slot.inicio.getTime() >= ahora.getTime())).toBe(true);
    expect(sinSolapes(slots)).toBe(true);
    expect(slots[0]!.fin.getTime()).toBe(slots[1]!.inicio.getTime());
    expect(seSolapan(slots[0]!, slots[1]!)).toBe(false);
  });

  it("deja fuera el tramo que ya empezó", () => {
    const mediaManana = desdeLimaLocal("2026-11-09", "10:15");
    const slots = slotsLibres({
      profesionalId: MELISSA,
      ventanas,
      citas: [],
      duracionMinutos: 60,
      ahora: mediaManana,
    });

    expect(slots.map((slot) => horaLima(slot.inicio))).toEqual(["11:00"]);
  });

  it("una cita Confirmada no está libre; una Solicitada o Cancelada sí", () => {
    const solicitada = citaEn("Solicitada");
    const conSolicitud = slotsLibres({
      profesionalId: MELISSA,
      ventanas,
      citas: [solicitada],
      duracionMinutos: 60,
      ahora,
    });
    expect(conSolicitud.map((slot) => horaLima(slot.inicio))).toEqual(["09:00", "10:00", "11:00"]);

    const confirmada = citaEn("Confirmada");
    const conConfirmada = slotsLibres({
      profesionalId: MELISSA,
      ventanas,
      citas: [confirmada],
      duracionMinutos: 60,
      ahora,
    });
    expect(conConfirmada.map((slot) => horaLima(slot.inicio))).toEqual(["10:00", "11:00"]);

    const cancelada = citaEn("Cancelada");
    const conCancelada = slotsLibres({
      profesionalId: MELISSA,
      ventanas,
      citas: [cancelada],
      duracionMinutos: 60,
      ahora,
    });
    expect(conCancelada).toHaveLength(3);
  });

  it("un cruce parcial de una Atendida también retira los slots tocados", () => {
    const atendida: Cita = {
      ...citaEn("Atendida"),
      inicio: desdeLimaLocal("2026-11-09", "09:30"),
      fin: desdeLimaLocal("2026-11-09", "10:30"),
    };
    const slots = slotsLibres({
      profesionalId: MELISSA,
      ventanas,
      citas: [atendida],
      duracionMinutos: 60,
      ahora,
    });

    expect(slots.map((slot) => horaLima(slot.inicio))).toEqual(["11:00"]);
  });

  it("no mezcla el calendario de otra profesional ni duplica ventanas solapadas", () => {
    const ajena = debe(
      transicionarCita(
        debe(
          solicitarCita(
            solicitud({ id: "ajena", profesionalId: "otra-profesional" }),
            ahora,
          ),
        ),
        "Confirmada",
        ADMIN,
        ahora,
      ),
    );
    const slots = slotsLibres({
      profesionalId: MELISSA,
      ventanas,
      citas: [ajena],
      duracionMinutos: 60,
      ahora,
    });
    expect(slots).toHaveLength(3);

    const solapadas = ventanasDesdeReglas(
      [
        REGLA_LUNES,
        { ...REGLA_LUNES, horaInicio: "10:00", horaFin: "13:00" },
      ],
      desdeLimaLocal("2026-11-09", "00:00"),
      desdeLimaLocal("2026-11-10", "00:00"),
    );
    const fusionados = slotsLibres({
      profesionalId: MELISSA,
      ventanas: solapadas,
      citas: [],
      duracionMinutos: 60,
      ahora,
    });
    expect(fusionados.map((slot) => horaLima(slot.inicio))).toEqual([
      "09:00",
      "10:00",
      "11:00",
      "12:00",
    ]);
    expect(sinSolapes(fusionados)).toBe(true);

    const martes = ventanasDesdeReglas(
      [{ ...REGLA_LUNES, diaSemana: 2 }],
      desdeLimaLocal("2026-11-09", "00:00"),
      desdeLimaLocal("2026-11-10", "00:00"),
    );
    expect(martes).toEqual([]);
  });

  it("de varias confirmaciones simultáneas del mismo horario queda una", async () => {
    const agenda = new Agenda();
    const ids = ["a", "b", "c", "d", "e"];
    for (const id of ids) {
      const creada = debe(
        await agenda.solicitar(
          solicitud({ id, pacienteId: `paciente-${id}` }),
          ventanas,
          ahora,
        ),
      );
      expect(creada.estado).toBe("Solicitada");
    }

    const resultados = await Promise.all(
      ids.map((id) => agenda.confirmar(id, ADMIN, ahora)),
    );
    const ganadores = resultados.filter((resultado) => resultado.ok);
    const rechazadas = resultados.filter((resultado) => !resultado.ok);

    expect(ganadores).toHaveLength(1);
    expect(rechazadas.map((resultado) => resultado.codigo)).toEqual([
      "SLOT_OCUPADO",
      "SLOT_OCUPADO",
      "SLOT_OCUPADO",
      "SLOT_OCUPADO",
    ]);

    const guardadas = agenda.listar();
    const confirmadas = guardadas.filter((cita) => cita.estado === "Confirmada");
    const solicitudes = guardadas.filter((cita) => cita.estado === "Solicitada");
    expect(confirmadas).toHaveLength(1);
    expect(solicitudes).toHaveLength(4);
    expect(confirmadas[0]?.historial).toHaveLength(1);
    expect(confirmadas[0]?.historial[0]).toMatchObject({
      usuarioId: ADMIN.id,
      antes: "Solicitada",
      despues: "Confirmada",
      zonaHoraria: ZONA_LIMA,
      ocurridoEnLima: formatearLima(ahora),
    });
    expect(solicitudes.every((cita) => cita.historial.length === 0)).toBe(true);

    const libres = slotsLibres({
      profesionalId: MELISSA,
      ventanas,
      citas: guardadas,
      duracionMinutos: 60,
      ahora,
    });
    expect(libres.map((slot) => horaLima(slot.inicio))).toEqual(["10:00", "11:00"]);
  });

  it("al cancelar la confirmación el slot vuelve a ofrecerse", async () => {
    const agenda = new Agenda();
    await agenda.solicitar(solicitud(), ventanas, ahora);
    await agenda.confirmar("cita-1", ADMIN, ahora);
    await agenda.transicionar("cita-1", "Cancelada", ADMIN, ahora);

    const libres = slotsLibres({
      profesionalId: MELISSA,
      ventanas,
      citas: agenda.listar(),
      duracionMinutos: 60,
      ahora,
    });
    expect(libres.map((slot) => horaLima(slot.inicio))).toEqual(["09:00", "10:00", "11:00"]);
  });

  it("no abre una solicitud en el pasado, fuera de horario o sobre una cita ocupada", async () => {
    const agenda = new Agenda();
    const pasado = await agenda.solicitar(
      solicitud({
        id: "pasada",
        inicio: desdeLimaLocal("2026-11-09", "07:00"),
        fin: desdeLimaLocal("2026-11-09", "08:00"),
      }),
      ventanas,
      ahora,
    );
    expect(pasado).toEqual({ ok: false, codigo: "SLOT_EN_EL_PASADO" });

    const fuera = await agenda.solicitar(
      solicitud({
        id: "fuera",
        inicio: desdeLimaLocal("2026-11-09", "12:00"),
        fin: desdeLimaLocal("2026-11-09", "13:00"),
      }),
      ventanas,
      ahora,
    );
    expect(fuera).toEqual({ ok: false, codigo: "FUERA_DE_DISPONIBILIDAD" });

    await agenda.solicitar(solicitud(), ventanas, ahora);
    await agenda.confirmar("cita-1", ADMIN, ahora);
    const encima = await agenda.solicitar(
      solicitud({ id: "encima", pacienteId: "paciente-2" }),
      ventanas,
      ahora,
    );
    expect(encima).toEqual({ ok: false, codigo: "SLOT_OCUPADO" });
    expect(agenda.listar().map((cita) => cita.id)).toEqual(["cita-1"]);
  });
});

function sinSolapes(slots: readonly Intervalo[]): boolean {
  return slots.every((slot, indice) =>
    slots.every((otro, otroIndice) => otroIndice === indice || !seSolapan(slot, otro)),
  );
}
