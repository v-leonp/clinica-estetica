-- CreateEnum
CREATE TYPE "EstadoCita" AS ENUM ('Solicitada', 'Confirmada', 'Atendida', 'Cancelada', 'NoAsistio');

-- CreateTable
CREATE TABLE "Paciente" (
    "id" TEXT NOT NULL,
    "nombre" TEXT NOT NULL,
    "email" TEXT,
    "telefono" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Paciente_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Profesional" (
    "id" TEXT NOT NULL,
    "nombre" TEXT NOT NULL,
    "cmp" TEXT,
    "activo" BOOLEAN NOT NULL DEFAULT true,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Profesional_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Servicio" (
    "id" TEXT NOT NULL,
    "slug" TEXT NOT NULL,
    "nombre" TEXT NOT NULL,
    "duracionMinutos" INTEGER NOT NULL,
    "precioCentavos" INTEGER,
    "activo" BOOLEAN NOT NULL DEFAULT true,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Servicio_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Sede" (
    "id" TEXT NOT NULL,
    "nombre" TEXT NOT NULL,
    "direccion" TEXT,
    "activa" BOOLEAN NOT NULL DEFAULT false,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Sede_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Disponibilidad" (
    "id" TEXT NOT NULL,
    "profesionalId" TEXT NOT NULL,
    "sedeId" TEXT,
    "diaSemana" INTEGER NOT NULL,
    "inicioMinuto" INTEGER NOT NULL,
    "finMinuto" INTEGER NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Disponibilidad_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Cita" (
    "id" TEXT NOT NULL,
    "pacienteId" TEXT NOT NULL,
    "profesionalId" TEXT NOT NULL,
    "servicioId" TEXT NOT NULL,
    "sedeId" TEXT,
    "inicio" TIMESTAMP(3) NOT NULL,
    "fin" TIMESTAMP(3) NOT NULL,
    "estado" "EstadoCita" NOT NULL DEFAULT 'Solicitada',
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Cita_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "HistorialCita" (
    "id" TEXT NOT NULL,
    "citaId" TEXT NOT NULL,
    "usuarioId" TEXT NOT NULL,
    "rol" TEXT NOT NULL,
    "estadoAntes" "EstadoCita" NOT NULL,
    "estadoDespues" "EstadoCita" NOT NULL,
    "ocurridoEn" TIMESTAMP(3) NOT NULL,
    "zonaHoraria" TEXT NOT NULL DEFAULT 'America/Lima',

    CONSTRAINT "HistorialCita_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE INDEX "Paciente_email_idx" ON "Paciente"("email");

-- CreateIndex
CREATE UNIQUE INDEX "Profesional_cmp_key" ON "Profesional"("cmp");

-- CreateIndex
CREATE UNIQUE INDEX "Servicio_slug_key" ON "Servicio"("slug");

-- CreateIndex
CREATE INDEX "Disponibilidad_profesionalId_diaSemana_idx" ON "Disponibilidad"("profesionalId", "diaSemana");

-- CreateIndex
CREATE INDEX "Cita_profesionalId_inicio_idx" ON "Cita"("profesionalId", "inicio");

-- CreateIndex
CREATE INDEX "Cita_pacienteId_idx" ON "Cita"("pacienteId");

-- CreateIndex
CREATE INDEX "Cita_estado_idx" ON "Cita"("estado");

-- CreateIndex
CREATE INDEX "HistorialCita_citaId_ocurridoEn_idx" ON "HistorialCita"("citaId", "ocurridoEn");

-- AddForeignKey
ALTER TABLE "Disponibilidad" ADD CONSTRAINT "Disponibilidad_profesionalId_fkey" FOREIGN KEY ("profesionalId") REFERENCES "Profesional"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Disponibilidad" ADD CONSTRAINT "Disponibilidad_sedeId_fkey" FOREIGN KEY ("sedeId") REFERENCES "Sede"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Cita" ADD CONSTRAINT "Cita_pacienteId_fkey" FOREIGN KEY ("pacienteId") REFERENCES "Paciente"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Cita" ADD CONSTRAINT "Cita_profesionalId_fkey" FOREIGN KEY ("profesionalId") REFERENCES "Profesional"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Cita" ADD CONSTRAINT "Cita_servicioId_fkey" FOREIGN KEY ("servicioId") REFERENCES "Servicio"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Cita" ADD CONSTRAINT "Cita_sedeId_fkey" FOREIGN KEY ("sedeId") REFERENCES "Sede"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "HistorialCita" ADD CONSTRAINT "HistorialCita_citaId_fkey" FOREIGN KEY ("citaId") REFERENCES "Cita"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- Reglas que el cliente de Prisma no expresa.
ALTER TABLE "Disponibilidad" ADD CONSTRAINT "Disponibilidad_dia_valido" CHECK ("diaSemana" BETWEEN 1 AND 7);
ALTER TABLE "Disponibilidad" ADD CONSTRAINT "Disponibilidad_tramo_valido" CHECK ("inicioMinuto" >= 0 AND "finMinuto" <= 1440 AND "inicioMinuto" < "finMinuto");
ALTER TABLE "Servicio" ADD CONSTRAINT "Servicio_duracion_positiva" CHECK ("duracionMinutos" > 0);
ALTER TABLE "Servicio" ADD CONSTRAINT "Servicio_precio_no_negativo" CHECK ("precioCentavos" IS NULL OR "precioCentavos" >= 0);
ALTER TABLE "Cita" ADD CONSTRAINT "Cita_fin_posterior_inicio" CHECK ("fin" > "inicio");
ALTER TABLE "HistorialCita" ADD CONSTRAINT "HistorialCita_zona_lima" CHECK ("zonaHoraria" = 'America/Lima');

-- Una sola cita Confirmada o Atendida por profesional en el mismo intervalo.
-- Solicitada, Cancelada y NoAsistio no ocupan el calendario.
CREATE EXTENSION IF NOT EXISTS btree_gist;

ALTER TABLE "Cita" ADD CONSTRAINT "Cita_sin_solape_ocupada"
EXCLUDE USING gist (
    "profesionalId" WITH =,
    tsrange("inicio", "fin", '[)') WITH &&
)
WHERE ("estado" IN ('Confirmada'::"EstadoCita", 'Atendida'::"EstadoCita"));

-- HistorialCita es append-only también en la base.
CREATE OR REPLACE FUNCTION "historial_cita_append_only"()
RETURNS trigger
LANGUAGE plpgsql
AS $$
BEGIN
    RAISE EXCEPTION 'HISTORIAL_APPEND_ONLY';
END;
$$;

CREATE TRIGGER "HistorialCita_append_only"
BEFORE UPDATE OR DELETE ON "HistorialCita"
FOR EACH ROW
EXECUTE FUNCTION "historial_cita_append_only"();

CREATE TRIGGER "HistorialCita_append_only_truncate"
BEFORE TRUNCATE ON "HistorialCita"
FOR EACH STATEMENT
EXECUTE FUNCTION "historial_cita_append_only"();
