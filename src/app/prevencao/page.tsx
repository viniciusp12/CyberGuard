import type { Metadata } from "next";
import Link from "next/link";
import {
  KeyRound,
  ShieldCheck,
  Eye,
  Download,
  Smartphone,
  FileCheck2,
  ArrowUpRight,
} from "lucide-react";
import { PageHeader } from "@/components/layout/PageHeader";

export const metadata: Metadata = {
  title: "Prevenção",
  description:
    "Boas práticas de segurança cibernética que todo colaborador pode aplicar no dia a dia.",
};

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

export default function PrevencaoPage() {
  return (
    <>
      <PageHeader
        eyebrow="Prevenção"
        title="Práticas simples, impacto enorme"
        description="Segurança não depende de ferramentas mágicas — depende de hábitos construídos um por um. Aqui estão as práticas que mais importam no dia a dia."
      />

      <section className="py-24 md:py-32">
        <div className="container-page">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {PRACTICES.map((practice, idx) => {
              const Icon = practice.icon;
              return (
                <article
                  key={practice.title}
                  className="rounded-2xl border border-surface-border bg-surface-elevated/50 p-8 md:p-10 card-hover"
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
                </article>
              );
            })}
          </div>
        </div>
      </section>

      <section className="py-24 border-y border-surface-border bg-surface">
        <div className="container-page">
          <div className="max-w-3xl mb-16">
            <p className="font-mono text-xs uppercase tracking-[0.25em] text-accent mb-4">
              — Em caso de incidente
            </p>
            <h2 className="font-display text-4xl md:text-5xl font-semibold tracking-tight text-balance">
              O que fazer se algo der errado
            </h2>
            <p className="mt-6 text-foreground/60 leading-relaxed text-lg">
              Mesmo com todo cuidado, incidentes acontecem. O mais importante é
              saber reagir nas primeiras horas, quando o impacto pode ser contido.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-5 gap-4">
            {INCIDENT_STEPS.map((step) => (
              <div
                key={step.n}
                className="rounded-2xl border border-surface-border bg-background p-6 card-hover"
              >
                <p className="font-mono text-xs text-accent mb-4">{step.n}</p>
                <h4 className="font-display text-xl font-semibold mb-3">
                  {step.title}
                </h4>
                <p className="text-sm text-foreground/60 leading-relaxed">
                  {step.text}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-24 md:py-32">
        <div className="container-page text-center">
          <p className="font-mono text-xs uppercase tracking-[0.25em] text-accent mb-4">
            — Coloque em prática
          </p>
          <h2 className="font-display text-4xl md:text-5xl font-semibold tracking-tight max-w-3xl mx-auto text-balance">
            Treine esses reflexos em cenários reais
          </h2>
          <p className="mt-6 max-w-xl mx-auto text-foreground/60 text-lg">
            Crie sua conta e comece a trilha interativa com simulações, desafios
            e feedback imediato.
          </p>
          <Link
            href="/registro"
            className="mt-10 inline-flex items-center gap-3 rounded-full bg-accent px-8 py-4 text-sm font-medium text-background hover:bg-accent/90 transition-all"
          >
            Começar agora
            <ArrowUpRight className="h-4 w-4" />
          </Link>
        </div>
      </section>
    </>
  );
}
