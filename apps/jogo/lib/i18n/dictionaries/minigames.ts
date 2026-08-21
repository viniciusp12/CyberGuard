import type { DictionaryTable } from "../dictionary";

export const minigames: DictionaryTable = {
  // /minigames (list)
  listTitle: { pt: "Mini-jogos", en: "Minigames" },
  listDescription: {
    pt: "Desafios rápidos para treinar seus reflexos entre uma fase e outra.",
    en: "Quick challenges to sharpen your reflexes between phases.",
  },
  cacaPhishingTitle: { pt: "Caça-Phishing", en: "Phishing Hunt" },
  cacaPhishingDescription: {
    pt: "Uma leva de emails aparece na tela. Clique nos suspeitos antes do tempo acabar — cada erro custa pontos e quebra seu combo.",
    en: "A batch of emails appears on screen. Click the suspicious ones before time runs out — every mistake costs points and breaks your combo.",
  },
  cacaPhishingMeta: { pt: "75 segundos · reflexo e atenção", en: "75 seconds · reflexes and attention" },
  quizTitle: { pt: "Quiz de Segurança", en: "Security Quiz" },
  quizDescription: {
    pt: "Perguntas rápidas sobre tudo que você já aprendeu: phishing, MFA, PIX falso, boletos adulterados e mais.",
    en: "Quick questions about everything you've learned so far: phishing, MFA, fake instant payments, tampered invoices, and more.",
  },
  quizMeta: { pt: "18 perguntas · 15s cada", en: "18 questions · 15s each" },
  play: { pt: "Jogar", en: "Play" },

  // caça-phishing intro
  cacaIntroPart1: {
    pt: "{{count}} emails vão aparecer na tela. Clique nos que forem",
    en: "{{count}} emails will appear on screen. Click the ones that are",
  },
  cacaIntroPhishingWord: { pt: "phishing", en: "phishing" },
  cacaIntroPart2: {
    pt: "antes do tempo acabar. Clicar em um email legítimo custa pontos e quebra seu combo — deixe os seguros em paz.",
    en: "before time runs out. Clicking a legitimate email costs points and breaks your combo — leave the safe ones alone.",
  },
  totalSeconds: { pt: "{{seconds}} segundos no total", en: "{{seconds}} seconds total" },
  start: { pt: "Começar", en: "Start" },

  // results (shared by both minigames)
  gameOver: { pt: "Fim de jogo", en: "Game over" },
  correct: { pt: "Acertos", en: "Correct" },
  wrong: { pt: "Erros", en: "Wrong" },
  missed: { pt: "Não pegos", en: "Missed" },
  bestCombo: { pt: "Melhor combo", en: "Best combo" },
  score: { pt: "Pontuação:", en: "Score:" },
  playAgain: { pt: "Jogar novamente", en: "Play again" },

  // HUD labels
  remaining: { pt: "Restam", en: "Left" },
  points: { pt: "Pontos", en: "Points" },
  question: { pt: "Pergunta", en: "Question" },

  // quiz intro
  quizIntroDescription: {
    pt: "{{count}} perguntas sobre tudo que você já aprendeu. Você tem {{seconds}} segundos por pergunta — respostas mais rápidas valem mais pontos.",
    en: "{{count}} questions about everything you've learned so far. You have {{seconds}} seconds per question — faster answers are worth more points.",
  },
};
