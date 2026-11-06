export default function LegalProse({ children }: { children: React.ReactNode }) {
  return (
    <div className="prose-legal mx-auto max-w-3xl space-y-4 body-copy text-sm leading-relaxed text-ink-700">
      {children}
    </div>
  );
}
