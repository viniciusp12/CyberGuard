import type { Metadata } from "next";
import { VT323, Pixelify_Sans, Press_Start_2P } from "next/font/google";
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
    var stored = localStorage.getItem("hackudinhos-theme");
    var theme = stored || (window.matchMedia("(prefers-color-scheme: dark)").matches ? "dark" : "light");
    if (theme === "dark") document.documentElement.classList.add("dark");
  } catch (e) {}
})();
`;

const bodyFont = VT323({
  variable: "--font-body",
  subsets: ["latin"],
  weight: ["400"],
});

const headingFont = Pixelify_Sans({
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
  title: "The Hackudinhos | Leroy Merlin",
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
