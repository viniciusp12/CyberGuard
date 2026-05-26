"use client";

import { motion } from "framer-motion";

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
    <motion.section
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
      viewport={{ once: true, amount: 0.7 }}
      transition={{ duration: 0.8, ease: "easeOut" }}
      className="border-y border-surface-border bg-surface py-8 overflow-hidden"
    >
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
    </motion.section>
  );
}
