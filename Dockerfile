# syntax=docker/dockerfile:1.7
#
# Imagem do jogo (apps/jogo) para a esteira DevSecOps.
#
# Decisoes, e o porque de cada uma:
#
#   Multi-stage. O que compila nunca chega na imagem final. O estagio de build
#   carrega pnpm, dependencias de desenvolvimento e codigo-fonte; a imagem que
#   roda recebe so o servidor ja montado. Menos coisa dentro e menos coisa para
#   o Trivy encontrar na Etapa 6.
#
#   Alpine com versao fixa. Base minima e previsivel. Sem tag movel: "node:22"
#   muda de conteudo sem avisar, e ai o relatorio de varredura de hoje nao
#   descreve a imagem de amanha. A versao escolhida e a mais recente do Node 22
#   LTS: base velha carrega CVE ja corrigida, que apareceria na Etapa 6 sem
#   motivo. O piso e o Node 22.13, exigido pelo pnpm 11.
#
#   Usuario nao-root. Processo em conteiner que roda como root vira root no
#   host se escapar do isolamento. O Node nao precisa de privilegio para ouvir
#   na porta 3000.
#
#   Nenhum segredo em ARG ou ENV. Tudo que e segredo entra em tempo de
#   execucao. Valor em ARG fica gravado no historico da imagem e qualquer um
#   com acesso ao registro le com `docker history`.
#
#   Um estagio de build so, com o codigo inteiro. Houve uma tentativa de
#   separar "instalar dependencias" de "compilar", copiando so os manifestos
#   primeiro para aproveitar cache. Nao funciona neste repositorio: o pacote
#   `packages/shared` tem um script `prepare` que roda `tsup` durante a
#   instalacao, e sem o codigo-fonte presente ele falha com "No input files".
#   Cache de camada e otimizacao; build correto nao e negociavel.

# --- Estagio 1: build ------------------------------------------------------
FROM node:22.23.4-alpine3.24 AS builder
WORKDIR /app

# pnpm instalado direto, em versao fixa, sem passar pelo corepack.
#
# O corepack que acompanha o Node carrega chaves de assinatura do registro ja
# vencidas, e quebra com "Cannot find matching keyid" ao resolver a versao do
# pnpm. A saida que circula e desligar a verificacao de assinatura
# (COREPACK_INTEGRITY_KEYS=0) - o que e exatamente o contrario do que esta
# esteira defende: seria renunciar a checagem de procedencia do gerenciador de
# pacotes para fazer o build passar.
#
# Instalar a versao exata pelo npm mantem a verificacao de integridade e ainda
# fixa o que roda, que e o que o enunciado pede.
RUN npm install --global pnpm@11.18.0

COPY . .

# --frozen-lockfile falha se o lockfile nao bater com os manifestos, em vez de
# resolver versoes por conta propria. Build reprodutivel e requisito da Etapa 3.
RUN pnpm install --frozen-lockfile

ENV NEXT_TELEMETRY_DISABLED=1
ENV DOCKER_BUILD=1

# O turbo compila @repo/shared antes do jogo, porque o jogo depende dele.
RUN pnpm turbo run build --filter=jogo

# --- Estagio 2: execucao ---------------------------------------------------
FROM node:22.23.4-alpine3.24 AS runner
WORKDIR /app

ENV NODE_ENV=production
ENV NEXT_TELEMETRY_DISABLED=1
ENV PORT=3000
ENV HOSTNAME=0.0.0.0

# Fora o npm e o corepack da imagem que roda.
#
# A aplicacao nao instala nada em producao: ela executa `node server.js`, e so.
# O npm que vem na imagem base e peso morto e superficie de ataque — e nao e
# teorico: a varredura da Etapa 6 encontrou 10 falhas HIGH, TODAS em
# dependencias internas do proprio npm (pacote, sigstore, brace-expansion,
# picomatch, ip-address). Nenhuma delas vinha do codigo do jogo.
#
# Remover resolve as 10 de uma vez, sem precisar esperar o npm atualizar, e
# ainda encolhe a imagem. Se um dia for preciso instalar algo em tempo de
# execucao, a decisao certa e um estagio proprio, nao devolver o npm aqui.
RUN rm -rf /usr/local/lib/node_modules/npm            /usr/local/lib/node_modules/corepack            /usr/local/bin/npm            /usr/local/bin/npx            /usr/local/bin/corepack

# Usuario proprio, sem shell de login e sem senha.
RUN addgroup --system --gid 1001 nodejs  && adduser --system --uid 1001 --ingroup nodejs nextjs

# A saida autocontida ja traz o servidor e as dependencias necessarias.
# --chown evita um RUN chown extra, que duplicaria a camada inteira.
COPY --from=builder --chown=nextjs:nodejs /app/apps/jogo/.next/standalone ./
COPY --from=builder --chown=nextjs:nodejs /app/apps/jogo/.next/static ./apps/jogo/.next/static
COPY --from=builder --chown=nextjs:nodejs /app/apps/jogo/public ./apps/jogo/public

USER nextjs

EXPOSE 3000

# Sem curl nem wget na imagem (superficie menor): o healthcheck usa o proprio
# Node, que ja esta aqui.
HEALTHCHECK --interval=30s --timeout=5s --start-period=10s --retries=3   CMD node -e "fetch('http://127.0.0.1:3000/login').then(r=>process.exit(r.ok?0:1)).catch(()=>process.exit(1))"

CMD ["node", "apps/jogo/server.js"]
