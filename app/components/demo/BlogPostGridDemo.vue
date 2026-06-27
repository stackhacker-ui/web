<script setup lang="ts">
import { BlogPostGrid, type BlogPostGridPost } from "~/registry/blocks/blog-post-grid";

const posts: BlogPostGridPost[] = [
  {
    id: "design-process",
    to: "/docs/components",
    title: "From mockup to market: a practical design process",
    description: "A field guide to moving from research and wireframes into shippable Nuxt interfaces without losing product context.",
    dateLabel: "Apr 23, 2026",
    badge: "Design",
    readTime: "8 min read",
    image: {
      src: "https://images.unsplash.com/photo-1497366754035-f200968a6e72?q=80&w=1200&auto=format&fit=crop",
      alt: "A bright workspace with design notes and a laptop",
    },
    authors: [
      {
        name: "Emma Thompson",
        avatar: {
          src: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?q=80&w=128&auto=format&fit=crop",
          alt: "Emma Thompson",
        },
      },
    ],
  },
  {
    id: "color-systems",
    href: "https://ui.stackhacker.io/docs/components",
    target: "_blank",
    title: "Color systems that survive implementation",
    description: "How semantic tokens keep visual decisions portable across marketing pages, docs, and product surfaces.",
    dateLabel: "Mar 15, 2026",
    badge: "Systems",
    image: {
      src: "https://images.unsplash.com/photo-1513542789411-b6a5d4f31634?q=80&w=1200&auto=format&fit=crop",
      alt: "Color swatches and design materials",
    },
  },
  {
    id: "slow-design",
    to: "/docs/components/feature-grid",
    title: "The case for slow design in fast interfaces",
    description: "Designing moments of pause can help content-heavy products feel more intentional and easier to scan.",
    dateLabel: "Jan 28, 2026",
    badge: "UX",
    readTime: "7 min read",
  },
];
</script>

<template>
  <div class="rounded-xl border bg-muted/20 p-4 sm:p-6">
    <BlogPostGrid
      title="Latest articles"
      description="Render display-ready post cards while your app owns routes, dates, images, authors, and content loading."
      :posts="posts"
      class="py-0"
    />
  </div>
</template>
