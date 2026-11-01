import type { MetadataRoute } from "next";

import { allTreatments, categoriesFull, teamMembers } from "~/data/content";
import { getSiteUrl } from "~/lib/site-url";

export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date();
  const base = getSiteUrl();

  const staticRoutes = [
    "",
    "/tratamientos",
    "/equipo",
    "/reservar",
    "/preguntas-frecuentes",
    "/promociones",
    "/nosotros",
    "/tecnologia",
    "/sedes",
    "/contacto",
    "/privacidad",
    "/cookies",
    "/aviso-legal",
    "/condiciones-reserva",
  ];

  const entries: MetadataRoute.Sitemap = staticRoutes.map((path) => ({
    url: `${base}${path}` || base,
    lastModified: now,
    changeFrequency: "monthly",
    priority: path === "" ? 1 : 0.7,
  }));

  for (const cat of categoriesFull) {
    entries.push({
      url: `${base}/tratamientos/${cat.slug}`,
      lastModified: now,
      changeFrequency: "monthly",
      priority: 0.7,
    });
  }

  for (const { category, treatment } of allTreatments) {
    entries.push({
      url: `${base}/tratamientos/${category.slug}/${treatment.slug}`,
      lastModified: now,
      changeFrequency: "monthly",
      priority: 0.6,
    });
  }

  for (const member of teamMembers) {
    entries.push({
      url: `${base}/equipo/${member.slug}`,
      lastModified: now,
      changeFrequency: "monthly",
      priority: 0.6,
    });
  }

  return entries;
}
