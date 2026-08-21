"use client";

import { useState } from "react";
import { Search } from "lucide-react";
import type { PlayingState, PhaseAction } from "@repo/shared/engine";
import type { PlayerAction } from "@repo/shared/schemas";
import { GameHud } from "@/components/hud/GameHud";
import { EmailViewer } from "@/components/email/EmailViewer";
import { EmailActionBar } from "@/components/email/EmailActionBar";
import { InvestigationBench } from "@/components/investigation-bench/InvestigationBench";
import { EventBannerStack } from "@/components/events/EventBanner";
import { EventOverlay, hasScreenGlitch } from "@/components/events/EventOverlay";
import { DecisionStamp } from "@/components/game/DecisionStamp";
import { Button } from "@/components/ui/Button";
import { cn } from "@/lib/utils";
import { useGameTimer } from "@/lib/hooks/useGameTimer";
import { useInvestigation } from "@/lib/hooks/useInvestigation";
import { useDayEvents } from "@/lib/hooks/useDayEvents";
import { useLocale } from "@/lib/i18n/LocaleProvider";

const STAMP_DELAY_MS = 650;

export function PlayingScreen({
  state,
  dispatch,
  playerLevel,
  reputation,
}: {
  state: PlayingState;
  dispatch: (action: PhaseAction) => void;
  playerLevel: number;
  reputation: number;
}) {
  const { t } = useLocale();
  const [benchOpen, setBenchOpen] = useState(false);
  const [pendingAction, setPendingAction] = useState<PlayerAction | null>(null);
  useGameTimer(true, dispatch);
  useDayEvents(state, dispatch);

  const currentEmail = state.emails[state.currentEmailIndex]!;
  const { decide, toolsUsed } = useInvestigation(currentEmail);
  const senderAddressRevealed = toolsUsed.includes("sender_address");

  function handleDecide(action: PlayerAction) {
    if (pendingAction) return;
    setPendingAction(action);
    window.setTimeout(() => {
      decide(action);
      setPendingAction(null);
    }, STAMP_DELAY_MS);
  }

  const glitching = hasScreenGlitch(state.activeEvents);

  return (
    <div className={cn("flex min-h-dvh flex-col bg-bg pt-14", glitching && "animate-screen-glitch")}>
      <EventOverlay events={state.activeEvents} />
      <GameHud
        dayNumber={state.day.dayNumber}
        timeRemaining={state.timeRemaining}
        money={state.money}
        xp={state.xp}
        level={playerLevel}
        combo={state.combo}
        security={state.security}
        reputation={reputation}
        emailsRemaining={state.emails.length - state.currentEmailIndex}
        totalEmails={state.emails.length}
      />
      <EventBannerStack events={state.activeEvents} />

      <div className="mx-auto flex w-full max-w-3xl flex-1 flex-col gap-4 px-4 py-6">
        <div className="relative">
          <EmailViewer
            key={currentEmail.id}
            email={currentEmail}
            revealedSenderAddress={senderAddressRevealed ? currentEmail.sender.emailAddressRaw : undefined}
          />
          <DecisionStamp action={pendingAction} />
        </div>

        <Button variant="outline" size="lg" onClick={() => setBenchOpen(true)} disabled={!!pendingAction}>
          <Search className="h-5 w-5" /> {t("phasesGame.investigateButton")}
        </Button>

        <EmailActionBar onDecide={handleDecide} disabled={!!pendingAction} />
      </div>

      <InvestigationBench email={currentEmail} open={benchOpen} onOpenChange={setBenchOpen} />
    </div>
  );
}
