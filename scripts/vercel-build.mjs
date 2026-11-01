import { execSync } from "node:child_process";
import { applyDatabaseUrlEnv } from "../src/lib/resolve-database-url.js";

const help = `
╔══════════════════════════════════════════════════════════════════════╗
║  Falta la base de datos en Vercel (DATABASE_URL / POSTGRES_*)      ║
╠══════════════════════════════════════════════════════════════════════╣
║  1. Vercel → proyecto clinica-estetica → Storage → Create Database   ║
║     → Postgres (conecta al proyecto).                                ║
║     O usa Neon: https://neon.tech → copia la connection string.       ║
║  2. Settings → Environment Variables:                                ║
║     - Si usas Vercel Postgres: no hace falta DATABASE_URL; se usa    ║
║       POSTGRES_URL / POSTGRES_URL_NON_POOLING automáticamente.       ║
║     - Si usas Neon u otro host: añade DATABASE_URL = postgresql://…  ║
║     Marca Production, Preview y Development.                           ║
║  3. Redeploy (Deployments → … → Redeploy).                           ║
╚══════════════════════════════════════════════════════════════════════╝
`;

applyDatabaseUrlEnv({ forMigration: true });

if (!process.env.DATABASE_URL) {
  console.error(help);
  process.exit(1);
}

console.log("→ prisma migrate deploy");
execSync("npx prisma migrate deploy", { stdio: "inherit" });

applyDatabaseUrlEnv({ forMigration: false });

console.log("→ next build");
execSync("npm run build", { stdio: "inherit" });
