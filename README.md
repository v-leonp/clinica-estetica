# Lumina Estética

Sitio web de marketing para una clínica ficticia de medicina estética y
cirugía plástica en Lima, Perú. Marca, textos y datos de contacto son **de
ejemplo** (uso demostrativo).

Construido con [create-t3-app](https://create.t3.gg/):

- **Next.js 15** (App Router) + **TypeScript**
- **Tailwind CSS v4**
- **tRPC v11** para la mutación del formulario de contacto (sin batching,
  con `httpLink`)
- **Prisma** (SQLite por defecto, Postgres/Neon en producción). Las
  migraciones se versionan en `prisma/migrations/`
- **Zod** para validación de inputs
- **Upstash Ratelimit** (opcional, con fallback en memoria) para proteger
  el formulario público contra abuso
- Páginas de marketing estáticas y rápidas (`force-static` +
  `generateStaticParams`)

El sitio es mobile-first, con metadatos SEO en español, breadcrumbs,
`robots.txt` y `sitemap.xml` auto-generados, política de privacidad acorde a
la Ley 29733 (Perú) y paleta _rose gold_ oscurecida a `#9a4f5b` para pasar
WCAG AA de contraste.

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

## Setup local (SQLite)

```bash
# 1. Instalar dependencias
npm install

# 2. Variables de entorno
cp .env.example .env
# .env trae DATABASE_URL="file:./db.sqlite" para desarrollo.
# NEXT_PUBLIC_SITE_URL es opcional en local; se usa http://localhost:3000.
# UPSTASH_* son opcionales; sin ellas el rate limit corre en memoria.

# 3. Aplicar las migraciones (crea prisma/db.sqlite)
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
| `/tratamientos`                            | Índice de las 6 categorías                                         |
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

## Base de datos: SQLite ↔ Postgres (Neon)

El scaffold usa **SQLite** por defecto para desarrollo. Para producción se
recomienda **Postgres** (p. ej. [Neon](https://neon.tech),
[Vercel Postgres](https://vercel.com/storage/postgres) o
[Supabase](https://supabase.com)).

### Cambiar a Postgres

1. En `prisma/schema.prisma` cambia el provider a `postgresql`.
2. Pon `DATABASE_URL` apuntando a tu Postgres.
3. Borra `prisma/migrations/` **o** mantenlas: si cambias de provider conviene
   generar una migración inicial fresca con
   `npx prisma migrate dev --name init_pg`. En producción se corre
   `npm run db:migrate` (`prisma migrate deploy`).

SQLite **no** funciona en el filesystem efímero de Vercel. Cualquier entorno
hosteado necesita Postgres u otra base persistente.

---

## Variables de entorno

Ver `.env.example`.

| Variable                  | Requerida | Descripción                                                              |
| ------------------------- | --------- | ------------------------------------------------------------------------ |
| `DATABASE_URL`            | ✅        | `file:./db.sqlite` en dev, Postgres URL en prod                          |
| `NEXT_PUBLIC_SITE_URL`    | prod*     | Origen canónico (`https://...`) usado por metadata, sitemap y robots     |
| `UPSTASH_REDIS_REST_URL`  | opcional  | Si está, activa Upstash para rate limit distribuido                      |
| `UPSTASH_REDIS_REST_TOKEN`| opcional  | Pareja de la anterior                                                    |

(*) En Vercel, si no la seteas, se usa `VERCEL_PROJECT_PRODUCTION_URL`
automáticamente. En local se usa `http://localhost:3000`. Define
`NEXT_PUBLIC_SITE_URL` cuando el dominio final difiere del dominio
`vercel.app`.

---

## Deploy a Vercel

1. **Importa el repo** en [vercel.com/new](https://vercel.com/new).
2. **Base de datos**: crea una base Postgres (Neon o Vercel Postgres) y copia
   la connection string.
3. **Variables de entorno** en el proyecto Vercel (Production y Preview):
   - `DATABASE_URL` → Postgres URL
   - `NEXT_PUBLIC_SITE_URL` → tu dominio final, p. ej.
     `https://www.lumina-estetica.com` (opcional si usas el dominio por
     defecto de Vercel; en ese caso se infiere de
     `VERCEL_PROJECT_PRODUCTION_URL`)
   - `UPSTASH_REDIS_REST_URL`, `UPSTASH_REDIS_REST_TOKEN` → recomendadas en
     producción para que el rate limit se comparta entre invocaciones
4. **Build command**: `prisma migrate deploy && next build`. Esto aplica las
   migraciones versionadas en `prisma/migrations/` y luego construye el
   sitio. El `postinstall` ya corre `prisma generate` solo.
5. **Dominios**: configura `www.tudominio.com` apuntando a Vercel y luego
   actualiza `NEXT_PUBLIC_SITE_URL`.

> Las páginas de marketing están prerenderizadas estáticamente (`force-static`
> + `generateStaticParams`), por lo que se sirven desde el CDN. Sólo las
> rutas `/api/trpc/*` corren como funciones.

---

## Próximos pasos sugeridos

- Portal/dashboard con NextAuth (cuando sea necesario)
- Reserva online de citas (`booking` router + modelo `Appointment`)
- Panel admin para leads
- Integración con WhatsApp Business API para notificaciones
