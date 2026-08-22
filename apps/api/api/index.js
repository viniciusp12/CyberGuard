/**
 * Ponto de entrada da API na Vercel.
 *
 * ⚠️ Este arquivo é .js de propósito, e importa de `../dist/` em vez de
 * `../src/`.
 *
 * A Vercel compila funções com esbuild, que NÃO implementa
 * `emitDecoratorMetadata`. O NestJS depende desse metadata para a injeção de
 * dependência: sem ele, os providers não resolvem e a aplicação morre no
 * bootstrap — com FUNCTION_INVOCATION_FAILED em toda rota, inclusive nas que
 * não tocam o banco.
 *
 * A saída é compilar com o `tsc` antes (ele emite o metadata como chamadas
 * `Reflect.metadata` no JavaScript) e apontar o handler para o resultado. O
 * `postinstall` do package.json roda essa compilação. Como este arquivo não
 * tem decorator nenhum, o esbuild processa sem problema.
 *
 * `src/main.ts` continua servindo servidor tradicional. Os dois caminhos
 * compartilham o mesmo AppModule — nenhuma regra de negócio duplicada.
 */
require("reflect-metadata");

const { NestFactory } = require("@nestjs/core");
const { ExpressAdapter } = require("@nestjs/platform-express");
const express = require("express");
const cookieParser = require("cookie-parser");
const { AppModule } = require("../dist/app.module");

let cached = null;
let iniciando = null;

async function criarApp() {
  const servidor = express();

  const app = await NestFactory.create(AppModule, new ExpressAdapter(servidor), {
    // O log padrão do Nest polui o painel da Vercel a cada cold start.
    logger: ["error", "warn"],
  });

  app.use(cookieParser());
  app.setGlobalPrefix("api");
  app.enableCors({
    origin: process.env.CORS_ORIGIN?.split(",") ?? true,
    credentials: true,
  });

  // `init` em vez de `listen`: prepara a aplicação sem abrir socket.
  await app.init();

  return servidor;
}

function obterApp() {
  if (cached) return Promise.resolve(cached);

  // Sem esta trava, duas requisições simultâneas no mesmo cold start
  // inicializariam o Nest duas vezes e abririam duas conexões de banco.
  if (!iniciando) {
    iniciando = criarApp().then((app) => {
      cached = app;
      iniciando = null;
      return app;
    });
  }

  return iniciando;
}

module.exports = async function handler(req, res) {
  const app = await obterApp();
  return app(req, res);
};
