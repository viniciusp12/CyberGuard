import { describe, expect, it } from "vitest";
import { createIntroState, phaseReducer, type PlayingState } from "../phaseMachine";
import { makeDay, makeEmail } from "./fixtures";

function startPlaying(overrides: Parameters<typeof makeDay>[0] = {}) {
  const email = makeEmail({ id: "e1", correctAction: "report", difficulty: 2 });
  const day = makeDay({ timeLimitSeconds: 60, ...overrides }, ["e1"]);
  const intro = createIntroState(day, [email]);
  const playing = phaseReducer(intro, { type: "START" });
  if (playing.status !== "playing") throw new Error("expected playing state");
  return playing;
}

describe("phaseReducer", () => {
  it("transiciona de intro para playing ao START, com o tempo cheio da fase", () => {
    const playing = startPlaying();
    expect(playing.status).toBe("playing");
    expect(playing.timeRemaining).toBe(60);
    expect(playing.currentEmailIndex).toBe(0);
  });

  it("TICK reduz o tempo restante e finaliza a fase quando chega a zero", () => {
    const playing = startPlaying();
    const ticked = phaseReducer(playing, { type: "TICK", deltaSeconds: 10 });
    expect(ticked.status).toBe("playing");
    expect((ticked as PlayingState).timeRemaining).toBe(50);

    const timesUp = phaseReducer(playing, { type: "TICK", deltaSeconds: 999 });
    expect(timesUp.status).toBe("phase_summary");
  });

  it("USE_TOOL consome tempo e registra a ferramenta usada uma única vez", () => {
    const playing = startPlaying();
    const afterTool = phaseReducer(playing, { type: "USE_TOOL", toolId: "domain_inspect" });
    expect(afterTool.status).toBe("playing");
    const p1 = afterTool as PlayingState;
    expect(p1.timeRemaining).toBe(57);
    expect(p1.toolsUsedThisEmail).toEqual(["domain_inspect"]);

    const repeated = phaseReducer(p1, { type: "USE_TOOL", toolId: "domain_inspect" });
    expect((repeated as PlayingState).timeRemaining).toBe(57);
  });

  it("DECIDE com a ação correta pontua, incrementa combo e avança para o próximo email", () => {
    const email1 = makeEmail({ id: "e1", correctAction: "report", difficulty: 2 });
    const email2 = makeEmail({ id: "e2", correctAction: "accept", difficulty: 1 });
    const day = makeDay({ timeLimitSeconds: 60 }, ["e1", "e2"]);
    const playing = phaseReducer(createIntroState(day, [email1, email2]), { type: "START" }) as PlayingState;

    const afterDecide = phaseReducer(playing, { type: "DECIDE", action: "report" });
    expect(afterDecide.status).toBe("playing");
    const p1 = afterDecide as PlayingState;
    expect(p1.currentEmailIndex).toBe(1);
    expect(p1.combo).toBe(1);
    expect(p1.results).toHaveLength(1);
    expect(p1.results[0]?.correct).toBe(true);
    expect(p1.toolsUsedThisEmail).toEqual([]);
  });

  it("DECIDE errado quebra o combo e reduz a segurança", () => {
    const email1 = makeEmail({ id: "e1", correctAction: "report", difficulty: 2 });
    const email2 = makeEmail({ id: "e2", correctAction: "accept", difficulty: 1 });
    const day = makeDay({ timeLimitSeconds: 60 }, ["e1", "e2"]);
    const playing = phaseReducer(createIntroState(day, [email1, email2]), { type: "START" }) as PlayingState;

    const afterWrong = phaseReducer(playing, { type: "DECIDE", action: "accept" });
    const p1 = afterWrong as PlayingState;
    expect(p1.status).toBe("playing");
    expect(p1.combo).toBe(0);
    expect(p1.security).toBeLessThan(100);
  });

  it("DECIDE no último email transiciona para phase_summary com os totais corretos", () => {
    const playing = startPlaying();
    const finished = phaseReducer(playing, { type: "DECIDE", action: "report" });
    expect(finished.status).toBe("phase_summary");
    if (finished.status !== "phase_summary") throw new Error("expected phase_summary");
    expect(finished.totals.correctCount).toBe(1);
    expect(finished.totals.wrongCount).toBe(0);
  });

  it("TRIGGER_EVENT com timer_penalty reduz o tempo e registra o evento ativo", () => {
    const playing = startPlaying();
    const withEvent = phaseReducer(playing, {
      type: "TRIGGER_EVENT",
      event: {
        id: "evt-1",
        type: "boss_call",
        triggerAfterEmailIndex: 0,
        durationSeconds: 10,
        message: "O chefe está ligando!",
        effect: { kind: "timer_penalty", seconds: 15 },
      },
    });
    const p1 = withEvent as PlayingState;
    expect(p1.timeRemaining).toBe(45);
    expect(p1.activeEvents).toHaveLength(1);

    const cleared = phaseReducer(p1, { type: "CLEAR_EVENT", eventId: "evt-1" });
    expect((cleared as PlayingState).activeEvents).toHaveLength(0);
  });

  it("PAUSE/RESUME preservam o estado da fase em andamento", () => {
    const playing = startPlaying();
    const ticked = phaseReducer(playing, { type: "TICK", deltaSeconds: 5 }) as PlayingState;
    const paused = phaseReducer(ticked, { type: "PAUSE" });
    expect(paused.status).toBe("paused");
    const resumed = phaseReducer(paused, { type: "RESUME" });
    expect(resumed).toEqual(ticked);
  });
});
