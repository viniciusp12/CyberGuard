# A esteira, etapa por etapa

Explicação de cada etapa de `.github/workflows/devsecops.yml`: o que faz, por
que existe e o que a faz barrar.

Para os achados de cada execução e como foram tratados, ver
[observacoes.md](observacoes.md).

---

## Como ela se comporta

A esteira roda a cada push na `main` e é **sequencial**: cada etapa só começa
se a anterior terminar bem. O desenho é proposital — gastar minutos construindo
imagem para um código que vazou credencial seria desperdício, e a Etapa 1 é
barata.

O **Resumo da Esteira** foge dessa regra: ele depende de todas as etapas mas
roda com `if: always()`, inclusive quando algo falha. É quando algo quebra que
saber onde quebrou tem mais valor.

```
push (main)
   │
   ▼
[1 Gitleaks] → [2 Semgrep] → [3 Build] → [4 Trivy fs]
                                              │
   ┌──────────────────────────────────────────┘
   ▼
[5 Docker → GHCR] → [6 Trivy image] → [7 Homologação + ZAP]
                                              │
                                     ⏸ aprovação humana
                                              ▼
                                      [8 Deploy produção]
                                              │
                                      [★ Resumo] (sempre)
```

### Permissão mínima

O topo do workflow declara `contents: read`. Cada job pede a mais só se
precisar, e nenhum herda mais do que usa:

| Job | Permissão extra | Por quê |
|---|---|---|
| `docker-build` | `packages: write` | única etapa que publica no GHCR |
| `image-scan` | `packages: read` | lê a imagem para escanear |
| `dast-staging` | `packages: read` | baixa a imagem para subir a homologação |

### Relatórios

Todo job publica o seu com `if: always()`. Um relatório que só existe quando a
etapa passa é inútil: o momento em que ele é mais necessário é exatamente o da
falha.

---

## Etapa 1 · Segredos (Gitleaks)

**Barra se:** qualquer segredo for encontrado (`--exit-code 1`).
**Relatório:** `relatorio-01-gitleaks` → `gitleaks.json`

Varre o **histórico completo** do Git, não só o último commit — por isso o
`fetch-depth: 0` no checkout. A razão é direta: remover um segredo no commit
seguinte não o remove; ele continua recuperável em todos os commits anteriores.

Roda com `--redact`, para o relatório não reexpor o que encontrou. Falsos
positivos vão para `.gitleaksignore`, sempre com justificativa escrita e o
achado registrado em `observacoes.md`.

> **Detalhe que custou uma execução:** o Gitleaks procura o `.gitleaksignore`
> no diretório de **trabalho**, não no caminho passado em `--source`. Como a
> etapa roda a ferramenta dentro de um contêiner, foi preciso `-w /repo` e
> `--gitleaks-ignore-path` explícito. Sem isso a supressão era ignorada **em
> silêncio**, sem aviso de arquivo não encontrado.

## Etapa 2 · Análise estática (Semgrep)

**Barra se:** houver qualquer achado.
**Relatório:** `relatorio-02-semgrep` → `semgrep.json`, `semgrep.sarif`

Procura padrões inseguros no código com os rulesets `p/default` e
`p/owasp-top-ten`.

São **duas execuções**, uma por formato de saída: o Semgrep não aceita `--json`
e `--sarif` na mesma chamada — sai com código 2 e não escreve relatório nenhum.

O quality gate é um passo separado, que lê o JSON e **lista os achados no log**
com regra, arquivo, linha e severidade. Com `--error`, a etapa falhava sem
dizer o quê, e era preciso baixar o artifact para descobrir.

## Etapa 3 · Build, dependências e artefato

**Barra se:** a instalação, a validação de conteúdo, os testes ou o build
falharem.
**Relatório:** `relatorio-03-build` → `arvore-dependencias.txt`,
`npm-audit.json`
**Artefato:** `artefato-aplicacao-<sha>`

Instala com `--frozen-lockfile`, que falha se o lockfile não bater com os
manifestos em vez de resolver versões por conta própria — build reprodutível.

Roda a validação do conteúdo do jogo e os **66 testes automatizados**. A
auditoria do gerenciador de pacotes é informativa aqui; quem bloqueia por
dependência é a Etapa 4.

## Etapa 4 · Dependências (Trivy fs)

**Barra se:** houver vulnerabilidade HIGH ou CRITICAL.
**Relatório:** `relatorio-04-trivy-sca` → `trivy-fs.txt`, `trivy-fs.json`

Varre o projeto com três scanners: `vuln`, `misconfig` e `secret`. Gera tabela
para leitura humana e JSON filtrado para o gate.

Esta etapa olha o que o projeto **declara** — o `pnpm-lock.yaml`. Dependência
direta se corrige mudando a versão no `package.json`; transitiva, por
`overrides` no `pnpm-workspace.yaml`, que força a versão corrigida sem esperar
o pacote-pai atualizar.

## Etapa 5 · Imagem no GHCR

**Barra se:** o build ou o push falharem.
**Relatório:** `relatorio-05-docker-build` → `docker-build.md` (imagem, digest,
manifesto)

Constrói a imagem e publica no GitHub Container Registry com **tag igual ao SHA
do commit**. Nunca `latest`: tag móvel é mutável e impede saber o que de fato
está publicado.

Decisões do Dockerfile:

- **Multi-stage.** O que compila não chega na imagem final.
- **Base fixa e recente.** `node:22.23.4-alpine3.24`. Sem tag móvel, para o
  relatório de varredura descrever a imagem que realmente roda.
- **Usuário não-root.** O processo roda como `nextjs` (uid 1001).
- **Sem npm na imagem final.** A aplicação não instala nada em produção.
- **Nenhum segredo em `ARG` ou `ENV`.** Valor em `ARG` fica gravado no
  histórico da imagem, legível com `docker history`.

> `API_ORIGIN` é `ARG` porque o Next **congela os rewrites durante o build** —
> passá-lo no `docker run` não tem efeito. Não é segredo: é URL pública.

## Etapa 6 · Varredura da imagem (Trivy)

**Barra se:** houver HIGH ou CRITICAL **com correção disponível**
(`--ignore-unfixed`).
**Relatório:** `relatorio-06-trivy-image` → `trivy-image.txt`,
`trivy-image.json`

Escaneia a imagem publicada na Etapa 5, pela mesma tag.

O `--ignore-unfixed` é deliberado: barrar a entrega por falha que **ainda não
tem correção** bloqueia sem dar ação possível ao time, e treina todo mundo a
ignorar o gate.

### Por que esta etapa não repete a Etapa 4

| | Etapa 4 | Etapa 6 |
|---|---|---|
| Olha | o que o projeto **declara** | o que a imagem **contém** |
| Fonte | `pnpm-lock.yaml` | sistema base + binários instalados |
| Achados típicos | `next`, `body-parser` | pacotes do sistema, ferramentas que vieram junto |

Um projeto com lockfile impecável pode publicar uma imagem cheia de falhas —
foi exatamente o que aconteceu aqui. Ver `observacoes.md`, Etapa 6.

## Etapa 7 · Homologação e DAST (OWASP ZAP)

**Informativa** (`fail_action: false`). Quem decide seguir é a pessoa que
aprova a Etapa 8, com o relatório na mão.
**Relatório:** `relatorio-07-homologacao-zap` → `report_html.html`,
`report_json.json`, `report_md.md`

Sobe a imagem aprovada **dentro do próprio runner** — caminho que o enunciado
permite — e ataca de fora com o ZAP Baseline.

> **Detalhe técnico:** o ZAP roda em contêiner, então `localhost` apontaria
> para ele mesmo, não para a aplicação. A etapa descobre o IP do runner e usa
> esse endereço, alcançável de qualquer rede do Docker porque a porta 3000 é
> publicada em todas as interfaces.

É a única etapa que vê a aplicação **rodando**, e encontra o que as outras não
podem ver: cabeçalhos ausentes, erro em tempo de execução, configuração que só
se manifesta no ambiente empacotado.

⚠️ Varredura dinâmica só contra ambiente do próprio grupo. Varrer sistema de
terceiro sem autorização é proibido.

## Etapa 8 · Aprovação e produção

**Barra se:** a aprovação for negada. O job fica em espera até alguém decidir.
**Relatório:** `relatorio-08-producao` → `deploy-producao.md` (imagem,
responsável, data, link da execução)

Usa o environment `producao`, que tem **revisor obrigatório**. É o controle de
mudança: o deploy só acontece depois que uma pessoa revisa os relatórios das
etapas 1 a 7 e aprova explicitamente.

Os secrets da Vercel vivem **dentro do environment**, não em `Repository
secrets`. A diferença importa: no repositório, qualquer job os leria; no
environment, só um job que já passou pela aprovação humana.

## ★ Resumo da Esteira

Depende de todas as etapas e roda **sempre**. Baixa os relatórios, extrai as
contagens e publica a tabela na aba *Summary* da execução e como artifact
`resumo-da-esteira`.

> Baixa só os artifacts `relatorio-*`. Sem o filtro, ele tentava baixar também
> o artefato da aplicação e o `.dockerbuild` que a action do Docker publica —
> e falhava neste último.

Como depende da Etapa 8, o resumo só sai depois da decisão de aprovar ou
rejeitar. É uma troca consciente: ter o estado final das oito etapas vale mais
do que um resumo parcial mais cedo.

---

## Versões fixas

Toda ferramenta e toda action estão presas a uma versão. Tag móvel muda de
conteúdo sem avisar, e aí o relatório de hoje deixa de descrever o que roda
amanhã — além de ser vetor de ataque à cadeia de suprimentos.

| Ferramenta | Versão |
|---|---|
| Gitleaks | 8.21.2 |
| Semgrep | 1.95.0 |
| Trivy (action) | v0.36.0 |
| ZAP Baseline | v0.15.0 |
| Vercel CLI | 65.8.0 |
| Node (imagem) | 22.23.4-alpine3.24 |
| pnpm | 11.18.0 |

As actions estão presas por tag, não por SHA do commit. Em ambiente
corporativo o certo seria fixar pelo SHA, que é imutável — uma tag pode ser
movida para outro commit por quem controla o repositório da action. Fica
registrado como melhoria conhecida.
