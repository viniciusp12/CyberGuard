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

*A preencher na primeira execução que chegar aqui.*

## Etapa 3 — Build e dependências

*A preencher.*

## Etapa 4 — SCA (Trivy fs)

*A preencher.*

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
5. **Achado em commit antigo não sai corrigindo o arquivo.** A varredura cobre
   todo o histórico, então um literal que já foi enviado continua sendo
   encontrado mesmo depois de o arquivo mudar. Ou se reescreve o histórico, ou
   se suprime o fingerprint com justificativa — e, para falso positivo, a
   segunda opção é a proporcional.
