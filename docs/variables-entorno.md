# Variables de entorno

Las del sitio público siguen en [`.env.example`](../.env.example). Estas son las del área interna.

| Variable | Obligatoria | Para qué |
| --- | --- | --- |
| `DATABASE_URL` | Sí | Postgres. En Vercel puede venir de `POSTGRES_URL`. |
| `BETTER_AUTH_SECRET` | Sí, para entrar a `/app` | Firma la sesión. Mínimo 32 caracteres. Uno distinto por ambiente. |
| `BETTER_AUTH_URL` | Recomendada en producción | Origen de las cookies y los enlaces. Ejemplo: `https://www.vigomedicalestetic.com`. |
| `INITIAL_ADMIN_EMAIL` | Para crear el primer administrador | Correo de esa persona. No va en el código. |
| `INITIAL_ADMIN_NAME` | Igual | Nombre visible. |
| `INITIAL_ADMIN_CMP` | Igual | CMP, porque esa cuenta también es Médico. |
| `INITIAL_ADMIN_PASSWORD` | Opcional | Contraseña inicial. Solo se guarda si la cuenta aún no tiene una. No se imprime en los logs. |
| `RESEND_API_KEY` | Opcional | Si falta, la invitación no falla: el enlace queda en los logs del servidor. |
| `EMAIL_FROM` | Opcional, necesaria para enviar | Remitente. Ejemplo: `Vigo Medical Estetic <acceso@vigomedicalestetic.com>`. |

Sin `BETTER_AUTH_SECRET` el sitio público sigue compilando. Al abrir `/app/login` en producción el servidor avisa que falta el secreto.

Generar un secreto:

```bash
openssl rand -base64 32
```

## Dónde ponerlas en Vercel

Proyecto → **Settings** → **Environment Variables**.

Marca el ambiente (Production, Preview, Development) de cada variable. No uses el mismo `BETTER_AUTH_SECRET` en Preview y en Production.

Después: **Deployments** → **Redeploy**. El build corre `prisma migrate deploy` y, si están el correo, el nombre y el CMP, la semilla del primer administrador.

## Separar la base de Preview y la de Production

Hoy las previews pueden estar usando la misma base que producción. Esa base guarda los leads del formulario de reservas. Por eso la migración de este sprint **solo crea tablas nuevas**. No borra, no renombra y no altera `Lead`.

Aun así, hay que separarlas antes de cargar datos clínicos. La forma recomendada es Neon, con una rama para Preview.

1. En [Neon](https://neon.tech), abre el proyecto de la clínica.
2. Crea una rama, por ejemplo `preview`, desde la rama de producción. Neon copia el esquema y puedes dejarla sin los leads si prefieres una rama vacía y aplicar solo las migraciones.
3. Copia la connection string de la rama `preview` (con pooling para la app; la directa sirve para migrar).
4. En Vercel → **Settings** → **Environment Variables**:
   - `DATABASE_URL` de **Production**: la URL de la rama de producción (la que ya usa el sitio).
   - `DATABASE_URL` de **Preview**: la URL de la rama `preview`. Desmarca Production en esa variable y desmarca Preview en la de producción, para que no se pisen.
5. Si también existe `POSTGRES_URL` inyectada por la integración de Vercel Postgres, esa gana cuando `DATABASE_URL` no está. Revisa que Preview no herede la URL de producción por esa integración. Si la integración está conectada al proyecto, o la desconectas de Preview o pones `DATABASE_URL` de Preview, que el build consulta primero.
6. Redeploy de una preview y de producción.
7. Comprueba el host en los logs del build. No debe ser el mismo en los dos ambientes.

`scripts/vercel-build.mjs` aplica las migraciones y luego la semilla. Con bases separadas, la semilla de Preview crea usuarios de prueba en la rama de Preview y no en la de los leads reales.

Mientras compartan base, no pongas en Preview una `INITIAL_ADMIN_PASSWORD` de prueba sobre el correo real: la semilla no pisa una contraseña ya elegida, pero la primera vez sí escribiría en la base compartida.
