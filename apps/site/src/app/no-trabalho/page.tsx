import type { Metadata } from "next";
import Link from "next/link";
import { PageHeader } from "@/components/layout/PageHeader";
import { Essencial } from "@/components/ui/Essencial";
import { TermosRelacionados } from "@/components/ui/TermosRelacionados";
import { Fonte } from "@/components/ui/Fonte";
import { CATEGORIAS, PASSOS_INCIDENTE, TOTAL_GOLPES } from "@/lib/trabalho";

export const metadata: Metadata = {
  title: "Os mesmos golpes no trabalho",
  description:
    "Quatorze fraudes que miram quem está no expediente — QR code trocado, login falso, bombardeio de MFA, boleto adulterado, ransomware — com o ponto exato em que cada uma quebra.",
};

const MEDOS = [
  {
    medo: "“Vão achar que sou burro.”",
    real: "Quem aplica isso faz o dia inteiro, testando o que funciona em milhares de pessoas. Cair é o resultado esperado de uma técnica boa chegando num dia ruim, não um teste de inteligência.",
  },
  {
    medo: "“Vou levar bronca.”",
    real: "Numa empresa que entendeu o problema, a bronca é por esconder, nunca por avisar. Se a sua não é assim ainda, avisar continua sendo a decisão certa — o estrago de esconder é maior, e ele sempre aparece.",
  },
  {
    medo: "“Talvez não tenha sido nada, não quero dar trabalho.”",
    real: "Falso alarme custa dez minutos de alguém. Alarme atrasado custa dias de operação. A segurança prefere cem avisos à toa a um silêncio de dois dias.",
  },
  {
    medo: "“Vou esperar para ver se dá problema.”",
    real: "É a pior das opções. Nas primeiras horas dá para bloquear acesso, cancelar pagamento e conter o alastramento. Depois, resta contar o prejuízo.",
  },
];

export default function NoTrabalhoPage() {
  return (
    <>
      <PageHeader
        eyebrow="Camada corporativa · Challenge Leroy Merlin"
        title="Os mesmos golpes, quando você está no trabalho"
        description="Muda o alvo, não o método. No expediente a pressa vem da hierarquia e do fechamento do mês, o dinheiro não é seu, e o prejuízo respinga em cliente e colega."
      />

      <section className="pt-10 md:pt-12">
        <div className="container-read">
          <Essencial
            itens={[
              "No trabalho o golpe mira processo, não pessoa: pagamento, acesso e cadeia de fornecedores.",
              "Cultura de reporte importa mais que treinamento — quem tem medo de avisar esconde o incidente.",
              "A LGPD dá prazo para comunicar vazamento à ANPD; o relógio começa a correr na descoberta.",
            ]}
          />
        </div>
      </section>

      <section className="py-14 md:py-20">
        <div className="container-page">
          <div className="mb-12 max-w-2xl border-l-2 border-chumbo-linha pl-5">
            <p className="text-body text-papel-2 text-pretty">
              Uma premissa que vale para tudo o que vem abaixo: quem cai não é
              descuidado. Cai quem estava resolvendo três coisas ao mesmo tempo
              às 17h50 de uma sexta — ou seja, todo mundo, uma hora ou outra. Um
              ambiente em que as pessoas têm medo de avisar é um ambiente onde
              os incidentes só aparecem grandes.
            </p>
          </div>

          {/* Índice: com 14 golpes, uma lista corrida vira parede de texto. */}
          <nav aria-label="Categorias" className="mb-14">
            <p className="etiqueta">
              {TOTAL_GOLPES} golpes, em cinco famílias
            </p>
            <ul className="mt-4 grid gap-2 sm:grid-cols-2 lg:grid-cols-3">
              {CATEGORIAS.map((c) => (
                <li key={c.id}>
                  {/* A contagem vai à direita: à esquerda ela era lida como
                      número de ordem, igual às seções 01–06 do site. */}
                  <a
                    href={`#${c.id}`}
                    className="flex min-h-touch items-center justify-between gap-3 rounded-sm border border-chumbo-linha px-4 font-display text-sm text-papel-2 transition-colors duration-200 hover:border-menta hover:text-menta"
                  >
                    {c.titulo}
                    <span className="shrink-0 text-xs text-papel-3">
                      {`${c.golpes.length} golpes`}
                    </span>
                  </a>
                </li>
              ))}
            </ul>
          </nav>

          <div className="space-y-16">
            {CATEGORIAS.map((cat) => (
              <section
                key={cat.id}
                id={cat.id}
                className="scroll-mt-24"
                aria-labelledby={`titulo-${cat.id}`}
              >
                <h2
                  id={`titulo-${cat.id}`}
                  className="font-display text-2xl font-semibold text-balance md:text-3xl"
                >
                  {cat.titulo}
                </h2>
                <p className="mt-3 max-w-2xl text-body text-papel-2 text-pretty">
                  {cat.resumo}
                </p>

                <ul className="mt-8 space-y-px bg-chumbo-linha">
                  {cat.golpes.map((g) => (
                    <li key={g.id} className="bg-chumbo py-8 md:px-6">
                      <h3 className="font-display text-xl font-semibold text-balance">
                        {g.titulo}
                      </h3>

                      <div className="mt-5 grid gap-6 md:grid-cols-2">
                        <div>
                          <p className="etiqueta">Como chega</p>
                          <p className="mt-2 text-sm leading-relaxed text-papel-2">
                            {g.comoChega}
                          </p>
                        </div>
                        <div>
                          <p className="etiqueta">Por que funciona</p>
                          <p className="mt-2 text-sm leading-relaxed text-papel-2">
                            {g.porQueFunciona}
                          </p>
                        </div>
                      </div>

                      <div className="mt-5 border-l-2 border-menta py-2 pl-4">
                        <p className="etiqueta-risco">
                          Onde o golpe quebra
                        </p>
                        <p className="mt-1.5 text-body leading-relaxed text-papel text-pretty">
                          {g.pontoDeQuebra}
                        </p>
                      </div>

                      <div className="mt-4">
                        <p className="etiqueta">O que fazer</p>
                        <p className="mt-1.5 text-sm leading-relaxed text-papel-2">
                          {g.oQueFazer}
                        </p>
                      </div>
                    </li>
                  ))}
                </ul>
              </section>
            ))}
          </div>
        </div>
      </section>

      {/* Correção de um mito que aparecia na versão anterior deste site. */}
      <section className="border-y border-chumbo-linha bg-chumbo-painel/40 py-14 md:py-20">
        <div className="container-read">
          <p className="etiqueta-risco">
            Uma correção sobre Wi-Fi público
          </p>
          <h2 className="mt-4 font-display text-2xl font-semibold text-balance">
            “Alguém na mesma rede lê a sua senha” já não é mais o risco
          </h2>
          <p className="mt-5 text-body leading-relaxed text-papel-2 text-pretty">
            Esse aviso vem de uma web em que os sites trafegavam sem
            criptografia. Hoje praticamente todo site sério usa HTTPS, e o
            conteúdo do que você acessa não é legível por quem está na mesma
            rede. Repetir o alerta antigo desgasta a confiança no resto do
            conselho.
          </p>
          <p className="mt-4 text-body leading-relaxed text-papel-2 text-pretty">
            O risco real hoje é outro. Primeiro, a rede com nome clonado: um
            ponto de acesso chamado igual ao do shopping, do hotel ou da loja,
            que te leva a uma tela de login falsa. Segundo, a tela de cadastro
            da própria rede aberta, pedindo CPF, telefone e e-mail — dados que
            alimentam a próxima mensagem de golpe. Terceiro, o mais banal: a
            tela do notebook visível para quem está atrás de você.
          </p>
          <p className="mt-4 text-body leading-relaxed text-papel-2 text-pretty">
            O que resolve: preferir o 4G ou 5G do celular a rede aberta
            desconhecida; nunca fazer login numa tela que apareceu sozinha ao
            conectar; e, para sistema interno, usar a VPN da empresa — que aí
            sim tem função clara, que é dar acesso à rede corporativa com
            identidade verificada.
          </p>
        </div>
      </section>

      {/* Cultura de reporte — a parte que quase nenhum material corporativo tem. */}
      <section className="py-14 md:py-20">
        <div className="container-read">
          <p className="etiqueta">Contragolpe</p>
          <h2 className="mt-3 font-display text-2xl font-semibold text-balance md:text-3xl">
            Avisar rápido vale mais que qualquer configuração
          </h2>

          <p className="mt-5 text-bodyLg leading-relaxed text-papel-2 text-pretty">
            O tamanho de um incidente quase nunca é definido pela técnica do
            ataque. É definido por quantos minutos passaram entre a pessoa
            perceber e alguém poder agir. Nesse intervalo dá para bloquear um
            acesso, sustar um pagamento, tirar uma máquina da rede. Depois dele,
            resta contar o prejuízo.
          </p>

          <p className="mt-4 text-body leading-relaxed text-papel-2 text-pretty">
            E o que mais alarga esse intervalo não é falta de treinamento. É
            vergonha. Por isso vale enfrentar as quatro frases que passam pela
            cabeça de quem acabou de clicar em algo errado:
          </p>

          <dl className="mt-8 divide-y divide-chumbo-linha border-y border-chumbo-linha">
            {MEDOS.map((m) => (
              <div key={m.medo} className="py-5">
                <dt className="font-display text-base text-papel">{m.medo}</dt>
                <dd className="mt-2 text-body leading-relaxed text-papel-2 text-pretty">
                  {m.real}
                </dd>
              </div>
            ))}
          </dl>

          <div className="mt-10 border-l-2 border-menta py-2 pl-5">
            <p className="etiqueta text-menta">
              Se você lidera uma equipe
            </p>
            <p className="mt-2 text-body leading-relaxed text-papel-2 text-pretty">
              A sua reação ao primeiro aviso define se haverá um segundo. Quem
              é repreendido ao reportar não deixa de errar — deixa de contar, e
              o próximo incidente só aparece quando já é grande. Agradecer o
              aviso na frente da equipe, mesmo quando foi falso alarme, é a
              medida de segurança mais barata que existe e não depende de
              orçamento nenhum.
            </p>
          </div>
        </div>
      </section>

      {/* Resposta a incidente. */}
      <section className="border-t border-chumbo-linha bg-chumbo-painel/40 py-14 md:py-20">
        <div className="container-read">
          <h2 className="font-display text-2xl font-semibold">
            Se acontecer com você no expediente
          </h2>
          <p className="mt-3 text-body text-papel-2 text-pretty">
            A ordem importa mais que a rapidez de cada passo isolado.
          </p>

          <ol className="mt-8 divide-y divide-chumbo-linha border-y border-chumbo-linha">
            {PASSOS_INCIDENTE.map((i) => (
              <li key={i.n} className="py-6">
                <div className="flex flex-wrap items-baseline gap-x-4 gap-y-1">
                  <span className="font-display text-sm font-semibold text-menta">
                    {i.n}
                  </span>
                  <span className="etiqueta">{i.quando}</span>
                </div>
                <h3 className="mt-2 font-display text-lg font-semibold text-balance">
                  {i.titulo}
                </h3>
                <p className="mt-2 text-body leading-relaxed text-papel-2 text-pretty">
                  {i.texto}
                </p>
              </li>
            ))}
          </ol>

          <div className="mt-10 rounded-sm border border-chumbo-linha bg-chumbo-painel p-6">
            <p className="etiqueta">O prazo legal, para quem precisa saber</p>
            <p className="mt-3 text-body leading-relaxed text-papel-2 text-pretty">
              Quando um incidente de segurança atinge dados pessoais e pode
              acarretar risco relevante às pessoas afetadas, o controlador tem{" "}
              <strong className="font-semibold text-papel">
                três dias úteis
              </strong>{" "}
              para comunicar a Autoridade Nacional de Proteção de Dados e os
              titulares. O prazo conta a partir do momento em que a empresa
              toma conhecimento de que o incidente afetou dados pessoais.
            </p>
            <p className="mt-3 text-body leading-relaxed text-papel-2 text-pretty">
              É por isso que o seu aviso rápido não é só boa vontade: ele é o
              que faz o relógio começar cedo o bastante para a empresa
              conseguir cumprir a lei. Quem conduz essa comunicação é o
              encarregado de dados, nunca você por conta própria.
            </p>
            <Fonte
              autor="ANPD"
              obra="Resolução CD/ANPD nº 15, Regulamento de Comunicação de Incidente de Segurança"
              ano="2024"
              href="https://www.gov.br/anpd/pt-br/assuntos/noticias/anpd-aprova-o-regulamento-de-comunicacao-de-incidente-de-seguranca"
            />
          </div>

          <TermosRelacionados
            ids={[
              "phishing",
              "engenharia-social",
              "2fa",
              "ransomware",
              "malware",
              "vazamento",
              "lgpd",
              "vpn",
              "rede-aberta",
            ]}
          />

          <div className="mt-10 border-t border-chumbo-linha pt-8">
            <p className="text-body text-papel-2">
              Fora do expediente, o alvo volta a ser você e a sua família — e o
              método é exatamente o mesmo.
            </p>
            <Link
              href="/golpe"
              className="mt-5 inline-flex min-h-touch items-center rounded-sm border border-chumbo-linhaForte px-5 py-3 font-display text-sm text-papel transition-colors duration-200 hover:border-menta hover:text-menta"
            >
              Voltar para os golpes do dia a dia →
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}
