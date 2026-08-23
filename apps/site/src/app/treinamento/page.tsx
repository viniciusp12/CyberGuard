import type { Metadata } from "next";
import Link from "next/link";
import { PageHeader } from "@/components/layout/PageHeader";

export const metadata: Metadata = {
  title: "Treinamento",
  description:
    "A trilha gamificada dos Hackudinhos: módulos com e-mails de phishing simulados, pontuação e ranking. Acesso com a credencial fornecida pela empresa.",
};

/**
 * Porta para a plataforma gamificada.
 *
 * O jogo roda em outro domínio, com identidade visual própria — pixel art, em
 * vez do laudo técnico do site. Isso é proposital, e a página avisa: o
 * visitante não deve achar que entrou no lugar errado.
 *
 * Não existe um segundo login aqui. A autenticação é da plataforma, com cookie
 * de sessão no domínio dela; duplicar a tela criaria duas sessões e nenhuma
 * vantagem.
 */
/**
 * Para onde o botão de entrar leva.
 *
 * O padrão aponta para o deploy na Vercel, que é o que recebe as atualizações.
 * Havia aqui um endereço em servidor próprio (`play.mizanis.com.br`) que segue
 * no ar servindo uma versão anterior — quem chegava pelo site via a identidade
 * antiga, e quem entrava pela Vercel via a nova. Duas caras para o mesmo
 * produto.
 *
 * `NEXT_PUBLIC_JOGO_URL` continua sobrescrevendo, para quando houver um
 * subdomínio próprio (algo como jogo.hackudinhos.com.br) sem precisar de
 * alteração de código.
 */
const URL_JOGO =
  process.env.NEXT_PUBLIC_JOGO_URL ?? "https://cyber-guard-jogo.vercel.app";

const O_QUE_TEM = [
  {
    titulo: "Módulos com caixa de entrada real",
    texto:
      "Cada dia é uma caixa de e-mails para triar sob tempo. Alguns são legítimos, outros trazem domínio trocado, anexo perigoso ou QR code adulterado — os mesmos sinais que a seção 02 deste site destrincha.",
  },
  {
    titulo: "Pontuação, combo e progressão",
    texto:
      "Acertos seguidos valem mais, erro custa reputação. A ideia é treinar o reflexo de conferir antes de clicar, não decorar uma lista de regras.",
  },
  {
    titulo: "Ranking entre colegas",
    texto:
      "O placar existe para dar motivo de voltar. Quem entende o mecanismo do golpe joga melhor — e é isso que se quer treinar.",
  },
];

export default function TreinamentoPage() {
  return (
    <>
      <PageHeader
        eyebrow="Plataforma"
        title="A trilha de treinamento"
        description="Este site explica os golpes. A plataforma treina o reflexo de reconhecê-los sob pressão, com módulos, pontuação e registro do que foi concluído."
      />

      <section className="py-14 md:py-20">
        <div className="container-read">
          {/* Sem isto, a pessoa clica, cai numa tela de login sem cadastro e
              acha que o site quebrou. */}
          <div className="rounded-sm border border-menta/40 bg-menta-900/40 p-6">
            <p className="font-display text-xs font-medium uppercase tracking-etiqueta text-menta">
              Antes de clicar
            </p>
            <p className="mt-3 text-body leading-relaxed text-papel text-pretty">
              A plataforma <strong className="font-semibold">não tem cadastro aberto</strong>.
              O acesso é criado pela pessoa responsável pelo programa na empresa,
              que entrega usuário e uma senha provisória. Se você chegou aqui por
              conta própria e não recebeu credencial, o conteúdo aberto deste
              site já cobre o essencial — comece pela{" "}
              <Link
                href="/agora"
                className="underline decoration-menta/50 underline-offset-4 hover:decoration-menta"
              >
                lista de oito ajustes
              </Link>
              .
            </p>
          </div>

          <div className="mt-12">
            <h2 className="font-display text-2xl font-semibold">
              O que tem lá dentro
            </h2>
            <dl className="mt-8 divide-y divide-chumbo-linha border-y border-chumbo-linha">
              {O_QUE_TEM.map((item) => (
                <div key={item.titulo} className="py-6">
                  <dt className="font-display text-lg font-semibold">
                    {item.titulo}
                  </dt>
                  <dd className="mt-2 text-body leading-relaxed text-papel-2 text-pretty">
                    {item.texto}
                  </dd>
                </div>
              ))}
            </dl>
          </div>

          {/* A troca de identidade visual precisa ser anunciada, senão parece
              que o link levou para outro produto por engano. */}
          <p className="mt-10 border-l-2 border-chumbo-linhaForte py-1 pl-5 text-body leading-relaxed text-papel-3 text-pretty">
            A plataforma tem visual próprio, de jogo — bem diferente daqui. É de
            propósito: treinar exige uma linguagem que convide a repetir, e este
            site existe para explicar, não para pontuar.
          </p>

          <div className="mt-10 flex flex-wrap gap-3">
            <a
              href={`${URL_JOGO}/login`}
              className="inline-flex min-h-touch items-center rounded-sm bg-menta px-6 py-3 font-display text-sm font-medium text-chumbo transition-colors duration-200 hover:bg-menta-400"
            >
              Entrar no treinamento →
            </a>
            <Link
              href="/golpe"
              className="inline-flex min-h-touch items-center rounded-sm border border-chumbo-linhaForte px-6 py-3 font-display text-sm text-papel transition-colors duration-200 hover:border-menta hover:text-menta"
            >
              Antes, testar de graça aqui
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}
