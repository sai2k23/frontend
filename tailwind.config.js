/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  darkMode: "class",
  theme: {
    extend: {
      fontFamily: {
        sans: ["'Inter'", "sans-serif"], // Customize if you prefer a different font
      },
    },
  },
  plugins: [],
};
