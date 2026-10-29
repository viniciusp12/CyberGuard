# Restaurar o ambiente (Supabase + Vercel)

Passo a passo para colocar o Hackudinhos no ar de novo depois que os projetos
da Vercel e do Supabase foram apagados.

A ordem importa: o banco primeiro, porque a API não sobe sem ele, e o jogo não
funciona sem a API.

---

## 1. Banco de dados (Supabase)

### 1.1 Criar o projeto

1. Entre em supabase.com e crie um projeto novo.
2. Guarde a **senha do banco** que ele pede na criação — ela vai nas duas URLs
   de conexão abaixo e não dá para ver de novo depois.
3. Escolha a região mais próxima (South America / São Paulo).

### 1.2 Criar as tabelas

No painel do Supabase, vá em **SQL Editor** e rode, nesta ordem:

| Ordem | Arquivo | O que faz |
|---|---|---|
| 1 | `scripts/restaurar-banco.sql` | Cria as 4 tabelas, os índices e as chaves estrangeiras |
| 2 | `scripts/criar-admin.sql` | Cria a conta de administrador (`vinicius.olivetti`) |
| 3 | `scripts/seed-demo.sql` | *(opcional)* 10 usuários de demonstração |

> **Por que pelo SQL Editor e não pelo `prisma migrate deploy`?**
> O comando do Prisma precisa falar com a porta 5432 do Postgres, e redes de
> faculdade e de empresa costumam bloquear portas de banco. O SQL Editor roda
> no próprio painel, por HTTPS, e passa em qualquer rede.
>
> O `restaurar-banco.sql` também registra as duas migrations como aplicadas na
> tabela de controle do Prisma. Sem isso, um `prisma migrate deploy` futuro
> tentaria criar tudo de novo e quebraria.

### 1.3 Pegar as duas URLs de conexão

Clique no botão **`Connect`**, no topo do painel do projeto, ao lado do nome.
Abre um modal com abas.

> Não procure em Project Settings → Database: a Supabase mudou a interface e
> tirou as connection strings de lá.

| Aba do modal | Serve para | Porta |
|---|---|---|
| **Transaction pooler** | `DATABASE_URL` | 6543 |
| **Session pooler** | `DIRECT_URL` | 5432 |

Acrescente `?pgbouncer=true&connection_limit=1` no fim **apenas** da
`DATABASE_URL`. A `DIRECT_URL` vai sem parâmetro nenhum.

As duas ficam assim, mudando só a porta e o sufixo:

```
DATABASE_URL="postgresql://postgres.SEUREF:SENHA@aws-0-REGIAO.pooler.supabase.com:6543/postgres?pgbouncer=true&connection_limit=1"
DIRECT_URL="postgresql://postgres.SEUREF:SENHA@aws-0-REGIAO.pooler.supabase.com:5432/postgres"
```

Onde `SENHA` vem escrito `[YOUR-PASSWORD]` no texto copiado — troque pela senha
definida na criação do projeto. `SEUREF` é o **Reference ID**, em
Settings → General.

**Ignore a aba "Direct connection".** Ela é a conexão real ao banco, mas hoje
responde só em IPv6, e a maioria das redes não alcança. A "Session pooler" faz
o mesmo papel e funciona em IPv4.

Por que duas URLs: a de 6543 é o *pooler*, e existe porque em serverless cada
invocação pode abrir a própria conexão — o Postgres estoura o limite em
minutos. A de 5432 é usada só por migrations, que precisam de uma sessão que o
pooler em modo transação não consegue manter.

---

## 2. API (Vercel)

### 2.1 Criar o projeto

1. Vercel → **Add New → Project** → importe o repositório.
2. **Root Directory:** `apps/api`
3. **Framework Preset:** Other
4. O `apps/api/vercel.json` já cuida do build e do roteamento. Não mexa.

### 2.2 Variáveis de ambiente

Em **Settings → Environment Variables**, ambiente **Production**:

| Variável | Valor |
|---|---|
| `DATABASE_URL` | a do pooler, porta 6543, com os dois parâmetros |
| `DIRECT_URL` | a direta, porta 5432 |
| `JWT_SECRET` | gere um novo, ver abaixo |
| `NODE_ENV` | `production` |

Gere o `JWT_SECRET` você mesmo e cole direto no painel:

```bash
node -e "console.log(require('crypto').randomBytes(32).toString('hex'))"
```

> **Nunca comite esse valor.** Quem o tem forja um token de administrador. O
> segredo antigo morreu junto com o projeto apagado, então este precisa ser
> novo de qualquer forma.
>
> `CORS_ORIGIN` fica **em branco** de propósito: o jogo chama a API por um
> rewrite do Next, que é proxy no servidor, então o navegador nunca faz
> requisição de outra origem. Em branco, nenhuma origem externa é liberada.

### 2.3 Conferir

Depois do deploy, a API responde no endereço do projeto. Teste:

```bash
curl -i https://SEU-PROJETO-API.vercel.app/api/ranking
```

Deve voltar **401** com `{"message":"Sessão não encontrada."}`. Isso é sucesso:
significa que a API subiu e está exigindo autenticação.

---

## 3. Jogo (Vercel)

1. **Add New → Project** → mesmo repositório.
2. **Root Directory:** `apps/jogo`
3. **Framework Preset:** Next.js
4. Variável de ambiente, em **Production**:

| Variável | Valor |
|---|---|
| `API_ORIGIN` | a URL do projeto da API, sem barra no fim |

Se esquecer o `API_ORIGIN`, o build não quebra: o `next.config.ts` tem um
endereço de produção como rede de segurança. Mas ele aponta para o projeto
antigo, que não existe mais — então **defina a variável**.

---

## 4. Site (Vercel)

1. **Add New → Project** → mesmo repositório.
2. **Root Directory:** `apps/site`
3. **Framework Preset:** Next.js
4. Não precisa de variável de ambiente: o site é estático e não fala com a API
   nem com o banco.
5. Em **Settings → Domains**, aponte `hackudinhos.com.br` de novo, se o domínio
   ainda estiver com vocês.

---

## 5. A aplicação está no ar — confira

- [ ] A API responde 401 em `/api/ranking`
- [ ] O login do jogo funciona com a conta de administrador
- [ ] O site abre e o glossário mostra **17 termos**
- [ ] O domínio `hackudinhos.com.br` aponta para o site

### Atenção ao publicar

Commit cuja autoria não é de um membro do projeto na Vercel fica com status
**Blocked** e não constrói. E um build pronto pode não ir sozinho para o
domínio: confira na lista de deploys qual tem a etiqueta **Production**
destacada e, se não for o mais novo, use **Promote to Production**.

---

# Parte 2 — GitHub, para a esteira DevSecOps

Daqui em diante é a configuração que a atividade exige. A aplicação já precisa
estar no ar antes disto.

## 6. Tornar o repositório público

A entrega é "link do repositório **público**". Em **Settings → General**, role
até **Danger Zone → Change repository visibility → Make public**.

> O histórico já foi limpo: o PDF com credenciais e os assets de terceiros
> foram removidos de todos os commits, e nenhuma senha real está versionada.
> Pode publicar.

## 7. Permitir que o workflow publique pacotes

Em **Settings → Actions → General → Workflow permissions**, marque
**Read and write permissions**.

Sem isso, a Etapa 5 não consegue enviar a imagem para o GHCR. O workflow ainda
declara `permissions: contents: read` no topo e só pede `packages: write` no
job que publica — a configuração aqui é o teto, e o workflow fica abaixo dele.

## 8. Criar os dois environments

Em **Settings → Environments**, crie:

### `homologacao`
Sem regra nenhuma. Serve só para a Etapa 7 aparecer identificada no histórico
de deployments.

### `producao`
1. **Required reviewers** → adicione pelo menos uma pessoa (pode ser você).
   É isto que faz a Etapa 8 ficar parada esperando aprovação — o controle de
   mudança que a atividade avalia.
2. *(opcional)* **Deployment branches** → `Selected branches` → `main`.

## 9. Secrets do deploy de produção

A Etapa 8 publica na Vercel a partir do GitHub Actions, então precisa de
credencial. Ela fica **dentro do environment `producao`**, nunca em
`Repository secrets` — assim só um job que passou pela aprovação consegue ler.

Em **Settings → Environments → producao → Environment secrets**, crie:

| Secret | Onde obter |
|---|---|
| `VERCEL_TOKEN` | Vercel → Account Settings → Tokens → Create |
| `VERCEL_ORG_ID` | Vercel → Settings da equipe → ID |
| `VERCEL_PROJECT_ID` | Vercel → projeto do jogo → Settings → Project ID |

> Credencial de nuvem em environment secret, e não no código, é um dos itens
> cobrados em "Boas práticas". O ideal seria OIDC em vez de token de longa
> duração, mas a Vercel não oferece OIDC para deploy — registre essa limitação
> em `docs/observacoes.md`.

## 10. Checklist antes de rodar a esteira

- [ ] Repositório público
- [ ] Workflow permissions em **Read and write**
- [ ] Environment `homologacao` criado
- [ ] Environment `producao` criado **com revisor obrigatório**
- [ ] Os três secrets dentro do environment `producao`
- [ ] `Dockerfile` e `.dockerignore` na raiz (já estão)
- [ ] Aplicação acessível no ar (Parte 1)

Com isso pronto, a esteira roda sozinha a cada push na `main`, e para na
Etapa 8 esperando você aprovar.
