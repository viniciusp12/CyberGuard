import Link from "next/link";

export default function NotFound() {
  return (
    <section className="min-h-[calc(100vh-5rem)] flex items-center justify-center py-24">
      <div className="container-page text-center max-w-xl">
        <p className="font-mono text-xs uppercase tracking-[0.25em] text-accent mb-6">
          — Erro 404
        </p>
        <h1 className="font-display text-6xl md:text-8xl font-semibold tracking-tighter">
          Página não encontrada
        </h1>
        <p className="mt-6 text-foreground/60 text-lg">
          O conteúdo que você procura pode ter sido movido ou nunca existiu.
        </p>
        <Link
          href="/"
          className="mt-10 inline-flex items-center gap-2 rounded-full bg-accent px-8 py-4 text-sm font-medium text-background hover:bg-accent/90 transition-all"
        >
          Voltar ao início
        </Link>
      </div>
    </section>
  );
}
