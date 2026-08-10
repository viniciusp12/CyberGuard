import type { Metadata } from "next";
import Link from "next/link";
import { PageHeader } from "@/components/layout/PageHeader";
import { TermosRelacionados } from "@/components/ui/TermosRelacionados";

export const metadata: Metadata = {
  title: "Os mesmos golpes no trabalho",
  description:
    "Fraude no expediente: pedido urgente da diretoria, boleto trocado, falso suporte de TI, ransomware e dados de cliente. Escrito para o contexto do varejo.",
};

type Ameaca = {
  titulo: string;
  comoChega: string;
  porQueFunciona: string;
  oQueFazer: string;
};

const AMEACAS: Ameaca[] = [
  {
    titulo: "O falso suporte de TI",
    comoChega:
      "Alguém liga dizendo ser da TI, do time de segurança ou de um fornecedor de sistema. Fala com naturalidade, cita nomes internos que qualquer um encontra no LinkedIn, e pede sua senha ou o código de verificação “para resolver um chamado urgente antes do fim do expediente”.",
    porQueFunciona:
      "Explora autoridade e pressa ao mesmo tempo, e chega quando você está no meio de outra coisa. Recusar parece falta de colaboração.",
    oQueFazer:
      "TI nenhuma precisa da sua senha — ela tem acesso administrativo. Desligue e ligue de volta pelo ramal da lista interna, nunca pelo número que apareceu no visor. Um pedido legítimo sobrevive a essa conferência sem problema nenhum.",
  },
  {
    titulo: "O pedido urgente da diretoria",
    comoChega:
      "Um e-mail ou WhatsApp assinado por alguém da liderança pede um pagamento fora do fluxo normal, com discrição e prazo apertado. O endereço é parecido com o corporativo, mas com uma letra trocada ou um domínio quase igual.",
    porQueFunciona:
      "Ninguém quer ser o funcionário que atrasou uma decisão da diretoria. A hierarquia faz o trabalho que a técnica não faria.",
    oQueFazer:
      "Todo pagamento fora do fluxo padrão exige confirmação por um segundo canal, com uma pessoa, por voz. Isso não é desconfiança da liderança — é o controle que existe justamente para proteger quem executa.",
  },
  {
    titulo: "O boleto e a nota fiscal trocados",
    comoChega:
      "Um fornecedor conhecido manda a cobrança de sempre, no formato de sempre — só que a conta de destino mudou, com a explicação de que “trocamos de banco”.",
    porQueFunciona:
      "Muitas vezes a caixa de e-mail do fornecedor foi comprometida de verdade, e a mensagem vem mesmo do endereço legítimo, no meio de uma conversa real.",
    oQueFazer:
      "Mudança de dados bancários de fornecedor sempre se confirma por telefone, no número já cadastrado — nunca no número que veio no e-mail novo.",
  },
  {
    titulo: "Anexo que executa em vez de abrir",
    comoChega:
      "Um pedido de orçamento, um currículo, uma segunda via de nota. O arquivo pede para “habilitar edição” ou “habilitar conteúdo” para ver direito, ou tem uma extensão incomum (.exe, .scr, .js, .iso, .lnk).",
    porQueFunciona:
      "O contexto é plausível e o pedido de habilitar parece uma etapa técnica chata, não uma decisão de segurança.",
    oQueFazer:
      "Habilitar conteúdo em documento recebido por e-mail é o passo que liga o código. Na dúvida, não abra: encaminhe para a TI. Um orçamento perdido custa menos que uma loja parada.",
  },
  {
    titulo: "Ransomware",
    comoChega:
      "Quase sempre entra por um dos itens acima — um anexo aberto, uma credencial reutilizada, um acesso remoto exposto. Depois se espalha pela rede e criptografa arquivos e sistemas, exigindo pagamento.",
    porQueFunciona:
      "Não depende de um golpe espetacular. Depende de uma única porta destrancada em qualquer ponto da rede.",
    oQueFazer:
      "Se a tela pedir resgate, ou se arquivos começarem a virar nomes estranhos: desconecte a máquina da rede na hora — tire o cabo, desligue o Wi-Fi — e acione a TI. Não desligue o computador se puderem orientar o contrário, e não pague nada por conta própria.",
  },
  {
    titulo: "Dados de cliente fora do lugar",
    comoChega:
      "Nem sempre é ataque. É a planilha com CPF exportada para o e-mail pessoal para adiantar o trabalho em casa, o print de cadastro mandado no grupo de WhatsApp da equipe, a foto do sistema com dados na tela.",
    porQueFunciona:
      "A intenção é boa e o atalho resolve o dia. O vazamento só aparece depois, quando aquele arquivo já está em quatro lugares.",
    oQueFazer:
      "Dado pessoal de cliente circula só pelos sistemas e canais autorizados, e só na quantidade necessária para a tarefa. Suspeita de vazamento vai imediatamente para o encarregado de dados — a LGPD trabalha com prazo, e o relógio começa na descoberta.",
  },
];

const INCIDENTE = [
  {
    n: "01",
    titulo: "Avise antes de tentar consertar",
    texto:
      "O tempo entre o clique e o aviso é o que define o tamanho do estrago. Avisar em cinco minutos com vergonha vale muito mais que avisar em dois dias com uma explicação pronta.",
  },
  {
    n: "02",
    titulo: "Isole a máquina, não a informação",
    texto:
      "Desconecte da rede para conter, mas conte tudo o que aconteceu, inclusive a parte que parece constrangedora. Detalhe omitido é investigação que começa errada.",
  },
  {
    n: "03",
    titulo: "Não apague nada",
    texto:
      "O e-mail, o arquivo, o histórico. Apagar por vergonha destrói a evidência de que a segurança precisa para saber até onde o problema chegou.",
  },
  {
    n: "04",
    titulo: "Anote os horários",
    texto:
      "Quando chegou, quando você clicou, quando percebeu, o que fez no meio. Essa linha do tempo é a primeira coisa que vão pedir.",
  },
  {
    n: "05",
    titulo: "Troque as credenciais envolvidas",
    texto:
      "Com orientação da TI, e em todos os lugares onde aquela senha foi usada — inclusive nos pessoais, se houver reuso.",
  },
];

export default function NoTrabalhoPage() {
  return (
    <>
      <PageHeader
        eyebrow="Camada corporativa · Challenge Leroy Merlin"
        title="Os mesmos golpes, quando você está no trabalho"
        description="Muda o alvo, não o método. No expediente, a pressa vem da hierarquia e do fechamento do mês — e o prejuízo deixa de ser só seu."
      />

      <section className="py-14 md:py-20">
        <div className="container-page">
          <div className="mb-12 max-w-2xl border-l-2 border-line pl-5">
            <p className="text-body text-ink-2 text-pretty">
              Uma premissa que vale para tudo o que vem abaixo: quem cai não é
              descuidado. Cai quem estava resolvendo três coisas ao mesmo tempo
              às 17h50 de uma sexta — ou seja, todo mundo, uma hora ou outra. Um
              ambiente em que as pessoas têm medo de avisar é um ambiente onde
              os incidentes só aparecem grandes.
            </p>
          </div>

          <ul className="space-y-px bg-line">
            {AMEACAS.map((a) => (
              <li key={a.titulo} className="bg-page py-8 md:px-6">
                <h2 className="font-mono text-xl font-semibold text-balance md:text-2xl">
                  {a.titulo}
                </h2>

                <div className="mt-5 grid gap-6 md:grid-cols-3">
                  <div>
                    <p className="label-field">Como chega</p>
                    <p className="mt-2 text-sm leading-relaxed text-ink-2">
                      {a.comoChega}
                    </p>
                  </div>
                  <div>
                    <p className="label-field">Por que funciona</p>
                    <p className="mt-2 text-sm leading-relaxed text-ink-2">
                      {a.porQueFunciona}
                    </p>
                  </div>
                  <div>
                    <p className="label-field text-signal-amber">
                      O que fazer
                    </p>
                    <p className="mt-2 text-sm leading-relaxed text-ink-2">
                      {a.oQueFazer}
                    </p>
                  </div>
                </div>
              </li>
            ))}
          </ul>
        </div>
      </section>

      {/* Correção de um mito que aparecia na versão anterior deste site. */}
      <section className="border-y border-line bg-panel/40 py-14 md:py-20">
        <div className="container-read">
          <p className="label-field text-signal-amber">
            Uma correção sobre Wi-Fi público
          </p>
          <h2 className="mt-4 font-mono text-2xl font-semibold text-balance">
            “Alguém na mesma rede lê a sua senha” já não é mais o risco
          </h2>
          <p className="mt-5 text-body leading-relaxed text-ink-2 text-pretty">
            Esse aviso vem de uma web em que os sites trafegavam sem
            criptografia. Hoje praticamente todo site sério usa HTTPS, e o
            conteúdo do que você acessa não é legível por quem está na mesma
            rede. Repetir o alerta antigo desgasta a confiança no resto do
            conselho.
          </p>
          <p className="mt-4 text-body leading-relaxed text-ink-2 text-pretty">
            O risco real hoje é outro. Primeiro, a rede com nome clonado: um
            ponto de acesso chamado igual ao do shopping, do hotel ou da loja,
            que te leva a uma tela de login falsa. Segundo, a tela de cadastro
            da própria rede aberta, pedindo CPF, telefone e e-mail — dados que
            alimentam a próxima mensagem de golpe. Terceiro, o mais banal: a
            tela do notebook visível para quem está atrás de você.
          </p>
          <p className="mt-4 text-body leading-relaxed text-ink-2 text-pretty">
            O que resolve: preferir o 4G ou 5G do celular a rede aberta
            desconhecida; nunca fazer login numa tela que apareceu sozinha ao
            conectar; e, para sistema interno, usar a VPN da empresa — que aí
            sim tem função clara, que é dar acesso à rede corporativa com
            identidade verificada.
          </p>
        </div>
      </section>

      <section className="py-14 md:py-20">
        <div className="container-read">
          <h2 className="font-mono text-2xl font-semibold">
            Se acontecer com você no expediente
          </h2>
          <ol className="mt-8 divide-y divide-line border-y border-line">
            {INCIDENTE.map((i) => (
              <li key={i.n} className="flex gap-5 py-6">
                <span className="font-mono text-sm text-signal-amber">
                  {i.n}
                </span>
                <div>
                  <h3 className="font-mono text-lg font-semibold">{i.titulo}</h3>
                  <p className="mt-2 text-body leading-relaxed text-ink-2 text-pretty">
                    {i.texto}
                  </p>
                </div>
              </li>
            ))}
          </ol>

          <TermosRelacionados
            ids={[
              "https",
              "vpn",
              "rede-aberta",
              "ransomware",
              "malware",
              "engenharia-social",
              "lgpd",
            ]}
          />

          <div className="mt-10 border-t border-line pt-8">
            <p className="text-body text-ink-2">
              Fora do expediente, o alvo volta a ser você e a sua família.
            </p>
            <Link
              href="/golpe"
              className="mt-5 inline-flex min-h-touch items-center rounded-sm border border-line-strong px-5 py-3 font-mono text-sm text-ink transition-colors duration-200 hover:border-signal-amber hover:text-signal-amber"
            >
              Voltar para os golpes do dia a dia →
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}
