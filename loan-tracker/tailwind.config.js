module.exports = {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        primary: {
          100: "#E6F0FF",
          500: "#3B82F6",
          600: "#2563EB",
        },
        secondary: {
          100: "#F0F9FF",
          500: "#06B6D4",
        },
        success: {
          100: "#D1FAE5",
          500: "#10B981",
        },
        warning: {
          100: "#FEF3C7",
          500: "#F59E0B",
        },
        danger: {
          100: "#FEE2E2",
          500: "#EF4444",
        },
      },
    },
  },
  plugins: [],
}