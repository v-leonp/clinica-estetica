import { partnerBrands } from "~/data/content";

export default function PartnerBrandsBar() {
  return (
    <section aria-label="Compromisos de calidad" className="border-b border-cream-200 bg-white py-8">
      <div className="container-x">
        <p className="text-center text-xs font-medium uppercase tracking-[0.2em] text-ink-500">
          Trabajamos con los más altos estándares
        </p>
        <ul className="mt-6 flex flex-wrap items-center justify-center gap-x-8 gap-y-3">
          {partnerBrands.map((name) => (
            <li
              key={name}
              className="rounded-full border border-cream-200 bg-cream-50 px-4 py-2 text-xs font-medium text-ink-700"
            >
              {name}
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
