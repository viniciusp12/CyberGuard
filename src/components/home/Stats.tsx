const STATS = [
  {
    value: "82%",
    label: "dos incidentes cibernéticos envolvem erro humano",
    source: "Verizon DBIR 2024",
  },
  {
    value: "3.4 bi",
    label: "de e-mails maliciosos são enviados por dia no mundo",
    source: "AAG IT Services",
  },
  {
    value: "R$ 6,7 mi",
    label: "é o custo médio de um vazamento de dados no Brasil",
    source: "IBM Cost of a Data Breach",
  },
  {
    value: "60%",
    label: "redução de incidentes após programas de conscientização",
    source: "SANS Institute",
  },
];

export function Stats() {
  return (
    <section className="py-24 md:py-32 border-y border-surface-border bg-surface">
      <div className="container-page">
        <div className="max-w-3xl mb-16">
          <p className="font-mono text-xs uppercase tracking-[0.25em] text-accent mb-4">
            — O problema em números
          </p>
          <h2 className="font-display text-4xl md:text-5xl lg:text-6xl font-semibold tracking-tight text-balance">
            A ameaça é real, silenciosa <br />
            e cada vez mais sofisticada
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-px bg-surface-border rounded-2xl overflow-hidden border border-surface-border">
          {STATS.map((stat) => (
            <div
              key={stat.label}
              className="bg-surface p-8 md:p-10 hover:bg-surface-elevated transition-colors"
            >
              <p className="font-display text-5xl md:text-6xl font-semibold text-accent tracking-tighter">
                {stat.value}
              </p>
              <p className="mt-4 text-sm text-foreground/80 leading-relaxed">
                {stat.label}
              </p>
              <p className="mt-6 font-mono text-[10px] uppercase tracking-wider text-foreground/40">
                Fonte: {stat.source}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
