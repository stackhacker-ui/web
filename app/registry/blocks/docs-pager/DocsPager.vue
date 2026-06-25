<script setup lang="ts">
import type { HTMLAttributes } from "vue";
import { ArrowLeft, ArrowRight } from "@lucide/vue";
import { cn } from "@/lib/utils";

export interface DocsPagerItem {
  title: string;
  href: string;
  description?: string;
}

export interface DocsPagerProps {
  /** Previous page supplied by the consuming app */
  previous?: DocsPagerItem | null;
  /** Next page supplied by the consuming app */
  next?: DocsPagerItem | null;
  /** Label shown above the previous page title */
  previousLabel?: string;
  /** Label shown above the next page title */
  nextLabel?: string;
  /** Additional CSS classes for the root element */
  class?: HTMLAttributes["class"];
}

const props = withDefaults(defineProps<DocsPagerProps>(), {
  previous: null,
  next: null,
  previousLabel: "Previous",
  nextLabel: "Next",
});
</script>

<template>
  <nav
    v-if="previous || next"
    data-slot="docs-pager"
    aria-label="Documentation pagination"
    :class="cn('grid gap-3 border-t pt-6 sm:grid-cols-2', props.class)"
  >
    <a
      v-if="previous"
      :href="previous.href"
      :aria-label="`${previousLabel}: ${previous.title}`"
      data-slot="docs-pager-previous"
      class="group rounded-xl border bg-card p-4 text-card-foreground transition-colors hover:bg-accent hover:text-accent-foreground"
    >
      <span class="flex items-center gap-2 text-xs font-medium text-muted-foreground transition-colors group-hover:text-accent-foreground/80">
        <ArrowLeft
          class="size-3.5"
          aria-hidden="true"
        />
        {{ previousLabel }}
      </span>
      <span class="mt-2 block truncate font-medium">
        {{ previous.title }}
      </span>
      <span
        v-if="previous.description"
        class="mt-1 line-clamp-2 block text-sm text-muted-foreground transition-colors group-hover:text-accent-foreground/80"
      >
        {{ previous.description }}
      </span>
    </a>

    <div
      v-else
      class="hidden sm:block"
      aria-hidden="true"
    />

    <a
      v-if="next"
      :href="next.href"
      :aria-label="`${nextLabel}: ${next.title}`"
      data-slot="docs-pager-next"
      class="group rounded-xl border bg-card p-4 text-right text-card-foreground transition-colors hover:bg-accent hover:text-accent-foreground"
    >
      <span class="flex items-center justify-end gap-2 text-xs font-medium text-muted-foreground transition-colors group-hover:text-accent-foreground/80">
        {{ nextLabel }}
        <ArrowRight
          class="size-3.5"
          aria-hidden="true"
        />
      </span>
      <span class="mt-2 block truncate font-medium">
        {{ next.title }}
      </span>
      <span
        v-if="next.description"
        class="mt-1 line-clamp-2 block text-sm text-muted-foreground transition-colors group-hover:text-accent-foreground/80"
      >
        {{ next.description }}
      </span>
    </a>
  </nav>
</template>
