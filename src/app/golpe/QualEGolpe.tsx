"use client";

import { useState } from "react";
import { RODADAS, type Mensagem, type Trecho } from "@/lib/golpes";

const CANAL_ICONE: Record<Mensagem["canal"], string> = {
  sms: "SMS",
  whatsapp: "WhatsApp",
  email: "E-mail",
};

/** Renderiza o texto marcando os sinais depois que a resposta foi dada. */
function Texto({
  trechos,
  revelado,
  destaque,
}: {
  trechos: Trecho[];
  revelado: boolean;
  destaque: "red" | "green";
}) {
  return (
    <>
      {trechos.map((t, i) => {
        if (typeof t === "string") return <span key={i}>{t}</span>;
        if (!revelado) return <span key={i}>{t.texto}</span>;

        const cor =
          destaque === "red"
            ? "bg-signal-redDim text-signal-red decoration-signal-red/60"
            : "bg-signal-greenDim text-signal-green decoration-signal-green/60";

        return (
          <mark
            key={i}
            className={`rounded-[2px] px-1 underline decoration-dotted underline-offset-4 ${cor}`}
          >
            {t.texto}
            <sup className="ml-0.5 font-mono text-[0.625rem] font-semibold">
              {t.sinal}
            </sup>
          </mark>
        );
      })}
    </>
  );
}

function Cartao({
  msg,
  revelado,
  escolhido,
  onEscolher,
  disabled,
}: {
  msg: Mensagem;
  revelado: boolean;
  escolhido: boolean;
  onEscolher: () => void;
  disabled: boolean;
}) {
  const destaque = msg.golpe ? "red" : "green";
  const borda = !revelado
    ? escolhido
      ? "border-signal-amber"
      : "border-line"
    : msg.golpe
      ? "border-signal-red/60"
      : "border-signal-green/60";

  return (
    <div className={`flex flex-col rounded-sm border bg-panel ${borda}`}>
      <div className="flex items-center justify-between gap-3 border-b border-line px-4 py-2.5">
        <span className="label-field">{CANAL_ICONE[msg.canal]}</span>
        <span className="font-mono text-[0.625rem] uppercase tracking-[0.14em] text-ink-3">
          exemplo ilustrativo
        </span>
      </div>

      <div className="space-y-3 px-4 py-4">
        {msg.campos.map((c) => (
          <div key={c.rotulo} className="flex flex-wrap gap-x-3 gap-y-1">
            <span className="label-field pt-0.5">{c.rotulo}</span>
            <span className="font-mono text-sm text-ink-2">
              <Texto trechos={c.valor} revelado={revelado} destaque={destaque} />
            </span>
          </div>
        ))}
      </div>

      <div className="flex-1 space-y-3 border-t border-line px-4 py-4 text-body leading-relaxed text-ink">
        {msg.corpo.map((par, i) => (
          <p key={i}>
            <Texto trechos={par} revelado={revelado} destaque={destaque} />
          </p>
        ))}
      </div>

      <div className="border-t border-line p-4">
        {!revelado ? (
          <button
            type="button"
            onClick={onEscolher}
            disabled={disabled}
            className="min-h-touch w-full rounded-sm border border-line-strong px-4 py-3 font-mono text-sm text-ink transition-colors duration-200 hover:border-signal-amber hover:text-signal-amber"
          >
            Esta é a fraude
          </button>
        ) : (
          <p
            className={`font-mono text-sm ${
              msg.golpe ? "text-signal-red" : "text-signal-green"
            }`}
          >
            {msg.golpe ? "Fraude" : "Legítima"}
          </p>
        )}
      </div>
    </div>
  );
}

function Legenda({ msg }: { msg: Mensagem }) {
  return (
    <div className="rounded-sm border border-line bg-panel/60 p-5">
      <p
        className={`font-mono text-sm ${
          msg.golpe ? "text-signal-red" : "text-signal-green"
        }`}
      >
        {msg.veredito}
      </p>
      <ol className="mt-4 space-y-3.5">
        {msg.sinais.map((s) => (
          <li key={s.n} className="flex gap-3">
            <span
              className={`mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-[2px] font-mono text-[0.6875rem] font-semibold ${
                msg.golpe
                  ? "bg-signal-redDim text-signal-red"
                  : "bg-signal-greenDim text-signal-green"
              }`}
            >
              {s.n}
            </span>
            <p className="text-sm leading-relaxed text-ink-2">
              <strong className="font-semibold text-ink">{s.titulo}.</strong>{" "}
              {s.texto}
            </p>
          </li>
        ))}
      </ol>
    </div>
  );
}

export function QualEGolpe() {
  const [respostas, setRespostas] = useState<Record<string, string>>({});

  return (
    <div className="space-y-20">
      {RODADAS.map((r, idx) => {
        const escolhaId = respostas[r.id];
        const revelado = Boolean(escolhaId);
        const escolhida = r.mensagens.find((m) => m.id === escolhaId);
        const acertou = escolhida?.golpe ?? false;

        return (
          <section key={r.id} aria-labelledby={`rodada-${r.id}`}>
            <p className="label-field">
              <span className="text-signal-amber">
                {String(idx + 1).padStart(2, "0")}
              </span>{" "}
              de {String(RODADAS.length).padStart(2, "0")}
            </p>
            <h2
              id={`rodada-${r.id}`}
              className="mt-3 font-mono text-2xl font-semibold text-balance md:text-3xl"
            >
              {r.titulo}
            </h2>
            <p className="mt-3 max-w-2xl text-body text-ink-2 text-pretty">
              {r.contexto}
            </p>

            <div className="mt-8 grid gap-5 md:grid-cols-2">
              {r.mensagens.map((m) => (
                <Cartao
                  key={m.id}
                  msg={m}
                  revelado={revelado}
                  escolhido={escolhaId === m.id}
                  disabled={revelado}
                  onEscolher={() =>
                    setRespostas((p) => ({ ...p, [r.id]: m.id }))
                  }
                />
              ))}
            </div>

            {revelado && (
              <div className="mt-6" aria-live="polite">
                <div
                  className={`rounded-sm border px-5 py-4 ${
                    acertou
                      ? "border-signal-green/40 bg-signal-greenDim/60"
                      : "border-signal-amber/40 bg-signal-amberDim/60"
                  }`}
                >
                  <p
                    className={`font-mono text-sm font-medium ${
                      acertou ? "text-signal-green" : "text-signal-amber"
                    }`}
                  >
                    {acertou
                      ? "Você apontou a fraude."
                      : "Você apontou a mensagem legítima — e é exatamente por isso que esse golpe funciona tanto."}
                  </p>
                  <p className="mt-2 text-sm leading-relaxed text-ink-2">
                    {acertou
                      ? "Agora repare em onde estavam as pistas: elas estão marcadas nos dois textos."
                      : "Ninguém acerta por ser esperto; acerta por saber onde olhar. As pistas estão marcadas nos dois textos abaixo."}
                  </p>
                </div>

                <div className="mt-5 grid gap-5 md:grid-cols-2">
                  {r.mensagens.map((m) => (
                    <Legenda key={m.id} msg={m} />
                  ))}
                </div>

                <div className="mt-5 border-l-2 border-signal-amber bg-panel/60 px-5 py-4">
                  <p className="label-field text-signal-amber">
                    O que levar dessa rodada
                  </p>
                  <p className="mt-2 text-body leading-relaxed text-ink-2">
                    {r.licao}
                  </p>
                </div>

                <button
                  type="button"
                  onClick={() =>
                    setRespostas((p) => {
                      const { [r.id]: _, ...resto } = p;
                      return resto;
                    })
                  }
                  className="mt-5 min-h-touch rounded-sm border border-line px-4 py-2.5 font-mono text-sm text-ink-3 transition-colors duration-200 hover:border-line-strong hover:text-ink-2"
                >
                  Refazer esta rodada
                </button>
              </div>
            )}
          </section>
        );
      })}
    </div>
  );
}
