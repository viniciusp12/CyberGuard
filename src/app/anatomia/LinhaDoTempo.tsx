"use client";

import { motion, useReducedMotion } from "framer-motion";
import { maskReveal, riseIn, staticVariants, VIEWPORT } from "@/lib/motion";

type Passo = {
  n: string;
  quando: string;
  titulo: string;
  /** O que acontece, narrado do lado de quem aplica o golpe. */
  movimento: string;
  /** Onde a corrente arrebenta — o que impede este passo específico. */
  ruptura?: string;
  /** Passo em que a defesa é mais eficaz. */
  decisivo?: boolean;
};

const PASSOS: Passo[] = [
  {
    n: "01",
    quando: "semanas antes",
    titulo: "O número já está circulando",
    movimento:
      "Não é preciso descobrir nada. Números de celular estão em anúncios de venda de móveis usados, em grupos públicos de bairro, em listas de contato vazadas de lojas e aplicativos. Quem aplica o golpe compra ou coleta esses números às centenas.",
    ruptura:
      "Evitar publicar o número em anúncio e sair de grupos públicos reduz a chance de entrar na lista — mas não dependa disso: quase todo número brasileiro já vazou em algum lugar.",
  },
  {
    n: "02",
    quando: "minutos antes",
    titulo: "Uma olhada rápida em quem você é",
    movimento:
      "Com o número em mãos, dá para ver a foto de perfil do WhatsApp e, com o nome, chegar às redes sociais abertas. Em poucos minutos se descobre o primeiro nome, o rosto, quem parecem ser os filhos, os pais, o pessoal do trabalho.",
    ruptura:
      "Fechar perfis públicos e restringir quem vê sua foto do WhatsApp (Configurações → Privacidade → Foto do perfil → Meus contatos) encarece o trabalho.",
  },
  {
    n: "03",
    quando: "14h02",
    titulo: "O pedido do código parte do próprio WhatsApp",
    movimento:
      "O criminoso começa a instalar o WhatsApp em outro aparelho usando o seu número. O aplicativo faz o que sempre faz: manda um SMS com um código de seis dígitos para o dono do número. Ou seja, para você. Nada foi invadido — esse SMS é legítimo.",
    ruptura:
      "É por isso que o código chega “do nada”. Um código que você não pediu significa que alguém está tentando entrar agora.",
  },
  {
    n: "04",
    quando: "14h03",
    titulo: "A ligação, um minuto depois",
    movimento:
      "Aí vem a única parte que depende de você. Alguém liga dizendo ser da operadora, do suporte técnico, da loja onde você anunciou, do RH de uma vaga, do sorteio de uma igreja. A conversa é educada e sempre chega no mesmo ponto: “para confirmar, me diz o código que acabou de chegar no seu celular”.",
    ruptura:
      "Nenhuma empresa, em nenhuma situação, precisa de um código que chegou no seu celular. Nenhuma. Esse código existe justamente para provar que o telefone é seu — entregá-lo é entregar a conta.",
    decisivo: true,
  },
  {
    n: "05",
    quando: "14h04",
    titulo: "A conta muda de aparelho",
    movimento:
      "Com os seis dígitos, o WhatsApp migra a conta para o aparelho do criminoso. O seu desconecta. As conversas antigas ficam com você, mas o número — e a identidade dele — passa a estar do outro lado.",
    ruptura:
      "Aqui está o freio de mão: se a verificação em duas etapas do WhatsApp estiver ativada, o aplicativo pede também um PIN de seis dígitos que só você sabe, e o código do SMS sozinho não serve para nada. É o único passo dessa lista que trava o golpe mesmo depois de tudo ter dado errado.",
    decisivo: true,
  },
  {
    n: "06",
    quando: "14h10",
    titulo: "Leitura antes do golpe",
    movimento:
      "Antes de pedir dinheiro, lê-se um pouco. Quem você chama de mãe, quem chama você de amor, quem já te emprestou dinheiro antes, como você escreve, se usa emoji, se manda áudio. É esse detalhe que faz a próxima mensagem soar como você.",
  },
  {
    n: "07",
    quando: "14h25",
    titulo: "Os pedidos saem em série",
    movimento:
      "As mensagens vão para dezenas de contatos ao mesmo tempo, com valores diferentes para cada perfil. A desculpa é sempre a mesma família: emergência, aplicativo do banco fora do ar, chave PIX de terceiro, e um pedido para não ligar agora.",
    ruptura:
      "Do outro lado, a defesa é uma só: ligar. Quem está com a conta não atende ligação no número verdadeiro.",
  },
  {
    n: "08",
    quando: "às vezes só no dia seguinte",
    titulo: "Você descobre por último",
    movimento:
      "A vítima costuma não perceber nada de imediato — o WhatsApp simplesmente parou de funcionar, o que parece problema de internet. A descoberta quase sempre vem de fora: alguém liga perguntando se você está bem, ou se o PIX era mesmo seu.",
    ruptura:
      "Se o WhatsApp desconectar sozinho, trate como emergência, não como bug. Reinstale e recupere a conta pelo SMS na hora — quem estiver dentro é expulso.",
  },
];

export function LinhaDoTempo() {
  const semMovimento = useReducedMotion();
  const v = semMovimento ? staticVariants : maskReveal;
  const vTexto = semMovimento ? staticVariants : riseIn;

  return (
    <ol className="relative">
      {/* Trilho vertical da linha do tempo. */}
      <div
        aria-hidden="true"
        className="absolute left-[0.6875rem] top-2 bottom-2 w-px bg-line md:left-[4.6875rem]"
      />

      {PASSOS.map((p) => (
        <li key={p.n} className="relative pb-12 pl-9 md:pl-28">
          {/* Marcador */}
          <span
            aria-hidden="true"
            className={`absolute left-1.5 top-1.5 h-3 w-3 rounded-full border-2 md:left-[4.1875rem] ${
              p.decisivo
                ? "border-signal-amber bg-signal-amber"
                : "border-line-strong bg-page"
            }`}
          />
          <span className="label-field absolute left-0 top-0 hidden w-14 text-right md:block">
            {p.n}
          </span>

          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={VIEWPORT}
            variants={vTexto}
          >
            <p className="label-field">{p.quando}</p>
            <h3 className="mt-2 font-mono text-xl font-semibold text-balance md:text-2xl">
              {p.titulo}
            </h3>
          </motion.div>

          <motion.p
            initial="hidden"
            whileInView="visible"
            viewport={VIEWPORT}
            variants={v}
            className="mt-3 max-w-2xl text-body leading-relaxed text-ink-2 text-pretty"
          >
            {p.movimento}
          </motion.p>

          {p.ruptura && (
            <motion.div
              initial="hidden"
              whileInView="visible"
              viewport={VIEWPORT}
              variants={vTexto}
              className={`mt-4 max-w-2xl border-l-2 py-2.5 pl-4 ${
                p.decisivo ? "border-signal-amber" : "border-line-strong"
              }`}
            >
              <p
                className={`label-field ${p.decisivo ? "text-signal-amber" : ""}`}
              >
                {p.decisivo ? "Aqui o golpe quebra" : "O que atrapalha"}
              </p>
              <p className="mt-1.5 text-body leading-relaxed text-ink-2 text-pretty">
                {p.ruptura}
              </p>
            </motion.div>
          )}
        </li>
      ))}
    </ol>
  );
}
