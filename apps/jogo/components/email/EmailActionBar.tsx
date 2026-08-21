"use client";

import { CheckCircle, Trash2, ShieldAlert } from "lucide-react";
import { Button } from "@/components/ui/Button";
import type { PlayerAction } from "@repo/shared/schemas";
import { useLocale } from "@/lib/i18n/LocaleProvider";

export function EmailActionBar({
  onDecide,
  disabled = false,
}: {
  onDecide: (action: PlayerAction) => void;
  disabled?: boolean;
}) {
  const { t } = useLocale();
  return (
    <div className="flex flex-wrap gap-3 border-t border-border p-4">
      <Button
        variant="success"
        size="lg"
        className="flex-1"
        disabled={disabled}
        onClick={() => onDecide("accept")}
      >
        <CheckCircle className="h-5 w-5" /> {t("phasesGame.accept")}
      </Button>
      <Button
        variant="outline"
        size="lg"
        className="flex-1"
        disabled={disabled}
        onClick={() => onDecide("delete")}
      >
        <Trash2 className="h-5 w-5" /> {t("common.delete")}
      </Button>
      <Button
        variant="danger"
        size="lg"
        className="flex-1"
        disabled={disabled}
        onClick={() => onDecide("report")}
      >
        <ShieldAlert className="h-5 w-5" /> {t("phasesGame.report")}
      </Button>
    </div>
  );
}
