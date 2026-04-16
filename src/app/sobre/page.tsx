import type { Metadata } from "next";
import Link from "next/link";
import { ArrowUpRight, CheckCircle2 } from "lucide-react";
import { PageHeader } from "@/components/layout/PageHeader";

export const metadata: Metadata = {
  title: "Quem somos",
  description:
    "Conheça o CyberGuard, programa de conscientização em segurança cibernética em parceria com a Leroy Merlin.",
};

const VALUES = [
  {
    title: "Seriedade",
    text: "Tratamos segurança como ela é: uma questão crítica que afeta pessoas, dados e a continuidade do negócio.",
  },
  {
    title: "Clareza",
    text: "Sem jargão desnecessário. Conteúdo direto, prático e aplicável ao dia a dia de quem está na loja ou no escritório.",
  },
  {
    title: "Engajamento",
    text: "Aprender não precisa ser chato. Gameficação, desafios e feedback imediato tornam a jornada prazerosa.",
  },
  {
    title: "Medição",
    text: "O que não se mede não melhora. Indicadores claros ajudam líderes a acompanhar a evolução da cultura.",
  },
];

const OBJECTIVES = [
  "Reduzir em 60% os incidentes associados a erro humano em 12 meses",
  "Atingir 90% de colaboradores ativos na plataforma no primeiro trimestre",
  "Garantir que 100% das novas contratações passem pelo onboarding de segurança",
  "Criar um ranking saudável entre lojas que incentive a melhoria contínua",
];

export default function SobrePage() {
  return (
    <>
      <PageHeader
        eyebrow="Quem somos"
        title="Transformando conhecimento em proteção real"
        description="O CyberGuard nasceu de um Challenge acadêmico em parceria com a Leroy Merlin: criar uma plataforma de conscientização cibernética capaz de engajar milhares de colaboradores e transformar segurança em cultura viva."
      />

      <section className="py-24 md:py-32">
        <div className="container-page grid grid-cols-1 lg:grid-cols-12 gap-12">
          <div className="lg:col-span-5">
            <p className="font-mono text-xs uppercase tracking-[0.25em] text-accent mb-6">
              — Nossa missão
            </p>
            <h2 className="font-display text-4xl md:text-5xl font-semibold tracking-tight text-balance">
              Pessoas protegidas, negócios resilientes
            </h2>
          </div>
          <div className="lg:col-span-7 space-y-6 text-foreground/70 leading-relaxed text-lg">
            <p>
              Mais de 80% dos incidentes cibernéticos envolvem algum tipo de erro
              humano — um clique em um link errado, uma senha reutilizada, um
              arquivo aberto sem verificação. Por trás de cada estatística, há
              uma pessoa que não teve a oportunidade de aprender sobre o risco.
            </p>
            <p>
              Nossa missão é mudar essa realidade dentro da Leroy Merlin:
              transformar cada colaborador em uma linha de defesa ativa, capaz
              de identificar ameaças, reagir com calma e proteger o que é valioso
              — desde dados de clientes até a operação das lojas.
            </p>
            <p>
              Fazemos isso com conteúdo sério, construído a partir de frameworks
              reconhecidos (NIST, ISO 27001, CIS Controls), adaptado à realidade
              do varejo e entregue em formato gameficado para maximizar
              engajamento e retenção.
            </p>
          </div>
        </div>
      </section>

      <section className="py-24 border-y border-surface-border bg-surface">
        <div className="container-page">
          <div className="max-w-3xl mb-16">
            <p className="font-mono text-xs uppercase tracking-[0.25em] text-accent mb-4">
              — Nossos valores
            </p>
            <h2 className="font-display text-4xl md:text-5xl font-semibold tracking-tight">
              O que nos move.
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5">
            {VALUES.map((v, i) => (
              <div
                key={v.title}
                className="rounded-2xl border border-surface-border bg-background p-8 card-hover"
              >
                <p className="font-mono text-xs text-accent mb-6">0{i + 1}</p>
                <h3 className="font-display text-2xl font-semibold mb-3">
                  {v.title}
                </h3>
                <p className="text-sm text-foreground/60 leading-relaxed">
                  {v.text}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-24 md:py-32">
        <div className="container-page grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
          <div className="lg:col-span-5">
            <p className="font-mono text-xs uppercase tracking-[0.25em] text-accent mb-6">
              — Objetivos do Challenge
            </p>
            <h2 className="font-display text-4xl md:text-5xl font-semibold tracking-tight text-balance">
              Metas claras, resultados mensuráveis
            </h2>
            <p className="mt-6 text-foreground/60 leading-relaxed text-lg">
              O projeto foi desenhado com metas quantitativas que permitem avaliar
              o impacto real da plataforma no primeiro ano de implantação.
            </p>
          </div>
          <div className="lg:col-span-7">
            <ul className="space-y-4">
              {OBJECTIVES.map((obj) => (
                <li
                  key={obj}
                  className="flex items-start gap-4 rounded-2xl border border-surface-border bg-surface-elevated/50 p-6 card-hover"
                >
                  <CheckCircle2
                    className="h-5 w-5 text-accent flex-shrink-0 mt-0.5"
                    strokeWidth={2}
                  />
                  <span className="text-foreground/80 leading-relaxed">{obj}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </section>

      <section className="py-24 border-t border-surface-border bg-surface">
        <div className="container-page text-center">
          <p className="font-mono text-xs uppercase tracking-[0.25em] text-accent mb-4">
            — Próximo passo
          </p>
          <h2 className="font-display text-4xl md:text-5xl font-semibold tracking-tight max-w-3xl mx-auto text-balance">
            Quer entender quais ameaças você enfrenta no dia a dia
          </h2>
          <Link
            href="/ameacas"
            className="mt-10 inline-flex items-center gap-3 rounded-full bg-accent px-8 py-4 text-sm font-medium text-background hover:bg-accent/90 transition-all"
          >
            Ver principais ameaças
            <ArrowUpRight className="h-4 w-4" />
          </Link>
        </div>
      </section>
    </>
  );
}
