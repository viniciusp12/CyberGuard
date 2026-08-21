import { describe, expect, it } from "vitest";
import { scoreEmailAttempt } from "../scoring";
import { GAME_CONFIG } from "../gameConfig";
import { makeEmail } from "./fixtures";

describe("scoreEmailAttempt", () => {
  it("dá o bônus de velocidade máximo ao acertar sem investigar nada", () => {
    const email = makeEmail({ difficulty: 2, correctAction: "accept" });
    const result = scoreEmailAttempt({
      email,
      playerAction: "accept",
      toolsUsed: [],
      currentCombo: 0,
    });

    expect(result.correct).toBe(true);
    expect(result.timeSpentInvestigating).toBe(0);
    expect(result.speedBonus).toBe(GAME_CONFIG.speedBonusMax);
    expect(result.finalScore).toBeGreaterThan(0);
  });

  it("reduz a pontuação quanto mais ferramentas de investigação forem usadas", () => {
    const email = makeEmail({ difficulty: 2, correctAction: "report" });

    const cheap = scoreEmailAttempt({
      email,
      playerAction: "report",
      toolsUsed: ["sender_address"],
      currentCombo: 0,
    });
    const expensive = scoreEmailAttempt({
      email,
      playerAction: "report",
      toolsUsed: ["sender_address", "domain_inspect", "sandbox_execution", "ai_assistant"],
      currentCombo: 0,
    });

    expect(expensive.timeSpentInvestigating).toBeGreaterThan(cheap.timeSpentInvestigating);
    expect(expensive.finalScore).toBeLessThan(cheap.finalScore);
  });

  it("aplica penalidade fixa e dano de segurança em caso de erro, sem XP/dinheiro", () => {
    const email = makeEmail({
      difficulty: 3,
      correctAction: "report",
      investigationHints: [
        { toolId: "sender_address", revealsField: "sender.domain", summaryText: "dominio ok" },
        { toolId: "domain_inspect", revealsField: "sender.domain", summaryText: "dominio recente" },
      ],
    });
    const result = scoreEmailAttempt({
      email,
      playerAction: "accept",
      toolsUsed: [],
      currentCombo: 5,
    });

    expect(result.correct).toBe(false);
    expect(result.finalScore).toBe(GAME_CONFIG.wrongDecisionPenalty);
    expect(result.xpEarned).toBe(0);
    expect(result.moneyEarned).toBe(0);
    expect(result.securityDamage).toBe(GAME_CONFIG.wrongDecisionSecurityDamage);
  });

  it("aumenta a pontuação com o multiplicador de combo, até o teto configurado", () => {
    const email = makeEmail({ difficulty: 2, correctAction: "accept" });

    const noCombo = scoreEmailAttempt({
      email,
      playerAction: "accept",
      toolsUsed: ["sender_address"],
      currentCombo: 0,
    });
    const highCombo = scoreEmailAttempt({
      email,
      playerAction: "accept",
      toolsUsed: ["sender_address"],
      currentCombo: 50,
    });

    expect(highCombo.comboMultiplier).toBe(GAME_CONFIG.comboMaxMultiplier);
    expect(highCombo.finalScore).toBeGreaterThan(noCombo.finalScore);
  });
});
