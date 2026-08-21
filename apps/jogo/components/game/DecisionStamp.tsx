"use client";

import { AnimatePresence, motion } from "framer-motion";
import type { PlayerAction } from "@repo/shared/schemas";
import { useLocale } from "@/lib/i18n/LocaleProvider";

const STAMP_CONFIG: Record<PlayerAction, { key: string; colorVar: string }> = {
  accept: { key: "phasesGame.stampAccept", colorVar: "var(--color-success)" },
  delete: { key: "phasesGame.stampDelete", colorVar: "var(--color-text-muted)" },
  report: { key: "phasesGame.stampReport", colorVar: "var(--color-danger)" },
};

/** Papers-Please-style rubber stamp that slams down over the document on decision. */
export function DecisionStamp({ action }: { action: PlayerAction | null }) {
  const { t } = useLocale();
  const config = action ? STAMP_CONFIG[action] : null;

  return (
    <AnimatePresence>
      {action && config && (
        <motion.div
          key={action}
          className="pointer-events-none absolute inset-0 z-40 flex items-center justify-center overflow-hidden rounded-xl"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0, transition: { duration: 0.2 } }}
        >
          {/* Impact flash ring */}
          <motion.div
            aria-hidden
            className="absolute h-32 w-32 rounded-full sm:h-44 sm:w-44"
            style={{ background: config.colorVar }}
            initial={{ opacity: 0.55, scale: 0.15 }}
            animate={{ opacity: 0, scale: 1.8 }}
            transition={{ duration: 0.55, ease: "easeOut" }}
          />

          <motion.div
            className="select-none rounded-md border-[5px] px-5 py-2.5 text-2xl font-black uppercase tracking-widest sm:px-8 sm:py-4 sm:text-4xl"
            style={{
              borderColor: config.colorVar,
              color: config.colorVar,
              fontFamily: "var(--font-pixel)",
              boxShadow: `0 0 0 2px color-mix(in srgb, ${config.colorVar} 25%, transparent)`,
            }}
            initial={{ scale: 2.6, opacity: 0, rotate: -20 }}
            animate={{ scale: 1, opacity: 1, rotate: -10 }}
            transition={{ type: "spring", stiffness: 480, damping: 16 }}
          >
            {t(config.key)}
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
