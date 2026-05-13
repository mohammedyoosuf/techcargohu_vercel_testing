/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{ts,tsx}"],
  theme: {
    extend: {
      colors: {
        canvas: "#ececea",
        ink: "#18322b",
        brand: "#0f3d33",
        mint: "#1fa97a",
        line: "#d7ddd8",
        soft: "#f5f6f2",
        danger: "#c44949",
        success: "#188b63",
      },
      boxShadow: {
        panel: "0 8px 24px rgba(15, 61, 51, 0.08)",
      },
      borderRadius: {
        panel: "20px",
      },
      fontFamily: {
        sans: ["Poppins", "ui-sans-serif", "system-ui", "sans-serif"],
      },
    },
  },
  plugins: [],
};
