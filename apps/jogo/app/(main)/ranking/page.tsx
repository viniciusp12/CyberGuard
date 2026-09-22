"use client";

import { Trophy } from "lucide-react";
import { PageHeader } from "@/components/layout/PageHeader";
import { Card, CardContent } from "@/components/ui/Card";
import { Badge } from "@/components/ui/Badge";
import { useRanking } from "@/lib/hooks/useRanking";
import { cn } from "@/lib/utils";
import { useLocale } from "@/lib/i18n/LocaleProvider";

/**
 * Placar por SETOR — nunca por pessoa (exigência de LGPD).
 *
 * Não aparece nome de ninguém, nem a posição de ninguém. Só o setor e a
 * pontuação somada. A única linha destacada é a do setor do próprio jogador,
 * que ele já sabe qual é.
 *
 * A exceção é o setor de turma usado em aula, onde a disputa aluno a aluno é o
 * objetivo didático e os participantes são contas pseudônimas criadas para a
 * aula. Nesse caso a API manda `individual` preenchido e a tela mostra a lista
 * nominal no lugar da somada. Quem não é da turma nunca recebe esses nomes —
 * a decisão é da API, não daqui. Ver `apps/api/src/ranking/ranking.service.ts`.
 */
export default function RankingPage() {
  const { t } = useLocale();
  const { data, isLoading } = useRanking();

  const individual = data?.individual;
  const mostrarIndividual = !!individual && individual.length > 0;

  return (
    <div>
      <PageHeader title={t("mainPages.rankingTitle")} description={t("mainPages.rankingDescription")} />
      <Card>
        <CardContent className="py-2">
          {isLoading && <p className="py-6 text-center text-sm text-text-muted">{t("common.loading")}</p>}

          {!isLoading && !mostrarIndividual && data?.entries.length === 0 && (
            <p className="py-6 text-center text-sm text-text-muted">{t("mainPages.noOnePlayedYet")}</p>
          )}

          {mostrarIndividual ? (
            <ul className="divide-y divide-border">
              {individual.map((entry) => (
                <li
                  key={`${entry.rank}-${entry.name}`}
                  className={cn("flex items-center justify-between py-3", entry.isYou && "bg-primary/5")}
                >
                  <div className="flex items-center gap-3">
                    <span className="w-6 text-center font-pixel text-[11px] text-text-muted">{entry.rank}</span>
                    {entry.rank === 1 ? <Trophy className="h-5 w-5 text-warning" /> : null}
                    <p className="text-sm font-medium">{entry.name}</p>
                  </div>
                  <div className="flex items-center gap-2">
                    {entry.isYou && <Badge variant="primary">{t("mainPages.you")}</Badge>}
                    <span className="font-pixel text-[11px]">{entry.xp} XP</span>
                  </div>
                </li>
              ))}
            </ul>
          ) : (
            <ul className="divide-y divide-border">
              {data?.entries.map((entry) => {
                const isCurrent = entry.department === data.currentDepartment;
                return (
                  <li
                    key={entry.department}
                    className={cn("flex items-center justify-between py-3", isCurrent && "bg-primary/5")}
                  >
                    <div className="flex items-center gap-3">
                      <span className="w-6 text-center font-pixel text-[11px] text-text-muted">{entry.rank}</span>
                      {entry.rank === 1 ? <Trophy className="h-5 w-5 text-warning" /> : null}
                      <p className="text-sm font-medium">{entry.department}</p>
                    </div>
                    <div className="flex items-center gap-2">
                      {isCurrent && <Badge variant="primary">{t("mainPages.yourDepartment")}</Badge>}
                      <span className="font-pixel text-[11px]">{entry.xp} XP</span>
                    </div>
                  </li>
                );
              })}
            </ul>
          )}
        </CardContent>
      </Card>
    </div>
  );
}
