/**
 * Conteúdo da camada corporativa (`/no-trabalho`).
 *
 * Padrão de cada golpe, e ele não deve ser quebrado ao adicionar um novo:
 *
 *   comoChega       o que a pessoa vê acontecer
 *   porQueFunciona  qual gatilho psicológico ou falha de processo é explorado
 *   pontoDeQuebra   o momento exato em que a corrente arrebenta
 *   oQueFazer       a ação concreta, em uma ou duas frases
 *
 * O `pontoDeQuebra` é o campo que diferencia este material de uma lista de
 * boas práticas. Todo golpe é uma sequência de passos, e quase sempre existe
 * um único elo que, rompido, derruba o resto — nomear esse elo é mais útil do
 * que pedir atenção genérica.
 */

export type GolpeTrabalho = {
  id: string;
  titulo: string;
  comoChega: string;
  porQueFunciona: string;
  pontoDeQuebra: string;
  oQueFazer: string;
};

export type Categoria = {
  id: string;
  titulo: string;
  resumo: string;
  golpes: GolpeTrabalho[];
};

export const CATEGORIAS: Categoria[] = [
  {
    id: "identidade",
    titulo: "Quem finge ser gente de dentro",
    resumo:
      "Não exploram falha de sistema nenhuma. Exploram a hierarquia, a pressa e o constrangimento de duvidar de alguém que parece ter autoridade.",
    golpes: [
      {
        id: "falso-ti",
        titulo: "O falso suporte de TI",
        comoChega:
          "Alguém liga dizendo ser da TI, do time de segurança ou de um fornecedor de sistema. Fala com naturalidade, cita nomes internos que qualquer um encontra no LinkedIn, e pede sua senha ou o código de verificação “para resolver um chamado urgente antes do fim do expediente”.",
        porQueFunciona:
          "Explora autoridade e pressa ao mesmo tempo, e chega quando você está no meio de outra coisa. Recusar parece falta de colaboração com um colega.",
        pontoDeQuebra:
          "No pedido da senha ou do código. TI de verdade tem acesso administrativo e nunca precisa da sua credencial — se está pedindo, ou não é TI, ou é TI fazendo errado. Nos dois casos a resposta é não.",
        oQueFazer:
          "Desligue e ligue de volta pelo ramal da lista interna, nunca pelo número que apareceu no visor. Um pedido legítimo sobrevive a essa conferência sem problema nenhum.",
      },
      {
        id: "diretoria",
        titulo: "O pedido urgente da diretoria",
        comoChega:
          "Um e-mail ou WhatsApp assinado por alguém da liderança pede um pagamento fora do fluxo normal, com discrição e prazo apertado. O endereço é parecido com o corporativo, mas com uma letra trocada ou um domínio quase igual.",
        porQueFunciona:
          "Ninguém quer ser o funcionário que atrasou uma decisão da diretoria. A hierarquia faz o trabalho que a técnica não faria — e o pedido de discrição impede justamente a conversa que derrubaria o golpe.",
        pontoDeQuebra:
          "Na confirmação por voz. O golpe depende de a conversa não sair do canal escolhido por ele. Uma ligação de trinta segundos para o número que já estava na sua agenda encerra o assunto.",
        oQueFazer:
          "Todo pagamento fora do fluxo padrão exige confirmação por um segundo canal, com uma pessoa. Isso não é desconfiança da liderança — é o controle que existe para proteger quem executa.",
      },
      {
        id: "pretexting",
        titulo: "A ligação que não pede nada",
        comoChega:
          "Alguém liga se passando por candidato, jornalista, estudante de pesquisa ou fornecedor novo. Não pede dinheiro nem senha — só quer saber quem cuida de compras, qual é o horário do gerente, que sistema a loja usa, quem responde quando o encarregado falta.",
        porQueFunciona:
          "Como não pede nada de valor, não aciona nenhum alarme. É uma conversa simpática e aparentemente inofensiva. O nome técnico é pretexting, e ele é a fase de preparação de uma fraude que vem semanas depois.",
        pontoDeQuebra:
          "No registro. Golpe de coleta depende de ninguém comentar a ligação com ninguém. Uma menção no grupo da equipe faz duas pessoas perceberem que receberam a mesma ligação estranha.",
        oQueFazer:
          "Informação sobre estrutura interna, sistemas e rotina é dado da empresa. Direcione quem pergunta para os canais oficiais e avise a segurança — mesmo sem ter certeza de nada.",
      },
      {
        id: "falso-tecnico",
        titulo: "O falso técnico na loja",
        comoChega:
          "Uma pessoa aparece de uniforme dizendo ser da manutenção do ar-condicionado, da operadora, da rede elétrica ou da empresa da maquininha. Pede para acessar a sala de equipamentos, o estoque ou um computador do caixa.",
        porQueFunciona:
          "Uniforme e prancheta funcionam como crachá. E em loja movimentada, barrar alguém que parece estar trabalhando causa constrangimento — que é exatamente o que se está explorando.",
        pontoDeQuebra:
          "No agendamento. Manutenção de verdade foi contratada por alguém, e esse alguém sabe o dia. Uma visita que ninguém agendou não entra, por mais convincente que seja a história.",
        oQueFazer:
          "Confirme com o responsável pelo contrato antes de liberar acesso, e não deixe visitante sozinho perto de máquina destravada. Bloquear a tela ao levantar vale mais aqui do que em qualquer escritório.",
      },
    ],
  },
  {
    id: "dinheiro",
    titulo: "Dinheiro que muda de destino",
    resumo:
      "Aqui não há invasão nenhuma. Só um número de conta trocado num lugar em que ninguém confere duas vezes.",
    golpes: [
      {
        id: "boleto",
        titulo: "O boleto e a nota fiscal trocados",
        comoChega:
          "Um fornecedor conhecido manda a cobrança de sempre, no formato de sempre — só que a conta de destino mudou, com a explicação de que “trocamos de banco”.",
        porQueFunciona:
          "Muitas vezes a caixa de e-mail do fornecedor foi comprometida de verdade, e a mensagem vem mesmo do endereço legítimo, no meio de uma conversa real que já vinha acontecendo há dias.",
        pontoDeQuebra:
          "Na conferência dos dados bancários por telefone. É o único passo do processo que o criminoso não controla, porque ele não atende o número antigo do fornecedor.",
        oQueFazer:
          "Mudança de dados bancários de fornecedor sempre se confirma por voz, no número já cadastrado — nunca no número que veio no e-mail novo, nem no que está na assinatura da mensagem suspeita.",
      },
      {
        id: "qr-code",
        titulo: "O QR code trocado",
        comoChega:
          "Um adesivo com QR code é colado por cima do original — na maquininha, no cartaz de promoção, na placa de estacionamento, no display do caixa. Quem paga é levado a uma chave PIX que não é da loja, ou a uma página falsa pedindo dados do cartão.",
        porQueFunciona:
          "Ninguém consegue ler um QR code a olho nu, então não há como desconfiar do quadradinho. E o ataque é físico: custa um adesivo impresso e cinco segundos de distração.",
        pontoDeQuebra:
          "Na tela de confirmação do pagamento, que mostra o nome de quem vai receber. Se não é a razão social da loja, o golpe morre ali — antes disso não há como perceber.",
        oQueFazer:
          "Confira os QR codes expostos ao público no início e no fim do expediente, procurando adesivo sobreposto. Oriente o cliente a ler o nome do recebedor antes de confirmar, e desconfie de QR code impresso avulso, sem estar integrado ao material oficial.",
      },
      {
        id: "devolucao",
        titulo: "A devolução que não devolve nada",
        comoChega:
          "Cliente pede reembolso de um produto que não comprou, devolve uma caixa com peso equivalente mas sem o item, apresenta comprovante adulterado, ou insiste que a compra foi feita em outra loja da rede e “o sistema está fora do ar”.",
        porQueFunciona:
          "Explora a pressão por atendimento rápido e a regra não escrita de que o cliente tem razão. Costuma acontecer em horário de pico, com fila atrás, e mirando quem está há pouco tempo na função.",
        pontoDeQuebra:
          "Na conferência física do que voltou, contra o registro da venda. É o passo que a pressa faz pular.",
        oQueFazer:
          "Siga o procedimento de devolução até o fim mesmo com fila. Se houver pressão para pular etapa, chame o responsável — e não é falha sua precisar chamar, é o processo funcionando.",
      },
    ],
  },
  {
    id: "acesso",
    titulo: "Acesso à sua conta de trabalho",
    resumo:
      "A conta corporativa vale mais que a sua conta pessoal: ela abre sistema de cliente, histórico de pedido e a confiança de todo mundo que recebe e-mail seu.",
    golpes: [
      {
        id: "login-falso",
        titulo: "A página falsa de login",
        comoChega:
          "Um e-mail avisa sobre documento compartilhado, caixa postal cheia, senha expirando ou holerite disponível. O link leva a uma tela idêntica à do login corporativo — mesma marca, mesma cor, mesmo layout. Você digita e ela “dá erro”, então tenta de novo no site verdadeiro e funciona. Parece um bug; foi um roubo.",
        porQueFunciona:
          "Copiar uma tela de login custa minutos. E o pretexto é sempre algo rotineiro, que você já viu acontecer de verdade dezenas de vezes.",
        pontoDeQuebra:
          "No domínio da barra de endereço, antes de digitar. É o único momento em que a diferença é visível — depois de digitar, já foi.",
        oQueFazer:
          "Nunca chegue à tela de login por link recebido. Acesse pelo favorito que você mesmo salvou. Um gerenciador de senhas ajuda de graça aqui: ele não preenche num domínio diferente, e esse silêncio é o alerta.",
      },
      {
        id: "mfa-fatigue",
        titulo: "O bombardeio de notificação",
        comoChega:
          "O celular começa a receber pedidos de aprovação de login, um atrás do outro, às vezes de madrugada. Você não pediu nenhum. Em algum momento vem uma mensagem dizendo ser da TI, pedindo que aprove “para parar o erro”.",
        porQueFunciona:
          "Já significa que o criminoso tem a sua senha e só falta a segunda etapa. A técnica não quebra nada: aposta no cansaço, na vontade de fazer parar e no desconhecimento de que aprovar por engano entrega a conta.",
        pontoDeQuebra:
          "No primeiro pedido que você não reconhece. Ele já é a prova de que a sua senha vazou — e negar mantém a porta fechada mesmo com a senha na mão do outro.",
        oQueFazer:
          "Nunca aprove um pedido que você não iniciou, por mais insistente que seja. Negue, troque a senha na hora e avise a segurança — a senha antiga está em posse de alguém, isso é certeza, não suspeita.",
      },
      {
        id: "caixa-comprometida",
        titulo: "A caixa de e-mail que virou base do golpe",
        comoChega:
          "Uma conta legítima — sua, de um colega ou de um fornecedor — passa a mandar mensagens que ninguém escreveu. Elas entram no meio de conversas reais, respondem a assuntos verdadeiros e vêm do endereço certo, porque são mesmo do endereço certo.",
        porQueFunciona:
          "Todos os sinais clássicos falham: o domínio confere, o histórico confere, o tom confere. Costuma haver regras de encaminhamento criadas em silêncio, para o dono da conta não ver as respostas.",
        pontoDeQuebra:
          "Na revisão das regras de e-mail e das sessões ativas. Um filtro que arquiva mensagens sozinho, ou um acesso de lugar estranho, é o rastro que o golpe deixa e ninguém olha.",
        oQueFazer:
          "Se receber pedido inesperado de alguém conhecido, confirme por voz mesmo que o e-mail esteja perfeito. E revise periodicamente as regras de encaminhamento da sua própria caixa — se houver uma que você não criou, é incidente.",
      },
    ],
  },
  {
    id: "codigo",
    titulo: "Código que entra junto",
    resumo:
      "A única categoria que depende de software malicioso. E, mesmo aqui, o passo decisivo continua sendo uma pessoa clicando em algo.",
    golpes: [
      {
        id: "anexo",
        titulo: "O anexo que executa em vez de abrir",
        comoChega:
          "Um pedido de orçamento, um currículo, uma segunda via de nota. O arquivo pede para “habilitar edição” ou “habilitar conteúdo” para ver direito, ou tem uma extensão incomum (.exe, .scr, .js, .iso, .lnk).",
        porQueFunciona:
          "O contexto é plausível e o pedido de habilitar parece uma etapa técnica chata, não uma decisão de segurança.",
        pontoDeQuebra:
          "Exatamente no botão de habilitar conteúdo. Antes dele o arquivo é inerte; depois dele o código roda. Não existe meio-termo.",
        oQueFazer:
          "Na dúvida, não abra: encaminhe para a TI. Um orçamento perdido custa menos que uma loja parada.",
      },
      {
        id: "ransomware",
        titulo: "Ransomware",
        comoChega:
          "Quase sempre entra por um dos itens acima — um anexo aberto, uma credencial reutilizada, um acesso remoto exposto. Depois se espalha pela rede e embaralha arquivos e sistemas, exigindo pagamento.",
        porQueFunciona:
          "Não depende de um golpe espetacular. Depende de uma única porta destrancada em qualquer ponto da rede, e de tempo suficiente para se espalhar antes de alguém perceber.",
        pontoDeQuebra:
          "Nos minutos entre a infecção e o alarme. Desconectar a máquina da rede cedo é o que separa um computador perdido de uma operação parada.",
        oQueFazer:
          "Se a tela pedir resgate, ou se arquivos começarem a virar nomes estranhos: tire o cabo de rede e desligue o Wi-Fi na hora, e acione a TI. Não pague nada por conta própria, e não desligue o computador se puderem orientar o contrário.",
      },
      {
        id: "pendrive",
        titulo: "O pendrive achado",
        comoChega:
          "Um pendrive aparece no estacionamento, no balcão, na área de descanso. Às vezes com etiqueta que convida — “fotos confraternização”, “folha de pagamento”. Quem acha costuma espetar num computador só para descobrir de quem é.",
        porQueFunciona:
          "A intenção é boa: devolver ao dono. E o gesto de espetar não parece uma decisão de segurança, parece educação.",
        pontoDeQuebra:
          "Na porta USB. Enquanto ele não for conectado, é um pedaço de plástico.",
        oQueFazer:
          "Não conecte dispositivo de origem desconhecida em máquina da empresa. Entregue ao responsável ou ao achados e perdidos.",
      },
    ],
  },
  {
    id: "vazamento",
    titulo: "Vazamento sem ataque nenhum",
    resumo:
      "A categoria mais comum e a que menos parece incidente, porque não há vilão — só alguém tentando adiantar o trabalho.",
    golpes: [
      {
        id: "dados-fora",
        titulo: "Dados de cliente fora do lugar",
        comoChega:
          "A planilha com CPF exportada para o e-mail pessoal para adiantar em casa, o print de cadastro mandado no grupo de WhatsApp da equipe, a foto do sistema com dados na tela, o relatório impresso esquecido na bancada.",
        porQueFunciona:
          "A intenção é boa e o atalho resolve o dia. O vazamento só aparece depois, quando aquele arquivo já está em quatro lugares e ninguém sabe apagar de todos.",
        pontoDeQuebra:
          "No momento da exportação. Depois que o dado sai do sistema controlado, não existe mais como saber por onde ele andou.",
        oQueFazer:
          "Dado pessoal de cliente circula só pelos sistemas e canais autorizados, e só na quantidade necessária para a tarefa. Suspeita de vazamento vai imediatamente para o encarregado de dados — a LGPD trabalha com prazo curto, e ele começa a correr na descoberta.",
      },
    ],
  },
];

/** Total de golpes cobertos, calculado para não desatualizar no texto. */
export const TOTAL_GOLPES = CATEGORIAS.reduce(
  (soma, c) => soma + c.golpes.length,
  0,
);

export const PASSOS_INCIDENTE = [
  {
    n: "01",
    quando: "nos primeiros minutos",
    titulo: "Avise antes de tentar consertar",
    texto:
      "O tempo entre o clique e o aviso é o que define o tamanho do estrago. Avisar em cinco minutos com vergonha vale muito mais que avisar em dois dias com uma explicação pronta. Ligue para a segurança ou para a liderança — não abra chamado e vá almoçar.",
  },
  {
    n: "02",
    quando: "junto com o aviso",
    titulo: "Isole a máquina, não a informação",
    texto:
      "Tire o cabo de rede e desligue o Wi-Fi para conter. Mas conte tudo o que aconteceu, inclusive a parte que parece constrangedora: detalhe omitido é investigação que começa errada e demora mais.",
  },
  {
    n: "03",
    quando: "antes de qualquer limpeza",
    titulo: "Não apague nada",
    texto:
      "O e-mail, o arquivo, o histórico, a mensagem. Apagar por vergonha destrói a evidência de que a segurança precisa para saber até onde o problema chegou — e sem isso a resposta assume o pior cenário.",
  },
  {
    n: "04",
    quando: "ainda no mesmo dia",
    titulo: "Anote a linha do tempo",
    texto:
      "Quando chegou, quando você clicou, quando percebeu, o que fez no meio, com quem falou. É a primeira coisa que vão pedir, e a memória piora rápido.",
  },
  {
    n: "05",
    quando: "com orientação da TI",
    titulo: "Troque as credenciais envolvidas",
    texto:
      "Em todos os lugares onde aquela senha foi usada — inclusive nos pessoais, se houver reuso. E encerre as sessões ativas: trocar a senha sem desconectar deixa quem já estava dentro continuar dentro.",
  },
  {
    n: "06",
    quando: "responsabilidade da empresa",
    titulo: "Se houve dado pessoal, o relógio da LGPD começou",
    texto:
      "Quando o incidente atinge dado pessoal, o encarregado precisa avaliar a comunicação à ANPD e às pessoas afetadas. O prazo é curto e conta a partir do momento em que a empresa soube — o que torna o seu aviso rápido parte do cumprimento legal, não só boa vontade.",
  },
];
