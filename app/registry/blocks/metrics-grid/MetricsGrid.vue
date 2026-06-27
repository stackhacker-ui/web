<script setup lang="ts">
import type { HTMLAttributes } from "vue";
import { computed } from "vue";
import { cn } from "@/lib/utils";

export interface MetricsGridItem {
  /** Stable metric id. Falls back to label and index when omitted. */
  id?: string;
  /** App-formatted display value */
  value: string;
  /** Metric label supplied by the consuming app */
  label: string;
  /** Optional supporting metric copy */
  description?: string;
  /** Constrained visual tone for the metric accent */
  tone?: "default" | "primary" | "success" | "warning" | "muted";
}

export interface MetricsGridProps {
  /** Optional eyebrow shown above the title */
  headline?: string;
  /** Optional section title */
  title?: string;
  /** Optional supporting section copy */
  description?: string;
  /** Metrics supplied by the consuming app */
  items?: MetricsGridItem[] | null;
  /** Maximum column count on large screens */
  columns?: 2 | 3 | 4;
  /** Visual treatment for each metric */
  variant?: "default" | "cards";
  /** Additional CSS classes for the section */
  class?: HTMLAttributes["class"];
}

const props = withDefaults(defineProps<MetricsGridProps>(), {
  items: () => [],
  columns: 4,
  variant: "default",
});

const metricItems = computed(() => props.items ?? []);
const hasContent = computed(() => Boolean(props.headline || props.title || props.description || metricItems.value.length));

function itemKey(item: MetricsGridItem, index: number) {
  return item.id ?? `${item.label}-${index}`;
}

function gridColumnsClass() {
  if (props.columns === 2) return "sm:grid-cols-2";
  if (props.columns === 3) return "sm:grid-cols-2 lg:grid-cols-3";
  return "sm:grid-cols-2 lg:grid-cols-4";
}

function toneClass(tone: MetricsGridItem["tone"]) {
  if (tone === "primary") return "text-primary before:bg-primary";
  if (tone === "success") return "text-emerald-600 before:bg-emerald-500 dark:text-emerald-400";
  if (tone === "warning") return "text-amber-600 before:bg-amber-500 dark:text-amber-400";
  if (tone === "muted") return "text-muted-foreground before:bg-muted-foreground/40";
  return "text-foreground before:bg-border";
}
</script>

<template>
  <section
    v-if="hasContent"
    data-slot="metrics-grid"
    :class="cn('py-12 md:py-16', props.class)"
  >
    <div class="mx-auto w-full max-w-7xl px-4 sm:px-6 lg:px-8">
      <div
        v-if="headline || title || description"
        data-slot="metrics-grid-header"
        class="mx-auto max-w-3xl text-center"
      >
        <p
          v-if="headline"
          class="text-sm font-medium text-primary"
        >
          {{ headline }}
        </p>
        <h2
          v-if="title"
          class="mt-3 text-balance text-3xl font-semibold tracking-tight sm:text-4xl"
        >
          {{ title }}
        </h2>
        <p
          v-if="description"
          class="mt-4 text-pretty text-base leading-7 text-muted-foreground"
        >
          {{ description }}
        </p>
      </div>

      <dl
        v-if="metricItems.length"
        data-slot="metrics-grid-list"
        :class="cn(
          'grid gap-4',
          headline || title || description ? 'mt-10' : '',
          gridColumnsClass(),
        )"
      >
        <div
          v-for="(item, index) in metricItems"
          :key="itemKey(item, index)"
          data-slot="metrics-grid-item"
          :class="cn(
            'relative min-w-0 overflow-hidden rounded-2xl border bg-card p-6 text-card-foreground',
            variant === 'cards' ? 'shadow-sm' : 'bg-card/60',
          )"
        >
          <dt class="text-sm leading-6 text-muted-foreground">
            {{ item.label }}
          </dt>
          <dd class="mt-3 min-w-0">
            <p
              :class="cn(
                'relative break-words ps-4 text-3xl font-semibold tracking-tight before:absolute before:left-0 before:top-1 before:h-8 before:w-1 before:rounded-full sm:text-4xl',
                toneClass(item.tone),
              )"
            >
              {{ item.value }}
            </p>
            <p
              v-if="item.description"
              class="mt-3 text-sm leading-6 text-muted-foreground"
            >
              {{ item.description }}
            </p>
          </dd>
        </div>
      </dl>
    </div>
  </section>
</template>
