<script setup lang="ts">
import type { HTMLAttributes } from "vue";
import { computed } from "vue";
import { cn } from "@/lib/utils";

export interface FeatureGridItem {
  /** Stable id for rendering. Falls back to title when omitted. */
  id?: string;
  /** Feature title supplied by the consuming app. */
  title: string;
  /** Supporting feature copy supplied by the consuming app. */
  description?: string;
  /** Optional destination. When omitted, the item renders as static content. */
  href?: string;
  /** Anchor target used when href is supplied. */
  target?: HTMLAnchorElement["target"];
  /** Anchor rel used when href is supplied. */
  rel?: string;
}

export interface FeatureGridProps {
  /** Optional eyebrow label shown above the section title. */
  headline?: string;
  /** Optional section title. */
  title?: string;
  /** Optional section description. */
  description?: string;
  /** Feature items supplied by the consuming app. */
  items?: FeatureGridItem[];
  /** Responsive column count for large screens. */
  columns?: 2 | 3 | 4;
  /** Additional CSS classes for the section. */
  class?: HTMLAttributes["class"];
}

const props = withDefaults(defineProps<FeatureGridProps>(), {
  items: () => [],
  columns: 3,
});

const gridClass = computed(() => {
  return {
    2: "lg:grid-cols-2",
    3: "lg:grid-cols-3",
    4: "lg:grid-cols-4",
  }[props.columns];
});

function itemKey(item: FeatureGridItem) {
  return item.id ?? item.title;
}

function linkRel(item: FeatureGridItem) {
  if (item.rel) return item.rel;
  if (item.target === "_blank") return "noopener noreferrer";
  return undefined;
}
</script>

<template>
  <section
    data-slot="feature-grid"
    :class="cn('py-12 md:py-16', props.class)"
  >
    <div class="mx-auto w-full max-w-7xl px-4 sm:px-6 lg:px-8">
      <div
        v-if="headline || title || description"
        data-slot="feature-grid-header"
        class="mx-auto max-w-3xl text-center"
      >
        <p
          v-if="headline"
          data-slot="feature-grid-headline"
          class="text-sm font-medium text-primary"
        >
          {{ headline }}
        </p>

        <h2
          v-if="title"
          data-slot="feature-grid-title"
          class="mt-3 text-balance text-3xl font-semibold tracking-tight sm:text-4xl"
        >
          {{ title }}
        </h2>

        <p
          v-if="description"
          data-slot="feature-grid-description"
          class="mt-4 text-pretty text-base/7 text-muted-foreground sm:text-lg/8"
        >
          {{ description }}
        </p>
      </div>

      <div
        data-slot="feature-grid-items"
        :class="cn(
          'grid gap-4 sm:grid-cols-2',
          gridClass,
          (headline || title || description) && 'mt-10 md:mt-12',
        )"
      >
        <component
          :is="item.href ? 'a' : 'article'"
          v-for="item in items"
          :key="itemKey(item)"
          data-slot="feature-grid-item"
          :href="item.href"
          :target="item.href ? item.target : undefined"
          :rel="item.href ? linkRel(item) : undefined"
          :class="cn(
            'group rounded-2xl border bg-card/70 p-5 text-card-foreground shadow-sm sm:p-6',
            item.href && 'block transition-colors hover:bg-accent hover:text-accent-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2',
          )"
        >
          <div
            v-if="$slots.icon"
            data-slot="feature-grid-item-icon"
            class="mb-5 flex size-10 items-center justify-center rounded-xl bg-primary/10 text-primary transition-colors group-hover:bg-primary/15"
          >
            <slot
              name="icon"
              :item="item"
            />
          </div>

          <h3
            data-slot="feature-grid-item-title"
            class="text-balance text-base font-semibold tracking-tight"
          >
            {{ item.title }}
          </h3>

          <p
            v-if="item.description"
            data-slot="feature-grid-item-description"
            class="mt-2 text-pretty text-sm/6 text-muted-foreground transition-colors group-hover:text-accent-foreground/80"
          >
            {{ item.description }}
          </p>
        </component>
      </div>
    </div>
  </section>
</template>
