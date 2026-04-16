import type { Metadata } from "next";
import { AuthLayout } from "@/components/auth/AuthLayout";
import { RegisterForm } from "./RegisterForm";

export const metadata: Metadata = {
  title: "Criar conta",
  description: "Crie sua conta CyberGuard",
};

export default function RegistroPage() {
  return (
    <AuthLayout
      eyebrow="Cadastro"
      title="Comece em menos de um minuto."
      description="Crie sua conta com e-mail corporativo para acessar a trilha gameficada de conscientização."
    >
      <RegisterForm />
    </AuthLayout>
  );
}
