import type { DictionaryTable } from "../dictionary";

export const mainPages: DictionaryTable = {
  // /phases
  phasesTitle: { pt: "Fases", en: "Phases" },
  phasesDescription: {
    pt: "Cada dia de trabalho traz novos emails para investigar.",
    en: "Each work day brings new emails to investigate.",
  },
  dayTitle: { pt: "Dia {{number}} — {{title}}", en: "Day {{number}} — {{title}}" },
  difficultyTag: { pt: "Dificuldade {{min}}-{{max}}", en: "Difficulty {{min}}-{{max}}" },
  phasesComingSoonTitle: { pt: "Mais desafios chegando", en: "More challenges coming" },
  phasesComingSoonDescription: {
    pt: "Microsoft falsa, CEO Fraud, deepfake e ataques combinados em produção.",
    en: "Fake Microsoft, CEO fraud, deepfake, and combined attacks in production.",
  },
  comingSoonTag: { pt: "Em breve", en: "Coming soon" },
  dayNumber: { pt: "Dia {{number}}", en: "Day {{number}}" },
  completed: { pt: "Concluído", en: "Completed" },
  emailsAndMinutes: { pt: "{{count}} emails · {{minutes}} min", en: "{{count}} emails · {{minutes}} min" },
  completePreviousDay: { pt: "Complete o dia anterior", en: "Complete the previous day" },
  playAgain: { pt: "Jogar novamente", en: "Play again" },
  start: { pt: "Iniciar", en: "Start" },
  locked: { pt: "Bloqueado", en: "Locked" },

  // /shop
  shopTitle: { pt: "Loja", en: "Shop" },
  shopDescription: {
    pt: "Upgrades ajudam na investigação, mas nunca resolvem um email por você.",
    en: "Upgrades help your investigation, but they never solve an email for you.",
  },
  owned: { pt: "Adquirido", en: "Owned" },
  buyFor: { pt: "Comprar por", en: "Buy for" },

  // /achievements
  achievementsTitle: { pt: "Conquistas", en: "Achievements" },
  achievementsDescription: {
    pt: "Marcos que provam sua evolução em segurança da informação.",
    en: "Milestones that prove your growth in information security.",
  },
  achievementUnlocked: { pt: "Desbloqueada", en: "Unlocked" },
  achievementLocked: { pt: "Bloqueada", en: "Locked" },
  reward: { pt: "Recompensa:", en: "Reward:" },
  coins: { pt: "moedas", en: "coins" },

  // /ranking
  rankingTitle: { pt: "Ranking", en: "Ranking" },
  rankingDescription: {
    pt: "Ranking geral de XP entre todos os funcionários com acesso ao jogo.",
    en: "Overall XP ranking across all employees with access to the game.",
  },
  noOnePlayedYet: { pt: "Ninguém jogou ainda.", en: "No one has played yet." },
  noDepartment: { pt: "Sem departamento", en: "No department" },
  you: { pt: "Você", en: "You" },

  // circular-carousel.tsx
  carouselAriaLabel: { pt: "Seleção de fase", en: "Phase selection" },
  carouselPrevious: { pt: "Fase anterior", en: "Previous phase" },
  carouselNext: { pt: "Próxima fase", en: "Next phase" },
  carouselGoTo: { pt: "Ir para fase {{number}}", en: "Go to phase {{number}}" },
  carouselOf: { pt: "de {{total}}", en: "of {{total}}" },
};
