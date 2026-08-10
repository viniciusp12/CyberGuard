import type { Metadata } from "next";
import Link from "next/link";
import { PageHeader } from "@/components/layout/PageHeader";
import { Fonte } from "@/components/ui/Fonte";

export const metadata: Metadata = {
  title: "Sobre o projeto",
  description:
    "O que é o CyberGuard, como o conteúdo é escrito, que regras de precisão o projeto segue e o que ele não faz.",
};

const REGRAS = [
  {
    titulo: "Número só com fonte, publicação e ano",
    texto:
      "Nenhuma porcentagem entra sem autor, obra e ano citados na mesma tela. Quando a fonte não resiste à conferência, o número sai — mesmo que ele deixe o texto menos impressionante. A versão anterior deste site trazia quatro estatísticas de manchete: nenhuma sobreviveu à revisão, e três eram atribuições erradas ou de agregador de conteúdo.",
  },
  {
    titulo: "Nada de link inventado",
    texto:
      "Os endereços da seção de resposta a golpe apontam só para domínios de órgão público conferidos. O que ainda não foi conferido aparece marcado como pendente, com a instrução de como chegar lá com segurança — nunca como um link com aparência de oficial.",
  },
  {
    titulo: "Conselho desatualizado é tão ruim quanto conselho errado",
    texto:
      "Recomendação de segurança envelhece. Trocar senha todo mês deixou de ser recomendado; “no Wi-Fi público roubam sua senha” virou meia-verdade depois do HTTPS universal. O site corrige explicitamente esses dois pontos em vez de repeti-los.",
  },
  {
    titulo: "Nunca culpar quem caiu",
    texto:
      "Golpe é aplicado por gente que faz isso em escala industrial, testando o que funciona em milhares de pessoas. Quem cai estava resolvendo três coisas ao mesmo tempo — ou seja, qualquer um. Vergonha atrasa a reação, e o atraso é justamente o que o golpe precisa.",
  },
  {
    titulo: "Nada é enviado a lugar nenhum",
    texto:
      "As partes interativas rodam inteiramente no navegador: a senha digitada, os dados exibidos na home, as respostas do quiz, os itens marcados no checklist. Não há analytics, não há rastreador de terceiros, não há servidor recebendo. A única gravação é a marca de “já esteve aqui”, declarada na própria tela e com botão de apagar ao lado.",
  },
];

export default function SobrePage() {
  return (
    <>
      <PageHeader
        eyebrow="Sobre o projeto"
        title="Um site que prefere ser conferível a ser impressionante"
        description="CyberGuard é um projeto acadêmico de Defesa Cibernética, desenvolvido no Challenge em parceria com a Leroy Merlin. Começou voltado para colaboradores e hoje fala primeiro com o público geral — porque o golpe que chega no trabalho é o mesmo que chega em casa."
      />

      <section className="py-14 md:py-20">
        <div className="container-read">
          <h2 className="font-mono text-2xl font-semibold">
            Por que ele é assim
          </h2>
          <p className="mt-5 text-body leading-relaxed text-ink-2 text-pretty">
            Material de conscientização costuma falhar do mesmo jeito: uma
            estatística grande no topo, cards com ícone e três linhas, e uma
            lista de regras para decorar. Isso informa, mas não muda
            comportamento — ninguém reconhece um golpe porque leu que devia
            desconfiar.
          </p>
          <p className="mt-4 text-body leading-relaxed text-ink-2 text-pretty">
            A aposta aqui é outra: um susto controlado e depois o mecanismo. A
            página inicial mostra o que qualquer site já sabe sobre você antes
            de você digitar qualquer coisa. O teste de senha faz o número
            despencar na sua frente. O quiz marca os sinais dentro da própria
            mensagem. A anatomia mostra o golpe do lado de quem aplica. Entender
            como a coisa funciona protege mais do que decorar o que não fazer.
          </p>

          <h2 className="mt-14 font-mono text-2xl font-semibold">
            As regras que o conteúdo segue
          </h2>
          <ul className="mt-8 divide-y divide-line border-y border-line">
            {REGRAS.map((r) => (
              <li key={r.titulo} className="py-6">
                <h3 className="font-mono text-lg font-semibold text-balance">
                  {r.titulo}
                </h3>
                <p className="mt-2.5 text-body leading-relaxed text-ink-2 text-pretty">
                  {r.texto}
                </p>
              </li>
            ))}
          </ul>

          <h2 className="mt-14 font-mono text-2xl font-semibold">
            Acessibilidade
          </h2>
          <p className="mt-5 text-body leading-relaxed text-ink-2 text-pretty">
            O público inclui gente com pouca familiaridade com tecnologia e
            gente que lê com dificuldade em tela, então isso aqui não é enfeite:
            todo texto passa de 4,5:1 de contraste, tudo que é interativo
            funciona pelo teclado com foco visível, os alvos de toque têm no
            mínimo 44 pixels, e quem configurou o sistema para reduzir animações
            recebe a página inteira sem movimento nenhum. Jargão só aparece
            explicado na frase seguinte.
          </p>
          <Fonte
            autor="W3C"
            obra="WCAG 2.2, critérios 1.4.3, 2.1.1, 2.4.7, 2.5.5 e 2.3.3"
            ano="2023"
            href="https://www.w3.org/TR/WCAG22/"
          />

          <h2 className="mt-14 font-mono text-2xl font-semibold">
            O que este site não é
          </h2>
          <p className="mt-5 text-body leading-relaxed text-ink-2 text-pretty">
            Não é orientação jurídica, não substitui o seu banco e não garante
            recuperação de dinheiro. Não vende produto, não indica serviço pago
            de proteção e não pede nenhum dado seu. Se em algum momento uma
            página aqui pedir CPF, senha ou pagamento, você não está no
            CyberGuard.
          </p>

          <div className="mt-12 border-t border-line pt-8">
            <div className="flex flex-wrap gap-3">
              <Link
                href="/no-trabalho"
                className="inline-flex min-h-touch items-center rounded-sm border border-line-strong px-5 py-3 font-mono text-sm text-ink transition-colors duration-200 hover:border-signal-amber hover:text-signal-amber"
              >
                A camada corporativa do Challenge →
              </Link>
              <Link
                href="/contato"
                className="inline-flex min-h-touch items-center rounded-sm border border-line px-5 py-3 font-mono text-sm text-ink-2 transition-colors duration-200 hover:text-ink"
              >
                Falar com a equipe
              </Link>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
