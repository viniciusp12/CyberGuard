import type { Metadata } from "next";
import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { PageHeader } from "@/components/layout/PageHeader";
import { AmeacasCards } from "./AmeacasCards";

export const metadata: Metadata = {
  title: "Principais ameaças",
  description:
    "Conheça as principais ameaças cibernéticas que afetam colaboradores do varejo e como elas funcionam.",
};

export default function AmeacasPage() {
  return (
    <>
      <PageHeader
        eyebrow="Ameaças"
        title="Conheça o inimigo antes dele chegar até você"
        description="Para se defender, é preciso entender como os ataques funcionam. Abaixo estão as principais ameaças enfrentadas por colaboradores do varejo hoje."
      />

      <section className="py-24 md:py-32">
        <div className="container-page">
          <AmeacasCards />
        </div>
      </section>

      <section className="py-24 border-t border-surface-border bg-surface">
        <div className="container-page text-center max-w-3xl mx-auto">
          <p className="font-mono text-xs uppercase tracking-[0.25em] text-accent mb-4">
            — Próximo passo
          </p>
          <h2 className="font-display text-4xl md:text-5xl font-semibold tracking-tight text-balance">
            Agora que você conhece as ameaças, aprenda a se proteger
          </h2>
          <Link
            href="/prevencao"
            className="mt-10 inline-flex items-center gap-3 rounded-full bg-accent px-8 py-4 text-sm font-medium text-background hover:bg-accent/90 transition-all"
          >
            Ver como prevenir
            <ArrowUpRight className="h-4 w-4" />
          </Link>
        </div>
      </section>
    </>
  );
}
