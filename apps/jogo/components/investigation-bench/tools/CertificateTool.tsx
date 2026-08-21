"use client";

import type { InvestigationToolProps } from "../types";
import { ToolField, InsightCallout } from "../shared/ToolResultPanel";
import { Badge } from "@/components/ui/Badge";
import { useLocale } from "@/lib/i18n/LocaleProvider";

export function CertificateTool({ email, revealed }: InvestigationToolProps) {
  const { t } = useLocale();

  if (!email.certificate) {
    return <p className="text-sm text-text-muted">{t("investigation.noHttpsLink")}</p>;
  }

  const cert = email.certificate;
  return (
    <div className="flex flex-col gap-1">
      <ToolField label={t("investigation.companyLabel")} value={cert.companyName} />
      <ToolField label={t("investigation.issuerLabel")} value={cert.issuer} />
      <ToolField label={t("investigation.domainLabel")} value={cert.domain} />
      <ToolField
        label={t("investigation.validityLabel")}
        value={`${new Date(cert.validFrom).toLocaleDateString("pt-BR")} — ${new Date(cert.validTo).toLocaleDateString("pt-BR")}`}
      />
      <div className="flex items-center justify-between py-2 text-sm">
        <span className="text-xs uppercase tracking-wide text-text-muted">
          {t("investigation.certificateValidLabel")}
        </span>
        <Badge variant={cert.isTechnicallyValid ? "success" : "danger"}>
          {cert.isTechnicallyValid ? t("investigation.certValidYes") : t("investigation.certValidNo")}
        </Badge>
      </div>
      <div className="mt-3">
        <InsightCallout revealed={revealed} />
      </div>
    </div>
  );
}
