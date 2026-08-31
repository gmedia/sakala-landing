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
  // URL dokumentasi teknis pindah ke /docs/teknis saat dokumentasi dipisah
  // menjadi jalur panduan dan jalur teknis.
  redirects: {
    // /tentang dan /governance dilebur menjadi satu halaman open source
    // saat homepage disusun ulang mengikuti docs/landing/.
    "/tentang": "/open-source",
    "/governance": "/open-source",
    "/en/tentang": "/en/open-source",
    "/en/governance": "/en/open-source",
    "/docs/concepts": "/docs/teknis/konsep",
    "/docs/deployment-flow": "/docs/teknis/alur-deployment",
    "/docs/agent-runtime": "/docs/teknis/agent",
    // Halaman yang menjanjikan pemakaian dicabut selama produknya belum ada.
    // Semuanya mendarat di hub docs, bukan pada janji yang tidak bisa ditepati.
    "/docs/quickstart": "/docs",
    "/docs/perjalanan-deploy": "/docs",
    "/docs/menyiapkan-project": "/docs",
    "/docs/ketika-gagal": "/docs",
    "/docs/variabel-dan-secret": "/docs",
    "/docs/domain-dan-url": "/docs",
    "/en/docs/perjalanan-deploy": "/en/docs",
    "/en/docs/menyiapkan-project": "/en/docs",
    "/en/docs/ketika-gagal": "/en/docs",
    "/en/docs/variabel-dan-secret": "/en/docs",
    "/en/docs/domain-dan-url": "/en/docs",
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
