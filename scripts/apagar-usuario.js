/**
 * Apaga um usuário do banco.
 *
 *   node scripts/apagar-usuario.js <usuario>             # só mostra o que faria
 *   node scripts/apagar-usuario.js <usuario> --confirmar # apaga de verdade
 *
 * Sem `--confirmar` ele não apaga nada: imprime quem é o usuário e o que seria
 * removido junto. Isso é de propósito — as relações do schema usam
 * `onDelete: Cascade`, então apagar um usuário leva embora o progresso dele
 * (upgrades comprados, conquistas e resultados de fase). Não tem desfazer.
 *
 * Também recusa apagar o último ADMIN: sem nenhum admin ninguém consegue
 * entrar na tela /admin para criar outro, e o `bootstrap-admin` só funciona
 * com a tabela de usuários vazia.
 */
const path = require("path");
const fs = require("fs");

const RAIZ_API = path.resolve(__dirname, "..", "apps", "api");

const caminhoEnv = path.join(RAIZ_API, ".env");
if (!fs.existsSync(caminhoEnv)) {
  console.error(`Não achei ${caminhoEnv}. Sem DATABASE_URL não dá para conectar.`);
  process.exit(1);
}
for (const linha of fs.readFileSync(caminhoEnv, "utf8").split("\n")) {
  const m = linha.match(/^([A-Z_]+)=(.*)$/);
  if (m) process.env[m[1]] = m[2].trim().replace(/^["']|["']$/g, "");
}

const usuario = process.argv[2];
const confirmado = process.argv.includes("--confirmar");

if (!usuario) {
  console.error(`
Uso:
  node scripts/apagar-usuario.js <usuario>             # mostra o que faria
  node scripts/apagar-usuario.js <usuario> --confirmar # apaga

Exemplo:
  node scripts/apagar-usuario.js aaa.aaaa --confirmar
`);
  process.exit(1);
}


/**
 * Traduz falha de conexão em instrução acionável.
 *
 * O erro cru do Prisma ("Can't reach database server at …:6543") descreve o
 * sintoma e não a causa, e a causa mais comum aqui não é o banco: é a rede
 * bloqueando a porta. Redes de empresa, faculdade e alguns provedores liberam
 * 80 e 443 e barram 5432/6543, então o site e a API funcionam normalmente
 * enquanto a conexão direta falha — o que engana, porque tudo "parece no ar".
 */
function explicarFalha(erro) {
  const msg = String(erro?.message ?? erro);
  const semAlcance = /Can't reach database server|ETIMEDOUT|ECONNREFUSED|ENOTFOUND/i.test(msg);

  if (!semAlcance) return null;

  return `
Não consegui alcançar o banco de dados.

Antes de suspeitar do Supabase, vale saber que a causa mais comum é a REDE:
muitas redes bloqueiam as portas de banco (5432 e 6543) e liberam só as de
web (80 e 443). Nesse caso o site e a API continuam funcionando, porque falam
por HTTPS — só a conexão direta daqui é barrada.

Como confirmar, no PowerShell:
  Test-NetConnection aws-0-us-east-1.pooler.supabase.com -Port 6543

  TcpTestSucceeded : False  -> a rede está bloqueando; use outra (o roteador
                              de dados do celular resolve na hora)
  TcpTestSucceeded : True   -> a rede está ok, e aí sim vale conferir se o
                              projeto no Supabase está ativo, e o DATABASE_URL

Alternativa sem depender da rede: entre no jogo como admin e crie a conta pela
tela /admin, que passa pela API por HTTPS. A senha sai gerada, e a pessoa troca
no primeiro acesso.
`;
}

(async () => {
  const { PrismaClient } = require(path.join(RAIZ_API, "node_modules", "@prisma", "client"));
  const prisma = new PrismaClient();

  try {
    const login = usuario.toLowerCase();

    const alvo = await prisma.user.findUnique({
      where: { username: login },
      select: {
        id: true,
        username: true,
        displayName: true,
        role: true,
        _count: {
          select: { ownedUpgrades: true, unlockedAchievements: true, phaseResults: true },
        },
      },
    });

    if (!alvo) {
      console.error(`Não existe usuário "${login}".`);
      process.exit(1);
    }

    console.log("\nUsuário encontrado:");
    console.log(`  usuário: ${alvo.username}`);
    console.log(`  nome:    ${alvo.displayName}`);
    console.log(`  papel:   ${alvo.role}`);
    console.log("\nSeria apagado junto (cascata):");
    console.log(`  upgrades:   ${alvo._count.ownedUpgrades}`);
    console.log(`  conquistas: ${alvo._count.unlockedAchievements}`);
    console.log(`  fases:      ${alvo._count.phaseResults}`);

    if (alvo.role === "ADMIN") {
      const admins = await prisma.user.count({ where: { role: "ADMIN" } });
      if (admins <= 1) {
        console.error(
          "\nRecusado: este é o único ADMIN. Sem nenhum admin ninguém entra em /admin, " +
            "e o bootstrap só volta a funcionar com a tabela inteira vazia.\n" +
            "Crie outro admin antes:\n" +
            '  node scripts/criar-usuario.js <usuario> "<Nome>" <senha> admin\n',
        );
        process.exit(1);
      }
    }

    if (!confirmado) {
      console.log("\nNada foi apagado. Para apagar de verdade, rode de novo com --confirmar:");
      console.log(`  node scripts/apagar-usuario.js ${login} --confirmar\n`);
      return;
    }

    await prisma.user.delete({ where: { id: alvo.id } });
    console.log(`\nApagado: ${alvo.username}\n`);
  } catch (erro) {
    console.error("\nFalhou:", erro.message);
    process.exit(1);
  } finally {
    await prisma.$disconnect();
  }
})();
