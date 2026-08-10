"use client";

import { useMemo, useState, useId } from "react";
import {
  analisar,
  formatarDuracao,
  COMPARATIVO,
  PALPITES_POR_SEGUNDO,
  PALPITES_ONLINE,
} from "@/lib/senha";

const forcaCor = (bits: number, fraca: boolean) => {
  if (fraca || bits < 40) return "bg-signal-red";
  if (bits < 70) return "bg-signal-amber";
  return "bg-signal-green";
};

export function TesteSenha() {
  const [senha, setSenha] = useState("");
  const [visivel, setVisivel] = useState(false);
  const campoId = useId();
  const ajudaId = useId();

  const a = useMemo(() => analisar(senha), [senha]);
  const preenchimento = Math.min(100, (a.bits / 90) * 100);

  const comparativo = useMemo(
    () =>
      COMPARATIVO.map((c) => ({
        ...c,
        analise: analisar(c.senha),
      })),
    [],
  );

  return (
    <div className="grid gap-12 lg:grid-cols-[minmax(0,1fr)_minmax(0,0.85fr)] lg:gap-16">
      <div>
        {/* Campo */}
        <label htmlFor={campoId} className="label-field block">
          Digite uma senha para testar
        </label>

        <div className="mt-3 flex gap-2">
          <input
            id={campoId}
            type={visivel ? "text" : "password"}
            value={senha}
            onChange={(e) => setSenha(e.target.value)}
            aria-describedby={ajudaId}
            autoComplete="off"
            autoCorrect="off"
            autoCapitalize="off"
            spellCheck={false}
            placeholder="pode ser inventada na hora"
            className="min-h-touch w-full rounded-sm border border-line-strong bg-panel px-4 py-3 font-mono text-base text-ink
                       transition-colors duration-200 placeholder:text-ink-3 hover:border-ink-3
                       focus:border-signal-amber focus:outline-none focus-visible:outline-none"
          />
          <button
            type="button"
            onClick={() => setVisivel((v) => !v)}
            aria-pressed={visivel}
            className="min-h-touch shrink-0 rounded-sm border border-line-strong px-4 font-mono text-sm text-ink-2 transition-colors duration-200 hover:bg-panel-raised hover:text-ink"
          >
            {visivel ? "Ocultar" : "Mostrar"}
          </button>
        </div>

        {/* Aviso ao lado do campo, não no rodapé. */}
        <p
          id={ajudaId}
          className="mt-3 rounded-sm border border-signal-green/30 bg-signal-greenDim/60 p-4 text-sm leading-relaxed text-ink-2"
        >
          <strong className="font-semibold text-ink">
            O que você digitar não sai daqui.
          </strong>{" "}
          A conta é feita pelo próprio navegador, na sua máquina. Não há envio,
          não há salvamento, não há registro — nem para nós, nem para ninguém.
          Fechou a aba, acabou. Mesmo assim, o hábito certo é não digitar uma
          senha de verdade em nenhum site que peça: use uma parecida.
        </p>

        {/* Resultado */}
        <div className="mt-8 rounded-sm border border-line bg-panel p-6">
          <p className="label-field">
            Tempo para varrer todas as combinações
          </p>

          <div aria-live="polite" aria-atomic="true">
            <p
              className={`mt-3 font-mono text-title font-semibold tabular-nums ${
                senha.length === 0
                  ? "text-ink-3"
                  : a.fraca
                    ? "text-signal-red"
                    : "text-signal-green"
              }`}
            >
              {senha.length === 0 ? "—" : formatarDuracao(a.segundos)}
            </p>

            <p className="mt-4 text-sm leading-relaxed text-ink-2">
              {a.veredito}
            </p>
          </div>

          {/* Barra de entropia */}
          <div className="mt-6">
            <div
              className="h-1.5 w-full overflow-hidden rounded-full bg-panel-raised"
              role="img"
              aria-label={`Força estimada: ${Math.round(a.bits)} bits de entropia`}
            >
              <div
                className={`h-full transition-all duration-300 ease-forense ${forcaCor(a.bits, a.fraca)}`}
                style={{ width: `${preenchimento}%` }}
              />
            </div>
            <dl className="mt-3 flex flex-wrap gap-x-6 gap-y-1 font-mono text-xs text-ink-3">
              <div className="flex gap-2">
                <dt>caracteres</dt>
                <dd className="text-ink-2 tabular-nums">{a.comprimento}</dd>
              </div>
              <div className="flex gap-2">
                <dt>alfabeto</dt>
                <dd className="text-ink-2 tabular-nums">{a.alfabeto}</dd>
              </div>
              <div className="flex gap-2">
                <dt>entropia</dt>
                <dd className="text-ink-2 tabular-nums">
                  {Math.round(a.bits)} bits
                </dd>
              </div>
            </dl>
          </div>

          {senha.length > 0 && (
            <div className="mt-6 border-t border-line pt-5">
              <p className="label-field">Se o ataque for pelo site, e não offline</p>
              <p className="mt-2 font-mono text-sm text-ink-2">
                {formatarDuracao(a.segundosOnline)}
              </p>
              <p className="mt-2 text-sm leading-relaxed text-ink-3">
                Muito mais lento porque o site bloqueia depois de algumas
                tentativas. O número grande lá em cima é o cenário ruim: quando
                o banco de senhas vaza e o ataque roda na máquina do criminoso,
                sem ninguém para barrar.
              </p>
            </div>
          )}

          {a.pareceFrase && (
            <div className="mt-6 border-t border-line pt-5">
              <p className="label-field text-signal-amber">Ressalva importante</p>
              <p className="mt-2 text-sm leading-relaxed text-ink-2">
                Sua senha tem espaços, então provavelmente é uma frase. A conta
                acima assume que cada letra foi sorteada. Se as palavras vieram
                de uma música, de um versículo ou de um ditado, o número real é
                muito menor — atacantes testam frases prontas. Frase-senha só
                funciona quando as palavras não têm relação entre si.
              </p>
            </div>
          )}
        </div>

        <p className="mt-4 font-mono text-xs leading-relaxed text-ink-3">
          Cenário assumido: {PALPITES_POR_SEGUNDO.toLocaleString("pt-BR")}{" "}
          tentativas por segundo offline (ordem de grandeza de uma placa de vídeo
          atual contra um algoritmo de senha rápido e mal escolhido) e{" "}
          {PALPITES_ONLINE} por segundo contra um site com bloqueio. A conta
          divide o total pela metade, porque em média a senha certa aparece no
          meio da varredura. Números diferentes de outros medidores significam
          suposições diferentes, não erro.
        </p>
      </div>

      {/* Coluna lateral */}
      <div className="space-y-8">
        <div className="rounded-sm border border-line bg-panel p-6">
          <h2 className="font-mono text-lg font-semibold">
            Comprimento vence complexidade decorada
          </h2>
          <p className="mt-3 text-sm leading-relaxed text-ink-2">
            Cada caractere a mais multiplica o trabalho do atacante. Cada
            símbolo esquisito a mais só multiplica a sua chance de esquecer.
          </p>

          <ul className="mt-5 space-y-4">
            {comparativo.map((c) => (
              <li key={c.senha} className="border-t border-line pt-4">
                <p className="text-xs leading-relaxed text-ink-3">{c.rotulo}</p>
                <p className="mt-1.5 break-all font-mono text-sm text-ink">
                  {c.senha}
                </p>
                <p
                  className={`mt-1.5 font-mono text-sm ${
                    c.analise.fraca ? "text-signal-red" : "text-signal-green"
                  }`}
                >
                  {formatarDuracao(c.analise.segundos)}
                </p>
              </li>
            ))}
          </ul>

          <p className="mt-5 border-t border-line pt-4 text-sm leading-relaxed text-ink-2">
            A terceira é mais fácil de lembrar, mais fácil de digitar no celular
            e ainda assim a mais resistente — desde que as palavras tenham sido
            sorteadas, não escolhidas por você.
          </p>
        </div>

        <div className="rounded-sm border border-line bg-panel p-6">
          <h2 className="font-mono text-lg font-semibold">
            O que fazer com isso na prática
          </h2>
          <ul className="mt-4 space-y-4 text-sm leading-relaxed text-ink-2">
            <li>
              <strong className="font-semibold text-ink">
                Use um gerenciador de senhas.
              </strong>{" "}
              Ele inventa uma senha longa e diferente para cada site e guarda
              tudo. Você decora uma só: a que abre o gerenciador — e essa deve
              ser uma frase-senha longa. Bitwarden, 1Password, KeePassXC e o
              gerenciador embutido no seu navegador servem.
            </li>
            <li>
              <strong className="font-semibold text-ink">
                Não repita senha entre sites.
              </strong>{" "}
              É o que mais causa estrago. Um site pequeno vaza a sua senha e
              quem pegou vai testar a mesma combinação no seu e-mail, no seu
              banco e no seu Instagram. Isso tem nome: credential stuffing.
            </li>
            <li>
              <strong className="font-semibold text-ink">
                Proteja o e-mail acima de tudo.
              </strong>{" "}
              Quem entra no seu e-mail redefine a senha de todo o resto. Ele
              merece a senha mais longa e a verificação em duas etapas mais
              forte que você conseguir.
            </li>
            <li>
              <strong className="font-semibold text-ink">
                Troque só quando houver motivo.
              </strong>{" "}
              Trocar de senha todo mês por obrigação faz as pessoas criarem
              variações previsíveis. Troque quando houver suspeita ou vazamento
              — essa é a recomendação atual do NIST, que abandonou a exigência
              de troca periódica.
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
}
