import {
  congelarCita,
  ocupaCalendario,
  solicitarCita,
  transicionarCita,
  type Actor,
  type Cita,
  type EstadoCita,
  type Resultado,
  type SolicitudCita,
} from "./cita";
import { seSolapan, type Ventana } from "./slots";

/**
 * Calendario en memoria de un proceso.
 * Las confirmaciones entran en serie: de dos intentos sobre el mismo horario
 * solo el primero queda en Confirmada.
 * En Postgres la misma regla la sostiene la exclusión `Cita_sin_solape_ocupada`.
 */
export class Agenda {
  private citas: Cita[];
  private cola: Promise<void> = Promise.resolve();

  constructor(citas: readonly Cita[] = []) {
    this.citas = citas.map((cita) => congelarCita(cita));
  }

  listar(): readonly Cita[] {
    return this.citas.map((cita) => congelarCita(cita));
  }

  async solicitar(
    input: SolicitudCita,
    ventanas: readonly Ventana[],
    ahora: Date,
  ): Promise<Resultado<Cita>> {
    return this.exclusivo(() => {
      const creada = solicitarCita(input, ahora);
      if (!creada.ok) return creada;
      if (!cabeEnVentana(creada.valor, ventanas)) {
        return { ok: false, codigo: "FUERA_DE_DISPONIBILIDAD" };
      }
      if (this.chocaConOcupada(creada.valor)) {
        return { ok: false, codigo: "SLOT_OCUPADO" };
      }
      this.citas.push(creada.valor);
      return creada;
    });
  }

  /**
   * Aplica una transición. Confirmar además exige que ninguna cita
   * Confirmada o Atendida del mismo profesional se cruce con el intervalo.
   * La lectura del calendario y la escritura van separadas por un turno:
   * la cola de `exclusivo` es lo que impide que dos confirmaciones crean,
   * las dos, que el horario sigue libre.
   */
  async transicionar(
    citaId: string,
    destino: EstadoCita,
    actor: Actor,
    ahora: Date,
  ): Promise<Resultado<Cita>> {
    return this.exclusivo(async () => {
      const indice = this.citas.findIndex((cita) => cita.id === citaId);
      if (indice < 0) return { ok: false, codigo: "CITA_NO_ENCONTRADA" };
      const actual = this.citas[indice];
      if (!actual) return { ok: false, codigo: "CITA_NO_ENCONTRADA" };
      const cambiada = transicionarCita(actual, destino, actor, ahora);
      if (!cambiada.ok) return cambiada;
      const slotOcupado =
        destino === "Confirmada" && this.chocaConOcupada(cambiada.valor, citaId);
      await Promise.resolve();
      if (slotOcupado) return { ok: false, codigo: "SLOT_OCUPADO" };
      this.citas[indice] = cambiada.valor;
      return cambiada;
    });
  }

  async confirmar(citaId: string, actor: Actor, ahora: Date): Promise<Resultado<Cita>> {
    return this.transicionar(citaId, "Confirmada", actor, ahora);
  }

  private chocaConOcupada(candidata: Cita, ignorarId?: string): boolean {
    return this.citas.some(
      (otra) =>
        otra.id !== ignorarId &&
        otra.profesionalId === candidata.profesionalId &&
        ocupaCalendario(otra.estado) &&
        seSolapan(otra, candidata),
    );
  }

  private exclusivo<T>(fn: () => Promise<T> | T): Promise<T> {
    const resultado = this.cola.then(fn);
    this.cola = resultado.then(
      () => undefined,
      () => undefined,
    );
    return resultado;
  }
}

function cabeEnVentana(cita: Cita, ventanas: readonly Ventana[]): boolean {
  return ventanas.some(
    (ventana) =>
      ventana.profesionalId === cita.profesionalId &&
      ventana.inicio.getTime() <= cita.inicio.getTime() &&
      cita.fin.getTime() <= ventana.fin.getTime(),
  );
}
