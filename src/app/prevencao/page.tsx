import type { Metadata } from "next";
import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { PageHeader } from "@/components/layout/PageHeader";
import { PrevencaoCards, IncidentCards } from "./PrevencaoCards";

export const metadata: Metadata = {
  title: "Prevenção",
  description:
    "Boas práticas de segurança cibernética que todo colaborador pode aplicar no dia a dia.",
};

export default function PrevencaoPage() {
  return (
    <>
      <PageHeader
        eyebrow="Prevenção"
        title="Práticas simples, impacto enorme"
        description="Segurança não depende de ferramentas mágicas — depende de hábitos construídos um por um. Aqui estão as práticas que mais importam no dia a dia."
      />

      <section className="py-24 md:py-32">
        <div className="container-page">
          <PrevencaoCards />
        </div>
      </section>

      <section className="py-24 border-y border-surface-border bg-surface">
        <div className="container-page">
          <div className="max-w-3xl mb-16">
            <p className="font-mono text-xs uppercase tracking-[0.25em] text-accent mb-4">
              — Em caso de incidente
            </p>
            <h2 className="font-display text-4xl md:text-5xl font-semibold tracking-tight text-balance">
              O que fazer se algo der errado
            </h2>
            <p className="mt-6 text-foreground/60 leading-relaxed text-lg">
              Mesmo com todo cuidado, incidentes acontecem. O mais importante é
              saber reagir nas primeiras horas, quando o impacto pode ser contido.
            </p>
          </div>

          <IncidentCards />
        </div>
      </section>

      <section className="py-24 md:py-32">
        <div className="container-page text-center">
          <p className="font-mono text-xs uppercase tracking-[0.25em] text-accent mb-4">
            — Coloque em prática
          </p>
          <h2 className="font-display text-4xl md:text-5xl font-semibold tracking-tight max-w-3xl mx-auto text-balance">
            Treine esses reflexos em cenários reais
          </h2>
          <p className="mt-6 max-w-xl mx-auto text-foreground/60 text-lg">
            Crie sua conta e comece a trilha interativa com simulações, desafios
            e feedback imediato.
          </p>
          <Link
            href="/registro"
            className="mt-10 inline-flex items-center gap-3 rounded-full bg-accent px-8 py-4 text-sm font-medium text-background hover:bg-accent/90 transition-all"
          >
            Começar agora
            <ArrowUpRight className="h-4 w-4" />
          </Link>
        </div>
      </section>
    </>
  );
}
