import Link from "next/link";
import type { ReactNode } from "react";

export function AuthLayout({
  children,
  eyebrow,
  title,
  description,
}: {
  children: ReactNode;
  eyebrow: string;
  title: string;
  description: string;
}) {
  return (
    <section className="flex min-h-[calc(100vh-4rem)] items-center justify-center py-16">
      <div className="container-page max-w-md">
        <Link href="/" className="font-mono text-sm text-ink-3 hover:text-ink-2">
          ← CyberGuard
        </Link>

        <div className="mt-6 rounded-sm border border-line bg-panel p-7">
          <p className="label-field">{eyebrow}</p>
          <h1 className="mt-3 font-mono text-2xl font-semibold">{title}</h1>
          <p className="mt-3 text-sm leading-relaxed text-ink-2">
            {description}
          </p>

          <div className="mt-7">{children}</div>
        </div>

        <p className="mt-5 text-sm leading-relaxed text-ink-3">
          A conta serve só para a trilha gamificada do Challenge. Todo o
          conteúdo aberto do site — inclusive o teste de senha e a seção de
          resposta a golpe — funciona sem login.
        </p>
      </div>
    </section>
  );
}
