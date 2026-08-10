import type { Metadata } from "next";
import Link from "next/link";
import { PageHeader } from "@/components/layout/PageHeader";
import { TermosRelacionados } from "@/components/ui/TermosRelacionados";
import { MUDANCAS, DEFESAS } from "@/lib/ia";
import { Triagem } from "./Triagem";
import { PalavraCodigo } from "./PalavraCodigo";

export const metadata: Metadata = {
  title: "Inteligência artificial",
  description:
    "O que a IA mudou nos golpes, o que acontece com o que você digita num chatbot e quais defesas continuam funcionando quando voz e rosto podem ser imitados.",
};

export default function IaPage() {
  return (
    <>
      <PageHeader
        numero="04"
        eyebrow="Inteligência artificial"
        title="O que a IA mudou — e o que você entrega ao conversar com uma"
        description="Duas coisas diferentes num assunto só: o que acontece com o que você digita numa IA, e o que ela mudou na mecânica dos golpes. A boa notícia está no fim: as defesas que funcionavam continuam funcionando, e dá para explicar por quê."
      />

      {/* Parte 1 — privacidade */}
      <section className="py-14 md:py-20">
        <div className="container-read">
          <p className="label-field">Parte 1</p>
          <h2 className="mt-3 font-mono text-2xl font-semibold text-balance md:text-3xl">
            O que você digita num chatbot sai do seu aparelho
          </h2>

          <p className="mt-5 text-bodyLg leading-relaxed text-ink-2 text-pretty">
            Vale marcar a diferença: tudo o que é interativo neste site roda
            dentro do seu navegador e não vai a lugar nenhum. Uma conversa com
            uma IA é o oposto disso — cada mensagem viaja até o servidor de uma
            empresa, é processada lá e volta. Isso não é defeito, é como a coisa
            funciona. Mas muda o que faz sentido escrever.
          </p>

          <p className="mt-4 text-body leading-relaxed text-ink-2 text-pretty">
            Do lado de lá, dependendo do serviço e das configurações da sua
            conta, a conversa costuma ficar guardada no histórico, pode ser
            usada para treinar versões futuras do modelo e pode passar por
            revisão de pessoas em auditorias de qualidade e segurança. Apagar o
            chat na tela nem sempre apaga tudo imediatamente do outro lado.
            Cada empresa tem sua política, e elas mudam com frequência — a
            única resposta confiável está nas configurações do serviço que você
            usa.
          </p>

          <div className="mt-8 border-l-2 border-signal-amber py-2 pl-5">
            <p className="label-field text-signal-amber">A regra prática</p>
            <p className="mt-2 text-body leading-relaxed text-ink text-pretty">
              Antes de colar, pergunte: eu mostraria isso a um estranho
              competente e bem-intencionado, que vai guardar uma cópia? Se a
              resposta for não, não cole — ou tire o que identifica alguém
              antes.
            </p>
          </div>

          <h3 className="mt-14 font-mono text-xl font-semibold">
            Isso pode ir para uma IA pública?
          </h3>
          <p className="mt-3 text-body leading-relaxed text-ink-2 text-pretty">
            Oito situações comuns. Decida cada uma e veja o raciocínio — em
            várias delas a resposta é “depende”, e o que importa é de que
            depende.
          </p>

          <div className="mt-8">
            <Triagem />
          </div>

          <div className="mt-12 rounded-sm border border-line bg-panel p-6">
            <p className="label-field">Três ajustes que valem a pena</p>
            <ul className="mt-4 space-y-3.5 text-body leading-relaxed text-ink-2">
              <li>
                <strong className="font-semibold text-ink">
                  Desligue o uso das suas conversas para treinamento.
                </strong>{" "}
                Quase todo serviço grande oferece essa opção nas configurações
                de dados ou privacidade. Costuma vir ligada por padrão.
              </li>
              <li>
                <strong className="font-semibold text-ink">
                  Use o modo temporário para o que for delicado.
                </strong>{" "}
                A maioria tem uma opção de conversa sem histórico. É o
                equivalente à janela anônima do navegador.
              </li>
              <li>
                <strong className="font-semibold text-ink">
                  No trabalho, use só a ferramenta aprovada.
                </strong>{" "}
                Se a empresa contratou uma, ela existe porque tem contrato de
                confidencialidade por trás — a versão pública gratuita não tem.
                E cuidado com extensão de navegador ou app “com IA” de origem
                desconhecida: a política de dados deles costuma ser bem pior que
                a dos serviços grandes.
              </li>
            </ul>
          </div>
        </div>
      </section>

      {/* Parte 2 — o que mudou nos golpes */}
      <section className="border-y border-line bg-panel/40 py-14 md:py-20">
        <div className="container-read">
          <p className="label-field">Parte 2</p>
          <h2 className="mt-3 font-mono text-2xl font-semibold text-balance md:text-3xl">
            O que a IA mudou na mecânica do golpe
          </h2>
          <p className="mt-5 text-bodyLg leading-relaxed text-ink-2 text-pretty">
            Nenhum golpe novo foi inventado. O que mudou foi o custo: coisas que
            antes exigiam tempo, talento ou dinheiro agora saem em segundos e em
            escala.
          </p>

          <ol className="mt-10 divide-y divide-line border-y border-line">
            {MUDANCAS.map((m, i) => (
              <li key={m.titulo} className="py-7">
                <div className="flex items-baseline gap-4">
                  <span className="font-mono text-sm text-signal-amber">
                    {String(i + 1).padStart(2, "0")}
                  </span>
                  <h3 className="font-mono text-xl font-semibold text-balance">
                    {m.titulo}
                  </h3>
                </div>

                <div className="mt-4 space-y-3">
                  <div>
                    <p className="label-field">Como era</p>
                    <p className="mt-1.5 text-body leading-relaxed text-ink-2 text-pretty">
                      {m.oQueEra}
                    </p>
                  </div>
                  <div>
                    <p className="label-field">O que mudou</p>
                    <p className="mt-1.5 text-body leading-relaxed text-ink-2 text-pretty">
                      {m.oQueMudou}
                    </p>
                  </div>
                  <div className="border-l-2 border-signal-amber py-1 pl-4">
                    <p className="label-field text-signal-amber">
                      O que fazer com isso
                    </p>
                    <p className="mt-1.5 text-body leading-relaxed text-ink-2 text-pretty">
                      {m.oQueFazer}
                    </p>
                  </div>
                </div>
              </li>
            ))}
          </ol>
        </div>
      </section>

      {/* Parte 3 — o que continua funcionando */}
      <section className="py-14 md:py-20">
        <div className="container-read">
          <p className="label-field">Parte 3</p>
          <h2 className="mt-3 font-mono text-2xl font-semibold text-balance md:text-3xl">
            O que continua funcionando
          </h2>
          <p className="mt-5 text-bodyLg leading-relaxed text-ink-2 text-pretty">
            Todas as defesas abaixo têm uma coisa em comum, e é ela que faz
            valerem: nenhuma depende de você perceber que a imitação é
            imitação. Contra uma falsificação boa, tentar “notar alguma coisa
            estranha” é a estratégia que falha. As que funcionam saem do jogo da
            percepção e vão para o da verificação.
          </p>

          <ul className="mt-10 space-y-6">
            {DEFESAS.map((d) => (
              <li key={d.titulo} className="border-l-2 border-signal-green pl-5">
                <h3 className="font-mono text-lg font-semibold">{d.titulo}</h3>
                <p className="mt-2 text-body leading-relaxed text-ink-2 text-pretty">
                  {d.texto}
                </p>
              </li>
            ))}
          </ul>

          <div className="mt-10">
            <PalavraCodigo />
          </div>
        </div>
      </section>

      {/* Parte 4 — a incerteza, dita na cara */}
      <section className="border-t border-line bg-panel/40 py-14 md:py-20">
        <div className="container-read">
          <p className="label-field">A parte honesta</p>
          <h2 className="mt-3 font-mono text-2xl font-semibold text-balance md:text-3xl">
            Boa parte disso ainda não se sabe
          </h2>

          <p className="mt-5 text-body leading-relaxed text-ink-2 text-pretty">
            Esta é a seção mais instável do site, e seria desonesto fingir o
            contrário. As políticas de dados das empresas de IA mudam de um
            semestre para o outro. As técnicas de fraude estão sendo testadas
            agora. Não existe ainda um corpo de dados confiável sobre o tamanho
            real do problema no Brasil.
          </p>

          <p className="mt-4 text-body leading-relaxed text-ink-2 text-pretty">
            Por isso você não encontrou nenhum número nesta página. Circulam
            muitas porcentagens sobre golpes com IA, e quase todas vêm de
            empresas que vendem produtos de segurança — não passam na régua que
            o resto do site usa. Quando houver estatística oficial, ela entra
            aqui com fonte e ano.
          </p>

          <p className="mt-4 text-body leading-relaxed text-ink-2 text-pretty">
            Vale dizer também o outro lado: IA não está só do lado do ataque. É
            ela que filtra a maior parte do spam que você não vê, que sinaliza
            transação estranha no seu banco antes de você perceber e que derruba
            perfil falso em rede social. A tecnologia não tem lado — ela baixa o
            custo dos dois.
          </p>

          <p className="mt-6 border-l-2 border-line-strong py-1 pl-5 text-body leading-relaxed text-ink-2 text-pretty">
            Se você tem alguma dúvida específica sobre um uso que faz de IA e
            não achou resposta aqui, escreva. É o tipo de pergunta que vai
            moldar a próxima versão desta página.
          </p>

          <TermosRelacionados
            ids={[
              "modelo-de-linguagem",
              "alucinacao",
              "deepfake",
              "treinamento",
              "engenharia-social",
              "lgpd",
            ]}
          />

          <div className="mt-10 border-t border-line pt-8">
            <p className="text-body text-ink-2">
              Fechando o ciclo: os ajustes concretos que reduzem o seu risco,
              com ou sem IA envolvida.
            </p>
            <Link
              href="/agora"
              className="mt-5 inline-flex min-h-touch items-center rounded-sm border border-line-strong px-5 py-3 font-mono text-sm text-ink transition-colors duration-200 hover:border-signal-amber hover:text-signal-amber"
            >
              Próximo · O que fazer agora →
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}
