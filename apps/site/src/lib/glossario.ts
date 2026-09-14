/**
 * Glossário para quem quer entender o que está por baixo.
 *
 * Regras de escrita, iguais às do resto do site:
 *  - definição em linguagem de gente primeiro, termo técnico depois;
 *  - toda entrada responde "por que isso importa pra mim", senão é enciclopédia;
 *  - onde existe um mito comum, o mito é desmontado explicitamente (ver `https`
 *    e `vpn`, que são as duas maiores fontes de falsa sensação de segurança).
 *
 * O `id` vira âncora (`/glossario#https`) e é o alvo do componente `<Termo>`.
 */

export type Grupo = "internet" | "protecao" | "golpes" | "ia" | "brasil";

export type Verbete = {
  id: string;
  termo: string;
  /** Como a pessoa provavelmente ouviu falar, se for diferente. */
  tambem?: string;
  /** O que é, sem jargão. */
  definicao: string;
  /** Por que alguém deveria se importar. */
  importa: string;
  grupo: Grupo;
};

export const GRUPOS: { id: Grupo; titulo: string; descricao: string }[] = [
  {
    id: "internet",
    titulo: "Como a internet funciona",
    descricao: "O que qualquer site consegue ver quando você entra nele.",
  },
  {
    id: "protecao",
    titulo: "Senhas e proteção",
    descricao: "As palavras que aparecem nas configurações de segurança.",
  },
  {
    id: "golpes",
    titulo: "Os nomes dos golpes",
    descricao: "Os nomes técnicos de golpes que você já conhece.",
  },
  {
    id: "ia",
    titulo: "Inteligência artificial",
    descricao: "As palavras novas que chegaram com a IA.",
  },
  {
    id: "brasil",
    titulo: "Brasil: PIX, dados e órgãos",
    descricao: "Termos úteis para resolver um problema aqui no Brasil.",
  },
];

export const VERBETES: Verbete[] = [
  // ─── Como a internet funciona ───────────────────────────────────────────
  {
    id: "servidor",
    termo: "Servidor",
    grupo: "internet",
    definicao:
      "Um computador ligado o tempo todo, respondendo pedidos. Quando você abre um site, a página vem de um servidor.",
    importa:
      "O que sai do seu aparelho fica guardado na máquina de outra pessoa. E pode continuar lá mesmo depois que você apaga.",
  },
  {
    id: "ip",
    termo: "Endereço IP",
    tambem: "aquele número tipo 189.40.12.7",
    grupo: "internet",
    definicao:
      "O número da sua conexão na internet. É por ele que o site sabe para onde mandar a página.",
    importa:
      "Ele mostra a cidade aproximada e a operadora, não a sua rua. Quem diz que achou sua casa pelo IP está blefando.",
  },
  {
    id: "dominio",
    termo: "Domínio",
    tambem: "o nome do site",
    grupo: "internet",
    definicao:
      "O nome do site, logo antes da primeira barra. Em `banco.com.br/login`, o domínio é `banco.com.br`.",
    importa:
      "É ele que diz de quem é o site. Golpista põe o nome da empresa no começo: `aurora.com.suporte-cliente.net` é de `suporte-cliente.net`.",
  },
  {
    id: "https",
    termo: "HTTPS e o cadeado",
    grupo: "internet",
    definicao:
      "O cadeado mostra que a conversa com o site vai embaralhada. Quem estiver no meio do caminho não consegue ler.",
    importa:
      "**Cadeado não quer dizer site confiável.** Quase todo site de golpe tem cadeado. Para saber de quem é o site, olhe o domínio.",
  },
  {
    id: "cookie",
    termo: "Cookie",
    grupo: "internet",
    definicao:
      "Um bilhetinho que o site guarda no seu navegador. É o que mantém o carrinho cheio e você conectado.",
    importa:
      "Alguns servem para empresas de propaganda seguirem você de site em site. No aviso de cookies, recuse os não essenciais.",
  },
  {
    id: "armazenamento-local",
    termo: "Armazenamento local",
    tambem: "localStorage",
    grupo: "internet",
    definicao:
      "Um espaço onde o site guarda informação no seu próprio aparelho. Parece cookie, mas não vai sozinho para o servidor.",
    importa:
      "A página inicial deste site usa isso só para lembrar se você já esteve aqui. É a única coisa que ele grava.",
  },
  {
    id: "fingerprinting",
    termo: "Fingerprinting",
    tambem: "impressão digital do navegador",
    grupo: "internet",
    definicao:
      "Juntar vários detalhes do seu aparelho, como tela, idioma e fuso horário. A combinação reconhece você, mesmo sem login.",
    importa:
      "Cada detalhe sozinho não diz nada; juntos, viram uma etiqueta. Apagar os cookies não resolve.",
  },
  {
    id: "vpn",
    termo: "VPN",
    grupo: "internet",
    definicao:
      "Um serviço que faz sua internet sair por outro lugar. Esconde seu IP dos sites e esconde da operadora o que você visita.",
    importa:
      "**VPN não protege contra golpe.** Ela não barra mensagem falsa nem impede você de passar um código por telefone. Na empresa, serve para acessar a rede interna.",
  },
  {
    id: "rede-aberta",
    termo: "Rede aberta",
    tambem: "Wi-Fi público",
    grupo: "internet",
    definicao:
      "Wi-Fi sem senha, de shopping, aeroporto, hotel ou loja. Qualquer pessoa entra.",
    importa:
      "O perigo é a rede falsa com nome copiado, que abre uma tela de login falsa. Desconfie de Wi-Fi que pede CPF e telefone.",
  },

  // ─── Senhas e proteção ──────────────────────────────────────────────────
  {
    id: "criptografia",
    termo: "Criptografia",
    grupo: "protecao",
    definicao:
      "Embaralhar uma informação para que só quem tem a chave consiga ler. Está no cadeado do navegador e no WhatsApp.",
    importa:
      "Ela protege a mensagem no caminho. Não protege se alguém convencer você a entregar a informação.",
  },
  {
    id: "hash",
    termo: "Hash",
    grupo: "protecao",
    definicao:
      "Um jeito de embaralhar a senha que não tem volta. O site confere se a senha bate, mas não consegue ler a senha.",
    importa:
      "Por isso site sério só deixa redefinir a senha. Se um serviço mandar sua senha atual por e-mail, ele guarda mal as senhas.",
  },
  {
    id: "forca-bruta",
    termo: "Força bruta",
    grupo: "protecao",
    definicao:
      "Testar todas as combinações até acertar: aaaa, aaab, aaac… bilhões de vezes por segundo.",
    importa:
      "Antes disso, o criminoso testa listas de senhas que já vazaram. É mais rápido e pega mais gente.",
  },
  {
    id: "entropia",
    termo: "Entropia",
    tambem: "os “bits” do medidor de senha",
    grupo: "protecao",
    definicao:
      "O quanto uma senha é difícil de adivinhar. Cada bit a mais dobra o número de tentativas.",
    importa:
      "Por isso senha longa vale mais que senha cheia de símbolo. Trocar `a` por `@` quase não ajuda.",
  },
  {
    id: "gerenciador-de-senhas",
    termo: "Gerenciador de senhas",
    grupo: "protecao",
    definicao:
      "Um cofre que cria e guarda uma senha diferente para cada site. Você só decora a senha do cofre.",
    importa:
      "Ele só preenche a senha no site certo. Se não preencher numa página que parece verdadeira, confira o endereço.",
  },
  {
    id: "frase-senha",
    termo: "Frase-senha",
    grupo: "protecao",
    definicao:
      "Senha feita de várias palavras, tipo `girafa porta melancia trilho`. É longa e fácil de lembrar.",
    importa:
      "As palavras precisam ser sorteadas, não escolhidas. Trecho de música ou ditado já está nas listas dos criminosos.",
  },
  {
    id: "2fa",
    termo: "Verificação em duas etapas",
    tambem: "2FA, autenticação em dois fatores, MFA, confirmação em duas etapas",
    grupo: "protecao",
    definicao:
      "Além da senha, o serviço pede mais uma prova de que é você. Pode ser um código, a digital ou uma chavinha física.",
    importa:
      "Assim, a senha vazada sozinha não abre sua conta. Comece pelo e-mail: por ele dá para trocar todas as outras senhas.",
  },
  {
    id: "totp",
    termo: "TOTP",
    tambem: "o código de 6 dígitos que muda a cada 30 segundos",
    grupo: "protecao",
    definicao:
      "Código criado por um app no seu próprio celular, usando o relógio. Funciona sem internet e vence sozinho.",
    importa:
      "É mais seguro que código por SMS, porque não passa pela operadora.",
  },
  {
    id: "passkey",
    termo: "Passkey",
    tambem: "chave de acesso",
    grupo: "protecao",
    definicao:
      "Um jeito de entrar sem senha, com a digital ou o rosto. Não há nada para você digitar ou entregar a alguém.",
    importa:
      "A chave só funciona no site verdadeiro, então página falsa não consegue usar. Quando o serviço oferecer, use.",
  },

  // ─── Vocabulário dos golpes ─────────────────────────────────────────────
  {
    id: "phishing",
    termo: "Phishing",
    tambem: "pescaria, em inglês",
    grupo: "golpes",
    definicao:
      "Mensagem falsa que finge ser de uma empresa ou pessoa conhecida. Quer sua senha, um código ou dinheiro.",
    importa:
      "É como começa a maioria dos golpes. Chega por e-mail, SMS, WhatsApp ou ligação e usa pressa, medo e confiança.",
  },
  {
    id: "smishing-vishing",
    termo: "Smishing e vishing",
    grupo: "golpes",
    definicao:
      "É o golpe da mensagem falsa em outro canal. Por SMS se chama smishing; por ligação, vishing.",
    importa:
      "Na ligação não dá para conferir nada. Desligue e ligue você para o número oficial, como o do verso do cartão.",
  },
  {
    id: "quishing",
    termo: "Quishing",
    tambem: "golpe do QR code",
    grupo: "golpes",
    definicao:
      "QR Code falso colado por cima do verdadeiro. Aparece em maquininha, cartaz ou placa de estacionamento.",
    importa:
      "Ninguém lê um QR Code no olho. Antes de pagar, confira na tela o nome de quem vai receber.",
  },
  {
    id: "bec",
    termo: "Fraude do e-mail corporativo",
    tambem: "BEC, golpe do boleto, golpe do CEO",
    grupo: "golpes",
    definicao:
      "Mensagem que finge ser do chefe, fornecedor ou cliente para desviar um pagamento. Às vezes vem do e-mail verdadeiro, invadido.",
    importa:
      "Como tudo parece certo, olhar com atenção não basta. Mudança de conta bancária se confirma por telefone, no número já cadastrado.",
  },
  {
    id: "pretexting",
    termo: "Pretexting",
    grupo: "golpes",
    definicao:
      "Ligação com uma desculpa inventada, de falso candidato, pesquisador ou fornecedor. Não pede nada de valor, só junta informação.",
    importa:
      "Ela prepara um golpe que chega semanas depois, já com os nomes certos. Não passe nomes e rotina da empresa a desconhecidos.",
  },
  {
    id: "mfa-fatigue",
    termo: "Bombardeio de notificação",
    tambem: "MFA fatigue, push bombing",
    grupo: "golpes",
    definicao:
      "O criminoso já tem sua senha e manda vários pedidos para aprovar o login. Ele insiste até você aprovar por cansaço.",
    importa:
      "Pedido que você não fez mostra que sua senha vazou. Negue e troque a senha na hora; nunca aprove só para parar.",
  },
  {
    id: "engenharia-social",
    termo: "Engenharia social",
    grupo: "golpes",
    definicao:
      "O nome técnico para enganar e manipular alguém. Usa autoridade, pressa, medo ou carinho, como “mãe, troquei de número”.",
    importa:
      "Está por trás de quase todo golpe. Cair não é falta de inteligência; é um golpe bem feito num dia ruim.",
  },
  {
    id: "vazamento",
    termo: "Vazamento de dados",
    grupo: "golpes",
    definicao:
      "Quando os dados guardados por uma empresa vão parar na mão de estranhos. Costuma ter e-mail, telefone, CPF e senhas.",
    importa:
      "É por isso que o golpe sabe seu nome e sua última compra. Isso faz a mensagem parecer verdadeira.",
  },
  {
    id: "credential-stuffing",
    termo: "Credential stuffing",
    tambem: "o ataque do reuso de senha",
    grupo: "golpes",
    definicao:
      "Pegar e-mails e senhas de um vazamento e testar em muitos outros sites. O criminoso aposta que você repetiu a senha.",
    importa:
      "A senha de um site bobo pode abrir o seu banco. Use uma senha diferente em cada lugar.",
  },
  {
    id: "malware",
    termo: "Malware",
    grupo: "golpes",
    definicao:
      "Programa feito para causar dano ou roubar. Pode ser vírus, espião que grava o que você digita ou app de banco falso.",
    importa:
      "No celular, instale apps só da loja oficial. No computador, desconfie de anexo que pede para “habilitar conteúdo”.",
  },
  {
    id: "ransomware",
    termo: "Ransomware",
    tambem: "sequestro de arquivos",
    grupo: "golpes",
    definicao:
      "Programa que tranca seus arquivos e pede dinheiro para liberar. Pode passar de um computador para a rede toda.",
    importa:
      "Costuma entrar por um anexo aberto ou uma senha repetida. Cópia dos arquivos guardada fora da rede ajuda a empresa a voltar.",
  },
  {
    id: "sim-swap",
    termo: "Troca de chip",
    tambem: "SIM swap",
    grupo: "golpes",
    definicao:
      "Golpistas convencem a operadora a passar seu número para outro chip. Daí em diante, seus SMS chegam para eles.",
    importa:
      "Por isso código por SMS é a proteção mais fraca. Se o sinal sumir do nada e não voltar, ligue para a operadora de outro telefone.",
  },

  // ─── Inteligência artificial ────────────────────────────────────────────
  {
    id: "modelo-de-linguagem",
    termo: "Modelo de linguagem",
    tambem: "LLM, “a IA” do ChatGPT e similares",
    grupo: "ia",
    definicao:
      "Programa que aprendeu com muito texto a adivinhar a próxima palavra. Ele não consulta fatos, monta a resposta mais provável.",
    importa:
      "Ele fala com a mesma segurança quando acerta e quando erra. Tom confiante não é sinal de acerto.",
  },
  {
    id: "alucinacao",
    termo: "Alucinação",
    grupo: "ia",
    definicao:
      "Quando a IA inventa algo e fala com naturalidade. Pode ser um telefone, um site, uma lei ou um procedimento do banco.",
    importa:
      "Nunca peça a uma IA o telefone do banco ou o site de um órgão público. Busque no canal oficial, como o verso do cartão ou o app.",
  },
  {
    id: "treinamento",
    termo: "Treinamento",
    grupo: "ia",
    definicao:
      "É como a IA aprende com textos. Muitos serviços usam suas conversas para isso, a não ser que você desligue.",
    importa:
      "Costuma vir ligado. Confira nas configurações de dados ou privacidade da sua conta.",
  },
  {
    id: "deepfake",
    termo: "Deepfake",
    tambem: "voz ou rosto clonado",
    grupo: "ia",
    definicao:
      "Áudio, foto ou vídeo falso feito por computador para imitar uma pessoa real. Poucos segundos de voz já bastam.",
    importa:
      "Ouvir a voz ou ver o rosto não prova mais nada. Ligue para o número salvo ou use uma palavra combinada antes.",
  },

  // ─── Brasil ─────────────────────────────────────────────────────────────
  {
    id: "chave-pix",
    termo: "Chave PIX",
    grupo: "brasil",
    definicao:
      "O apelido de uma conta: CPF, telefone, e-mail ou uma sequência aleatória. Antes de confirmar, o app mostra o nome do dono.",
    importa:
      "Leia esse nome sempre. Se não for de quem está pedindo, é golpe, por melhor que seja a desculpa.",
  },
  {
    id: "med",
    termo: "MED",
    tambem: "Mecanismo Especial de Devolução",
    grupo: "brasil",
    definicao:
      "Regra do Banco Central para pedir de volta um PIX feito em golpe. O pedido é feito no seu próprio banco.",
    importa:
      "O prazo é de até 80 dias, e o banco tem até 7 dias para analisar. Mas peça no mesmo dia: o dinheiro some rápido.",
  },
  {
    id: "lgpd",
    termo: "LGPD",
    tambem: "Lei Geral de Proteção de Dados",
    grupo: "brasil",
    definicao:
      "Lei que diz o que empresas e órgãos podem fazer com dados pessoais. Você pode saber o que guardam, corrigir e pedir para apagar.",
    importa:
      "No trabalho, dado de cliente não pode circular por WhatsApp ou e-mail pessoal.",
  },
  {
    id: "conta-gov-br",
    termo: "Conta gov.br",
    grupo: "brasil",
    definicao:
      "O login único do governo federal. Serve para carteira de motorista digital, carteira de trabalho e vacinas.",
    importa:
      "Abre boletim de ocorrência online, Registrato e Consumidor.gov.br. Ative a verificação em duas etapas nela.",
  },
  {
    id: "registrato",
    termo: "Registrato",
    grupo: "brasil",
    definicao:
      "Relatório grátis do Banco Central com as contas, empréstimos e chaves PIX no seu CPF. Você entra com a conta gov.br.",
    importa:
      "Mostra se alguém abriu conta ou pegou empréstimo no seu nome. Consulte depois de qualquer golpe com seus documentos.",
  },
];
