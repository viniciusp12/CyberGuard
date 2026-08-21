/**
 * Casos do "qual deles é golpe?".
 *
 * Todos são reconstruções de fraudes que circulam de verdade no Brasil,
 * escritas do zero. Nomes de banco e de empresa privada são fictícios de
 * propósito; onde aparece um serviço real (Correios, PIX), aparece porque a
 * fraude é conhecida por esse nome e reconhecer o nome é parte do aprendizado
 * — nunca como afirmação sobre a empresa.
 *
 * Um `Trecho` com `sinal` é um pedaço do texto que será destacado dentro da
 * própria mensagem depois da resposta, ancorado ao item de mesmo número na
 * legenda. É isso que diferencia esta seção de um quiz comum: o usuário vê
 * ONDE estava a pista, não só que errou.
 */

export type Trecho = string | { texto: string; sinal: number };

export type Sinal = {
  n: number;
  titulo: string;
  texto: string;
};

export type Campo = {
  rotulo: string;
  valor: Trecho[];
};

export type Mensagem = {
  id: string;
  canal: "sms" | "whatsapp" | "email";
  /** Rótulo do canal exibido no topo do cartão. */
  canalLabel: string;
  campos: Campo[];
  corpo: Trecho[][];
  golpe: boolean;
  sinais: Sinal[];
  /** Explicação exibida depois da resposta. */
  veredito: string;
};

export type Rodada = {
  id: string;
  titulo: string;
  contexto: string;
  mensagens: [Mensagem, Mensagem];
  /** Lição da rodada, mostrada depois da resposta. */
  licao: string;
};

export const RODADAS: Rodada[] = [
  {
    id: "entrega",
    titulo: "Duas mensagens sobre uma encomenda",
    contexto:
      "Você comprou alguma coisa pela internet semana passada. Nas duas mensagens abaixo, uma é fraude.",
    licao:
      "Mensagem de entrega legítima informa. Ela não cobra, não ameaça devolver o pacote hoje e não manda link para pagamento. Sempre que aparecer uma taxa, feche a mensagem e confira o pedido pelo aplicativo ou pelo site onde você comprou.",
    mensagens: [
      {
        id: "entrega-golpe",
        canal: "sms",
        canalLabel: "SMS",
        campos: [
          {
            rotulo: "De",
            valor: [{ texto: "+55 11 9 7xxx-xxxx", sinal: 1 }],
          },
        ],
        corpo: [
          [
            "CORREIOS: sua encomenda está retida por pendência de taxa alfandegária de ",
            { texto: "R$ 3,79", sinal: 2 },
            ". Regularize ",
            { texto: "até hoje às 18h", sinal: 3 },
            " ou o pacote será devolvido ao remetente. Pague em: ",
            { texto: "correios-rastreio.info/taxa", sinal: 4 },
          ],
        ],
        golpe: true,
        sinais: [
          {
            n: 1,
            titulo: "Veio de um celular comum",
            texto:
              "Empresas grandes disparam SMS por um número curto de 4 ou 5 dígitos, ou por um nome. Um celular pessoal mandando comunicado de empresa é sinal forte.",
          },
          {
            n: 2,
            titulo: "O valor é pequeno de propósito",
            texto:
              "R$ 3,79 não dói o suficiente para você parar e conferir. O objetivo raramente é o valor: é capturar os dados do seu cartão na tela seguinte.",
          },
          {
            n: 3,
            titulo: "Urgência artificial",
            texto:
              "Prazo curto existe para impedir que você pense ou pergunte a alguém. Nenhum processo real de alfândega se resolve ou se perde em cinco horas.",
          },
          {
            n: 4,
            titulo: "O domínio não é o oficial",
            texto:
              "O site dos Correios termina em correios.com.br. Qualquer coisa antes disso pode ser inventada: correios-rastreio.info não pertence aos Correios, pertence a quem registrou esse nome.",
          },
        ],
        veredito:
          "Fraude. É a versão mais comum de golpe de entrega no Brasil: taxa pequena, prazo curto e um endereço parecido com o oficial.",
      },
      {
        id: "entrega-legitima",
        canal: "sms",
        canalLabel: "SMS",
        campos: [{ rotulo: "De", valor: ["28908"] }],
        corpo: [
          [
            "Seu objeto AA123456789BR saiu para entrega hoje. Acompanhe pelo aplicativo dos Correios.",
          ],
        ],
        golpe: false,
        sinais: [
          {
            n: 1,
            titulo: "Ela só informa",
            texto:
              "Não pede dinheiro, não pede dado, não ameaça. Uma mensagem que não pede nada não tem como te causar prejuízo.",
          },
          {
            n: 2,
            titulo: "Manda você para o aplicativo, não para um link",
            texto:
              "Esse é o formato mais seguro de comunicação: “abra o app”. Você chega no lugar certo por um caminho que já conhece.",
          },
        ],
        veredito:
          "Legítima — mas o hábito certo continua sendo conferir pelo app, e não confiar na mensagem em si.",
      },
    ],
  },

  {
    id: "whatsapp",
    titulo: "Duas mensagens de WhatsApp de alguém da família",
    contexto:
      "As duas chegaram hoje. Uma delas não é quem diz ser.",
    licao:
      "Regra que resolve quase todos os casos: quando alguém pedir dinheiro por mensagem, ligue para o número antigo da pessoa. Não responda no chat, não mande áudio, ligue. Quem clonou a conta não atende a ligação no número verdadeiro.",
    mensagens: [
      {
        id: "wpp-golpe",
        canal: "whatsapp",
        canalLabel: "WhatsApp",
        campos: [
          {
            rotulo: "Contato",
            valor: [
              { texto: "Número desconhecido", sinal: 1 },
              " · foto de perfil igual à da sua irmã",
            ],
          },
        ],
        corpo: [
          [
            "Oi, tudo bem? ",
            { texto: "Troquei de número, salva aí", sinal: 2 },
            " 🙂",
          ],
          [
            "Você consegue me fazer um favor? Preciso pagar uma coisa agora e ",
            { texto: "meu aplicativo do banco está fora do ar", sinal: 3 },
            ".",
          ],
          [
            "São R$ 1.870. ",
            { texto: "A chave PIX é de um amigo meu", sinal: 4 },
            ", depois eu te explico. ",
            { texto: "Não me liga agora que estou em reunião", sinal: 5 },
            ", me avisa por aqui quando cair.",
          ],
        ],
        golpe: true,
        sinais: [
          {
            n: 1,
            titulo: "Número novo, foto conhecida",
            texto:
              "A foto de perfil de quase todo mundo é pública no WhatsApp. Copiar a foto e o nome custa trinta segundos e é a base inteira do golpe.",
          },
          {
            n: 2,
            titulo: "“Troquei de número”",
            texto:
              "É a frase que justifica o contato vir de outro lugar. Pode ser verdade — por isso a confirmação não pode ser por mensagem, tem que ser por ligação no número antigo.",
          },
          {
            n: 3,
            titulo: "Uma desculpa para não usar o próprio dinheiro",
            texto:
              "Banco fora do ar, cartão bloqueado, conta com limite: sempre existe um motivo para que precise ser você a pagar, agora.",
          },
          {
            n: 4,
            titulo: "A chave PIX é de terceiro",
            texto:
              "Este é o sinal mais decisivo. Se o dinheiro vai para o nome de outra pessoa, não vai para quem está pedindo. Antes de confirmar, o app mostra o nome do dono da chave — leia esse nome.",
          },
          {
            n: 5,
            titulo: "Bloqueio explícito da ligação",
            texto:
              "Reunião, sinal ruim, celular sem áudio. O golpe precisa impedir a voz, porque a voz derruba a farsa em cinco segundos.",
          },
        ],
        veredito:
          "Fraude. É o golpe do WhatsApp clonado, hoje o mais comum do país. Nada aqui exige invadir nada: exige só que você não ligue.",
      },
      {
        id: "wpp-legitima",
        canal: "whatsapp",
        canalLabel: "WhatsApp",
        campos: [
          {
            rotulo: "Contato",
            valor: ["Irmã · número salvo há 6 anos"],
          },
        ],
        corpo: [
          ["Oiii, chegou o convite do casamento da Bia aí?"],
          ["Se não chegou eu levo domingo quando eu for aí"],
        ],
        golpe: false,
        sinais: [
          {
            n: 1,
            titulo: "Não pede nada",
            texto:
              "Sem dinheiro, sem código, sem urgência. Conversa comum de quem realmente conhece você.",
          },
          {
            n: 2,
            titulo: "Contexto que só as duas sabem",
            texto:
              "Detalhe específico e verificável. Golpista trabalha com frases genéricas porque não conhece a sua vida.",
          },
        ],
        veredito: "Legítima. É só a sua irmã.",
      },
    ],
  },

  {
    id: "banco",
    titulo: "Dois e-mails do seu banco",
    contexto:
      "O banco desta simulação, Aurora, é fictício — o formato do golpe não é.",
    licao:
      "Banco nenhum pede senha, código ou confirmação de dados por e-mail, SMS ou telefone. Se a mensagem tem link, não use o link: abra o aplicativo do banco por conta própria. Se houver mesmo algum problema, ele vai estar lá.",
    mensagens: [
      {
        id: "banco-golpe",
        canal: "email",
        canalLabel: "E-mail",
        campos: [
          {
            rotulo: "De",
            valor: [
              "Banco Aurora <atendimento@",
              { texto: "bancoaurora-seguranca.com", sinal: 1 },
              ">",
            ],
          },
          {
            rotulo: "Assunto",
            valor: [{ texto: "AVISO FINAL: sua conta será bloqueada em 24h", sinal: 2 }],
          },
        ],
        corpo: [
          [{ texto: "Prezado(a) cliente,", sinal: 3 }],
          [
            "Detectamos um acesso não reconhecido à sua conta. Por segurança, ela ",
            { texto: "será bloqueada em 24 horas", sinal: 2 },
            " caso seus dados não sejam revalidados.",
          ],
          [
            "Para manter sua conta ativa, ",
            { texto: "confirme seus dados no portal oficial", sinal: 4 },
            ".",
          ],
          [{ texto: "Atenciosamente, Equipe de Segurnça Aurora", sinal: 5 }],
        ],
        golpe: true,
        sinais: [
          {
            n: 1,
            titulo: "O domínio parece, mas não é",
            texto:
              "O que vale é o que vem logo antes da primeira barra. Aqui é bancoaurora-seguranca.com — um domínio registrado por qualquer um, que só imita o nome. O domínio do banco seria aurora.com.br.",
          },
          {
            n: 2,
            titulo: "Ameaça com prazo",
            texto:
              "Bloqueio em 24 horas serve para te tirar do estado em que você confere as coisas. Comunicação real de banco não trabalha com contagem regressiva.",
          },
          {
            n: 3,
            titulo: "Saudação genérica",
            texto:
              "O banco sabe o seu nome. “Prezado cliente” é o que se escreve quando se dispara o mesmo e-mail para milhares de endereços comprados numa lista.",
          },
          {
            n: 4,
            titulo: "O texto do link não é o destino do link",
            texto:
              "Escrito está “portal oficial”. O endereço por trás pode ser qualquer coisa. No computador, passe o mouse por cima e leia embaixo; no celular, segure o dedo no link para ver o destino antes de abrir.",
          },
          {
            n: 5,
            titulo: "Erro pequeno de digitação",
            texto:
              "“Segurnça”, sem o a. Nem todo golpe tem erro, e alguns são impecáveis — mas quando aparece um, ele fecha o caso.",
          },
        ],
        veredito:
          "Fraude. É phishing clássico: domínio parecido, prazo curto e um link que promete levar ao lugar certo.",
      },
      {
        id: "banco-legitimo",
        canal: "email",
        canalLabel: "E-mail",
        campos: [
          { rotulo: "De", valor: ["Banco Aurora <naoresponda@aurora.com.br>"] },
          { rotulo: "Assunto", valor: ["Sua fatura de julho está disponível"] },
        ],
        corpo: [
          ["Olá, Marina."],
          [
            "A fatura do cartão final 4417 já pode ser consultada no aplicativo Aurora, em Cartões → Faturas.",
          ],
          [
            "Não solicitamos senha, código de verificação ou dados do cartão por e-mail, telefone ou mensagem.",
          ],
        ],
        golpe: false,
        sinais: [
          {
            n: 1,
            titulo: "Chama você pelo nome e cita o final do cartão",
            texto:
              "Dado que só quem tem a sua conta conhece. Não é garantia sozinho, mas é o oposto do “prezado cliente”.",
          },
          {
            n: 2,
            titulo: "Indica o caminho dentro do app, sem link",
            texto:
              "Comunicação boa te ensina a chegar sozinho. Assim não existe link para ser falsificado.",
          },
          {
            n: 3,
            titulo: "Declara o que nunca vai pedir",
            texto:
              "Esse aviso é padrão em comunicação bancária de verdade e serve como régua: se a próxima mensagem pedir exatamente isso, ela não é do banco.",
          },
        ],
        veredito:
          "Legítima. Ainda assim, o certo é conferir a fatura abrindo o app, nunca clicando de dentro do e-mail.",
      },
    ],
  },

  {
    id: "emprego",
    titulo: "Duas abordagens sobre uma vaga",
    contexto:
      "Você atualizou o currículo em sites de emprego no mês passado.",
    licao:
      "Processo seletivo de verdade não cobra nada do candidato — nem taxa, nem exame, nem uniforme, nem “reserva de vaga”. E nenhuma empresa precisa dos seus dados bancários antes da contratação.",
    mensagens: [
      {
        id: "emprego-golpe",
        canal: "whatsapp",
        canalLabel: "WhatsApp",
        campos: [
          {
            rotulo: "Contato",
            valor: [{ texto: "Número desconhecido · +55 61 9 8xxx-xxxx", sinal: 1 }],
          },
        ],
        corpo: [
          [
            "Olá! Vimos seu currículo e temos uma vaga de ",
            { texto: "assistente home office, R$ 2.400 por 4h/dia", sinal: 2 },
            ", sem experiência.",
          ],
          [
            { texto: "Você foi pré-aprovada!", sinal: 3 },
            " Para reservar a vaga, falta só o ",
            { texto: "exame admissional (R$ 89,90)", sinal: 4 },
            ", que é reembolsado na primeira folha.",
          ],
          [
            { texto: "Só temos 2 vagas e fecham hoje", sinal: 3 },
            ". Me manda seu ",
            { texto: "CPF e os dados da sua conta", sinal: 5 },
            " para eu adiantar o cadastro?",
          ],
        ],
        golpe: true,
        sinais: [
          {
            n: 1,
            titulo: "Contato direto por WhatsApp, sem processo",
            texto:
              "Empresa séria fala pelo site da vaga ou por e-mail com domínio próprio, e existe um processo antes de qualquer aprovação.",
          },
          {
            n: 2,
            titulo: "Oferta boa demais",
            texto:
              "Salário alto, meia jornada, sem experiência, de casa. A oferta é calibrada para quem está precisando — e quem está precisando é quem menos pode perder R$ 89,90.",
          },
          {
            n: 3,
            titulo: "Aprovação instantânea e prazo apertado",
            texto:
              "Ser aprovada antes de qualquer entrevista não faz sentido. O prazo serve para você pagar antes de contar para alguém.",
          },
          {
            n: 4,
            titulo: "Cobrança do candidato",
            texto:
              "Este é o ponto que encerra a conversa. Custo de exame admissional é da empresa, por lei. Qualquer cobrança para conseguir emprego é fraude.",
          },
          {
            n: 5,
            titulo: "Dados bancários antes da contratação",
            texto:
              "Conta e CPF só entram na papelada depois da admissão. Antes disso, servem para abrir crédito no seu nome.",
          },
        ],
        veredito:
          "Fraude. O golpe do falso emprego cresce em época de desemprego alto e é desenhado para quem está com pressa de ser aceito.",
      },
      {
        id: "emprego-legitimo",
        canal: "email",
        canalLabel: "E-mail",
        campos: [
          {
            rotulo: "De",
            valor: ["Recrutamento Vega <selecao@vega.com.br>"],
          },
          { rotulo: "Assunto", valor: ["Sua candidatura — Assistente administrativo"] },
        ],
        corpo: [
          ["Olá, Marina. Recebemos sua candidatura à vaga de assistente administrativo."],
          [
            "A próxima etapa é uma conversa de 30 minutos por vídeo. Você pode escolher um horário na sua área de candidato, entrando pelo site onde se inscreveu.",
          ],
          [
            "Não cobramos nenhum valor em nenhuma etapa do processo, e não pedimos dados bancários antes da contratação.",
          ],
        ],
        golpe: false,
        sinais: [
          {
            n: 1,
            titulo: "Etapa clara e verificável",
            texto:
              "Existe um processo com passos, e você entra por onde já se cadastrou — não por um link recebido.",
          },
          {
            n: 2,
            titulo: "Diz explicitamente que não cobra",
            texto: "É a régua contra a próxima mensagem que pedir dinheiro.",
          },
        ],
        veredito: "Legítima.",
      },
    ],
  },
];
