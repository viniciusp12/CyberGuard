"use client";

import { useState } from "react";

type Item = {
  id: string;
  titulo: string;
  /** O que é, em uma frase, sem jargão. */
  oQue: string;
  /** Por que isso existe. */
  porque: string;
  /** O que concretamente deixa de acontecer. */
  impacto: string;
  /** Caminho curto para fazer. */
  como: string;
  prioridade: 1 | 2;
};

const ITENS: Item[] = [
  {
    id: "2fa-whats",
    titulo: "Ligue a verificação em duas etapas do WhatsApp",
    oQue:
      "Um PIN de seis dígitos, escolhido por você, que o WhatsApp passa a exigir para instalar a sua conta em qualquer aparelho novo.",
    porque:
      "O golpe de clonagem inteiro depende de um único código que chega por SMS. Esse PIN acrescenta uma segunda chave que não trafega por lugar nenhum — está só na sua cabeça.",
    impacto:
      "Mesmo que você entregue o código do SMS para um golpista ao telefone, a conta não sai do seu celular.",
    como: "WhatsApp → Configurações → Privacidade → Verificação em duas etapas → Ativar. Cadastre um e-mail de recuperação junto.",
    prioridade: 1,
  },
  {
    id: "2fa",
    titulo: "Ligue a verificação em duas etapas no e-mail e no banco",
    oQue:
      "Além da senha, o serviço passa a pedir uma segunda prova de que é você: um código que muda a cada 30 segundos, uma chave física ou a digital do celular.",
    porque:
      "Senha sozinha é um segredo que pode vazar sem você saber. A segunda etapa faz com que uma senha vazada, sozinha, não valha nada.",
    impacto:
      "Quem descobrir sua senha num vazamento não consegue entrar. Comece pelo e-mail: quem controla o e-mail redefine a senha de todo o resto.",
    como: "Procure por “verificação em duas etapas” ou “autenticação em dois fatores” nas configurações de segurança de cada serviço.",
    prioridade: 1,
  },
  {
    id: "sms-fraco",
    titulo: "Onde der, troque o código por SMS por um aplicativo",
    oQue:
      "Aplicativos como Google Authenticator, Authy, Aegis ou o próprio gerenciador de senhas geram o código dentro do aparelho, sem passar por mensagem.",
    porque:
      "SMS é a forma mais fraca de segunda etapa por dois motivos: o código pode ser pedido a você por telefone, como no golpe do WhatsApp; e existe a troca de chip, em que alguém convence a operadora a transferir o seu número para outro aparelho e passa a receber os seus SMS.",
    impacto:
      "O código deixa de depender da operadora e de você não repetir seis dígitos para um desconhecido.",
    como: "Importante: SMS é muito melhor do que não ter nada. Se o serviço só oferecer SMS, use SMS. Só troque quando houver a opção de aplicativo ou de chave de acesso (passkey).",
    prioridade: 1,
  },
  {
    id: "gerenciador",
    titulo: "Instale um gerenciador de senhas",
    oQue:
      "Um cofre que inventa e guarda uma senha diferente para cada site. Você decora só a senha que abre o cofre.",
    porque:
      "Ninguém consegue decorar quarenta senhas longas e diferentes — então todo mundo repete. Repetir é o que transforma o vazamento de um site pequeno num problema na sua conta bancária.",
    impacto:
      "Um site vazar deixa de contaminar os outros. E, de quebra, o gerenciador não preenche a senha num site de endereço falso — ele percebe a diferença que o olho não percebe.",
    como: "Bitwarden e KeePassXC são gratuitos; 1Password é pago; o gerenciador do Chrome, do Firefox e do iPhone também servem. O melhor é o que você vai usar.",
    prioridade: 1,
  },
  {
    id: "atualizar",
    titulo: "Deixe as atualizações automáticas ligadas",
    oQue:
      "Atualização de celular, de computador e de navegador quase sempre é conserto de falha de segurança, não novidade.",
    porque:
      "Quando uma falha é corrigida, ela vira pública. A partir daí, quem não atualizou está numa lista de alvos conhecidos e fáceis.",
    impacto:
      "Fecha a porta que já se sabe estar aberta. É a defesa com melhor relação entre esforço e resultado que existe.",
    como: "Celular: ative atualização automática nas configurações. Computador: não adie o reinício por semanas. Navegador: ele se atualiza sozinho ao ser fechado e reaberto.",
    prioridade: 2,
  },
  {
    id: "sessoes",
    titulo: "Revise os aparelhos conectados nas suas contas",
    oQue:
      "Todo serviço grande tem uma lista dos celulares e computadores que estão logados na sua conta agora.",
    porque:
      "Se alguém entrou em algum momento, a sessão dele continua aberta mesmo depois de você trocar a senha em alguns serviços. E aparelhos antigos, vendidos ou perdidos costumam continuar na lista.",
    impacto:
      "Desconectar o que você não reconhece corta o acesso de quem já estava dentro.",
    como: "Procure por “aparelhos conectados”, “sessões ativas” ou “dispositivos” na segurança da conta. Faça no e-mail, no WhatsApp (Aparelhos conectados), nas redes sociais e no banco.",
    prioridade: 2,
  },
  {
    id: "pin-chip",
    titulo: "Coloque senha no chip do celular",
    oQue:
      "É o PIN do SIM: um código de quatro dígitos pedido toda vez que o chip é ligado num aparelho.",
    porque:
      "Sem ele, quem pega o seu celular tira o chip, põe em outro aparelho e passa a receber os seus SMS — inclusive os códigos de recuperação de conta.",
    impacto:
      "Um celular roubado deixa de virar uma chave para o seu banco e para as suas contas.",
    como: "Android: Configurações → Segurança → Bloqueio do cartão SIM. iPhone: Ajustes → Celular → PIN do SIM. Troque o PIN padrão da operadora por um seu, e anote em lugar seguro — errar três vezes bloqueia o chip.",
    prioridade: 2,
  },
  {
    id: "pix-limite",
    titulo: "Reduza o limite do PIX, principalmente à noite",
    oQue:
      "Todo banco permite definir quanto se pode transferir por PIX, com um teto separado para o período da noite e da madrugada.",
    porque:
      "Golpe com pressão emocional e roubo de celular acontecem muito no fim do dia e de madrugada, quando ninguém está disponível para você conferir a história com alguém.",
    impacto:
      "Limita o tamanho do estrago em uma janela em que você tem menos condições de reagir. Aumentar um limite leva algumas horas, de propósito — e essas horas são a sua proteção.",
    como: "No app do banco, procure “limites”, geralmente dentro de PIX ou Segurança. Deixe o limite diurno no que você realmente usa e o noturno bem baixo.",
    prioridade: 2,
  },
];

export function Checklist() {
  const [feitos, setFeitos] = useState<Set<string>>(new Set());

  const alternar = (id: string) =>
    setFeitos((atual) => {
      const novo = new Set(atual);
      if (novo.has(id)) novo.delete(id);
      else novo.add(id);
      return novo;
    });

  const prioritarios = ITENS.filter((i) => i.prioridade === 1);
  const demais = ITENS.filter((i) => i.prioridade === 2);

  const Bloco = ({ itens }: { itens: Item[] }) => (
    <ul className="space-y-4">
      {itens.map((item) => {
        const feito = feitos.has(item.id);
        return (
          <li
            key={item.id}
            className={`rounded-sm border transition-colors duration-200 ${
              feito
                ? "border-menta/40 bg-menta-900/40"
                : "border-chumbo-linha bg-chumbo-painel"
            }`}
          >
            <div className="flex gap-4 p-5">
              <input
                type="checkbox"
                id={`item-${item.id}`}
                checked={feito}
                onChange={() => alternar(item.id)}
                className="mt-1 h-5 w-5 shrink-0 cursor-pointer accent-menta"
              />
              <div className="min-w-0">
                <label
                  htmlFor={`item-${item.id}`}
                  className="cursor-pointer font-display text-lg font-semibold leading-snug text-balance"
                >
                  {item.titulo}
                </label>

                <p className="mt-2.5 text-body leading-relaxed text-papel-2 text-pretty">
                  {item.oQue}
                </p>

                <div className="mt-4 space-y-3 border-t border-chumbo-linha pt-4">
                  <div>
                    <p className="etiqueta">Por que isso existe</p>
                    <p className="mt-1 text-sm leading-relaxed text-papel-2">
                      {item.porque}
                    </p>
                  </div>
                  <div>
                    <p className="etiqueta-risco">
                      O que deixa de acontecer
                    </p>
                    <p className="mt-1 text-sm leading-relaxed text-papel-2">
                      {item.impacto}
                    </p>
                  </div>
                  <div>
                    <p className="etiqueta">Onde mexer</p>
                    <p className="mt-1 text-sm leading-relaxed text-papel-3">
                      {item.como}
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </li>
        );
      })}
    </ul>
  );

  return (
    <div>
      <div className="sticky top-16 z-10 -mx-5 mb-8 border-b border-chumbo-linha bg-chumbo/95 px-5 py-3 backdrop-blur sm:-mx-8 sm:px-8">
        <p className="font-display text-sm text-papel-2" aria-live="polite">
          <span className="text-menta tabular-nums">{feitos.size}</span>
          <span className="text-papel-3"> de {ITENS.length} marcados</span>
        </p>
        <p className="mt-1 text-xs leading-relaxed text-papel-3">
          Essa marcação existe só enquanto a página estiver aberta e não é
          gravada em lugar nenhum.
        </p>
      </div>

      <h2 className="font-display text-xl font-semibold">
        Comece por estes quatro
      </h2>
      <p className="mt-2 max-w-2xl text-body text-papel-2">
        São os que mudam mais o seu risco por minuto gasto. Se der para fazer só
        uma coisa hoje, faça a primeira.
      </p>
      <div className="mt-6">
        <Bloco itens={prioritarios} />
      </div>

      <h2 className="mt-14 font-display text-xl font-semibold">
        Depois, quando sobrar um tempo
      </h2>
      <p className="mt-2 max-w-2xl text-body text-papel-2">
        Igualmente reais, só que menos urgentes que os de cima.
      </p>
      <div className="mt-6">
        <Bloco itens={demais} />
      </div>
    </div>
  );
}
