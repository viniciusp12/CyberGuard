"use client";

import { motion } from "framer-motion";
import { Mail, MapPin, MessageSquare } from "lucide-react";

const CONTACTS = [
  {
    icon: Mail,
    title: "E-mail",
    value: "contato@cyberguard.dev",
    href: "mailto:contato@cyberguard.dev",
  },
  {
    icon: MessageSquare,
    title: "Suporte interno",
    value: "suporte.cyberguard@leroymerlin.com.br",
    href: "mailto:suporte.cyberguard@leroymerlin.com.br",
  },
  {
    icon: MapPin,
    title: "Localização",
    value: "Faculdade de Defesa Cibernética — Challenge Leroy Merlin",
  },
];

const listVariant = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.13, delayChildren: 0.05 } },
};

const cardVariant = {
  hidden: { opacity: 0, y: 40, scale: 0.96 },
  visible: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: { duration: 0.65, ease: [0.16, 1, 0.3, 1] },
  },
};

export function ContatoCards() {
  return (
    <motion.div
      className="lg:col-span-5 space-y-6"
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.3, margin: "-80px 0px" }}
      variants={listVariant}
    >
      {CONTACTS.map((c) => {
        const Icon = c.icon;
        const card = (
          <motion.div
            variants={cardVariant}
            className="flex items-start gap-5 rounded-2xl border border-surface-border bg-surface-elevated/50 p-6 card-hover overflow-hidden conic-border-active-accent"
          >
            <div className="flex h-12 w-12 flex-shrink-0 items-center justify-center rounded-xl border border-accent/20 bg-accent/5">
              <Icon className="h-5 w-5 text-accent" strokeWidth={2} />
            </div>
            <div>
              <p className="font-mono text-[10px] uppercase tracking-wider text-foreground/40 mb-1">
                {c.title}
              </p>
              <p className="text-foreground/90">{c.value}</p>
            </div>
          </motion.div>
        );

        return c.href ? (
          <a key={c.title} href={c.href} className="block">
            {card}
          </a>
        ) : (
          <div key={c.title}>{card}</div>
        );
      })}
    </motion.div>
  );
}
