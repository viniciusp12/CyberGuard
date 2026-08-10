export function PageHeader({
  numero,
  eyebrow,
  title,
  description,
}: {
  /** Número da peça no laudo, ex. "02". Puramente organizador. */
  numero?: string;
  eyebrow: string;
  title: string;
  description?: string;
}) {
  return (
    <section className="border-b border-line pt-14 pb-12 md:pt-20 md:pb-16">
      <div className="container-page">
        <p className="label-field flex items-center gap-3">
          {numero && <span className="text-signal-amber">{numero}</span>}
          <span>{eyebrow}</span>
        </p>
        <h1 className="mt-5 max-w-4xl font-mono text-title font-semibold text-balance">
          {title}
        </h1>
        {description && (
          <p className="mt-6 max-w-2xl text-bodyLg text-ink-2 text-pretty">
            {description}
          </p>
        )}
      </div>
    </section>
  );
}
