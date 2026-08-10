"use client";

import { useEffect, useMemo, useRef, useState, useId } from "react";
import { GRUPOS, VERBETES } from "@/lib/glossario";
import { TextoRico } from "@/components/ui/TextoRico";

/**
 * O conteúdo inteiro é renderizado no servidor mesmo sendo client component,
 * então o glossário continua legível e navegável por âncora sem JavaScript.
 * A busca e o realce do índice são melhoria progressiva.
 *
 * Layout: índice fixo na coluna da esquerda, verbetes correndo à direita.
 * A busca mora dentro do índice de propósito — quando ela era uma barra
 * grudada no topo da coluna de leitura, cada rolagem escondia uma faixa do
 * texto atrás dela.
 */

/**
 * Ignora acento e caixa, porque ninguém digita "força bruta" com cedilha na
 * pressa.
 *
 * `normalize("NFD")` separa a letra do acento; `\p{Mn}` casa exatamente as
 * marcas que sobraram. Usar a propriedade Unicode em vez de um intervalo
 * literal mantém o fonte só com ASCII — intervalo de caracteres combinantes
 * é invisível no editor e quebra sem ninguém perceber se o arquivo for
 * salvo na codificação errada.
 */
function normalizar(s: string) {
  return s
    .toLowerCase()
    .normalize("NFD")
    .replace(/\p{Mn}/gu, "");
}

export function ListaGlossario() {
  const [busca, setBusca] = useState("");
  const [ativo, setAtivo] = useState<string | null>(null);
  const campoId = useId();
  const listaRef = useRef<HTMLDivElement>(null);

  const filtrados = useMemo(() => {
    const q = normalizar(busca.trim());
    if (!q) return VERBETES;
    return VERBETES.filter((v) =>
      normalizar(
        `${v.termo} ${v.tambem ?? ""} ${v.definicao} ${v.importa}`,
      ).includes(q),
    );
  }, [busca]);

  // Realce do índice conforme o verbete entra na tela. A faixa estreita no
  // topo evita que dois verbetes disputem o destaque ao mesmo tempo.
  useEffect(() => {
    const alvos = listaRef.current?.querySelectorAll("[data-verbete]");
    if (!alvos?.length) return;

    const obs = new IntersectionObserver(
      (entradas) => {
        const visivel = entradas
          .filter((e) => e.isIntersecting)
          .sort((a, b) => a.boundingClientRect.top - b.boundingClientRect.top)[0];
        if (visivel) setAtivo(visivel.target.id);
      },
      { rootMargin: "-80px 0px -70% 0px" },
    );

    alvos.forEach((el) => obs.observe(el));
    return () => obs.disconnect();
  }, [filtrados]);

  const gruposVisiveis = GRUPOS.map((g) => ({
    ...g,
    verbetes: filtrados.filter((v) => v.grupo === g.id),
  })).filter((g) => g.verbetes.length > 0);

  const campoBusca = (
    <div>
      <label htmlFor={campoId} className="label-field block">
        Buscar termo
      </label>
      <input
        id={campoId}
        type="search"
        value={busca}
        onChange={(e) => setBusca(e.target.value)}
        placeholder="cadeado, chip, pix…"
        className="mt-2 min-h-touch w-full rounded-sm border border-line-strong bg-panel px-3 font-mono text-sm text-ink
                   transition-colors duration-200 placeholder:text-ink-3 hover:border-ink-3
                   focus:border-signal-amber focus:outline-none focus-visible:outline-none"
      />
      <p className="mt-2 font-mono text-xs text-ink-3" aria-live="polite">
        {busca.trim()
          ? `${filtrados.length} de ${VERBETES.length} termos`
          : `${VERBETES.length} termos`}
      </p>
    </div>
  );

  const indice = (
    <nav aria-label="Índice do glossário" className="mt-8 space-y-6">
      {gruposVisiveis.map((g) => (
        <div key={g.id}>
          <p className="label-field">{g.titulo}</p>
          <ul className="mt-2 space-y-px">
            {g.verbetes.map((v) => {
              const atual = ativo === v.id;
              return (
                <li key={v.id}>
                  <a
                    href={`#${v.id}`}
                    aria-current={atual ? "true" : undefined}
                    className={`block border-l-2 py-1.5 pl-3 font-mono text-sm transition-colors duration-200 ${
                      atual
                        ? "border-signal-amber text-ink"
                        : "border-transparent text-ink-3 hover:border-line-strong hover:text-ink-2"
                    }`}
                  >
                    {v.termo}
                  </a>
                </li>
              );
            })}
          </ul>
        </div>
      ))}
    </nav>
  );

  return (
    <div className="grid gap-10 lg:grid-cols-[15rem_minmax(0,1fr)] lg:gap-14">
      {/* Índice — fixo no desktop, recolhido no celular */}
      <aside className="lg:sticky lg:top-20 lg:max-h-[calc(100vh-6rem)] lg:self-start lg:overflow-y-auto lg:pb-8">
        {campoBusca}

        <details className="mt-6 lg:hidden">
          <summary className="flex min-h-touch cursor-pointer items-center font-mono text-sm text-ink-2">
            Ver índice dos termos
          </summary>
          {indice}
        </details>

        <div className="hidden lg:block">{indice}</div>
      </aside>

      {/* Verbetes */}
      <div ref={listaRef}>
        {filtrados.length === 0 && (
          <p className="text-body text-ink-2">
            Nenhum termo com essa palavra. Se é algo que você viu por aí e não
            está aqui, vale nos avisar — a lista cresce conforme aparecem
            dúvidas.
          </p>
        )}

        <div className="space-y-14">
          {gruposVisiveis.map((g) => (
            <section key={g.id} aria-labelledby={`grupo-${g.id}`}>
              <h2
                id={`grupo-${g.id}`}
                className="font-mono text-xl font-semibold text-balance md:text-2xl"
              >
                {g.titulo}
              </h2>
              <p className="mt-2 text-body text-ink-2 text-pretty">
                {g.descricao}
              </p>

              <dl className="mt-6 divide-y divide-line border-y border-line">
                {g.verbetes.map((v) => (
                  <div
                    key={v.id}
                    id={v.id}
                    data-verbete
                    className="verbete scroll-mt-24 py-7"
                  >
                    <dt className="flex flex-wrap items-baseline gap-x-3 gap-y-1">
                      <span className="font-mono text-lg font-semibold">
                        {v.termo}
                      </span>
                      {v.tambem && (
                        <span className="font-mono text-sm text-ink-3">
                          também: {v.tambem}
                        </span>
                      )}
                    </dt>
                    <dd className="mt-3">
                      <p className="text-body leading-relaxed text-ink-2 text-pretty">
                        <TextoRico>{v.definicao}</TextoRico>
                      </p>
                      <div className="mt-4 border-l-2 border-line-strong py-1 pl-4">
                        <p className="label-field">Por que isso importa</p>
                        <p className="mt-1.5 text-body leading-relaxed text-ink-2 text-pretty">
                          <TextoRico>{v.importa}</TextoRico>
                        </p>
                      </div>
                    </dd>
                  </div>
                ))}
              </dl>
            </section>
          ))}
        </div>
      </div>
    </div>
  );
}
