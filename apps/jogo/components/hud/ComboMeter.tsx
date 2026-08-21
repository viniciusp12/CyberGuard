"use client";

import { Flame } from "lucide-react";
import { cn } from "@/lib/utils";
import { useLocale } from "@/lib/i18n/LocaleProvider";

export function ComboMeter({ combo }: { combo: number }) {
  const { t } = useLocale();
  return (
    <div
      className={cn(
        "flex items-center gap-1.5 rounded-lg border border-border bg-surface-2 px-3 py-1.5 text-sm",
        combo >= 5 && "border-warning/60 text-warning",
      )}
    >
      <Flame className={cn("h-4 w-4", combo === 0 && "text-text-muted")} />
      <span className="text-text-muted">{t("hud.combo")}</span>
      <span className="font-pixel text-[11px]">x{combo}</span>
    </div>
  );
}
