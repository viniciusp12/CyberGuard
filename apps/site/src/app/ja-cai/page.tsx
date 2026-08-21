import type { Metadata } from "next";
import Link from "next/link";
import { PageHeader } from "@/components/layout/PageHeader";
import { PendenteVerificacao } from "@/components/ui/Fonte";
import { TermosRelacionados } from "@/components/ui/TermosRelacionados";

export const metadata: Metadata = {
  title: "Já caí num golpe — e agora?",
  description:
    "O que fazer nas primeiras horas, em ordem: banco e devolução do PIX, boletim de ocorrência, avisar contatos, trocar senhas. Só canais oficiais.",
};

type Passo = {
  n: string;
  quando: string;
  titulo: string;
  texto: string;
  detalhe?: string;
};

const PASSOS: Passo[] = [
  {
    n: "01",
    quando: "nos primeiros minutos",
    titulo: "Ligue para o seu banco e peça o bloqueio",
    texto:
      "Use o telefone que está no verso do cartão ou o chat de dentro do aplicativo — nunca um número que veio na mensagem do golpe. Diga a frase exata: “fui vítima de fraude, quero registrar contestação e acionar o Mecanismo Especial de Devolução”.",
    detalhe:
      "O MED é a regra do Banco Central que permite tentar puxar de volta um PIX enviado sob fraude. Você tem até 80 dias para pedir e o banco tem até 7 dias para analisar, mas a chance real de reaver o dinheiro cai muito depois das primeiras horas — porque o valor é retirado da conta de destino rapidamente. Pedir no mesmo dia é o que decide.",
  },
  {
    n: "02",
    quando: "nos primeiros minutos",
    titulo: "Se foi o WhatsApp que tomaram, retome a conta agora",
    texto:
      "Reinstale o WhatsApp e faça login com o seu número. O código chega por SMS no seu chip, que continua sendo seu — e quem estiver usando a conta em outro aparelho é desconectado na hora.",
    detalhe:
      "Terminada a recuperação, ative imediatamente a verificação em duas etapas (Configurações → Privacidade → Verificação em duas etapas). Sem isso, dá para retomarem no minuto seguinte. Se aparecer pedido de PIN e você não tiver criado nenhum, é porque o golpista criou: o WhatsApp permite recuperar por e-mail ou impõe uma espera de sete dias.",
  },
  {
    n: "03",
    quando: "na primeira hora",
    titulo: "Avise os seus contatos por outro caminho",
    texto:
      "Ligue, mande áudio de outro número, poste nos stories, escreva no grupo da família. Diga a frase mais curta possível: “meu WhatsApp foi clonado, não mandem PIX para ninguém que se diga eu”.",
    detalhe:
      "Este passo não recupera o seu dinheiro — ele impede o prejuízo das outras dez pessoas. Em golpe de conta tomada, quem paga a conta quase sempre é um conhecido da vítima.",
  },
  {
    n: "04",
    quando: "no mesmo dia",
    titulo: "Registre boletim de ocorrência",
    texto:
      "Dá para fazer pela internet, de graça, pela delegacia eletrônica do seu estado, com login gov.br. O boletim tem a mesma validade do feito na delegacia.",
    detalhe:
      "Não é burocracia inútil: o número do BO costuma ser exigido pelo banco na contestação, sustenta o pedido de devolução e é o que existe caso alguém abra crédito no seu nome depois.",
  },
  {
    n: "05",
    quando: "no mesmo dia",
    titulo: "Troque as senhas, começando pelo e-mail",
    texto:
      "O e-mail primeiro, sempre — é por ele que se redefine a senha de todo o resto. Depois banco, redes sociais e qualquer lugar onde você usava a mesma senha.",
    detalhe:
      "Em cada conta, procure “aparelhos conectados” ou “sessões ativas” e desconecte tudo o que você não reconhece. Trocar a senha sem encerrar as sessões deixa quem já estava dentro continuar dentro em vários serviços.",
  },
  {
    n: "06",
    quando: "nos primeiros dias",
    titulo: "Veja o que existe no seu nome",
    texto:
      "O Banco Central tem um serviço gratuito, o Registrato, que mostra contas abertas, empréstimos e chaves PIX registradas no seu CPF. Serve para descobrir o que foi feito com os seus dados sem você saber.",
  },
  {
    n: "07",
    quando: "se não resolver",
    titulo: "Escale para o canal oficial de reclamação",
    texto:
      "Se o banco negar a contestação sem explicação ou não responder, registre no Consumidor.gov.br, que é a plataforma oficial do Ministério da Justiça — a empresa tem dez dias para responder e a resposta fica registrada. Se o problema envolveu troca de chip pela operadora, a reclamação também vai para a Anatel.",
  },
];

type Canal = {
  nome: string;
  o_que: string;
  href?: string;
  rotulo?: string;
  pendente?: string;
};

const CANAIS: Canal[] = [
  {
    nome: "Seu banco",
    o_que:
      "Contestação e Mecanismo Especial de Devolução do PIX. É o canal mais importante e o mais rápido.",
    rotulo:
      "Pelo telefone do verso do cartão ou pelo chat de dentro do aplicativo. Não existe um site único — desconfie de qualquer um que apareça em busca patrocinada.",
  },
  {
    nome: "Delegacia eletrônica de São Paulo",
    o_que: "Registro de boletim de ocorrência pela internet, com login gov.br.",
    href: "https://www.delegaciaeletronica.policiacivil.sp.gov.br/",
  },
  {
    nome: "Delegacia eletrônica dos demais estados",
    o_que:
      "Cada estado tem o seu portal, com nome e endereço diferentes (Delegacia Online, Delegacia Virtual, BO Online).",
    pendente:
      "Endereços por estado ainda não conferidos um a um. Enquanto isso, o caminho seguro é buscar “delegacia eletrônica” mais o nome do seu estado e conferir se o domínio termina em .gov.br antes de digitar qualquer dado.",
  },
  {
    nome: "Registrato — Banco Central",
    o_que:
      "Relatório gratuito de contas, empréstimos e chaves PIX registrados no seu CPF. Acesso pela conta gov.br.",
    href: "https://www.gov.br/pt-br/servicos/emitir-relatorio-de-chaves-pix",
  },
  {
    nome: "Consumidor.gov.br",
    o_que:
      "Plataforma oficial do Ministério da Justiça para reclamar de empresa que não resolveu. A empresa tem dez dias para responder.",
    href: "https://www.consumidor.gov.br",
  },
  {
    nome: "Anatel",
    o_que:
      "Reclamação contra operadora de telefonia — o caminho quando houve troca indevida de chip. Exige o número de protocolo do atendimento da operadora antes.",
    href: "https://www.gov.br/anatel/pt-br/consumidor/quer-reclamar/reclamacao",
  },
];

const NAO_FACA = [
  {
    titulo: "Não pague nada para “recuperar” o dinheiro",
    texto:
      "O segundo golpe vem em cima do primeiro: alguém aparece dizendo que consegue reaver o valor mediante uma taxa. Recuperação de fraude não se compra, e ninguém fora do seu banco tem esse poder.",
  },
  {
    titulo: "Não procure o telefone do banco no buscador",
    texto:
      "Criminosos compram anúncios com números falsos de central de atendimento, e eles aparecem antes do resultado verdadeiro. Use só o número do verso do cartão ou o chat de dentro do app.",
  },
  {
    titulo: "Não apague as mensagens",
    texto:
      "Print de conversa, comprovante de PIX, número de quem chamou, horário. Tudo isso é o que sustenta a contestação e o boletim. Tire foto de tudo antes de qualquer coisa.",
  },
  {
    titulo: "Não fique sozinho com isso",
    texto:
      "A vergonha é o que mais atrasa a reação, e atraso é justamente o que o golpe precisa. Contar a alguém na primeira hora vale mais do que qualquer configuração.",
  },
];

export default function JaCaiPage() {
  return (
    <>
      <PageHeader
        numero="06"
        eyebrow="Resposta a incidente"
        title="Já caí num golpe — e agora?"
        description="Primeiro: não é culpa sua, e você não é ingênuo. Golpe é feito por gente que faz isso profissionalmente, testando o que funciona em milhares de pessoas. O que importa agora é a ordem das próximas horas."
      />

      {/* Ação imediata, antes de qualquer leitura longa. */}
      <section className="border-b border-chumbo-linha bg-ambarDim/40 py-8">
        <div className="container-read">
          <p className="etiqueta-risco">Se acabou de acontecer</p>
          <p className="mt-3 text-bodyLg text-papel text-pretty">
            Ligue para o seu banco agora, pelo número do verso do cartão, e diga
            que foi vítima de fraude. Faça isso antes de ler o resto desta
            página — a chance de reaver dinheiro cai a cada hora.
          </p>
        </div>
      </section>

      <section className="py-14 md:py-20">
        <div className="container-read">
          <h2 className="font-display text-2xl font-semibold">
            As primeiras horas, em ordem
          </h2>

          <ol className="mt-10 space-y-10">
            {PASSOS.map((p) => (
              <li key={p.n} className="border-t border-chumbo-linha pt-6">
                <div className="flex flex-wrap items-baseline gap-x-4 gap-y-1">
                  <span className="font-display text-sm font-semibold text-menta">
                    {p.n}
                  </span>
                  <span className="etiqueta">{p.quando}</span>
                </div>

                <h3 className="mt-3 font-display text-xl font-semibold text-balance">
                  {p.titulo}
                </h3>
                <p className="mt-3 text-body leading-relaxed text-papel-2 text-pretty">
                  {p.texto}
                </p>
                {p.detalhe && (
                  <p className="mt-3 border-l-2 border-chumbo-linhaForte py-1 pl-4 text-sm leading-relaxed text-papel-3">
                    {p.detalhe}
                  </p>
                )}
              </li>
            ))}
          </ol>
        </div>
      </section>

      <section className="border-t border-chumbo-linha bg-chumbo-painel/40 py-14 md:py-20">
        <div className="container-read">
          <h2 className="font-display text-2xl font-semibold">O que não fazer</h2>
          <ul className="mt-8 space-y-6">
            {NAO_FACA.map((n) => (
              <li key={n.titulo} className="border-l-2 border-ambar pl-5">
                <h3 className="font-display text-lg font-semibold">{n.titulo}</h3>
                <p className="mt-2 text-body leading-relaxed text-papel-2 text-pretty">
                  {n.texto}
                </p>
              </li>
            ))}
          </ul>
        </div>
      </section>

      <section className="border-t border-chumbo-linha py-14 md:py-20">
        <div className="container-read">
          <h2 className="font-display text-2xl font-semibold">Canais oficiais</h2>
          <p className="mt-3 text-body text-papel-2 text-pretty">
            Só entram aqui canais de órgão público ou da própria instituição.
            Nenhum intermediário, nenhum serviço pago de “recuperação”.
          </p>

          <ul className="mt-8 divide-y divide-chumbo-linha border-y border-chumbo-linha">
            {CANAIS.map((c) => (
              <li key={c.nome} className="py-6">
                <h3 className="font-display text-lg font-semibold">{c.nome}</h3>
                <p className="mt-2 text-body leading-relaxed text-papel-2 text-pretty">
                  {c.o_que}
                </p>

                {c.href && (
                  <a
                    href={c.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="mt-3 inline-flex min-h-touch items-center break-all font-display text-sm text-menta underline decoration-menta/40 underline-offset-4 transition-colors hover:decoration-menta"
                  >
                    {c.href.replace(/^https:\/\//, "")} ↗
                  </a>
                )}

                {c.rotulo && (
                  <p className="mt-3 text-sm leading-relaxed text-papel-3">
                    {c.rotulo}
                  </p>
                )}

                {c.pendente && (
                  <div className="mt-3">
                    <PendenteVerificacao>
                      link pendente de conferência
                    </PendenteVerificacao>
                    <p className="mt-2 text-sm leading-relaxed text-papel-3">
                      {c.pendente}
                    </p>
                  </div>
                )}
              </li>
            ))}
          </ul>

          <p className="mt-6 font-display text-xs leading-relaxed text-papel-3">
            Regra desta página: nenhum endereço é publicado por suposição. Os
            links acima apontam para domínios de órgão público conferidos; o que
            ainda não foi conferido aparece marcado, com o caminho seguro para
            você mesmo chegar lá.
          </p>

          <TermosRelacionados
            ids={["med", "chave-pix", "registrato", "conta-gov-br", "sim-swap", "lgpd"]}
          />
        </div>
      </section>

      <section className="border-t border-chumbo-linha bg-chumbo-painel/40 py-14 md:py-20">
        <div className="container-read">
          <p className="text-body text-papel-2 text-pretty">
            Passada a urgência, vale fechar as portas que ficaram abertas.
          </p>
          <Link
            href="/agora"
            className="mt-5 inline-flex min-h-touch items-center rounded-sm border border-chumbo-linhaForte px-5 py-3 font-display text-sm text-papel transition-colors duration-200 hover:border-menta hover:text-menta"
          >
            O que fazer agora — os oito ajustes →
          </Link>
        </div>
      </section>
    </>
  );
}
