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
          ? "h-14 w-auto xl:h-[4.75rem]"
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
