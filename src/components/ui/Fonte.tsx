/**
 * Citação de fonte para qualquer número exibido no site.
 *
 * Regra do projeto: nenhum dado numérico aparece sem passar por aqui. Se não
 * há fonte primária, ano e link verificável, o número não entra na página.
 */
export function Fonte({
  autor,
  obra,
  ano,
  href,
}: {
  autor: string;
  obra: string;
  ano: string | number;
  href?: string;
}) {
  const texto = `${autor}, ${obra}, ${ano}`;

  return (
    <p className="mt-3 font-mono text-xs leading-relaxed text-ink-3">
      <span className="uppercase tracking-[0.14em]">Fonte:</span>{" "}
      {href ? (
        <a
          href={href}
          target="_blank"
          rel="noopener noreferrer"
          className="underline decoration-line-strong underline-offset-4 transition-colors hover:text-ink-2 hover:decoration-signal-amber"
        >
          {texto}
        </a>
      ) : (
        texto
      )}
    </p>
  );
}

/**
 * Marca visível para link oficial que ainda não foi conferido por uma pessoa.
 * Aparece na tela de propósito: é melhor o usuário ver "confira antes" do que
 * receber uma URL inventada com cara de oficial.
 */
export function PendenteVerificacao({ children }: { children: React.ReactNode }) {
  return (
    <span className="inline-flex items-center gap-2 rounded-sm border border-signal-amber/40 bg-signal-amberDim px-2 py-0.5 font-mono text-xs text-signal-amber">
      <span aria-hidden="true">⚑</span>
      {children}
    </span>
  );
}
