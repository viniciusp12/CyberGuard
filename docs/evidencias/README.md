# Evidências

Prints exigidos pela seção 6.3 do enunciado. Cada um aponta para a execução de
onde foi tirado, para que qualquer afirmação aqui possa ser conferida na origem.

| Arquivo | Execução | O que mostra |
|---|---|---|
| `resumo-da-esteira.png` | [#20](https://github.com/viniciusp12/CyberGuard/actions/runs/41473376482) | A tabela *Resumo da Esteira* de uma execução completa e bem-sucedida — o print obrigatório da §6.1 |
| `esteira-completa.png` | [#20](https://github.com/viniciusp12/CyberGuard/actions/runs/41473376482) | Os 11 jobs verdes: as 8 etapas, o resumo e os dois bônus |
| `quality-gate-bloqueando.png` | [#1](https://github.com/viniciusp12/CyberGuard/actions/runs/40921373537) | A Etapa 1 barrando com 1 segredo encontrado, as 7 etapas seguintes puladas, e o Resumo registrando `failure` + `skipped` |
| `aprovacao-producao.png` | [#15](https://github.com/viniciusp12/CyberGuard/actions/runs/41087646741) | O environment `producao` esperando revisão, com o botão *Review deployments* |
| `imagem-no-ghcr.png` | — | A imagem publicada no GHCR: pública, com uma tag por commit e nenhuma `latest` |
| `jogo-em-producao.png` | — | O jogo rodando em `cyber-guard-jogo.vercel.app` |

## Por que a execução #1 é a evidência mais importante

Esteira sempre verde não prova controle nenhum — prova só que nada foi
testado. O print da #1 mostra o contrário: o Gitleaks encontrou um segredo na
primeira etapa e **as sete etapas seguintes não chegaram a rodar**. Nenhuma
imagem foi construída, nada foi publicado, nada chegou perto de produção.

Ele também mostra, de graça, uma decisão de desenho da esteira: o Resumo rodou
mesmo com a execução quebrada, registrando `failure` na Etapa 1 e `skipped` nas
demais. Relatório que só existe quando tudo dá certo é inútil, porque o momento
em que ele é mais necessário é exatamente o da falha.

A causa de cada uma das 14 execuções barradas está em
[`../observacoes.md`](../observacoes.md).

## Por que a #15 ainda está parada

A execução #15 nunca foi aprovada nem rejeitada, e por isso continua exibindo a
tela de aprovação ao vivo — é dela que sai a evidência do controle de mudança.
Fica parada de propósito: aprovar ou rejeitar apagaria a evidência.
