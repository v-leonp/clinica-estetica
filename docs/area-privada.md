# Área privada

El sitio público de la Dra. Melissa Vigo no cambia. Encima, en el mismo dominio, hay un área para el equipo en `/app`. No aparece en el menú, ni en el sitemap, y responde `noindex`.

## Qué hace este sprint

El administrador gestiona dos cosas:

1. **Usuarios.** Listar, buscar y filtrar. Invitar. Editar nombre, correo y roles. Activar o desactivar. Reenviar la invitación o pedir un enlace para que la persona elija su contraseña.
2. **Catálogo interno de tratamientos.** Nombre, categoría, duración estimada, descripción interna y si está activo. Sin precios.

El rol Médico entra y ve el aviso «módulo en construcción (Sprint 2)». No ve pacientes ni historias clínicas: eso no existe todavía.

## Roles

Hay dos roles, y una persona puede tener los dos a la vez.

| Puede | Administrador | Médico |
| --- | --- | --- |
| Invitar, editar, activar o desactivar usuarios | Sí | No |
| Asignar Administrador o Médico | Sí | No |
| Añadir, editar o desactivar tratamientos | Sí | No |
| Ver el registro de cambios | Sí | No |
| Entrar a su módulo de trabajo | No forma parte de este modo | Sí, aún en construcción |

Si alguien tiene los dos roles, entra al modo administrador y además ve el enlace al área médica.

## Reglas que el servidor aplica

Ocultar un botón no basta. Cada acción se vuelve a comprobar en el servidor.

- No hay registro público. Las cuentas las crea el administrador.
- El administrador nunca escribe ni ve la contraseña de otra persona. El sistema manda un enlace de un solo uso (24 horas).
- El CMP es obligatorio si la persona tiene el rol Médico. Son de 4 a 8 dígitos.
- No se borra a nadie ni ningún tratamiento. Se desactiva, y antes hay una confirmación.
- No se puede desactivar ni quitar el rol al último administrador activo.
- Cada alta, edición, desactivación, invitación, restablecimiento y cada entrada queda en `AuditLog`: quién, qué, cuándo, y el antes y el después. Las contraseñas y los tokens no se guardan ahí.

## Cómo está armado

```
src/app/app/                  pantallas /app/login y /app/*
src/app/api/auth/             Better Auth
src/server/auth/              sesión, correo, semilla
src/server/app/domain/        reglas puras, con tests
src/server/app/users/         casos de uso de usuarios
src/server/app/treatments/    casos de uso del catálogo
src/middleware.ts             cookie de sesión + noindex en /app
```

La pantalla pide la cookie. La página y la acción vuelven a leer la sesión y el rol. Un médico que llame la acción de invitar recibe un rechazo aunque arme la petición a mano.

Better Auth guarda la sesión en una cookie HttpOnly. Las tablas `user`, `session`, `account` y `verification` son las suyas. Los roles viven en `Role` y `UserRole`, aparte, porque una persona puede tener más de uno.

## Qué no toca

- El formulario público de reservas y la tabla `Lead`.
- El catálogo editorial de la web (`src/data/content.ts`). El catálogo interno es otra lista, para el equipo.
- WhatsApp `+51 922 798 480` como único contacto público.
- Correo, horario, razón social, RUC y precios: siguen sin publicarse.
- Analytics: no se le mandan datos personales del área interna más allá de la ruta, y solo si la persona aceptó cookies en el sitio.

## Dónde seguir

- [Variables de entorno](variables-entorno.md), incluida la base de preview separada de producción.
- [Cómo crear el primer administrador](primer-administrador.md).
