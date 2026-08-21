"use client";

import { useEffect, useRef, useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { AlertTriangle, ArrowLeft, CheckCircle2, Flame, XCircle } from "lucide-react";
import { getArcadeItems } from "@repo/shared/content";
import { scoreArcadeHit, ARCADE_CONFIG, GAME_CONFIG } from "@repo/shared/engine";
import type { ArcadeItem } from "@repo/shared/schemas";
import { Button } from "@/components/ui/Button";
import { Card, CardContent } from "@/components/ui/Card";
import { MeterBadge } from "@/components/hud/MeterBadge";
import { ComboMeter } from "@/components/hud/ComboMeter";
import { TimerDisplay } from "@/components/hud/TimerDisplay";
import { useSavePhaseResult } from "@/lib/hooks/usePlayerProfile";
import { cn } from "@/lib/utils";
import { useLocale } from "@/lib/i18n/LocaleProvider";

const DAY_ID = "arcade-caca-phishing";

type ItemStatus = "pending" | "correct" | "wrong";
type PlayItem = ArcadeItem & { status: ItemStatus };

function shuffle<T>(arr: T[]): T[] {
  const copy = [...arr];
  for (let i = copy.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [copy[i], copy[j]] = [copy[j]!, copy[i]!];
  }
  return copy;
}

export default function CacaPhishingPage() {
  const { locale, t } = useLocale();
  const router = useRouter();
  const savePhaseResult = useSavePhaseResult();
  const arcadeItems = getArcadeItems(locale);
  const hasSavedRef = useRef(false);
  const rafRef = useRef<number | null>(null);

  const [phase, setPhase] = useState<"intro" | "playing" | "results">("intro");
  const [items, setItems] = useState<PlayItem[]>([]);
  const [timeRemaining, setTimeRemaining] = useState<number>(ARCADE_CONFIG.timeLimitSeconds);
  const [score, setScore] = useState(0);
  const [combo, setCombo] = useState(0);
  const [bestCombo, setBestCombo] = useState(0);
  const [correctCount, setCorrectCount] = useState(0);
  const [wrongCount, setWrongCount] = useState(0);
  const [conceptCorrectCounts, setConceptCorrectCounts] = useState<Record<string, number>>({});

  function start() {
    setItems(shuffle(arcadeItems).map((i) => ({ ...i, status: "pending" as const })));
    setTimeRemaining(ARCADE_CONFIG.timeLimitSeconds);
    setScore(0);
    setCombo(0);
    setBestCombo(0);
    setCorrectCount(0);
    setWrongCount(0);
    setConceptCorrectCounts({});
    hasSavedRef.current = false;
    setPhase("playing");
  }

  useEffect(() => {
    if (phase !== "playing") return;
    let last: number | null = null;
    function tick(ts: number) {
      if (last !== null) {
        const delta = (ts - last) / 1000;
        setTimeRemaining((t) => Math.max(0, t - delta));
      }
      last = ts;
      rafRef.current = requestAnimationFrame(tick);
    }
    rafRef.current = requestAnimationFrame(tick);
    return () => {
      if (rafRef.current) cancelAnimationFrame(rafRef.current);
    };
  }, [phase]);

  useEffect(() => {
    if (phase !== "playing") return;
    const allResolved = items.length > 0 && items.every((i) => i.status !== "pending");
    if (timeRemaining <= 0 || allResolved) {
      setPhase("results");
    }
  }, [timeRemaining, items, phase]);

  useEffect(() => {
    if (phase !== "results" || hasSavedRef.current) return;
    hasSavedRef.current = true;

    const missedCount = items.filter((i) => i.status === "pending" && i.isPhishing).length;
    const timeUsedSeconds = Math.round(ARCADE_CONFIG.timeLimitSeconds - timeRemaining);
    const xpEarned = Math.max(0, score);
    const moneyEarned = Math.round(xpEarned * GAME_CONFIG.moneyConversionRate);

    savePhaseResult.mutate({
      dayId: DAY_ID,
      correctCount,
      wrongCount: wrongCount + missedCount,
      totalScore: score,
      xpEarned,
      moneyEarned,
      timeUsedSeconds,
      bestCombo,
      conceptCorrectCounts,
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [phase]);

  function handleHit(item: PlayItem) {
    if (phase !== "playing" || item.status !== "pending") return;
    const result = scoreArcadeHit(combo, item.isPhishing);
    setScore((s) => s + result.points);
    setCombo(result.combo);
    setBestCombo((b) => Math.max(b, result.combo));
    setItems((prev) =>
      prev.map((i) => (i.id === item.id ? { ...i, status: item.isPhishing ? "correct" : "wrong" } : i)),
    );
    if (item.isPhishing) {
      setCorrectCount((c) => c + 1);
      setConceptCorrectCounts((prev) => ({ ...prev, [item.concept]: (prev[item.concept] ?? 0) + 1 }));
    } else {
      setWrongCount((c) => c + 1);
    }
  }

  if (phase === "intro") {
    return (
      <div className="flex min-h-dvh items-center justify-center bg-bg px-4">
        <Card className="w-full max-w-md">
          <CardContent className="flex flex-col items-center gap-4 py-8 text-center">
            <AlertTriangle className="h-10 w-10 text-warning" />
            <h1 className="font-stencil text-xl font-semibold uppercase tracking-wide">
              {t("minigames.cacaPhishingTitle")}
            </h1>
            <p className="text-sm text-text-muted">
              {t("minigames.cacaIntroPart1", { count: arcadeItems.length })}{" "}
              <strong>{t("minigames.cacaIntroPhishingWord")}</strong>{" "}
              {t("minigames.cacaIntroPart2")}
            </p>
            <p className="text-xs text-text-muted">
              {t("minigames.totalSeconds", { seconds: ARCADE_CONFIG.timeLimitSeconds })}
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
    const missedCount = items.filter((i) => i.status === "pending" && i.isPhishing).length;
    return (
      <div className="min-h-dvh bg-bg px-4 py-10">
        <div className="mx-auto max-w-lg">
          <div className="mb-6 text-center">
            <h1 className="font-stencil text-2xl font-semibold uppercase tracking-wide">
              {t("minigames.gameOver")}
            </h1>
            <p className="mt-1 text-text-muted">{t("minigames.cacaPhishingTitle")}</p>
          </div>
          <div className="grid grid-cols-2 gap-3 sm:grid-cols-4">
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
                <AlertTriangle className="h-6 w-6 text-warning" />
                <span className="font-pixel text-lg">{missedCount}</span>
                <span className="text-xs text-text-muted">{t("minigames.missed")}</span>
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

  const remaining = items.filter((i) => i.status === "pending").length;

  return (
    <div className="min-h-dvh bg-bg pt-14">
      <div className="flex flex-wrap items-center gap-2 border-b border-border bg-surface px-4 py-3">
        <TimerDisplay secondsRemaining={timeRemaining} />
        <MeterBadge
          icon={AlertTriangle}
          label={t("minigames.remaining")}
          value={remaining}
          colorClassName="text-warning"
        />
        <ComboMeter combo={combo} />
        <div className="ml-auto">
          <MeterBadge icon={CheckCircle2} label={t("minigames.points")} value={score} colorClassName="text-primary" />
        </div>
      </div>

      <div className="mx-auto grid max-w-4xl grid-cols-1 gap-2 p-4 sm:grid-cols-2">
        {items.map((item) => (
          <button
            key={item.id}
            onClick={() => handleHit(item)}
            disabled={item.status !== "pending"}
            className={cn(
              "flex flex-col gap-1 rounded-lg border p-3 text-left text-sm transition-colors",
              item.status === "pending" && "border-border bg-surface hover:border-primary hover:bg-surface-2",
              item.status === "correct" && "border-success/50 bg-success/10",
              item.status === "wrong" && "border-danger/50 bg-danger/10",
            )}
          >
            <div className="flex items-center justify-between gap-2">
              <span className="truncate font-medium text-text">{item.sender}</span>
              {item.status === "correct" && <CheckCircle2 className="h-4 w-4 shrink-0 text-success" />}
              {item.status === "wrong" && <XCircle className="h-4 w-4 shrink-0 text-danger" />}
            </div>
            <span className="text-text-muted">{item.subject}</span>
          </button>
        ))}
      </div>
    </div>
  );
}
