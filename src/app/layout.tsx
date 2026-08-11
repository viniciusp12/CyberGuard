import type { Metadata } from "next";
import { Inter_Tight, IBM_Plex_Mono } from "next/font/google";
import "./globals.css";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";

const interTight = Inter_Tight({
  subsets: ["latin"],
  variable: "--font-inter-tight",
  display: "swap",
});

const plexMono = IBM_Plex_Mono({
  subsets: ["latin"],
  weight: ["400", "500", "600"],
  variable: "--font-plex-mono",
  display: "swap",
});

export const metadata: Metadata = {
  title: {
    default: "Você já está exposto — CyberGuard",
    template: "%s · CyberGuard",
  },
  description:
    "Golpes digitais no Brasil, explicados por dentro. Teste sua senha, aprenda a reconhecer uma fraude e veja o que fazer se já caiu em uma. Tudo roda no seu navegador.",
  keywords: [
    "golpe do PIX",
    "WhatsApp clonado",
    "phishing",
    "segurança digital",
    "senha forte",
    "caí em um golpe",
  ],
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html
      lang="pt-BR"
      className={`${interTight.variable} ${plexMono.variable}`}
    >
      <body className="font-sans bg-page text-ink min-h-screen flex flex-col text-body">
        <a href="#conteudo" className="skip-link">
          Pular para o conteúdo
        </a>
        <Navbar />
        <main id="conteudo" className="flex-1">
          {children}
        </main>
        <Footer />
      </body>
    </html>
  );
}
