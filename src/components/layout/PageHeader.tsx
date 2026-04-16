export function PageHeader({
  eyebrow,
  title,
  description,
}: {
  eyebrow: string;
  title: string;
  description?: string;
}) {
  return (
    <section className="relative pt-32 pb-20 md:pt-40 md:pb-28 border-b border-surface-border overflow-hidden">
      <div className="absolute inset-0 -z-10 bg-grid-pattern [background-size:64px_64px] [mask-image:radial-gradient(ellipse_at_top,black,transparent_70%)]" />
      <div className="absolute left-1/2 top-0 -z-10 h-[400px] w-[700px] -translate-x-1/2 rounded-full bg-accent/5 blur-[120px]" />

      <div className="container-page">
        <p className="font-mono text-xs uppercase tracking-[0.25em] text-accent mb-6">
          — {eyebrow}
        </p>
        <h1 className="font-display text-display font-semibold tracking-tighter text-balance max-w-4xl">
          {title}
        </h1>
        {description && (
          <p className="mt-8 max-w-2xl text-lg text-foreground/60 leading-relaxed">
            {description}
          </p>
        )}
      </div>
    </section>
  );
}
