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
          50: "#f5f5f3",
          100: "#ece9e3",
          200: "#d9d2c6",
          300: "#c6bbaa",
          400: "#a69177",
          500: "#8c7457",
          600: "#735b41",
          700: "#5a4631",
          800: "#3b2f20",
          900: "#231b13"
        },
        primary: {
          DEFAULT: "#0F766E",
          soft: "#CCF0EC"
        }
      },
      fontFamily: {
        sans: ["system-ui", "ui-sans-serif", "Inter", "sans-serif"]
      },
      boxShadow: {
        soft: "0 18px 45px rgba(0, 0, 0, 0.35)"
      }
    }
  },
  plugins: []
};

export default config;
