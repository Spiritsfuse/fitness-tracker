/** @type {import('tailwindcss').Config} */
export default {
  darkMode: "class",
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        primary: "#4F46E5", // Vibrant indigo
        secondary: "#10B981", // Emerald green
        accent: "#F59E0B", // Warm amber
        background: "#F3F4F6", // Light gray
      },
      animation: {
        "pulse-slow": "pulse 3s infinite",
      },
    },
  },
  plugins: [],
};
