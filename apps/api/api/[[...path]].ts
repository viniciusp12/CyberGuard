/**
 * Ponto de entrada da API na Vercel.
 *
 * O nome do arquivo é obrigatório: `[[...path]]` faz a Vercel encaminhar tudo
 * sob `/api/*` para esta única função. A primeira tentativa usava
 * `api/index.ts` mais um rewrite `/(.*)` no vercel.json, e o resultado era
 * FUNCTION_INVOCATION_FAILED em qualquer rota sob `/api` — inclusive nas que
 * nem tocavam o banco. A Vercel trata `api/` como diretório de funções e
 * tentava resolver `/api/auth/status` como um arquivo `api/auth/status.ts`,
 * brigando com o rewrite. Com o catch-all, não há rewrite nem conflito.
 *
 * A Vercel é serverless: não existe processo escutando porta, então o
 * `app.listen()` do `src/main.ts` não funciona aqui. Este handler monta a
 * mesma aplicação Nest sobre um Express e a devolve como função.
 *
 * `src/main.ts` continua existindo e é o que roda em `pnpm dev` e em qualquer
 * servidor tradicional. Os dois caminhos compartilham o mesmo `AppModule` —
 * nenhuma regra de negócio foi duplicada.
 *
 * A instância fica em cache no escopo do módulo de propósito: a Vercel
 * reaproveita o mesmo container entre invocações próximas, e inicializar o
 * Nest a cada requisição custaria segundos de cold start.
 */
import "reflect-metadata";
import { NestFactory } from "@nestjs/core";
import { ExpressAdapter } from "@nestjs/platform-express";
import express, { type Express, type Request, type Response } from "express";
import cookieParser from "cookie-parser";
import { AppModule } from "../src/app.module";

let cached: Express | null = null;
let iniciando: Promise<Express> | null = null;

async function criarApp(): Promise<Express> {
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

function obterApp(): Promise<Express> {
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

export default async function handler(req: Request, res: Response) {
  const app = await obterApp();
  return app(req, res);
}
