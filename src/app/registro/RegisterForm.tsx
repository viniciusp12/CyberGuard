"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { Input } from "@/components/ui/Input";
import { Button } from "@/components/ui/Button";

export function RegisterForm() {
  const router = useRouter();

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [department, setDepartment] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError(null);
    setLoading(true);

    try {
      const res = await fetch("/api/auth/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name, email, department, password }),
      });

      const data = await res.json();

      if (!res.ok) {
        setError(data.error || "Erro ao criar conta.");
        return;
      }

      router.push("/dashboard");
      router.refresh();
    } catch {
      setError("Erro de conexão. Tente novamente.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-5">
      <Input
        label="Nome completo"
        name="name"
        type="text"
        placeholder="Maria Silva"
        value={name}
        onChange={(e) => setName(e.target.value)}
        required
        autoComplete="name"
      />
      <Input
        label="E-mail corporativo"
        name="email"
        type="email"
        placeholder="voce@leroymerlin.com.br"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        required
        autoComplete="email"
      />
      <Input
        label="Departamento (opcional)"
        name="department"
        type="text"
        placeholder="Ex: Atendimento, TI, Logística"
        value={department}
        onChange={(e) => setDepartment(e.target.value)}
        autoComplete="organization-title"
      />
      <Input
        label="Senha"
        name="password"
        type="password"
        placeholder="Mínimo 8 caracteres"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        required
        minLength={8}
        autoComplete="new-password"
      />

      {error && (
        <div className="rounded-xl border border-danger/30 bg-danger/10 px-4 py-3 text-sm text-danger">
          {error}
        </div>
      )}

      <Button type="submit" size="lg" className="w-full" disabled={loading}>
        {loading ? "Criando conta..." : "Criar conta"}
      </Button>

      <p className="text-center text-xs text-foreground/40">
        Ao criar uma conta, você concorda com os termos de uso e a política de
        privacidade do programa CyberGuard.
      </p>

      <p className="text-center text-sm text-foreground/60">
        Já tem uma conta?{" "}
        <Link
          href="/login"
          className="text-accent hover:underline underline-offset-4"
        >
          Entrar
        </Link>
      </p>
    </form>
  );
}
