import type { Metadata } from "next";
import Link from "next/link";
import { PageHeader } from "@/components/layout/PageHeader";
import { Essencial } from "@/components/ui/Essencial";
import { TermosRelacionados } from "@/components/ui/TermosRelacionados";
import { Checklist } from "./Checklist";

export const metadata: Metadata = {
  title: "O que fazer agora",
  description:
    "Oito ajustes concretos, com o motivo de cada um e o que exatamente eles impedem. Sem jargão e sem lista genérica.",
};

export default function AgoraPage() {
  return (
    <>
      <PageHeader
        numero="05"
        eyebrow="O que fazer agora"
        title="Oito ajustes, e o motivo de cada um"
        description="Nenhum deles depende de entender de tecnologia. Todos estão explicados com o que muda na prática — porque uma recomendação sem o porquê não sobrevive à primeira vez em que dá trabalho."
      />

      <section className="pt-10 md:pt-12">
        <div className="container-read">
          <Essencial
            itens={[
              "Ative verificação em duas etapas no e-mail primeiro — é a conta que recupera todas as outras.",
              "Use um gerenciador de senhas. Senha repetida é o que transforma um vazamento em vários.",
              "Cadastre uma senha no seu chip com a operadora, contra troca de SIM.",
              "Combine uma palavra-código com a família para pedidos de dinheiro por telefone.",
            ]}
          />
        </div>
      </section>

      <section className="py-14 md:py-20">
        <div className="container-read">
          <Checklist />

          <TermosRelacionados
            ids={[
              "2fa",
              "totp",
              "passkey",
              "sim-swap",
              "gerenciador-de-senhas",
              "chave-pix",
            ]}
          />
        </div>
      </section>

      <section className="border-t border-chumbo-linha bg-chumbo-painel/40 py-14 md:py-20">
        <div className="container-read">
          <p className="etiqueta">Uma coisa que esta lista não faz</p>
          <p className="mt-4 text-body text-papel-2 text-pretty">
            Nada aqui garante nada. Existe golpe que passa por cima de tudo isso
            — e quando passa, a culpa não é de quem foi enganado. Segurança
            digital não é um teste de caráter nem de inteligência: é uma disputa
            desigual entre quem faz isso o dia inteiro e quem só queria receber
            uma encomenda. Estes ajustes reduzem a chance e limitam o estrago.
            É isso que eles fazem, e já é bastante.
          </p>

          <div className="mt-10 border-t border-chumbo-linha pt-8">
            <p className="text-body text-papel-2">
              Se algo já aconteceu com você, a próxima página é a única que
              importa agora.
            </p>
            <Link
              href="/ja-cai"
              className="mt-5 inline-flex min-h-touch items-center rounded-sm bg-ambar px-5 py-3 font-display text-sm font-medium text-chumbo transition-colors duration-200 hover:bg-[#F5BB63]"
            >
              Já caí num golpe — e agora? →
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}
