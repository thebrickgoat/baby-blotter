import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      backgroundImage: {
        "gradient-radial": "radial-gradient(var(--tw-gradient-stops))",
        "gradient-conic":
          "conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))",
      },
      colors: {
        "accent": "#e85a5a",
        "accent-dark": "#db3737",
        "accent-2": "#e8985a",
        "accent-3": "#9dc262",
        "accent-4": "#e85a5a",
        "accent-5": "#6ed4cc",
      },
    },
  },
  plugins: [],
};
export default config;
