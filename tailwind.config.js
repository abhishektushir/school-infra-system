/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        primary: "#030213",
        primary__foreground: 'oklch(1 0 0)',
      },
    },
  },
  plugins: [],
};
