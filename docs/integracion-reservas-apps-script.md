# Recibir las solicitudes de cita en un Sheet y por correo

Unos 10 minutos. Hazlo con la cuenta de Google de la clínica, **vigomedicalestetic@gmail.com**. No hace falta saber programar: se copia un texto, se guarda una frase secreta y se publica un enlace.

Cuando termines:

- Cada solicitud del formulario de reservar queda en una fila del Sheet.
- Llega un correo a esa misma cuenta, con los datos y un botón para abrir WhatsApp con la persona.
- Si el aviso falla, la solicitud **igual queda guardada** en el sitio. La persona no ve un error por eso.

El código que hay que pegar está al final de esta página y también en `apps-script/Code.gs`. Los dos tienen que ser el mismo texto.

## 1. Crea el Sheet

1. Abre [Google Sheets](https://sheets.google.com) con **vigomedicalestetic@gmail.com**.
2. Crea una hoja en blanco.
3. Ponle de nombre **Solicitudes de cita**.
4. No escribas columnas. El script las crea solo la primera vez.

## 2. Pega el script

1. En el Sheet: **Extensiones → Apps Script**.
2. Se abre un editor con un archivo `Code.gs`. Borra todo lo que haya dentro.
3. Copia el código completo de la sección [Código completo](#código-completo) y pégalo.
4. Pulsa **Guardar** (el icono del disquete, o Ctrl+S).
5. Si pregunta el nombre del proyecto, escribe **Aviso de solicitudes**.

## 3. Guarda el secreto y el id del Sheet

Hay que guardar **dos** propiedades. No son la contraseña del correo. No las escribas dentro de las celdas del Sheet.

### El secreto

1. Inventa una frase de al menos 24 caracteres. Puede ser cuatro palabras raras y un número, por ejemplo una que solo tú entiendas. Anótala en un lugar seguro: la vas a pegar otra vez en Vercel.
2. En el editor de Apps Script, a la izquierda, pulsa el **engranaje** (Configuración del proyecto).
3. Baja hasta **Propiedades del script** y pulsa **Añadir propiedad de script**.
4. En **Propiedad** escribe exactamente: `APPS_SCRIPT_SECRET`
5. En **Valor** pega tu frase.
6. Guarda la propiedad.

### El id del Sheet (obligatorio)

La aplicación web no siempre encuentra sola la hoja. Por eso el script necesita el id.

1. Abre el Sheet en el navegador. La dirección se parece a `https://docs.google.com/spreadsheets/d/ESTE_ES_EL_ID/edit`.
2. Copia solo el tramo que está entre `/d/` y `/edit`. Es una cadena larga de letras y números. No copies la dirección entera.
3. Vuelve a **Propiedades del script** y pulsa **Añadir propiedad de script**.
4. En **Propiedad** escribe exactamente: `SHEET_ID`
5. En **Valor** pega ese id.
6. Guarda la propiedad.

## 4. Publícalo como aplicación web

1. Arriba a la derecha: **Implementar → Nueva implementación**.
2. Junto a «Seleccionar tipo», pulsa el engranaje y elige **Aplicación web**.
3. Descripción: `Aviso de solicitudes`.
4. **Ejecutar como:** Yo (vigomedicalestetic@gmail.com).
5. **Quién tiene acceso:** Cualquier persona.
   Tiene que ser «Cualquier persona». Si no, el sitio no puede avisarte. La frase secreta impide que un desconocido agregue filas: sin la frase, el script ignora el mensaje.
6. Pulsa **Implementar**.
7. Google pide permiso. Elige la cuenta de la clínica y permite **ver y editar hojas de cálculo** y **enviar correo**.
8. Puede aparecer **«Google no ha verificado esta app»**. Es normal: el script es tuyo y todavía no pasó por la revisión pública de Google. Pulsa **Configuración avanzada** (o **Avanzado**) y luego **Ir a Aviso de solicitudes (no seguro)**. Después pulsa **Permitir**.
9. Copia la **URL de la aplicación web**. Termina en `/exec`. No uses la que termina en `/dev`.

Si más adelante cambias el código, hay que hacer **Implementar → Gestionar implementaciones → lápiz → Nueva versión**. Si no, sigue activo el código viejo.

## 5. Carga las dos variables en Vercel

1. Entra a [Vercel](https://vercel.com), abre el proyecto **clinica-estetica** y ve a **Settings → Environment Variables**.
2. Añade `APPS_SCRIPT_WEBHOOK_URL`. El valor es la URL que termina en `/exec`.
3. Añade `APPS_SCRIPT_SECRET`. El valor es **la misma frase** del paso 3, carácter por carácter.
4. Márcalas en **Preview** para probar la vista previa. Márcalas en **Production** solo cuando apruebes el cambio para el sitio real.
5. Guarda.
6. Ve a **Deployments**, abre el despliegue que quieres usar y pulsa **Redeploy**.
   Vercel lee estas variables al construir. Si no vuelves a desplegar, el sitio sigue sin avisar.

Hasta que las dos variables existan, el formulario guarda la solicitud y no envía correo ni fila. Es el comportamiento esperado, no un fallo.

## Qué vas a ver

El Sheet, en la pestaña **Solicitudes**, queda con estas columnas:

| Fecha y hora de registro | Nombre | Celular | Tratamiento | Día y hora preferida | Cómo se enteró | Origen | Estado |
| --- | --- | --- | --- | --- | --- | --- | --- |

- La hora de registro se muestra en hora de Lima.
- **Estado** empieza en **Nuevo**. La celda solo acepta: Nuevo, Contactado, Agendado o Cancelado.
- **Origen** dice Reserva o Contacto.
- **Cómo se enteró** es opcional: TikTok, Facebook, Instagram, Recomendación de alguien, Google u Otro. Si no eligió, la celda muestra un guion.
- Si el Sheet ya existía y no tiene esa cabecera, el script la agrega al final de la fila de títulos. No borra las columnas que ya están.
- Si la persona no eligió tratamiento o día, la celda muestra un guion.

El correo llega a **vigomedicalestetic@gmail.com**. El asunto es `Nueva solicitud de cita – ` seguido del nombre. El cuerpo trae los datos y un botón **Escribir por WhatsApp**, que abre un chat con el celular de esa persona. La primera vez, mira también spam o promociones.

En la página de confirmación del sitio, la persona ve el texto que se abrirá en su WhatsApp, en este orden: nombre, tratamiento o zona, día y hora. Ese mensaje lo envía ella, no el consultorio.

## Si no llega nada

- Las dos variables de Vercel tienen que existir y el sitio tiene que haberse vuelto a desplegar después de guardarlas.
- La frase secreta de Vercel y la de las propiedades del script tienen que ser idénticas.
- La propiedad `SHEET_ID` tiene que estar guardada. Sin ella, una prueba firmada puede responder `{ok:false, error:"interno"}` porque la aplicación web no encuentra la hoja.
- La URL tiene que ser la de `/exec`, con acceso **Cualquier persona** y ejecución **como yo**.
- El script tiene que estar guardado en la misma cuenta que abre el Sheet.
- Revisa que el despliegue de Apps Script sea una versión nueva si cambiaste el código.

## No hagas la prueba con datos de una paciente

Enviar el formulario crea una fila de verdad en la base del sitio. Si la vista previa de Vercel usa la misma base que la web publicada, esa prueba se mezcla con las solicitudes reales. Para el primer ensayo, cuando ya esté confirmado que la vista previa no usa la base real, usa un nombre claramente ficticio, por ejemplo «Ana Ejemplo», y un celular que no sea de una paciente. Luego puedes borrar esa fila del Sheet y, si hace falta, pedir que borren esa fila de la base.

## Para quien mantiene el código

El sitio hace `POST` con cuerpo JSON UTF-8 y estos campos, en este orden: `id`, `registradoEn` (ISO), `nombre`, `celular`, `tratamiento`, `diaHoraPreferida`, `comoSeEntero`, `origen` (`Reserva` o `Contacto`). `comoSeEntero` es la opción elegida o una cadena vacía. No manda correo, mensaje libre, IP ni notas.

La firma es HMAC-SHA256 en hexadecimal de `timestamp + "." + cuerpo`, con `APPS_SCRIPT_SECRET`. `timestamp` son milisegundos. Viajan en la query (`timestamp` y `signature`) porque Apps Script no entrega cabeceras propias, y también en las cabeceras `X-VME-Timestamp` y `X-VME-Signature`. El script rechaza relojes a más de 5 minutos y una firma repetida dentro de esa ventana.

El envío espera como máximo 2,5 segundos. Si faltan las variables, la URL no es `https`, el secreto tiene menos de 16 caracteres, o el aviso falla, `createLead` igual responde que la solicitud quedó guardada.

Los eventos de analítica del sitio no incluyen nombre, teléfono ni el texto del mensaje. Si la persona elige cómo se enteró y aceptó cookies, el evento `reserva_fuente` lleva solo ese valor (`TikTok`, `Facebook`, `Instagram`, `Recomendación de alguien`, `Google` u `Otro`).

## Código completo

Pega todo el bloque siguiente en `Code.gs`, sin quitar ni añadir líneas.

```javascript
/**
 * Aviso de solicitudes de cita — Vigo Medical Estetic.
 *
 * Se pega en el Google Sheet (Extensiones → Apps Script) de la cuenta
 * vigomedicalestetic@gmail.com. Comprueba la firma, agrega una fila y
 * manda un correo.
 *
 * Propiedades del script (Configuración del proyecto → Propiedades del script):
 *   APPS_SCRIPT_SECRET  el mismo valor que en Vercel.
 *   SHEET_ID            el id del Google Sheet (el tramo de la URL entre /d/ y /edit).
 * En una aplicación web, getActiveSpreadsheet() puede fallar. Si pasa, se abre SHEET_ID.
 *
 * Apps Script no entrega cabeceras propias. La firma y el timestamp llegan
 * en la query (?timestamp=&signature=) y el JSON va en el cuerpo.
 * Firma: HMAC-SHA256 en hexadecimal de `timestamp + "." + cuerpo`,
 * con la clave APPS_SCRIPT_SECRET.
 * Se rechaza si el reloj difiere más de 5 minutos o si esa firma se repite
 * dentro de esa ventana.
 */

var CORREO_AVISO = "vigomedicalestetic@gmail.com";
var VENTANA_MS = 5 * 60 * 1000;
var ZONA = "America/Lima";
var ENCABEZADOS = [
  "Fecha y hora de registro",
  "Nombre",
  "Celular",
  "Tratamiento",
  "Día y hora preferida",
  "Cómo se enteró",
  "Origen",
  "Estado",
];
var ESTADOS = ["Nuevo", "Contactado", "Agendado", "Cancelado"];

function doGet() {
  return ContentService.createTextOutput(
    "Listo. Este enlace recibe solicitudes de cita.",
  ).setMimeType(ContentService.MimeType.TEXT);
}

function doPost(e) {
  try {
    return json_(procesarSolicitud_(e));
  } catch (err) {
    return json_({ ok: false, error: "interno" });
  }
}

function procesarSolicitud_(e) {
  var secret = PropertiesService.getScriptProperties().getProperty(
    "APPS_SCRIPT_SECRET",
  );
  if (!secret) return { ok: false, error: "config" };

  var timestamp = parametro_(e, "timestamp");
  var firma = parametro_(e, "signature").toLowerCase();
  var cuerpo = e && e.postData && e.postData.contents ? e.postData.contents : "";

  if (!/^\d{13}$/.test(timestamp)) return { ok: false, error: "reloj" };
  if (!/^[0-9a-f]{64}$/.test(firma)) return { ok: false, error: "firma" };

  var marca = Number(timestamp);
  if (Math.abs(Date.now() - marca) > VENTANA_MS) {
    return { ok: false, error: "reloj" };
  }

  var esperada = hmacHex_(secret, timestamp + "." + cuerpo);
  if (!firmasIguales_(firma, esperada)) return { ok: false, error: "firma" };

  var solicitud = leerSolicitud_(cuerpo);
  if (!solicitud) return { ok: false, error: "datos" };

  var cache = CacheService.getScriptCache();
  var lock = LockService.getScriptLock();
  lock.waitLock(15000);
  try {
    if (cache.get(firma)) return { ok: false, error: "replay" };
    agregarFila_(solicitud);
    cache.put(firma, "1", VENTANA_MS / 1000);
  } finally {
    lock.releaseLock();
  }

  var correoOk = true;
  try {
    enviarCorreo_(solicitud);
  } catch (err) {
    correoOk = false;
  }
  return { ok: true, correo: correoOk };
}

function parametro_(e, nombre) {
  if (!e || !e.parameter || e.parameter[nombre] == null) return "";
  return String(e.parameter[nombre]);
}

function hmacHex_(secret, mensaje) {
  var bytes = Utilities.computeHmacSha256Signature(
    mensaje,
    secret,
    Utilities.Charset.UTF_8,
  );
  var hex = "";
  for (var i = 0; i < bytes.length; i++) {
    var value = bytes[i];
    if (value < 0) value += 256;
    var piece = value.toString(16);
    if (piece.length === 1) piece = "0" + piece;
    hex += piece;
  }
  return hex;
}

function firmasIguales_(recibida, esperada) {
  if (recibida.length !== esperada.length) return false;
  var diff = 0;
  for (var i = 0; i < recibida.length; i++) {
    diff |= recibida.charCodeAt(i) ^ esperada.charCodeAt(i);
  }
  return diff === 0;
}

function leerSolicitud_(cuerpo) {
  try {
    var data = JSON.parse(cuerpo);
    var nombre = texto_(data && data.nombre, 120);
    var celular = texto_(data && data.celular, 40);
    if (!nombre || !celular) return null;
    var origen = data.origen === "Contacto" ? "Contacto" : "Reserva";
    return {
      id: texto_(data.id, 40),
      registradoEn: texto_(data.registradoEn, 40),
      nombre: nombre,
      celular: celular,
      tratamiento: texto_(data.tratamiento, 160),
      diaHoraPreferida: texto_(data.diaHoraPreferida, 80),
      comoSeEntero: texto_(data.comoSeEntero, 80),
      origen: origen,
    };
  } catch (err) {
    return null;
  }
}

function texto_(valor, max) {
  if (valor == null) return "";
  var limpio = String(valor).replace(/[\r\n]+/g, " ").trim();
  if (limpio.length > max) return limpio.substring(0, max);
  return limpio;
}

function agregarFila_(solicitud) {
  var hoja = obtenerHoja_();
  asegurarEncabezados_(hoja);
  asegurarEstados_(hoja);
  var ultima = Math.max(hoja.getLastColumn(), 1);
  var encabezados = hoja.getRange(1, 1, 1, ultima).getValues()[0];
  var valores = {};
  valores["Fecha y hora de registro"] = fechaRegistro_(solicitud.registradoEn);
  valores["Nombre"] = solicitud.nombre;
  valores["Celular"] = solicitud.celular;
  valores["Tratamiento"] = solicitud.tratamiento || "—";
  valores["Día y hora preferida"] = solicitud.diaHoraPreferida || "—";
  valores["Cómo se enteró"] = solicitud.comoSeEntero || "—";
  valores["Origen"] = solicitud.origen;
  valores["Estado"] = "Nuevo";
  var fila = [];
  for (var i = 0; i < encabezados.length; i++) {
    var clave = String(encabezados[i] || "");
    fila.push(Object.prototype.hasOwnProperty.call(valores, clave) ? valores[clave] : "");
  }
  hoja.appendRow(fila);
}

function obtenerHoja_() {
  var libro = null;
  try {
    libro = SpreadsheetApp.getActiveSpreadsheet();
  } catch (err) {
    libro = null;
  }
  if (!libro) {
    var id = PropertiesService.getScriptProperties().getProperty("SHEET_ID");
    if (!id) throw new Error("sin-hoja");
    libro = SpreadsheetApp.openById(id);
  }
  var hoja = libro.getSheetByName("Solicitudes");
  if (!hoja) {
    hoja = libro.getSheets()[0];
    hoja.setName("Solicitudes");
  }
  return hoja;
}

function asegurarEncabezados_(hoja) {
  if (hoja.getLastRow() === 0 || !hoja.getRange(1, 1).getValue()) {
    hoja.getRange(1, 1, 1, ENCABEZADOS.length).setValues([ENCABEZADOS]);
    hoja.getRange(1, 1, 1, ENCABEZADOS.length).setFontWeight("bold");
    hoja.setFrozenRows(1);
    return;
  }
  var ultima = Math.max(hoja.getLastColumn(), 1);
  var actuales = hoja.getRange(1, 1, 1, ultima).getValues()[0];
  var faltan = [];
  for (var i = 0; i < ENCABEZADOS.length; i++) {
    if (actuales.indexOf(ENCABEZADOS[i]) === -1) faltan.push(ENCABEZADOS[i]);
  }
  if (faltan.length === 0) return;
  hoja.getRange(1, ultima + 1, 1, faltan.length).setValues([faltan]);
  hoja.getRange(1, ultima + 1, 1, faltan.length).setFontWeight("bold");
}

function asegurarEstados_(hoja) {
  var regla = SpreadsheetApp.newDataValidation()
    .requireValueInList(ESTADOS, true)
    .setAllowInvalid(false)
    .build();
  var filas = Math.max(hoja.getMaxRows() - 1, 50);
  var columna = columnaPorNombre_(hoja, "Estado") || 8;
  hoja.getRange(2, columna, filas, 1).setDataValidation(regla);
}

function columnaPorNombre_(hoja, nombre) {
  var ultima = Math.max(hoja.getLastColumn(), 1);
  var encabezados = hoja.getRange(1, 1, 1, ultima).getValues()[0];
  for (var i = 0; i < encabezados.length; i++) {
    if (encabezados[i] === nombre) return i + 1;
  }
  return 0;
}

function fechaRegistro_(iso) {
  var fecha = new Date(iso);
  if (isNaN(fecha.getTime())) fecha = new Date();
  return Utilities.formatDate(fecha, ZONA, "dd/MM/yyyy HH:mm");
}

function enviarCorreo_(solicitud) {
  var enlace = enlaceWhatsApp_(solicitud.celular, solicitud.nombre);
  MailApp.sendEmail({
    to: CORREO_AVISO,
    subject: "Nueva solicitud de cita – " + solicitud.nombre,
    htmlBody: htmlAviso_(solicitud, enlace),
    body: textoAviso_(solicitud, enlace),
  });
}

function enlaceWhatsApp_(celular, nombre) {
  var digits = String(celular || "").replace(/\D/g, "");
  if (digits.length === 9) digits = "51" + digits;
  if (!digits) return "";
  var texto =
    "Hola " +
    nombre +
    ", te escribimos de Vigo Medical Estetic sobre tu solicitud de cita.";
  return "https://wa.me/" + digits + "?text=" + encodeURIComponent(texto);
}

function htmlAviso_(solicitud, enlace) {
  var filas = [
    ["Nombre", solicitud.nombre],
    ["Celular", solicitud.celular],
    ["Tratamiento", solicitud.tratamiento || "—"],
    ["Día y hora preferida", solicitud.diaHoraPreferida || "—"],
    ["Cómo se enteró", solicitud.comoSeEntero || "—"],
    ["Origen", solicitud.origen || "Reserva"],
    ["Registro", fechaRegistro_(solicitud.registradoEn)],
  ];
  var cuerpo = "";
  for (var i = 0; i < filas.length; i++) {
    cuerpo +=
      "<tr>" +
      '<td style="padding:8px 12px 8px 0;color:#5c6b7a;vertical-align:top">' +
      escaparHtml_(filas[i][0]) +
      "</td>" +
      '<td style="padding:8px 0;color:#183553;font-weight:600">' +
      escaparHtml_(filas[i][1]) +
      "</td>" +
      "</tr>";
  }

  var boton = "";
  if (enlace) {
    boton =
      '<p style="margin:24px 0 0"><a href="' +
      escaparHtml_(enlace) +
      '" style="display:inline-block;background:#183553;color:#f7f3ea;text-decoration:none;padding:12px 18px;border-radius:999px">Escribir por WhatsApp</a></p>';
  }

  return (
    '<div style="font-family:Arial,Helvetica,sans-serif;background:#f7f3ea;padding:24px">' +
    '<div style="max-width:480px;margin:0 auto;background:#ffffff;border:1px solid #e6dfd2;border-radius:16px;padding:24px">' +
    '<p style="margin:0;letter-spacing:0.12em;text-transform:uppercase;font-size:11px;color:#7f6b49">Vigo Medical Estetic</p>' +
    '<h1 style="margin:12px 0 0;font-size:22px;color:#183553;font-weight:600">Nueva solicitud de cita</h1>' +
    '<p style="margin:12px 0 0;color:#183553;line-height:1.5">La cita todavía no está confirmada. Estos son los datos que dejó la persona.</p>' +
    '<table style="margin-top:16px;border-collapse:collapse;width:100%">' +
    cuerpo +
    "</table>" +
    boton +
    '<p style="margin:24px 0 0;font-size:12px;color:#5c6b7a">Referencia: ' +
    escaparHtml_(solicitud.id || "—") +
    "</p>" +
    "</div></div>"
  );
}

function textoAviso_(solicitud, enlace) {
  var lineas = [
    "Nueva solicitud de cita",
    "",
    "La cita todavía no está confirmada.",
    "Nombre: " + solicitud.nombre,
    "Celular: " + solicitud.celular,
    "Tratamiento: " + (solicitud.tratamiento || "—"),
    "Día y hora preferida: " + (solicitud.diaHoraPreferida || "—"),
    "Cómo se enteró: " + (solicitud.comoSeEntero || "—"),
    "Origen: " + (solicitud.origen || "Reserva"),
    "Registro: " + fechaRegistro_(solicitud.registradoEn),
  ];
  if (enlace) lineas.push("", "WhatsApp: " + enlace);
  return lineas.join("\n");
}

function escaparHtml_(valor) {
  return String(valor == null ? "" : valor)
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;");
}

function json_(obj) {
  return ContentService.createTextOutput(JSON.stringify(obj)).setMimeType(
    ContentService.MimeType.JSON,
  );
}
```
