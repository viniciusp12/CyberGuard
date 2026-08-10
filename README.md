# CyberGuard — golpes digitais explicados por dentro

Site de conscientização sobre golpes digitais no Brasil, escrito para público
geral, com uma camada corporativa para o contexto do varejo. Projeto acadêmico
do Challenge da Faculdade de Defesa Cibernética, em parceria com a Leroy
Merlin.

O conceito é "você já está exposto": a home revela ao vivo o que o navegador
entrega sobre o visitante sem que ele digite nada, e fecha mostrando que nada
disso saiu do aparelho — mas qualquer site consegue ver.

---

## Stack

- **Next.js 15** (App Router) + **TypeScript**
- **Tailwind CSS 3** — tema "laudo forense", chumbo com sinal âmbar/vermelho/verde
- **Framer Motion** para as revelações por scroll
- **Prisma ORM** + **PostgreSQL** (só para a área autenticada)
- **JWT** (jose) + **bcrypt** para autenticação

Fontes: **Inter Tight** (prosa) e **IBM Plex Mono** (manchete, rótulo e dado).

---

## Como rodar

Pré-requisitos: Node 20+ e, apenas se você for mexer em login/cadastro, um
PostgreSQL acessível.

```bash
npm install
npm run dev
```

Acesse **http://localhost:3000**.

Todo o conteúdo público — home, teste de senha, quiz de golpes, anatomia, IA,
checklist, resposta a incidente e glossário — funciona **sem banco de dados**.
O Postgres só é necessário para `/login`, `/registro` e `/dashboard`.

### Com banco (área autenticada)

```bash
cp .env.example .env
```

Ajuste `DATABASE_URL` e `JWT_SECRET` no `.env`, depois crie as tabelas:

```bash
npx prisma db push
```

Criar um usuário administrador:

```bash
npm run create-admin -- admin@cyberguard.local
```

O script sorteia uma senha forte e a imprime **uma única vez**. Para escolher a
senha, passe como segundo argumento. Não existe senha padrão em código de
propósito — credencial fixa em repositório sobrevive até produção sem ninguém
perceber.

---

## Variáveis de ambiente

| Variável | Descrição |
|---|---|
| `DATABASE_URL` | Connection string do Postgres |
| `JWT_SECRET` | Segredo para assinar tokens (32+ caracteres aleatórios) |
| `NEXT_PUBLIC_APP_NAME` | Nome exibido no app |

Gerar um segredo forte:

```bash
openssl rand -base64 32
```

---

## Páginas

| Rota | Descrição |
|---|---|
| `/` | Dossiê ao vivo, a virada e o índice das seções |
| `/senha` | 01 · teste de senha em tempo real, sem enviar nada |
| `/golpe` | 02 · quatro pares de mensagens; sinais marcados no próprio texto |
| `/anatomia` | 03 · clonagem de WhatsApp passo a passo, do lado de quem aplica |
| `/ia` | 04 · privacidade em chatbot e o que a IA mudou nos golpes |
| `/agora` | 05 · checklist de oito ajustes, com porquê e impacto |
| `/ja-cai` | 06 · primeiras horas em ordem e canais oficiais |
| `/glossario` | 37 termos técnicos em português comum, com busca |
| `/no-trabalho` | Camada corporativa Leroy Merlin |
| `/sobre` | Regras de precisão e acessibilidade do projeto |
| `/contato` | Canais (sem formulário — não há backend para ele) |
| `/login` `/registro` `/dashboard` | Área autenticada |

`/ameacas` e `/prevencao`, da versão anterior, redirecionam para `/golpe` e
`/agora`.

---

## Regras do projeto

Elas não são estilo, são requisito — e estão documentadas em detalhe em
`Contexto Claude/contexto.md`.

- **Número só com fonte, obra e ano citados na mesma tela.** Sem fonte primária
  conferível, o número não entra. A seção de IA não tem nenhum número, e a
  página explica por quê.
- **URL de canal oficial nunca é inventada.** O que não foi conferido aparece
  marcado como pendente, com o caminho seguro para o usuário chegar sozinho.
- **Nada sai do navegador.** Senha digitada, dados do dossiê, respostas do quiz
  e itens do checklist são todos locais. Não há analytics nem rastreador de
  terceiros. A única gravação é a marca de "já esteve aqui", declarada na tela
  e com botão de apagar ao lado.
- **Nunca culpar a vítima.** O tom é "isso acontece com qualquer um".
- **Acessibilidade é obrigatória:** contraste AA, navegação por teclado com
  foco visível, alvos de toque de 44px e `prefers-reduced-motion` respeitado.

---

## Comandos

```bash
npm run dev          # servidor de desenvolvimento
npm run build        # build de produção
npm run start        # rodar o build
npm run typecheck    # tsc --noEmit
npm run db:push      # sincronizar o schema do Prisma
npm run create-admin # criar ou promover um usuário ADMIN
```

---

## Deploy

Qualquer host que rode Node serve, com um proxy reverso (Caddy ou Nginx) na
frente para HTTPS.

Se não for usar a área autenticada, o site roda sem banco nenhum.

---

## Créditos

Faculdade de Defesa Cibernética — Challenge · parceria Leroy Merlin Brasil.
