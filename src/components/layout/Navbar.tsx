"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { Menu, X, ShieldCheck } from "lucide-react";
import { cn } from "@/lib/utils";

const NAV_LINKS = [
  { href: "/", label: "Início" },
  { href: "/sobre", label: "Quem somos" },
  { href: "/ameacas", label: "Ameaças" },
  { href: "/prevencao", label: "Prevenção" },
  { href: "/contato", label: "Contato" },
];

type NavUser = { name: string; email: string } | null;

export function Navbar({ user }: { user: NavUser }) {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 12);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    setOpen(false);
  }, [pathname]);

  return (
    <header
      className={cn(
        "sticky top-0 z-50 w-full transition-all duration-300",
        scrolled
          ? "backdrop-blur-xl bg-background/70 border-b border-surface-border"
          : "bg-transparent"
      )}
    >
      <div className="container-page flex h-16 items-center justify-between md:h-20">
        <Link href="/" className="flex items-center gap-2 group">
          <div className="relative">
            <div className="absolute inset-0 bg-accent/30 blur-lg group-hover:bg-accent/50 transition-colors" />
            <ShieldCheck className="relative h-6 w-6 text-accent" strokeWidth={2.25} />
          </div>
          <span className="font-display text-lg font-semibold tracking-tight">
            CyberGuard
          </span>
        </Link>

        <nav className="hidden md:flex items-center gap-1">
          {NAV_LINKS.map((link) => {
            const active = pathname === link.href;
            return (
              <Link
                key={link.href}
                href={link.href}
                className={cn(
                  "px-4 py-2 text-sm rounded-full transition-colors",
                  active
                    ? "text-accent bg-accent/10"
                    : "text-foreground/70 hover:text-foreground hover:bg-surface-elevated"
                )}
              >
                {link.label}
              </Link>
            );
          })}
        </nav>

        <div className="hidden md:flex items-center gap-2">
          {user ? (
            <Link
              href="/dashboard"
              className="rounded-full bg-accent px-5 py-2.5 text-sm font-medium text-background hover:bg-accent/90 transition-colors"
            >
              {user.name.split(" ")[0]} · Painel
            </Link>
          ) : (
            <>
              <Link
                href="/login"
                className="px-4 py-2 text-sm text-foreground/70 hover:text-foreground transition-colors"
              >
                Entrar
              </Link>
              <Link
                href="/registro"
                className="rounded-full bg-accent px-5 py-2.5 text-sm font-medium text-background hover:bg-accent/90 transition-colors"
              >
                Começar
              </Link>
            </>
          )}
        </div>

        <button
          type="button"
          aria-label="Abrir menu"
          className="md:hidden p-2 rounded-lg hover:bg-surface-elevated"
          onClick={() => setOpen((v) => !v)}
        >
          {open ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
        </button>
      </div>

      {open && (
        <div className="md:hidden border-t border-surface-border bg-background/95 backdrop-blur-xl">
          <div className="container-page py-4 flex flex-col gap-1">
            {NAV_LINKS.map((link) => {
              const active = pathname === link.href;
              return (
                <Link
                  key={link.href}
                  href={link.href}
                  className={cn(
                    "px-4 py-3 rounded-lg text-sm",
                    active
                      ? "text-accent bg-accent/10"
                      : "text-foreground/80 hover:bg-surface-elevated"
                  )}
                >
                  {link.label}
                </Link>
              );
            })}
            <div className="mt-2 pt-2 border-t border-surface-border flex flex-col gap-2">
              {user ? (
                <Link
                  href="/dashboard"
                  className="rounded-full bg-accent px-5 py-3 text-sm font-medium text-background text-center"
                >
                  Ir para o Painel
                </Link>
              ) : (
                <>
                  <Link
                    href="/login"
                    className="rounded-full border border-surface-border px-5 py-3 text-sm text-center"
                  >
                    Entrar
                  </Link>
                  <Link
                    href="/registro"
                    className="rounded-full bg-accent px-5 py-3 text-sm font-medium text-background text-center"
                  >
                    Criar conta
                  </Link>
                </>
              )}
            </div>
          </div>
        </div>
      )}
    </header>
  );
}
