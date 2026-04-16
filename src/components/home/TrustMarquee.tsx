const ITEMS = [
  "Phishing",
  "Engenharia Social",
  "Ransomware",
  "Vazamento de Dados",
  "LGPD",
  "Senhas Fortes",
  "MFA",
  "Wi-Fi Público",
  "Dispositivos Móveis",
  "Backup",
];

export function TrustMarquee() {
  return (
    <section className="border-y border-surface-border bg-surface py-8 overflow-hidden">
      <div className="flex whitespace-nowrap animate-marquee">
        {[...ITEMS, ...ITEMS].map((item, i) => (
          <div
            key={i}
            className="flex items-center gap-8 px-8 font-display text-2xl md:text-3xl text-foreground/40"
          >
            <span>{item}</span>
            <span className="text-accent">◆</span>
          </div>
        ))}
      </div>
    </section>
  );
}
