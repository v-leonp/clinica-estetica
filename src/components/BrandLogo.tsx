import Image from "next/image";

type Props = {
  variant?: "header" | "footer";
};

/** Logotipo oficial (PNG recortado, fondo transparente). */
export default function BrandLogo({ variant = "header" }: Props) {
  const img = (
    <Image
      src="/brand/logo-dra-melissa-vigo.png"
      alt="Dra. Melissa Vigo – Médico Estético"
      width={900}
      height={692}
      priority={variant === "header"}
      className={
        variant === "header"
          ? "h-[4.25rem] w-auto md:h-24"
          : "h-20 w-auto"
      }
    />
  );

  if (variant === "footer") {
    return (
      <span className="inline-flex rounded-2xl bg-white px-3 py-2">{img}</span>
    );
  }

  return img;
}
