/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./resources/views/**/*.antlers.html",
    "./resources/views/**/*.blade.php",
    "./resources/js/**/*.{js,ts,jsx,tsx}",
    "./content/**/*.md",
  ],
  theme: {
    extend: {
      colors: {
        // New Colors for Calculator
        canvas: "#ececea",
        ink: "#18322b",
        brand: "#0f3d33",
        mint: "#1fa97a",
        line: "#d7ddd8",
        soft: "#f5f6f2",
        danger: "#c44949",
        success: "#188b63",

        // Legacy Colors from Home Page
        greenheading: "#01A68C",
        navColor: "#3E3E3E",
        darkGreen: "#0D3832",
        lightText: "#7F7F7F",
        highlightGreen: "#01A68C",
        green1: "#01A68C",
        iconBg: "#F0F0F0",
        lightgreen: "#E6F4F1",
      },
      fontFamily: {
        sans: ['Poppins', 'sans-serif'],
      },
    },
  },
  plugins: [],
}
