import Link from "next/link";
import { ShieldCheck } from "lucide-react";
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
    <section className="relative min-h-[calc(100vh-5rem)] flex items-center justify-center py-16 md:py-24 overflow-hidden">
      <div className="absolute inset-0 -z-10 bg-grid-pattern [background-size:64px_64px] [mask-image:radial-gradient(ellipse_at_center,black,transparent_70%)]" />
      <div className="absolute left-1/2 top-1/2 -z-10 h-[500px] w-[700px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-accent/5 blur-[120px]" />

      <div className="container-page max-w-md">
        <Link
          href="/"
          className="flex items-center gap-2 justify-center mb-10 group"
        >
          <ShieldCheck className="h-6 w-6 text-accent" strokeWidth={2.25} />
          <span className="font-display text-lg font-semibold">CyberGuard</span>
        </Link>

        <div className="rounded-3xl border border-surface-border bg-surface-elevated/70 backdrop-blur-sm p-8 md:p-10 glow-border">
          <p className="font-mono text-[10px] uppercase tracking-[0.25em] text-accent mb-3">
            — {eyebrow}
          </p>
          <h1 className="font-display text-3xl md:text-4xl font-semibold tracking-tight">
            {title}
          </h1>
          <p className="mt-3 text-sm text-foreground/60 leading-relaxed">
            {description}
          </p>

          <div className="mt-8">{children}</div>
        </div>
      </div>
    </section>
  );
}
