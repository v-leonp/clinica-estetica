const messages: Record<string, string> = {
  invitado: "Invitación enviada. La persona crea su propia contraseña con el enlace.",
  "invitado-log":
    "La cuenta quedó creada. El correo no está configurado: el enlace de un solo uso está en los logs del servidor, no en esta pantalla.",
  guardado: "Cambios guardados.",
  desactivado: "Quedó desactivado. El registro se conserva y se puede volver a activar.",
  activado: "Quedó activo de nuevo.",
  enlace: "Enlace enviado. Quien administra no ve la contraseña.",
  "enlace-log":
    "El enlace quedó en los logs del servidor porque el correo no está configurado. No aparece en esta pantalla.",
  creado: "Tratamiento añadido al catálogo interno. Sin precio.",
};

export default function Notice({
  aviso,
  error,
}: {
  aviso?: string;
  error?: string;
}) {
  if (error) {
    return (
      <p role="alert" className="mb-4 rounded-2xl border border-gold/40 bg-rose-blush px-4 py-3 text-sm text-ink-900">
        {error}
      </p>
    );
  }
  if (!aviso || !messages[aviso]) return null;
  return (
    <p role="status" className="mb-4 rounded-2xl border border-cream-200 bg-white px-4 py-3 text-sm text-ink-700">
      {messages[aviso]}
    </p>
  );
}
