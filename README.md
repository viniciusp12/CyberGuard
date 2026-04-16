# CyberGuard — Conscientização Cibernética · Leroy Merlin

Plataforma web de conscientização em segurança cibernética para colaboradores
da Leroy Merlin. Projeto acadêmico do Challenge da Faculdade de Defesa
Cibernética.

> **Status:** Fase 1 (site institucional + autenticação) concluída. Fase 2
> (gameficação completa) será adicionada em seguida.

---

## Stack

- **Next.js 15** (App Router) + **TypeScript**
- **Tailwind CSS 3** com tema dark customizado
- **Framer Motion** para animações
- **Prisma ORM** + **PostgreSQL 16**
- **JWT** (jose) + **bcrypt** para autenticação
- **Docker Compose** para ambiente reproduzível

---

## Estrutura do projeto

```
.
├── docker-compose.yml          # postgres + app
├── Dockerfile                  # build standalone do Next
├── prisma/
│   └── schema.prisma           # User, Session, Role
├── src/
│   ├── app/                    # rotas (App Router)
│   │   ├── layout.tsx
│   │   ├── page.tsx            # Home
│   │   ├── globals.css
│   │   ├── sobre/              # Quem somos
│   │   ├── ameacas/            # Principais ameaças
│   │   ├── prevencao/          # Boas práticas
│   │   ├── contato/
│   │   ├── login/
│   │   ├── registro/
│   │   ├── dashboard/          # área autenticada (placeholder p/ game)
│   │   ├── api/auth/           # register / login / logout
│   │   └── not-found.tsx
│   ├── components/
│   │   ├── layout/             # Navbar, Footer, PageHeader
│   │   ├── ui/                 # Button, Input, Badge, SectionHeading
│   │   ├── home/               # Hero, Pillars, Stats, Process, CTA, Marquee
│   │   └── auth/               # AuthLayout
│   ├── lib/
│   │   ├── prisma.ts           # cliente Prisma singleton
│   │   ├── auth.ts             # sessões JWT em cookie httpOnly
│   │   └── utils.ts            # cn() helper
│   └── middleware.ts           # protege /dashboard, redireciona logados
├── tailwind.config.ts
├── next.config.ts
├── tsconfig.json
├── package.json
└── .env.example
```

---

## Como rodar

### Opção 1 — Docker (recomendado, "funciona em qualquer máquina")

Pré-requisito: Docker Desktop instalado.

```bash
# 1. Copie o exemplo de env
cp .env.example .env

# 2. Suba tudo (postgres + app + migrations)
docker compose up --build
```

Acesse: **http://localhost:3000**

O `docker-compose.yml` já cuida de:
- subir o postgres com volume persistente (`cyberguard-pgdata`)
- aguardar o banco ficar saudável antes de iniciar o app
- rodar `prisma db push` automaticamente na primeira inicialização

Para parar:
```bash
docker compose down            # mantém os dados
docker compose down -v         # apaga também o volume do banco
```

### Opção 2 — Local (Node + Postgres separados)

Pré-requisitos: Node 20+, Postgres 16 rodando local.

```bash
# 1. Instalar dependências
npm install

# 2. Configurar variáveis de ambiente
cp .env.example .env
# edite .env e ajuste a DATABASE_URL se necessário

# 3. Criar tabelas no banco
npx prisma db push

# 4. Rodar em modo dev
npm run dev
```

Acesse: **http://localhost:3000**

---

## Variáveis de ambiente

Veja `.env.example`:

| Variável | Descrição |
|---|---|
| `DATABASE_URL` | Connection string do Postgres |
| `JWT_SECRET` | Segredo para assinar tokens (use 32+ chars aleatórios em produção) |
| `NEXT_PUBLIC_APP_NAME` | Nome exibido no app |

Gerar um JWT_SECRET forte:
```bash
openssl rand -base64 32
```

---

## Páginas

| Rota | Descrição |
|---|---|
| `/` | Home — hero, pilares, estatísticas, processo, CTA |
| `/sobre` | Quem somos, missão, valores, objetivos do challenge |
| `/ameacas` | 6 principais ameaças com exemplos reais |
| `/prevencao` | Boas práticas + checklist de incidente |
| `/contato` | Canais e formulário (ilustrativo nesta fase) |
| `/login` | Acesso |
| `/registro` | Cadastro com e-mail corporativo |
| `/dashboard` | Painel autenticado (preparado para receber gameficação) |

---

## Autenticação

- Senhas são armazenadas com **bcrypt** (12 rounds).
- Sessões usam **JWT** assinado (HS256) salvo em **cookie httpOnly + sameSite=lax**.
- Tokens duram 7 dias.
- Sessões também ficam persistidas na tabela `Session` para permitir
  invalidação futura.
- O `middleware.ts` protege `/dashboard` e redireciona usuários já logados
  que tentam acessar `/login` ou `/registro`.

---

## Próximos passos (Fase 2 — Gameficação)

A modelagem do banco já contempla campos reservados (`xp`, `level`, `streak`)
e a área `/dashboard` já está estruturada para receber:

- [ ] Trilha de módulos (12 tópicos: phishing, senhas, MFA, LGPD, etc.)
- [ ] Quizzes interativos com pontuação
- [ ] Simulações de phishing (e-mails fake controlados)
- [ ] Sistema de XP, níveis e badges
- [ ] Streak diário e desafios semanais
- [ ] Ranking entre departamentos / lojas
- [ ] Painel administrativo para RH / Segurança da Informação

---

## Comandos úteis

```bash
npm run dev              # dev server (Turbopack)
npm run build            # build de produção
npm run start            # rodar build
npm run lint             # ESLint
npm run db:generate      # prisma generate
npm run db:push          # sync do schema (sem migrations)
npm run db:migrate       # criar migration
```

---

## Deploy na VPS

Quando for subir para sua VPS, basta:

```bash
git clone <seu-repo>
cd Challenger
cp .env.example .env
# edite .env com JWT_SECRET forte e ajuste DATABASE_URL se necessário
docker compose up -d --build
```

Recomendado colocar um reverse proxy (Caddy / Nginx) na frente do `:3000`
com HTTPS automático.

---

## Créditos

- Faculdade de Defesa Cibernética — Challenge
- Parceria: Leroy Merlin Brasil
