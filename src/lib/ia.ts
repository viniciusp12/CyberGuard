/**
 * Conteúdo da seção sobre inteligência artificial.
 *
 * Duas regras específicas desta seção, além das do resto do site:
 *
 * 1. **Nenhum número.** Circulam muitas estatísticas sobre golpes com IA e
 *    quase nenhuma resiste à conferência — são estimativas de fornecedor de
 *    segurança vendendo produto. Como a regra do projeto é número só com
 *    fonte primária, aqui não entra número nenhum, e a página diz isso.
 *
 * 2. **Nada de alarme.** O objetivo é o leitor sair sabendo o que mudou e o
 *    que continua funcionando, não com medo de usar a ferramenta. IA também
 *    está do lado da defesa (filtro de spam, antifraude de banco), e a página
 *    reconhece isso.
 */

export type ItemTriagem = {
  id: string;
  texto: string;
  /** Verdadeiro quando é seguro colar num chatbot público. */
  seguro: boolean;
  motivo: string;
};

/** Itens do exercício "isso pode ir para uma IA pública?". */
export const TRIAGEM: ItemTriagem[] = [
  {
    id: "email-trabalho",
    texto: "Reescrever um e-mail que você mesmo redigiu, sem dados de ninguém",
    seguro: true,
    motivo:
      "Texto que é só seu e não identifica terceiros. É o uso mais comum e o mais tranquilo.",
  },
  {
    id: "planilha-clientes",
    texto: "Uma planilha de clientes com nome, CPF e telefone, para “organizar”",
    seguro: false,
    motivo:
      "Isso é compartilhar dado pessoal de outras pessoas com uma empresa que não tem autorização delas. Pela LGPD, quem colou responde — e a empresa também. Anonimize antes: “cliente A”, “cliente B”.",
  },
  {
    id: "resumo-materia",
    texto: "Pedir explicação de um assunto que você está estudando",
    seguro: true,
    motivo:
      "Nenhum dado sensível envolvido. Só confira o que vier: modelo de linguagem inventa fato com a mesma confiança com que acerta.",
  },
  {
    id: "exame",
    texto: "Foto de um exame médico de um parente, para entender o resultado",
    seguro: false,
    motivo:
      "Dado de saúde é a categoria mais protegida que existe, e nem é seu. Se for para fazer, tire tudo que identifica a pessoa — e ainda assim, quem responde a dúvida é o médico.",
  },
  {
    id: "senha",
    texto: "Sua senha ou um código de verificação, para “conferir se é forte”",
    seguro: false,
    motivo:
      "Nunca. Ela sai do seu aparelho, entra num histórico e pode passar por revisão humana. Para testar força de senha existe a seção 01 deste site, que calcula sem enviar nada.",
  },
  {
    id: "codigo-empresa",
    texto: "Um trecho de código do sistema interno da empresa",
    seguro: false,
    motivo:
      "Depende inteiramente da política do seu trabalho. Muita empresa proíbe, e várias oferecem uma ferramenta corporativa contratada — que existe justamente porque tem contrato de confidencialidade por trás. Use a aprovada, não a pública.",
  },
  {
    id: "contrato",
    texto: "Um contrato ou proposta comercial sob sigilo, para resumir",
    seguro: false,
    motivo:
      "Cláusula de confidencialidade não abre exceção para “eu só queria um resumo”. Vale o mesmo caminho: ferramenta aprovada pela empresa ou nada.",
  },
  {
    id: "carta-pessoal",
    texto: "Um texto pessoal seu, tipo carta ou diário, para revisar",
    seguro: true,
    motivo:
      "É seu e a escolha é sua — mas vale saber que ele vira parte do histórico da sua conta e pode alimentar treinamento, dependendo da configuração. Se for algo que você não mostraria a um estranho, use o modo sem histórico.",
  },
];

export type Mudanca = {
  titulo: string;
  oQueEra: string;
  oQueMudou: string;
  oQueFazer: string;
};

/** O que a IA efetivamente mudou na mecânica dos golpes. */
export const MUDANCAS: Mudanca[] = [
  {
    titulo: "O português errado deixou de ser pista",
    oQueEra:
      "Durante anos, a dica mais repetida foi “desconfie de erro de gramática”. Funcionava porque muita fraude era traduzida por máquina ruim ou escrita por quem não falava a língua.",
    oQueMudou:
      "Hoje qualquer pessoa gera um texto impecável em português, no tom certo, sem esforço. Uma mensagem bem escrita não diz mais nada sobre ser verdadeira.",
    oQueFazer:
      "Os sinais que sobraram são os que sempre valeram mais: o domínio do link, o pedido de dinheiro ou de código, a urgência e o canal por onde chegou. Nenhum deles depende de como o texto foi escrito.",
  },
  {
    titulo: "A voz de alguém conhecido pode ser imitada",
    oQueEra:
      "Ouvir a voz da pessoa era a confirmação final. “Se eu falei com ela, era ela.”",
    oQueMudou:
      "Poucos segundos de áudio bastam para gerar uma voz parecida — e áudio nosso é o que mais existe: mensagem de voz, story, vídeo, reunião gravada. Já há casos relatados de ligação com voz imitada de familiar em situação de emergência.",
    oQueFazer:
      "Voz virou mais um dado que pode ser falsificado, então parou de servir sozinha como prova. Desligue e ligue de volta para o número que você já tinha salvo — quem está do outro lado não atende nesse número.",
  },
  {
    titulo: "Rosto em vídeo também já foi falsificado",
    oQueEra:
      "Chamada de vídeo era considerada prova definitiva de identidade.",
    oQueMudou:
      "Existem casos documentados de fraude corporativa em que a videochamada inteira era falsa. Ainda é caro e raro, e quase sempre mirado em empresa e valor alto, não em pessoa comum.",
    oQueFazer:
      "Para pagamento fora do fluxo normal, confirmação vai por um segundo canal combinado antes — não pelo canal em que o pedido chegou, mesmo que ele mostre um rosto conhecido.",
  },
  {
    titulo: "O golpe passou a ser feito sob medida, em escala",
    oQueEra:
      "A mesma mensagem genérica ia para milhares de pessoas, e por isso soava genérica.",
    oQueMudou:
      "Agora dá para gerar mil versões diferentes, cada uma citando o nome da empresa onde a pessoa trabalha, a cidade, o assunto que ela postou ontem. A mensagem parece pessoal porque foi feita para você — só que automaticamente.",
    oQueFazer:
      "Pare de usar “parece pessoal demais para ser golpe” como critério. A pergunta certa continua sendo o que a mensagem está pedindo, não o quanto ela te conhece.",
  },
  {
    titulo: "A IA também erra com confiança",
    oQueEra: "Buscar informação era encontrar uma fonte e avaliar a fonte.",
    oQueMudou:
      "Chatbot responde qualquer coisa com o mesmo tom seguro, inclusive telefone de central de atendimento, endereço de site e procedimento bancário que ele inventou. O nome disso é alucinação.",
    oQueFazer:
      "Nunca peça a uma IA o telefone ou o site do seu banco, da polícia ou de um órgão público. Um número inventado com aparência oficial é a porta de entrada perfeita para outro golpe. Vá ao verso do cartão ou ao site oficial que você já conhece.",
  },
];

export type Defesa = {
  titulo: string;
  texto: string;
};

/**
 * As defesas que continuam funcionando — todas escolhidas por um critério:
 * não dependem de você conseguir detectar a falsificação. Contra imitação
 * boa, tentar "perceber" é a estratégia que falha.
 */
export const DEFESAS: Defesa[] = [
  {
    titulo: "Combine uma palavra-código com a família",
    texto:
      "Uma palavra que só vocês sabem, combinada pessoalmente, para usar quando alguém pedir dinheiro com urgência por telefone ou mensagem. Não importa quão parecida esteja a voz: quem não souber a palavra não é quem diz ser. É a defesa mais barata que existe contra voz imitada, e funciona para crianças e idosos igualmente.",
  },
  {
    titulo: "Volte sempre pelo canal que você já tinha",
    texto:
      "Desligue e ligue para o número salvo na sua agenda. Abra o aplicativo do banco por conta própria. Digite você mesmo o endereço do site. Isso funciona contra qualquer nível de imitação, porque não exige que você identifique nada — só que você não siga o caminho oferecido.",
  },
  {
    titulo: "Leia o nome do dono da chave PIX",
    texto:
      "A tela de confirmação mostra para quem o dinheiro vai. Nenhum áudio convincente muda esse nome. Se não é a pessoa que está pedindo, acabou a conversa.",
  },
  {
    titulo: "Verificação em duas etapas",
    texto:
      "Uma imitação perfeita da sua voz não gera o código que está no seu aparelho. As proteções que dependem de posse — do celular, do PIN, da chave — não são afetadas por falsificação de imagem e som.",
  },
];
