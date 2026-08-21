"use client";

import { useEffect, useRef, useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { ArrowLeft, Brain, CheckCircle2, Flame, Lightbulb, XCircle } from "lucide-react";
import { getQuizQuestions } from "@repo/shared/content";
import { scoreQuizAnswer, QUIZ_CONFIG, GAME_CONFIG } from "@repo/shared/engine";
import type { QuizQuestion } from "@repo/shared/schemas";
import { Button } from "@/components/ui/Button";
import { Card, CardContent } from "@/components/ui/Card";
import { MeterBadge } from "@/components/hud/MeterBadge";
import { ComboMeter } from "@/components/hud/ComboMeter";
import { TimerDisplay } from "@/components/hud/TimerDisplay";
import { useSavePhaseResult } from "@/lib/hooks/usePlayerProfile";
import { cn } from "@/lib/utils";
import { useLocale } from "@/lib/i18n/LocaleProvider";

const DAY_ID = "quiz-seguranca";
const FEEDBACK_MS = 2200;

function shuffle<T>(arr: T[]): T[] {
  const copy = [...arr];
  for (let i = copy.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [copy[i], copy[j]] = [copy[j]!, copy[i]!];
  }
  return copy;
}

export default function QuizPage() {
  const { locale, t } = useLocale();
  const router = useRouter();
  const savePhaseResult = useSavePhaseResult();
  const quizQuestions = getQuizQuestions(locale);
  const hasSavedRef = useRef(false);
  const rafRef = useRef<number | null>(null);
  const feedbackTimeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  const [phase, setPhase] = useState<"intro" | "playing" | "results">("intro");
  const [questions, setQuestions] = useState<QuizQuestion[]>([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [secondsRemaining, setSecondsRemaining] = useState<number>(QUIZ_CONFIG.secondsPerQuestion);
  const [selectedIndex, setSelectedIndex] = useState<number | null>(null);
  const [score, setScore] = useState(0);
  const [combo, setCombo] = useState(0);
  const [bestCombo, setBestCombo] = useState(0);
  const [correctCount, setCorrectCount] = useState(0);
  const [wrongCount, setWrongCount] = useState(0);
  const [conceptCorrectCounts, setConceptCorrectCounts] = useState<Record<string, number>>({});

  const currentQuestion = questions[currentIndex];
  const isAnswered = selectedIndex !== null;

  function start() {
    setQuestions(shuffle(quizQuestions));
    setCurrentIndex(0);
    setSecondsRemaining(QUIZ_CONFIG.secondsPerQuestion);
    setSelectedIndex(null);
    setScore(0);
    setCombo(0);
    setBestCombo(0);
    setCorrectCount(0);
    setWrongCount(0);
    setConceptCorrectCounts({});
    hasSavedRef.current = false;
    setPhase("playing");
  }

  function answer(index: number | null) {
    if (isAnswered || !currentQuestion) return;
    setSelectedIndex(index ?? -1);
    const correct = index === currentQuestion.correctIndex;
    const result = scoreQuizAnswer(correct, secondsRemaining, combo);
    setScore((s) => s + result.points);
    setCombo(result.combo);
    setBestCombo((b) => Math.max(b, result.combo));
    if (correct) {
      setCorrectCount((c) => c + 1);
      setConceptCorrectCounts((prev) => ({
        ...prev,
        [currentQuestion.concept]: (prev[currentQuestion.concept] ?? 0) + 1,
      }));
    } else {
      setWrongCount((c) => c + 1);
    }

    feedbackTimeoutRef.current = setTimeout(() => {
      setCurrentIndex((i) => {
        const next = i + 1;
        if (next >= questions.length) {
          setPhase("results");
          return i;
        }
        setSecondsRemaining(QUIZ_CONFIG.secondsPerQuestion);
        setSelectedIndex(null);
        return next;
      });
    }, FEEDBACK_MS);
  }

  useEffect(() => {
    if (phase !== "playing" || isAnswered) return;
    let last: number | null = null;
    function tick(ts: number) {
      if (last !== null) {
        const delta = (ts - last) / 1000;
        setSecondsRemaining((t) => Math.max(0, t - delta));
      }
      last = ts;
      rafRef.current = requestAnimationFrame(tick);
    }
    rafRef.current = requestAnimationFrame(tick);
    return () => {
      if (rafRef.current) cancelAnimationFrame(rafRef.current);
    };
  }, [phase, isAnswered, currentIndex]);

  useEffect(() => {
    if (phase === "playing" && !isAnswered && secondsRemaining <= 0) {
      answer(null);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [secondsRemaining]);

  useEffect(() => {
    return () => {
      if (feedbackTimeoutRef.current) clearTimeout(feedbackTimeoutRef.current);
    };
  }, []);

  useEffect(() => {
    if (phase !== "results" || hasSavedRef.current) return;
    hasSavedRef.current = true;

    const xpEarned = Math.max(0, score);
    const moneyEarned = Math.round(xpEarned * GAME_CONFIG.moneyConversionRate);
    const timeUsedSeconds = questions.length * QUIZ_CONFIG.secondsPerQuestion;

    savePhaseResult.mutate({
      dayId: DAY_ID,
      correctCount,
      wrongCount,
      totalScore: score,
      xpEarned,
      moneyEarned,
      timeUsedSeconds,
      bestCombo,
      conceptCorrectCounts,
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [phase]);

  if (phase === "intro") {
    return (
      <div className="flex min-h-dvh items-center justify-center bg-bg px-4">
        <Card className="w-full max-w-md">
          <CardContent className="flex flex-col items-center gap-4 py-8 text-center">
            <Brain className="h-10 w-10 text-primary" />
            <h1 className="font-stencil text-xl font-semibold uppercase tracking-wide">
              {t("minigames.quizTitle")}
            </h1>
            <p className="text-sm text-text-muted">
              {t("minigames.quizIntroDescription", {
                count: quizQuestions.length,
                seconds: QUIZ_CONFIG.secondsPerQuestion,
              })}
            </p>
            <Button size="lg" className="mt-2 w-full" onClick={start}>
              {t("minigames.start")}
            </Button>
            <Button variant="outline" asChild className="w-full">
              <Link href="/minigames">
                <ArrowLeft className="h-4 w-4" /> {t("common.back")}
              </Link>
            </Button>
          </CardContent>
        </Card>
      </div>
    );
  }

  if (phase === "results") {
    return (
      <div className="min-h-dvh bg-bg px-4 py-10">
        <div className="mx-auto max-w-lg">
          <div className="mb-6 text-center">
            <h1 className="font-stencil text-2xl font-semibold uppercase tracking-wide">
              {t("minigames.gameOver")}
            </h1>
            <p className="mt-1 text-text-muted">{t("minigames.quizTitle")}</p>
          </div>
          <div className="grid grid-cols-3 gap-3">
            <Card>
              <CardContent className="flex flex-col items-center gap-1 py-4">
                <CheckCircle2 className="h-6 w-6 text-success" />
                <span className="font-pixel text-lg">{correctCount}</span>
                <span className="text-xs text-text-muted">{t("minigames.correct")}</span>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="flex flex-col items-center gap-1 py-4">
                <XCircle className="h-6 w-6 text-danger" />
                <span className="font-pixel text-lg">{wrongCount}</span>
                <span className="text-xs text-text-muted">{t("minigames.wrong")}</span>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="flex flex-col items-center gap-1 py-4">
                <Flame className="h-6 w-6 text-warning" />
                <span className="font-pixel text-lg">{bestCombo}</span>
                <span className="text-xs text-text-muted">{t("minigames.bestCombo")}</span>
              </CardContent>
            </Card>
          </div>
          <Card className="mt-4">
            <CardContent className="flex items-center justify-center py-5">
              <span className="text-sm text-text-muted">
                {t("minigames.score")} <span className="font-pixel text-xs text-text">{score}</span>
              </span>
            </CardContent>
          </Card>
          <div className="mt-6 flex gap-3">
            <Button variant="outline" className="flex-1" onClick={() => router.push("/minigames")}>
              {t("common.back")}
            </Button>
            <Button className="flex-1" onClick={start}>
              {t("minigames.playAgain")}
            </Button>
          </div>
        </div>
      </div>
    );
  }

  if (!currentQuestion) return null;

  return (
    <div className="min-h-dvh bg-bg pt-14">
      <div className="flex flex-wrap items-center gap-2 border-b border-border bg-surface px-4 py-3">
        <TimerDisplay secondsRemaining={secondsRemaining} />
        <MeterBadge
          icon={Brain}
          label={t("minigames.question")}
          value={`${currentIndex + 1}/${questions.length}`}
        />
        <ComboMeter combo={combo} />
        <div className="ml-auto">
          <MeterBadge icon={CheckCircle2} label={t("minigames.points")} value={score} colorClassName="text-primary" />
        </div>
      </div>

      <div className="mx-auto flex max-w-2xl flex-col gap-4 px-4 py-8">
        <Card>
          <CardContent className="py-6">
            <p className="text-lg font-medium text-text">{currentQuestion.question}</p>
          </CardContent>
        </Card>

        <div className="grid gap-3">
          {currentQuestion.options.map((option, i) => {
            const isCorrectOption = i === currentQuestion.correctIndex;
            const isSelected = selectedIndex === i;
            return (
              <button
                key={i}
                onClick={() => answer(i)}
                disabled={isAnswered}
                className={cn(
                  "flex items-center justify-between rounded-lg border p-4 text-left text-sm transition-colors",
                  !isAnswered && "border-border bg-surface hover:border-primary hover:bg-surface-2",
                  isAnswered && isCorrectOption && "border-success/50 bg-success/10",
                  isAnswered && isSelected && !isCorrectOption && "border-danger/50 bg-danger/10",
                  isAnswered && !isSelected && !isCorrectOption && "border-border bg-surface opacity-60",
                )}
              >
                <span>{option}</span>
                {isAnswered && isCorrectOption && <CheckCircle2 className="h-4 w-4 shrink-0 text-success" />}
                {isAnswered && isSelected && !isCorrectOption && (
                  <XCircle className="h-4 w-4 shrink-0 text-danger" />
                )}
              </button>
            );
          })}
        </div>

        {isAnswered && (
          <div className="flex gap-2 rounded-lg border border-warning/30 bg-warning/10 p-3 text-sm text-text">
            <Lightbulb className="h-4 w-4 shrink-0 text-warning" />
            <p>{currentQuestion.explanation}</p>
          </div>
        )}
      </div>
    </div>
  );
}
