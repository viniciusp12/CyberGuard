import type { DictionaryTable } from "../dictionary";

/**
 * Textos dos minijogos.
 *
 * Reescritos junto com a retirada do cronômetro e do combo. A versão anterior
 * falava em "treinar seus reflexos", "antes do tempo acabar", "cada erro custa
 * pontos e quebra seu combo" e "respostas mais rápidas valem mais pontos" — e
 * soltava "MFA" numa descrição sem explicar.
 *
 * Duas regras para quem editar:
 *  1. Nada de pressa. Golpe funciona justamente quando a pessoa reage rápido
 *     demais; o jogo não pode pedir o mesmo reflexo que quer desfazer.
 *  2. Nada de sigla. Se a palavra precisa de explicação, troque pela explicação.
 */
export const minigames: DictionaryTable = {
  // /minigames (lista)
  listTitle: { pt: "Mini-jogos", en: "Minigames" },
  listDescription: {
    pt: "Jogos curtos para praticar o que você aprendeu.",
    en: "Short games to practice what you've learned.",
  },
  cacaPhishingTitle: { pt: "Caça-Golpe", en: "Scam Hunt" },
  cacaPhishingDescription: {
    pt: "Uma lista de e-mails. Toque nos que são golpe. Quando terminar, confira o resultado.",
    en: "A list of emails. Tap the ones that are scams. When you're done, check your result.",
  },
  cacaPhishingMeta: { pt: "Sem tempo · no seu ritmo", en: "No timer · at your own pace" },
  quizTitle: { pt: "Quiz de Segurança", en: "Security Quiz" },
  quizDescription: {
    pt: "Perguntas simples sobre como reconhecer um golpe: e-mail falso, PIX falso, boleto trocado e mais.",
    en: "Simple questions about spotting a scam: fake email, fake payment, swapped invoice, and more.",
  },
  quizMeta: { pt: "Sem tempo · no seu ritmo", en: "No timer · at your own pace" },
  play: { pt: "Jogar", en: "Play" },

  // caça-golpe: abertura
  cacaIntro: {
    pt: "Vão aparecer {{count}} e-mails. Toque só nos que você acha que são golpe. Não tem tempo: leia com calma e, quando terminar, toque em Conferir.",
    en: "{{count}} emails will appear. Tap only the ones you think are scams. There's no timer: read calmly and, when you're done, tap Check.",
  },
  start: { pt: "Começar", en: "Start" },
  check: { pt: "Conferir", en: "Check" },

  // resultado (comum aos dois)
  gameOver: { pt: "Resultado", en: "Result" },
  correct: { pt: "Acertos", en: "Correct" },
  wrong: { pt: "Erros", en: "Wrong" },
  missed: { pt: "Golpes que passaram", en: "Scams you missed" },
  score: { pt: "Pontos:", en: "Points:" },
  playAgain: { pt: "Jogar de novo", en: "Play again" },

  // painel
  points: { pt: "Pontos", en: "Points" },
  question: { pt: "Pergunta", en: "Question" },
  next: { pt: "Próxima pergunta", en: "Next question" },
  seeResult: { pt: "Ver resultado", en: "See result" },

  // quiz: abertura
  quizIntroDescription: {
    pt: "São {{count}} perguntas. Não tem tempo: leia com calma. Depois de cada resposta, você vê a explicação.",
    en: "There are {{count}} questions. There's no timer: read calmly. After each answer, you'll see the explanation.",
  },
};
