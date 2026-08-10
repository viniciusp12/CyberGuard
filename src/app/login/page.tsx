import type { Metadata } from "next";
import { Suspense } from "react";
import { AuthLayout } from "@/components/auth/AuthLayout";
import { LoginForm } from "./LoginForm";

export const metadata: Metadata = {
  title: "Entrar",
  description: "Acesse sua conta CyberGuard",
};

export default function LoginPage() {
  return (
    <AuthLayout
      eyebrow="Acesso"
      title="Bem-vindo de volta."
      description="A conta serve para a trilha do Challenge. Todo o conteúdo aberto do site funciona sem entrar."
    >
      {/* O formulário lê `?next=` da URL, o que exige fronteira de Suspense
          para a página poder ser gerada estaticamente. */}
      <Suspense
        fallback={
          <p className="font-mono text-sm text-ink-3">Carregando formulário…</p>
        }
      >
        <LoginForm />
      </Suspense>
    </AuthLayout>
  );
}
