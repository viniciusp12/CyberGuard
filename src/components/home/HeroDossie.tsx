"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { useReducedMotion } from "framer-motion";
import { Termo } from "@/components/ui/Termo";
import {
  coletarDossie,
  lerCamposVivos,
  apagarVisita,
  NAO_VISIVEL,
  type Entrada,
} from "@/lib/dossie";

/** Intervalo entre as linhas da cascata. */
const PASSO_MS = 140;

export function HeroDossie() {
  const semMovimento = useReducedMotion();
  const [entradas, setEntradas] = useState<Entrada[] | null>(null);
  const [vivos, setVivos] = useState<Record<string, string>>({});
  const [apagado, setApagado] = useState(false);

  useEffect(() => {
    // Sem trava de "já rodou": a coleta é barata e idempotente, e a resposta
    // de "já esteve aqui" é decidida uma vez só dentro de `lerEMarcarVisita`.
    // A versão anterior tinha uma trava por `useRef` que, combinada com o
    // cancelamento abaixo, deixava o dossiê vazio ao voltar para a home por
    // navegação — a segunda montagem saía cedo e a primeira já tinha sido
    // cancelada, então nada preenchia a lista.
    let ativo = true;

    coletarDossie().then((lista) => {
      if (!ativo) return;
      setEntradas(lista);
      setVivos(lerCamposVivos());
    });

    return () => {
      ativo = false;
    };
  }, []);

  // Campos que mudam sozinhos: relógio a cada segundo, janela a cada resize.
  useEffect(() => {
    if (!entradas) return;
    const atualizar = () => setVivos(lerCamposVivos());
    const timer = window.setInterval(atualizar, 1000);
    window.addEventListener("resize", atualizar);
    return () => {
      window.clearInterval(timer);
      window.removeEventListener("resize", atualizar);
    };
  }, [entradas]);

  function handleApagar() {
    if (apagarVisita()) {
      setApagado(true);
      setEntradas(
        (atual) =>
          atual?.map((e) =>
            e.id === "visita" ? { ...e, valor: "primeira visita" } : e,
          ) ?? null,
      );
    }
  }

  const total = entradas?.length ?? 0;
  const duracaoCascata = semMovimento ? 0 : (total * PASSO_MS) / 1000;

  return (
    <section className="relative border-b border-line pt-16 pb-20 md:pt-24 md:pb-28">
      <div className="container-page">
        <div className="grid gap-x-16 gap-y-14 lg:grid-cols-[minmax(0,1fr)_minmax(0,1.05fr)] lg:items-start">
          {/* Coluna da manchete */}
          <div className="lg:sticky lg:top-28">
            <p className="label-field flex flex-wrap items-center gap-x-3 gap-y-1">
              <span className="text-signal-amber">
                coleta local
                <span
                  aria-hidden="true"
                  className="ml-1 inline-block animate-caret"
                >
                  _
                </span>
              </span>
              <span aria-hidden="true" className="text-line-strong">
                ·
              </span>
              <span>destino: nenhum</span>
            </p>

            <h1 className="mt-6 font-mono text-hero font-semibold text-balance">
              Você já está{" "}
              <span className="text-signal-amber">exposto</span>.
            </h1>

            <p className="mt-7 max-w-xl text-bodyLg text-ink-2 text-pretty">
              Você abriu esta página e não digitou nada. Ainda assim, ela já
              montou o dossiê ao lado — e qualquer outro site que você abrir hoje
              consegue montar o mesmo, sem avisar.
            </p>

            <div className="mt-8 flex flex-wrap gap-3">
              <Link
                href="#a-virada"
                className="inline-flex min-h-touch items-center rounded-sm bg-signal-amber px-6 py-3 font-mono text-sm font-medium text-page transition-colors duration-200 hover:bg-[#F2B558]"
              >
                Entender o que isso significa
              </Link>
              <Link
                href="/ja-cai"
                className="inline-flex min-h-touch items-center rounded-sm border border-signal-red/50 px-6 py-3 font-mono text-sm text-signal-red transition-colors duration-200 hover:bg-signal-redDim"
              >
                Já caí num golpe
              </Link>
            </div>
          </div>

          {/* Coluna do dossiê */}
          <div>
            <div className="rounded-sm border border-line bg-panel">
              <div className="flex items-center justify-between gap-4 border-b border-line px-5 py-3">
                <p className="label-field">Dossiê montado no seu navegador</p>
                <p className="font-mono text-[0.6875rem] text-ink-3">
                  {total > 0 ? `${total} campos` : "lendo…"}
                </p>
              </div>

              <dl
                className="divide-y divide-line"
                style={{ minHeight: entradas ? undefined : "32rem" }}
              >
                {entradas?.map((e, i) => {
                  const valor = e.vivo ? (vivos[e.id] ?? e.valor) : e.valor;
                  return (
                    <div
                      key={e.id}
                      className={semMovimento ? undefined : "mask-in"}
                      style={
                        semMovimento
                          ? undefined
                          : { animationDelay: `${i * PASSO_MS}ms` }
                      }
                    >
                      <div className="flex flex-wrap items-baseline justify-between gap-x-6 gap-y-1 px-5 pt-4">
                        <dt className="label-field">{e.label}</dt>
                        <dd
                          className={`font-mono text-sm ${
                            e.available ? "text-ink" : "text-ink-3 italic"
                          }`}
                        >
                          {valor}
                        </dd>
                      </div>
                      <p className="px-5 pb-4 pt-1.5 text-sm leading-relaxed text-ink-3">
                        {e.nota}
                      </p>
                    </div>
                  );
                })}

                {!entradas && (
                  <div className="px-5 py-6">
                    <p className="font-mono text-sm text-ink-3">
                      Lendo o que o navegador entrega sem pedir…
                    </p>
                  </div>
                )}
              </dl>
            </div>

            {/* Aviso de privacidade: na tela, ao lado do dado, não no rodapé. */}
            <div className="mt-4 rounded-sm border border-signal-green/30 bg-signal-greenDim/60 p-5">
              <p className="label-field text-signal-green">
                O que acontece com esses dados
              </p>
              <p className="mt-2.5 text-sm leading-relaxed text-ink-2">
                <strong className="font-semibold text-ink">Nada.</strong> Esta
                página não envia nenhuma dessas informações para lugar nenhum:
                não há requisição de rede, não há servidor recebendo, não há
                registro. Tudo o que você vê acima foi lido e desenhado dentro do
                seu próprio navegador e some quando você fechar a aba.
              </p>
              <p className="mt-3 text-sm leading-relaxed text-ink-2">
                A única exceção é a última linha. Para mostrar como um site
                reconhece quem volta, gravamos uma marca no seu aparelho — no{" "}
                <Termo id="armazenamento-local">armazenamento local</Termo> do
                navegador, nada além de “esteve aqui”. Ela também nunca sai
                daqui.
              </p>
              <div className="mt-4 flex flex-wrap items-center gap-3">
                <button
                  type="button"
                  onClick={handleApagar}
                  disabled={apagado}
                  className="inline-flex min-h-touch items-center rounded-sm border border-line-strong px-4 py-2 font-mono text-sm text-ink transition-colors duration-200 hover:bg-panel-raised disabled:cursor-default disabled:border-line disabled:text-ink-3"
                >
                  {apagado ? "Marca apagada" : "Apagar essa marca agora"}
                </button>
                {apagado && (
                  <span className="font-mono text-sm text-signal-green">
                    Pronto. Você voltou a ser um desconhecido.
                  </span>
                )}
              </div>
            </div>

            {/* O contraponto. Sem ele a lista de cima vira alarmismo. */}
            <div className="mt-4 rounded-sm border border-line bg-panel/60 p-5">
              <p className="label-field">O que esta página não consegue ver</p>
              <p className="mt-2.5 text-sm leading-relaxed text-ink-2">
                Tão importante quanto a lista de cima. Saber onde ficam os
                limites é o que permite reconhecer quem blefa sobre saber mais
                do que dá para saber.
              </p>

              <dl className="mt-4 divide-y divide-line border-t border-line">
                {NAO_VISIVEL.map((n) => (
                  <div key={n.item} className="py-3.5">
                    <dt className="flex gap-2.5 font-mono text-sm text-ink">
                      <span aria-hidden="true" className="text-signal-green">
                        ✕
                      </span>
                      {n.item}
                    </dt>
                    <dd className="mt-1.5 pl-6 text-sm leading-relaxed text-ink-3">
                      {n.porque}
                    </dd>
                  </div>
                ))}
              </dl>
            </div>
          </div>
        </div>

        {/* A virada */}
        <div
          id="a-virada"
          className="mt-20 border-t border-line pt-12 md:mt-28 md:pt-16"
          style={
            semMovimento
              ? undefined
              : { animationDelay: `${duracaoCascata + 0.2}s` }
          }
        >
          <div className="max-w-3xl">
            <p className="label-field">A virada</p>
            <p className="mt-5 font-mono text-title text-balance">
              Você não digitou nada.{" "}
              <span className="text-ink-2">
                Nada disso saiu do seu navegador — mas qualquer site que você
                abre consegue ver.
              </span>
            </p>
            <p className="mt-7 max-w-2xl text-bodyLg text-ink-2 text-pretty">
              Isso não é invasão nem falha: é como a web funciona. Cada linha
              sozinha é banal — juntas, elas viram uma etiqueta que identifica
              você entre milhões, técnica que tem nome:{" "}
              <Termo id="fingerprinting">fingerprinting</Termo>. O problema
              começa quando alguém usa esses pedaços para escrever uma mensagem
              sob medida — no seu idioma, no seu horário, citando o seu aparelho
              — e você acredita porque parece pessoal demais para ser golpe.
            </p>
            <p className="mt-5 max-w-2xl text-bodyLg text-ink-2 text-pretty">
              Repare que alguns números da lista podem não bater com o seu
              aparelho de verdade — e que abrir esta página numa janela anônima
              muda a resposta. Não é erro: é o seu navegador embaralhando os
              dados de propósito para dificultar que a combinação vire uma
              etiqueta única. A defesa existe, está ligada e funcionando.
            </p>
            <p className="mt-5 max-w-2xl text-bodyLg text-ink-2 text-pretty">
              As próximas páginas mostram como essa mensagem é montada, como
              reconhecê-la, e o que fazer se ela já tiver funcionado com você.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
