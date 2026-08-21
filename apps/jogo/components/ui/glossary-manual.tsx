"use client";

import { useState, useCallback } from "react";
import * as Dialog from "@radix-ui/react-dialog";
import { AnimatePresence, motion } from "framer-motion";
import { Kalam } from "next/font/google";
import {
  BadgeCheck,
  Banknote,
  Box,
  Briefcase,
  Bug,
  ChevronLeft,
  ChevronRight,
  Globe,
  Headset,
  KeyRound,
  Link2,
  Lock,
  Mail,
  MessageCircle,
  MessageSquare,
  Paperclip,
  QrCode,
  Receipt,
  ShieldAlert,
  ShieldCheck,
  Skull,
  Truck,
  Usb,
  Users,
  Video,
  X,
  BookOpen,
  type LucideIcon,
} from "lucide-react";
import { cn } from "@/lib/utils";
import { useLocale } from "@/lib/i18n/LocaleProvider";
import { GLOSSARY_TERMS } from "@/lib/glossary";
import { playPageTurnSound } from "@/lib/sound";
import { Book } from "./book";

const kalam = Kalam({ subsets: ["latin"], weight: ["400", "700"], variable: "--font-kalam" });

const TERM_ICON: Record<string, LucideIcon> = {
  phishing: Mail,
  engenharia_social: Users,
  malware: Bug,
  ransomware: Lock,
  qr_falso: QrCode,
  link_malicioso: Link2,
  senha_fraca: KeyRound,
  mfa: ShieldCheck,
  usb_infectado: Usb,
  whatsapp_falso: MessageCircle,
  sms_falso: MessageSquare,
  microsoft_falso: Headset,
  fornecedor_comprometido: Truck,
  bec: Briefcase,
  pix_falso: Banknote,
  boleto_adulterado: Receipt,
  deepfake: Video,
  anexo_perigoso: Paperclip,
  spf_dkim_dmarc: ShieldAlert,
  certificado_digital: BadgeCheck,
  dominio_falso: Globe,
  sandbox: Box,
};

// Each "spread" shows 2 terms (left page + right page)
const TERMS_PER_SPREAD = 2;
const TOTAL_SPREADS = Math.ceil(GLOSSARY_TERMS.length / TERMS_PER_SPREAD);

// Page flip animation variants — simple horizontal slide + fade (no 3D rotation)
const pageVariants = {
  enterFromRight: {
    x: 60,
    opacity: 0,
  },
  enterFromLeft: {
    x: -60,
    opacity: 0,
  },
  center: {
    x: 0,
    opacity: 1,
  },
  exitToLeft: {
    x: -60,
    opacity: 0,
  },
  exitToRight: {
    x: 60,
    opacity: 0,
  },
};

const pageTransition = {
  type: "tween",
  duration: 0.35,
  ease: [0.25, 0.1, 0.25, 1],
};

function TermPage({ termIndex, side }: { termIndex: number; side: "left" | "right" }) {
  const { locale } = useLocale();
  const term = GLOSSARY_TERMS[termIndex];

  if (!term) {
    return (
      <div className="flex h-full flex-col items-center justify-center p-8 text-[#6b5a3a]/60">
        <BookOpen className="mb-3 h-12 w-12" strokeWidth={1} />
        <p className="text-center text-sm italic">Fim do glossário</p>
      </div>
    );
  }

  const Icon = TERM_ICON[term.id] ?? Mail;
  const pageNumber = termIndex + 1;

  return (
    <div className="relative flex h-full flex-col overflow-hidden p-4 sm:p-5">
      {/* Term title */}
      <h3 className="mb-1 text-center text-lg font-bold leading-tight text-[#2b2117] sm:text-xl">
        {term.term[locale]}
      </h3>

      {/* Decorative separator */}
      <div className="mx-auto mb-2 flex items-center gap-2">
        <div className="h-px w-6 bg-[#8a6a3f]/50" />
        <Skull className="h-2.5 w-2.5 text-[#8a6a3f]/60" />
        <div className="h-px w-6 bg-[#8a6a3f]/50" />
      </div>

      {/* Definition */}
      <p className="mb-3 text-center text-xs leading-relaxed text-[#3d3122] sm:text-sm">
        {term.definition[locale]}
      </p>

      {/* Term illustration — taped to the page, messy/hand-glued style */}
      <div className="relative mx-auto mt-auto flex w-[95%] max-w-[340px] items-center justify-center py-1">
        {/* Tape strips — overlapping the image corners */}
        <div
          aria-hidden
          className="absolute top-0 left-2 z-10 h-3 w-16 rotate-[-15deg] rounded-[1px]"
          style={{ background: "linear-gradient(90deg, rgba(168,144,96,0.6), rgba(139,115,69,0.85), rgba(168,144,96,0.5))", boxShadow: "0 1px 2px rgba(0,0,0,0.25)" }}
        />
        <div
          aria-hidden
          className="absolute top-0 right-0 z-10 h-3.5 w-18 rotate-[10deg] rounded-[1px]"
          style={{ background: "linear-gradient(90deg, rgba(156,132,80,0.5), rgba(125,104,56,0.8), rgba(156,132,80,0.55))", boxShadow: "0 1px 2px rgba(0,0,0,0.25)" }}
        />
        <div
          aria-hidden
          className="absolute bottom-0 left-3 z-10 h-3 w-14 rotate-[7deg] rounded-[1px]"
          style={{ background: "linear-gradient(90deg, rgba(150,128,78,0.55), rgba(120,98,52,0.8), rgba(150,128,78,0.5))", boxShadow: "0 1px 2px rgba(0,0,0,0.2)" }}
        />
        <div
          aria-hidden
          className="absolute bottom-0 right-2 z-10 h-3.5 w-16 rotate-[-11deg] rounded-[1px]"
          style={{ background: "linear-gradient(90deg, rgba(168,144,96,0.5), rgba(139,115,69,0.85), rgba(168,144,96,0.6))", boxShadow: "0 1px 2px rgba(0,0,0,0.25)" }}
        />
        {/* Image — slightly crooked like hand-glued */}
        <div className="relative w-full overflow-hidden rounded-[3px] shadow-xl rotate-[1.5deg] border border-[#4a3a20]/30">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src={`/glossary/${term.id}.png`}
            alt={term.term[locale]}
            className="h-full w-full object-cover"
            loading="lazy"
          />
          {/* Worn/aged vignette */}
          <div
            aria-hidden
            className="pointer-events-none absolute inset-0"
            style={{
              boxShadow: "inset 0 0 20px rgba(20,15,5,0.55), inset 0 0 4px rgba(0,0,0,0.2)",
            }}
          />
        </div>
      </div>

      {/* Bottom page number */}
      <div className="mt-1.5 text-center">
        <span className="text-[10px] font-bold text-[#3d4a2e]/60">
          — {pageNumber} —
        </span>
      </div>

      {/* Worn edge effect */}
      {side === "left" && (
        <div
          aria-hidden
          className="pointer-events-none absolute inset-y-0 right-0 w-6 opacity-30"
          style={{
            background: "linear-gradient(90deg, transparent, rgba(60,45,20,0.15))",
          }}
        />
      )}
      {side === "right" && (
        <div
          aria-hidden
          className="pointer-events-none absolute inset-y-0 left-0 w-6 opacity-30"
          style={{
            background: "linear-gradient(270deg, transparent, rgba(60,45,20,0.15))",
          }}
        />
      )}
    </div>
  );
}

function CoverPage() {
  const { t } = useLocale();
  return (
    <div className="flex h-full flex-col items-center justify-center p-8 text-center">
      {/* Cover skull */}
      <div className="relative mb-6">
        <div className="absolute inset-0 scale-150 rounded-full bg-[#3d4a2e]/5 blur-xl" />
        <Skull className="relative h-20 w-20 text-[#3d4a2e]" strokeWidth={1} />
      </div>

      {/* Title */}
      <h2 className="mb-2 text-3xl font-bold tracking-wide text-[#2b2117] sm:text-4xl">
        {t("glossary.title")}
      </h2>

      {/* Decorative separator */}
      <div className="mx-auto mb-4 flex items-center gap-3">
        <div className="h-px w-12 bg-[#8a6a3f]/60" />
        <ShieldAlert className="h-4 w-4 text-[#8a6a3f]" />
        <div className="h-px w-12 bg-[#8a6a3f]/60" />
      </div>

      {/* Subtitle */}
      <p className="max-w-sm text-sm leading-relaxed text-[#5a4a30] sm:text-base">
        {t("glossary.subtitle")}
      </p>

      {/* Instruction */}
      <div className="mt-8 flex items-center gap-2 text-[#6b5a3a]/70">
        <ChevronLeft className="h-4 w-4" />
        <span className="text-xs uppercase tracking-wider">Vire as páginas</span>
        <ChevronRight className="h-4 w-4" />
      </div>
    </div>
  );
}

function TableOfContents({ onGoToTerm }: { onGoToTerm: (termIndex: number) => void }) {
  const { locale } = useLocale();
  return (
    <div className="flex h-full flex-col overflow-hidden p-5 sm:p-7">
      <h3 className="mb-3 text-center text-lg font-bold text-[#2b2117]">Índice</h3>
      <div className="mb-3 h-px w-full bg-[#8a6a3f]/30" />
      <div className="flex-1 overflow-y-auto pr-1 scrollbar-thin">
        <ul className="space-y-1">
          {GLOSSARY_TERMS.map((term, i) => {
            const Icon = TERM_ICON[term.id] ?? Mail;
            return (
              <li key={term.id}>
                <button
                  type="button"
                  onClick={() => onGoToTerm(i)}
                  className="flex w-full items-center gap-2 rounded-sm px-1 py-0.5 text-left text-sm text-[#3d3122] transition-colors hover:bg-[#3d4a2e]/10"
                >
                  <Icon className="h-3 w-3 shrink-0 text-[#6b5a3a]" strokeWidth={1.5} />
                  <span className="truncate">{term.term[locale]}</span>
                  <span className="relative top-[-1px] flex-1 border-b border-dotted border-[#6b5a3a]/30" />
                  <span className="text-[10px] text-[#6b5a3a]/70">{i + 1}</span>
                </button>
              </li>
            );
          })}
        </ul>
      </div>
    </div>
  );
}

export function GlossaryManual() {
  const { t } = useLocale();
  const [open, setOpen] = useState(false);
  // spread 0 = cover + TOC, spread 1..N = term pairs
  const [spread, setSpread] = useState(0);
  const [direction, setDirection] = useState(0); // -1 left, 1 right

  const totalSpreads = TOTAL_SPREADS + 1; // +1 for cover spread

  const goNext = useCallback(() => {
    if (spread >= totalSpreads - 1) return;
    setDirection(1);
    setSpread((s) => s + 1);
    playPageTurnSound();
  }, [spread, totalSpreads]);

  const goPrev = useCallback(() => {
    if (spread <= 0) return;
    setDirection(-1);
    setSpread((s) => s - 1);
    playPageTurnSound();
  }, [spread]);

  const canGoNext = spread < totalSpreads - 1;
  const canGoPrev = spread > 0;

  // Navigate directly to a specific term by its index
  const goToTerm = useCallback((termIndex: number) => {
    const targetSpread = Math.floor(termIndex / TERMS_PER_SPREAD) + 1; // +1 because spread 0 is cover
    setDirection(targetSpread > spread ? 1 : -1);
    setSpread(targetSpread);
    playPageTurnSound();
  }, [spread]);

  // Compute which terms to show
  const leftTermIndex = spread === 0 ? -1 : (spread - 1) * TERMS_PER_SPREAD;
  const rightTermIndex = spread === 0 ? -1 : (spread - 1) * TERMS_PER_SPREAD + 1;

  return (
    <Dialog.Root open={open} onOpenChange={(v) => { setOpen(v); if (v) setSpread(0); }}>
      <Dialog.Trigger asChild>
        <button
          type="button"
          aria-label={t("glossary.openManual")}
          className="group fixed bottom-5 right-5 z-[70] focus-visible:outline-none"
        >
          <Book width={52} depth={7} color="#3d4a2e">
            <Skull className="h-5 w-5 text-[#d8cba8]" />
          </Book>
        </button>
      </Dialog.Trigger>

      <Dialog.Portal>
        <Dialog.Overlay className="glossary-overlay fixed inset-0 z-[80] bg-black/85 backdrop-blur-md" />
        <Dialog.Content
          className={cn(
            "glossary-content fixed left-1/2 top-1/2 z-[90] w-[95vw] max-w-5xl -translate-x-1/2 -translate-y-1/2 outline-none",
            kalam.className,
          )}
          aria-describedby={undefined}
        >
          <Dialog.Title className="sr-only">{t("glossary.title")}</Dialog.Title>

          {/* SVG defs */}
          <svg width="0" height="0" className="absolute">
            <defs>
              <filter id="glossary-paper-noise">
                <feTurbulence type="fractalNoise" baseFrequency="0.85" numOctaves="3" stitchTiles="stitch" />
                <feColorMatrix type="matrix" values="0 0 0 0 0.29  0 0 0 0 0.22  0 0 0 0 0.13  0 0 0 0.04 0" />
              </filter>
            </defs>
          </svg>

          {/* Close button */}
          <Dialog.Close
            aria-label={t("glossary.close")}
            className="absolute -right-2 -top-2 z-50 rounded-full border border-[#8a6a3f]/60 bg-[#2b2117] p-2 text-[#d8cba8] shadow-lg transition-transform hover:scale-110 hover:bg-[#3a2c1c] sm:right-0 sm:top-0"
          >
            <X className="h-4 w-4" />
          </Dialog.Close>

          {/* Book wrapper */}
          <div className="relative mx-auto aspect-[4/3] max-h-[80vh] w-full [perspective:2000px]">
            {/* Book shadow */}
            <div
              aria-hidden
              className="absolute inset-x-4 bottom-0 h-8 rounded-[50%] bg-black/50 blur-xl"
            />

            {/* Leather cover / outer shell */}
            <div
              className="glossary-book-cover relative h-full w-full overflow-hidden rounded-lg shadow-2xl shadow-black/60"
              style={{
                background: "linear-gradient(160deg, #3d4a2e 0%, #2b3320 50%, #1f2716 100%)",
              }}
            >
              {/* Leather texture */}
              <div
                aria-hidden
                className="pointer-events-none absolute inset-0 opacity-40 mix-blend-overlay"
                style={{ backgroundImage: "url(\"data:image/svg+xml,%3Csvg width='6' height='6' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M0 0h6v6H0z' fill='none'/%3E%3Cpath d='M0 0h1v1H0zm2 0h1v1H2zm4 0h1v1H4zm1 2h1v1H5zm3 2h1v1H3zm1 2h1v1H1z' fill='%23000' fill-opacity='.15'/%3E%3C/svg%3E\")" }}
              />

              {/* Gold border inset */}
              <div className="absolute inset-2 rounded-md border border-[#8a6a3f]/40 sm:inset-3" />
              <div className="absolute inset-3 rounded-sm border border-[#8a6a3f]/20 sm:inset-4" />

              {/* Inner pages area */}
              <div className="absolute inset-4 overflow-hidden rounded-sm sm:inset-5">
                {/* Paper background */}
                <div
                  className="absolute inset-0"
                  style={{
                    background: "radial-gradient(ellipse at 30% 20%, #e8dcc4 0%, #d9ccaa 40%, #c8b88e 100%)",
                  }}
                />
                {/* Paper grain */}
                <svg aria-hidden className="pointer-events-none absolute inset-0 h-full w-full opacity-[0.08]">
                  <rect width="100%" height="100%" filter="url(#glossary-paper-noise)" />
                </svg>

                {/* Central spine shadow */}
                <div
                  aria-hidden
                  className="pointer-events-none absolute inset-y-0 left-1/2 z-20 hidden w-12 -translate-x-1/2 sm:block"
                  style={{
                    background: "linear-gradient(90deg, transparent 0%, rgba(40,30,10,0.2) 40%, rgba(40,30,10,0.3) 50%, rgba(40,30,10,0.2) 60%, transparent 100%)",
                  }}
                />

                {/* Page content with flip animation */}
                <div className="relative h-full w-full overflow-hidden">
                  <AnimatePresence mode="wait" initial={false} custom={direction}>
                    <motion.div
                      key={spread}
                      custom={direction}
                      variants={pageVariants}
                      initial={direction >= 0 ? "enterFromRight" : "enterFromLeft"}
                      animate="center"
                      exit={direction >= 0 ? "exitToLeft" : "exitToRight"}
                      transition={pageTransition}
                      className="absolute inset-0 grid h-full grid-cols-1 sm:grid-cols-2"
                    >
                      {/* Left page */}
                      <div className="relative min-h-0 border-r border-[#c9b98a]/50 sm:border-r">
                        {spread === 0 ? <CoverPage /> : <TermPage termIndex={leftTermIndex} side="left" />}
                      </div>

                      {/* Right page */}
                      <div className="relative hidden min-h-0 sm:block">
                        {spread === 0 ? <TableOfContents onGoToTerm={goToTerm} /> : <TermPage termIndex={rightTermIndex} side="right" />}
                      </div>
                    </motion.div>
                  </AnimatePresence>
                </div>
              </div>

              {/* Corner ornaments on the leather */}
              <CornerFlourish className="absolute left-2 top-2 sm:left-3 sm:top-3" />
              <CornerFlourish className="absolute right-2 top-2 -scale-x-100 sm:right-3 sm:top-3" />
              <CornerFlourish className="absolute bottom-2 left-2 -scale-y-100 sm:bottom-3 sm:left-3" />
              <CornerFlourish className="absolute bottom-2 right-2 -scale-x-100 -scale-y-100 sm:bottom-3 sm:right-3" />
            </div>

            {/* Navigation arrows */}
            {canGoPrev && (
              <button
                type="button"
                onClick={goPrev}
                aria-label="Página anterior"
                className="glossary-nav-btn absolute -left-3 top-1/2 z-30 -translate-y-1/2 rounded-full border border-[#8a6a3f]/60 bg-[#2b2117] p-2.5 text-[#d8cba8] shadow-lg transition-all duration-200 hover:translate-x-[-3px] hover:border-[#d8cba8]/60 hover:bg-[#3a2c1c] hover:shadow-[0_0_12px_rgba(216,203,168,0.25)] sm:-left-5 sm:p-3"
              >
                <ChevronLeft className="h-5 w-5" />
              </button>
            )}
            {canGoNext && (
              <button
                type="button"
                onClick={goNext}
                aria-label="Próxima página"
                className="glossary-nav-btn absolute -right-3 top-1/2 z-30 -translate-y-1/2 rounded-full border border-[#8a6a3f]/60 bg-[#2b2117] p-2.5 text-[#d8cba8] shadow-lg transition-all duration-200 hover:translate-x-[3px] hover:border-[#d8cba8]/60 hover:bg-[#3a2c1c] hover:shadow-[0_0_12px_rgba(216,203,168,0.25)] sm:-right-5 sm:p-3"
              >
                <ChevronRight className="h-5 w-5" />
              </button>
            )}

            {/* Page indicator */}
            <div className="absolute -bottom-8 left-1/2 z-30 -translate-x-1/2">
              <div className="flex items-center gap-1.5 rounded-full bg-[#2b2117]/90 px-4 py-1.5 shadow-lg backdrop-blur-sm">
                {Array.from({ length: totalSpreads }, (_, i) => (
                  <button
                    key={i}
                    type="button"
                    onClick={() => {
                      setDirection(i > spread ? 1 : -1);
                      setSpread(i);
                      if (i !== spread) playPageTurnSound();
                    }}
                    aria-label={`Página ${i + 1}`}
                    className={cn(
                      "h-2 rounded-full transition-all duration-300",
                      i === spread
                        ? "w-5 bg-[#8a6a3f]"
                        : "w-2 bg-[#d8cba8]/40 hover:bg-[#d8cba8]/70",
                    )}
                  />
                ))}
              </div>
            </div>
          </div>
        </Dialog.Content>
      </Dialog.Portal>
    </Dialog.Root>
  );
}

function CornerFlourish({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 48 48" className={cn("h-8 w-8 sm:h-10 sm:w-10", className)} fill="none">
      <path
        d="M4 4 C4 20, 20 4, 4 4"
        stroke="#8a6a3f"
        strokeWidth="1.5"
        opacity="0.7"
      />
      <path
        d="M4 4 L4 18 M4 4 L18 4"
        stroke="#8a6a3f"
        strokeWidth="2"
        strokeLinecap="round"
        opacity="0.8"
      />
      <circle cx="4" cy="4" r="3" fill="#8a6a3f" opacity="0.6" />
      <path
        d="M4 4 Q16 6 16 16"
        stroke="#8a6a3f"
        strokeWidth="1"
        opacity="0.4"
        fill="none"
      />
      <path
        d="M4 4 Q6 16 16 16"
        stroke="#8a6a3f"
        strokeWidth="1"
        opacity="0.4"
        fill="none"
      />
    </svg>
  );
}
