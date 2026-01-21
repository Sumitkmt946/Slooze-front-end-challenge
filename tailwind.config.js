/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: "class",
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      colors: {
        primary: "#6C5DD3", // Purple from specific design
        secondary: "#FFA2C0", // Pink/Red accent
        text: {
          dark: "#11142D",
          gray: "#808191",
        },
        bg: {
          main: "#F7F7F7", // Light gray background
          card: "#FFFFFF",
        },
        success: "#7FBA7A", // Greenish
        error: "#FF754C",
      },
      fontFamily: {
        sans: ["Inter", "sans-serif"],
        display: ["Outfit", "sans-serif"], // For headers if needed
      },
      spacing: {
        'sidebar': '250px',
      }
    },
  },
  plugins: [],
};
