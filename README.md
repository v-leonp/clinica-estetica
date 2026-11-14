# Dra. Melissa Vigo – Médico Estético

Sitio de la práctica de medicina estética de la **Dra. Melissa Vigo**,
médico cirujano (CMP 101245), en San Miguel, Lima, Perú. El consultorio
**está abierto** en Calle Manuel Pérez Oblitas 190. El contacto público es
WhatsApp `+51 998 398 995` (`wa.me/51998398995`). El sitio no publica correo,
horario de atención ni datos societarios.

Construido con [create-t3-app](https://create.t3.gg/):

- **Next.js 15** (App Router) + **TypeScript**
- **Tailwind CSS v4**
- **tRPC v11** para la mutación del formulario de contacto (sin batching,
  con `httpLink`)
- **Prisma** con **PostgreSQL** (Neon, Vercel Postgres u otro Postgres). Las
  migraciones se versionan en `prisma/migrations/`
- **Zod** para validación de inputs
- **Upstash Ratelimit** (opcional, con fallback en memoria) para proteger
  el formulario público contra abuso
- Páginas de marketing estáticas y rápidas (`force-static` +
  `generateStaticParams`)

El sitio es mobile-first, con metadatos SEO en español, breadcrumbs,
`robots.txt` y `sitemap.xml` auto-generados y política de privacidad acorde a
la Ley 29733 (Perú).

## Marca

| Uso | Valor |
| --- | --- |
| Azul marino | `#183553` — texto, fondos oscuros, botones principales |
| Dorado | `#b49a69` — acento. Sobre blanco el contraste es **2.7:1**: solo fondo, borde o adorno, nunca texto de cuerpo |
| Dorado de apoyo | `#7f6b49` — texto e iconos sobre blanco o crema (**5.1:1**, WCAG AA) |
| Dorado sobre marino | `#b49a69` sobre `#183553` pasa AA (**4.6:1**), también el marino sobre el dorado de un botón |

Tipografía:

- **Títulos:** Nexa Bold (`src/fonts/Nexa-Bold.otf`), con `next/font/local`.
- **Cuerpo:** Nexa Light (`src/fonts/Nexa-Light.otf`).
- Los archivos no se modifican. La licencia Fontfabric de fuentes gratuitas
  (PDF junto a los `.otf`) permite `@font-face` comercial.
- **Subtítulos:** el manual pide Gabriola. Esa licencia no permite uso web y
  **Gabriola no está en el repositorio**. Se usa **Cormorant Garamond Italic**
  (OFL, Google Fonts) como cursiva humanista. Para volver a Gabriola hace
  falta comprar licencia web y cambiar la fuente en `src/app/layout.tsx`.

Logotipo en la cabecera (`public/brand/logo-dra-melissa-vigo.png`). El pie no
lleva logotipo. Isotipo del loto VR como favicon (`public/favicon.svg`) y
dentro de la imagen Open Graph (`public/og.png`).

## Datos del consultorio

Publicados:

- Dirección: Calle Manuel Pérez Oblitas 190, San Miguel, Lima
- WhatsApp y teléfono de contacto: `+51 998 398 995`
  (`whatsappContact` en `src/data/content.ts`, única copia del número)
- Redes: Facebook, Instagram y TikTok de `dra.melissavigor` / `@dra.melissavigo`

No se publican correo, horario de atención ni datos de la empresa. Siguen
sin texto propio, y no hay que inventarlos:

- Política de cancelación y reembolso del 10%
- Medios de pago
- Testimonios con autorización

> **Accesibilidad:** verificamos ausencia de violaciones de contraste y de
> ARIA críticos en las páginas principales con axe-core. Siempre revisa con
> tu propia herramienta antes de salir a producción.

> **NextAuth:** fue retirado en la última revisión por no tener UI de login
> y por advisories críticos en `next-auth@5.0.0-beta.*`. Vuelve a añadirlo
> cuando exista un portal de pacientes.

---

## Estructura

```
.
├── prisma/
│   ├── migrations/                              # Versionadas en git
│   └── schema.prisma                            # Modelo Lead (único)
├── public/                                      # Favicon y OG
├── src/
│   ├── app/
│   │   ├── api/trpc/[trpc]/route.ts             # Handler tRPC con
│   │   │                                        # batching OFF, body≤16KB
│   │   │                                        # y rate limit per-IP
│   │   ├── layout.tsx                           # Fuentes, metadatos SEO
│   │   ├── page.tsx                             # Homepage
│   │   ├── not-found.tsx                        # 404 personalizado
│   │   ├── sitemap.ts                           # /sitemap.xml
│   │   ├── robots.ts                            # /robots.txt
│   │   ├── privacidad/page.tsx                  # Ley 29733
│   │   ├── tratamientos/
│   │   │   ├── page.tsx
│   │   │   └── [categoria]/
│   │   │       ├── page.tsx
│   │   │       └── [tratamiento]/page.tsx
│   │   ├── promociones/page.tsx
│   │   ├── nosotros/page.tsx
│   │   ├── tecnologia/page.tsx
│   │   ├── sedes/page.tsx
│   │   └── contacto/page.tsx
│   ├── components/
│   ├── data/content.ts                          # ⭐ Contenido editable
│   ├── env.js                                   # Validación de env (t3-env)
│   ├── lib/site-url.ts                          # Resolución del origin
│   ├── server/
│   │   ├── api/
│   │   │   ├── root.ts
│   │   │   ├── trpc.ts
│   │   │   └── routers/contact.ts
│   │   ├── db.ts                                # Prisma client
│   │   └── rate-limit.ts                        # Upstash + fallback
│   ├── styles/globals.css                       # Theme Tailwind v4
│   └── trpc/                                    # Cliente/proveedor tRPC
├── next.config.js                               # Security headers
└── package.json
```

Todo el contenido editorial — categorías, tratamientos, promociones, equipo,
sedes, textos del hero y badges — vive en
[`src/data/content.ts`](src/data/content.ts).

---

## Requisitos

- Node.js **≥ 20** (declarado en `engines`)
- npm **≥ 10**

## Setup local (PostgreSQL)

Hace falta un Postgres accesible. En local puede ser Docker, Neon o cualquier
instancia con una base vacía.

```bash
# 1. Instalar dependencias
npm install

# 2. Variables de entorno
cp .env.example .env
# Edita DATABASE_URL con una URL postgresql://…
# NEXT_PUBLIC_SITE_URL es opcional en local; se usa http://localhost:3000.
# UPSTASH_* son opcionales; sin ellas el rate limit corre en memoria.

# 3. Aplicar las migraciones
npm run db:migrate       # alias de `prisma migrate deploy`

# 4. Levantar el entorno de desarrollo
npm run dev              # → http://localhost:3000
```

> Para iterar el schema localmente usa `npm run db:generate`
> (`prisma migrate dev`), que crea una nueva migración en
> `prisma/migrations/`. Las migraciones se commitean para que en producción
> `prisma migrate deploy` recree las tablas sin tocar el schema.

## Scripts disponibles

| Comando               | Descripción                                             |
| --------------------- | ------------------------------------------------------- |
| `npm run dev`         | Servidor de desarrollo (Turbopack)                      |
| `npm run build`       | Build de producción                                     |
| `npm run start`       | Servir el build de producción                           |
| `npm run preview`     | `build` + `start`                                       |
| `npm run lint`        | ESLint (`next/core-web-vitals`)                         |
| `npm run typecheck`   | `tsc --noEmit`                                          |
| `npm run db:generate` | `prisma migrate dev` (crea nueva migración)             |
| `npm run db:migrate`  | `prisma migrate deploy` (aplica migraciones existentes) |
| `npm run db:push`     | `prisma db push` (desarrollo rápido, sin migración)     |
| `npm run db:studio`   | Abre Prisma Studio                                      |

---

## Páginas

| Ruta                                       | Qué muestra                                                        |
| ------------------------------------------ | ------------------------------------------------------------------ |
| `/`                                        | Home                                                               |
| `/tratamientos`                            | Índice de las 4 categorías (17 tratamientos)                       |
| `/tratamientos/[categoria]`                | Listado de los tratamientos de una categoría                       |
| `/tratamientos/[categoria]/[tratamiento]`  | Detalle de un tratamiento + FAQ                                    |
| `/promociones`, `/nosotros`, `/tecnologia`, `/sedes`, `/contacto` | Secciones top-level |
| `/privacidad`                              | Política de datos (Ley 29733)                                      |
| `/sitemap.xml`, `/robots.txt`              | Generados por `src/app/sitemap.ts` y `src/app/robots.ts`           |
| `*` (no encontrado)                        | 404 personalizado en `src/app/not-found.tsx`                       |

Cada sub-página tiene **breadcrumbs** (con `BreadcrumbList` JSON-LD de URLs
absolutas) y **metadatos SEO por página** (`title` / `description` /
`canonical` / `OpenGraph`). Las páginas de tratamiento añaden JSON-LD
`MedicalProcedure`. El canonical **no** se declara en el layout raíz: cada
page.tsx define el suyo para que el 404 no herede uno.

---

## Editar contenido

Todo en [`src/data/content.ts`](src/data/content.ts):

- `site`, `nav`, `hero`, `trustBadges`, `freeConsult`
- `whatsappContact` (único número de WhatsApp)
- `categoriesFull`, `allTreatments`, `getCategory`, `getTreatment`
- `featured`, `promos`, `doctors`, `technology`, `testimonials`, `locations`
- `allowedTratamientos`, `allowedSedes` (usados por los `z.enum` del backend)
- `footer`

Al modificar la lista de categorías o tratamientos se actualizan a la vez
el nav, las páginas estáticas (`generateStaticParams`), el sitemap y las
listas blancas del backend.

El formulario de contacto puede prefijar el tratamiento mediante
`?tratamiento=<slug>`. El slug se lee **en el cliente** con
`useEffect + window.location.search` (no con `useSearchParams`, que en
páginas `force-static` queda vacío en producción) y se busca **primero en
las categorías** y recién después en los tratamientos, para que un slug de
categoría no seleccione el primer tratamiento interno.

---

## Seguridad del endpoint público

El formulario `POST /api/trpc/contact.createLead` se protege en varias capas:

1. **Sin batching.** El cliente usa `httpLink` (no `httpBatchLink`), el
   handler responde `400` si llega `?batch=1` y además configuramos
   `allowBatching: false` en `fetchRequestHandler`. Esto evita que un solo
   request inserte N filas por un único check de rate limit.
2. **Body ≤ 16 KB.** Se verifica `content-length` antes de parsear.
3. **Rate limit por IP.** 5 solicitudes por minuto por IP (sliding fixed
   window). Si `UPSTASH_REDIS_REST_URL` + `UPSTASH_REDIS_REST_TOKEN` están
   seteadas se usa `@upstash/ratelimit` (compartido entre funciones de
   Vercel). Sin ellas se usa un contador en memoria (apropiado para dev y
   para VPS single-pod).
4. **Enums validados con Zod.** `tratamiento` y `sede` se validan contra
   `allowedTratamientos` y `allowedSedes`, construidos desde `content.ts`.
5. **Honeypot** (`website`): si viene con contenido el servidor responde
   `200 ok` sin insertar; los bots no pueden detectar que fueron
   bloqueados.
6. **Tiempo mínimo de llenado.** El cliente envía `startedAt` (el `Date.now()`
   al montar el formulario). El servidor rechaza si el delta < 2 s.
7. **Consentimiento obligatorio.** La casilla arranca **desmarcada** y el
   servidor exige `acepto: z.literal(true)`; además se persiste
   `consentAt` en la tabla `Lead`.
8. **Headers de seguridad** en `next.config.js`: `X-Frame-Options`,
   `X-Content-Type-Options`, `Referrer-Policy`, `Permissions-Policy`,
   `Strict-Transport-Security`, `Content-Security-Policy`
   (`frame-ancestors`) y `poweredByHeader: false`.

---

## Base de datos: PostgreSQL

El proyecto usa **PostgreSQL** (`prisma/schema.prisma`). Sirve Neon,
Vercel Postgres o Supabase. `DATABASE_URL` tiene que ser una URL
`postgresql://…`.

En producción se corre `npm run db:migrate` (`prisma migrate deploy`), que es
lo que hace `npm run vercel-build` antes de `next build`.

SQLite no está soportado: el provider del schema es `postgresql` y el
filesystem de Vercel no serviría para un archivo local.

---

## Variables de entorno

Ver `.env.example`.

| Variable                  | Requerida | Descripción                                                              |
| ------------------------- | --------- | ------------------------------------------------------------------------ |
| `DATABASE_URL`            | ✅        | URL `postgresql://…` en local y en producción                            |
| `NEXT_PUBLIC_SITE_URL`    | prod*     | Origen canónico (`https://...`) usado por metadata, sitemap y robots     |
| `UPSTASH_REDIS_REST_URL`  | opcional  | Si está, activa Upstash para rate limit distribuido                      |
| `UPSTASH_REDIS_REST_TOKEN`| opcional  | Pareja de la anterior                                                    |

(*) En Vercel, si no la seteas, se usa `VERCEL_PROJECT_PRODUCTION_URL`
automáticamente. En local se usa `http://localhost:3000`. Define
`NEXT_PUBLIC_SITE_URL` cuando el dominio final difiere del dominio
`vercel.app`.

---

## Deploy a Vercel (GitHub → Vercel)

Flujo: **push a GitHub** → Vercel redeploy automático (si el repo está conectado).

1. **GitHub**: el código vive en `v-leonp/clinica-estetica`. Cada `git push origin main`
   dispara un deploy en Vercel.
2. **Base de datos (obligatorio)** — elige una:
   - **Vercel Postgres (recomendado)**: proyecto Vercel → **Storage** → **Create Database**
     → **Postgres** → conectar al proyecto. No necesitas crear `DATABASE_URL` a mano;
     el build usa `POSTGRES_URL` / `POSTGRES_URL_NON_POOLING`.
   - **Neon u otro**: copia la URL y añádela como `DATABASE_URL` en Environment Variables.
3. **Environment Variables** (Production **y** Preview):
   - `DATABASE_URL` → solo si no usas Vercel Postgres
   - `NEXT_PUBLIC_SITE_URL` → opcional (p. ej. `https://tu-proyecto.vercel.app`)
   - `UPSTASH_REDIS_REST_*` → opcional pero recomendado en producción (rate limit)
4. **Build**: lo define `vercel.json` → `npm run vercel-build` (migraciones + `next build`).
   Node **26.x** (`.nvmrc` + `engines` en `package.json`; alinea con Vercel y evita override 20.x).
5. **Ajustes recomendados en Vercel → Settings**:
   - **Prioritize Production Builds**: activado
   - **Skew Protection**: activar si quieres evitar desajustes frontend/backend entre deploys
   - **Node.js Version**: **26.x** (debe coincidir con `package.json`; quita pins viejos en 20.x)
6. Tras cambiar variables o Storage: **Deployments → Redeploy**.

> Las páginas de marketing están prerenderizadas estáticamente (`force-static`
> + `generateStaticParams`), por lo que se sirven desde el CDN. Sólo las
> rutas `/api/trpc/*` corren como funciones.

---

## Próximos pasos sugeridos

- Portal/dashboard con NextAuth (cuando sea necesario)
- Reserva online de citas (`booking` router + modelo `Appointment`)
- Panel admin para leads
- Integración con WhatsApp Business API para notificaciones
