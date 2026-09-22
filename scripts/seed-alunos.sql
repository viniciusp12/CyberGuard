-- ============================================================================
-- 60 contas de aluno para a aula.
--
-- Cole e rode ISTO no SQL Editor do Supabase. Não depende das portas de banco
-- (5432/6543), que muitas redes de faculdade e de empresa bloqueiam.
--
-- Cria aluno01 ... aluno60, todos com a MESMA senha: aluno1234
-- (9 caracteres, porque o sistema exige no mínimo 8 se a pessoa for trocar).
--
-- Ninguém precisa trocar a senha no primeiro acesso (mustChangePassword =
-- false): numa aula de uma hora, 60 trocas de senha só atrapalham.
--
-- Seguro rodar mais de uma vez: ON CONFLICT ignora quem já existe.
-- ============================================================================

-- Função de hash de senha (bcrypt), caso ainda não esteja habilitada.
CREATE EXTENSION IF NOT EXISTS pgcrypto;

INSERT INTO "User"
  (id, username, "passwordHash", "displayName", department, role,
   "mustChangePassword", level, xp, money, reputation, "createdAt", "updatedAt")
SELECT
  gen_random_uuid()::text,
  'aluno' || lpad(n::text, 2, '0'),
  -- Cada linha ganha o próprio sal, mesmo a senha sendo igual para todos.
  crypt('aluno1234', gen_salt('bf', 10)),
  'Aluno ' || lpad(n::text, 2, '0'),
  -- O ranking do jogo agrupa por este campo. Todos juntos num grupo só.
  'Alunos',
  'EMPLOYEE',
  false,
  1, 0, 0, 100, now(), now()
FROM generate_series(1, 60) AS n
ON CONFLICT (username) DO NOTHING;

-- Confere o que entrou:
SELECT COUNT(*) AS contas_de_aluno
FROM "User"
WHERE username LIKE 'aluno%';

-- ============================================================================
-- DEPOIS DA AULA — apagar as 60 contas.
--
-- Rode só o comando abaixo (tire o comentário). O progresso de cada aluno sai
-- junto automaticamente: as tabelas de fases, conquistas e upgrades apagam em
-- cascata. Não afeta os usuários de demonstração nem a conta de administrador.
-- ============================================================================

-- DELETE FROM "User" WHERE username LIKE 'aluno%';
