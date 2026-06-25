<script setup lang="ts">
import type { HTMLAttributes } from "vue";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

export interface HomeCtaLink {
  label: string;
  href: string;
  target?: HTMLAnchorElement["target"];
  rel?: string;
  variant?: "default" | "destructive" | "outline" | "secondary" | "ghost" | "link";
}

export interface HomeCtaProps {
  /** Main CTA headline supplied by the consuming app */
  title: string;
  /** Supporting CTA copy supplied by the consuming app */
  description: string;
  /** CTA links supplied by the consuming app */
  links?: HomeCtaLink[];
  /** Additional CSS classes for the section */
  class?: HTMLAttributes["class"];
}

const props = withDefaults(defineProps<HomeCtaProps>(), {
  links: () => [],
});

function linkRel(link: HomeCtaLink) {
  if (link.rel) return link.rel;
  if (link.target === "_blank") return "noopener noreferrer";
  return undefined;
}
</script>

<template>
  <section
    data-slot="home-cta"
    :class="cn('relative overflow-hidden py-20 text-center md:py-28', props.class)"
  >
    <div
      class="absolute inset-0 -z-10 overflow-hidden"
      aria-hidden="true"
    >
      <div class="absolute left-1/2 top-0 h-48 w-[70%] -translate-x-1/2 rounded-full bg-primary/20 blur-3xl" />
      <div class="absolute inset-0 bg-[radial-gradient(circle_at_center,currentColor_1px,transparent_1px)] text-primary/20 [background-size:24px_24px] [mask-image:linear-gradient(to_bottom,transparent,black,transparent)]" />
    </div>

    <div class="mx-auto w-full max-w-7xl px-4 sm:px-6 lg:px-8">
      <h2 class="mx-auto max-w-2xl text-pretty text-3xl font-semibold tracking-tight md:text-5xl">
        {{ title }}
      </h2>
      <p class="mx-auto mt-4 max-w-xl text-muted-foreground">
        {{ description }}
      </p>
      <div
        v-if="links.length"
        class="mt-8 flex flex-wrap justify-center gap-2.5"
      >
        <Button
          v-for="link in links"
          :key="`${link.label}-${link.href}`"
          as="a"
          :href="link.href"
          :target="link.target"
          :rel="linkRel(link)"
          :variant="link.variant || 'default'"
        >
          {{ link.label }}
        </Button>
      </div>
    </div>
  </section>
</template>
