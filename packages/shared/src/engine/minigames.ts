import { nextCombo } from "./combo";

export const ARCADE_CONFIG = {
  timeLimitSeconds: 75,
  correctPoints: 40,
  wrongPenalty: -25,
  comboStepMultiplier: 0.08,
  comboMaxMultiplier: 2,
} as const;

export interface ArcadeHitResult {
  points: number;
  combo: number;
  comboMultiplier: number;
}

export function scoreArcadeHit(currentCombo: number, isCorrectHit: boolean): ArcadeHitResult {
  if (!isCorrectHit) {
    return { points: ARCADE_CONFIG.wrongPenalty, combo: 0, comboMultiplier: 1 };
  }
  const combo = nextCombo(currentCombo, true);
  const comboMultiplier = Math.min(
    ARCADE_CONFIG.comboMaxMultiplier,
    1 + currentCombo * ARCADE_CONFIG.comboStepMultiplier,
  );
  return { points: Math.round(ARCADE_CONFIG.correctPoints * comboMultiplier), combo, comboMultiplier };
}

export const QUIZ_CONFIG = {
  secondsPerQuestion: 15,
  basePoints: 100,
  timeBonusPerSecond: 6,
  comboStepMultiplier: 0.1,
  comboMaxMultiplier: 2,
} as const;

export interface QuizAnswerResult {
  correct: boolean;
  points: number;
  combo: number;
  comboMultiplier: number;
}

export function scoreQuizAnswer(
  correct: boolean,
  secondsRemaining: number,
  currentCombo: number,
): QuizAnswerResult {
  if (!correct) {
    return { correct: false, points: 0, combo: 0, comboMultiplier: 1 };
  }
  const combo = nextCombo(currentCombo, true);
  const comboMultiplier = Math.min(
    QUIZ_CONFIG.comboMaxMultiplier,
    1 + currentCombo * QUIZ_CONFIG.comboStepMultiplier,
  );
  const timeBonus = Math.max(0, secondsRemaining) * QUIZ_CONFIG.timeBonusPerSecond;
  const points = Math.round((QUIZ_CONFIG.basePoints + timeBonus) * comboMultiplier);
  return { correct: true, points, combo, comboMultiplier };
}
