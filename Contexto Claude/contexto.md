# Contexto do Projeto — CIFRA

> Arquivo de referência para o Claude. Atualizar sempre que houver mudanças relevantes no projeto.

---

## 🔗 Integração com o jogo — CONCLUÍDA em 21/08/2026

O repositório virou **monorepo pnpm + turbo**. O site, o front do jogo, a API e o pacote compartilhado vivem juntos aqui.

```
CIFRA/
├── apps/
│   ├── site/     Next 15 · Tailwind 3 · estático
│   ├── jogo/     Next 16 · Tailwind 4
│   └── api/      NestJS 11 · Prisma · PostgreSQL
├── packages/shared/   engine, schemas e conteúdo dos módulos
├── Jogo/         protótipo Godot (à parte)
└── deploy/       nginx/systemd da VPS antiga, como referência
```

### Comandos

`pnpm typecheck`, `pnpm build` e `pnpm audit --prod` — os três passam limpos. Para um app só: `pnpm --filter site dev`.

⚠️ **pnpm 10+ não lê mais `pnpm.overrides` do package.json.** Os overrides moram em `pnpm-workspace.yaml`. Se aparecer o aviso "The pnpm field in package.json is no longer read", é alguém que colocou no lugar errado.

### Deploy: três projetos Vercel, um repositório

| Projeto | Root Directory | Variáveis |
|---|---|---|
| site | `apps/site` | `NEXT_PUBLIC_JOGO_URL` (opcional) |
| jogo | `apps/jogo` | `API_ORIGIN` |
| api | `apps/api` | `DATABASE_URL`, `DIRECT_URL`, `JWT_SECRET`, `NODE_ENV`, `CORS_ORIGIN` |

### ⚠️ Por que jogo e API precisam parecer a mesma origem

O cookie de sessão é criado com `sameSite: "lax"` (`apps/api/src/auth/auth.controller.ts`). Numa chamada cross-origin de verdade o navegador **não envia o cookie**, e o login não persiste.

O que salva é o **rewrite do Next** em `apps/jogo/next.config.ts`: ele roda no servidor, então o navegador enxerga tudo em `/api/*` do próprio domínio do jogo. É o mesmo papel que o nginx fazia na VPS.

**Não troque o rewrite por chamada direta à API** sem antes mudar o cookie para `SameSite=None; Secure` e tratar CSRF. O jeito atual é mais simples e mais seguro.

### A API em serverless

`apps/api/api/index.ts` é o handler da Vercel: monta o mesmo `AppModule` sobre Express com `app.init()` (em vez de `app.listen()`) e guarda a instância em cache no escopo do módulo, com trava contra corrida no cold start.

`src/main.ts` continua existindo e é o que roda em servidor tradicional. **Os dois compartilham o AppModule** — nenhuma regra de negócio foi duplicada.

O `tsconfig.json` da API não inclui a pasta `api/` de propósito: ele emite para `dist/` com `rootDir: src`, e incluir o handler mudaria a estrutura da saída e quebraria `pnpm start`. Por isso existe o `tsconfig.typecheck.json`, que só confere tipos e cobre as duas pastas.

⚠️ **pnpm é estrito com dependências transitivas.** O handler importa `express`, que antes vinha só de carona pelo `@nestjs/platform-express` — precisou ser declarado explicitamente no `package.json` da API.

### Banco no Supabase

`DATABASE_URL` usa o **pooler** (porta 6543) com `?pgbouncer=true&connection_limit=1`; `DIRECT_URL` usa a **direta** (5432), porque migrations não funcionam através do pooler em modo transaction. O `schema.prisma` declara as duas.

Sem o pooler, cada invocação serverless abriria a própria conexão e estouraria o limite do Postgres em minutos.

### NestJS 10 → 11

O upgrade foi feito junto com a integração: o Nest 10 arrastava 10 vulnerabilidades por transitivas (`multer`, `file-type`, `qs`, `body-parser`). Depois do upgrade sobraram duas, resolvidas por override. **`pnpm audit --prod` reporta zero.**

### A porta entre os dois

`apps/site/src/app/treinamento/page.tsx` apresenta a plataforma e leva ao login dela. **Não existe segundo login no site** — a autenticação é da API, com cookie no domínio do jogo; duplicar criaria duas sessões e nenhuma vantagem.

A página avisa duas coisas que evitam frustração: que **não há cadastro aberto** (o admin cria os acessos) e que a plataforma **tem visual próprio, de jogo**.

### 🔴 Pendências

1. **Migrar o dump para o Supabase.** O `hackudinhos_dump.sql` tem 4 tabelas, 2 migrations e um usuário admin. É ação na conta do dev.
2. **Rotacionar os segredos.** O `JWT_SECRET` e a senha do Postgres do colega circularam fora de canal controlado. Quem tem o `JWT_SECRET` forja token de ADMIN. O dev ficou de trocar.
3. **Nome.** O jogo se chama "The Hackudinhos", o site é CIFRA. Falta decidir a marca guarda-chuva.
4. **Conteúdo duplicado.** `day-01.json` do jogo repete o caso de phishing da seção `/golpe`; há dois glossários (42 verbetes em `apps/site/src/lib/glossario.ts`, outro em `apps/jogo/lib/glossary.ts`). A sugestão é o jogo consumir a fonte do site.

### O que é o projeto do jogo

**Nome: "The Hackudinhos | Leroy Merlin"** (diferente de CIFRA — precisa de decisão de marca).

Monorepo pnpm + turbo, já em produção em `play.mizanis.com.br` (nginx, Let's Encrypt, systemd):

| Parte | Stack |
|---|---|
| `apps/api` | NestJS + Prisma + Postgres · auth JWT com roles, admin, phases, players, ranking, upgrades |
| `apps/web` | Next **16.2.12** + Tailwind **4** · rotas de jogo, minigames, ranking, loja, conquistas |
| `packages/shared` | engine de scoring/combo/phaseMachine **com testes**, schemas Zod, conteúdo em JSON (6 dias, pt + en) |

### Divergências técnicas com o site

| | Site CIFRA | Jogo |
|---|---|---|
| Next | 15.5.23 | 16.2.12 |
| Tailwind | 3 (config JS) | 4 (CSS-first, `@theme`) |
| Pacotes | npm | pnpm + turbo |
| Deploy | Vercel, estático | VPS nginx + systemd |
| Tema | escuro fixo | claro **e** escuro |
| Fontes | Barlow / Barlow Condensed | VT323, Pixelify Sans, Press Start 2P |

### ⚠️ A API NestJS não roda na Vercel como está

`apps/api/src/main.ts` faz `app.listen(porta)` — modelo de servidor com processo, incompatível com serverless. Adaptar exige reescrever o bootstrap **e** hospedar o Postgres num serviço acessível pela internet. Como já funciona na VPS, o plano acordado é: **Vercel serve o site e o front do jogo; a API e o banco ficam na VPS**.

### ✅ O que facilita muito a integração

`apps/web/lib/api/client.ts` chama sempre `/api/*` na **própria origem**, e o `next.config.ts` reescreve para `${API_ORIGIN}/api/*`. Ou seja: **o front do jogo roda na Vercel sem alterar uma linha de código** — basta definir `API_ORIGIN`. O rewrite ainda resolve CORS de brinde.

### Arquitetura combinada (a executar quando o projeto chegar)

```
CIFRA/
├── apps/
│   ├── site/        o site atual        → Vercel, projeto 1
│   ├── jogo/        o front deles       → Vercel, projeto 2 (env API_ORIGIN)
│   └── api/         NestJS              → VPS, não vai para a Vercel
├── packages/shared/ engine e conteúdo deles
└── Jogo/            protótipo Godot
```

Dois projetos Vercel apontando para o mesmo repositório, com Root Directory diferente. O projeto Vercel que já existe passa a ter Root Directory `apps/site`.

### Decisões de produto já tomadas

- **Não aproximar visualmente as duas identidades por enquanto.** São opostas por construção: a CIFRA é registro técnico institucional; o jogo é pixel art retrô. Trocar só a cor do jogo não o tornaria CIFRA — a tipografia pixel continuaria dominando — e o manual da CIFRA proíbe justamente o que um jogo precisa (ilustração, gradiente, glitch).
- **Nada de segundo login no site.** O jogo já autentica contra a API com JWT em cookie. O site ganha uma **porta**: página que apresenta o jogo e leva ao login dele.

### ⚠️ Dívida a resolver: conteúdo duplicado

Os dois lados ensinam a mesma coisa por caminhos diferentes, e vão divergir com o tempo:

- `day-01.json` do jogo tem um e-mail *"Sua conta será bloqueada em 24h!!!"* com `spoofType: "lookalike_domain"` — exatamente o caso do Banco Aurora na seção `/golpe` do site.
- **Dois glossários**: 42 verbetes em `src/lib/glossario.ts` (site) e outro conjunto em `apps/web/lib/glossary.ts` (jogo).

A sugestão é o jogo passar a consumir a mesma fonte de dados do glossário do site, em vez de manter a própria.

---

## 🎯 O que é o projeto

**CyberGuard** é um site de conscientização sobre golpes digitais, desenvolvido como projeto acadêmico (Challenge) em parceria com a **Leroy Merlin**.

- Faculdade: Defesa Cibernética — turma 2TDCPF
- **Público primário: público geral brasileiro** (golpes do dia a dia — PIX, Correios, WhatsApp clonado, falso emprego)
- **Camada corporativa secundária:** `/no-trabalho`, escrita para o contexto do varejo Leroy Merlin
- Abordagem: susto controlado + mecanismo. A pessoa aprende interagindo, não lendo aviso

### 🔀 Divisão de escopo (agosto/2026)

O projeto foi dividido entre os integrantes. **Este repositório é só o site**, mantido pelo Vinicius; o jogo e o backend ficaram com outro integrante.

Foram **removidos** daqui: login, cadastro, painel, rotas de API, middleware de sessão, schema Prisma, scripts de admin e o `.env.example`. Sem banco, sem backend, sem variável de ambiente.

⚠️ **Não reintroduza autenticação ou banco neste repositório** sem o dev pedir explicitamente. Além de fugir do escopo acordado, é o que tornava todas as páginas dinâmicas — hoje são todas estáticas. O código removido está no histórico do git, no commit anterior à remoção, caso alguém precise consultar.

A pasta `Jogo/` continua aqui, mas é mantida pelo outro integrante.

### Conceito central — "Você já está exposto"

A home revela ao vivo o que o navegador entrega sobre o visitante sem que ele digite nada, em cascata, como um dossiê sendo montado. Fecha com a virada: nada disso saiu do navegador, mas qualquer site consegue ver.

---

## 🗂️ Estrutura de pastas relevante

```
CyberGuard-main/            ← pasta principal do projeto (onde o npm run dev roda)
├── src/
│   ├── app/
│   │   ├── page.tsx                  ← Home: HeroDossie + Indice + bloco "sem estatística"
│   │   ├── senha/                    ← 01 · teste de senha
│   │   │   ├── page.tsx              ← server (metadata + fonte NIST)
│   │   │   └── TesteSenha.tsx        ← client (cálculo em tempo real)
│   │   ├── golpe/                    ← 02 · qual deles é golpe?
│   │   │   ├── page.tsx
│   │   │   └── QualEGolpe.tsx        ← client (quiz + destaque de sinais no texto)
│   │   ├── anatomia/                 ← 03 · como o golpe funciona por dentro
│   │   │   ├── page.tsx
│   │   │   └── LinhaDoTempo.tsx      ← client (revelação por máscara no scroll)
│   │   ├── agora/                    ← 04 · checklist acionável
│   │   │   ├── page.tsx
│   │   │   └── Checklist.tsx         ← client (estado em memória, nada persistido)
│   │   ├── ia/                       ← 04 · inteligência artificial
│   │   │   ├── page.tsx
│   │   │   ├── Triagem.tsx           ← client ("isso pode ir para uma IA?")
│   │   │   └── PalavraCodigo.tsx     ← client (sorteio via crypto, nada gravado)
│   │   ├── ja-cai/page.tsx           ← 06 · resposta a incidente (server, sem JS)
│   │   ├── glossario/                ← termos técnicos em português comum
│   │   │   ├── page.tsx
│   │   │   └── ListaGlossario.tsx    ← client (índice lateral fixo + busca sem acento)
│   │   ├── no-trabalho/page.tsx      ← camada corporativa Leroy Merlin
│   │   ├── sobre/page.tsx            ← regras de precisão do projeto
│   │   ├── contato/page.tsx          ← sem formulário, de propósito
│   │   ├── contato/page.tsx          ← sem formulário, de propósito
│   │   └── globals.css               ← tokens, foco visível, prefers-reduced-motion
│   ├── components/
│   │   ├── home/
│   │   │   ├── HeroDossie.tsx        ← o dossiê ao vivo (client, 100% local)
│   │   │   └── Indice.tsx            ← índice das 6 seções (client, Framer Motion)
│   │   ├── layout/                   ← Navbar, Footer, PageHeader
│   │   └── ui/
│   │       ├── TextoRico.tsx         ← `código` e **destaque** dentro de string
│   │       ├── Termo.tsx             ← link inline p/ glossário (sem importar dados)
│   │       ├── TermosRelacionados.tsx← bloco de fim de seção (só server component)
│   │       └── Button, Input, Fonte (+ PendenteVerificacao)
│   └── lib/
│       ├── dossie.ts                 ← coleta client-side do hero
│       ├── senha.ts                  ← análise de senha (padrões antes da matemática)
│       ├── golpes.ts                 ← os 4 pares de mensagens do quiz
│       ├── glossario.ts              ← 37 verbetes (id vira âncora /glossario#id)
│       ├── ia.ts                     ← triagem, mudanças e defesas da seção 04
│       ├── trabalho.ts               ← 14 golpes corporativos + resposta a incidente
│       ├── motion.ts                 ← variantes do Framer Motion
│       ├── motion.ts                 ← variantes do Framer Motion
│       └── utils.ts                  ← cn()
└── Contexto Claude/
    └── contexto.md                   ← este arquivo
```

**Rotas antigas** `/ameacas` e `/prevencao` são redirects 301 (em `next.config.ts`) para `/golpe` e `/agora`.

---

## 🛠️ Stack tecnológica

| Tecnologia | Versão | Uso |
|---|---|---|
| Next.js | 15.5.23 | Framework principal (App Router) — **versão travada, ver abaixo** |
| React | 19.2.8 | UI |
| Framer Motion | 11.11.17 | Animações |
| Tailwind CSS | 3.4.15 | Estilização |
| TypeScript | 5.6.3 | Tipagem |

**Fontes Google:** Inter Tight (corpo), IBM Plex Mono (manchete, rótulo e dado)

**Sem biblioteca de ícones:** `lucide-react` foi removido, a direção não usa ícone.

### 🔐 Por que a versão do Next está travada sem `^`

Em agosto/2026 a Vercel **recusou o deploy** com a mensagem "Vulnerable version of Next.js detected". Era o [CVE-2025-66478](https://nextjs.org/blog/CVE-2025-66478), CVSS 10.0 — execução remota de código pelo protocolo dos React Server Components, herdado do React (CVE-2025-55182).

Estávamos em 15.1.6. Subimos para **15.5.23**.

⚠️ **Nunca escreva `"next": "^15.x"` neste projeto.** O acento circunflexo permite resolver para qualquer 15.x, e várias delas são vulneráveis — as corrigidas são pontuais: 15.0.5, 15.1.9, 15.2.6, 15.3.6, 15.4.8, 15.5.7 e 16.0.7. Um `npm install` num dia ruim poderia cair numa 15.4.0 e o deploy volta a ser bloqueado. Versão exata, sempre.

### `overrides` no package.json

Existem três, todos para zerar vulnerabilidade de dependência transitiva. `npm audit --omit=dev` deve reportar **0 vulnerabilities** — se voltar a acusar, é aqui que se mexe.

| Pacote | Motivo |
|---|---|
| `postcss` ^8.5.23 | XSS e path traversal via `sourceMappingURL`; vem do Tailwind e do Next |
| `nanoid` ^3.3.17 | Loop infinito em gerador não-seguro; vem do postcss |
| `sharp` ^0.35.0 | Vulnerabilidades herdadas do libvips. É dependência **opcional** do Next para `next/image` — que este site não usa em lugar nenhum, então na prática nunca é carregado. O override evita que o `npm audit` acuse, sem precisar migrar para o Next 16 |

---

## ⚡ Desempenho

**Estado atual:** todas as 14 rotas são **estáticas** (`○` no build). Não há renderização no servidor a cada visita, não há função serverless: o build gera HTML e a Vercel serve de CDN.

Isso veio de graça ao remover a área autenticada. O que tornava tudo dinâmico era o `getCurrentUser()` no layout raiz, que chamava `cookies()` para a navbar mostrar o nome de quem estava logado. Sem login, sem navbar personalizada, sem dinamismo.

> Houve uma tentativa anterior de conseguir o mesmo efeito **mantendo** o login, revertida a pedido do dev. Ela também trocava o Framer Motion por `IntersectionObserver` + CSS, o que rendia mais ~40 KB por página (home 151→114 KB, anatomia 148→110 KB). Essa parte segue disponível no histórico, caso um dia o peso do Framer Motion incomode.

⚠️ Armadilhas já mapeadas, para quem for mexer em build:
1. Ao trocar configuração de build ou dependências, **apague o `.next`** antes de rebuildar. Cache stale já produziu um `Cannot find module for page: ...` sem relação nenhuma com o código.
2. **Nunca alterar className ou atributo do `<html>`/`<body>` por script antes da hidratação.** Uma tentativa de marcar `.js` no `<html>` causou erro de hidratação — o servidor mandava uma className e o cliente já tinha outra quando o React acordava para comparar. Se algum dia for inevitável, o caminho é `suppressHydrationWarning`; melhor ainda é `@media (scripting: enabled)` no CSS, que não precisa de script nenhum.
3. Se alguma página estática passar a usar `useSearchParams()`, o build quebra com `should be wrapped in a suspense boundary` — precisa de `<Suspense>` em volta do componente cliente.

**Recomendação de processo, aprendida na marra:** o dev deixa `npm run dev` rodando enquanto eu trabalho, então ele vê **todo estado intermediário quebrado** de uma refatoração grande. Refatoração ampla deve ser feita em passos pequenos, cada um com build passando, e não num bloco só.

---

## 🎨 Identidade CIFRA — manual v2 · paleta v1 · rev. 08/26

> ⚠️ Em agosto/2026 o projeto foi renomeado de **CyberGuard para CIFRA** e recebeu manual de identidade próprio (`CIFRA-identidade-grupo-paleta-v1.pdf`). A direção "laudo forense" descrita abaixo foi **substituída**. O manual é a autoridade — em caso de dúvida, ele vence.

**Conceito:** "Segurança que deixa registro." A marca não é cadeado nem escudo: é registro técnico com rigor de planta — linha fina, canto reto, nada decorativo. Chumbo porque é ferramenta de trabalho, não vitrine.

### Paleta (`tailwind.config.ts`)

| Token | Hex | Função — **uma cor, uma função** |
|---|---|---|
| `chumbo` | `#1B1D21` | fundo de tudo |
| `chumbo-painel` | `#2E3138` | superfície dos painéis |
| `papel` / `-2` / `-3` | `#F2F4F3` · `#A9AFAE` · `#868C8B` | todo o texto |
| `menta` (100–900, base 500) | `#3ED6A4` | ação, índice, link, concluído — **nunca pendente** |
| `petroleo` / `-claro` | `#164752` · `#1F6478` | campo institucional, "em andamento" — **só fundo** |
| `ambar` | `#F2A93D` | **só risco, só em bloco cheio** |

Contraste sobre chumbo: papel 15.4 · papel-2 7.6 · papel-3 5.0 · menta 9.2 · âmbar 8.5. Petróleo fica em 2.5 — por isso **não é cor de tinta**, é campo (usado no `PageHeader`).

### ⚠️ Princípio 03 — "Risco é bloco cheio, nunca acento"

O âmbar **não pode** virar fio, borda, brilho, sublinhado nem texto solto. Só existe como bloco de tinta cheia com o texto invertido em chumbo. Três utilitários no `globals.css` cobrem os casos:

| Classe | Uso |
|---|---|
| `.bloco-risco` | bloco inteiro em âmbar (aviso de urgência) |
| `.etiqueta-risco` | etiqueta inline em âmbar (veredito "Fraude", "Frágil", "urgente") |
| `.marca-risco` | marca-texto dentro de um exemplo de mensagem |

**Não existe vermelho na paleta.** Onde havia vermelho para "fraude", hoje há âmbar em bloco; onde havia verde para "legítimo", há menta. Ganho colateral: âmbar contra menta é mais distinguível para daltônicos que vermelho contra verde, e o bloco cheio dá redundância de forma além da cor.

### Tipografia

**Barlow Condensed** (`font-display`) nomeia — título, etiqueta, botão. **Barlow** (`font-sans`) explica — corpo. Números sempre tabulares (`.tabular`). Sobre chumbo o corpo nunca desce de 400 nem de 15px: peso fino em fundo escuro fecha o contorno da letra e cansa a leitura.

### Marca (`components/layout/Marca.tsx`)

Hexágono de linha fina cortado por eixo vertical, com hexágono sólido em menta no centro — o registro. É a **única forma sólida e o único preenchimento em menta** da marca. NÃO FAÇA, direto do manual: arredondar vértices, trocar a cor do índice, apertar o entreletramento de CIFRA, usar o símbolo abaixo de 20px com o eixo (nessa medida o `Simbolo` já remove o eixo sozinho).

### O que existe no manual e **não** está no site

- **Selo de registro** (`CFR-04-0231/26`): não implementado de propósito. O manual diz "se não há registro real, não há selo" — e o site é informativo, sem login nem módulo, então não há registro a emitir. Código inventado violaria a regra dura da identidade.
- **Mascote O Vigia**: hexágono com dois olhos quadrados em menta, quatro estados. Ainda não desenhado.

---

## 🎨 Design System anterior — "laudo forense" (SUBSTITUÍDO)

### Cores (`tailwind.config.ts`)
```
page:          #16181B   (fundo)
panel:         #1D2024   (painel)
panel-raised:  #24282D
line:          #2E333A   (borda)
line-strong:   #3D444D
ink:           #E8E6E2   (texto)
ink-2:         #A8AEB6   (secundário)
ink-3:         #858C95   (fraco — ainda passa AA sobre page e panel)
signal-amber:  #E8A33D   (ATENÇÃO)
signal-red:    #F2555A   (FRAUDE)
signal-green:  #58D08B   (LEGÍTIMO / privacidade garantida)
```

### Três regras inegociáveis da direção

1. **Cor de sinal tem significado fixo e nunca é decorativa.** Âmbar = atenção, vermelho = fraude, verde = legítimo. Não usar cor "porque fica bonito".
2. **Mono só em manchete, rótulo e dado.** Prosa corrida é sempre `font-sans` (Inter Tight) em `text-body`/`text-bodyLg`. Mono em parágrafo é ilegível para o público-alvo.
3. **Zero glow, zero neon, zero verde-terminal, zero borda animada.** É o que separa "laudo" de "clichê de hacker".

Contraste medido (WCAG 2.1) sobre `page`: ink 15,6 · ink-2 7,9 · ink-3 5,2 · âmbar 8,2 · vermelho 5,3 · verde 9,2. Todos passam AA.

### Tema: dark fixo (`color-scheme: dark`)

---

## ✨ Animações

Vocabulário centralizado em **`src/lib/motion.ts`**, com Framer Motion.

| Variante | Efeito |
|---|---|
| `maskReveal` | Revelação por máscara (`clip-path: inset(0 100% 0 0)` → `inset(0)`) — o padrão |
| `riseIn` | Subida curta + fade, para títulos |
| `stagger(delay)` | Cascata entre filhos |
| `staticVariants` | Estado final imediato, usado sob `prefers-reduced-motion` |
| `VIEWPORT` | `{ once: true, margin: "-60px 0px" }` |

**Easing padrão:** `[0.22, 1, 0.36, 1]` (exportado como `EASE`, também disponível como `ease-forense` no Tailwind).

**Regra de acessibilidade:** todo componente animado chama `useReducedMotion()` do Framer Motion e troca para `staticVariants`. O `globals.css` tem também o interruptor CSS global sob `@media (prefers-reduced-motion: reduce)`, que zera duração de animação/transição e desliga o scroll suave.

Quem usa: `Indice.tsx` e `LinhaDoTempo.tsx` (ambos client components por causa disso) e `HeroDossie.tsx`, que importa só o `useReducedMotion`.

A cascata do hero é diferente das demais: usa `animation-delay` inline sobre a classe CSS `.mask-in`, porque dispara no carregamento e não no scroll. Todas as linhas ficam no DOM de uma vez (para leitor de tela receber tudo), só a revelação é escalonada.

---

## 🔒 Regras de privacidade do código (não quebrar)

`src/lib/dossie.ts` e `src/lib/senha.ts` têm um contrato explícito:

- Nenhuma requisição de rede, nenhum envio, nenhum servidor
- Nenhum analytics, nenhum rastreador de terceiros no site inteiro
- Nada de geolocalização precisa, nada de permissão de câmera/microfone
- **Única gravação em todo o site:** a chave `cyberguard:visitou` no `localStorage`, declarada na tela e com botão de apagar ao lado
- Toda leitura de API do navegador é individualmente protegida — API ausente vira linha "seu navegador não informa", nunca exceção

---

## 📐 Regras de conteúdo (não quebrar)

- **Número só entra com autor, obra e ano na mesma tela**, via o componente `<Fonte>`. Sem fonte primária conferível, o número não entra.
- **URL de canal oficial nunca é inventada.** Não conferida → `<PendenteVerificacao>` visível, com instrução de como chegar lá com segurança.
- **Nunca culpar a vítima.** O tom é sempre "isso acontece com qualquer um".
- Links já conferidos em `/ja-cai`: delegacia eletrônica SP, Registrato (gov.br), Consumidor.gov.br, Anatel. Delegacias dos demais estados seguem marcadas como pendentes.

---

## 📖 Glossário — como ligar um termo ao verbete

Dois componentes, separados **de propósito**:

| Componente | Onde usar | Por quê |
|---|---|---|
| `<Termo id="https">` (`ui/Termo.tsx`) | Inline, dentro de JSX — inclusive em client component | **Não importa `glossario.ts`.** Puxar os 33 verbetes para o bundle do cliente custaria ~15 KB à toa |
| `<TermosRelacionados ids={[...]}>` (`ui/TermosRelacionados.tsx`) | Rodapé de seção, **só em server component** | Precisa dos nomes dos verbetes; como roda no servidor, o custo é zero no navegador |

Muito conteúdo do site vive em array de string (quiz, checklist, linha do tempo), onde não dá para pôr link inline sem virar JSX — por isso a ponte é feita no rodapé com `TermosRelacionados`.

**Regra de uso do `<Termo>`:** só na primeira aparição do termo em cada página. Parágrafo cheio de sublinhado pontilhado fica mais difícil de ler, não mais fácil.

A âncora usa `.verbete:target` (definido no `globals.css`, não via variante `target:` do Tailwind) mais `scroll-mt-40`, que compensa a navbar e a barra de busca grudadas no topo.

⚠️ Em `ListaGlossario.tsx`, a normalização de acento usa `/\p{Mn}/gu` e **não** um intervalo literal de caracteres combinantes. Já quebrou uma vez: caractere combinante é invisível no editor e vira intervalo inválido se o arquivo for salvo na codificação errada.

### Layout do glossário

Índice fixo na coluna esquerda (`lg:sticky`), verbetes correndo à direita. A busca mora **dentro do índice**, nunca grudada no topo da coluna de leitura — quando estava lá, cada rolagem escondia uma faixa do texto atrás dela. O realce do item ativo usa `IntersectionObserver` com `rootMargin: "-80px 0px -70% 0px"`, faixa estreita para dois verbetes não disputarem o destaque.

### `<TextoRico>` — markdown mínimo em string

`ui/TextoRico.tsx` converte `` `código` `` e `**destaque**` dentro de textos que vivem em arquivo de dados. Sem ele, crase e asterisco aparecem **literalmente** na tela — foi exatamente o que aconteceu na primeira versão do glossário. Constrói elementos React, nunca HTML: não há caminho para injeção.

Se escrever conteúdo novo em `glossario.ts` (ou qualquer array de string renderizado com `TextoRico`), pode usar as duas marcações. Em qualquer outro array, **não use markdown** — vai sair cru.

---

## 🤖 Regras da seção de IA (`/ia`)

Duas regras específicas, além das gerais:

1. **Nenhum número na página.** Circulam muitas estatísticas sobre golpe com IA e quase nenhuma resiste à conferência — quase todas vêm de fornecedor de segurança vendendo produto. A página declara essa ausência em vez de escondê-la.
2. **Nada de alarme.** O leitor deve sair sabendo o que mudou e o que continua funcionando, não com medo de usar a ferramenta. A página reconhece que IA também está na defesa (filtro de spam, antifraude bancário).

**Decisão de design importante:** a parte interativa é uma triagem de "isso pode ir para uma IA pública?", e **não** um quiz de "adivinhe qual texto foi escrito por IA". O segundo ensinaria uma habilidade falsa — hoje não dá para distinguir de forma confiável, e quem sai achando que consegue fica mais vulnerável, não menos.

O eixo da parte 3 é: as defesas que sobrevivem são as que **não dependem de detectar a falsificação** (palavra-código, retorno pelo canal conhecido, nome do dono da chave PIX, 2FA).

---

## 🏢 Camada corporativa (`/no-trabalho`) — como escrever conteúdo novo

Dados em `src/lib/trabalho.ts`. São **14 golpes em 5 famílias**: quem finge ser gente de dentro (4), dinheiro que muda de destino (3), acesso à conta de trabalho (3), código que entra junto (3), vazamento sem ataque (1).

**Todo golpe tem quatro campos, e o terceiro é o que importa:**

| Campo | O que vai nele |
|---|---|
| `comoChega` | O que a pessoa vê acontecer |
| `porQueFunciona` | Qual gatilho psicológico ou falha de processo é explorado |
| `pontoDeQuebra` | **O momento exato em que a corrente arrebenta** |
| `oQueFazer` | A ação concreta, em uma ou duas frases |

⚠️ Ao adicionar um golpe, o `pontoDeQuebra` **não pode ser conselho genérico**. Não é "tenha atenção", é o elo específico: "no botão de habilitar conteúdo — antes dele o arquivo é inerte, depois dele o código roda". É esse campo que separa este material de uma lista de boas práticas.

**Decisão de escopo (agosto/2026):** esta página é **informativa, sem quiz**. A parte gamificada do projeto fica com outro integrante — não adicione interativo aqui sem o dev pedir.

### A seção de cultura de reporte

O eixo: o tamanho de um incidente é definido por quantos minutos passaram até alguém poder agir, não pela técnica do ataque. E o que mais alarga esse intervalo é vergonha, não falta de treinamento. A seção enfrenta as quatro frases que passam pela cabeça de quem acabou de clicar em algo errado, e fecha com um trecho dirigido a quem lidera.

### O prazo da LGPD

**Três dias úteis** para comunicar à ANPD e aos titulares, contados de quando a empresa soube que o incidente afetou dados pessoais. Fonte na tela: Resolução CD/ANPD nº 15/2024. Não altere esse número sem reconferir na fonte.

---

## 📋 Regra importante — Server vs Client Components

Pages com `export const metadata` **não podem** ser `"use client"`. Padrão adotado:

- `page.tsx` → **server component** (metadata + PageHeader + importa client component)
- `NomeAlgumaCoisa.tsx` → **client component** (`"use client"`), quando há estado, evento ou animação

Mantenha o `"use client"` no menor componente possível: o texto de um client component vai inteiro para o bundle do navegador.

---

## 🐛 Armadilha já pisada — coleta cancelada no StrictMode

O hero ficava **vazio ao voltar para a home por navegação** (funcionava só depois de recarregar a página). Causa: o efeito tinha uma trava `useRef` para não gravar a visita duas vezes, combinada com um cancelamento (`ativo = false`) no cleanup. No StrictMode, a sequência é montar → limpar → montar: a primeira coleta era cancelada e a segunda saía cedo pela trava, então nada preenchia a lista. Corria uma corrida com o `await getBattery()`, o que explicava funcionar às vezes.

**Solução:** a trava saiu do componente e virou estado de módulo em `lerEMarcarVisita()` (`dossie.ts`), que lê e grava uma vez só por carregamento de página e é idempotente. O efeito voltou a ser simples: coleta, e cancela no cleanup.

**Lição para o próximo efeito assíncrono:** nunca combinar trava de "já rodou" com cancelamento no cleanup. Ou o trabalho é idempotente e pode rodar duas vezes, ou o estado que precisa ser único mora fora do componente.

---

## 📄 Páginas existentes

| Rota | Descrição |
|---|---|
| `/` | Home — dossiê ao vivo, a virada, índice das 5 seções, camada corporativa |
| `/senha` | 01 · teste de senha em tempo real (padrões checados antes da força bruta) |
| `/golpe` | 02 · 4 pares de mensagens; sinais destacados dentro do próprio texto |
| `/anatomia` | 03 · clonagem de WhatsApp em 8 passos, do lado de quem aplica |
| `/ia` | 04 · privacidade em chatbot, o que a IA mudou nos golpes, defesas que resistem |
| `/agora` | 05 · checklist de 8 itens com porquê e impacto |
| `/ja-cai` | 06 · primeiras horas em ordem + canais oficiais (server, funciona sem JS) |
| `/glossario` | 37 termos explicados, com busca e índice lateral. Âncora por termo (`#https`) |
| `/no-trabalho` | Camada corporativa: 14 golpes em 5 famílias, cultura de reporte, resposta a incidente + LGPD |
| `/sobre` | Regras de precisão e acessibilidade do projeto |
| `/contato` | Canais — sem formulário de propósito (não havia backend) |
| `/ameacas` `/prevencao` | Redirect 301 → `/golpe` e `/agora` |

---

## ⚠️ Observações importantes

- O formulário de contato foi **removido** — um formulário sem backend dá a impressão falsa de envio, e num site sobre golpes isso é inaceitável
- Comandos de verificação: `npm run typecheck` (tsc --noEmit) e `npm run build`
- **Docker foi removido do projeto** (agosto/2026, a pedido do dev). Não existem mais `docker-compose.yml`, `Dockerfile` nem `.dockerignore`, e o `next.config.ts` deixou de usar `output: "standalone"`, que só servia para a imagem
- `.next/` pode ficar em cache desatualizado — deletar se mudanças não aparecerem, e **sempre** depois de mexer em configuração de build ou dependências
- **Sistema operacional:** o dev usa **Linux e Windows** (dual). Sempre documentar comandos para **ambos**:

| Tarefa | Linux (bash) | Windows (PowerShell) |
|---|---|---|
| Apagar `.next` | `rm -rf .next` | `Remove-Item -Recurse -Force .next` |
| Rodar dev | `npm run dev` | `npm run dev` |

---

## 🎮 Jogo CyberGuard (Godot) — pasta `Jogo/`

Jogo educativo de conscientização em cibersegurança, complementar ao site. Documento de design completo em PDF: `Jogo/GameDesignDocument.pdf`.

### Decisões travadas

| Item | Decisão |
|---|---|
| Engine | **Godot 4.x** · 2D · GDScript |
| Perspectiva | Top-down |
| Arte | **Pixel art** (ref: Soulbound, Core Keeper, Stardew) — assets prontos + IA |
| Gênero | Action-puzzle **híbrido** (explora em tempo real, boss = puzzle temático) |
| Estrutura | Hub central → jogador escolhe qual boss enfrentar (metroidvania: alguns exigem itens de outros) |
| Bosses | 5 setores: **Worm (tutorial) → Ransomware → Spyware → Adware → Phisher** |
| Educação | História + lore pós-batalha + **sistema de consequência** (recompensa que tenta o jogador; ex: item-phishing renasce o boss se clicar errado) |
| Sistemas RPG | Vida + Mana (justificam itens coletáveis pelo mapa) |
| Plataforma | Dev local; export **web (HTML5)** embutido no site depois (export Godot 4 web exige headers COOP/COEP) |
| Integração site | XP/quem zerou/ranking — **futuro, não prioridade** |
| 1ª demo | Tutorial Worm completo + hub com 5 portais (4 bloqueados) |

### NPCs / Lore chave (inegociáveis do Vini)
- **Professor NPC** que leva o jogador ao "Mundo Virtual"
- **Mistério / pistas** sobre a origem da infecção

### Roadmap por fases
- **Fase 0** — Fundamentos: boneco anda top-down, colisão, câmera
- **Fase 1** — Tutorial Worm jogável (mini-game + vida/mana + lore + item) → 1ª demo
- **Fase 2** — Hub + 5 portais + transição de cena
- **Fase 3** — 1º boss real (Ransomware) + save de progresso
- **Fase 4+** — demais bosses, sistema de consequência, gating metroidvania, conteúdo educativo
- **Final** — export web + integração com o site

### Contexto do dev (importante)
- **Solo**, nunca usou Godot/GDScript → guiar passo-a-passo, didático
- ~2h/dia de disponibilidade
- Prazo: ~outubro, com apresentações de progresso ao longo do ano

### 🔧 Instalação do Godot (versão usada: **4.6.3 stable**, build padrão GDScript)

**Linux (feito no dev atual — Ubuntu 26.04):**
```bash
# Baixar o binário oficial (single executable)
cd /tmp
curl -sL -o godot.zip "https://github.com/godotengine/godot/releases/download/4.6.3-stable/Godot_v4.6.3-stable_linux.x86_64.zip"
unzip godot.zip
mkdir -p ~/.local/bin
mv Godot_v4.6.3-stable_linux.x86_64 ~/.local/bin/godot4
chmod +x ~/.local/bin/godot4
# ~/.local/bin já está no PATH via ~/.zshrc → chamar com: godot4
```
- Atalho no menu de apps: `~/.local/share/applications/godot4.desktop`
- Abrir editor pela linha de comando: `godot4 --editor --path /caminho/Jogo`

**Windows:**
1. Baixar em https://godotengine.org/download/windows → **Godot Engine 4.6.3** (NÃO a versão .NET/Mono — usamos GDScript puro)
2. É um `.exe` portátil (não tem instalador) → extrair o zip e dar duplo-clique no `Godot_v4.6.3-stable_win64.exe`
3. Sugestão: colocar o `.exe` numa pasta fixa (ex: `C:\Godot\`) e criar atalho na área de trabalho

> ⚠️ Mesma versão (4.6.3) nos dois SOs para evitar incompatibilidade de arquivos de projeto.

### 📁 Estrutura do projeto Godot (`Jogo/`)
```
Jogo/
├── project.godot          ← config do projeto (Godot reescreve ao salvar — normal)
├── icon.svg               ← ícone do app (escudo roxo "C")
├── .gitignore             ← ignora .godot/ (cache gerado, não versionar)
├── scenes/
│   ├── main.tscn          ← cena principal: sala com paredes + Player (main_scene)
│   └── player.tscn        ← Player: CharacterBody2D + Polygon2D + Collision + Camera2D
└── scripts/
    └── player.gd          ← movimento top-down (Input.get_vector + move_and_slide)
```
**Config do projeto:** resolução base 640×360, janela 1280×720, renderer `gl_compatibility` (melhor p/ web), filtro de textura Nearest (pixel art nítida).

### ✅ Status do desenvolvimento do jogo
- **Fase 0 — Fundamentos:** ✅ projeto criado, personagem anda top-down (SETAS + WASD) e colide com paredes. Câmera segue o player.
- **Personagem (arte real):** ✅ substituído o placeholder pelo **CraftPix Swordsman lvl1** (pack `craftpix-net-180537...`). Sheets usados: `art/swordsman_walk.png` (384×256, 6 frames/dir) e `art/swordsman_idle.png` (768×256, 12 frames/dir) — versões *with_shadow*.
  - Grade: frame **64×64**, ordem das linhas **row0=down, row1=left, row2=right, row3=up**.
  - `player_frames.tres` gerado por script com 8 animações: `walk_down/left/right/up` (speed 10) + `idle_down/left/right/up` (speed 8). `player.gd` toca `idle_<facing>` quando parado.
  - Colisão ajustada para os pés: `RectangleShape2D` 14×10 em `(0, 10)`.
  - **Lembrete de licença:** assets CraftPix freebie — não redistribuir em git público; manter `art/craftpix-net-*` fora de repositório aberto.
- **Primeiro setor (sala-tutorial):** ✅ chão preto liso substituído por uma **sala com tileset real** (dungeon pack `craftpix-net-169442`). Tileset `art/dungeon_tiles.png` (16×16), floor=atlas (1,10), wall=atlas (1,3).
  - `scenes/dungeon_tileset.tres` — recurso `TileSet` com a fonte de atlas e **colisão por tile** na parede (physics_layer_0). Andar = floor, parede = bloqueia.
  - `scenes/main.tscn` — sala 30×18 tiles com 2 `TileMapLayer` (Floor + Walls) e o Player no centro (240,144).
  - **Como a sala foi gerada:** `tools/build_room.gd` (script `SceneTree`) preenche os tiles via `set_cell()` e o Godot salva o `tile_map_data` no formato (PackedByteArray) correto da versão. Rodar de novo: `godot4 --headless --path . --script res://tools/build_room.gd`. Editável também direto no editor (pintando tiles).
- **NPC Professor + diálogo:** ✅ primeiro NPC interativo no jogo.
  - **Sprite:** `art/professor.png` (Mage1 do guild hall, frames 64×52). `scenes/professor_frames.tres` = `idle` com **1 frame só (parado)** — o resto da sheet é animação de "conjurar", que não combina com o tema. Limpei o "seam" de 1px entre frames.
  - **Narrativa = tecnologia, não magia:** as falas usam "digitalizado / conexão estabelecida / infecção", sem feitiço. (O sprite de mago é só visual provisório do mentor.)
  - **`scenes/professor.tscn`** — `StaticBody2D` (bloqueia passagem) + `AnimatedSprite2D` + `Area2D` (raio 28 detecta o player) + `Label` "[E] falar" que aparece quando o player chega perto. Falas editáveis no Inspetor (`@export lines`).
  - **`scripts/professor.gd`** — detecta player pela tag de grupo `"player"`; ao apertar interagir, chama `Dialogue.start(lines, "Professor")`.
  - **Sistema de diálogo reutilizável:** `scenes/dialogue_box.tscn` + `scripts/dialogue_box.gd`, registrado como **autoload `Dialogue`** (`project.godot`). API: `Dialogue.start([...], "Nome")`, `Dialogue.is_open()`. Caixa no rodapé (CanvasLayer), avança/fecha com a ação **`interact`**.
  - **Input novo:** ação **`interact`** = E / Espaço / Enter (adicionada no Input Map).
  - **Player:** agora entra no grupo `"player"` no `_ready()` (pra NPCs detectarem).
- **Porta / transição entre cenas:** ✅ player anda até a porta e aperta **E** para trocar de cena (Saguão ↔ Setor de Suporte).
  - **`scripts/door.gd`** — `Area2D` reutilizável. Exports no Inspetor: `target_scene` (`@export_file("*.tscn")`) e `prompt_text`. Quando o player está perto (detecção por grupo `"player"`) e o diálogo está fechado, ao apertar `interact` chama `get_tree().change_scene_to_file(target_scene)`. Como é por tecla (não por toque), **não** fica trocando de cena em loop.
  - **`scenes/door.tscn`** — `Area2D` "Door" + `Sprite2D` (arte `art/door.png`) + `Trigger` (`CollisionShape2D`, `CircleShape2D` raio 24) + `Prompt` `Label`. O sprite usa **offset (0,0)** (a origem do nó = centro da porta), então a posição do nó na cena é onde a porta aparece.
  - **Arte:** `art/door.png` — porta em arco recortada do dungeon pack, **32×29 px** (~2 tiles de largura). Recorte final do atlas: `crop((80,302,112,336))` e trim das linhas transparentes embaixo.
  - **Posicionamento (encaixar na parede):** porta tem 32 de largura = 2 tiles; centralizar em x múltiplo de 16 cobre 2 colunas certinho.
    - `main.tscn` → `DoorToSupport` em **(240,270)** na parede de baixo, `target_scene = setor_suporte.tscn`.
    - `setor_suporte.tscn` → `DoorBack` em **(192,16)** na parede de cima, `target_scene = main.tscn`.
  - ⚠️ Ainda **não** tem "spawn point": ao voltar pro Saguão o player nasce na posição fixa inicial (240,144), não ao lado da porta. (Melhoria futura.)
- **Próximo:** decorar a sala (objetos/tochas/rachaduras do dungeon pack), primeiro inimigo (Worm) ou puzzle, coletáveis (cristais HP/mana), HUD de HP/mana.
