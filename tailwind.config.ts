import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    container: {
      center: true,
      padding: "1.5rem",
      screens: {
        sm: "640px",
      },
    },
    colors: {
      "green-200": "hsl(148, 38%, 91%)",
      "green-600": "hsl(169, 82%, 27%)",
      red: "hsl(0, 66%, 54%)",
      white: "hsl(0, 0%, 100%)",
      "grey-500": "hsl(186, 15%, 59%)",
      "grey-900": "hsl(187, 24%, 22%)",
    },
    extend: {
      colors: {
        background: "var(--background)",
        foreground: "var(--foreground)",
      },
    },
  },
  plugins: [],
};
export default config;
