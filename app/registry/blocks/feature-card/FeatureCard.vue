<script setup lang="ts">
import type { HTMLAttributes } from "vue";
import { cn } from "@/lib/utils";

export interface FeatureCardProps {
  /** Feature title supplied by the consuming app */
  title: string;
  /** Supporting feature copy supplied by the consuming app */
  description?: string;
  /** Optional destination. When omitted, the card renders as static content. */
  href?: string;
  /** Anchor target used when href is supplied */
  target?: HTMLAnchorElement["target"];
  /** Anchor rel used when href is supplied */
  rel?: string;
  /** Additional CSS classes for the root element */
  class?: HTMLAttributes["class"];
}

const props = defineProps<FeatureCardProps>();

function linkRel() {
  if (props.rel) return props.rel;
  if (props.target === "_blank") return "noopener noreferrer";
  return undefined;
}
</script>

<template>
  <component
    :is="href ? 'a' : 'div'"
    data-slot="feature-card"
    :href="href"
    :target="href ? target : undefined"
    :rel="href ? linkRel() : undefined"
    :class="cn(
      'group block rounded-xl border bg-card p-5 text-card-foreground shadow-sm sm:p-6',
      href && 'transition-colors hover:bg-accent hover:text-accent-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2',
      props.class,
    )"
  >
    <div
      v-if="$slots.icon"
      data-slot="feature-card-icon"
      class="mb-5 flex size-10 items-center justify-center rounded-lg bg-primary/10 text-primary transition-colors group-hover:bg-primary/15"
    >
      <slot name="icon" />
    </div>

    <h3
      data-slot="feature-card-title"
      class="text-balance text-base font-semibold tracking-tight"
    >
      {{ title }}
    </h3>

    <p
      v-if="description"
      data-slot="feature-card-description"
      class="mt-2 text-pretty text-sm leading-6 text-muted-foreground transition-colors group-hover:text-accent-foreground/80"
    >
      {{ description }}
    </p>
  </component>
</template>
