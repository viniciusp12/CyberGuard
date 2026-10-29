-- ============================================================================
-- Conta de ADMINISTRADOR.
--
-- Cole e rode ISTO no SQL Editor do Supabase, uma vez, depois do
-- restaurar-banco.sql.
--
-- Usuário: vinicius.olivetti
--
-- ANTES DE RODAR: troque TROQUE_ESTA_SENHA por uma senha de verdade, com 8
-- caracteres ou mais. Ela fica valendo direto — não há troca obrigatória no
-- primeiro acesso, porque quem define a senha aqui é o próprio dono da conta.
--
-- A senha NÃO fica escrita neste arquivo de propósito: o repositório é
-- público, e credencial versionada é exatamente o que a Etapa 1 da esteira
-- (Gitleaks) existe para barrar.
--
-- Por que direto no banco, e não pelo painel: o painel de administração só
-- cadastra funcionário (EMPLOYEE). A API só cria um ADMIN pelo "bootstrap",
-- que funciona apenas com o banco vazio. Então a única via para promover
-- alguém a administrador é esta.
--
-- Esta é a ÚNICA conta de administrador. Todo o resto — usuários de
-- demonstração e contas de aula — é funcionário comum, sem acesso ao painel.
--
-- Seguro rodar mais de uma vez: ON CONFLICT ignora se já existir.
-- ============================================================================

CREATE EXTENSION IF NOT EXISTS pgcrypto;

INSERT INTO "User"
  (id, username, "passwordHash", "displayName", department, role,
   "mustChangePassword", level, xp, money, reputation, "createdAt", "updatedAt")
VALUES
  (gen_random_uuid()::text,
   'vinicius.olivetti',
   crypt('TROQUE_ESTA_SENHA', gen_salt('bf', 10)),
   'Vinícius Olivetti',
   'TI',
   'ADMIN',
   false,
   1, 0, 0, 100, now(), now())
ON CONFLICT (username) DO NOTHING;

-- Confere se entrou como administrador:
SELECT username, "displayName", department, role, "mustChangePassword"
FROM "User"
WHERE role = 'ADMIN';

-- ============================================================================
-- Se precisar redefinir a senha depois, troque o texto entre aspas e rode:
-- ============================================================================

-- UPDATE "User"
-- SET "passwordHash" = crypt('NovaSenhaAqui', gen_salt('bf', 10)),
--     "updatedAt" = now()
-- WHERE username = 'vinicius.olivetti';
