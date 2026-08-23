import type { Metadata } from "next";
import { PageHeader } from "@/components/layout/PageHeader";

export const metadata: Metadata = {
  title: "Contato",
  description:
    "Como falar com a equipe dos Hackudinhos — e para onde ir se você precisa de ajuda urgente com um golpe.",
};

const CANAIS = [
  {
    rotulo: "E-mail do projeto",
    valor: "contato@cifra.dev",
    href: "mailto:contato@cifra.dev",
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
          {/* Bloco cheio, texto invertido: é o formato que o manual reserva
              para risco, e este é o aviso mais urgente da página. */}
          <div className="bloco-risco rounded-sm p-6">
            <p className="font-display text-xs font-medium uppercase tracking-etiqueta">
              Se você está no meio de um golpe agora
            </p>
            <p className="mt-3 text-body font-medium leading-relaxed text-pretty">
              Não escreva para cá — não temos plantão e não conseguimos agir a
              tempo. Ligue para o seu banco pelo número do verso do cartão. A
              página{" "}
              <a href="/ja-cai" className="underline underline-offset-4">
                “Já caí num golpe”
              </a>{" "}
              tem a ordem das primeiras horas e os canais oficiais.
            </p>
          </div>

          <dl className="mt-12 divide-y divide-chumbo-linha border-y border-chumbo-linha">
            {CANAIS.map((c) => (
              <div key={c.rotulo} className="py-5">
                <dt className="etiqueta">{c.rotulo}</dt>
                <dd className="mt-2 font-display text-base">
                  {c.href ? (
                    <a
                      href={c.href}
                      className="text-menta underline decoration-menta/40 underline-offset-4 hover:decoration-menta"
                    >
                      {c.valor}
                    </a>
                  ) : (
                    <span className="text-papel-2">{c.valor}</span>
                  )}
                </dd>
              </div>
            ))}
          </dl>

          <p className="mt-8 text-sm leading-relaxed text-papel-3">
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
