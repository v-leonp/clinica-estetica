-- CreateTable
CREATE TABLE "Lead" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "nombre" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "telefono" TEXT NOT NULL,
    "tratamiento" TEXT NOT NULL,
    "mensaje" TEXT NOT NULL,
    "sede" TEXT,
    "source" TEXT NOT NULL DEFAULT 'contact-form',
    "ip" TEXT,
    "userAgent" TEXT,
    "consentAt" DATETIME NOT NULL,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP
);

-- CreateIndex
CREATE INDEX "Lead_createdAt_idx" ON "Lead"("createdAt");

-- CreateIndex
CREATE INDEX "Lead_email_idx" ON "Lead"("email");
