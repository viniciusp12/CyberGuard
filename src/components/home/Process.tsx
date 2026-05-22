"use client";

import { motion } from "framer-motion";
import { SectionHeading } from "@/components/ui/SectionHeading";

const STEPS = [
  {
    n: "01",
    title: "Cadastro & diagnóstico",
    text: "O colaborador cria sua conta com e-mail corporativo e faz um diagnóstico inicial que mapeia seu nível atual de maturidade em segurança.",
  },
  {
    n: "02",
    title: "Trilha personalizada",
    text: "Com base no diagnóstico, a plataforma libera módulos prioritários: phishing, senhas, engenharia social, LGPD, dispositivos móveis e mais.",
  },
  {
    n: "03",
    title: "Prática em cenários reais",
    text: "Simulações interativas, quizzes e desafios gamificados reforçam o aprendizado com contextos do varejo — loja, estoque, atendimento.",
  },
  {
    n: "04",
    title: "Evolução contínua",
    text: "Pontos, conquistas e ranking entre equipes mantêm o engajamento. Líderes acompanham a evolução em painéis por loja e departamento.",
  },
];

const headingVariant = {
  hidden: { opacity: 0, y: 40 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.75, ease: [0.16, 1, 0.3, 1] },
  },
};

const listVariant = {
  hidden: {},
  visible: {
    transition: { staggerChildren: 0.13, delayChildren: 0.1 },
  },
};

const rowVariant = {
  hidden: { opacity: 0, x: -36 },
  visible: {
    opacity: 1,
    x: 0,
    transition: { duration: 0.65, ease: [0.16, 1, 0.3, 1] },
  },
};

export function Process() {
  return (
    <section className="py-24 md:py-32">
      <div className="container-page">
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.3 }}
          variants={headingVariant}
        >
          <SectionHeading
            eyebrow="Como funciona"
            title="Quatro passos para transformar risco em cultura"
          />
        </motion.div>

        <motion.div
          className="mt-16 space-y-px bg-surface-border rounded-2xl overflow-hidden border border-surface-border"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.1 }}
          variants={listVariant}
        >
          {STEPS.map((step) => (
            <motion.div
              key={step.n}
              variants={rowVariant}
              className="group bg-background hover:bg-surface-elevated transition-colors p-8 md:p-12 grid grid-cols-12 gap-6 items-start"
            >
              <div className="col-span-12 md:col-span-2">
                <p className="font-mono text-sm text-accent">{step.n}</p>
              </div>
              <div className="col-span-12 md:col-span-4">
                <h3 className="font-display text-2xl md:text-3xl font-semibold">
                  {step.title}
                </h3>
              </div>
              <div className="col-span-12 md:col-span-6">
                <p className="text-base text-foreground/60 leading-relaxed">
                  {step.text}
                </p>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
