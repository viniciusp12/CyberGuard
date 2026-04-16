import type { Metadata } from "next";
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
      description="Entre com seu e-mail corporativo para continuar sua trilha de conscientização."
    >
      <LoginForm />
    </AuthLayout>
  );
}
