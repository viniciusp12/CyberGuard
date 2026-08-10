"use client";

import Link from "next/link";
import { motion, useReducedMotion } from "framer-motion";
import { maskReveal, stagger, staticVariants, VIEWPORT } from "@/lib/motion";

const SECOES = [
  {
    n: "01",
    href: "/senha",
    titulo: "Teste de senha",
    resumo:
      "Digite e veja o tempo de quebra despencar. Descubra por que “P@ssw0rd1” não é forte e por que quatro palavras aleatórias são.",
    acao: "interativo",
  },
  {
    n: "02",
    href: "/golpe",
    titulo: "Qual deles é golpe?",
    resumo:
      "Quatro pares de mensagens que chegam de verdade no Brasil. Escolha a fraude e veja os sinais marcados dentro do próprio texto.",
    acao: "interativo",
  },
  {
    n: "03",
    href: "/anatomia",
    titulo: "Como o golpe funciona por dentro",
    resumo:
      "A clonagem de WhatsApp passo a passo, do lado de quem aplica — e o ponto exato onde ela quebra.",
    acao: "leitura",
  },
  {
    n: "04",
    href: "/ia",
    titulo: "Inteligência artificial",
    resumo:
      "O que sai do seu aparelho quando você conversa com uma IA, o que ela mudou nos golpes — e por que as defesas antigas ainda funcionam.",
    acao: "interativo",
  },
  {
    n: "05",
    href: "/agora",
    titulo: "O que fazer agora",
    resumo:
      "Oito ajustes concretos com o porquê de cada um e o que exatamente eles impedem. Nada genérico.",
    acao: "checklist",
  },
  {
    n: "06",
    href: "/ja-cai",
    titulo: "Já caí num golpe — e agora?",
    resumo:
      "A ordem das primeiras horas: banco, devolução do PIX, boletim de ocorrência, avisar contatos. Só canais oficiais.",
    acao: "urgente",
  },
];

export function Indice() {
  const semMovimento = useReducedMotion();
  const item = semMovimento ? staticVariants : maskReveal;

  return (
    <motion.ul
      initial="hidden"
      whileInView="visible"
      viewport={VIEWPORT}
      variants={stagger(0.08)}
      className="border-t border-line"
    >
      {SECOES.map((s) => {
        const urgente = s.acao === "urgente";
        return (
          <motion.li key={s.n} variants={item} className="border-b border-line">
            <Link
              href={s.href}
              className="group grid items-baseline gap-x-8 gap-y-2 py-7 transition-colors duration-200 hover:bg-panel/60 md:grid-cols-[3rem_minmax(0,1fr)_minmax(0,1.4fr)_6rem] md:px-3"
            >
              <span
                className={`font-mono text-sm ${
                  urgente ? "text-signal-red" : "text-signal-amber"
                }`}
              >
                {s.n}
              </span>

              <h3 className="font-mono text-xl font-semibold text-balance md:text-2xl">
                {s.titulo}
              </h3>

              <p className="text-body leading-relaxed text-ink-2 text-pretty">
                {s.resumo}
              </p>

              <span
                className={`label-field md:text-right ${
                  urgente ? "text-signal-red" : ""
                }`}
              >
                {s.acao}
                <span
                  aria-hidden="true"
                  className="ml-2 inline-block transition-transform duration-200 group-hover:translate-x-1"
                >
                  →
                </span>
              </span>
            </Link>
          </motion.li>
        );
      })}
    </motion.ul>
  );
}
