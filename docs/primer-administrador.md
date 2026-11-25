# Crear el primer administrador

La primera cuenta no se registra en una pantalla. Sale de variables de entorno en el deploy, para no dejar un correo escrito en el repositorio.

Esa cuenta recibe los dos roles: **Administrador** y **Médico**. Por el rol Médico hace falta el CMP.

## 1. Variables

En Vercel, ambiente **Production** (y en local, en `.env`):

```bash
INITIAL_ADMIN_EMAIL="el-correo-de-la-persona"
INITIAL_ADMIN_NAME="Nombre Apellido"
INITIAL_ADMIN_CMP="101245"
INITIAL_ADMIN_PASSWORD="una-frase-de-al-menos-10-con-letra-y-numero"
BETTER_AUTH_SECRET="un-secreto-de-32-caracteres-o-mas"
BETTER_AUTH_URL="https://www.vigomedicalestetic.com"
```

`INITIAL_ADMIN_PASSWORD` es opcional.

- Si la pones, la persona entra en `/app/login` con ese correo y esa clave. El deploy no la imprime.
- Si no la pones, el build deja en los logs un enlace de un solo uso (24 horas) para que ella elija la clave. Busca la línea `[acceso-interno] Primer administrador`.

La contraseña del entorno **solo se guarda si la cuenta todavía no tiene una**. Un redeploy posterior no la cambia. Si la persona ya entró y eligió otra clave, esa se respeta.

Si el enlace del primer build caducó y la cuenta sigue sin clave, define `INITIAL_ADMIN_PASSWORD` y vuelve a desplegar.

## 2. Deploy

Push a la rama que Vercel construye, o Redeploy. El comando `npm run vercel-build` hace, en orden:

1. `prisma migrate deploy` (tablas nuevas, sin tocar `Lead`).
2. `node scripts/seed-initial-admin.mjs`.
3. `next build`.

Si faltan el correo, el nombre o el CMP, la semilla no crea a nadie y el sitio público igual se publica. El log dice qué variable faltó.

En local:

```bash
npm run db:migrate
npm run db:seed
npm run dev
```

Luego abre `http://localhost:3000/app/login`. No hay un enlace en la portada: hay que escribir la ruta.

## 3. Después del primer acceso

Desde **Usuarios** se invita al resto del equipo. Cada invitación manda un enlace. El administrador no escribe la clave de otra persona.

Para que el correo salga de verdad:

```bash
RESEND_API_KEY="re_..."
EMAIL_FROM="Vigo Medical Estetic <acceso@vigomedicalestetic.com>"
```

El dominio del remitente tiene que estar verificado en Resend. Si la API key no está, la invitación igual se crea y el enlace queda en los logs del servidor (`[acceso-interno]`). No se muestra en el navegador.

## 4. Comprobar

- `/app/login` pide correo y contraseña, y no ofrece «crear cuenta».
- Con el rol Administrador se ven Usuarios, Tratamientos y Registro.
- Con solo Médico se ve «Módulo en construcción (Sprint 2)» y no el listado de usuarios.
- El sitio público (`/`, `/tratamientos`, `/reservar`) se ve igual y no enlaza `/app`.
