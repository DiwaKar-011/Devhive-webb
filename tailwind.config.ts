import type { Config } from "tailwindcss";

const config: Config = {
  content: ["./app/**/*.{ts,tsx}", "./components/**/*.{ts,tsx}"],
  theme: {
    extend: {
      colors: {
        accent: "#b6beca",
        accent2: "#8f99a8",
        dark: {
          DEFAULT: "#0a0a0a",
          2: "#111111",
          3: "#181818",
          4: "#1c1c1c",
        },
      },
      fontFamily: {
        syne: ["Syne", "sans-serif"],
        grotesk: ["Space Grotesk", "sans-serif"],
      },
      keyframes: {
        marquee: {
          "0%": { transform: "translateX(0)" },
          "100%": { transform: "translateX(-50%)" },
        },
        fadeUp: {
          "0%": { opacity: "0", transform: "translateY(30px)" },
          "100%": { opacity: "1", transform: "translateY(0)" },
        },
        slideDown: {
          "0%": { opacity: "0", transform: "translateY(-20px)" },
          "100%": { opacity: "1", transform: "translateY(0)" },
        },
        pulseDot: {
          "0%, 100%": { opacity: "0.6", transform: "scale(0.95)" },
          "50%": { opacity: "1", transform: "scale(1.1)" },
        },
        gridMove: {
          "0%": { transform: "translate3d(0, 0, 0)" },
          "100%": { transform: "translate3d(60px, 60px, 0)" },
        },
      },
    },
  },
};

export default config;
