import { defineCollection } from "astro:content";
import { glob } from "astro/loaders";
import { z } from "astro/zod";

const docs = defineCollection({
  loader: glob({ pattern: "**/*.{md,mdx}", base: "./src/content/docs" }),
  schema: z.object({
    title: z.string(),
    description: z.string(),
    /**
     * Dokumentasi dipisah menjadi dua jalur agar pengguna yang hanya ingin
     * memakai Sakala tidak tercampur dengan internal runtime. Jalur
     * `referensi` muncul di kedua sidebar.
     */
    track: z.enum(["panduan", "teknis", "referensi"]).default("panduan"),
    /** Label kelompok di dalam satu jalur. */
    section: z.string(),
    /** Urutan di dalam jalur. */
    order: z.number(),
    /** Bahasa dokumen. Tidak ada fallback: jalur bahasa yang belum
     *  diterjemahkan tidak akan muncul di sidebar bahasa itu. */
    lang: z.enum(["id", "en"]).default("id"),
  }),
});

const changelog = defineCollection({
  loader: glob({ pattern: "**/*.md", base: "./src/content/changelog" }),
  schema: z.object({
    title: z.string(),
    description: z.string(),
    version: z.string(),
    publishedAt: z.coerce.date(),
    /** Entri diterbitkan per bahasa. Tidak ada fallback: versi bahasa yang
     *  belum ditulis tidak akan muncul. */
    lang: z.enum(["id", "en"]).default("id"),
  }),
});

export const collections = { docs, changelog };
