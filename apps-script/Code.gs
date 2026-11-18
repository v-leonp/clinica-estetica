/**
 * Aviso de solicitudes de cita — Vigo Medical Estetic.
 *
 * Se pega en el Google Sheet (Extensiones → Apps Script) de la cuenta
 * vigomedicalestetic@gmail.com. Comprueba la firma, agrega una fila y
 * manda un correo.
 *
 * Propiedad del script (Configuración del proyecto → Propiedades del script):
 *   APPS_SCRIPT_SECRET  el mismo valor que en Vercel.
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
  hoja.appendRow([
    fechaRegistro_(solicitud.registradoEn),
    solicitud.nombre,
    solicitud.celular,
    solicitud.tratamiento || "—",
    solicitud.diaHoraPreferida || "—",
    solicitud.origen,
    "Nuevo",
  ]);
}

function obtenerHoja_() {
  var libro = SpreadsheetApp.getActiveSpreadsheet();
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
  if (hoja.getLastRow() > 0 && hoja.getRange(1, 1).getValue()) return;
  hoja.getRange(1, 1, 1, ENCABEZADOS.length).setValues([ENCABEZADOS]);
  hoja.getRange(1, 1, 1, ENCABEZADOS.length).setFontWeight("bold");
  hoja.setFrozenRows(1);
}

function asegurarEstados_(hoja) {
  var regla = SpreadsheetApp.newDataValidation()
    .requireValueInList(ESTADOS, true)
    .setAllowInvalid(false)
    .build();
  var filas = Math.max(hoja.getMaxRows() - 1, 50);
  hoja.getRange(2, 7, filas, 1).setDataValidation(regla);
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
