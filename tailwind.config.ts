import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        background: "#0a0a0b",
        foreground: "#f5f5f7",
        surface: {
          DEFAULT: "#111114",
          elevated: "#17171c",
          border: "#22222a",
        },
        accent: {
          DEFAULT: "#b47cff",
          dim: "#7c4dd6",
          glow: "rgba(180, 124, 255, 0.18)",
        },
        brand: {
          leroy: "#78BE20",
          leroyDark: "#2a5a10",
        },
        danger: "#ff5d5d",
        warning: "#ffb84d",
      },
      fontFamily: {
        sans: ["var(--font-inter)", "system-ui", "sans-serif"],
        display: ["var(--font-space-grotesk)", "system-ui", "sans-serif"],
        mono: ["var(--font-jetbrains)", "ui-monospace", "monospace"],
      },
      fontSize: {
        hero: ["clamp(3rem, 9vw, 9rem)", { lineHeight: "0.9", letterSpacing: "-0.04em" }],
        display: ["clamp(2.5rem, 6vw, 5.5rem)", { lineHeight: "0.95", letterSpacing: "-0.03em" }],
      },
      backgroundImage: {
        "grid-pattern":
          "linear-gradient(rgba(180,124,255,0.05) 1px, transparent 1px), linear-gradient(90deg, rgba(180,124,255,0.05) 1px, transparent 1px)",
        "radial-fade":
          "radial-gradient(ellipse at top, rgba(180,124,255,0.14), transparent 60%)",
      },
      animation: {
        "fade-up": "fadeUp 0.7s cubic-bezier(0.16,1,0.3,1) both",
        "pulse-slow": "pulse 4s cubic-bezier(0.4,0,0.6,1) infinite",
        marquee: "marquee 40s linear infinite",
        "glow-pulse": "glowPulse 3s ease-in-out infinite",
      },
      keyframes: {
        fadeUp: {
          "0%": { opacity: "0", transform: "translateY(24px)" },
          "100%": { opacity: "1", transform: "translateY(0)" },
        },
        marquee: {
          "0%": { transform: "translateX(0)" },
          "100%": { transform: "translateX(-50%)" },
        },
        glowPulse: {
          "0%, 100%": { opacity: "0.4" },
          "50%": { opacity: "0.8" },
        },
      },
    },
  },
  plugins: [],
};

export default config;
