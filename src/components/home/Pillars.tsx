"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { Brain, Target, Users, Sparkles, ArrowUpRight } from "lucide-react";
import { SectionHeading } from "@/components/ui/SectionHeading";

const PILLARS = [
  {
    icon: Brain,
    title: "Conhecimento aplicado",
    description:
      "Conteúdo baseado em ameaças reais enfrentadas pelo varejo, com exemplos práticos do dia a dia do colaborador.",
    href: "/ameacas",
  },
  {
    icon: Target,
    title: "Prática direcionada",
    description:
      "Simulações de phishing, desafios de senhas e cenários reais para treinar o reflexo de segurança.",
    href: "/prevencao",
  },
  {
    icon: Users,
    title: "Cultura coletiva",
    description:
      "Ranking entre equipes e lojas, estimulando colaboração e tornando a segurança responsabilidade de todos.",
    href: "/sobre",
  },
  {
    icon: Sparkles,
    title: "Engajamento gamificado",
    description:
      "Pontos, conquistas e níveis transformam o aprendizado em uma experiência contínua e prazerosa.",
    href: "/sobre",
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

const gridVariant = {
  hidden: {},
  visible: {
    transition: { staggerChildren: 0.12, delayChildren: 0.1 },
  },
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

export function Pillars() {
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
            eyebrow="Pilares da plataforma"
            title="Uma abordagem completa para proteger o negócio"
            description="Combinamos conteúdo técnico, prática dirigida e gamificação para transformar colaboradores em uma linha de defesa ativa."
          />
        </motion.div>

        <motion.div
          className="mt-16 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.1 }}
          variants={gridVariant}
        >
          {PILLARS.map((pillar) => {
            const Icon = pillar.icon;
            return (
              <motion.div key={pillar.title} variants={cardVariant}>
                <Link
                  href={pillar.href}
                  className="group relative flex flex-col h-full rounded-2xl border border-surface-border bg-surface-elevated/50 p-8 card-hover overflow-hidden"
                >
                  <div className="absolute top-0 right-0 p-4 opacity-0 group-hover:opacity-100 transition-opacity">
                    <ArrowUpRight className="h-4 w-4 text-accent" />
                  </div>
                  <div className="relative flex h-12 w-12 items-center justify-center rounded-xl border border-accent/20 bg-accent/5 mb-6">
                    <Icon className="h-5 w-5 text-accent" strokeWidth={2} />
                  </div>
                  <p className="font-mono text-[10px] text-foreground/40 mb-2">
                    0{PILLARS.indexOf(pillar) + 1}
                  </p>
                  <h3 className="font-display text-xl font-semibold mb-3">
                    {pillar.title}
                  </h3>
                  <p className="text-sm text-foreground/60 leading-relaxed">
                    {pillar.description}
                  </p>
                </Link>
              </motion.div>
            );
          })}
        </motion.div>
      </div>
    </section>
  );
}
