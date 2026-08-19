import Link from "next/link";

const COLUNAS = [
  {
    titulo: "Seções",
    links: [
      { href: "/senha", label: "01 · Teste de senha" },
      { href: "/golpe", label: "02 · Qual deles é golpe?" },
      { href: "/anatomia", label: "03 · Anatomia de um golpe" },
      { href: "/ia", label: "04 · Inteligência artificial" },
      { href: "/agora", label: "05 · O que fazer agora" },
      { href: "/ja-cai", label: "06 · Já caí num golpe" },
    ],
  },
  {
    titulo: "Projeto",
    links: [
      { href: "/glossario", label: "Glossário de termos" },
      { href: "/no-trabalho", label: "Os mesmos golpes no trabalho" },
      { href: "/sobre", label: "Sobre o projeto" },
      { href: "/contato", label: "Contato" },
    ],
  },
];

export function Footer() {
  return (
    <footer className="mt-auto border-t border-chumbo-linha bg-chumbo-painel/40">
      <div className="container-page py-14">
        <div className="grid gap-10 md:grid-cols-[minmax(0,1.3fr)_repeat(2,minmax(0,1fr))]">
          <div>
            <p className="font-display text-base font-semibold">CIFRA</p>
            <p className="mt-4 max-w-sm text-sm leading-relaxed text-papel-2">
              Um site sobre golpes digitais no Brasil, feito para ser lido por
              qualquer pessoa. Tudo que é interativo aqui roda dentro do seu
              navegador.
            </p>

            <div className="mt-6 rounded-sm border border-chumbo-linha p-4">
              <p className="etiqueta text-menta">Privacidade</p>
              <p className="mt-2 text-sm leading-relaxed text-papel-2">
                Este site não tem analytics, não tem rastreador de terceiros e
                não coleta nada sobre a sua visita. As senhas digitadas na
                seção 01 e os dados exibidos na home nunca saem do seu aparelho
                — ao contrário do que acontece quando você conversa com uma IA,
                assunto da seção 04.
              </p>
            </div>
          </div>

          {COLUNAS.map((col) => (
            <nav key={col.titulo} aria-label={col.titulo}>
              <h2 className="etiqueta">{col.titulo}</h2>
              <ul className="mt-4 space-y-1">
                {col.links.map((l) => (
                  <li key={l.href}>
                    <Link
                      href={l.href}
                      className="flex min-h-touch items-center font-display text-sm text-papel-2 transition-colors duration-200 hover:text-papel"
                    >
                      {l.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </nav>
          ))}
        </div>

        <div className="mt-12 flex flex-col gap-3 border-t border-chumbo-linha pt-6 md:flex-row md:items-center md:justify-between">
          <p className="text-xs leading-relaxed text-papel-3">
            © {new Date().getFullYear()} CIFRA · Projeto acadêmico de
            Defesa Cibernética em parceria com a Leroy Merlin.
          </p>
          <p className="font-display text-xs text-papel-3">
            Conteúdo educativo — não substitui orientação jurídica ou do seu
            banco.
          </p>
        </div>
      </div>
    </footer>
  );
}
