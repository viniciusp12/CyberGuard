import type { Metadata } from "next";
import Link from "next/link";
import { PageHeader } from "@/components/layout/PageHeader";
import { Fonte } from "@/components/ui/Fonte";
import { TermosRelacionados } from "@/components/ui/TermosRelacionados";
import { TesteSenha } from "./TesteSenha";

export const metadata: Metadata = {
  title: "Teste sua senha",
  description:
    "Veja em tempo real quanto tempo levaria para quebrar uma senha por força bruta. O cálculo roda no seu navegador — nada é enviado nem salvo.",
};

export default function SenhaPage() {
  return (
    <>
      <PageHeader
        numero="01"
        eyebrow="Teste de senha"
        title="Quanto tempo a sua senha aguenta?"
        description="Digite e veja o número despencar. A conta é feita aqui dentro, no seu navegador, e revela uma coisa que quase todo mundo aprendeu errado: o que protege é o comprimento, não os símbolos decorados."
      />

      <section className="py-14 md:py-20">
        <div className="container-page">
          <TesteSenha />

          <TermosRelacionados
            ids={[
              "hash",
              "forca-bruta",
              "entropia",
              "gerenciador-de-senhas",
              "frase-senha",
              "credential-stuffing",
              "vazamento",
            ]}
          />
        </div>
      </section>

      <section className="border-t border-line bg-panel/40 py-14 md:py-20">
        <div className="container-read">
          <p className="label-field">Sobre a recomendação de não trocar por rotina</p>
          <p className="mt-4 text-body text-ink-2 text-pretty">
            A diretriz de identidade digital do NIST, referência usada por
            órgãos e empresas no mundo todo, deixou de recomendar troca
            periódica obrigatória de senha e passou a recomendar troca apenas
            diante de indício de comprometimento — justamente porque a
            obrigação leva as pessoas a criar variações previsíveis da mesma
            senha.
          </p>
          <Fonte
            autor="NIST"
            obra="SP 800-63B, Digital Identity Guidelines"
            ano="2017, rev. 2024"
            href="https://pages.nist.gov/800-63-3/sp800-63b.html"
          />

          <div className="mt-10 border-t border-line pt-8">
            <p className="text-body text-ink-2">
              Senha resolvida, sobra o outro caminho: convencer você a entregar
              o acesso de bom grado.
            </p>
            <Link
              href="/golpe"
              className="mt-5 inline-flex min-h-touch items-center rounded-sm border border-line-strong px-5 py-3 font-mono text-sm text-ink transition-colors duration-200 hover:border-signal-amber hover:text-signal-amber"
            >
              Próximo · Qual deles é golpe? →
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}
