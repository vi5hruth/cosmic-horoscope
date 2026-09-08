import type { Config } from "tailwindcss";

// Design tokens for the "Celestial Cartography" theme:
// A deep-space palette with a single gold "signature" accent used sparingly,
// electric purple for interactive/energy states, and a mono utility face
// for chart data (lucky numbers, degrees, coordinates) to feel instrument-like.
export default {
  content: ["./index.html", "./src/**/*.{ts,tsx}"],
  theme: {
    extend: {
      colors: {
        void: "#05050F", // outermost background, almost black
        "deep-space": "#0B0B1E", // primary background
        "midnight-navy": "#12142E", // panel / card surface
        "midnight-navy-light": "#1B1E42", // hover surface
        "celestial-gold": "#E8B563", // signature accent — used sparingly
        "celestial-gold-dim": "#8A6B3C",
        "electric-purple": "#7B2FF7", // interactive / energy accent
        "electric-purple-dim": "#4A2094",
        starlight: "#F5F3FF", // primary text on dark
        "muted-violet": "#A8A3C7", // secondary text
        "line-violet": "rgba(168,163,199,0.14)", // hairline borders
      },
      fontFamily: {
        display: ["'Cormorant Garamond'", "serif"],
        body: ["'Inter'", "sans-serif"],
        mono: ["'Space Mono'", "monospace"],
      },
      boxShadow: {
        "glow-gold": "0 0 24px rgba(232,181,99,0.35)",
        "glow-purple": "0 0 32px rgba(123,47,247,0.45)",
      },
      backgroundImage: {
        "radial-fade":
          "radial-gradient(circle at 50% 20%, rgba(123,47,247,0.18), transparent 60%)",
      },
      keyframes: {
        pulseGlow: {
          "0%, 100%": { opacity: "0.6" },
          "50%": { opacity: "1" },
        },
        float: {
          "0%, 100%": { transform: "translateY(0px)" },
          "50%": { transform: "translateY(-6px)" },
        },
      },
      animation: {
        "pulse-glow": "pulseGlow 3s ease-in-out infinite",
        float: "float 4s ease-in-out infinite",
      },
    },
  },
  plugins: [],
} satisfies Config;
