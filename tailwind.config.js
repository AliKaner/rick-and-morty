/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    screens: {
      xs: "320px",
      sm: "640px",
      md: "768px",
      lg: "1024px",
      xl: "1280px",
      "2xl": "1536px",
    },
    extend: {
      colors: {
        primary: "#3c3e44",
        secondary: "#272b33",

        action: "#e62429",
        calm: "#05a6e1",
      },
      flex: {
        2: "2 2 0%",
        3: "3 3 0%"
      },
      width: {
        '144': '36rem',
      }
    },
  },
  plugins: [],
};
