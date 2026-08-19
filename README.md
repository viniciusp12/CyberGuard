# CIFRA — golpes digitais explicados por dentro

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
- **Tailwind CSS 3** — identidade CIFRA — chumbo, papel, menta, petróleo e âmbar
- **Framer Motion** para as revelações por scroll

Fontes: **Barlow** (corpo) e **Barlow Condensed** (título, etiqueta e botão).

**Sem banco de dados, sem backend, sem variáveis de ambiente.** É um site
estático: todas as páginas são pré-renderizadas no build e tudo que é
interativo roda no navegador de quem visita. Isso não é limitação, é o
argumento central do site — um site sobre privacidade que não coleta nada.

---

## Como rodar

```bash
npm install
```

```bash
npm run dev
```

Acesse **http://localhost:3000**. Não precisa configurar mais nada.

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
| `/contato` | Canais (sem formulário — não há backend) |

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
```

---

## Deploy

Site estático — qualquer host serve, sem configuração. Na Vercel, basta
conectar o repositório: não há variável de ambiente para preencher.

---

## Escopo

Este repositório contém **apenas o site**. A área autenticada (login, cadastro,
painel), o schema do banco e os scripts de administração foram removidos em
agosto de 2026, quando o projeto se dividiu — o site ficou com um integrante e
o jogo mais o backend com outro.

O código removido continua no histórico do git, no commit anterior à remoção,
caso alguém precise retomá-lo.

A pasta `Jogo/` guarda o protótipo em Godot e é mantida por outro integrante.
Os assets do CraftPix não são versionados aqui por restrição de licença.

---

## Créditos

Faculdade de Defesa Cibernética — Challenge · parceria Leroy Merlin Brasil.
