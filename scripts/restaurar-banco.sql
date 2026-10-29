-- ============================================================================
-- Restaura o banco do Hackudinhos num projeto Supabase novo.
--
-- Cole e rode ISTO no SQL Editor do Supabase, uma vez, no projeto recém-criado.
--
-- Existe porque `npx prisma migrate deploy` precisa falar com a porta 5432 do
-- Postgres, e muitas redes de faculdade e de empresa bloqueiam as portas de
-- banco. O SQL Editor roda no próprio painel, por HTTPS, e passa.
--
-- O script faz duas coisas:
--   1. cria o schema no estado final (as duas migrations já aplicadas);
--   2. registra essas migrations na tabela de controle do Prisma, para que um
--      `prisma migrate deploy` futuro não tente aplicá-las de novo e quebre.
--
-- Depois de rodar: crie o admin com scripts/criar-admin-professor.sql e, se
-- quiser, os usuários de demonstração com scripts/seed-demo.sql.
-- ============================================================================

CREATE EXTENSION IF NOT EXISTS pgcrypto;

-- ─── Schema ─────────────────────────────────────────────────────────────────

CREATE TYPE "Role" AS ENUM ('ADMIN', 'EMPLOYEE');

CREATE TABLE "User" (
    "id" TEXT NOT NULL,
    "username" TEXT NOT NULL,
    "email" TEXT,
    "passwordHash" TEXT NOT NULL,
    "displayName" TEXT NOT NULL,
    "department" TEXT,
    "role" "Role" NOT NULL DEFAULT 'EMPLOYEE',
    "mustChangePassword" BOOLEAN NOT NULL DEFAULT true,
    "level" INTEGER NOT NULL DEFAULT 1,
    "xp" INTEGER NOT NULL DEFAULT 0,
    "money" INTEGER NOT NULL DEFAULT 0,
    "reputation" INTEGER NOT NULL DEFAULT 100,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "User_pkey" PRIMARY KEY ("id")
);

CREATE TABLE "OwnedUpgrade" (
    "id" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "upgradeId" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "OwnedUpgrade_pkey" PRIMARY KEY ("id")
);

CREATE TABLE "UnlockedAchievement" (
    "id" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "achievementId" TEXT NOT NULL,
    "unlockedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "UnlockedAchievement_pkey" PRIMARY KEY ("id")
);

CREATE TABLE "PhaseResult" (
    "id" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "dayId" TEXT NOT NULL,
    "correctCount" INTEGER NOT NULL,
    "wrongCount" INTEGER NOT NULL,
    "totalScore" INTEGER NOT NULL,
    "xpEarned" INTEGER NOT NULL,
    "moneyEarned" INTEGER NOT NULL,
    "timeUsedSeconds" INTEGER NOT NULL,
    "bestCombo" INTEGER NOT NULL,
    "conceptCorrectCounts" JSONB NOT NULL,
    "completedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "PhaseResult_pkey" PRIMARY KEY ("id")
);

CREATE UNIQUE INDEX "User_username_key" ON "User"("username");
CREATE UNIQUE INDEX "User_email_key" ON "User"("email");
CREATE UNIQUE INDEX "OwnedUpgrade_userId_upgradeId_key" ON "OwnedUpgrade"("userId", "upgradeId");
CREATE UNIQUE INDEX "UnlockedAchievement_userId_achievementId_key" ON "UnlockedAchievement"("userId", "achievementId");
CREATE INDEX "PhaseResult_userId_idx" ON "PhaseResult"("userId");
CREATE INDEX "PhaseResult_dayId_idx" ON "PhaseResult"("dayId");

ALTER TABLE "OwnedUpgrade" ADD CONSTRAINT "OwnedUpgrade_userId_fkey"
  FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;
ALTER TABLE "UnlockedAchievement" ADD CONSTRAINT "UnlockedAchievement_userId_fkey"
  FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;
ALTER TABLE "PhaseResult" ADD CONSTRAINT "PhaseResult_userId_fkey"
  FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- ─── Controle de migrations do Prisma ───────────────────────────────────────
-- Sem isto, o proximo `prisma migrate deploy` tentaria criar tudo de novo.
-- Os checksums sao o SHA-256 dos proprios arquivos de migration do repositorio.

CREATE TABLE IF NOT EXISTS "_prisma_migrations" (
    "id" VARCHAR(36) PRIMARY KEY,
    "checksum" VARCHAR(64) NOT NULL,
    "finished_at" TIMESTAMPTZ,
    "migration_name" VARCHAR(255) NOT NULL,
    "logs" TEXT,
    "rolled_back_at" TIMESTAMPTZ,
    "started_at" TIMESTAMPTZ NOT NULL DEFAULT now(),
    "applied_steps_count" INTEGER NOT NULL DEFAULT 0
);

INSERT INTO "_prisma_migrations"
  (id, checksum, finished_at, migration_name, logs, rolled_back_at, started_at, applied_steps_count)
VALUES
  (gen_random_uuid()::text, '03592b0108506e1b6f62313c1e13312435007eab375fe4d78061c1755a428421', now(), '20260731165914_init', NULL, NULL, now(), 1),
  (gen_random_uuid()::text, '32181645f98c1832fbac37c30c14fb9d40c200b2e188cbc17726ba6c483ff481', now(), '20260806172530_add_username', NULL, NULL, now(), 1)
ON CONFLICT (id) DO NOTHING;

-- ─── Conferencia ────────────────────────────────────────────────────────────

SELECT table_name FROM information_schema.tables
WHERE table_schema = 'public' ORDER BY table_name;

SELECT migration_name, applied_steps_count FROM "_prisma_migrations"
ORDER BY migration_name;
