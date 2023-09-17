/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",

    // Or if using `src` directory:
    "./src/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        call: "#4f9458",
        check: "#129683",
        fold: "#888787",
        raise: "#f55353",
        allin: "#a521c7",

        red: "#c43302",
        yellow: "#edaa25",
        gray: "#b7bf99",
        green: "#0a7373",
        dark: "#222",
      },
    },
  },
  plugins: [],
};
