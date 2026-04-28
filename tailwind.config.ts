import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        brand: {
          50:  "#fff4ef",
          100: "#ffe6d8",
          200: "#ffc8aa",
          400: "#ff8c5a",
          500: "#e8501a",
          600: "#d44315",
          700: "#b33610",
        },
        ink: {
          900: "#141414",
          800: "#1f1f1f",
          700: "#2e2e2e",
          500: "#525252",
          400: "#737373",
          300: "#a3a3a3",
          100: "#e5e5e5",
          50:  "#f5f5f5",
        },
        canvas: "#f8f7f2",
        success: "#16a34a",
        warning: "#ca8a04",
      },
      fontFamily: {
        sans: ["Inter", "system-ui", "sans-serif"],
      },
      borderRadius: {
        "2xl": "16px",
        "3xl": "24px",
      },
      boxShadow: {
        card:  "0 1px 3px rgba(0,0,0,.06), 0 4px 12px rgba(0,0,0,.06)",
        hover: "0 4px 6px rgba(0,0,0,.06), 0 10px 28px rgba(0,0,0,.10)",
        btn:   "0 1px 2px rgba(0,0,0,.12)",
      },
    },
  },
  plugins: [],
};
export default config;
