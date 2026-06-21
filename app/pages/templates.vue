<script lang="ts" setup>
import { ArrowRight, ExternalLink } from "lucide-vue-next";
import { siteConfig } from "@/lib/config";

useSeoMeta({
  title: "Templates",
  description: "Open-source Nuxt templates built for the shadcn-vue community. Start quickly and adapt for your project.",
  ogTitle: `Templates - ${siteConfig.name}`,
  ogDescription: "Open-source Nuxt templates built for the shadcn-vue community. Start quickly and adapt for your project.",
  ogImage: siteConfig.ogImage,
  ogUrl: `${siteConfig.url}/templates`,
  twitterTitle: `Templates - ${siteConfig.name}`,
  twitterDescription: "Open-source Nuxt templates built for the shadcn-vue community. Start quickly and adapt for your project.",
  twitterImage: siteConfig.ogImage,
  twitterCard: "summary_large_image",
});

interface Template {
  name: string;
  description: string;
  features: string[];
  preview?: string;
  github?: string;
  status: "available" | "coming-soon";
  image?: { light: string; dark: string };
}

const templates: Template[] = [
  {
    name: "Starter",
    description: "A minimal Nuxt starter to begin quickly with shadcn-vue.",
    features: ["Nuxt setup included", "ESLint setup included", "shadcn-vue setup included"],
    preview: "https://starter-template.stackhacker.io",
    github: "https://github.com/stackhacker-ui/starter",
    status: "available",
    image: { light: "/templates/starter-light.png", dark: "/templates/starter-dark.png" },
  },
  {
    name: "Chat",
    description: "An open chat app starter for Nuxt with practical patterns you can adapt.",
    features: ["GitHub authentication", "Persistent chat history", "Streaming AI responses"],
    preview: "https://chat-template.stackhacker.io",
    github: "https://github.com/stackhacker-ui/chat",
    status: "available",
    image: { light: "/templates/chat-light.png", dark: "/templates/chat-dark.png" },
  },
  {
    name: "Docs",
    description: "A documentation template for product guides, references, and content-heavy sites.",
    features: ["Content-first structure", "Documentation navigation", "Responsive reading layout"],
    status: "coming-soon",
  },
  {
    name: "Landing",
    description: "A lightweight landing page starter powered by Nuxt Content.",
    features: ["Features, pricing, and FAQ sections", "Nuxt Content support", "Responsive layout"],
    preview: "https://landing-template.stackhacker.io",
    github: "https://github.com/stackhacker-ui/landing",
    status: "available",
    image: { light: "/templates/landing-light.png", dark: "/templates/landing-dark.png" },
  },
  {
    name: "Portfolio",
    description: "A polished portfolio template for projects, writing, and personal profiles.",
    features: ["Project showcase", "Profile-first layout", "Responsive sections"],
    status: "coming-soon",
  },
  {
    name: "SaaS",
    description: "A SaaS marketing template with product sections and conversion-focused pages.",
    features: ["Marketing page sections", "Pricing-ready structure", "Responsive layout"],
    status: "coming-soon",
  },
  {
    name: "Changelog",
    description: "A changelog template for publishing product updates with a focused release feed.",
    features: ["Release-focused layout", "GitHub updates integration", "Light and dark previews"],
    preview: "https://changelog-template.stackhacker.io",
    github: "https://github.com/stackhacker-ui/changelog",
    status: "available",
    image: { light: "/templates/changelog-light.png", dark: "/templates/changelog-dark.png" },
  },
];
</script>

<template>
  <div>
    <PageHeader>
      <PageHeaderHeading>
        Templates
      </PageHeaderHeading>
      <PageHeaderDescription class="mt-4">
        Open-source templates built for the shadcn-vue community.
        Start quickly in Nuxt, then adapt for your own project.
      </PageHeaderDescription>
    </PageHeader>

    <section class="border-grid border-t">
      <div class="container-wrapper">
        <div class="container py-12 md:py-16 lg:py-20">
          <div class="mx-auto grid max-w-5xl gap-8 md:grid-cols-2">
            <div
              v-for="template in templates"
              :key="template.name"
              class="border-border bg-card text-card-foreground group flex h-full flex-col overflow-hidden rounded-lg border transition-colors"
              :class="template.status === 'available' ? 'hover:border-foreground/20' : 'opacity-60'"
            >
              <!-- Image -->
              <div class="border-border bg-muted relative aspect-3/2 overflow-hidden border-b">
                <template v-if="template.image">
                  <img
                    :src="template.image.light"
                    :alt="`${template.name} template preview`"
                    class="size-full object-cover dark:hidden"
                  >
                  <img
                    :src="template.image.dark"
                    :alt="`${template.name} template preview`"
                    class="hidden size-full object-cover dark:block"
                  >
                </template>
                <template v-else>
                  <div class="flex size-full items-center justify-center" />
                </template>
                <div
                  v-if="template.status === 'coming-soon'"
                  class="absolute inset-0 flex items-center justify-center bg-black/5 dark:bg-black/20"
                >
                  <span class="bg-muted text-muted-foreground rounded-full px-3 py-1 text-xs font-medium">
                    Coming Soon
                  </span>
                </div>
              </div>

              <!-- Content -->
              <div class="flex flex-1 flex-col p-6">
                <div class="mb-2 flex items-center gap-2">
                  <h3 class="text-foreground text-lg font-semibold">
                    {{ template.name }}
                  </h3>
                  <span
                    v-if="template.status === 'coming-soon'"
                    class="bg-muted text-muted-foreground rounded-full px-2 py-0.5 text-xs font-medium"
                  >
                    Coming Soon
                  </span>
                </div>
                <p class="text-muted-foreground mb-4 text-sm leading-relaxed">
                  {{ template.description }}
                </p>
                <ul class="text-muted-foreground mb-6 space-y-1.5 text-sm">
                  <li
                    v-for="feature in template.features"
                    :key="feature"
                    class="flex items-center gap-2"
                  >
                    <span class="bg-foreground/20 size-1 rounded-full" />
                    {{ feature }}
                  </li>
                </ul>
                <div
                  v-if="template.status === 'available'"
                  class="mt-auto flex items-center gap-3"
                >
                  <Button
                    v-if="template.preview"
                    as-child
                    size="sm"
                  >
                    <a
                      :href="template.preview"
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      Live Demo
                      <ExternalLink class="size-3" />
                    </a>
                  </Button>
                  <Button
                    v-if="template.github"
                    as-child
                    variant="outline"
                    size="sm"
                  >
                    <a
                      :href="template.github"
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      Source Code
                      <ArrowRight class="size-3" />
                    </a>
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  </div>
</template>
