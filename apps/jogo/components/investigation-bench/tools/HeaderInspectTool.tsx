"use client";

import type { InvestigationToolProps } from "../types";
import { ToolField, InsightCallout } from "../shared/ToolResultPanel";
import { Badge } from "@/components/ui/Badge";
import { useLocale } from "@/lib/i18n/LocaleProvider";

function authBadge(value: string) {
  if (value === "pass") return <Badge variant="success">pass</Badge>;
  if (value === "fail") return <Badge variant="danger">fail</Badge>;
  return <Badge variant="neutral">{value}</Badge>;
}

export function HeaderInspectTool({ email, revealed }: InvestigationToolProps) {
  const { t } = useLocale();
  const { headers } = email;
  return (
    <div className="flex flex-col gap-1">
      <ToolField label={t("investigation.originServerLabel")} value={headers.fromServer} />
      <ToolField label={t("investigation.originIpLabel")} value={headers.sourceIp} />
      <div className="flex items-center justify-between border-b border-border py-2 text-sm">
        <span className="text-xs uppercase tracking-wide text-text-muted">SPF</span>
        {authBadge(headers.spf)}
      </div>
      <div className="flex items-center justify-between border-b border-border py-2 text-sm">
        <span className="text-xs uppercase tracking-wide text-text-muted">DKIM</span>
        {authBadge(headers.dkim)}
      </div>
      <div className="flex items-center justify-between py-2 text-sm">
        <span className="text-xs uppercase tracking-wide text-text-muted">DMARC</span>
        {authBadge(headers.dmarc)}
      </div>
      <ToolField label={t("investigation.routeLabel")} value={headers.routeHops.join(" → ")} />
      <div className="mt-3">
        <InsightCallout revealed={revealed} />
      </div>
    </div>
  );
}
