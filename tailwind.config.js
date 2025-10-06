// tailwind.config.js
import { defineConfig } from "tailwindcss";
import typography from "@tailwindcss/typography";

export default defineConfig({
  darkMode: "class",
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      fontFamily: {
        sans: ["Inter", "system-ui", "sans-serif"],
        display: ["Poppins", "Inter", "sans-serif"],
        mono: ["Fira Code", "monospace"],
      },
      colors: {
        primary: { DEFAULT: "#1a73e8" }, // Google blue
        surface: { light: "#fafafa", dark: "#0d1117" },
      },
      typography: (theme) => ({
        DEFAULT: {
          css: {
            color: theme("colors.neutral.800"),
            fontFamily: theme("fontFamily.sans"),
            fontSize: "1.05rem",
            lineHeight: "1.85",
            maxWidth: "75ch",
            marginLeft: "auto",
            marginRight: "auto",
            letterSpacing: "-0.01em",

            /* Paragraphs */
            p: {
              marginTop: "1.4em",
              marginBottom: "1.4em",
              textAlign: "justify",
              textIndent: "1.75em",
              lineHeight: "1.9",
            },
            "p:first-of-type": {
              textIndent: "0",
              fontSize: "1.12rem",
              lineHeight: "2",
              color: theme("colors.neutral.900"),
            },

            /* Lists */
            "ul, ol": {
              marginTop: "1.3em",
              marginBottom: "1.3em",
              paddingLeft: "1.75em",
            },
            li: {
              marginTop: "0.5em",
              marginBottom: "0.5em",
              lineHeight: "1.8",
              paddingLeft: "0.2em",
            },
            "ul li::marker": {
              color: theme("colors.primary.DEFAULT"),
            },

            /* Headings */
            h1: {
              fontFamily: theme("fontFamily.display"),
              fontWeight: "800",
              fontSize: "2.25rem",
              marginBottom: "1.2em",
              lineHeight: "1.3",
              color: theme("colors.neutral.900"),
            },
            h2: {
              fontFamily: theme("fontFamily.display"),
              fontWeight: "700",
              marginTop: "3em",
              marginBottom: "1em",
              paddingBottom: "0.3em",
              borderBottom: "1px solid rgba(0,0,0,0.08)",
              lineHeight: "1.35",
            },
            h3: {
              fontWeight: "600",
              fontSize: "1.25rem",
              marginTop: "2em",
              marginBottom: "0.75em",
            },

            /* Blockquotes (clean, minimal) */
            blockquote: {
              marginTop: "2em",
              marginBottom: "2em",
              padding: "1rem 1.5rem",
              borderLeft: "4px solid #1a73e8",
              backgroundColor: "rgba(26,115,232,0.03)",
              borderRadius: "0.5rem",
              fontStyle: "normal",
              fontWeight: "400",
              color: theme("colors.neutral.700"),
            },

            /* Inline code */
            code: {
              backgroundColor: "rgba(26,115,232,0.08)",
              color: theme("colors.primary.DEFAULT"),
              padding: "0.25rem 0.4rem",
              borderRadius: "6px",
              fontSize: "0.95em",
            },

            /* Code blocks */
            pre: {
              backgroundColor: "#0d1117",
              color: "#f8fafc",
              borderRadius: "0.75rem",
              padding: "1.5rem 2rem",
              overflowX: "auto",
              boxShadow: "0 3px 18px rgba(0,0,0,0.25)",
              lineHeight: "1.7",
              marginTop: "2em",
              marginBottom: "2em",
              fontSize: "0.95rem",
            },

            /* Links */
            a: {
              color: theme("colors.primary.DEFAULT"),
              fontWeight: "500",
              textDecoration: "none",
              borderBottom: "1px dashed rgba(26,115,232,0.4)",
              "&:hover": {
                borderBottom: "1px solid rgba(26,115,232,0.8)",
              },
            },

            /* Emphasis */
            "em,strong,b": {
              color: theme("colors.neutral.900"),
              fontWeight: "600",
            },

            /* Horizontal rule */
            hr: {
              border: "none",
              height: "1px",
              background: "linear-gradient(to right, transparent, #ccc, transparent)",
              margin: "3em 0",
            },
          },
        },
        invert: {
          css: {
            color: theme("colors.neutral.200"),
            "h1,h2,h3,h4": { color: theme("colors.white") },
            code: { backgroundColor: "#1f2937", color: "#60a5fa" },
            blockquote: {
              backgroundColor: "rgba(26,115,232,0.05)",
              color: "#ddd",
              borderLeftColor: "#60a5fa",
            },
          },
        },
      }),
    },
  },
  plugins: [typography],
});
