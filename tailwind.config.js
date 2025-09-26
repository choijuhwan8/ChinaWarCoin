/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,jsx,ts,tsx}"
  ],
  theme: {
    extend: {
      colors: {
        background: "#070d18",
        primary: "#6366f1",
        secondary: "#8b5cf6",
        accent: "#ec4899"
      },
      boxShadow: {
        'cta': "0 18px 38px -20px rgba(99, 102, 241, 0.75)",
        'cta-hover': "0 16px 36px -24px rgba(236, 72, 153, 0.7)",
        'gif': "0 24px 48px -24px rgba(222, 41, 16, 0.65)",
        'badge': "0 0 6px rgba(0, 0, 0, 0.35)"
      },
      fontFamily: {
        sans: ["Inter", "-apple-system", "BlinkMacSystemFont", "Segoe UI", "sans-serif"]
      }
    }
  },
  plugins: []
};
