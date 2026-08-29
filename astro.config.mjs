// @ts-check
import mdx from "@astrojs/mdx";
import sitemap from "@astrojs/sitemap";
import tailwindcss from "@tailwindcss/vite";
import { defineConfig, fontProviders } from "astro/config";

const fontDir = "./src/assets/fonts";

export default defineConfig({
  site: "https://sakala.dev",
  output: "static",
  // Bahasa Indonesia tidak memakai prefix agar seluruh URL yang sudah terindeks
  // tidak berubah. Lihat docs/PROJECT_SEO_AUDIT.md.
  i18n: {
    defaultLocale: "id",
    locales: ["id", "en"],
    routing: {
      prefixDefaultLocale: false,
    },
  },
  prefetch: {
    prefetchAll: false,
    defaultStrategy: "hover",
  },
  integrations: [
    mdx(),
    sitemap({
      i18n: {
        defaultLocale: "id",
        locales: { id: "id-ID", en: "en-US" },
      },
    }),
  ],
  fonts: [
    {
      provider: fontProviders.local(),
      name: "Montserrat",
      cssVariable: "--font-montserrat",
      fallbacks: ["Segoe UI", "Arial", "sans-serif"],
      options: {
        variants: [
          {
            weight: 600,
            style: "normal",
            src: [`${fontDir}/montserrat-600.woff2`],
          },
          {
            weight: 700,
            style: "normal",
            src: [`${fontDir}/montserrat-700.woff2`],
          },
        ],
      },
    },
    {
      provider: fontProviders.local(),
      name: "Inter",
      cssVariable: "--font-inter",
      fallbacks: ["Segoe UI", "Arial", "sans-serif"],
      options: {
        variants: [
          { weight: 400, style: "normal", src: [`${fontDir}/inter-400.woff2`] },
          { weight: 500, style: "normal", src: [`${fontDir}/inter-500.woff2`] },
          { weight: 600, style: "normal", src: [`${fontDir}/inter-600.woff2`] },
        ],
      },
    },
  ],
  vite: {
    plugins: [tailwindcss()],
  },
});
