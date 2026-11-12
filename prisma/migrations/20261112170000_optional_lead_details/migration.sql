-- La reserva corta no pide tratamiento ni mensaje. Las filas ya guardadas conservan su texto.
ALTER TABLE "Lead" ALTER COLUMN "tratamiento" DROP NOT NULL;
ALTER TABLE "Lead" ALTER COLUMN "mensaje" DROP NOT NULL;
