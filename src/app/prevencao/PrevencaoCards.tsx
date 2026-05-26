"use client";

import { motion } from "framer-motion";
import {
  KeyRound,
  ShieldCheck,
  Eye,
  Download,
  Smartphone,
  FileCheck2,
} from "lucide-react";

const PRACTICES = [
  {
    icon: KeyRound,
    title: "Senhas fortes e únicas",
    bullets: [
      "Use frases longas (mínimo 12 caracteres) em vez de palavras.",
      "Nunca reutilize a mesma senha em mais de um serviço.",
      "Prefira um gerenciador de senhas confiável (ex: 1Password, Bitwarden).",
      "Troque imediatamente qualquer senha envolvida em vazamentos.",
    ],
  },
  {
    icon: ShieldCheck,
    title: "Autenticação multifator (MFA)",
    bullets: [
      "Ative MFA em todos os sistemas corporativos e pessoais que permitem.",
      "Prefira apps autenticadores (Google Authenticator, Authy) em vez de SMS.",
      "Nunca compartilhe códigos de MFA com 'suporte' ou 'supervisor'.",
      "Guarde códigos de recuperação em local seguro offline.",
    ],
  },
  {
    icon: Eye,
    title: "Identificando phishing",
    bullets: [
      "Desconfie de urgência, ameaças ou recompensas inesperadas.",
      "Verifique o remetente real (não apenas o nome exibido).",
      "Passe o mouse sobre links antes de clicar para ver o destino real.",
      "Em dúvida, contate o remetente por outro canal antes de agir.",
    ],
  },
  {
    icon: Download,
    title: "Anexos e downloads",
    bullets: [
      "Não abra anexos inesperados, mesmo de contatos conhecidos.",
      "Fuja de arquivos com extensões incomuns (.exe, .scr, .js, .hta).",
      "Evite ativar macros em documentos Office recebidos por e-mail.",
      "Escaneie arquivos suspeitos com o antivírus corporativo antes de abrir.",
    ],
  },
  {
    icon: Smartphone,
    title: "Dispositivos e apps",
    bullets: [
      "Mantenha sistema, apps e antivírus sempre atualizados.",
      "Instale apps apenas de lojas oficiais (Play Store, App Store).",
      "Revise periodicamente permissões concedidas a aplicativos.",
      "Ative bloqueio de tela, biometria e criptografia do dispositivo.",
    ],
  },
  {
    icon: FileCheck2,
    title: "Dados e LGPD",
    bullets: [
      "Compartilhe dados de clientes apenas pelos canais oficiais e autorizados.",
      "Não envie planilhas com dados pessoais para e-mails externos.",
      "Use o princípio do menor privilégio: acesse só o necessário.",
      "Comunique imediatamente qualquer suspeita de vazamento ao DPO.",
    ],
  },
];

const INCIDENT_STEPS = [
  { n: "01", title: "Mantenha a calma", text: "Pânico leva a decisões erradas. Respire e avalie a situação." },
  { n: "02", title: "Isole", text: "Desconecte o dispositivo da rede (Wi-Fi e cabo) para conter o problema." },
  { n: "03", title: "Comunique", text: "Acione imediatamente o time de segurança ou seu líder direto." },
  { n: "04", title: "Não apague", text: "Preserve evidências. Apagar pode atrapalhar a investigação." },
  { n: "05", title: "Documente", text: "Anote o que aconteceu, horários e ações tomadas até aquele momento." },
];

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

const incidentVariant = {
  hidden: {},
  visible: {
    transition: { staggerChildren: 0.1, delayChildren: 0.1 },
  },
};

const incidentCardVariant = {
  hidden: { opacity: 0, y: 32, scale: 0.97 },
  visible: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: { duration: 0.55, ease: [0.16, 1, 0.3, 1] },
  },
};

export function PrevencaoCards() {
  return (
    <motion.div
      className="grid grid-cols-1 md:grid-cols-2 gap-6"
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.1, margin: "-80px 0px" }}
      variants={gridVariant}
    >
      {PRACTICES.map((practice, idx) => {
        const Icon = practice.icon;
        return (
          <motion.article
            key={practice.title}
            variants={cardVariant}
            className="rounded-2xl border border-surface-border bg-surface-elevated/50 p-8 md:p-10 card-hover overflow-hidden conic-border-active-accent"
          >
            <div className="flex items-center gap-4 mb-6">
              <div className="flex h-12 w-12 items-center justify-center rounded-xl border border-accent/20 bg-accent/5">
                <Icon className="h-5 w-5 text-accent" strokeWidth={2} />
              </div>
              <span className="font-mono text-xs text-foreground/40">
                0{idx + 1}
              </span>
            </div>
            <h3 className="font-display text-2xl md:text-3xl font-semibold mb-6">
              {practice.title}
            </h3>
            <ul className="space-y-3">
              {practice.bullets.map((bullet) => (
                <li
                  key={bullet}
                  className="flex items-start gap-3 text-sm text-foreground/70 leading-relaxed"
                >
                  <span className="mt-1.5 h-1 w-1 rounded-full bg-accent flex-shrink-0" />
                  {bullet}
                </li>
              ))}
            </ul>
          </motion.article>
        );
      })}
    </motion.div>
  );
}

export function IncidentCards() {
  return (
    <motion.div
      className="grid grid-cols-1 md:grid-cols-5 gap-4"
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.2, margin: "-80px 0px" }}
      variants={incidentVariant}
    >
      {INCIDENT_STEPS.map((step) => (
        <motion.div
          key={step.n}
          variants={incidentCardVariant}
          className="rounded-2xl border border-surface-border bg-background p-6 card-hover overflow-hidden conic-border-active-accent"
        >
          <p className="font-mono text-xs text-accent mb-4">{step.n}</p>
          <h4 className="font-display text-xl font-semibold mb-3">
            {step.title}
          </h4>
          <p className="text-sm text-foreground/60 leading-relaxed">
            {step.text}
          </p>
        </motion.div>
      ))}
    </motion.div>
  );
}
