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
- `.next/` pode ficar em cache desatualizado — deletar se mudanças não aparecerem
- **Sistema operacional:** o dev usa **Linux e Windows** (dual). Atualmente desenvolvendo no **Linux** (`/home/vini/...`). Sempre documentar comandos para **ambos**:

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
