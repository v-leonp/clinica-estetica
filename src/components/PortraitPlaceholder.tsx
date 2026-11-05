/** Retrato neutro: no hay fotografía autorizada de la doctora. */
export default function PortraitPlaceholder({
  name,
  className = "h-28 w-28",
}: {
  name: string;
  className?: string;
}) {
  const initials = name
    .replace(/^Dra\.\s*/i, "")
    .split(/\s+/)
    .filter(Boolean)
    .slice(0, 2)
    .map((part) => part[0]?.toUpperCase() ?? "")
    .join("");

  return (
    <div
      role="img"
      aria-label="Fotografía pendiente"
      className={`mx-auto flex items-center justify-center rounded-full border border-gold/50 bg-cream-100 font-serif text-3xl text-ink-900 ${className}`}
    >
      <span aria-hidden="true">{initials}</span>
    </div>
  );
}
