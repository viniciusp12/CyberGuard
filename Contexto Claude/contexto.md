# Contexto do Projeto — CyberGuard

> Arquivo de referência para o Claude. Atualizar sempre que houver mudanças relevantes no projeto.

---

## 🎯 O que é o projeto

**CyberGuard** é um site de conscientização sobre golpes digitais, desenvolvido como projeto acadêmico (Challenge) em parceria com a **Leroy Merlin**.

- Faculdade: Defesa Cibernética — turma 2TDCPF
- **Público primário: público geral brasileiro** (golpes do dia a dia — PIX, Correios, WhatsApp clonado, falso emprego)
- **Camada corporativa secundária:** `/no-trabalho`, escrita para o contexto do varejo Leroy Merlin
- Abordagem: susto controlado + mecanismo. A pessoa aprende interagindo, não lendo aviso

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
│   │   ├── dashboard/ login/ registro/
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
│       ├── motion.ts                 ← variantes do Framer Motion
│       └── auth.ts · prisma.ts · utils.ts
├── scripts/create-admin.ts           ← cria/promove ADMIN, senha sorteada
└── Contexto Claude/
    └── contexto.md                   ← este arquivo
```

**Rotas antigas** `/ameacas` e `/prevencao` são redirects 301 (em `next.config.ts`) para `/golpe` e `/agora`.

---

## 🛠️ Stack tecnológica

| Tecnologia | Versão | Uso |
|---|---|---|
| Next.js | 15.1.6 | Framework principal (App Router) |
| React | 19.0.0 | UI |
| Framer Motion | 11.11.17 | Animações |
| Tailwind CSS | 3.4.15 | Estilização |
| Prisma | 5.22.0 | ORM (só para a área autenticada) |
| TypeScript | 5.6.3 | Tipagem |

**Fontes Google:** Inter Tight (corpo), IBM Plex Mono (manchete, rótulo e dado)

**Sem biblioteca de ícones:** `lucide-react` foi removido, a direção não usa ícone.

---

## ⚡ Desempenho — o que já foi tentado e revertido

**Estado atual:** todas as rotas são dinâmicas (`ƒ` no build), porque o layout raiz chama `getCurrentUser()` para a navbar mostrar o primeiro nome de quem está logado. Home em ~151 KB de first load, `/anatomia` em ~148 KB.

Em agosto/2026 houve uma tentativa de otimização que foi **revertida a pedido do dev**, depois de uma sequência de erros durante o processo. O que ela fazia e quanto rendia, caso alguém queira retomar com mais calma:

| Mudança | Ganho medido | Custo |
|---|---|---|
| Tirar `getCurrentUser()` do layout raiz | Todas as páginas de conteúdo viram estáticas (`○`) | Navbar deixa de mostrar o nome; sempre "Entrar" |
| Trocar Framer Motion por `IntersectionObserver` + CSS | ~40 KB por página (home 151→114 KB, anatomia 148→110 KB) | Componente `Reveal` próprio para manter |

⚠️ Se for retomar, três armadilhas já mapeadas:
1. Com páginas estáticas, `/login` quebra o build com `useSearchParams() should be wrapped in a suspense boundary` — precisa de `<Suspense>` em volta do formulário.
2. Ao trocar configuração de build ou dependências, **apague o `.next`** antes de rebuildar. Cache stale já produziu um `Cannot find module for page: /api/auth/register` sem relação nenhuma com o código.
3. **Nunca alterar className ou atributo do `<html>`/`<body>` por script antes da hidratação.** A tentativa de marcar `.js` no `<html>` para proteger quem navega sem JavaScript causou erro de hidratação — o servidor mandava uma className e o cliente já tinha outra quando o React acordava para comparar. Se algum dia for inevitável, o caminho é `suppressHydrationWarning`; melhor ainda é `@media (scripting: enabled)` no CSS, que não precisa de script nenhum.

**Recomendação de processo, aprendida na marra:** o dev deixa `npm run dev` rodando enquanto eu trabalho, então ele vê **todo estado intermediário quebrado** de uma refatoração grande. Refatoração ampla deve ser feita em passos pequenos, cada um com build passando, e não num bloco só.

---

## 🎨 Design System — direção "laudo forense"

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
| `/no-trabalho` | Camada corporativa Leroy Merlin + correção do mito do Wi-Fi público |
| `/sobre` | Regras de precisão e acessibilidade do projeto |
| `/contato` | Canais — sem formulário de propósito (não havia backend) |
| `/login` `/registro` `/dashboard` | Auth (inalterada em comportamento, só restilizada) |
| `/ameacas` `/prevencao` | Redirect 301 → `/golpe` e `/agora` |

---

## ⚠️ Observações importantes

- O formulário de contato foi **removido** — um formulário sem backend dá a impressão falsa de envio, e num site sobre golpes isso é inaceitável. Volta quando houver integração
- Auth usa JWT (`JWT_SECRET` via env)
- Comandos de verificação: `npm run typecheck` (tsc --noEmit) e `npm run build`
- Criar admin: `npm run create-admin -- <email> [senha]` (`scripts/create-admin.ts`). Sem senha no argumento, sorteia uma forte e imprime uma vez só. **Não existe senha padrão em código** de propósito — credencial fixa em repositório sobrevive até produção sem ninguém notar. Precisa do Postgres no ar e de `DATABASE_URL` no `.env`
- **Docker foi removido do projeto** (agosto/2026, a pedido do dev). Não existem mais `docker-compose.yml`, `Dockerfile` nem `.dockerignore`, e o `next.config.ts` deixou de usar `output: "standalone"`, que só servia para a imagem. Rodar é `npm install` e `npm run dev`
- **Todo o conteúdo público funciona sem banco nenhum.** O Postgres só é necessário para `/login`, `/registro` e `/dashboard` — dá para desenvolver o site inteiro sem subir banco
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
