import "~/styles/globals.css";

import type { Metadata, Viewport } from "next";
import { Cormorant_Garamond, Inter } from "next/font/google";

import { TRPCReactProvider } from "~/trpc/react";
import { site } from "~/data/content";
import { getSiteUrl } from "~/lib/site-url";

const serif = Cormorant_Garamond({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  variable: "--font-serif",
  display: "swap",
});

const sans = Inter({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600"],
  variable: "--font-sans",
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL(getSiteUrl()),
  title: {
    default: `${site.brand} — ${site.tagline}`,
    template: `%s | ${site.brand}`,
  },
  description: site.description,
  applicationName: site.brand,
  keywords: [
    "medicina estética Lima",
    "cirugía plástica Lima",
    "tratamientos faciales",
    "depilación láser",
    "clínica estética Miraflores",
    "rejuvenecimiento facial",
    site.brand,
  ],
  authors: [{ name: site.brand }],
  // Note: no `alternates.canonical` here on purpose — a canonical on the
  // root layout cascades to every page including /_not-found, which Google
  // treats as duplicate content. Each page sets its own canonical.
  openGraph: {
    type: "website",
    locale: "es_PE",
    siteName: site.brand,
    title: `${site.brand} — ${site.tagline}`,
    description: site.description,
    images: [
      {
        url: "/og.svg",
        width: 1200,
        height: 630,
        alt: `${site.brand} — Medicina estética en Lima`,
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: `${site.brand} — ${site.tagline}`,
    description: site.description,
    images: ["/og.svg"],
  },
  robots: { index: true, follow: true },
  icons: [
    { rel: "icon", url: "/favicon.svg", type: "image/svg+xml" },
    { rel: "apple-touch-icon", url: "/favicon.svg" },
  ],
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  themeColor: "#fbf7f3",
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="es-PE" className={`${serif.variable} ${sans.variable}`}>
      <body>
        <TRPCReactProvider>{children}</TRPCReactProvider>
      </body>
    </html>
  );
}
