import Link from "next/link";
import { ShieldCheck, Github, Linkedin, Mail } from "lucide-react";

const FOOTER_COLS = [
  {
    title: "Plataforma",
    links: [
      { href: "/sobre", label: "Quem somos" },
      { href: "/ameacas", label: "Ameaças" },
      { href: "/prevencao", label: "Prevenção" },
    ],
  },
  {
    title: "Recursos",
    links: [
      { href: "/contato", label: "Contato" },
      { href: "/login", label: "Entrar" },
      { href: "/registro", label: "Criar conta" },
    ],
  },
  {
    title: "Parceria",
    links: [
      { href: "https://www.leroymerlin.com.br", label: "Leroy Merlin" },
      { href: "/sobre", label: "Challenge" },
    ],
  },
];

export function Footer() {
  return (
    <footer className="border-t border-surface-border bg-surface mt-24">
      <div className="container-page py-16">
        <div className="grid grid-cols-1 md:grid-cols-5 gap-10">
          <div className="md:col-span-2">
            <Link href="/" className="flex items-center gap-2">
              <ShieldCheck className="h-6 w-6 text-accent" strokeWidth={2.25} />
              <span className="font-display text-lg font-semibold">CyberGuard</span>
            </Link>
            <p className="mt-4 max-w-sm text-sm text-foreground/60 leading-relaxed">
              Plataforma de conscientização em segurança cibernética desenvolvida
              em parceria com a Leroy Merlin para fortalecer a cultura de
              segurança entre colaboradores.
            </p>
            <div className="mt-6 flex items-center gap-3">
              <a
                href="mailto:contato@cyberguard.dev"
                aria-label="Email"
                className="p-2 rounded-lg border border-surface-border hover:border-accent/50 hover:text-accent transition-colors"
              >
                <Mail className="h-4 w-4" />
              </a>
              <a
                href="#"
                aria-label="GitHub"
                className="p-2 rounded-lg border border-surface-border hover:border-accent/50 hover:text-accent transition-colors"
              >
                <Github className="h-4 w-4" />
              </a>
              <a
                href="#"
                aria-label="LinkedIn"
                className="p-2 rounded-lg border border-surface-border hover:border-accent/50 hover:text-accent transition-colors"
              >
                <Linkedin className="h-4 w-4" />
              </a>
            </div>
          </div>

          {FOOTER_COLS.map((col) => (
            <div key={col.title}>
              <h4 className="font-display text-sm font-semibold uppercase tracking-wider text-foreground/90">
                {col.title}
              </h4>
              <ul className="mt-4 space-y-3">
                {col.links.map((link) => (
                  <li key={link.href}>
                    <Link
                      href={link.href}
                      className="text-sm text-foreground/60 hover:text-accent transition-colors"
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <div className="mt-16 pt-8 border-t border-surface-border flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
          <p className="text-xs text-foreground/50">
            © {new Date().getFullYear()} CyberGuard. Projeto acadêmico em parceria
            com Leroy Merlin. Todos os direitos reservados.
          </p>
          <p className="text-xs text-foreground/50 font-mono">
            v0.1.0 · build cyberguard
          </p>
        </div>
      </div>
    </footer>
  );
}
