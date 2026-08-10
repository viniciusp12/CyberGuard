import type { Metadata } from "next";
import Link from "next/link";
import { PageHeader } from "@/components/layout/PageHeader";
import { ListaGlossario } from "./ListaGlossario";

export const metadata: Metadata = {
  title: "Glossário",
  description:
    "Servidor, IP, HTTPS, hash, phishing, deepfake, MED. Os termos técnicos explicados em português comum, com o motivo de cada um importar para você.",
};

export default function GlossarioPage() {
  return (
    <>
      <PageHeader
        eyebrow="Glossário"
        title="Os termos técnicos, em português comum"
        description="Você não precisa de nada disto para se proteger — o resto do site funciona sem. Isto aqui é para quem bateu o olho numa palavra e quis saber o que tem por baixo."
      />

      <section className="py-14 md:py-20">
        <div className="container-page">
          <div className="mb-10 max-w-2xl border-l-2 border-signal-amber pl-5">
            <p className="text-body text-ink-2 text-pretty">
              Duas entradas valem a leitura mesmo de quem não gosta de termo
              técnico, porque desmontam as duas maiores fontes de falsa
              segurança que existem:{" "}
              <Link
                href="/glossario#https"
                className="text-ink underline decoration-signal-amber/50 underline-offset-4 hover:decoration-signal-amber"
              >
                o cadeado do navegador
              </Link>{" "}
              e{" "}
              <Link
                href="/glossario#vpn"
                className="text-ink underline decoration-signal-amber/50 underline-offset-4 hover:decoration-signal-amber"
              >
                a VPN
              </Link>
              . Nenhum dos dois faz o que a maioria das pessoas acha que faz.
            </p>
          </div>

          <ListaGlossario />

          <div className="mt-16 max-w-2xl border-t border-line pt-8">
            <p className="text-body text-ink-2 text-pretty">
              Faltou algum termo que você viu por aí? A lista foi montada a
              partir do que aparece no próprio site e do que costuma gerar
              dúvida — ela cresce conforme chegam perguntas.
            </p>
            <Link
              href="/contato"
              className="mt-5 inline-flex min-h-touch items-center rounded-sm border border-line-strong px-5 py-3 font-mono text-sm text-ink transition-colors duration-200 hover:border-signal-amber hover:text-signal-amber"
            >
              Sugerir um termo →
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}
