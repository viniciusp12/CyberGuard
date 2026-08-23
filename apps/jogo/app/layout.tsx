import type { Metadata } from "next";
import { Barlow, Barlow_Condensed, Press_Start_2P } from "next/font/google";
import "./globals.css";
import { Providers } from "./providers";
import { ThemeToggle } from "@/components/ui/theme-toggle";
import { LanguageSelector } from "@/components/ui/language-selector";
import { LofiPlayer } from "@/components/ui/lofi-player";
import { GlossaryManual } from "@/components/ui/glossary-manual";
import { LocaleProvider } from "@/lib/i18n/LocaleProvider";

const THEME_INIT_SCRIPT = `
(function () {
  try {
    // Escuro e o padrao: o manual define o chumbo como "o fundo de tudo", e a
    // paleta so existe para fundo escuro. O tema claro continua disponivel,
    // mas so para quem escolher explicitamente.
    var stored = localStorage.getItem("hackudinhos-theme");
    if (stored !== "light") document.documentElement.classList.add("dark");
  } catch (e) {}
})();
`;

/**
 * Tipografia da identidade Hackudinhos.
 *
 * O manual separa por função: Barlow Condensed nomeia (título, etiqueta,
 * botão), Barlow explica (corpo). O corpo nunca desce de 400 nem de 15px,
 * porque peso fino sobre fundo escuro fecha o contorno da letra e cansa a
 * leitura.
 *
 * A Press Start 2P fica, restrita a HUD, placar e minijogos. Ali ela tem
 * função — comunica que aquilo é jogo, não formulário. Fora disso, não é
 * usada: a regra do manual é que nada entra na tela sem função.
 */
const bodyFont = Barlow({
  variable: "--font-body",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
});

const headingFont = Barlow_Condensed({
  variable: "--font-heading",
  subsets: ["latin"],
  weight: ["500", "600", "700"],
});

const pixelFont = Press_Start_2P({
  variable: "--font-pixel",
  subsets: ["latin"],
  weight: "400",
});

export const metadata: Metadata = {
  title: "Hackudinhos | Leroy Merlin",
  description: "Treinamento de segurança da informação em formato de jogo.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="pt-BR"
      className={`${bodyFont.variable} ${headingFont.variable} ${pixelFont.variable} h-full antialiased`}
      suppressHydrationWarning
    >
      <head>
        <script dangerouslySetInnerHTML={{ __html: THEME_INIT_SCRIPT }} />
      </head>
      <body className="min-h-full flex flex-col bg-bg text-text">
        <LocaleProvider>
          <Providers>
            <div className="fixed right-4 top-4 z-[70] flex items-center gap-2">
              <LofiPlayer />
              <LanguageSelector />
              <ThemeToggle />
            </div>
            <GlossaryManual />
            {children}
          </Providers>
        </LocaleProvider>
      </body>
    </html>
  );
}
