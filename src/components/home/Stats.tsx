"use client";

import { motion } from "framer-motion";

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
    transition: { staggerChildren: 0.1, delayChildren: 0.15 },
  },
};

const cellVariant = {
  hidden: { opacity: 0, y: 32, filter: "blur(6px)" },
  visible: {
    opacity: 1,
    y: 0,
    filter: "blur(0px)",
    transition: { duration: 0.7, ease: [0.16, 1, 0.3, 1] },
  },
};

export function Stats() {
  return (
    <section className="py-24 md:py-32 border-y border-surface-border bg-surface">
      <div className="container-page">
        <motion.div
          className="max-w-3xl mb-16"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.5, margin: "-80px 0px" }}
          variants={headingVariant}
        >
          <p className="font-mono text-xs uppercase tracking-[0.25em] text-accent mb-4">
            — O problema em números
          </p>
          <h2 className="font-display text-4xl md:text-5xl lg:text-6xl font-semibold tracking-tight text-balance">
            A ameaça é real, silenciosa <br />
            e cada vez mais sofisticada
          </h2>
        </motion.div>

        <motion.div
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-px bg-surface-border rounded-2xl overflow-hidden border border-surface-border"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.3, margin: "-80px 0px" }}
          variants={gridVariant}
        >
          {STATS.map((stat) => (
            <motion.div
              key={stat.label}
              variants={cellVariant}
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
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
