# Observações da esteira

Registro de cada achado de segurança: o que a ferramenta apontou, se é real,
o que foi feito e a evidência de que ficou resolvido.

A regra que seguimos: **nenhuma supressão sem justificativa escrita aqui.**
Silenciar regra para deixar a esteira verde é exatamente o que esta atividade
não quer, e some com a informação que a próxima pessoa precisaria.

---

## Etapa 1 — Segredos (Gitleaks)

### Achado 1.1 · `generic-api-key` · execução #1

| Campo | Conteúdo |
|---|---|
| **Achado** | `generic-api-key` — alta entropia em variável com "PASSWORD" no nome |
| **Onde** | `apps/api/src/common/password.util.ts:14`, commit `f253b0c3` |
| **Classificação** | **Falso positivo** |
| **Ação tomada** | Suprimido em `.gitleaksignore` com justificativa |
| **Resultado** | Execução seguinte passou a Etapa 1 |

**Por que é falso positivo**

A constante marcada é `TEMP_PASSWORD_ALPHABET`, em
`apps/api/src/common/password.util.ts`. São 56 caracteres: as letras maiúsculas
e minúsculas **sem** `I`, `l` e `O`, mais os dígitos de `2` a `9` — sem `0` e
sem `1`.

> O valor **não é reproduzido aqui de propósito**. Ver a nota ao fim desta
> seção: colá-lo faz a ferramenta marcar este próprio arquivo.

Não é credencial. É o conjunto de caracteres de onde `generateTemporaryPassword`
sorteia cada letra da senha provisória que o administrador entrega a um
funcionário novo.

Três razões para não ser segredo:

1. **Conhecer o alfabeto não ajuda a adivinhar senha.** A aleatoriedade vem de
   `randomBytes`, do módulo de criptografia do Node, não do alfabeto. Saber
   quais letras existem não reduz o espaço de busca de forma útil — é
   informação que um atacante já teria assumindo "letras e números".
2. **O valor é público por natureza.** Está no código-fonte de um repositório
   aberto, e precisa estar: é lógica de aplicação, não configuração.
3. **A omissão é proposital e documentada.** Faltam `I`, `l`, `O`, `0` e `1`
   justamente porque a senha provisória costuma ser ditada por telefone, e
   esses caracteres se confundem na fala e na leitura.

**Por que a regra disparou**

A `generic-api-key` é heurística: procura valor longo de aparência aleatória
atribuído a variável cujo nome sugere credencial. Aqui bateram as duas coisas —
"PASSWORD" no nome e 56 caracteres sem repetição óbvia. É o perfil exato do
falso positivo que essa regra produz.

**Evidência**

- Execução #1: Etapa 1 falhou com `exit code 1`, etapas 2 a 8 ficaram `skipped`,
  e o Resumo da Esteira registrou "1 segredos". Relatório em
  `relatorio-01-gitleaks`.
- Execução #3, após a supressão e as duas correções abaixo: Etapa 1 verde.

**Duas armadilhas que custaram uma execução cada**

A execução #2, que deveria ter passado, falhou de novo — por dois motivos que
valem registro, porque qualquer um repetiria:

1. **O `.gitleaksignore` não era lido no CI.** O Gitleaks procura esse arquivo
   no **diretório de trabalho**, não no caminho passado em `--source` (o padrão
   da opção é `"."`). Como a etapa roda o Gitleaks dentro de um contêiner, o
   diretório de trabalho não era o do repositório, e a supressão era ignorada
   em silêncio. Corrigido com `--gitleaks-ignore-path` explícito e `-w /repo`.
   Reproduzido localmente rodando a varredura de outra pasta: mesmo resultado
   do CI.

2. **A própria documentação reintroduziu o achado.** A primeira versão desta
   seção colava o valor completo de `TEMP_PASSWORD_ALPHABET` para explicar por
   que ele não é segredo — e o Gitleaks marcou o literal **dentro do
   `observacoes.md`**, com um fingerprint novo.

   A primeira tentativa de conserto foi citar o valor **truncado**. Não
   resolveu: mesmo cortado pela metade, o trecho ainda era uma string longa de
   letras e dígitos misturados, e a heurística disparou de novo, em mais um
   commit. Só parou quando o literal saiu por completo e virou descrição em
   prosa. A lição prática: contra regra de entropia, encurtar não serve —
   tem que não haver string.

---

## Incidente anterior · credencial real removida do histórico

Antes de o repositório ser tornado público, uma varredura manual encontrou
**credenciais de verdade no histórico do Git** — não detectadas pelo Gitleaks,
porque estavam dentro de um PDF, que ele não lê.

| Campo | Conteúdo |
|---|---|
| **Achado** | PDF com relação de usuários e senhas de demonstração |
| **Onde** | `Hackudinhos - Status e Usuarios.pdf`, commit `89104a1` |
| **Classificação** | **Vulnerabilidade real** |
| **Ação tomada** | Credenciais invalidadas, arquivo removido de todo o histórico |
| **Resultado** | `git log --all -- "<arquivo>"` não retorna mais nada |

**Como aconteceu**

O arquivo entrou por descuido: estava na área de stage junto com outra
alteração e foi levado num `git commit` que pretendia enviar só um arquivo de
código. Foi removido da árvore no commit seguinte — mas **remover no commit
seguinte não resolve**, porque o conteúdo continua recuperável em `89104a1`.

**O que foi feito**

1. **As credenciais foram invalidadas.** O projeto do Supabase que elas abriam
   foi apagado, então deixaram de valer antes mesmo da limpeza. É a ordem
   certa: primeiro rotacionar, depois limpar.
2. **Reescrita do histórico** com `git filter-repo`, removendo o arquivo de
   todos os commits. Autoria e mensagens foram preservadas — 65 commits, com os
   mesmos autores de antes.
3. **`.gitignore` atualizado** com `*.pdf`, para o caso não se repetir.
4. **A senha do administrador saiu do `scripts/criar-admin.sql`** e virou um
   marcador que o operador substitui na hora de executar.

**Lição**

Esse achado valida o `fetch-depth: 0` da Etapa 1. Varrer só o último commit não
teria encontrado nada — o arquivo já não estava lá. E mostra um limite real da
ferramenta: **Gitleaks lê texto, não lê PDF**. Um binário com segredo dentro
passa batido. A varredura automática não substitui disciplina no `git add`.

---

## Etapa 2 — Análise estática (Semgrep)

Execução #4: 5 achados, com os rulesets `p/default` e `p/owasp-top-ten`.
Dois corrigidos, três classificados e suprimidos com justificativa.

| # | Regra | Severidade | Classificação | Ação |
|---|---|---|---|---|
| 2.1 | `pnpm-block-exotic-sub-dependencies` | MEDIUM | Real | **Corrigido** |
| 2.2 | `pnpm-minimum-release-age` | MEDIUM | Real | **Corrigido** |
| 2.3 | `pnpm-trust-policy` | MEDIUM | Real | Risco aceito, com plano |
| 2.4 | `express-check-csurf-middleware-usage` | INFO | Mitigado por outro controle | Suprimido |
| 2.5 | `using-http-server` | WARNING | Falso positivo | Suprimido |

### Achado 2.1 · Dependência transitiva de fonte exótica — CORRIGIDO

| Campo | Conteúdo |
|---|---|
| **Onde** | `pnpm-workspace.yaml` |
| **Classificação** | Vulnerabilidade real |
| **Ação tomada** | `blockExoticSubdeps: true` |
| **Resultado** | `pnpm install --frozen-lockfile` segue passando |

Sem esse ajuste, uma dependência indireta pode ser puxada de git, tarball por
URL ou link local. O problema não é o formato: é que esse pacote **não passa
pelo registro**, e portanto escapa de qualquer varredura que confie nele —
inclusive da Etapa 4.

### Achado 2.2 · Sem idade mínima de publicação — CORRIGIDO

| Campo | Conteúdo |
|---|---|
| **Onde** | `pnpm-workspace.yaml` |
| **Classificação** | Vulnerabilidade real |
| **Ação tomada** | `minimumReleaseAge: 10080` (7 dias) |
| **Resultado** | `pnpm install --frozen-lockfile` segue passando |

Ataque de conta de mantenedor comprometida costuma ser descoberto e a versão
despublicada em dias. Esperar antes de aceitar uma versão nova pega a maior
parte desses casos, e custa pouco: ninguém aqui precisa de um pacote publicado
hoje de manhã.

**O primeiro valor não bastou.** A correção inicial foi `1440` (24 horas), e a
execução #5 continuou acusando o mesmo achado — agora apontando para a linha da
própria chave. Lendo a regra na fonte, o motivo ficou claro: ela compara
`int(AGE) < 10080` e exige **no mínimo sete dias**. O valor foi corrigido para
`10080`.

Vale como método: quando a ferramenta continua reclamando de algo que parece
corrigido, **ler a regra** responde mais rápido do que tentar valores. As
regras do Semgrep são públicas em `semgrep.dev/c/r/<id>`.

### Achado 2.3 · Sem política contra rebaixamento — RISCO ACEITO

| Campo | Conteúdo |
|---|---|
| **Onde** | `pnpm-workspace.yaml` |
| **Classificação** | **Vulnerabilidade real**, não corrigida agora |
| **Ação tomada** | Suprimido com `nosemgrep` e plano registrado |
| **Resultado** | Pendente |

Este é o achado mais interessante dos cinco, e o único que fica em aberto.

`trustPolicy: no-downgrade` impede que uma atualização **rebaixe** a versão de
um pacote — truque usado para reintroduzir falha já corrigida. A configuração
foi aplicada e testada. Ela funciona, e é exatamente por isso que não ficou:
ao ligá-la, o `pnpm install --frozen-lockfile` passou a **rejeitar 6 entradas
do lockfile atual**.

```
[ERR_PNPM_TRUST_DOWNGRADE] 6 lockfile entries failed verification:
  chokidar@4.0.3, eslint-import-resolver-typescript@3.10.1, semver@6.3.1,
  tailwind-merge@2.6.1, undici-types@6.21.0, vite@5.4.21
  "High-risk trust downgrade (possible package takeover)"
```

**Por que não corrigimos agora.** Ligar a política exige reconstruir o lockfile
do zero (`pnpm clean --lockfile` e nova resolução), o que muda versões de
dependências transitivas em todo o monorepo. Isso pede revalidar build, testes,
a imagem e os três deploys — janela de teste que não existe a dias da entrega,
num projeto que acabou de voltar ao ar.

**O que isso não significa.** O alerta não é prova de pacote comprometido. Ele
diz que o pnpm não conseguiu confirmar a procedência daquelas versões com o
mesmo grau de confiança de antes. São dependências indiretas e populares.

**Plano.** Reconstruir o lockfile numa branch, rodar a esteira inteira contra
ela, comparar o relatório da Etapa 4 antes e depois e, passando, ligar a
política e remover o `nosemgrep`.

**Detalhe da supressão.** Esta regra não ancora o achado na configuração que
falta — ancora na linha `packages:`, porque é ali que ela detecta um documento
de workspace sem a chave. Como o `nosemgrep` só vale na mesma linha ou na
imediatamente anterior, o comentário precisou ir para o **topo do arquivo**,
colado no `packages:`. A primeira tentativa o colocou perto das outras
configurações, no meio do arquivo, e não surtiu efeito nenhum.

### Achado 2.4 · Sem middleware de CSRF — MITIGADO POR OUTRO CONTROLE

| Campo | Conteúdo |
|---|---|
| **Onde** | `apps/api/api/index.js:56` |
| **Classificação** | Risco real, já mitigado |
| **Ação tomada** | Suprimido com `nosemgrep` e justificativa no código |
| **Resultado** | Etapa 2 verde |

A regra procura um middleware como `csurf` e não encontra. Ela não tem como
saber que a defesa está em outro lugar: **na configuração do cookie**.

O cookie de sessão nasce com `sameSite: "lax"`
(`apps/api/src/auth/auth.controller.ts:25`), e o navegador **não envia cookie
Lax em POST, PUT ou DELETE vindos de outro site**. Como toda rota que muda
estado nesta API é POST ou DELETE, a janela que o `csurf` fecharia já está
fechada. Soma-se o CORS negado por padrão em produção.

Onde a mitigação falharia: se algum dia existir rota que muda estado por GET,
porque navegação GET de topo *carrega* cookie Lax. Hoje não existe nenhuma, e
um token anti-CSRF entra como defesa em profundidade se isso mudar.

### Achado 2.5 · Servidor HTTP sem TLS — FALSO POSITIVO

| Campo | Conteúdo |
|---|---|
| **Onde** | `scripts/testar-handler.js:36` |
| **Classificação** | **Falso positivo** |
| **Ação tomada** | Suprimido com `nosemgrep` e justificativa no código |
| **Resultado** | Etapa 2 verde |

O arquivo é um arranjo de teste local: sobe um servidor em `127.0.0.1` para
exercitar o handler da Vercel fora do ambiente serverless e encerra ao fim da
execução. Não é servido a ninguém, não sai da máquina, não é publicado.

A regra é certa no caso geral — servidor HTTP em produção é problema. Mas ela
não distingue aplicação de ferramenta de desenvolvimento, e gerar certificado
para um processo que vive 3 segundos em `localhost` é cerimônia sem ganho.

## Etapa 3 — Build e dependências

*A preencher.*

## Etapa 4 — SCA (Trivy fs)

Execução #7: **10 vulnerabilidades HIGH/CRITICAL**, todas com correção
disponível. **Todas corrigidas** — nenhuma supressão foi necessária.

| Pacote | Era | Virou | Falhas |
|---|---|---|---|
| `next` | 16.3.5 | 16.4.1 | 3 CRITICAL + 2 HIGH |
| `proxy-addr` | 2.0.7 | 2.0.8 | 1 CRITICAL |
| `body-parser` | 1.20.6 | 1.20.9 | 1 HIGH |
| `multer` | 2.4.0 | 2.5.0 | 1 HIGH |
| `sharp` | 0.35.4 | 0.35.5 | 1 HIGH |
| `source-map-js` | 1.2.1 | 1.2.2 | 1 HIGH |

| Campo | Conteúdo |
|---|---|
| **Classificação** | Vulnerabilidades reais |
| **Ação tomada** | Atualização de versão, direta e por `overrides` |
| **Resultado** | Nova varredura: **0 HIGH/CRITICAL**, gate passa |

### Como foram corrigidas

Duas vias, conforme a dependência seja direta ou indireta:

- **`next` é dependência direta**, declarada em cada app. A versão subiu no
  `package.json` dos dois. Continua **presa sem `^`**, de propósito: a versão
  exata é parte da estratégia do projeto, e o `^` traria atualização silenciosa
  de minor.
- **As outras cinco são transitivas** — nenhum `package.json` as declara, elas
  vêm arrastadas por outros pacotes. Para essas, o caminho é `overrides` no
  `pnpm-workspace.yaml`, que força a versão corrigida em toda a árvore sem
  esperar o pacote-pai atualizar.

### O site também foi atualizado, mesmo sem ser apontado

O Trivy reportou apenas `next 16.3.5`, do jogo. Mas o aviso dizia que a falha
**corrige em `15.5.28` ou `16.4.1`** — e o site rodava `15.5.25`, abaixo do
primeiro. Ou seja, estava na faixa vulnerável e não apareceu no relatório.

O site foi para `15.5.28` junto. Lição: **ler a faixa de versões afetadas do
aviso**, e não só a lista de pacotes que a ferramenta imprimiu. Relatório é
ponto de partida, não inventário completo.

### Evidência

- Antes: 10 achados HIGH/CRITICAL, gate com `exit-code 1`.
- Depois: `trivy fs --severity HIGH,CRITICAL` retorna **0**, gate com exit 0.
- Sem regressão: **66 testes passando** e os **4 pacotes compilando**, com as
  versões novas. Uma atualização de dependência que quebra o build não é
  correção, é troca de problema.

## Etapa 5 — Imagem no GHCR

*A preencher.*

## Etapa 6 — Varredura da imagem (Trivy)

*A preencher.*

## Etapa 7 — Homologação e DAST (OWASP ZAP)

*A preencher.*

## Etapa 8 — Aprovação e produção

*A preencher.*

---

## Limitações conhecidas

Registradas aqui porque reconhecer limite vale mais do que fingir que não
existe.

**O deploy não usa a imagem auditada.** A Vercel constrói a partir do código e
não aceita imagem de contêiner. A imagem é construída, publicada no GHCR e
escaneada (Etapas 5 e 6), e é ela que sobe na homologação para o ZAP atacar —
mas a produção é construída pela Vercel. A rastreabilidade vem do commit: o
deploy é preso ao mesmo SHA que gerou a imagem escaneada.

**O deploy usa token de longa duração, não OIDC.** O enunciado sugere OIDC
quando o provedor permitir. A Vercel não oferece OIDC para deploy via CLI,
então o `VERCEL_TOKEN` é um token comum. A mitigação possível foi aplicada:
ele vive como *environment secret* do `producao`, não como secret do
repositório — assim só um job que já passou pela aprovação humana consegue
lê-lo.

---

## Lições aprendidas

*A completar com no mínimo 5 observações ao fim da atividade.*

1. **Remover um segredo no commit seguinte não remove o segredo.** Ele continua
   em todos os commits anteriores. A ação correta é sempre invalidar a
   credencial primeiro; a limpeza do histórico vem depois e é secundária.
2. **Gitleaks não lê PDF.** O único segredo real do repositório estava dentro
   de um binário e passou despercebido pela ferramenta; quem achou foi
   inspeção manual.
3. **Supressão que não é lida falha em silêncio.** O `.gitleaksignore` existia,
   estava correto e passava localmente — mas no contêiner o Gitleaks procurava
   em outro diretório. Não houve aviso de "arquivo de ignore não encontrado":
   a esteira só continuou falhando. Vale sempre reproduzir a execução do CI
   com as mesmas condições, e não só rodar a ferramenta na própria máquina.
4. **Documentar um falso positivo pode criar outro.** Colar o valor marcado
   dentro do relatório faz a ferramenta marcar o relatório — e truncar não
   basta, porque a regra olha entropia, não tamanho. Em documentação de
   segurança, descreva o valor em prosa em vez de reproduzi-lo.
5. **Nem todo achado se resolve corrigindo o código — alguns se resolvem
   corrigindo a configuração do gerenciador de pacotes.** Três dos cinco
   achados do Semgrep eram sobre cadeia de suprimentos, e nenhum apontava uma
   linha de código nossa: apontavam o que o `pnpm-workspace.yaml` não dizia.
6. **Aplicar a correção sugerida sem testar pode quebrar a esteira.** O
   `trustPolicy: no-downgrade` é exatamente o que a ferramenta pediu, e
   derrubou o `pnpm install`. Testar localmente antes de enviar economizou uma
   execução vermelha e revelou um problema de procedência que ninguém sabia
   que existia.
7. **Supressão só funciona onde a ferramenta ancora o achado, não onde o
   problema parece estar.** O `nosemgrep` da política de confiança só passou a
   valer depois de subir para a primeira linha do arquivo, porque é lá que a
   regra marca. Vale conferir a linha exata do relatório antes de escrever a
   supressão.
8. **O relatório da ferramenta não é o inventário completo do risco.** O Trivy
   apontou só a versão do Next do jogo; o site rodava uma versão diferente, que
   o mesmo aviso também cobria, e não apareceu. Quem lê só a lista impressa
   corrige metade.
9. **Achado em commit antigo não sai corrigindo o arquivo.** A varredura cobre
   todo o histórico, então um literal que já foi enviado continua sendo
   encontrado mesmo depois de o arquivo mudar. Ou se reescreve o histórico, ou
   se suprime o fingerprint com justificativa — e, para falso positivo, a
   segunda opção é a proporcional.
