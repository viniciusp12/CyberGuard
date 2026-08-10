import type { Config } from "tailwindcss";

/**
 * Direção "laudo forense".
 *
 * Três regras que mantêm a paleta longe do clichê de cibersegurança:
 *
 * 1. Cor de sinal tem significado fixo e nunca é decorativa.
 *    âmbar = atenção · vermelho = fraude · verde = legítimo.
 * 2. Mono é para rótulo, dado e manchete. Prosa corrida é sempre `sans`.
 * 3. Nada de glow, neon ou verde-terminal.
 *
 * Contraste sobre `page` (#16181B), medido em WCAG 2.1:
 *   ink 15.6 · ink-2 7.9 · ink-3 5.2 · amber 8.2 · red 5.3 · green 9.2
 * Todos passam AA para texto normal; ink-3 também passa sobre `panel`.
 */
const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        page: "#16181B",
        panel: {
          DEFAULT: "#1D2024",
          raised: "#24282D",
        },
        line: {
          DEFAULT: "#2E333A",
          strong: "#3D444D",
        },
        ink: {
          DEFAULT: "#E8E6E2",
          2: "#A8AEB6",
          3: "#858C95",
        },
        signal: {
          amber: "#E8A33D",
          amberDim: "#3A2E18",
          red: "#F2555A",
          redDim: "#3A1D1F",
          green: "#58D08B",
          greenDim: "#16301F",
        },
        brand: {
          leroy: "#78BE20",
        },
      },
      fontFamily: {
        sans: ["var(--font-inter-tight)", "system-ui", "sans-serif"],
        mono: ["var(--font-plex-mono)", "ui-monospace", "monospace"],
      },
      fontSize: {
        // Manchetes em mono: entrelinha maior que a de uma display sans,
        // porque mono tem altura-x grande e aperta demais em 0.9.
        hero: ["clamp(2.25rem, 6.2vw, 5rem)", { lineHeight: "1.04", letterSpacing: "-0.02em" }],
        title: ["clamp(1.75rem, 4vw, 3.25rem)", { lineHeight: "1.1", letterSpacing: "-0.015em" }],
        // Corpo generoso: o público-alvo inclui quem lê com dificuldade em tela.
        body: ["1.0625rem", { lineHeight: "1.72" }],
        bodyLg: ["1.1875rem", { lineHeight: "1.68" }],
      },
      spacing: {
        // Alvo de toque mínimo confortável (WCAG 2.5.5 pede 44px).
        touch: "2.75rem",
      },
      transitionTimingFunction: {
        forense: "cubic-bezier(0.22, 1, 0.36, 1)",
      },
      keyframes: {
        caret: {
          "0%, 45%": { opacity: "1" },
          "50%, 95%": { opacity: "0" },
        },
      },
      animation: {
        caret: "caret 1.1s steps(1) infinite",
      },
    },
  },
  plugins: [],
};

export default config;
