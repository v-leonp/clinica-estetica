import type { Metadata } from "next";

export const metadata: Metadata = {
  title: { absolute: "Área interna" },
  robots: {
    index: false,
    follow: false,
    nocache: true,
    googleBot: { index: false, follow: false, noimageindex: true },
  },
};

export default function PrivateAreaLayout({ children }: { children: React.ReactNode }) {
  return children;
}
