"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowUpRight, CheckCircle2 } from "lucide-react";

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

const fadeUp = {
  hidden: { opacity: 0, y: 40 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.75, ease: [0.16, 1, 0.3, 1] } },
};

const fadeLeft = {
  hidden: { opacity: 0, x: -40 },
  visible: { opacity: 1, x: 0, transition: { duration: 0.75, ease: [0.16, 1, 0.3, 1] } },
};

const fadeRight = {
  hidden: { opacity: 0, x: 40 },
  visible: { opacity: 1, x: 0, transition: { duration: 0.75, ease: [0.16, 1, 0.3, 1] } },
};

const gridVariant = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.12, delayChildren: 0.1 } },
};

const cardVariant = {
  hidden: { opacity: 0, y: 48, scale: 0.96 },
  visible: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: { duration: 0.65, ease: [0.16, 1, 0.3, 1] },
  },
};

const listVariant = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.1, delayChildren: 0.1 } },
};

const listItemVariant = {
  hidden: { opacity: 0, x: 32 },
  visible: {
    opacity: 1,
    x: 0,
    transition: { duration: 0.6, ease: [0.16, 1, 0.3, 1] },
  },
};

const VP = { once: true, margin: "-80px 0px" } as const;

export function SobreContent() {
  return (
    <>
      {/* Missão */}
      <section className="py-24 md:py-32">
        <div className="container-page grid grid-cols-1 lg:grid-cols-12 gap-12">
          <motion.div
            className="lg:col-span-5"
            initial="hidden"
            whileInView="visible"
            viewport={{ ...VP, amount: 0.4 }}
            variants={fadeLeft}
          >
            <p className="font-mono text-xs uppercase tracking-[0.25em] text-accent mb-6">
              — Nossa missão
            </p>
            <h2 className="font-display text-4xl md:text-5xl font-semibold tracking-tight text-balance">
              Pessoas protegidas, negócios resilientes
            </h2>
          </motion.div>

          <motion.div
            className="lg:col-span-7 space-y-6 text-foreground/70 leading-relaxed text-lg"
            initial="hidden"
            whileInView="visible"
            viewport={{ ...VP, amount: 0.4 }}
            variants={fadeRight}
          >
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
          </motion.div>
        </div>
      </section>

      {/* Valores */}
      <section className="py-24 border-y border-surface-border bg-surface">
        <div className="container-page">
          <motion.div
            className="max-w-3xl mb-16"
            initial="hidden"
            whileInView="visible"
            viewport={{ ...VP, amount: 0.5 }}
            variants={fadeUp}
          >
            <p className="font-mono text-xs uppercase tracking-[0.25em] text-accent mb-4">
              — Nossos valores
            </p>
            <h2 className="font-display text-4xl md:text-5xl font-semibold tracking-tight">
              O que nos move.
            </h2>
          </motion.div>

          <motion.div
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5"
            initial="hidden"
            whileInView="visible"
            viewport={{ ...VP, amount: 0.2 }}
            variants={gridVariant}
          >
            {VALUES.map((v, i) => (
              <motion.div
                key={v.title}
                variants={cardVariant}
                className="rounded-2xl border border-surface-border bg-background p-8 card-hover overflow-hidden conic-border-active-accent"
              >
                <p className="font-mono text-xs text-accent mb-6">0{i + 1}</p>
                <h3 className="font-display text-2xl font-semibold mb-3">
                  {v.title}
                </h3>
                <p className="text-sm text-foreground/60 leading-relaxed">
                  {v.text}
                </p>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Objetivos */}
      <section className="py-24 md:py-32">
        <div className="container-page grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
          <motion.div
            className="lg:col-span-5"
            initial="hidden"
            whileInView="visible"
            viewport={{ ...VP, amount: 0.4 }}
            variants={fadeLeft}
          >
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
          </motion.div>

          <motion.ul
            className="lg:col-span-7 space-y-4"
            initial="hidden"
            whileInView="visible"
            viewport={{ ...VP, amount: 0.2 }}
            variants={listVariant}
          >
            {OBJECTIVES.map((obj) => (
              <motion.li
                key={obj}
                variants={listItemVariant}
                className="flex items-start gap-4 rounded-2xl border border-surface-border bg-surface-elevated/50 p-6 card-hover overflow-hidden conic-border-active-accent"
              >
                <CheckCircle2
                  className="h-5 w-5 text-accent flex-shrink-0 mt-0.5"
                  strokeWidth={2}
                />
                <span className="text-foreground/80 leading-relaxed">{obj}</span>
              </motion.li>
            ))}
          </motion.ul>
        </div>
      </section>

      {/* CTA */}
      <section className="py-24 border-t border-surface-border bg-surface">
        <motion.div
          className="container-page text-center"
          initial="hidden"
          whileInView="visible"
          viewport={{ ...VP, amount: 0.4 }}
          variants={fadeUp}
        >
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
        </motion.div>
      </section>
    </>
  );
}
