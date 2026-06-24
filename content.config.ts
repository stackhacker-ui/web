import { defineCollection, defineContentConfig, z } from "@nuxt/content";

export default defineContentConfig({
  collections: {
    docs: defineCollection({
      type: "page",
      source: {
        include: "docs/**/*.{md,yml}",
      },
      schema: z.object({
        category: z
          .enum(["element", "content", "chat", "overview"])
          .optional(),
      }),
    }),
  },
});
