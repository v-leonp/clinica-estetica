import "~/styles/globals.css";

import type { Metadata, Viewport } from "next";
import localFont from "next/font/local";
import { Cormorant_Garamond } from "next/font/google";

import { TRPCReactProvider } from "~/trpc/react";
import { site } from "~/data/content";
import { getSiteUrl } from "~/lib/site-url";

/**
 * Títulos: Nexa Bold. Cuerpo: Nexa Light. Licencia Fontfabric (free fonts)
 * que permite @font-face comercial. Los archivos .otf no se modifican.
 *
 * El manual pide Gabriola para subtítulos, incluida la línea profesional
 * «Médico cirujano · Medicina estética». Esa licencia no permite uso web,
 * así que no está en el repositorio ni se sustituye por una imagen.
 * Esos subtítulos usan Cormorant Garamond Italic (OFL, Google Fonts).
 * Sustituir por Gabriola si se compra licencia web.
 */
const nexaBold = localFont({
  src: "../fonts/Nexa-Bold.otf",
  variable: "--font-nexa-bold",
  weight: "700",
  display: "swap",
});

const nexaLight = localFont({
  src: "../fonts/Nexa-Light.otf",
  variable: "--font-nexa-light",
  weight: "300",
  display: "swap",
});

const subtitle = Cormorant_Garamond({
  subsets: ["latin"],
  style: "italic",
  weight: "500",
  variable: "--font-cormorant",
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL(getSiteUrl()),
  title: {
    default: `${site.brandFull}`,
    template: `%s | ${site.brand}`,
  },
  description: site.description,
  applicationName: site.brand,
  keywords: [
    "medicina estética Lima",
    "Dra. Melissa Vigo",
    "médico estético",
    "toxina botulínica",
    "ácido hialurónico",
    "CMP 101245",
    site.brand,
  ],
  authors: [{ name: "Dra. Melissa Vigo" }],
  openGraph: {
    type: "website",
    locale: "es_PE",
    siteName: site.brand,
    title: site.brandFull,
    description: site.description,
    images: [
      {
        url: "/og.png",
        width: 1200,
        height: 630,
        alt: "Isotipo de Dra. Melissa Vigo – Médico Estético",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: site.brandFull,
    description: site.description,
    images: ["/og.png"],
  },
  robots: { index: true, follow: true },
  icons: [
    { rel: "icon", url: "/favicon.svg", type: "image/svg+xml" },
    { rel: "apple-touch-icon", url: "/apple-touch-icon.png" },
  ],
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  themeColor: "#183553",
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html
      lang="es-PE"
      className={`${nexaBold.variable} ${nexaLight.variable} ${subtitle.variable}`}
    >
      <body>
        <TRPCReactProvider>{children}</TRPCReactProvider>
      </body>
    </html>
  );
}
