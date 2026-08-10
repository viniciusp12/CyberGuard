import type { Metadata } from "next";
import { redirect } from "next/navigation";
import { getCurrentUser } from "@/lib/auth";
import { LogoutButton } from "./LogoutButton";

export const metadata: Metadata = {
  title: "Painel",
  description: "Seu painel CyberGuard",
};

export default async function DashboardPage() {
  const user = await getCurrentUser();
  if (!user) redirect("/login");

  const metricas = [
    { rotulo: "Nível", valor: String(user.level), sub: `${user.xp} XP` },
    { rotulo: "Sequência", valor: String(user.streak), sub: "dias seguidos" },
    { rotulo: "Trilha", valor: "0/12", sub: "módulos concluídos" },
  ];

  return (
    <section className="py-14 md:py-20">
      <div className="container-page">
        <div className="flex flex-col gap-6 md:flex-row md:items-end md:justify-between">
          <div>
            <p className="label-field">Painel</p>
            <h1 className="mt-3 font-mono text-title font-semibold">
              Olá, {user.name.split(" ")[0]}.
            </h1>
            <p className="mt-3 font-mono text-sm text-ink-3">
              {user.department ? `${user.department} · ` : ""}
              {user.email}
            </p>
          </div>
          <LogoutButton />
        </div>

        <dl className="mt-12 grid gap-px border border-line bg-line md:grid-cols-3">
          {metricas.map((m) => (
            <div key={m.rotulo} className="bg-panel p-6">
              <dt className="label-field">{m.rotulo}</dt>
              <dd className="mt-3 font-mono text-4xl font-semibold tabular-nums">
                {m.valor}
              </dd>
              <p className="mt-2 font-mono text-xs text-ink-3">{m.sub}</p>
            </div>
          ))}
        </dl>

        <div className="mt-10 rounded-sm border border-line bg-panel p-8 md:p-10">
          <p className="label-field text-signal-amber">Em construção</p>
          <h2 className="mt-4 max-w-2xl font-mono text-2xl font-semibold text-balance md:text-3xl">
            A trilha gamificada ainda não está pronta
          </h2>
          <p className="mt-5 max-w-2xl text-body leading-relaxed text-ink-2 text-pretty">
            Enquanto os módulos não chegam, o conteúdo que já vale a sua meia
            hora está todo aberto e sem login: o teste de senha, os quatro pares
            de mensagens, a anatomia da clonagem de WhatsApp e o checklist.
          </p>
          <p className="mt-4 max-w-2xl text-body leading-relaxed text-ink-2">
            Os números acima ainda são zerados de propósito — nenhum deles é
            simulado.
          </p>
        </div>
      </div>
    </section>
  );
}
