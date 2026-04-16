import Link from "next/link";
import { ArrowUpRight } from "lucide-react";

export function CTA() {
  return (
    <section className="py-24 md:py-32">
      <div className="container-page">
        <div className="relative overflow-hidden rounded-3xl border border-accent/20 bg-surface-elevated p-12 md:p-20 text-center glow-border">
          <div className="absolute inset-0 bg-grid-pattern [background-size:32px_32px] opacity-30" />
          <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 h-[400px] w-[600px] rounded-full bg-accent/5 blur-[100px]" />

          <div className="relative">
            <p className="font-mono text-xs uppercase tracking-[0.25em] text-accent mb-4">
              — Hora de começar
            </p>
            <h2 className="font-display text-4xl md:text-6xl font-semibold tracking-tighter max-w-3xl mx-auto text-balance">
              Faça parte da linha de defesa da sua empresa
            </h2>
            <p className="mt-6 max-w-xl mx-auto text-foreground/60 text-lg">
              Cadastre-se com seu e-mail corporativo e comece sua trilha de
              conscientização em menos de um minuto.
            </p>
            <div className="mt-10 flex flex-col sm:flex-row items-center justify-center gap-4">
              <Link
                href="/registro"
                className="group inline-flex items-center gap-3 rounded-full bg-accent px-8 py-4 text-sm font-medium text-background hover:bg-accent/90 transition-all"
              >
                Criar minha conta
                <ArrowUpRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
              </Link>
              <Link
                href="/contato"
                className="rounded-full border border-surface-border bg-background/50 px-8 py-4 text-sm text-foreground/80 hover:text-foreground hover:border-accent/40 transition-colors"
              >
                Falar com a equipe
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
