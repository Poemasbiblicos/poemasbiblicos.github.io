import { defineCollection } from "astro:content";
import { glob } from "astro/loaders";
import { z } from "astro:schema";

const poemas = defineCollection({
  loader: glob({
    pattern: "**/*.{md,mdx}",
    base: "./src/content/poemas",
  }),

  schema: z.object({
    title: z.string(),
    description: z.string(),
    category: z.string(),
    tags: z.array(z.string()),
    featured: z.boolean(),
    pubDate: z.coerce.date(),
    heroImage: z.string(),
  }),
});

export const collections = {
  poemas,
};