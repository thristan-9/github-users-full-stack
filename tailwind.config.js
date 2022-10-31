/** @type {import('tailwindcss').Config} */
module.exports = {
  mode: "jit",
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        "blue-100": "#CAF0F8",
        "blue-200": "#00B4D8",
        "blue-300": "#0077B6",
        "blue-400": "#03045E",
      },
    }
  },
  plugins: [],
}
