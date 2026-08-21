"use client";

import { Sparkles } from "lucide-react";
import type { InvestigationToolProps } from "../types";
import { ProgressBar } from "@/components/ui/ProgressBar";
import { useLocale } from "@/lib/i18n/LocaleProvider";

export function AiAssistantTool({ email }: InvestigationToolProps) {
  const { t } = useLocale();

  if (!email.aiAssistantHint) {
    return <p className="text-sm text-text-muted">{t("investigation.aiUnavailable")}</p>;
  }

  const { phishingProbability, reasoning } = email.aiAssistantHint;
  const isHigh = phishingProbability >= 60;

  return (
    <div className="flex flex-col gap-4">
      <div className="flex items-center gap-3 rounded-lg border border-border bg-surface-2 p-4">
        <Sparkles className="h-6 w-6 shrink-0 text-primary" />
        <div className="flex-1">
          <div className="mb-1 flex items-center justify-between text-sm">
            <span className="text-text-muted">{t("investigation.phishingProbabilityLabel")}</span>
            <span className={isHigh ? "font-semibold text-danger" : "font-semibold text-success"}>
              {phishingProbability}%
            </span>
          </div>
          <ProgressBar
            value={phishingProbability}
            indicatorClassName={isHigh ? "bg-danger" : "bg-success"}
          />
        </div>
      </div>
      <p className="text-sm text-text-muted">{reasoning}</p>
      <p className="text-xs text-text-muted">{t("investigation.aiDisclaimer")}</p>
    </div>
  );
}
