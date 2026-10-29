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
| 2 | `scripts/criar-admin-professor.sql` | Cria a conta de administrador |
| 3 | `scripts/seed-demo.sql` | *(opcional)* 10 usuários de demonstração |
| 4 | `scripts/seed-alunos.sql` | *(opcional)* 60 contas de aluno |

> **Por que pelo SQL Editor e não pelo `prisma migrate deploy`?**
> O comando do Prisma precisa falar com a porta 5432 do Postgres, e redes de
> faculdade e de empresa costumam bloquear portas de banco. O SQL Editor roda
> no próprio painel, por HTTPS, e passa em qualquer rede.
>
> O `restaurar-banco.sql` também registra as duas migrations como aplicadas na
> tabela de controle do Prisma. Sem isso, um `prisma migrate deploy` futuro
> tentaria criar tudo de novo e quebraria.

### 1.3 Pegar as duas URLs de conexão

Em **Project Settings → Database → Connection string**:

- **`DATABASE_URL`** — aba **Transaction** (porta **6543**). Acrescente no fim:
  `?pgbouncer=true&connection_limit=1`
- **`DIRECT_URL`** — aba **Session** (porta **5432**), sem parâmetros extras.

A primeira é o *pooler*: em serverless cada invocação pode abrir a própria
conexão, e o Postgres direto estoura o limite em minutos. A segunda só é usada
por migrations, que precisam de conexão real.

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

## 5. Depois de tudo no ar

- [ ] A API responde 401 em `/api/ranking`
- [ ] O login do jogo funciona com a conta de administrador
- [ ] O ranking abre (e a linha "Alunos" expande, se as contas de aula existirem)
- [ ] O site abre e o glossário mostra **17 termos**
- [ ] O domínio `hackudinhos.com.br` aponta para o site

### Atenção ao publicar

Commit cuja autoria não é de um membro do projeto na Vercel fica com status
**Blocked** e não constrói. E um build pronto pode não ir sozinho para o
domínio: confira na lista de deploys qual tem a etiqueta **Production**
destacada e, se não for o mais novo, use **Promote to Production**.
