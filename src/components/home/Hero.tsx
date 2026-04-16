"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowUpRight, ShieldCheck } from "lucide-react";
import { Badge } from "@/components/ui/Badge";

export function Hero() {
  return (
    <section className="relative overflow-hidden pt-24 pb-32 md:pt-32 md:pb-40">
      {/* bg grid + radial glow */}
      <div className="absolute inset-0 -z-10 bg-grid-pattern [background-size:64px_64px] [mask-image:radial-gradient(ellipse_at_top,black,transparent_70%)]" />
      <div className="absolute inset-0 -z-10 bg-radial-fade" />
      <div className="absolute left-1/2 top-0 -z-10 h-[500px] w-[900px] -translate-x-1/2 rounded-full bg-accent/5 blur-[120px]" />

      <div className="container-page">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
          className="flex justify-center mb-8"
        >
          <Badge>Parceria oficial · Leroy Merlin</Badge>
        </motion.div>

        <motion.h1
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
          className="font-display text-hero font-semibold text-center tracking-tighter text-balance mx-auto max-w-5xl"
        >
          Segurança começa com{" "}
          <span className="relative inline-block">
            <span className="relative z-10 text-accent">pessoas</span>
            <span className="absolute inset-x-0 bottom-1 md:bottom-2 h-3 md:h-5 bg-accent/20 -z-0" />
          </span>
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.25 }}
          className="mt-8 mx-auto max-w-2xl text-center text-lg md:text-xl text-foreground/60 leading-relaxed"
        >
          Plataforma de conscientização em segurança cibernética desenvolvida para
          fortalecer a cultura de proteção digital entre colaboradores da Leroy
          Merlin — com conteúdo sério, prático e direto ao ponto.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="mt-12 flex flex-col sm:flex-row items-center justify-center gap-4"
        >
          <Link
            href="/registro"
            className="group inline-flex items-center gap-3 rounded-full bg-accent px-8 py-4 text-sm font-medium text-background hover:bg-accent/90 hover:shadow-[0_0_0_1px_rgba(180,124,255,0.35),0_12px_40px_-8px_rgba(180,124,255,0.55)] transition-all"
          >
            Começar treinamento
            <ArrowUpRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
          </Link>
          <Link
            href="/sobre"
            className="group inline-flex items-center gap-3 rounded-full border border-surface-border bg-surface-elevated/50 px-8 py-4 text-sm text-foreground/80 hover:text-foreground hover:border-accent/40 transition-colors"
          >
            Saiba mais
          </Link>
        </motion.div>

        {/* orbiting shield illustration */}
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1, delay: 0.6 }}
          className="mt-24 relative mx-auto max-w-4xl aspect-[16/7] hidden md:block"
        >
          <div className="absolute inset-0 rounded-3xl border border-surface-border bg-surface-elevated/30 backdrop-blur-sm overflow-hidden glow-border">
            <div className="absolute inset-0 bg-grid-pattern [background-size:32px_32px] opacity-40" />
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="relative">
                <div className="absolute inset-0 rounded-full bg-accent/20 blur-3xl scale-150 animate-pulse-slow" />
                <div className="relative flex items-center justify-center w-32 h-32 rounded-3xl border border-accent/40 bg-background/80">
                  <ShieldCheck className="h-16 w-16 text-accent" strokeWidth={1.5} />
                </div>
              </div>
            </div>

            {/* Floating data chips */}
            <div className="absolute top-8 left-8 rounded-xl border border-surface-border bg-background/80 backdrop-blur px-4 py-3">
              <p className="font-mono text-[10px] uppercase tracking-wider text-foreground/40">
                Phishing bloqueado
              </p>
              <p className="font-display text-lg font-semibold text-accent">+98.2%</p>
            </div>
            <div className="absolute top-8 right-8 rounded-xl border border-surface-border bg-background/80 backdrop-blur px-4 py-3">
              <p className="font-mono text-[10px] uppercase tracking-wider text-foreground/40">
                Senhas fortes
              </p>
              <p className="font-display text-lg font-semibold text-accent">100%</p>
            </div>
            <div className="absolute bottom-8 left-1/2 -translate-x-1/2 rounded-xl border border-surface-border bg-background/80 backdrop-blur px-4 py-3">
              <p className="font-mono text-[10px] uppercase tracking-wider text-foreground/40">
                Colaboradores treinados
              </p>
              <p className="font-display text-lg font-semibold text-accent">42.000+</p>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
