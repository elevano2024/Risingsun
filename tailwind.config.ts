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
        primary: {
          50: "#F4FFF6",
          100: "#E8FFEB",
          200: "#EAFFED",
          300: "#D0E3D3",
          400: "#71B15E",
          500: "#2D9B3F",
          600: "#3C6031",
          700: "#36562C",
          800: "#216B2D",
          900: "#17421E",
          950: "#0A160C",
        },
        secondary: {
          50: "#FFFBF3",
          100: "#FCE2A2",
          200: "#F3B828",
          300: "#F4AD26",
          400: "#F55157",
          500: "#EED64C",
        },
        neutral: {
          50: "#F8F8F8",
          100: "#FFFFFF",
          200: "#C7D9CA",
          300: "#BBCDBE",
          400: "#687A6B",
          500: "#222222",
          600: "#0A160C",
        },
        accent: {
          blue: "#7DB4D8",
          yellow: "#FFE54D",
          green: "#7AD470",
        },
      },
      fontFamily: {
        gotham: ["var(--font-gotham)", "sans-serif"],
        jakarta: ["var(--font-jakarta)", "sans-serif"],
      },
      fontSize: {
        display: ["44px", { lineHeight: "1.27", letterSpacing: "1%" }],
        "heading-1": ["33px", { lineHeight: "1.30", letterSpacing: "1%" }],
        "heading-2": ["28px", { lineHeight: "1.07", letterSpacing: "1%" }],
        "heading-3": ["26px", { lineHeight: "1.20", letterSpacing: "1%" }],
        "heading-4": ["24px", { lineHeight: "1.25", letterSpacing: "1%" }],
        "heading-5": ["22px", { lineHeight: "1.20", letterSpacing: "1%" }],
        "heading-6": ["20px", { lineHeight: "1.20", letterSpacing: "1%" }],
        "body-large": ["20px", { lineHeight: "1.30" }],
        body: ["16px", { lineHeight: "1.38" }],
        "body-small": ["14px", { lineHeight: "1.26" }],
        caption: ["18px", { lineHeight: "1.33", letterSpacing: "1%" }],
      },
      borderRadius: {
        custom: "16px",
      },
      boxShadow: {
        custom: "6px 6px 54px 0px rgba(0, 0, 0, 0.06)",
      },
      backgroundImage: {
        "gradient-primary":
          "linear-gradient(180deg, #E8FFEB 17.24%, #FFFFFF 100%)",
        "gradient-hero": "linear-gradient(180deg, #17421E 0%, #2D9B3F 100%)",
        "gradient-footer":
          "linear-gradient(180deg, rgba(244, 255, 246, 0.44) 0.5%, #EAFFED 32.14%)",
      },
    },
  },
  plugins: [],
};

export default config;
