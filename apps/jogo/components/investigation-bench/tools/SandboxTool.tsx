"use client";

import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { FlaskConical, AlertTriangle, CheckCircle2 } from "lucide-react";
import type { InvestigationToolProps } from "../types";
import { InsightCallout } from "../shared/ToolResultPanel";
import { useLocale } from "@/lib/i18n/LocaleProvider";

const OUTCOME_LABEL_KEY: Record<string, string> = {
  no_activity: "investigation.outcomeNoActivity",
  ransomware_attempt: "investigation.outcomeRansomware",
  suspicious_connection: "investigation.outcomeSuspiciousConnection",
  malware_download: "investigation.outcomeMalwareDownload",
  registry_change: "investigation.outcomeRegistryChange",
  process_creation: "investigation.outcomeProcessCreation",
};

export function SandboxTool({ email, revealed }: InvestigationToolProps) {
  const { t } = useLocale();
  const [phase, setPhase] = useState<"running" | "done">("running");

  useEffect(() => {
    setPhase("running");
    const timeout = setTimeout(() => setPhase("done"), 1100);
    return () => clearTimeout(timeout);
  }, [email.id]);

  if (email.attachments.length === 0) {
    return <p className="text-sm text-text-muted">{t("investigation.noAttachmentToTest")}</p>;
  }

  const attachment = email.attachments[0]!;
  const outcome = attachment.sandboxResult?.outcome ?? "no_activity";
  const isMalicious = outcome !== "no_activity";

  return (
    <div className="flex flex-col items-center gap-4 py-4">
      <AnimatePresence mode="wait">
        {phase === "running" ? (
          <motion.div
            key="running"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="flex flex-col items-center gap-3 text-text-muted"
          >
            <motion.div
              animate={{ rotate: 360 }}
              transition={{ repeat: Infinity, duration: 1.2, ease: "linear" }}
            >
              <FlaskConical className="h-10 w-10 text-primary" />
            </motion.div>
            <p className="text-sm">
              {t("investigation.runningInSandbox", { fileName: attachment.fileName })}
            </p>
          </motion.div>
        ) : (
          <motion.div
            key="done"
            initial={{ opacity: 0, y: 6 }}
            animate={{ opacity: 1, y: 0 }}
            className="flex w-full flex-col items-center gap-3"
          >
            {isMalicious ? (
              <AlertTriangle className="h-10 w-10 text-danger" />
            ) : (
              <CheckCircle2 className="h-10 w-10 text-success" />
            )}
            <p className={isMalicious ? "font-medium text-danger" : "font-medium text-success"}>
              {t(OUTCOME_LABEL_KEY[outcome] ?? OUTCOME_LABEL_KEY.no_activity!)}
            </p>
            <div className="w-full">
              <InsightCallout revealed={revealed} />
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
