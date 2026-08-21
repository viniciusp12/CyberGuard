import type { InvestigationToolId } from "../schemas/email.schema";

export const GAME_CONFIG = {
  basePointsByDifficulty: (difficulty: number) => 100 * difficulty,
  investigationTimeCostSeconds: {
    sender_address: 1,
    link_hover: 1,
    qr_preview: 2,
    certificate_view: 2,
    domain_inspect: 3,
    attachment_analysis: 3,
    header_inspect: 3,
    internal_db_lookup: 3,
    ai_assistant: 5,
    sandbox_execution: 8,
    out_of_band_verify: 6,
  } satisfies Record<InvestigationToolId, number>,
  pointPenaltyPerSecondInvestigated: 2,
  speedBonusMax: 60,
  speedBonusDecayPerSecond: 2,
  wrongDecisionPenalty: -80,
  wrongDecisionSecurityDamage: 15,
  comboStepMultiplier: 0.05,
  comboMaxMultiplier: 1.5,
  xpConversionRate: 1,
  moneyConversionRate: 0.5,
  minRawScore: 10,
} as const;

export function toolTimeCost(toolId: InvestigationToolId): number {
  return GAME_CONFIG.investigationTimeCostSeconds[toolId];
}

const XP_PER_LEVEL = 1000;

export function levelForXp(xp: number): number {
  return 1 + Math.floor(xp / XP_PER_LEVEL);
}

export function xpIntoCurrentLevel(xp: number): { current: number; required: number } {
  return { current: xp % XP_PER_LEVEL, required: XP_PER_LEVEL };
}
