import type { Email, InvestigationToolId, PlayerAction } from "../schemas/email.schema";
import { GAME_CONFIG, toolTimeCost } from "./gameConfig";

export interface EmailAttemptInput {
  email: Pick<Email, "difficulty" | "correctAction">;
  playerAction: PlayerAction;
  toolsUsed: InvestigationToolId[];
  currentCombo: number;
}

export interface EmailAttemptResult {
  correct: boolean;
  timeSpentInvestigating: number;
  rawScore: number;
  timePenalty: number;
  speedBonus: number;
  comboMultiplier: number;
  finalScore: number;
  xpEarned: number;
  moneyEarned: number;
  securityDamage: number;
}

export function totalInvestigationTime(toolsUsed: InvestigationToolId[]): number {
  return toolsUsed.reduce((sum, tool) => sum + toolTimeCost(tool), 0);
}

export function scoreEmailAttempt(input: EmailAttemptInput): EmailAttemptResult {
  const { email, playerAction, toolsUsed, currentCombo } = input;
  const correct = playerAction === email.correctAction;
  const timeSpentInvestigating = totalInvestigationTime(toolsUsed);

  if (!correct) {
    return {
      correct: false,
      timeSpentInvestigating,
      rawScore: GAME_CONFIG.wrongDecisionPenalty,
      timePenalty: 0,
      speedBonus: 0,
      comboMultiplier: 1,
      finalScore: GAME_CONFIG.wrongDecisionPenalty,
      xpEarned: 0,
      moneyEarned: 0,
      securityDamage: GAME_CONFIG.wrongDecisionSecurityDamage,
    };
  }

  const basePoints = GAME_CONFIG.basePointsByDifficulty(email.difficulty);
  const timePenalty = timeSpentInvestigating * GAME_CONFIG.pointPenaltyPerSecondInvestigated;
  const speedBonus =
    toolsUsed.length === 0
      ? GAME_CONFIG.speedBonusMax
      : Math.max(
          0,
          GAME_CONFIG.speedBonusMax - timeSpentInvestigating * GAME_CONFIG.speedBonusDecayPerSecond,
        );

  const comboMultiplier = Math.min(
    GAME_CONFIG.comboMaxMultiplier,
    1 + currentCombo * GAME_CONFIG.comboStepMultiplier,
  );

  const rawScore = Math.max(GAME_CONFIG.minRawScore, basePoints - timePenalty);
  const finalScore = Math.round(rawScore * comboMultiplier + speedBonus);

  return {
    correct: true,
    timeSpentInvestigating,
    rawScore,
    timePenalty,
    speedBonus,
    comboMultiplier,
    finalScore,
    xpEarned: Math.round(finalScore * GAME_CONFIG.xpConversionRate),
    moneyEarned: Math.round(finalScore * GAME_CONFIG.moneyConversionRate),
    securityDamage: 0,
  };
}
