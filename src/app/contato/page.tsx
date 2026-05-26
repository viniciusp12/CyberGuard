import type { Metadata } from "next";
import { PageHeader } from "@/components/layout/PageHeader";
import { ContatoCards } from "./ContatoCards";

export const metadata: Metadata = {
  title: "Contato",
  description: "Fale com a equipe do CyberGuard.",
};

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
          <ContatoCards />

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
