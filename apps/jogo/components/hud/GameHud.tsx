"use client";

import { Coins, Star, TrendingUp, Mail, CalendarDays } from "lucide-react";
import { TimerDisplay } from "./TimerDisplay";
import { ComboMeter } from "./ComboMeter";
import { SecurityMeter } from "./SecurityMeter";
import { MeterBadge } from "./MeterBadge";
import { useLocale } from "@/lib/i18n/LocaleProvider";

export interface GameHudProps {
  dayNumber: number;
  timeRemaining: number;
  money: number;
  xp: number;
  level: number;
  combo: number;
  security: number;
  reputation: number;
  emailsRemaining: number;
  totalEmails: number;
}

export function GameHud({
  dayNumber,
  timeRemaining,
  money,
  xp,
  level,
  combo,
  security,
  reputation,
  emailsRemaining,
  totalEmails,
}: GameHudProps) {
  const { t } = useLocale();
  return (
    <div className="flex flex-wrap items-center gap-2 border-b border-border bg-surface px-4 py-3">
      <MeterBadge icon={CalendarDays} label={t("hud.day")} value={dayNumber} />
      <TimerDisplay secondsRemaining={timeRemaining} />
      <MeterBadge icon={Mail} label={t("hud.emails")} value={`${emailsRemaining}/${totalEmails}`} />
      <ComboMeter combo={combo} />
      <MeterBadge icon={Coins} label={t("hud.money")} value={money} colorClassName="text-warning" />
      <MeterBadge icon={Star} label="XP" value={xp} colorClassName="text-primary" />
      <MeterBadge icon={TrendingUp} label={t("common.level")} value={level} />
      <div className="ml-auto flex items-center gap-4">
        <SecurityMeter value={security} label={t("hud.security")} />
        <SecurityMeter value={reputation} label={t("hud.reputation")} />
      </div>
    </div>
  );
}
