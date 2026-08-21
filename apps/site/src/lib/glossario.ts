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
    titulo: "Como a internet funciona por baixo",
    descricao:
      "O que acontece entre você digitar um endereço e a página aparecer — e quais pedaços disso qualquer site consegue ver.",
  },
  {
    id: "protecao",
    titulo: "Senhas e proteção",
    descricao:
      "O vocabulário que aparece nas configurações de segurança e quase nunca vem explicado.",
  },
  {
    id: "golpes",
    titulo: "O vocabulário dos golpes",
    descricao:
      "Os nomes técnicos das coisas que já acontecem com você em português comum.",
  },
  {
    id: "ia",
    titulo: "Inteligência artificial",
    descricao:
      "O vocabulário que apareceu nos últimos anos e ainda está se assentando — inclusive nas próprias empresas que o criaram.",
  },
  {
    id: "brasil",
    titulo: "Brasil: PIX, dados e órgãos",
    descricao: "Os termos que aparecem quando você precisa resolver um problema aqui.",
  },
];

export const VERBETES: Verbete[] = [
  // ─── Como a internet funciona ───────────────────────────────────────────
  {
    id: "servidor",
    termo: "Servidor",
    grupo: "internet",
    definicao:
      "É só um computador que fica ligado o tempo todo esperando pedidos. Quando você abre um site, o seu aparelho pede os arquivos da página para um servidor, e ele responde. Não tem nada de místico: é um computador em uma sala refrigerada em algum lugar do mundo.",
    importa:
      "Saber o que é servidor é o que dá sentido à frase “nada é enviado para um servidor”, que aparece várias vezes neste site. Quando um dado sai do seu aparelho, ele passa a existir em uma máquina que não é sua, sob regras que não são suas — e pode continuar lá depois de você apagar a sua cópia.",
  },
  {
    id: "ip",
    termo: "Endereço IP",
    tambem: "aquele número tipo 189.40.12.7",
    grupo: "internet",
    definicao:
      "O número que identifica a sua conexão na internet, mais ou menos como o endereço da sua casa identifica onde entregar uma encomenda. Todo site que você abre precisa dele para saber para onde mandar a resposta.",
    importa:
      "O IP entrega a sua cidade aproximada e o nome da sua operadora, e não tem como navegar sem revelá-lo. O que ele não entrega é a sua rua: quem diz que “descobriu seu endereço pelo IP” está blefando, e isso é chantagem comum em golpe de extorsão.",
  },
  {
    id: "dominio",
    termo: "Domínio",
    tambem: "o nome do site",
    grupo: "internet",
    definicao:
      "É o nome que fica antes da primeira barra de um endereço. Em `banco.com.br/login/senha`, o domínio é `banco.com.br`. Qualquer pessoa pode registrar um domínio novo em minutos, por poucos reais.",
    importa:
      "É a única parte do endereço que não dá para falsificar — e por isso é a única que vale olhar. Golpista põe o nome da empresa em qualquer outro lugar do endereço para você bater o olho e reconhecer: `correios-rastreio.info` ou `aurora.com.suporte-cliente.net` não pertencem aos Correios nem ao banco. Leia da direita para a esquerda até a primeira barra.",
  },
  {
    id: "https",
    termo: "HTTPS e o cadeado",
    grupo: "internet",
    definicao:
      "O `s` significa que a conversa entre o seu navegador e o site está embaralhada, de forma que quem estiver no meio do caminho não consegue ler o conteúdo. O cadeado na barra de endereço indica exatamente isso, e só isso.",
    importa:
      "Aqui mora um dos maiores mal-entendidos da internet: **cadeado não quer dizer site confiável.** Certificado HTTPS é gratuito e automático hoje, então praticamente todo site de golpe tem cadeado. O cadeado promete que ninguém está bisbilhotando a conversa — não promete nada sobre com quem você está conversando. Para isso, só o domínio.",
  },
  {
    id: "dns",
    termo: "DNS",
    tambem: "a agenda de contatos da internet",
    grupo: "internet",
    definicao:
      "Serviço que traduz o nome do site no número do servidor. Você digita `banco.com.br`, o DNS responde “é o computador de número tal”, e só então a conexão acontece.",
    importa:
      "Quem controla o DNS que você usa consegue ver a lista dos sites que você visita e, em ataques mais raros, mandar você para o servidor errado mesmo com o endereço digitado certo. É por isso que roteador com senha padrão de fábrica é um problema.",
  },
  {
    id: "cookie",
    termo: "Cookie",
    grupo: "internet",
    definicao:
      "Um bilhetinho que o site guarda no seu navegador e recebe de volta na próxima visita. É o que faz o carrinho de compras continuar cheio e o que mantém você logado sem digitar a senha toda vez.",
    importa:
      "Cookie não é vilão — sem ele nada de login funcionaria. O problema são os de terceiros, colocados por empresas de publicidade em milhares de sites ao mesmo tempo, que montam um histórico do que você anda vendo pela web afora. Recusar os não essenciais no aviso de cookies corta boa parte disso.",
  },
  {
    id: "armazenamento-local",
    termo: "Armazenamento local",
    tambem: "localStorage",
    grupo: "internet",
    definicao:
      "Um espaço no seu navegador onde o site pode gravar informação que fica ali mesmo, no seu aparelho, entre uma visita e outra. Parecido com cookie, só que não é enviado ao servidor automaticamente.",
    importa:
      "É exatamente o que a home deste site usa para saber se você já esteve aqui — e é a única coisa que ele grava. Vale saber que existe: quando um site “lembra” de você sem login, quase sempre é isso ou um cookie.",
  },
  {
    id: "user-agent",
    termo: "User agent",
    tambem: "a identificação do navegador",
    grupo: "internet",
    definicao:
      "Um texto que o seu navegador manda para todo site informando qual navegador e qual sistema você usa. É o que permite a página se ajustar ao celular ou ao computador.",
    importa:
      "É de onde vêm as duas primeiras linhas do dossiê da home. Ninguém precisou invadir nada: essa informação é oferecida pelo seu navegador, espontaneamente, para todo site que você abre.",
  },
  {
    id: "fingerprinting",
    termo: "Fingerprinting",
    tambem: "impressão digital do navegador",
    grupo: "internet",
    definicao:
      "Técnica de juntar vários dados pequenos e inofensivos — resolução de tela, fuso, idioma, fontes instaladas, número de núcleos — até que a combinação fique única o bastante para reconhecer você sem cookie e sem login.",
    importa:
      "Cada dado isolado não diz nada; o conjunto identifica. É por isso que o dossiê da home mostra tantos campos pequenos: sozinho, “12 núcleos” é irrelevante, mas somado ao resto vira uma etiqueta. Apagar cookies não desfaz fingerprinting — a etiqueta é montada sem cookie nenhum.",
  },
  {
    id: "farbling",
    termo: "Ruído anti-fingerprinting",
    tambem: "farbling, resistFingerprinting",
    grupo: "internet",
    definicao:
      "Defesa em que o navegador responde com valores ligeiramente errados de propósito — número de núcleos, memória, dimensões de tela — em vez de recusar a pergunta. Alguns trocam a resposta a cada site ou a cada janela.",
    importa:
      "É por isso que o dossiê da home pode mostrar “2 núcleos” num computador de 12, ou mudar de resposta numa janela anônima. Recusar a pergunta chamaria atenção; responder errado faz a etiqueta apontar para milhares de pessoas ao mesmo tempo, que é justamente o objetivo. Firefox, Safari, Brave e o Tor Browser fazem isso em graus diferentes.",
  },
  {
    id: "vpn",
    termo: "VPN",
    grupo: "internet",
    definicao:
      "Um túnel que faz o seu tráfego sair pela internet a partir de outro lugar, escondendo o seu IP do site visitado e escondendo do seu provedor quais sites você visita.",
    importa:
      "O segundo grande mal-entendido, e ele é vendido em propaganda: **VPN não protege contra golpe.** Ela não impede phishing, não impede senha fraca, não impede que você entregue um código por telefone. Muda quem consegue ver o seu tráfego, e só. Em empresa ela tem função clara — dar acesso à rede interna com identidade verificada.",
  },
  {
    id: "rede-aberta",
    termo: "Rede aberta",
    tambem: "Wi-Fi público",
    grupo: "internet",
    definicao:
      "Rede sem senha, de shopping, aeroporto, hotel ou loja, em que qualquer um se conecta.",
    importa:
      "O risco mudou. Antigamente dava para ler o que os outros acessavam; hoje o HTTPS impede isso. O perigo atual é outro: uma rede com nome clonado que te leva a uma tela de login falsa, e o cadastro da própria rede pedindo CPF e telefone para alimentar a próxima mensagem de golpe.",
  },

  // ─── Senhas e proteção ──────────────────────────────────────────────────
  {
    id: "criptografia",
    termo: "Criptografia",
    grupo: "protecao",
    definicao:
      "Embaralhar uma informação de um jeito que só quem tem a chave consegue desembaralhar. É o que está por trás do cadeado do navegador e das mensagens do WhatsApp.",
    importa:
      "Entender o limite dela evita confiança demais: criptografia protege a informação no caminho. Ela não protege contra alguém que convenceu você a entregar a informação de bom grado — e é assim que quase todo golpe funciona.",
  },
  {
    id: "hash",
    termo: "Hash",
    grupo: "protecao",
    definicao:
      "Uma conta de mão única aplicada à sua senha. Dela sai um embaralhado de tamanho fixo, e não existe caminho de volta: dá para conferir se a senha bate, mas não dá para recuperar a senha original a partir do resultado.",
    importa:
      "É por isso que um site sério nunca consegue te dizer qual era a sua senha — só oferece redefinir. Se algum serviço te enviar a sua senha atual por e-mail, ele a guardou em texto puro, e isso é um problema grave. Também explica o teste de senha deste site: quando um banco de senhas vaza, o que vaza são hashes, e o ataque roda offline tentando adivinhar qual senha gera aquele hash.",
  },
  {
    id: "forca-bruta",
    termo: "Força bruta",
    grupo: "protecao",
    definicao:
      "Tentar todas as combinações possíveis até acertar. Sem esperteza nenhuma: aaaa, aaab, aaac, e assim por diante, bilhões de vezes por segundo.",
    importa:
      "É o número que despenca na tela do teste de senha. E é justamente por não ter esperteza que ela quase nunca é o primeiro ataque: antes de varrer tudo, testa-se a lista de senhas já vazadas, que é bem mais rápida e pega muito mais gente.",
  },
  {
    id: "entropia",
    termo: "Entropia",
    tambem: "os “bits” do medidor de senha",
    grupo: "protecao",
    definicao:
      "Medida de quão imprevisível é uma senha. Cada bit a mais dobra o número de tentativas necessárias — 40 bits é mil vezes mais trabalhoso que 30.",
    importa:
      "É o que explica por que comprimento vence complexidade: acrescentar um caractere multiplica o espaço inteiro, enquanto trocar `a` por `@` só acrescenta uma possibilidade que todo programa de ataque já testa primeiro.",
  },
  {
    id: "gerenciador-de-senhas",
    termo: "Gerenciador de senhas",
    grupo: "protecao",
    definicao:
      "Um cofre que inventa e guarda uma senha diferente para cada site. Você decora só a senha que abre o cofre.",
    importa:
      "Além de acabar com o reuso, ele tem uma proteção que o olho humano não tem: só preenche a senha no domínio exato onde ela foi salva. Numa página de phishing perfeitinha, o gerenciador simplesmente não preenche — e esse silêncio é o alerta.",
  },
  {
    id: "frase-senha",
    termo: "Frase-senha",
    grupo: "protecao",
    definicao:
      "Uma senha feita de várias palavras em vez de caracteres embaralhados, tipo `girafa porta melancia trilho`. Longa, fácil de lembrar e fácil de digitar no celular.",
    importa:
      "Só funciona se as palavras forem sorteadas de verdade, não escolhidas por você. Frase de música, versículo ou ditado já está em listas de ataque. A força vem do sorteio, não do tamanho por si só.",
  },
  {
    id: "2fa",
    termo: "Verificação em duas etapas",
    tambem: "2FA, autenticação em dois fatores, MFA",
    grupo: "protecao",
    definicao:
      "Além da senha, o serviço pede uma segunda prova de que é você: um código que muda sozinho, a digital do celular ou uma chavinha física.",
    importa:
      "É o que faz uma senha vazada, sozinha, não valer nada. Se der para ativar em um lugar só, que seja no e-mail — quem entra no seu e-mail redefine a senha de todo o resto.",
  },
  {
    id: "totp",
    termo: "TOTP",
    tambem: "o código de 6 dígitos que muda a cada 30 segundos",
    grupo: "protecao",
    definicao:
      "Código gerado dentro do próprio aparelho, a partir de um segredo combinado com o serviço mais o relógio. Por isso funciona até sem internet e por isso ele expira sozinho.",
    importa:
      "É mais seguro que o código por SMS porque não passa pela operadora e não depende de mensagem chegando. Google Authenticator, Authy, Aegis e a maioria dos gerenciadores de senha fazem isso.",
  },
  {
    id: "passkey",
    termo: "Passkey",
    tambem: "chave de acesso",
    grupo: "protecao",
    definicao:
      "Substituto da senha: o seu aparelho guarda uma chave secreta e prova a sua identidade com a digital ou o rosto. Não existe nada digitável para você entregar a ninguém.",
    importa:
      "É o formato que resolve o phishing na raiz, porque a chave só funciona no site verdadeiro e não há código para repetir ao telefone. Ainda está chegando aos poucos, mas quando o serviço oferecer, é a melhor opção disponível.",
  },

  // ─── Vocabulário dos golpes ─────────────────────────────────────────────
  {
    id: "phishing",
    termo: "Phishing",
    tambem: "pescaria, em inglês",
    grupo: "golpes",
    definicao:
      "Mensagem que se faz passar por uma empresa ou pessoa conhecida para você entregar senha, código ou dinheiro. Chega por e-mail, SMS, WhatsApp, ligação ou anúncio.",
    importa:
      "É o começo da maioria absoluta dos incidentes, dos pessoais aos corporativos. Não explora falha de programa nenhum — explora pressa, medo e confiança, que não têm atualização de segurança.",
  },
  {
    id: "smishing-vishing",
    termo: "Smishing e vishing",
    grupo: "golpes",
    definicao:
      "Phishing por SMS chama-se smishing; por ligação de voz chama-se vishing. Mesma lógica, canais diferentes.",
    importa:
      "Vale conhecer os nomes porque a defesa muda de canal para canal: no SMS você consegue conferir o domínio do link, na ligação não há nada para conferir — só desligar e ligar de volta pelo número oficial.",
  },
  {
    id: "quishing",
    termo: "Quishing",
    tambem: "golpe do QR code",
    grupo: "golpes",
    definicao:
      "Phishing por QR code. Um adesivo é colado por cima do código original — na maquininha, no cartaz, na placa de estacionamento — e leva a uma chave PIX de terceiro ou a uma página falsa.",
    importa:
      "Nenhum ser humano lê um QR code a olho nu, então não existe como desconfiar do quadradinho em si. A única checagem possível vem depois: a tela de confirmação mostra o nome de quem vai receber. Ler esse nome é a defesa inteira.",
  },
  {
    id: "bec",
    termo: "Fraude do e-mail corporativo",
    tambem: "BEC, golpe do boleto, golpe do CEO",
    grupo: "golpes",
    definicao:
      "Uma mensagem se passa por diretoria, fornecedor ou cliente para desviar um pagamento. Muitas vezes vem de uma caixa de e-mail legítima que foi comprometida, no meio de uma conversa real que já estava acontecendo.",
    importa:
      "É a fraude que mais move dinheiro em ambiente corporativo, e todos os sinais clássicos falham: domínio confere, histórico confere, tom confere. A defesa não é olhar melhor — é ter uma regra de que mudança de dado bancário se confirma por voz, no número já cadastrado.",
  },
  {
    id: "pretexting",
    termo: "Pretexting",
    grupo: "golpes",
    definicao:
      "Criar uma situação de fachada para coletar informação sem levantar suspeita. Ligações que se passam por candidato, pesquisador ou fornecedor novo, e que não pedem nada de valor — só mapeiam quem é quem, que sistema se usa, qual é a rotina.",
    importa:
      "Como não pede dinheiro nem senha, não aciona alarme nenhum. É a fase de preparação de uma fraude que chega semanas depois já sabendo os nomes certos, e é por isso que ela soa tão interna quando chega.",
  },
  {
    id: "mfa-fatigue",
    termo: "Bombardeio de notificação",
    tambem: "MFA fatigue, push bombing",
    grupo: "golpes",
    definicao:
      "O criminoso já tem a sua senha e dispara pedidos de aprovação de login em série, às vezes de madrugada, até que você aprove um por cansaço ou para fazer parar.",
    importa:
      "Mostra que ter verificação em duas etapas não basta se ela for por aprovação de toque. Um pedido que você não iniciou já é a prova de que a sua senha vazou — negar e trocar a senha na hora é a resposta, e aprovar “só para parar” entrega a conta.",
  },
  {
    id: "engenharia-social",
    termo: "Engenharia social",
    grupo: "golpes",
    definicao:
      "O nome técnico de convencer alguém a fazer o que você quer. Usa autoridade (“aqui é da diretoria”), urgência (“vence em uma hora”), medo (“sua conta será bloqueada”) ou afeto (“mãe, troquei de número”).",
    importa:
      "É a categoria que engloba quase tudo neste site. E é a razão do tom aqui: cair não é falta de inteligência, é o resultado esperado de uma técnica bem executada chegando num dia ruim.",
  },
  {
    id: "vazamento",
    termo: "Vazamento de dados",
    grupo: "golpes",
    definicao:
      "Quando o banco de dados de uma empresa vai parar na mão de terceiros — por invasão, por descuido de configuração ou por alguém de dentro. Costuma incluir e-mail, telefone, CPF e senhas em hash.",
    importa:
      "É a matéria-prima de tudo. Seu telefone estar numa lista vazada é o que faz o golpe chegar até você, e a mensagem citar o seu nome e a sua última compra é o que faz ela parecer verdadeira.",
  },
  {
    id: "credential-stuffing",
    termo: "Credential stuffing",
    tambem: "o ataque do reuso de senha",
    grupo: "golpes",
    definicao:
      "Pegar as combinações de e-mail e senha de um vazamento e testar automaticamente em centenas de outros serviços, esperando que a pessoa tenha repetido.",
    importa:
      "É por isso que “esse site é bobo, não tem nada importante nele” não protege. A senha do fórum de 2015 é testada no seu banco. Um gerenciador de senhas acaba com esse ataque de uma vez.",
  },
  {
    id: "malware",
    termo: "Malware",
    grupo: "golpes",
    definicao:
      "Nome guarda-chuva para programa feito para causar dano ou roubar: vírus, espião que grava o que você digita, falso app de banco, extensão de navegador maliciosa.",
    importa:
      "No celular, a porta de entrada quase sempre é instalar app de fora da loja oficial ou conceder acessibilidade a um app que pediu sem motivo. No computador, é o anexo que pede para “habilitar conteúdo”.",
  },
  {
    id: "ransomware",
    termo: "Ransomware",
    tambem: "sequestro de arquivos",
    grupo: "golpes",
    definicao:
      "Programa que embaralha todos os arquivos e cobra resgate pela chave. Costuma se espalhar da máquina infectada para a rede inteira.",
    importa:
      "É o pesadelo do lado corporativo, e quase nunca entra por um ataque espetacular: entra por um anexo aberto ou uma senha reutilizada. Backup separado da rede é o que decide se a empresa perde horas ou semanas.",
  },
  {
    id: "sim-swap",
    termo: "Troca de chip",
    tambem: "SIM swap",
    grupo: "golpes",
    definicao:
      "Alguém convence a operadora — com documentos falsos ou dados vazados — a transferir o seu número para um chip em posse dele. A partir daí, os seus SMS chegam nele.",
    importa:
      "É o motivo técnico de o SMS ser a forma mais fraca de verificação em duas etapas. Se o seu celular perder sinal do nada e não voltar, trate como emergência: ligue para a operadora de outro telefone.",
  },

  // ─── Inteligência artificial ────────────────────────────────────────────
  {
    id: "modelo-de-linguagem",
    termo: "Modelo de linguagem",
    tambem: "LLM, “a IA” do ChatGPT e similares",
    grupo: "ia",
    definicao:
      "Um programa treinado com uma quantidade enorme de texto para prever qual palavra vem depois. É daí que sai a conversa: ele não consulta uma base de fatos, ele monta a continuação mais provável.",
    importa:
      "Entender isso explica o comportamento estranho: ele soa igualmente seguro acertando e errando, porque em ambos os casos está fazendo a mesma coisa — completando texto plausível. Confiança no tom não é sinal de acerto.",
  },
  {
    id: "alucinacao",
    termo: "Alucinação",
    grupo: "ia",
    definicao:
      "Quando a IA inventa uma informação e apresenta com toda a naturalidade: um telefone de atendimento, um endereço de site, uma lei, um procedimento bancário que não existe.",
    importa:
      "É o motivo de nunca perguntar a uma IA o telefone do seu banco ou o site de um órgão público. Um número inventado com aparência oficial é a porta de entrada perfeita para outro golpe — e você chegou nele sozinho, sem ninguém ter te enganado.",
  },
  {
    id: "treinamento",
    termo: "Treinamento",
    grupo: "ia",
    definicao:
      "O processo de ajustar o modelo com base em textos. Muitos serviços usam as conversas dos usuários nesse ajuste, salvo se a pessoa desligar a opção nas configurações.",
    importa:
      "É a diferença entre a sua mensagem ser processada e descartada ou virar matéria-prima do produto. Quase todo serviço grande deixa desligar, e costuma vir ligado por padrão — vale conferir na área de dados ou privacidade da sua conta.",
  },
  {
    id: "deepfake",
    termo: "Deepfake",
    tambem: "voz ou rosto clonado",
    grupo: "ia",
    definicao:
      "Áudio, imagem ou vídeo gerado para imitar uma pessoa real. Para a voz, poucos segundos de gravação já bastam — e áudio nosso sobra: mensagem de voz, story, vídeo, reunião gravada.",
    importa:
      "Derruba duas confirmações que todo mundo usava: “eu ouvi a voz dela” e “eu vi o rosto dele na chamada”. A defesa não é aprender a detectar — contra imitação boa isso falha. É verificar por outro caminho: ligar para o número salvo, ou usar uma palavra-código combinada antes.",
  },

  // ─── Brasil ─────────────────────────────────────────────────────────────
  {
    id: "chave-pix",
    termo: "Chave PIX",
    grupo: "brasil",
    definicao:
      "O apelido que aponta para uma conta: CPF, telefone, e-mail ou uma sequência aleatória. Antes de confirmar qualquer transferência, o aplicativo mostra o nome do dono da chave.",
    importa:
      "Esse nome na tela de confirmação é a checagem mais barata que existe contra golpe, e é a que mais gente pula. Se o nome não é de quem está pedindo, é golpe — não importa quão boa seja a explicação.",
  },
  {
    id: "med",
    termo: "MED",
    tambem: "Mecanismo Especial de Devolução",
    grupo: "brasil",
    definicao:
      "Regra do Banco Central que permite pedir de volta um PIX enviado sob fraude. O pedido é feito ao seu próprio banco, que analisa e pode puxar o valor de volta da conta de destino.",
    importa:
      "Existe prazo de até 80 dias para pedir e o banco tem até 7 dias para analisar, mas a chance real cai muito depois das primeiras horas, porque o dinheiro é retirado rápido do outro lado. Pedir no mesmo dia é o que decide.",
  },
  {
    id: "lgpd",
    termo: "LGPD",
    tambem: "Lei Geral de Proteção de Dados",
    grupo: "brasil",
    definicao:
      "Lei brasileira que define o que empresas e órgãos podem fazer com dados pessoais, e que direitos você tem sobre os seus — saber o que guardam, corrigir e pedir exclusão.",
    importa:
      "No trabalho, ela é o motivo de dado de cliente não poder circular por WhatsApp ou e-mail pessoal. Na vida pessoal, é o que dá base para exigir de uma empresa que ela conte o que sabe sobre você.",
  },
  {
    id: "conta-gov-br",
    termo: "Conta gov.br",
    grupo: "brasil",
    definicao:
      "Login único do governo federal, o mesmo usado para carteira de motorista digital, carteira de trabalho e vacinas. Tem níveis — bronze, prata e ouro — conforme o quanto a sua identidade foi comprovada.",
    importa:
      "É a chave para boletim de ocorrência online, Registrato e Consumidor.gov.br. Justamente por abrir tantas portas, é uma das contas que mais merecem verificação em duas etapas ativada.",
  },
  {
    id: "registrato",
    termo: "Registrato",
    grupo: "brasil",
    definicao:
      "Relatório gratuito do Banco Central que mostra contas bancárias, empréstimos e chaves PIX registrados no seu CPF. Acessa-se com a conta gov.br.",
    importa:
      "É como descobrir se alguém abriu conta ou pegou empréstimo no seu nome. Vale consultar depois de qualquer golpe em que os seus documentos tenham circulado.",
  },
];
