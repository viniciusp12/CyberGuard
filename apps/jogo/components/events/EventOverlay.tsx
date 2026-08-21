"use client";

import { AnimatePresence, motion } from "framer-motion";
import { PhoneCall } from "lucide-react";
import type { GameEvent } from "@repo/shared/schemas";
import { useLocale } from "@/lib/i18n/LocaleProvider";

function findBossPopup(events: GameEvent[]): GameEvent | undefined {
  return events.find(
    (event) => event.effect.kind === "ui_distraction" && event.effect.variant === "boss_popup",
  );
}

/** Full-screen interrupt modal for the "boss_popup" ui_distraction variant — a step up from the plain banner used by other events. */
export function EventOverlay({ events }: { events: GameEvent[] }) {
  const { t } = useLocale();
  const popup = findBossPopup(events);

  return (
    <AnimatePresence>
      {popup && (
        <motion.div
          key={popup.id}
          className="fixed inset-0 z-[75] flex items-center justify-center bg-black/65 px-4"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
        >
          <motion.div
            className="w-full max-w-sm rounded-xl border border-warning/50 bg-surface p-5 shadow-2xl"
            initial={{ scale: 0.75, y: -40, rotate: -4 }}
            animate={{ scale: 1, y: 0, rotate: 0 }}
            transition={{ type: "spring", stiffness: 420, damping: 20 }}
          >
            <div className="mb-2 flex items-center gap-2 text-warning">
              <motion.span
                animate={{ rotate: [0, -12, 12, -12, 0] }}
                transition={{ repeat: Infinity, duration: 0.6 }}
              >
                <PhoneCall className="h-5 w-5" />
              </motion.span>
              <span className="text-xs font-semibold uppercase tracking-wide">
                {t("phasesGame.interruptionLabel")}
              </span>
            </div>
            <p className="text-sm text-text">{popup.message}</p>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

export function hasScreenGlitch(events: GameEvent[]): boolean {
  return events.some(
    (event) => event.effect.kind === "ui_distraction" && event.effect.variant === "lag_glitch",
  );
}
