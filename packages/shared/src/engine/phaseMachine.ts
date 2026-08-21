import type { Day, GameEvent } from "../schemas/phase.schema";
import type { Email, InvestigationToolId, PlayerAction } from "../schemas/email.schema";
import { scoreEmailAttempt, type EmailAttemptResult } from "./scoring";
import { nextCombo } from "./combo";
import { toolTimeCost } from "./gameConfig";

export interface PhaseTotals {
  correctCount: number;
  wrongCount: number;
  totalScore: number;
  xpEarned: number;
  moneyEarned: number;
  timeUsedSeconds: number;
  bestCombo: number;
}

export interface PlayingState {
  status: "playing";
  day: Day;
  emails: Email[];
  currentEmailIndex: number;
  timeRemaining: number;
  toolsUsedThisEmail: InvestigationToolId[];
  combo: number;
  bestCombo: number;
  score: number;
  money: number;
  xp: number;
  security: number;
  results: EmailAttemptResult[];
  activeEvents: GameEvent[];
}

export type PhaseState =
  | { status: "intro"; day: Day; emails: Email[] }
  | PlayingState
  | { status: "paused"; previous: PlayingState }
  | { status: "phase_summary"; day: Day; results: EmailAttemptResult[]; totals: PhaseTotals }
  | { status: "phase_complete"; day: Day; totals: PhaseTotals };

export type PhaseAction =
  | { type: "START" }
  | { type: "TICK"; deltaSeconds: number }
  | { type: "USE_TOOL"; toolId: InvestigationToolId }
  | { type: "DECIDE"; action: PlayerAction }
  | { type: "TRIGGER_EVENT"; event: GameEvent }
  | { type: "CLEAR_EVENT"; eventId: string }
  | { type: "PAUSE" }
  | { type: "RESUME" }
  | { type: "FINISH_PHASE" };

const INITIAL_SECURITY = 100;

export function createIntroState(day: Day, emails: Email[]): PhaseState {
  return { status: "intro", day, emails };
}

function buildTotals(results: EmailAttemptResult[], timeUsedSeconds: number, bestCombo: number): PhaseTotals {
  return {
    correctCount: results.filter((r) => r.correct).length,
    wrongCount: results.filter((r) => !r.correct).length,
    totalScore: results.reduce((sum, r) => sum + r.finalScore, 0),
    xpEarned: results.reduce((sum, r) => sum + r.xpEarned, 0),
    moneyEarned: results.reduce((sum, r) => sum + r.moneyEarned, 0),
    timeUsedSeconds,
    bestCombo,
  };
}

export function phaseReducer(state: PhaseState, action: PhaseAction): PhaseState {
  switch (action.type) {
    case "START": {
      if (state.status !== "intro") return state;
      return {
        status: "playing",
        day: state.day,
        emails: state.emails,
        currentEmailIndex: 0,
        timeRemaining: state.day.timeLimitSeconds,
        toolsUsedThisEmail: [],
        combo: 0,
        bestCombo: 0,
        score: 0,
        money: 0,
        xp: 0,
        security: INITIAL_SECURITY,
        results: [],
        activeEvents: [],
      };
    }

    case "TICK": {
      if (state.status !== "playing") return state;
      const timeRemaining = Math.max(0, state.timeRemaining - action.deltaSeconds);
      if (timeRemaining <= 0) {
        const totals = buildTotals(state.results, state.day.timeLimitSeconds, state.bestCombo);
        return { status: "phase_summary", day: state.day, results: state.results, totals };
      }
      return { ...state, timeRemaining };
    }

    case "USE_TOOL": {
      if (state.status !== "playing") return state;
      if (state.toolsUsedThisEmail.includes(action.toolId)) return state;
      const cost = toolTimeCost(action.toolId);
      return {
        ...state,
        timeRemaining: Math.max(0, state.timeRemaining - cost),
        toolsUsedThisEmail: [...state.toolsUsedThisEmail, action.toolId],
      };
    }

    case "DECIDE": {
      if (state.status !== "playing") return state;
      const currentEmail = state.emails[state.currentEmailIndex];
      if (!currentEmail) return state;

      const attempt = scoreEmailAttempt({
        email: currentEmail,
        playerAction: action.action,
        toolsUsed: state.toolsUsedThisEmail,
        currentCombo: state.combo,
      });

      const combo = nextCombo(state.combo, attempt.correct);
      const bestCombo = Math.max(state.bestCombo, combo);
      const security = Math.max(0, Math.min(100, state.security - attempt.securityDamage));
      const results = [...state.results, attempt];
      const nextIndex = state.currentEmailIndex + 1;

      const partial = {
        ...state,
        combo,
        bestCombo,
        security,
        score: state.score + attempt.finalScore,
        money: state.money + attempt.moneyEarned,
        xp: state.xp + attempt.xpEarned,
        results,
      };

      if (nextIndex >= state.emails.length) {
        const timeUsed = state.day.timeLimitSeconds - state.timeRemaining;
        const totals = buildTotals(results, timeUsed, bestCombo);
        return { status: "phase_summary", day: state.day, results, totals };
      }

      return {
        ...partial,
        currentEmailIndex: nextIndex,
        toolsUsedThisEmail: [],
      };
    }

    case "TRIGGER_EVENT": {
      if (state.status !== "playing") return state;
      const timeAdjust =
        action.event.effect.kind === "timer_penalty" ? action.event.effect.seconds : 0;
      return {
        ...state,
        timeRemaining: Math.max(0, state.timeRemaining - timeAdjust),
        activeEvents: [...state.activeEvents, action.event],
      };
    }

    case "CLEAR_EVENT": {
      if (state.status !== "playing") return state;
      return {
        ...state,
        activeEvents: state.activeEvents.filter((e) => e.id !== action.eventId),
      };
    }

    case "PAUSE": {
      if (state.status !== "playing") return state;
      return { status: "paused", previous: state };
    }

    case "RESUME": {
      if (state.status !== "paused") return state;
      return state.previous;
    }

    case "FINISH_PHASE": {
      if (state.status !== "phase_summary") return state;
      return { status: "phase_complete", day: state.day, totals: state.totals };
    }

    default:
      return state;
  }
}
