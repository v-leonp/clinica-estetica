import Image from "next/image";

const ALT =
  "Retrato de la Dra. Melissa Vigo con los brazos cruzados, frente al letrero de su marca.";
const SRC = "/fotos/clinica/06-retrato-doctora-brazos-cruzados.jpg";

/** Misma resolución nativa (1086×1448). El ancho CSS queda por debajo de 543 px. */
const PROFILE_MAX = 360;

type Props = {
  /** avatar: círculo en fichas. profile: retrato completo en su página. */
  variant?: "avatar" | "profile";
  className?: string;
};

export default function DoctorPortrait({
  variant = "avatar",
  className = "h-28 w-28",
}: Props) {
  if (variant === "profile") {
    return (
      <Image
        src={SRC}
        alt={ALT}
        width={1086}
        height={1448}
        quality={90}
        sizes={`(max-width: 767px) min(100vw - 2.5rem, ${PROFILE_MAX}px), ${PROFILE_MAX}px`}
        className="h-auto w-full rounded-2xl object-cover object-top shadow-soft"
        style={{ maxWidth: PROFILE_MAX }}
      />
    );
  }

  return (
    <span
      className={`relative mx-auto block overflow-hidden rounded-full ${className}`}
    >
      <Image
        src={SRC}
        alt={ALT}
        fill
        quality={90}
        sizes="144px"
        className="object-cover object-top"
      />
    </span>
  );
}
