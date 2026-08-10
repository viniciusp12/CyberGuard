/**
 * Promove um usuário existente a ADMIN.
 *
 * Uso (local):
 *   npx tsx scripts/make-admin.ts voce@leroymerlin.com.br
 *
 * Uso (dentro do container docker):
 *   docker compose exec app node -e "require('./scripts/make-admin.js')" voce@leroymerlin.com.br
 *
 * Ou via prisma studio:
 *   npx prisma studio  →  edita o campo `role` na mão
 */

import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

async function main() {
  const email = process.argv[2];

  if (!email) {
    console.error("❌ Uso: npx tsx scripts/make-admin.ts <email>");
    process.exit(1);
  }

  const user = await prisma.user.findUnique({
    where: { email: email.toLowerCase() },
  });

  if (!user) {
    console.error(`❌ Usuário com e-mail "${email}" não encontrado.`);
    console.error("   Cadastre-se primeiro pelo site (/registro) e rode de novo.");
    process.exit(1);
  }

  if (user.role === "ADMIN") {
    console.log(`ℹ️  ${user.name} (${user.email}) já é ADMIN.`);
    return;
  }

  const updated = await prisma.user.update({
    where: { id: user.id },
    data: { role: "ADMIN" },
  });

  console.log("✅ Usuário promovido a ADMIN:");
  console.log(`   Nome:  ${updated.name}`);
  console.log(`   Email: ${updated.email}`);
  console.log(`   Role:  ${updated.role}`);
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
