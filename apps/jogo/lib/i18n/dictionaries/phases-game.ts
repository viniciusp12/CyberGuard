import type { DictionaryTable } from "../dictionary";

export const phasesGame: DictionaryTable = {
  accept: { pt: "Aceitar", en: "Accept" },
  report: { pt: "Reportar ao TI", en: "Report to IT" },

  inboxHeader: { pt: "Caixa de Entrada — Correspondência", en: "Inbox — Correspondence" },
  fromLabel: { pt: "De:", en: "From:" },
  hiddenAddress: { pt: "<endereço oculto — use Investigar>", en: "<hidden address — use Investigate>" },
  toLabel: { pt: "Para:", en: "To:" },
  dateLabel: { pt: "Data:", en: "Date:" },
  qrAttached: { pt: "QR Code anexado à mensagem", en: "QR code attached to message" },

  investigateButton: { pt: "Investigar", en: "Investigate" },

  stampAccept: { pt: "LIBERADO", en: "CLEARED" },
  stampDelete: { pt: "EXCLUÍDO", en: "DELETED" },
  stampReport: { pt: "DENUNCIADO", en: "REPORTED" },

  interruptionLabel: { pt: "Interrupção", en: "Interruption" },

  phaseNotAvailable: { pt: "Esta fase ainda não está disponível.", en: "This phase is not available yet." },
  backToPhases: { pt: "Voltar às fases", en: "Back to phases" },
  loadingPhase: { pt: "Carregando fase...", en: "Loading phase..." },
  dayNumber: { pt: "Dia {{number}}", en: "Day {{number}}" },
  emailsAndMinutes: {
    pt: "{{count}} e-mails · sem tempo limite",
    en: "{{count}} emails · no time limit",
  },
  startShift: { pt: "Começar o expediente", en: "Start the shift" },
  finalizingPhase: { pt: "Finalizando fase...", en: "Finalizing phase..." },

  noResultsAvailable: { pt: "Nenhum resultado disponível.", en: "No results available." },
  endOfShiftTitle: { pt: "Fim do expediente — {{title}}", en: "End of shift — {{title}}" },
  reviewPerformance: { pt: "Confira como você se saiu.", en: "Check out how you did." },
  correctLabel: { pt: "Acertos", en: "Correct" },
  wrongLabel: { pt: "Erros", en: "Wrong" },
  coinsLabel: { pt: "moedas", en: "coins" },
  scoreLabel: { pt: "Pontuação:", en: "Score:" },
  practiceModeNotice: {
    pt: 'Modo prática: você já concluiu esta fase antes, então repeti-la não rende XP nem moedas extras — isso evita "farmar" pontos para o ranking.',
    en: 'Practice mode: you\'ve already completed this phase before, so replaying it doesn\'t earn extra XP or coins — this prevents "farming" points for the ranking.',
  },
  newAchievements: { pt: "Novas conquistas", en: "New achievements" },
  detailedReview: { pt: "Revisão detalhada", en: "Detailed review" },
  emailFallback: { pt: "Email {{number}}", en: "Email {{number}}" },
  correctBadge: { pt: "Correto", en: "Correct" },
  incorrectBadge: { pt: "Incorreto", en: "Incorrect" },
  playAgain: { pt: "Jogar novamente", en: "Play again" },
};
