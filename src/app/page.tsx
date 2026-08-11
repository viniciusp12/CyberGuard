import Link from "next/link";
import { HeroDossie } from "@/components/home/HeroDossie";
import { Indice } from "@/components/home/Indice";

export default function HomePage() {
  return (
    <>
      <HeroDossie />

      <section className="py-16 md:py-24">
        <div className="container-page">
          <p className="label-field">O que tem aqui</p>
          <h2 className="mt-4 max-w-3xl font-mono text-title font-semibold text-balance">
            Seis peças. Três você usa, três você lê.
          </h2>
          <p className="mt-5 max-w-2xl text-bodyLg text-ink-2 text-pretty">
            Ninguém aprende sobre golpe lendo aviso. Aprende testando a própria
            senha, errando um quiz e entendendo o mecanismo por dentro. Pode
            começar por qualquer uma.
          </p>

          <div className="mt-12">
            <Indice />
          </div>

          <div className="mt-10 flex flex-wrap items-center gap-x-6 gap-y-3">
            <p className="text-body text-ink-2">
              Tropeçou num termo técnico pelo caminho?
            </p>
            <Link
              href="/glossario"
              className="inline-flex min-h-touch items-center rounded-sm border border-line px-5 py-3 font-mono text-sm text-ink-2 transition-colors duration-200 hover:border-signal-amber hover:text-signal-amber"
            >
              Glossário — servidor, IP, HTTPS, deepfake e outros →
            </Link>
          </div>
        </div>
      </section>

      {/* A ausência de estatística é uma escolha declarada, não um esquecimento. */}
      <section className="border-y border-line bg-panel/40 py-16 md:py-20">
        <div className="container-read">
          <p className="label-field">Uma explicação sobre os números</p>
          <h2 className="mt-4 font-mono text-2xl font-semibold text-balance md:text-3xl">
            Este site não abre com “90% dos ataques começam por…”
          </h2>
          <p className="mt-5 text-body leading-relaxed text-ink-2 text-pretty">
            Sites de conscientização costumam abrir com uma porcentagem grande e
            sem fonte. Elas circulam de apresentação em apresentação até que
            ninguém sabe mais de onde vieram, e várias estão erradas ou
            desatualizadas em anos.
          </p>
          <p className="mt-4 text-body leading-relaxed text-ink-2 text-pretty">
            A regra aqui é simples: nenhum número aparece sem autor, publicação
            e ano citados na mesma tela — e quando a fonte não resiste à
            conferência, o número não entra. Você vai encontrar poucos números
            neste site. Os que estão, dá para checar.
          </p>
          <p className="mt-4 text-body leading-relaxed text-ink-2 text-pretty">
            Vale o mesmo para os endereços da seção 05: só entram domínios de
            órgão público conferidos. O que ainda não foi conferido aparece
            marcado como pendente, em vez de virar um link com cara de oficial.
          </p>
        </div>
      </section>

      <section className="py-16 md:py-24">
        <div className="container-page">
          <div className="grid gap-10 border-l-2 border-signal-amber pl-6 md:grid-cols-[minmax(0,1fr)_minmax(0,1fr)] md:gap-16">
            <div>
              <p className="label-field text-signal-amber">Camada corporativa</p>
              <h2 className="mt-4 font-mono text-2xl font-semibold text-balance md:text-3xl">
                Os mesmos golpes, quando você está no trabalho
              </h2>
            </div>
            <div>
              <p className="text-body leading-relaxed text-ink-2 text-pretty">
                No expediente muda o alvo, não o método: em vez do PIX da
                família, é o QR code trocado na maquininha, o boleto do
                fornecedor com a conta alterada, a tela falsa de login
                corporativo. São quatorze fraudes, cada uma com o ponto exato em
                que quebra — mais a parte que quase nenhum material tem: por que
                avisar em cinco minutos vale mais que qualquer configuração.
              </p>
              <Link
                href="/no-trabalho"
                className="mt-6 inline-flex min-h-touch items-center rounded-sm border border-line-strong px-5 py-3 font-mono text-sm text-ink transition-colors duration-200 hover:border-signal-amber hover:text-signal-amber"
              >
                Ver a versão do trabalho →
              </Link>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
