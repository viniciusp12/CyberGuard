import type { Metadata } from "next";
import Link from "next/link";
import { PageHeader } from "@/components/layout/PageHeader";
import { TermosRelacionados } from "@/components/ui/TermosRelacionados";
import { QualEGolpe } from "./QualEGolpe";

export const metadata: Metadata = {
  title: "Qual deles é golpe?",
  description:
    "Quatro pares de mensagens reais do cotidiano brasileiro — PIX, Correios, banco e falso emprego. Escolha a fraude e veja os sinais destacados dentro do próprio texto.",
};

export default function GolpePage() {
  return (
    <>
      <PageHeader
        numero="02"
        eyebrow="Qual deles é golpe?"
        title="Você recebe as duas no mesmo dia. Qual é a fraude?"
        description="Quatro pares de mensagens do cotidiano brasileiro. Escolha e o site marca os sinais dentro do próprio texto — inclusive os da mensagem legítima, porque saber por que algo é confiável importa tanto quanto reconhecer a fraude."
      />

      <section className="py-14 md:py-20">
        <div className="container-page">
          <div className="mb-12 max-w-2xl border-l-2 border-chumbo-linha pl-5">
            <p className="text-body text-papel-2 text-pretty">
              Antes de começar: errar aqui é o esperado. Essas mensagens são
              escritas por gente que faz isso o dia inteiro, testando o que
              funciona em milhares de pessoas. Cair não é falta de atenção nem
              de inteligência — é o resultado normal de uma mensagem bem feita
              chegando em um dia ruim.
            </p>
          </div>

          <QualEGolpe />

          <TermosRelacionados
            ids={[
              "dominio",
              "https",
              "phishing",
              "smishing-vishing",
              "engenharia-social",
              "chave-pix",
              "vazamento",
            ]}
          />
        </div>
      </section>

      <section className="border-t border-chumbo-linha bg-chumbo-painel/40 py-14 md:py-20">
        <div className="container-read">
          <p className="etiqueta">A regra que serve para todos os casos</p>
          <p className="mt-4 text-bodyLg text-papel text-pretty">
            Nunca confirme uma mensagem pelo caminho que a mensagem oferece.
            Saia dela: abra o aplicativo por conta própria, ligue para o número
            que você já tinha salvo, digite o endereço do site você mesmo. Todo
            golpe depende de você seguir o caminho que ele montou.
          </p>

          <div className="mt-10 border-t border-chumbo-linha pt-8">
            <p className="text-body text-papel-2">
              Reconhecer a mensagem é metade. A outra metade é entender como ela
              chegou até você.
            </p>
            <Link
              href="/anatomia"
              className="mt-5 inline-flex min-h-touch items-center rounded-sm border border-chumbo-linhaForte px-5 py-3 font-display text-sm text-papel transition-colors duration-200 hover:border-menta hover:text-menta"
            >
              Próximo · Como o golpe funciona por dentro →
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}
