/**
 * Cria (ou promove) um usuário ADMIN.
 *
 * Uso local:
 *   npm run create-admin -- admin@cyberguard.local
 *   npm run create-admin -- admin@cyberguard.local "SenhaEscolhidaPorVoce"
 *
 * Dentro do container:
 *   docker compose exec app npx tsx scripts/create-admin.ts admin@cyberguard.local
 *
 * Sem senha no argumento, o script sorteia uma forte e imprime UMA vez. Não
 * existe senha padrão escrita neste arquivo de propósito: credencial fixa em
 * código versionado é exatamente o tipo de coisa contra a qual este site
 * inteiro alerta, e ela sobrevive até produção sem ninguém perceber.
 *
 * Se o usuário já existir, o papel vira ADMIN e a senha só é trocada quando
 * você passa uma explicitamente.
 */

import { randomBytes } from "node:crypto";
import { PrismaClient } from "@prisma/client";
import bcrypt from "bcryptjs";

const prisma = new PrismaClient();

/** ~128 bits de entropia, sem caractere ambíguo para ler de terminal. */
function sortearSenha() {
  return randomBytes(18)
    .toString("base64")
    .replace(/[+/=]/g, "")
    .slice(0, 20);
}

async function main() {
  const email = (process.argv[2] ?? process.env.ADMIN_EMAIL ?? "").toLowerCase();
  const senhaArg = process.argv[3] ?? process.env.ADMIN_PASSWORD;
  const nome = process.env.ADMIN_NAME ?? "Administrador";

  if (!email) {
    console.error("Uso: npm run create-admin -- <email> [senha]");
    process.exit(1);
  }

  if (senhaArg && senhaArg.length < 8) {
    console.error("A senha precisa ter pelo menos 8 caracteres.");
    process.exit(1);
  }

  const senha = senhaArg ?? sortearSenha();
  const passwordHash = await bcrypt.hash(senha, 12);

  const existente = await prisma.user.findUnique({ where: { email } });

  const user = existente
    ? await prisma.user.update({
        where: { email },
        // Sem senha no argumento, mantém a atual — promover alguém a admin não
        // deveria derrubar o acesso que a pessoa já tinha.
        data: { role: "ADMIN", ...(senhaArg ? { passwordHash } : {}) },
      })
    : await prisma.user.create({
        data: {
          email,
          name: nome,
          department: "Segurança da Informação",
          passwordHash,
          role: "ADMIN",
        },
      });

  console.log("");
  console.log(existente ? "Usuário promovido a ADMIN." : "Usuário ADMIN criado.");
  console.log("");
  console.log(`  e-mail  ${user.email}`);

  if (!existente || senhaArg) {
    console.log(`  senha   ${senha}`);
    console.log("");
    console.log("  Esta senha não será exibida de novo. Guarde-a no seu");
    console.log("  gerenciador de senhas agora.");
  } else {
    console.log("  senha   inalterada (passe uma como 2º argumento para trocar)");
  }

  console.log("");
  console.log(`  papel   ${user.role}`);
  console.log("  entre em /login");
  console.log("");
}

main()
  .catch((e) => {
    if (e instanceof Error && /P1001|ECONNREFUSED/.test(e.message)) {
      console.error(
        "Não consegui falar com o banco. Suba o Postgres antes:\n" +
          "  docker compose up -d db\n",
      );
      process.exit(1);
    }
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
