"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { ChevronLeft, ChevronRight, Lock } from "lucide-react";
import { cn } from "@/lib/utils";
import { useLocale } from "@/lib/i18n/LocaleProvider";

export interface CarouselItem {
  id: string;
  title: string;
  description: string;
  tag?: string;
  locked?: boolean;
}

export interface CircularCarouselProps {
  items: CarouselItem[];
  activeIndex?: number;
  onActiveChange?: (index: number) => void;
  autoPlay?: boolean;
  autoPlayInterval?: number;
  className?: string;
}

const VISIBLE_COUNT = 5;

/**
 * O raio horizontal era fixo em 220px. Num celular de 360px de largura os
 * cartões se espalhavam por 440px e vazavam a tela — foi o que apareceu como
 * cartões cortados nas bordas. Agora ele acompanha a largura disponível, com
 * teto no valor antigo para o desktop não mudar.
 */
const RADIUS_X_MAX = 220;
const RADIUS_Y = 100;

function raioHorizontal(largura: number) {
  if (!largura) return RADIUS_X_MAX;
  return Math.min(RADIUS_X_MAX, largura * 0.32);
}

function getItemPosition(
  index: number,
  activeIndex: number,
  total: number,
  raioX: number,
) {
  const offset = index - activeIndex;
  const half = Math.floor(VISIBLE_COUNT / 2);
  let adjustedOffset = offset;

  if (offset > half) adjustedOffset = offset - total;
  if (offset < -half) adjustedOffset = offset + total;

  if (Math.abs(adjustedOffset) > half * 2) return null;

  const angle = (adjustedOffset / VISIBLE_COUNT) * Math.PI;
  const x = Math.sin(angle) * raioX;
  const y = -Math.cos(angle) * RADIUS_Y;

  const distance = Math.abs(adjustedOffset);
  const maxDistance = half + 1;
  const scale = Math.max(0, 1 - (distance / maxDistance) * 0.3);
  const opacity = Math.max(0.35, 1 - (distance / maxDistance) * 0.65);
  const zIndex = VISIBLE_COUNT - distance;

  return { x, y, scale, opacity, zIndex, adjustedOffset };
}

export function CircularCarousel({
  items,
  activeIndex: controlledIndex,
  onActiveChange,
  autoPlay = false,
  autoPlayInterval = 4000,
  className,
}: CircularCarouselProps) {
  const { t } = useLocale();
  const [internalIndex, setInternalIndex] = useState(0);

  // Largura real da pista, para o raio dos cartões acompanhar a tela.
  // ResizeObserver em vez de window.innerWidth porque o que importa é o
  // espaço deste container, que muda também quando a barra lateral aparece.
  const pistaRef = useRef<HTMLDivElement>(null);
  const [larguraPista, setLarguraPista] = useState(0);

  useEffect(() => {
    const el = pistaRef.current;
    if (!el) return;
    const observador = new ResizeObserver(([entrada]) => {
      setLarguraPista(entrada.contentRect.width);
    });
    observador.observe(el);
    return () => observador.disconnect();
  }, []);
  const [isHovered, setIsHovered] = useState(false);
  const [isFocused, setIsFocused] = useState(false);
  const intervalRef = useRef<ReturnType<typeof setInterval> | null>(null);
  const containerRef = useRef<HTMLDivElement | null>(null);

  const activeIndex = controlledIndex ?? internalIndex;
  const total = items.length;

  const goTo = useCallback(
    (index: number) => {
      const newIndex = ((index % total) + total) % total;
      if (controlledIndex === undefined) {
        setInternalIndex(newIndex);
      }
      onActiveChange?.(newIndex);
    },
    [total, controlledIndex, onActiveChange],
  );

  const next = useCallback(() => goTo(activeIndex + 1), [activeIndex, goTo]);
  const prev = useCallback(() => goTo(activeIndex - 1), [activeIndex, goTo]);

  useEffect(() => {
    if (!autoPlay || isHovered || isFocused) return;
    intervalRef.current = setInterval(next, autoPlayInterval);
    return () => {
      if (intervalRef.current) clearInterval(intervalRef.current);
    };
  }, [autoPlay, autoPlayInterval, isHovered, isFocused, next]);

  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      if (e.key === "ArrowLeft") prev();
      if (e.key === "ArrowRight") next();
    };
    const el = containerRef.current;
    el?.addEventListener("keydown", handler);
    return () => el?.removeEventListener("keydown", handler);
  }, [next, prev]);

  const activeItem = items[activeIndex];
  if (!activeItem) return null;

  return (
    <div
      ref={containerRef}
      tabIndex={0}
      role="region"
      aria-label={t("mainPages.carouselAriaLabel")}
      aria-roledescription="carousel"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      onFocus={() => setIsFocused(true)}
      onBlur={() => setIsFocused(false)}
      className={cn(
        "relative flex flex-col items-center justify-center gap-6 outline-none",
        className,
      )}
    >
      <div ref={pistaRef} className="relative h-[260px] w-full max-w-lg overflow-hidden">
        <AnimatePresence mode="popLayout">
          {items.map((item, i) => {
            const pos = getItemPosition(i, activeIndex, total, raioHorizontal(larguraPista));
            if (!pos) return null;

            const isActive = i === activeIndex;

            return (
              <motion.button
                key={item.id}
                layout
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{
                  x: pos.x,
                  y: pos.y,
                  scale: pos.scale,
                  opacity: pos.opacity,
                  zIndex: pos.zIndex,
                }}
                exit={{ opacity: 0, scale: 0.8 }}
                transition={{ duration: 0.55, ease: [0.22, 1, 0.36, 1] }}
                onClick={() => goTo(i)}
                aria-label={item.title}
                aria-selected={isActive}
                role="option"
                className={cn(
                  "absolute left-1/2 top-1/2 flex h-32 w-48 -translate-x-1/2 -translate-y-1/2 cursor-pointer flex-col items-start justify-between rounded-lg border p-4 backdrop-blur-sm transition-shadow duration-300",
                  "border-border bg-gradient-to-b from-surface to-surface-2",
                  isActive
                    ? "shadow-[0_16px_40px_-8px_rgba(0,0,0,0.35)]"
                    : "shadow-[0_6px_16px_-4px_rgba(0,0,0,0.2)] hover:shadow-[0_10px_24px_-4px_rgba(0,0,0,0.3)]",
                  item.locked && "opacity-70",
                )}
                style={{ transformOrigin: "center center" }}
              >
                <div className="flex w-full items-center justify-between">
                  {item.tag && (
                    <span className="rounded-full bg-primary/15 px-2 py-0.5 text-[10px] font-medium uppercase tracking-wider text-primary">
                      {item.tag}
                    </span>
                  )}
                  {item.locked && <Lock className="h-3.5 w-3.5 text-text-muted" />}
                </div>
                <div className="w-full">
                  <h3
                    className={cn(
                      "font-stencil leading-tight transition-colors duration-300",
                      isActive ? "text-base text-text" : "text-sm text-text-muted",
                    )}
                  >
                    {item.title}
                  </h3>
                  <p
                    className={cn(
                      "mt-1 line-clamp-2 text-xs leading-relaxed transition-colors duration-300",
                      isActive ? "text-text-muted" : "text-text-muted/70",
                    )}
                  >
                    {item.description}
                  </p>
                </div>
              </motion.button>
            );
          })}
        </AnimatePresence>

        <motion.div
          key={activeItem.id}
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4, ease: "easeOut" }}
          className="pointer-events-none absolute inset-0 flex flex-col items-center justify-center"
        >
          <span className="font-pixel text-2xl text-text/90">
            {String(activeIndex + 1).padStart(2, "0")}
          </span>
          <span className="mt-2 text-xs text-text-muted">
            {t("mainPages.carouselOf", { total: String(total).padStart(2, "0") })}
          </span>
        </motion.div>
      </div>

      <div className="flex items-center gap-4">
        <motion.button
          whileHover={{ scale: 1.08 }}
          whileTap={{ scale: 0.95 }}
          onClick={prev}
          aria-label={t("mainPages.carouselPrevious")}
          className="flex h-10 w-10 items-center justify-center rounded-full border border-border bg-surface-2 text-text-muted backdrop-blur-sm transition-colors hover:bg-surface-3 hover:text-text focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary"
        >
          <ChevronLeft className="size-5" />
        </motion.button>

        <div className="flex items-center gap-1.5" role="tablist">
          {items.map((_, i) => (
            <button
              key={i}
              role="tab"
              aria-selected={i === activeIndex}
              onClick={() => goTo(i)}
              className={cn(
                "h-1.5 rounded-full transition-all duration-300",
                i === activeIndex ? "w-6 bg-primary" : "w-1.5 bg-border hover:bg-text-muted",
              )}
              aria-label={t("mainPages.carouselGoTo", { number: i + 1 })}
            />
          ))}
        </div>

        <motion.button
          whileHover={{ scale: 1.08 }}
          whileTap={{ scale: 0.95 }}
          onClick={next}
          aria-label={t("mainPages.carouselNext")}
          className="flex h-10 w-10 items-center justify-center rounded-full border border-border bg-surface-2 text-text-muted backdrop-blur-sm transition-colors hover:bg-surface-3 hover:text-text focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary"
        >
          <ChevronRight className="size-5" />
        </motion.button>
      </div>
    </div>
  );
}

export default CircularCarousel;
