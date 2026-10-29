-- ============================================================================
-- Usuários fictícios para a demonstração à Leroy Merlin.
--
-- Cole e rode ISTO no SQL Editor do Supabase (não depende da porta de banco
-- que a rede possa bloquear — roda no próprio painel).
--
-- Cria 10 funcionários, 2 por setor, com pontuações (xp) variadas para o
-- ranking por setor ficar interessante. A unidade de cada pessoa vai no nome,
-- entre parênteses, porque o sistema agrupa o ranking por um campo só (o setor).
-- A senha de cada um é "Senha" + o nome de usuário, e NÃO precisa ser trocada
-- no primeiro login (mustChangePassword = false).
--
-- Seguro rodar mais de uma vez: ON CONFLICT ignora quem já existe.
-- ============================================================================

-- Função de hash de senha (bcrypt), caso ainda não esteja habilitada.
CREATE EXTENSION IF NOT EXISTS pgcrypto;

INSERT INTO "User"
  (id, username, "passwordHash", "displayName", department, role,
   "mustChangePassword", level, xp, money, reputation, "createdAt", "updatedAt")
VALUES
  -- TI (total do setor: 5300 → 1º no ranking)
  (gen_random_uuid()::text, 'marcos.tavares', crypt('Senhamarcos.tavares', gen_salt('bf', 10)),
   'Marcos Tavares Lima (Loja Morumbi)', 'TI', 'EMPLOYEE', false, 4, 3200, 0, 100, now(), now()),
  (gen_random_uuid()::text, 'camila.rocha', crypt('Senhacamila.rocha', gen_salt('bf', 10)),
   'Camila Duarte Rocha (Loja Interlagos)', 'TI', 'EMPLOYEE', false, 3, 2100, 0, 100, now(), now()),

  -- Caixa (total do setor: 5050 → 2º)
  (gen_random_uuid()::text, 'rafael.lima', crypt('Senharafael.lima', gen_salt('bf', 10)),
   'Rafael Costa Lima (Loja Interlagos)', 'Caixa', 'EMPLOYEE', false, 5, 4100, 0, 100, now(), now()),
  (gen_random_uuid()::text, 'juliana.pereira', crypt('Senhajuliana.pereira', gen_salt('bf', 10)),
   'Juliana Alves Pereira (Loja Morumbi)', 'Caixa', 'EMPLOYEE', false, 1, 950, 0, 100, now(), now()),

  -- Gerência (total do setor: 4950 → 3º) — um gerente por unidade
  (gen_random_uuid()::text, 'fernando.barbosa', crypt('Senhafernando.barbosa', gen_salt('bf', 10)),
   'Fernando Cardoso Barbosa (Loja Morumbi)', 'Gerência', 'EMPLOYEE', false, 4, 3800, 0, 100, now(), now()),
  (gen_random_uuid()::text, 'sandra.correia', crypt('Senhasandra.correia', gen_salt('bf', 10)),
   'Sandra Batista Correia (Loja Osasco)', 'Gerência', 'EMPLOYEE', false, 2, 1150, 0, 100, now(), now()),

  -- Lojista (total do setor: 4400 → 4º)
  (gen_random_uuid()::text, 'bruno.almeida', crypt('Senhabruno.almeida', gen_salt('bf', 10)),
   'Bruno Ferreira Almeida (Loja Morumbi)', 'Lojista', 'EMPLOYEE', false, 2, 1800, 0, 100, now(), now()),
  (gen_random_uuid()::text, 'patricia.santos', crypt('Senhapatricia.santos', gen_salt('bf', 10)),
   'Patrícia Gomes Santos (Loja Osasco)', 'Lojista', 'EMPLOYEE', false, 3, 2600, 0, 100, now(), now()),

  -- Entregador (total do setor: 3550 → 5º)
  (gen_random_uuid()::text, 'diego.martins', crypt('Senhadiego.martins', gen_salt('bf', 10)),
   'Diego Nunes Martins (Loja Osasco)', 'Entregador', 'EMPLOYEE', false, 2, 1500, 0, 100, now(), now()),
  (gen_random_uuid()::text, 'tatiane.ribeiro', crypt('Senhatatiane.ribeiro', gen_salt('bf', 10)),
   'Tatiane Melo Ribeiro (Loja Interlagos)', 'Entregador', 'EMPLOYEE', false, 3, 2050, 0, 100, now(), now())
ON CONFLICT (username) DO NOTHING;

-- Confere o que entrou, já ordenado por setor como o ranking mostra:
SELECT department AS setor, SUM(xp) AS pontos_do_setor, COUNT(*) AS pessoas
FROM "User"
WHERE role = 'EMPLOYEE' AND username IN (
  'marcos.tavares','camila.rocha','rafael.lima','juliana.pereira',
  'fernando.barbosa','sandra.correia','bruno.almeida','patricia.santos',
  'diego.martins','tatiane.ribeiro')
GROUP BY department
ORDER BY pontos_do_setor DESC;
