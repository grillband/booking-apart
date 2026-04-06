import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}"
  ],
  theme: {
    extend: {
      colors: {
        brand: {
          50: "#faf9f7",
          100: "#f0ede8",
          200: "#ddd7cd",
          300: "#c4b9a8",
          400: "#a6947a",
          500: "#8a7460",
          600: "#6e5a46",
          700: "#564433",
          800: "#3b2f22",
          900: "#231b13"
        },
        surface: {
          DEFAULT: "#ffffff",
          light: "#f5f5f3",
          lighter: "#fafaf8",
        },
        accent: {
          DEFAULT: "#8b6f47",
          light: "#c8a97e",
        },
      },
      fontFamily: {
        sans: ["Inter", "system-ui", "ui-sans-serif", "sans-serif"]
      },
      boxShadow: {
        card: "0 1px 3px rgba(0,0,0,0.04), 0 8px 32px rgba(0,0,0,0.06), inset 0 1px 0 rgba(255,255,255,0.7)",
        "card-hover": "0 4px 16px rgba(0,0,0,0.08), 0 12px 48px rgba(0,0,0,0.1), inset 0 1px 0 rgba(255,255,255,0.8)",
      },
      borderRadius: {
        '4xl': '2rem',
      }
    }
  },
  plugins: []
};

export default config;
