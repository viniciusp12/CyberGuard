# syntax=docker/dockerfile:1.7
#
# Imagem do jogo (apps/jogo) para a esteira DevSecOps.
#
# Decisões, e o porquê de cada uma:
#
#   Multi-stage. O que compila nunca chega na imagem final. O estágio de build
#   carrega pnpm, dependências de desenvolvimento e código-fonte; a imagem que
#   roda recebe só o servidor já montado. Menos coisa dentro é menos coisa para
#   o Trivy encontrar na Etapa 6.
#
#   Alpine com versão fixa. Base mínima e previsível. Sem tag móvel: "node:22"
#   muda de conteúdo sem avisar, e aí o relatório de varredura de hoje não
#   descreve a imagem de amanhã. A versão escolhida é a mais recente do Node 22
#   LTS: base velha carrega CVE já corrigida, que apareceria na Etapa 6 sem
#   motivo. O piso é o Node 22.13, exigido pelo pnpm 11.
#
#   Usuário não-root. Processo em contêiner que roda como root vira root no
#   host se escapar do isolamento. O Node não precisa de privilégio para ouvir
#   na porta 3000.
#
#   Nenhum segredo em ARG ou ENV. Tudo que é segredo entra em tempo de
#   execução. Valor em ARG fica gravado no histórico da imagem e qualquer um
#   com acesso ao registro lê com `docker history`.

# ─── Estágio 1: dependências ────────────────────────────────────────────────
# Separado do código para aproveitar o cache: mexer numa página do jogo não
# obriga a reinstalar o mundo.
FROM node:22.23.4-alpine3.24 AS deps
WORKDIR /app

# pnpm instalado direto, em versão fixa, sem passar pelo corepack.
#
# O corepack que acompanha o Node carrega chaves de assinatura do registro já
# vencidas, e quebra com "Cannot find matching keyid" ao resolver a versão do
# pnpm. A saída que circula é desligar a verificação de assinatura
# (COREPACK_INTEGRITY_KEYS=0) — o que é exatamente o contrário do que esta
# esteira defende: seria renunciar à checagem de procedência do gerenciador de
# pacotes para fazer o build passar.
#
# Instalar a versão exata pelo npm mantém a verificação de integridade e ainda
# fixa o que roda, que é o que o enunciado pede.
RUN npm install --global pnpm@11.18.0

# Só os manifestos. O pnpm precisa do desenho completo do workspace para
# resolver os links entre os pacotes.
COPY package.json pnpm-lock.yaml pnpm-workspace.yaml ./
COPY apps/jogo/package.json apps/jogo/
COPY apps/site/package.json apps/site/
COPY apps/api/package.json apps/api/
COPY packages/shared/package.json packages/shared/

# --frozen-lockfile falha se o lockfile não bater com os manifestos, em vez de
# resolver versões por conta própria. Build reprodutível é requisito da Etapa 3.
RUN pnpm install --frozen-lockfile

# ─── Estágio 2: build ───────────────────────────────────────────────────────
FROM node:22.23.4-alpine3.24 AS builder
WORKDIR /app

RUN npm install --global pnpm@11.18.0

COPY --from=deps /app/node_modules ./node_modules
COPY --from=deps /app/apps/jogo/node_modules ./apps/jogo/node_modules
COPY --from=deps /app/packages/shared/node_modules ./packages/shared/node_modules
COPY . .

ENV NEXT_TELEMETRY_DISABLED=1
ENV DOCKER_BUILD=1

# O turbo compila @repo/shared antes do jogo, porque o jogo depende dele.
RUN pnpm turbo run build --filter=jogo

# ─── Estágio 3: execução ────────────────────────────────────────────────────
FROM node:22.23.4-alpine3.24 AS runner
WORKDIR /app

ENV NODE_ENV=production
ENV NEXT_TELEMETRY_DISABLED=1
ENV PORT=3000
ENV HOSTNAME=0.0.0.0

# Usuário próprio, sem shell de login e sem senha.
RUN addgroup --system --gid 1001 nodejs \
 && adduser --system --uid 1001 --ingroup nodejs nextjs

# A saída autocontida já traz o servidor e as dependências necessárias.
# --chown evita um RUN chown extra, que duplicaria a camada inteira.
COPY --from=builder --chown=nextjs:nodejs /app/apps/jogo/.next/standalone ./
COPY --from=builder --chown=nextjs:nodejs /app/apps/jogo/.next/static ./apps/jogo/.next/static
COPY --from=builder --chown=nextjs:nodejs /app/apps/jogo/public ./apps/jogo/public

USER nextjs

EXPOSE 3000

# Sem curl nem wget na imagem (superfície menor): o healthcheck usa o próprio
# Node, que já está aqui.
HEALTHCHECK --interval=30s --timeout=5s --start-period=10s --retries=3 \
  CMD node -e "fetch('http://127.0.0.1:3000/login').then(r=>process.exit(r.ok?0:1)).catch(()=>process.exit(1))"

CMD ["node", "apps/jogo/server.js"]
