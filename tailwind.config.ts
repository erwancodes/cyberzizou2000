import type { Config } from "tailwindcss";

export default {
  content: [
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        win: {
          gray: "#c0c0c0",
          dark: "#808080",
          darker: "#404040",
          blue: "#000080",
        },
        crt: {
          green: "#00ff00",
          amber: "#ffb000",
        },
      },
      fontFamily: {
        vt323: ["var(--font-vt323)", "monospace"],
        press: ["var(--font-press)", "monospace"],
        comic: ['"Comic Sans MS"', '"Comic Sans"', "cursive"],
      },
    },
  },
  plugins: [],
} satisfies Config;
