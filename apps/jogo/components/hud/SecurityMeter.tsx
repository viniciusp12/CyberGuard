"use client";

import { ShieldAlert } from "lucide-react";
import { ProgressBar } from "@/components/ui/ProgressBar";
import { cn } from "@/lib/utils";
import { useLocale } from "@/lib/i18n/LocaleProvider";

export function SecurityMeter({ value, label }: { value: number; label?: string }) {
  const { t } = useLocale();
  const displayLabel = label ?? t("hud.security");
  const isCritical = value < 40;
  return (
    <div className="flex min-w-[140px] flex-col gap-1">
      <div className="flex items-center justify-between text-xs">
        <span className="flex items-center gap-1 text-text-muted">
          <ShieldAlert className={cn("h-3.5 w-3.5", isCritical && "text-danger")} />
          {displayLabel}
        </span>
        <span className={cn("font-pixel text-[10px]", isCritical ? "text-danger" : "text-text")}>{value}%</span>
      </div>
      <ProgressBar
        value={value}
        indicatorClassName={isCritical ? "bg-danger" : "bg-success"}
      />
    </div>
  );
}
