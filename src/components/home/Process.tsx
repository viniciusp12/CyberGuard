import { SectionHeading } from "@/components/ui/SectionHeading";

const STEPS = [
  {
    n: "01",
    title: "Cadastro & diagnóstico",
    text: "O colaborador cria sua conta com e-mail corporativo e faz um diagnóstico inicial que mapeia seu nível atual de maturidade em segurança.",
  },
  {
    n: "02",
    title: "Trilha personalizada",
    text: "Com base no diagnóstico, a plataforma libera módulos prioritários: phishing, senhas, engenharia social, LGPD, dispositivos móveis e mais.",
  },
  {
    n: "03",
    title: "Prática em cenários reais",
    text: "Simulações interativas, quizzes e desafios gamificados reforçam o aprendizado com contextos do varejo — loja, estoque, atendimento.",
  },
  {
    n: "04",
    title: "Evolução contínua",
    text: "Pontos, conquistas e ranking entre equipes mantêm o engajamento. Líderes acompanham a evolução em painéis por loja e departamento.",
  },
];

export function Process() {
  return (
    <section className="py-24 md:py-32">
      <div className="container-page">
        <SectionHeading
          eyebrow="Como funciona"
          title="Quatro passos para transformar risco em cultura"
        />

        <div className="mt-16 space-y-px bg-surface-border rounded-2xl overflow-hidden border border-surface-border">
          {STEPS.map((step) => (
            <div
              key={step.n}
              className="group bg-background hover:bg-surface-elevated transition-colors p-8 md:p-12 grid grid-cols-12 gap-6 items-start"
            >
              <div className="col-span-12 md:col-span-2">
                <p className="font-mono text-sm text-accent">{step.n}</p>
              </div>
              <div className="col-span-12 md:col-span-4">
                <h3 className="font-display text-2xl md:text-3xl font-semibold">
                  {step.title}
                </h3>
              </div>
              <div className="col-span-12 md:col-span-6">
                <p className="text-base text-foreground/60 leading-relaxed">
                  {step.text}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
