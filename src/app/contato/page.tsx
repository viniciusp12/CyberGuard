import type { Metadata } from "next";
import { PageHeader } from "@/components/layout/PageHeader";

export const metadata: Metadata = {
  title: "Contato",
  description:
    "Como falar com a equipe do CyberGuard — e para onde ir se você precisa de ajuda urgente com um golpe.",
};

const CANAIS = [
  {
    rotulo: "E-mail do projeto",
    valor: "contato@cyberguard.dev",
    href: "mailto:contato@cyberguard.dev",
  },
  {
    rotulo: "Contexto acadêmico",
    valor: "Challenge de Defesa Cibernética · parceria Leroy Merlin",
  },
];

export default function ContatoPage() {
  return (
    <>
      <PageHeader
        eyebrow="Contato"
        title="Correção, sugestão ou dúvida sobre o conteúdo"
        description="Se você encontrou um dado errado, um link quebrado ou uma orientação desatualizada aqui dentro, essa é a mensagem mais útil que podemos receber."
      />

      <section className="py-14 md:py-20">
        <div className="container-read">
          {/* O que alguém em pânico precisa ler primeiro nesta página. */}
          <div className="rounded-sm border border-signal-red/40 bg-signal-redDim/40 p-6">
            <p className="label-field text-signal-red">
              Se você está no meio de um golpe agora
            </p>
            <p className="mt-3 text-body leading-relaxed text-ink text-pretty">
              Não escreva para cá — não temos plantão e não conseguimos agir a
              tempo. Ligue para o seu banco pelo número do verso do cartão. A
              página{" "}
              <a
                href="/ja-cai"
                className="text-signal-red underline decoration-signal-red/40 underline-offset-4 hover:decoration-signal-red"
              >
                “Já caí num golpe”
              </a>{" "}
              tem a ordem das primeiras horas e os canais oficiais.
            </p>
          </div>

          <dl className="mt-12 divide-y divide-line border-y border-line">
            {CANAIS.map((c) => (
              <div key={c.rotulo} className="py-5">
                <dt className="label-field">{c.rotulo}</dt>
                <dd className="mt-2 font-mono text-base">
                  {c.href ? (
                    <a
                      href={c.href}
                      className="text-signal-amber underline decoration-signal-amber/40 underline-offset-4 hover:decoration-signal-amber"
                    >
                      {c.valor}
                    </a>
                  ) : (
                    <span className="text-ink-2">{c.valor}</span>
                  )}
                </dd>
              </div>
            ))}
          </dl>

          <p className="mt-8 text-sm leading-relaxed text-ink-3">
            Não há formulário nesta página de propósito. Um formulário sem
            backend só dá a impressão de que a mensagem foi enviada — e um site
            sobre golpes é o último lugar onde isso pode acontecer. Quando a
            integração existir, o formulário volta.
          </p>
        </div>
      </section>
    </>
  );
}
