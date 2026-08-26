import type { Metadata } from "next";
import Link from "next/link";
import { PageHeader } from "@/components/layout/PageHeader";
import { Essencial } from "@/components/ui/Essencial";
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

      <section className="pt-10 md:pt-12">
        <div className="container-read">
          <Essencial
            itens={[
              "O que quebra uma senha não é ela ser curta, é ser previsível — nome, data e sequência caem primeiro.",
              "Tamanho vale mais que símbolos: quatro palavras aleatórias vencem P@ssw0rd!",
              "O teste desta página roda no seu navegador; nada é enviado nem gravado.",
            ]}
          />
        </div>
      </section>

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

      <section className="border-t border-chumbo-linha bg-chumbo-painel/40 py-14 md:py-20">
        <div className="container-read">
          <p className="etiqueta">Sobre a recomendação de não trocar por rotina</p>
          <p className="mt-4 text-body text-papel-2 text-pretty">
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

          <div className="mt-10 border-t border-chumbo-linha pt-8">
            <p className="text-body text-papel-2">
              Senha resolvida, sobra o outro caminho: convencer você a entregar
              o acesso de bom grado.
            </p>
            <Link
              href="/golpe"
              className="mt-5 inline-flex min-h-touch items-center rounded-sm border border-chumbo-linhaForte px-5 py-3 font-display text-sm text-papel transition-colors duration-200 hover:border-menta hover:text-menta"
            >
              Próximo · Qual deles é golpe? →
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}
