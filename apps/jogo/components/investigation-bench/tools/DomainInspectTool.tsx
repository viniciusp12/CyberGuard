"use client";

import type { InvestigationToolProps } from "../types";
import { ToolField, InsightCallout } from "../shared/ToolResultPanel";
import { useLocale } from "@/lib/i18n/LocaleProvider";

export function DomainInspectTool({ email, revealed }: InvestigationToolProps) {
  const { t } = useLocale();
  return (
    <div className="flex flex-col gap-1">
      <ToolField label={t("investigation.senderDomainLabel")} value={email.sender.domain} />
      <div className="mt-3">
        {revealed ? (
          <InsightCallout revealed={revealed} />
        ) : (
          <p className="text-sm text-text-muted">{t("investigation.noReputationData")}</p>
        )}
      </div>
    </div>
  );
}
