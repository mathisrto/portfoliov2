// components/ThemeScript.tsx
"use client";

export default function ThemeScript() {
    const code = `
    (function() {
      try {
        const match = document.cookie.match(/theme=(system|dark|light)/);
        let theme = match ? match[1] : "system";

        if (theme === "system") {
          theme = window.matchMedia("(prefers-color-scheme: dark)").matches ? "dark" : "light";
        }

        // Nettoyage avant ajout (évite "light dark" en même temps)
        document.documentElement.classList.remove("light", "dark");
        document.documentElement.classList.add(theme);
      } catch(e) {
        console.error("ThemeScript error:", e);
      }
    })();
  `;

    return <script dangerouslySetInnerHTML={{ __html: code }} />;
}
