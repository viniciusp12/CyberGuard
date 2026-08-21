import { describe, expect, it } from "vitest";
import { scoreArcadeHit, scoreQuizAnswer, ARCADE_CONFIG, QUIZ_CONFIG } from "../minigames";

describe("scoreArcadeHit", () => {
  it("awards points and increases combo on a correct hit", () => {
    const result = scoreArcadeHit(0, true);
    expect(result.points).toBe(ARCADE_CONFIG.correctPoints);
    expect(result.combo).toBe(1);
  });

  it("applies the combo multiplier on later correct hits", () => {
    const result = scoreArcadeHit(5, true);
    expect(result.comboMultiplier).toBeGreaterThan(1);
    expect(result.points).toBeGreaterThan(ARCADE_CONFIG.correctPoints);
  });

  it("penalizes and resets combo on a wrong hit", () => {
    const result = scoreArcadeHit(5, false);
    expect(result.points).toBe(ARCADE_CONFIG.wrongPenalty);
    expect(result.combo).toBe(0);
  });
});

describe("scoreQuizAnswer", () => {
  it("gives zero points and resets combo on a wrong answer", () => {
    const result = scoreQuizAnswer(false, 10, 4);
    expect(result.points).toBe(0);
    expect(result.combo).toBe(0);
  });

  it("rewards faster correct answers with more points", () => {
    const slow = scoreQuizAnswer(true, 1, 0);
    const fast = scoreQuizAnswer(true, 14, 0);
    expect(fast.points).toBeGreaterThan(slow.points);
  });

  it("caps the combo multiplier", () => {
    const result = scoreQuizAnswer(true, 5, 100);
    expect(result.comboMultiplier).toBe(QUIZ_CONFIG.comboMaxMultiplier);
  });
});
