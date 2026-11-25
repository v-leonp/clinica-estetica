import Link from "next/link";

import BrandLogo from "~/components/BrandLogo";

export default function AuthCard({
  title,
  lede,
  children,
}: {
  title: string;
  lede: string;
  children: React.ReactNode;
}) {
  return (
    <div className="min-h-screen bg-gradient-cream px-4 py-12">
      <div className="mx-auto w-full max-w-md rounded-3xl border border-cream-200 bg-white p-8 shadow-soft">
        <BrandLogo />
        <h1 className="mt-6 font-serif text-3xl uppercase text-ink-900">{title}</h1>
        <p className="mt-3 leading-relaxed text-ink-700">{lede}</p>
        {children}
        <p className="mt-8 text-sm text-ink-700">
          <Link href="/" className="text-gold-ink underline-offset-4 hover:underline">
            Volver al sitio público
          </Link>
        </p>
      </div>
    </div>
  );
}
