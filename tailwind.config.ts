import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      rotate: {
        "y-180": "180deg",
      },
      colors: {
        slate: {
          "50": "#fcfeff",
          "100": "#f4f7f9",
          "200": "#e9ecf0",
          "300": "#d3dae1",
          "400": "#a0aab8",
          "500": "#6b788b",
          "600": "#4f5a69",
          "700": "#3c4655",
          "800": "#262e3b",
          "900": "#1b202a",
        },
      },
    },
  },
  plugins: [require("tailwindcss-animate")],
};
export default config;
