import type { Metadata } from "next";
import Link from "next/link";
import { PageHeader } from "@/components/layout/PageHeader";
import { Essencial } from "@/components/ui/Essencial";
import { TermosRelacionados } from "@/components/ui/TermosRelacionados";
import { LinhaDoTempo } from "./LinhaDoTempo";

export const metadata: Metadata = {
  title: "Como o golpe funciona por dentro",
  description:
    "A clonagem de WhatsApp passo a passo, do lado de quem aplica — e o ponto exato em que cada etapa pode ser interrompida.",
};

export default function AnatomiaPage() {
  return (
    <>
      <PageHeader
        numero="03"
        eyebrow="Anatomia de um golpe"
        title="Clonagem de WhatsApp, passo a passo, do outro lado"
        description="Entender o mecanismo protege mais do que decorar regra. Quando você sabe de onde vem cada peça, reconhece o golpe mesmo quando ele muda de roupa."
      />

      <section className="pt-10 md:pt-12">
        <div className="container-read">
          <Essencial
            itens={[
              "Um golpe tem etapas, e cada etapa tem um ponto onde ele pode ser interrompido.",
              "A parte técnica é a menor: o trabalho pesado do golpista é o roteiro, não o código.",
              "Entender a mecânica é o que permite reconhecer um golpe que você nunca viu.",
            ]}
          />
        </div>
      </section>

      <section className="py-14 md:py-20">
        <div className="container-page">
          <div className="mb-14 max-w-2xl border-l-2 border-chumbo-linha pl-5">
            <p className="text-body text-papel-2 text-pretty">
              Uma observação sobre o nome: não existe “clonagem” no sentido de
              copiar o aparelho. O que acontece é mais simples e mais
              constrangedor — a conta é transferida para outro celular usando um
              código que o próprio WhatsApp manda para você, e que alguém te
              convence a repetir em voz alta. Nenhuma etapa envolve invadir
              coisa alguma.
            </p>
          </div>

          <LinhaDoTempo />

          <div className="container-read px-0">
            <TermosRelacionados
              ids={[
                "engenharia-social",
                "2fa",
                "sim-swap",
                "vazamento",
                "chave-pix",
                "fingerprinting",
              ]}
            />
          </div>
        </div>
      </section>

      <section className="border-t border-chumbo-linha bg-chumbo-painel/40 py-14 md:py-20">
        <div className="container-read">
          <p className="etiqueta-risco">
            Se você fizer uma coisa só depois de ler isto
          </p>
          <p className="mt-4 text-bodyLg text-papel text-pretty">
            Ative a verificação em duas etapas do WhatsApp. São seis dígitos que
            você escolhe, e eles transformam o passo 05 numa parede: mesmo que o
            código do SMS seja entregue, a conta não migra.
          </p>
          <p className="mt-4 text-body text-papel-2 text-pretty">
            No aplicativo: Configurações → Privacidade → Verificação em duas
            etapas → Ativar. Guarde o PIN onde você guarda documentos, não num
            papel na carteira, e cadastre um e-mail de recuperação — sem ele,
            esquecer o PIN significa esperar sete dias para reentrar na conta.
          </p>

          <div className="mt-10 border-t border-chumbo-linha pt-8">
            <p className="text-body text-papel-2">
              Esse golpe existe há anos. O que mudou recentemente foi o custo de
              fabricar a parte convincente dele.
            </p>
            <Link
              href="/ia"
              className="mt-5 inline-flex min-h-touch items-center rounded-sm border border-chumbo-linhaForte px-5 py-3 font-display text-sm text-papel transition-colors duration-200 hover:border-menta hover:text-menta"
            >
              Próximo · O que a IA mudou →
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}
