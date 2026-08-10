/**
 * Coleta do "dossiê" do hero.
 *
 * Contrato deste módulo, e ele não pode ser quebrado sem quebrar a premissa
 * da página inteira:
 *
 *   - roda só no navegador, nunca no servidor;
 *   - não faz nenhuma requisição de rede;
 *   - não grava nada, com uma única exceção declarada na tela: a marca de
 *     "já esteve aqui" (VISIT_KEY), que existe justamente para demonstrar
 *     como um site reconhece alguém que volta — e que a própria página
 *     oferece apagar;
 *   - não pede permissão de câmera, microfone ou localização, e não usa
 *     geolocalização precisa. O fuso horário é o dado mais grosso que
 *     entra, e ele já está exposto para qualquer script sem pedir nada.
 *
 * Toda leitura é individualmente protegida: uma API ausente vira uma linha
 * com `available: false` e um texto explicando a ausência, nunca uma exceção.
 */

export const VISIT_KEY = "cyberguard:visitou";

/**
 * Resposta de "já esteve aqui antes", decidida uma única vez por carregamento
 * de página e guardada no escopo do módulo.
 *
 * Precisa ser aqui, e não em estado de componente: o hero remonta ao navegar
 * de volta para a home e o StrictMode monta duas vezes em desenvolvimento. Se
 * a leitura acontecesse a cada montagem, a segunda leria a marca que a
 * primeira acabou de gravar e diria "sim" para quem está na primeira visita.
 */
let visitaAnterior: boolean | null = null;

export type Entrada = {
  id: string;
  /** Rótulo do campo, em linguagem de gente. */
  label: string;
  /** Valor lido, ou o motivo de não ter sido possível ler. */
  valor: string;
  /** Uma frase curta dizendo por que isso importa. */
  nota: string;
  /** Falso quando o navegador não expõe o dado. */
  available: boolean;
  /** Campos que mudam sozinhos (relógio, tamanho da janela). */
  vivo?: boolean;
};

type NavigatorUAData = {
  brands?: { brand: string; version: string }[];
  platform?: string;
  mobile?: boolean;
};

type NetworkInformation = {
  effectiveType?: string;
  saveData?: boolean;
  downlink?: number;
};

type BatteryManager = {
  charging: boolean;
  level: number;
};

type NavigatorEstendido = Navigator & {
  userAgentData?: NavigatorUAData;
  connection?: NetworkInformation;
  deviceMemory?: number;
  getBattery?: () => Promise<BatteryManager>;
};

const INDISPONIVEL = "seu navegador não informa";

/** Tenta ler algo do navegador; qualquer falha vira "indisponível". */
function tentar(fn: () => string | null | undefined): string | null {
  try {
    const v = fn();
    return v ? v : null;
  } catch {
    return null;
  }
}

function detectarNavegador(nav: NavigatorEstendido): string | null {
  // Client Hints, quando existe, é a fonte honesta — o user agent mente por
  // compatibilidade histórica desde os anos 90.
  const brands = nav.userAgentData?.brands;
  if (brands?.length) {
    const real = brands.find(
      (b) => !/not.a.brand/i.test(b.brand) && !/chromium/i.test(b.brand),
    );
    const escolhido = real ?? brands.find((b) => !/not.a.brand/i.test(b.brand));
    if (escolhido) return `${escolhido.brand} ${escolhido.version}`;
  }

  const ua = nav.userAgent ?? "";
  const regras: [RegExp, string][] = [
    [/Firefox\/(\d+)/, "Firefox"],
    [/Edg\/(\d+)/, "Edge"],
    [/OPR\/(\d+)/, "Opera"],
    [/Chrome\/(\d+)/, "Chrome"],
    [/Version\/(\d+).*Safari/, "Safari"],
  ];
  for (const [re, nome] of regras) {
    const m = ua.match(re);
    if (m) return `${nome} ${m[1]}`;
  }
  return null;
}

function detectarSistema(nav: NavigatorEstendido): string | null {
  const plataforma = nav.userAgentData?.platform;
  if (plataforma) {
    return nav.userAgentData?.mobile ? `${plataforma} (celular)` : plataforma;
  }

  const ua = nav.userAgent ?? "";
  if (/Windows NT 10/.test(ua)) return "Windows 10 ou 11";
  if (/Windows/.test(ua)) return "Windows";
  if (/Android (\d+)/.test(ua)) return `Android ${ua.match(/Android (\d+)/)?.[1]}`;
  if (/iPhone|iPad|iPod/.test(ua)) return "iOS";
  if (/Mac OS X/.test(ua)) return "macOS";
  if (/Linux/.test(ua)) return "Linux";
  return null;
}

function formatarHora(): string {
  return new Intl.DateTimeFormat("pt-BR", {
    hour: "2-digit",
    minute: "2-digit",
    second: "2-digit",
  }).format(new Date());
}

function entrada(
  id: string,
  label: string,
  valor: string | null,
  nota: string,
  vivo = false,
): Entrada {
  return {
    id,
    label,
    valor: valor ?? INDISPONIVEL,
    nota,
    available: valor !== null,
    vivo,
  };
}

/**
 * Monta o dossiê. Assíncrona apenas por causa da bateria, que é a única
 * leitura baseada em Promise.
 */
export async function coletarDossie(): Promise<Entrada[]> {
  const nav = navigator as NavigatorEstendido;

  const entradas: Entrada[] = [
    entrada(
      "navegador",
      "Navegador e versão",
      tentar(() => detectarNavegador(nav)),
      "Versão antiga é o alvo preferido de quem explora falha já corrigida.",
    ),
    entrada(
      "sistema",
      "Sistema operacional",
      tentar(() => detectarSistema(nav)),
      "Diz qual golpe faz sentido tentar em você — celular e computador levam iscas diferentes.",
    ),
    entrada(
      "tela",
      "Resolução da tela",
      tentar(() => {
        const dpr = window.devicePixelRatio;
        const base = `${screen.width} × ${screen.height}`;
        return dpr && dpr !== 1 ? `${base} · densidade ${dpr}×` : base;
      }),
      "Combinada com outros dados, ajuda a te reconhecer entre milhões de visitantes.",
    ),
    entrada(
      "janela",
      "Tamanho desta janela",
      tentar(() => `${window.innerWidth} × ${window.innerHeight}`),
      "Muda quando você redimensiona. Experimente — a linha se atualiza sozinha.",
      true,
    ),
    entrada(
      "fuso",
      "Fuso horário",
      tentar(() => Intl.DateTimeFormat().resolvedOptions().timeZone),
      "Entrega a sua região aproximada sem nunca pedir acesso à localização.",
    ),
    entrada(
      "hora",
      "Seu relógio agora",
      tentar(formatarHora),
      "Serve para disparar a mensagem na hora em que você tende a estar desatento.",
      true,
    ),
    entrada(
      "idioma",
      "Idioma preferido",
      tentar(() => {
        const langs = nav.languages;
        return langs?.length ? langs.slice(0, 3).join(", ") : nav.language;
      }),
      "Define em que língua o golpe chega até você.",
    ),
    entrada(
      "ponteiro",
      "Toque ou mouse",
      tentar(() => {
        if (!window.matchMedia) return null;
        const grosso = window.matchMedia("(pointer: coarse)").matches;
        const passaMouse = window.matchMedia("(hover: hover)").matches;
        if (grosso && !passaMouse) return "toque (tela sensível)";
        if (!grosso && passaMouse) return "mouse ou trackpad";
        return "toque e mouse";
      }),
      "Num celular você não consegue passar o mouse sobre o link para conferir o destino.",
    ),
    entrada(
      "conexao",
      "Tipo de conexão",
      tentar(() => {
        const c = nav.connection;
        if (!c?.effectiveType) return null;
        const economia = c.saveData ? " · modo economia ligado" : "";
        return `${c.effectiveType}${economia}`;
      }),
      "Conexão lenta é pretexto clássico: “o site do banco travou, me manda por aqui mesmo”.",
    ),
    entrada(
      "cpu",
      "Núcleos de processamento",
      tentar(() =>
        nav.hardwareConcurrency ? `${nav.hardwareConcurrency} núcleos` : null,
      ),
      "Indica o porte do aparelho — e quanto ele aguenta rodar em segundo plano.",
    ),
    entrada(
      "memoria",
      "Memória do aparelho",
      tentar(() => (nav.deviceMemory ? `${nav.deviceMemory} GB (aprox.)` : null)),
      "Mais um número que, somado aos outros, estreita quem você é.",
    ),
  ];

  // Bateria: só o Chromium expõe, e é assíncrona. Ausência é normal.
  try {
    if (typeof nav.getBattery === "function") {
      const bat = await nav.getBattery();
      const pct = Math.round(bat.level * 100);
      entradas.push(
        entrada(
          "bateria",
          "Bateria",
          `${pct}% · ${bat.charging ? "carregando" : "sem carregar"}`,
          "Bateria acabando é a definição de pressa — e pressa é o que o golpe explora.",
        ),
      );
    } else {
      entradas.push(
        entrada("bateria", "Bateria", null, "Seu navegador esconde esse dado. Ótimo."),
      );
    }
  } catch {
    entradas.push(
      entrada("bateria", "Bateria", null, "Seu navegador esconde esse dado. Ótimo."),
    );
  }

  entradas.push(
    entrada(
      "visita",
      "Já esteve aqui antes",
      lerEMarcarVisita() ? "sim" : "primeira visita",
      "Único dado desta lista que fica gravado — no seu aparelho. O botão abaixo apaga.",
    ),
  );

  return entradas;
}

/**
 * Lê a marca de visita e grava, nesta ordem, uma vez só por carregamento.
 *
 * Idempotente de propósito: pode ser chamada quantas vezes for, sempre
 * devolve a resposta do primeiro momento em que a página foi aberta.
 */
export function lerEMarcarVisita(): boolean {
  if (visitaAnterior !== null) return visitaAnterior;

  try {
    visitaAnterior = window.localStorage.getItem(VISIT_KEY) !== null;
    window.localStorage.setItem(VISIT_KEY, "1");
  } catch {
    // Modo anônimo ou armazenamento bloqueado: seguir como primeira visita.
    visitaAnterior = false;
  }

  return visitaAnterior;
}

export function apagarVisita() {
  try {
    window.localStorage.removeItem(VISIT_KEY);
    // Zera também o cache do módulo, senão a página continuaria dizendo "sim"
    // até o próximo recarregamento, contradizendo o que o botão acabou de fazer.
    visitaAnterior = false;
    return true;
  } catch {
    return false;
  }
}

/** Releitura barata dos campos que mudam sozinhos. */
export function lerCamposVivos(): Record<string, string> {
  const out: Record<string, string> = {};
  try {
    out.janela = `${window.innerWidth} × ${window.innerHeight}`;
  } catch {
    /* mantém o valor anterior */
  }
  try {
    out.hora = formatarHora();
  } catch {
    /* mantém o valor anterior */
  }
  return out;
}
