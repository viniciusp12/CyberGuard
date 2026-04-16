import type { Metadata } from "next";
import Link from "next/link";
import {
  Fish,
  UserRound,
  Lock,
  Smartphone,
  Wifi,
  Bug,
  ArrowUpRight,
} from "lucide-react";
import { PageHeader } from "@/components/layout/PageHeader";

export const metadata: Metadata = {
  title: "Principais ameaças",
  description:
    "Conheça as principais ameaças cibernéticas que afetam colaboradores do varejo e como elas funcionam.",
};

const THREATS = [
  {
    icon: Fish,
    level: "Crítica",
    title: "Phishing",
    description:
      "E-mails, SMS e mensagens que imitam comunicações legítimas (banco, RH, diretoria) para roubar credenciais ou instalar malware. É o vetor número 1 de ataques no mundo.",
    example:
      "Um e-mail 'do RH' pede que você clique em um link para atualizar dados do holerite. O link leva a uma página idêntica à oficial, mas captura seu login.",
  },
  {
    icon: UserRound,
    level: "Alta",
    title: "Engenharia social",
    description:
      "Manipulação psicológica que explora confiança, urgência ou autoridade para convencer alguém a executar uma ação ou entregar informação.",
    example:
      "Alguém liga dizendo ser do 'suporte de TI' e pede sua senha para 'resolver um problema urgente' antes do fim do expediente.",
  },
  {
    icon: Bug,
    level: "Crítica",
    title: "Ransomware",
    description:
      "Malware que criptografa arquivos e sistemas, exigindo pagamento para liberar. Pode paralisar lojas inteiras em minutos.",
    example:
      "Um anexo aparentemente inofensivo em um pedido de orçamento instala código malicioso que se espalha pela rede local da loja.",
  },
  {
    icon: Lock,
    level: "Alta",
    title: "Senhas fracas e reuso",
    description:
      "Senhas curtas, óbvias ou reutilizadas em vários serviços facilitam invasões. Um único vazamento pode comprometer dezenas de contas.",
    example:
      "Você usa a mesma senha no e-mail corporativo e em uma loja online que sofreu vazamento — criminosos testam a credencial em todos os seus acessos.",
  },
  {
    icon: Smartphone,
    level: "Média",
    title: "Dispositivos móveis",
    description:
      "Apps maliciosos, permissões excessivas e dispositivos sem bloqueio expõem dados corporativos quando o celular é usado para trabalho.",
    example:
      "Um app 'gratuito' pedido por um colega captura silenciosamente SMS e códigos de autenticação do seu celular de uso misto.",
  },
  {
    icon: Wifi,
    level: "Média",
    title: "Wi-Fi público e redes inseguras",
    description:
      "Redes abertas em aeroportos, hotéis e cafés permitem que atacantes interceptem tráfego ou induzam vítimas a redes falsas.",
    example:
      "Ao conectar no Wi-Fi 'Cafe_Free' sem VPN, alguém na mesma rede captura sua sessão do sistema interno acessado no notebook.",
  },
];

const LEVEL_COLORS: Record<string, string> = {
  Crítica: "bg-danger/10 text-danger border-danger/30",
  Alta: "bg-warning/10 text-warning border-warning/30",
  Média: "bg-accent/10 text-accent border-accent/30",
};

export default function AmeacasPage() {
  return (
    <>
      <PageHeader
        eyebrow="Ameaças"
        title="Conheça o inimigo antes dele chegar até você"
        description="Para se defender, é preciso entender como os ataques funcionam. Abaixo estão as principais ameaças enfrentadas por colaboradores do varejo hoje."
      />

      <section className="py-24 md:py-32">
        <div className="container-page">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {THREATS.map((threat) => {
              const Icon = threat.icon;
              return (
                <article
                  key={threat.title}
                  className="group relative rounded-2xl border border-surface-border bg-surface-elevated/50 p-8 md:p-10 card-hover overflow-hidden"
                >
                  <div className="flex items-start justify-between mb-6">
                    <div className="flex h-14 w-14 items-center justify-center rounded-2xl border border-accent/20 bg-accent/5">
                      <Icon className="h-6 w-6 text-accent" strokeWidth={1.75} />
                    </div>
                    <span
                      className={`px-3 py-1 rounded-full border text-[10px] font-mono uppercase tracking-wider ${
                        LEVEL_COLORS[threat.level]
                      }`}
                    >
                      {threat.level}
                    </span>
                  </div>

                  <h3 className="font-display text-2xl md:text-3xl font-semibold mb-4">
                    {threat.title}
                  </h3>
                  <p className="text-foreground/60 leading-relaxed mb-6">
                    {threat.description}
                  </p>

                  <div className="pt-6 border-t border-surface-border">
                    <p className="font-mono text-[10px] uppercase tracking-wider text-foreground/40 mb-2">
                      Exemplo real
                    </p>
                    <p className="text-sm text-foreground/70 leading-relaxed italic">
                      “{threat.example}”
                    </p>
                  </div>
                </article>
              );
            })}
          </div>
        </div>
      </section>

      <section className="py-24 border-t border-surface-border bg-surface">
        <div className="container-page text-center max-w-3xl mx-auto">
          <p className="font-mono text-xs uppercase tracking-[0.25em] text-accent mb-4">
            — Próximo passo
          </p>
          <h2 className="font-display text-4xl md:text-5xl font-semibold tracking-tight text-balance">
            Agora que você conhece as ameaças, aprenda a se proteger
          </h2>
          <Link
            href="/prevencao"
            className="mt-10 inline-flex items-center gap-3 rounded-full bg-accent px-8 py-4 text-sm font-medium text-background hover:bg-accent/90 transition-all"
          >
            Ver como prevenir
            <ArrowUpRight className="h-4 w-4" />
          </Link>
        </div>
      </section>
    </>
  );
}
