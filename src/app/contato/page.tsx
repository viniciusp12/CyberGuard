import type { Metadata } from "next";
import { Mail, MapPin, MessageSquare } from "lucide-react";
import { PageHeader } from "@/components/layout/PageHeader";

export const metadata: Metadata = {
  title: "Contato",
  description: "Fale com a equipe do CyberGuard.",
};

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

export default function ContatoPage() {
  return (
    <>
      <PageHeader
        eyebrow="Contato"
        title="Vamos conversar"
        description="Dúvidas sobre a plataforma, sugestões de conteúdo ou interesse em expandir o programa? Nossa equipe está à disposição."
      />

      <section className="py-24 md:py-32">
        <div className="container-page grid grid-cols-1 lg:grid-cols-12 gap-12">
          <div className="lg:col-span-5 space-y-6">
            {CONTACTS.map((c) => {
              const Icon = c.icon;
              const content = (
                <div className="flex items-start gap-5 rounded-2xl border border-surface-border bg-surface-elevated/50 p-6 card-hover">
                  <div className="flex h-12 w-12 flex-shrink-0 items-center justify-center rounded-xl border border-accent/20 bg-accent/5">
                    <Icon className="h-5 w-5 text-accent" strokeWidth={2} />
                  </div>
                  <div>
                    <p className="font-mono text-[10px] uppercase tracking-wider text-foreground/40 mb-1">
                      {c.title}
                    </p>
                    <p className="text-foreground/90">{c.value}</p>
                  </div>
                </div>
              );
              return c.href ? (
                <a key={c.title} href={c.href} className="block">
                  {content}
                </a>
              ) : (
                <div key={c.title}>{content}</div>
              );
            })}
          </div>

          <div className="lg:col-span-7">
            <form className="rounded-2xl border border-surface-border bg-surface-elevated/50 p-8 md:p-10 space-y-5">
              <div>
                <label className="mb-2 block text-xs font-medium uppercase tracking-wider text-foreground/70">
                  Nome
                </label>
                <input
                  type="text"
                  placeholder="Seu nome completo"
                  className="w-full h-12 rounded-xl bg-background border border-surface-border px-4 text-sm focus:outline-none focus:border-accent/50 focus:ring-2 focus:ring-accent/20 transition-all"
                />
              </div>
              <div>
                <label className="mb-2 block text-xs font-medium uppercase tracking-wider text-foreground/70">
                  E-mail
                </label>
                <input
                  type="email"
                  placeholder="voce@leroymerlin.com.br"
                  className="w-full h-12 rounded-xl bg-background border border-surface-border px-4 text-sm focus:outline-none focus:border-accent/50 focus:ring-2 focus:ring-accent/20 transition-all"
                />
              </div>
              <div>
                <label className="mb-2 block text-xs font-medium uppercase tracking-wider text-foreground/70">
                  Mensagem
                </label>
                <textarea
                  rows={6}
                  placeholder="Como podemos ajudar?"
                  className="w-full rounded-xl bg-background border border-surface-border px-4 py-3 text-sm focus:outline-none focus:border-accent/50 focus:ring-2 focus:ring-accent/20 transition-all resize-none"
                />
              </div>
              <button
                type="button"
                className="w-full h-12 rounded-full bg-accent text-background font-medium hover:bg-accent/90 transition-colors"
              >
                Enviar mensagem
              </button>
              <p className="text-[11px] text-foreground/40 text-center">
                * Formulário ilustrativo — integração com backend será adicionada
                em fases futuras.
              </p>
            </form>
          </div>
        </div>
      </section>
    </>
  );
}
