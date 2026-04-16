import type { Metadata } from "next";
import { redirect } from "next/navigation";
import { getCurrentUser } from "@/lib/auth";
import { LogoutButton } from "./LogoutButton";
import { Trophy, Flame, Target, Lock } from "lucide-react";

export const metadata: Metadata = {
  title: "Painel",
  description: "Seu painel CyberGuard",
};

export default async function DashboardPage() {
  const user = await getCurrentUser();
  if (!user) redirect("/login");

  return (
    <section className="relative pt-32 pb-24 min-h-[calc(100vh-5rem)]">
      <div className="absolute inset-0 -z-10 bg-grid-pattern [background-size:64px_64px] [mask-image:radial-gradient(ellipse_at_top,black,transparent_60%)]" />
      <div className="absolute left-1/2 top-0 -z-10 h-[500px] w-[800px] -translate-x-1/2 rounded-full bg-accent/5 blur-[120px]" />

      <div className="container-page">
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-6 mb-12">
          <div>
            <p className="font-mono text-xs uppercase tracking-[0.25em] text-accent mb-3">
              — Painel
            </p>
            <h1 className="font-display text-4xl md:text-5xl font-semibold tracking-tight">
              Olá, {user.name.split(" ")[0]}.
            </h1>
            <p className="mt-3 text-foreground/60">
              {user.department ? `${user.department} · ` : ""}
              {user.email}
            </p>
          </div>
          <LogoutButton />
        </div>

        {/* Stat cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-5 mb-12">
          <StatCard
            icon={Trophy}
            label="Nível"
            value={user.level}
            sub={`${user.xp} XP acumulado`}
          />
          <StatCard
            icon={Flame}
            label="Sequência"
            value={user.streak}
            sub="dias consecutivos"
          />
          <StatCard
            icon={Target}
            label="Trilha"
            value="0/12"
            sub="módulos concluídos"
          />
        </div>

        {/* Coming soon — gameficação */}
        <div className="relative overflow-hidden rounded-3xl border border-accent/20 bg-surface-elevated p-12 md:p-16 glow-border">
          <div className="absolute inset-0 bg-grid-pattern [background-size:32px_32px] opacity-30" />
          <div className="absolute right-0 top-0 h-[300px] w-[400px] rounded-full bg-accent/10 blur-[100px]" />

          <div className="relative max-w-2xl">
            <div className="inline-flex items-center gap-2 rounded-full border border-accent/30 bg-accent/5 px-3 py-1 text-xs font-mono text-accent uppercase tracking-wider mb-6">
              <Lock className="h-3 w-3" />
              Em breve
            </div>
            <h2 className="font-display text-3xl md:text-5xl font-semibold tracking-tight text-balance">
              A trilha gameficada está chegando.
            </h2>
            <p className="mt-6 text-foreground/60 leading-relaxed text-lg">
              Você fez sua parte: criou sua conta e está pronto para começar.
              Estamos finalizando os módulos interativos, simulações de
              phishing, quizzes e o sistema de ranking entre equipes. Você
              receberá uma notificação assim que o conteúdo for liberado.
            </p>

            <div className="mt-10 grid grid-cols-1 sm:grid-cols-3 gap-4">
              {[
                { title: "12 módulos", text: "trilha completa" },
                { title: "Simulações", text: "phishing real" },
                { title: "Ranking", text: "entre equipes" },
              ].map((item) => (
                <div
                  key={item.title}
                  className="rounded-2xl border border-surface-border bg-background/60 backdrop-blur p-5"
                >
                  <p className="font-display text-xl font-semibold text-accent">
                    {item.title}
                  </p>
                  <p className="text-xs text-foreground/50 mt-1">{item.text}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

function StatCard({
  icon: Icon,
  label,
  value,
  sub,
}: {
  icon: React.ComponentType<{ className?: string; strokeWidth?: number }>;
  label: string;
  value: string | number;
  sub: string;
}) {
  return (
    <div className="rounded-2xl border border-surface-border bg-surface-elevated/50 p-6 card-hover">
      <div className="flex items-center justify-between mb-6">
        <p className="font-mono text-[10px] uppercase tracking-wider text-foreground/40">
          {label}
        </p>
        <div className="flex h-9 w-9 items-center justify-center rounded-lg border border-accent/20 bg-accent/5">
          <Icon className="h-4 w-4 text-accent" strokeWidth={2} />
        </div>
      </div>
      <p className="font-display text-4xl font-semibold tracking-tight">
        {value}
      </p>
      <p className="mt-2 text-xs text-foreground/50">{sub}</p>
    </div>
  );
}
