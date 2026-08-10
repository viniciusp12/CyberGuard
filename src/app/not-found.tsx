import Link from "next/link";

export default function NotFound() {
  return (
    <section className="flex min-h-[calc(100vh-4rem)] items-center py-20">
      <div className="container-read">
        <p className="label-field text-signal-amber">404</p>
        <h1 className="mt-4 font-mono text-title font-semibold text-balance">
          Essa página não existe
        </h1>
        <p className="mt-5 text-bodyLg text-ink-2 text-pretty">
          O endereço pode ter mudado ou nunca ter existido. Se você chegou aqui
          por um link recebido em mensagem, vale desconfiar dele.
        </p>

        <div className="mt-8 flex flex-wrap gap-3">
          <Link
            href="/"
            className="inline-flex min-h-touch items-center rounded-sm bg-signal-amber px-6 py-3 font-mono text-sm font-medium text-page transition-colors duration-200 hover:bg-[#F2B558]"
          >
            Voltar ao início
          </Link>
          <Link
            href="/ja-cai"
            className="inline-flex min-h-touch items-center rounded-sm border border-signal-red/50 px-6 py-3 font-mono text-sm text-signal-red transition-colors duration-200 hover:bg-signal-redDim"
          >
            Já caí num golpe
          </Link>
        </div>
      </div>
    </section>
  );
}
