import Image from "next/image";

import type { ClinicPhoto as Photo } from "~/data/clinic-photos";

type Props = {
  photo: Photo;
  sizes: string;
  priority?: boolean;
  className?: string;
  /** En retratos, prioriza el rostro. */
  focus?: "center" | "top";
};

export default function ClinicPhoto({
  photo,
  sizes,
  priority = false,
  className = "",
  focus,
}: Props) {
  const ratio = photo.ratio === "portrait" ? "aspect-[3/4]" : "aspect-[3/2]";
  const position =
    focus === "top" || (focus !== "center" && photo.ratio === "portrait")
      ? "object-top"
      : "object-center";

  return (
    <div
      className={`relative overflow-hidden bg-cream-100 ${ratio} ${className}`}
    >
      <Image
        src={photo.src}
        alt={photo.alt}
        fill
        sizes={sizes}
        priority={priority}
        quality={80}
        className={`object-cover ${position}`}
      />
    </div>
  );
}
