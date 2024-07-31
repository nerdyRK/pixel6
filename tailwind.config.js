/** @type {import('tailwindcss').Config} */
export default {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      colors: {
        dark: "#212121",
        light: "#f1f5f9",
        primary: "rgb(41, 41, 41)",
      },
    },
  },
  plugins: [],
};
