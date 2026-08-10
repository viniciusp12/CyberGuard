"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { cn } from "@/lib/utils";

const SECOES = [
  { href: "/senha", n: "01", label: "Senha" },
  { href: "/golpe", n: "02", label: "Golpe" },
  { href: "/anatomia", n: "03", label: "Anatomia" },
  { href: "/ia", n: "04", label: "IA" },
  { href: "/agora", n: "05", label: "Agora" },
];

const SECUNDARIOS = [
  { href: "/glossario", label: "Glossário" },
  { href: "/no-trabalho", label: "No trabalho" },
  { href: "/sobre", label: "Sobre o projeto" },
];

type NavUser = { name: string; email: string } | null;

export function Navbar({ user }: { user: NavUser }) {
  const pathname = usePathname();
  const [aberto, setAberto] = useState(false);

  useEffect(() => {
    setAberto(false);
  }, [pathname]);

  return (
    <header className="sticky top-0 z-50 w-full border-b border-line bg-page/90 backdrop-blur">
      <div className="container-page flex h-16 items-center justify-between gap-4">
        <Link
          href="/"
          className="flex shrink-0 items-baseline gap-2 font-mono text-base font-semibold"
        >
          CyberGuard
          <span
            aria-hidden="true"
            className="h-1.5 w-1.5 translate-y-[-0.15rem] rounded-full bg-signal-amber"
          />
        </Link>

        <nav aria-label="Seções" className="hidden items-center gap-1 lg:flex">
          {SECOES.map((s) => {
            const ativo = pathname === s.href;
            return (
              <Link
                key={s.href}
                href={s.href}
                aria-current={ativo ? "page" : undefined}
                className={cn(
                  "flex min-h-touch items-center gap-2 rounded-sm px-3 font-mono text-sm transition-colors duration-200",
                  ativo
                    ? "text-ink"
                    : "text-ink-2 hover:bg-panel hover:text-ink",
                )}
              >
                <span
                  className={cn(
                    "text-[0.6875rem]",
                    ativo ? "text-signal-amber" : "text-ink-3",
                  )}
                >
                  {s.n}
                </span>
                {s.label}
              </Link>
            );
          })}
        </nav>

        <div className="hidden items-center gap-2 lg:flex">
          <Link
            href="/glossario"
            className="flex min-h-touch items-center rounded-sm px-3 font-mono text-sm text-ink-2 transition-colors duration-200 hover:text-ink"
          >
            Glossário
          </Link>
          <Link
            href="/ja-cai"
            className="flex min-h-touch items-center rounded-sm border border-signal-red/50 px-4 font-mono text-sm text-signal-red transition-colors duration-200 hover:bg-signal-redDim"
          >
            Já caí num golpe
          </Link>
          {user ? (
            <Link
              href="/dashboard"
              className="flex min-h-touch items-center rounded-sm px-3 font-mono text-sm text-ink-2 transition-colors hover:text-ink"
            >
              {user.name.split(" ")[0]}
            </Link>
          ) : (
            <Link
              href="/login"
              className="flex min-h-touch items-center rounded-sm px-3 font-mono text-sm text-ink-3 transition-colors hover:text-ink-2"
            >
              Entrar
            </Link>
          )}
        </div>

        <button
          type="button"
          aria-expanded={aberto}
          aria-controls="menu-mobile"
          onClick={() => setAberto((v) => !v)}
          className="flex min-h-touch min-w-touch items-center justify-center rounded-sm border border-line font-mono text-sm text-ink lg:hidden"
        >
          {aberto ? "Fechar" : "Menu"}
        </button>
      </div>

      {aberto && (
        <div
          id="menu-mobile"
          className="border-t border-line bg-page lg:hidden"
        >
          <div className="container-page flex flex-col py-3">
            <Link
              href="/ja-cai"
              className="mb-2 flex min-h-touch items-center rounded-sm border border-signal-red/50 px-4 font-mono text-sm text-signal-red"
            >
              Já caí num golpe
            </Link>

            {SECOES.map((s) => (
              <Link
                key={s.href}
                href={s.href}
                aria-current={pathname === s.href ? "page" : undefined}
                className="flex min-h-touch items-center gap-3 border-b border-line font-mono text-base text-ink"
              >
                <span className="text-xs text-ink-3">{s.n}</span>
                {s.label}
              </Link>
            ))}

            {SECUNDARIOS.map((s) => (
              <Link
                key={s.href}
                href={s.href}
                className="flex min-h-touch items-center border-b border-line font-mono text-base text-ink-2"
              >
                {s.label}
              </Link>
            ))}

            <Link
              href={user ? "/dashboard" : "/login"}
              className="flex min-h-touch items-center font-mono text-base text-ink-3"
            >
              {user ? `Painel · ${user.name.split(" ")[0]}` : "Entrar"}
            </Link>
          </div>
        </div>
      )}
    </header>
  );
}
