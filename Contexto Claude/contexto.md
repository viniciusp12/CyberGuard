# Contexto do Projeto — CyberGuard

> Arquivo de referência para o Claude. Atualizar sempre que houver mudanças relevantes no projeto.

---

## 🎯 O que é o projeto

**CyberGuard** é uma plataforma gamificada de conscientização em segurança cibernética, desenvolvida como projeto acadêmico (Challenge) em parceria com a **Leroy Merlin**.

- Faculdade: Defesa Cibernética — turma 2TDCPF
- Objetivo: transformar colaboradores da Leroy Merlin em uma linha de defesa ativa contra ameaças digitais
- Abordagem: conteúdo sério + gamificação (pontos, conquistas, ranking entre lojas)

---

## 🗂️ Estrutura de pastas relevante

```
Codigo/Challenger/          ← pasta principal do projeto (onde o npm run dev roda)
├── src/
│   ├── app/
│   │   ├── page.tsx                  ← Home (server component, importa componentes home/)
│   │   ├── ameacas/
│   │   │   ├── page.tsx              ← server component (só metadata + PageHeader)
│   │   │   └── AmeacasCards.tsx      ← client component com animações dos cards
│   │   ├── prevencao/
│   │   │   ├── page.tsx              ← server component (só metadata + PageHeader)
│   │   │   └── PrevencaoCards.tsx    ← client component (PrevencaoCards + IncidentCards)
│   │   ├── sobre/
│   │   │   ├── page.tsx              ← server component (só metadata + PageHeader)
│   │   │   └── SobreContent.tsx      ← client component com todas as seções animadas
│   │   ├── contato/
│   │   │   ├── page.tsx              ← server component (metadata + form estático)
│   │   │   └── ContatoCards.tsx      ← client component só dos 3 cards (email/suporte/local)
│   │   ├── dashboard/page.tsx
│   │   ├── login/page.tsx
│   │   ├── registro/page.tsx
│   │   └── globals.css               ← estilos globais + classes de animação
│   ├── components/
│   │   ├── home/
│   │   │   ├── Hero.tsx              ← já tinha Framer Motion (animações de load)
│   │   │   ├── TrustMarquee.tsx      ← fade-in scroll
│   │   │   ├── Pillars.tsx           ← stagger cards + conic border
│   │   │   ├── Stats.tsx             ← stagger + blur cells
│   │   │   ├── Process.tsx           ← slide-in rows da esquerda
│   │   │   └── CTA.tsx               ← scale + stagger interno
│   │   ├── layout/
│   │   │   ├── Navbar.tsx
│   │   │   ├── Footer.tsx
│   │   │   └── PageHeader.tsx
│   │   └── ui/
│   │       ├── Badge.tsx
│   │       ├── Button.tsx
│   │       ├── Input.tsx
│   │       └── SectionHeading.tsx
│   └── lib/
│       ├── auth.ts
│       ├── prisma.ts
│       └── utils.ts
├── docker-compose.yml                ← usado para deploy na VPS (não para dev local)
├── Dockerfile
└── Contexto Claude/
    └── contexto.md                   ← este arquivo
```

---

## 🛠️ Stack tecnológica

| Tecnologia | Versão | Uso |
|---|---|---|
| Next.js | 15.1.6 | Framework principal (App Router) |
| React | 19.0.0 | UI |
| Framer Motion | 11.11.17 | Animações (já instalado) |
| Tailwind CSS | 3.4.15 | Estilização |
| Lucide React | 0.460.0 | Ícones |
| Prisma | 5.22.0 | ORM (banco PostgreSQL) |
| TypeScript | 5.6.3 | Tipagem |

**Fontes Google:** Inter (body), Space Grotesk (display), JetBrains Mono (mono)

---

## 🎨 Design System

### Cores
```
background:       #0a0a0b   (quase preto)
foreground:       #f5f5f7   (branco suave)
accent:           #b47cff   (roxo — cor principal de destaque)
accent/glow:      rgba(180, 124, 255, 0.18)
surface:          #111114   (cards)
surface-elevated: #17171c   (cards hover)
surface-border:   #22222a   (bordas)
danger:           #ff5d5d   (crítico)
warning:          #ffb84d   (alto)
brand/leroy:      #78BE20   (verde Leroy Merlin)
```

### Tema: dark mode fixo (`color-scheme: dark`)

---

## ✨ Animações implementadas

### Padrão de scroll (Framer Motion `whileInView`)
Todos os componentes abaixo usam `"use client"` e `whileInView` com `viewport={{ once: true, margin: "-80px 0px" }}`:

| Componente | Efeito |
|---|---|
| `TrustMarquee` | Fade-in da seção |
| `Pillars` | Heading fade-up · cards stagger (scale + fade-up) |
| `Stats` | Heading fade-up · células blur→nítido staggeradas |
| `Process` | Heading fade-up · linhas slide da esquerda staggeradas |
| `CTA` | Card scale 0.96→1 · conteúdo interno staggerado |
| `AmeacasCards` | Grid stagger fade-up + scale |
| `PrevencaoCards` | Grid stagger fade-up + scale |
| `IncidentCards` | Grid stagger fade-up + scale |
| `SobreContent` | Missão: fade left/right · Valores: stagger cards · Objetivos: slide direita |
| `ContatoCards` | 3 cards stagger fade-up + scale |

**Easing padrão:** `[0.16, 1, 0.3, 1]` (spring suave, igual ao Hero original)

### Conic Border (CSS puro — `globals.css`)

Animação de borda girando com `@property --border-angle` + `conic-gradient`:

| Classe CSS | Comportamento | Duração |
|---|---|---|
| `.conic-border` | Aparece só no hover (branco) | 2.8s |
| `.conic-border-active` | Sempre visível (branco) | 11.2s |
| `.conic-border-active-accent` | Sempre visível (**roxo** — padrão atual) | 11.2s |

**Classe em uso em todo o site:** `.conic-border-active-accent`

Componentes que usam `conic-border-active-accent`:
- `Pillars.tsx` (4 cards da home)
- `AmeacasCards.tsx` (6 cards de ameaças)
- `PrevencaoCards.tsx` (6 cards de práticas + 5 cards de incidente)
- `SobreContent.tsx` (4 cards de valores + 4 itens de objetivos)
- `ContatoCards.tsx` (3 cards de contato)

---

## 📋 Regra importante — Server vs Client Components

Pages com `export const metadata` **não podem** ser `"use client"`. Padrão adotado:

- `page.tsx` → **server component** (metadata + PageHeader + importa client component)
- `NomeContent.tsx` ou `NomeCards.tsx` → **client component** (`"use client"` + animações)

---

## 🐳 Docker / Deploy

- `docker-compose.yml` usa build da imagem — **mudanças locais não aparecem sem rebuild**
- Comando de rebuild: `docker compose build app && docker compose up -d`
- Para dev local: **apenas `npm run dev`** na pasta `Codigo/Challenger/`
- VPS usa Tailscale para bind (`BIND_HOST`) — não expõe à internet pública diretamente

### 🖥️ VPS — Configuração atual

| Item | Detalhe |
|---|---|
| Hostname | `vmi3119384` |
| Projeto na VPS | `/root/Challenger/` |
| OS | Linux (Debian/Ubuntu) |
| Docker | ✅ Instalado |
| Tailscale | ✅ Instalado |
| UFW (firewall) | ⏳ Pendente — configurar depois que amigo terminar de testar |

**Subindo o projeto na VPS:**
```bash
cd ~/Challenger
docker compose up -d

# Verificar status
docker compose ps
docker compose logs app --tail=50
```

**Rebuild quando houver mudanças no código:**
```bash
cd ~/Challenger
docker compose down
docker compose build app
docker compose up -d
```

### ⚠️ Bugs encontrados e resolvidos no deploy

#### Bug 1 — `BIND_HOST=0.0.0.1` (typo)
- **Sintoma:** `failed to bind host port 0.0.0.1:80/tcp: cannot assign requested address`
- **Causa:** `.env` tinha `BIND_HOST=0.0.0.1` (endereço inválido — faltou um zero)
- **Solução:** corrigir para `BIND_HOST=0.0.0.0` (aceita conexões de qualquer IP)
- **Quando usar Tailscale:** trocar para o IP Tailscale da VPS (`100.x.x.x`) para bloquear acesso público

#### Bug 2 — `DATABASE_URL` errado no `.env`
- **Sintoma:** `P1001: Can't reach database server at db:5432`
- **Causa:** `.env` tinha `DATABASE_URL` apontando para `localhost` com senha `postgres` (era config de dev local). O Docker Compose sobrescreve isso no `environment:` do serviço, mas gerava confusão
- **Solução:** remover `DATABASE_URL` do `.env` — só manter as variáveis que o `docker-compose.yml` precisa

#### `.env` correto para produção na VPS:
```env
POSTGRES_PASSWORD=senha_forte_aqui
JWT_SECRET=chave_longa_aqui
NEXT_PUBLIC_APP_NAME=CyberGuard
BIND_HOST=0.0.0.0
```
> **Não colocar** `DATABASE_URL`, `NODE_ENV` ou configs de dev local no `.env` da VPS

### 🔒 Plano de segurança VPS (pendente)

Quando não precisar mais de acesso público para o amigo testar:

```bash
# Bloqueia tudo por padrão
ufw default deny incoming
ufw default allow outgoing

# Libera SSH e porta 80 só pela interface Tailscale
ufw allow in on tailscale0 to any port 22 proto tcp
ufw allow in on tailscale0 to any port 80 proto tcp

# Tailscale precisa dessa porta UDP
ufw allow 41641/udp

ufw enable
```

Depois trocar no `.env`:
```env
BIND_HOST=100.x.x.x   ← IP Tailscale da VPS
```
E fazer rebuild: `docker compose down && docker compose up -d`

---

## 📄 Páginas existentes

| Rota | Descrição |
|---|---|
| `/` | Home — Hero, Marquee, Pillars, Stats, Process, CTA |
| `/ameacas` | 6 cards de ameaças cibernéticas com nível (Crítica/Alta/Média) |
| `/prevencao` | 6 cards de boas práticas + 5 cards de resposta a incidentes |
| `/sobre` | Missão, Valores (4 cards), Objetivos (4 itens) |
| `/contato` | 3 cards de contato + formulário estático (sem backend ainda) |
| `/login` | Formulário de login |
| `/registro` | Formulário de cadastro |
| `/dashboard` | Dashboard do usuário (autenticado) |

---

## ⚠️ Observações importantes

- O formulário de contato é **ilustrativo** — sem integração backend ainda
- Auth usa JWT (`JWT_SECRET` via env)
- Banco PostgreSQL via Prisma — porta 5432 **não exposta** ao host no Docker
- `.next/` pode ficar em cache desatualizado — deletar se mudanças não aparecerem: `Remove-Item -Recurse -Force .next`
- Terminal do usuário é **PowerShell** — usar sintaxe PS (`Remove-Item` em vez de `rm -rf`)
