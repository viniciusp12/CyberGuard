/**
 * Ponto de entrada da API na Vercel.
 *
 * Todo request chega aqui, por `routes` no vercel.json — que substitui o
 * roteamento por sistema de arquivos, em vez de rodar depois dele.
 *
 * ⚠️ O vercel.json não aceita comentário nem chave extra: a Vercel valida o
 * schema e recusa o build com "should NOT have additional property". Por isso
 * a explicação da configuração mora aqui, e não lá.
 *
 * Tentativas anteriores que falharam, para ninguém repetir:
 *
 *  - `api/index.ts` com `rewrites` dava FUNCTION_INVOCATION_FAILED em qualquer
 *    rota sob `/api`, inclusive nas que nem tocam o banco: `rewrites` roda
 *    DEPOIS do roteamento por arquivos, então a Vercel primeiro tentava
 *    resolver `/api/auth/status` como `api/auth/status.ts` e o conflito
 *    derrubava a função.
 *
 *  - `api/[[...path]].ts` dava NOT_FOUND. Colchetes duplos são o catch-all
 *    opcional do Next.js, não das Vercel Functions.
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
