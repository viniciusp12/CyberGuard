"use client";

import { Trophy } from "lucide-react";
import { PageHeader } from "@/components/layout/PageHeader";
import { Card, CardContent } from "@/components/ui/Card";
import { Badge } from "@/components/ui/Badge";
import { useRanking } from "@/lib/hooks/useRanking";
import { cn } from "@/lib/utils";
import { useLocale } from "@/lib/i18n/LocaleProvider";

export default function RankingPage() {
  const { t } = useLocale();
  const { data, isLoading } = useRanking();

  return (
    <div>
      <PageHeader title={t("mainPages.rankingTitle")} description={t("mainPages.rankingDescription")} />
      <Card>
        <CardContent className="py-2">
          {isLoading && <p className="py-6 text-center text-sm text-text-muted">{t("common.loading")}</p>}
          {!isLoading && data?.entries.length === 0 && (
            <p className="py-6 text-center text-sm text-text-muted">{t("mainPages.noOnePlayedYet")}</p>
          )}
          <ul className="divide-y divide-border">
            {data?.entries.map((entry) => (
              <li
                key={entry.id}
                className={cn("flex items-center justify-between py-3", entry.isCurrentUser && "bg-primary/5")}
              >
                <div className="flex items-center gap-3">
                  <span className="w-6 text-center font-pixel text-[11px] text-text-muted">{entry.rank}</span>
                  {entry.rank === 1 ? <Trophy className="h-5 w-5 text-warning" /> : null}
                  <div>
                    <p className="text-sm font-medium">{entry.displayName}</p>
                    <p className="text-xs text-text-muted">
                      {entry.department ?? t("mainPages.noDepartment")}
                    </p>
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  {entry.isCurrentUser && <Badge variant="primary">{t("mainPages.you")}</Badge>}
                  <span className="font-pixel text-[11px]">{entry.xp} XP</span>
                </div>
              </li>
            ))}
          </ul>
        </CardContent>
      </Card>
    </div>
  );
}
