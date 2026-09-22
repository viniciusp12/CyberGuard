-- ============================================================================
-- Conta de ADMINISTRADOR para o professor Karlos Miguel.
--
-- Cole e rode ISTO no SQL Editor do Supabase.
--
-- Por que direto no banco, e não pelo painel: o painel de administração só
-- cadastra funcionário (EMPLOYEE). A API só cria um ADMIN pelo "bootstrap",
-- que funciona apenas com o banco vazio — o que não é mais o caso. Então a
-- única via para promover alguém a admin é esta.
--
-- Usuário: karlos.miguel
-- Senha provisória: NVbPb*x8k6jk
--
-- mustChangePassword = true de propósito: no primeiro acesso o sistema obriga
-- a trocar, e aí ele escolhe uma senha segura que ninguém mais conhece. A
-- senha acima serve só para o primeiro login.
--
-- Seguro rodar mais de uma vez: ON CONFLICT ignora se já existir.
-- ============================================================================

CREATE EXTENSION IF NOT EXISTS pgcrypto;

INSERT INTO "User"
  (id, username, "passwordHash", "displayName", department, role,
   "mustChangePassword", level, xp, money, reputation, "createdAt", "updatedAt")
VALUES
  (gen_random_uuid()::text,
   'karlos.miguel',
   crypt('NVbPb*x8k6jk', gen_salt('bf', 10)),
   'Karlos Miguel',
   'Professor',
   'ADMIN',
   true,
   1, 0, 0, 100, now(), now())
ON CONFLICT (username) DO NOTHING;

-- Confere se entrou como administrador:
SELECT username, "displayName", department, role, "mustChangePassword"
FROM "User"
WHERE username = 'karlos.miguel';

-- ============================================================================
-- Se ele esquecer a senha depois de trocar, rode isto para definir uma nova
-- (troque o texto entre aspas) e obrigá-lo a trocar de novo no próximo acesso:
-- ============================================================================

-- UPDATE "User"
-- SET "passwordHash" = crypt('NovaSenhaAqui', gen_salt('bf', 10)),
--     "mustChangePassword" = true,
--     "updatedAt" = now()
-- WHERE username = 'karlos.miguel';
