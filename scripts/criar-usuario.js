/**
 * Cria um usuário direto no banco, sem precisar estar logado.
 *
 *   node scripts/criar-usuario.js <usuario> "<Nome>" <senha> [admin|funcionario]
 *
 * Exemplos:
 *   node scripts/criar-usuario.js vinicius "Vinicius" MinhaSenha123 admin
 *   node scripts/criar-usuario.js joao "João Silva" Senha12345
 *
 * Por que isto existe: a coluna `passwordHash` guarda um hash bcrypt, então
 * inserir uma linha à mão pelo Supabase não funciona — o login compararia a
 * senha digitada contra um texto que não é hash e falharia sempre. Este script
 * usa a MESMA função de hash da aplicação (`bcrypt`, 10 rounds), então o
 * usuário criado aqui entra normalmente pela tela de login.
 *
 * A rota /admin do jogo continua sendo o caminho normal para cadastrar gente.
 * Isto aqui é para quando você não consegue chegar lá — por exemplo, se
 * ninguém mais lembra a senha do único admin.
 *
 * Roda contra o banco que estiver em apps/api/.env (DATABASE_URL).
 */
const path = require("path");
const fs = require("fs");

const RAIZ_API = path.resolve(__dirname, "..", "apps", "api");

// Carrega o .env sem depender de dotenv.
const caminhoEnv = path.join(RAIZ_API, ".env");
if (!fs.existsSync(caminhoEnv)) {
  console.error(`Não achei ${caminhoEnv}. Sem DATABASE_URL não dá para conectar.`);
  process.exit(1);
}
for (const linha of fs.readFileSync(caminhoEnv, "utf8").split("\n")) {
  const m = linha.match(/^([A-Z_]+)=(.*)$/);
  if (m) process.env[m[1]] = m[2].trim().replace(/^["']|["']$/g, "");
}

const [usuario, nome, senha, papelArg] = process.argv.slice(2);

if (!usuario || !nome || !senha) {
  console.error(`
Uso:
  node scripts/criar-usuario.js <usuario> "<Nome>" <senha> [admin|funcionario]

Exemplo:
  node scripts/criar-usuario.js vinicius "Vinicius" MinhaSenha123 admin

O papel é opcional e o padrão é funcionario.
A senha precisa ter pelo menos 8 caracteres (mesma regra da aplicação).
`);
  process.exit(1);
}

if (senha.length < 8) {
  console.error("A senha precisa ter pelo menos 8 caracteres.");
  process.exit(1);
}

const papel = (papelArg ?? "funcionario").toLowerCase();
if (!["admin", "funcionario"].includes(papel)) {
  console.error(`Papel inválido: "${papelArg}". Use "admin" ou "funcionario".`);
  process.exit(1);
}

(async () => {
  const { PrismaClient } = require(path.join(RAIZ_API, "node_modules", "@prisma", "client"));
  const bcrypt = require(path.join(RAIZ_API, "node_modules", "bcryptjs"));

  const prisma = new PrismaClient();

  try {
    const login = usuario.toLowerCase();

    const jaExiste = await prisma.user.findUnique({ where: { username: login } });
    if (jaExiste) {
      console.error(`Já existe um usuário "${login}". Escolha outro nome.`);
      process.exit(1);
    }

    const criado = await prisma.user.create({
      data: {
        username: login,
        displayName: nome,
        passwordHash: await bcrypt.hash(senha, 10),
        role: papel === "admin" ? "ADMIN" : "EMPLOYEE",
        // false porque você já escolheu a senha aqui — não faz sentido obrigar
        // a trocar no primeiro login, como acontece nas senhas temporárias que
        // a tela /admin gera.
        mustChangePassword: false,
      },
      select: { id: true, username: true, displayName: true, role: true },
    });

    console.log("\nUsuário criado:");
    console.log(`  usuário: ${criado.username}`);
    console.log(`  nome:    ${criado.displayName}`);
    console.log(`  papel:   ${criado.role}`);
    console.log("\nEntre em https://cyber-guard-jogo.vercel.app/login com essa senha.\n");
  } catch (erro) {
    console.error("\nFalhou:", erro.message);
    process.exit(1);
  } finally {
    await prisma.$disconnect();
  }
})();
