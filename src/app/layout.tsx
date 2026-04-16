import type { Metadata } from "next";
import { Inter, Space_Grotesk, JetBrains_Mono } from "next/font/google";
import "./globals.css";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { getCurrentUser } from "@/lib/auth";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
});

const spaceGrotesk = Space_Grotesk({
  subsets: ["latin"],
  variable: "--font-space-grotesk",
  display: "swap",
});

const jetbrains = JetBrains_Mono({
  subsets: ["latin"],
  variable: "--font-jetbrains",
  display: "swap",
});

export const metadata: Metadata = {
  title: {
    default: "CyberGuard — Conscientização Cibernética | Leroy Merlin",
    template: "%s · CyberGuard",
  },
  description:
    "Plataforma de conscientização em segurança cibernética para colaboradores da Leroy Merlin. Aprenda, pratique e proteja.",
  keywords: [
    "cibersegurança",
    "conscientização",
    "Leroy Merlin",
    "phishing",
    "segurança da informação",
  ],
  authors: [{ name: "CyberGuard Team" }],
};

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const user = await getCurrentUser();

  return (
    <html lang="pt-BR" className={`${inter.variable} ${spaceGrotesk.variable} ${jetbrains.variable}`}>
      <body className="font-sans bg-background text-foreground min-h-screen flex flex-col">
        <Navbar user={user ? { name: user.name, email: user.email } : null} />
        <main className="flex-1">{children}</main>
        <Footer />
      </body>
    </html>
  );
}
