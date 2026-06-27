<script setup lang="ts">
import type { HTMLAttributes } from "vue";
import { computed } from "vue";
import { cn } from "@/lib/utils";

export interface ChangelogTimelineItem {
  /** Stable item id. Falls back to tag or title when omitted. */
  id?: string;
  /** Optional release tag supplied by the consuming app */
  tag?: string;
  /** Release title supplied by the consuming app */
  title: string;
  /** App-formatted display date */
  dateLabel: string;
  /** Optional machine-readable date for the time element */
  date?: string;
  /** Optional plain text fallback body */
  body?: string;
  /** Marks this item as the latest release. Defaults to the first item. */
  latest?: boolean;
}

export interface ChangelogTimelineProps {
  /** Changelog items supplied by the consuming app */
  items?: ChangelogTimelineItem[];
  /** Render loading skeletons when no items are present */
  loading?: boolean;
  /** Render an error state. A string is used as the supporting message. */
  error?: boolean | string;
  /** Label shown for the latest item */
  latestLabel?: string;
  /** Empty state title */
  emptyTitle?: string;
  /** Empty state description */
  emptyDescription?: string;
  /** Error state title */
  errorTitle?: string;
  /** Error state description used when error is true */
  errorDescription?: string;
  /** Retry button label */
  retryLabel?: string;
  /** Show retry button in the error state */
  showRetry?: boolean;
  /** Accessible label for the timeline list */
  ariaLabel?: string;
  /** Additional CSS classes for the root element */
  class?: HTMLAttributes["class"];
}

const props = withDefaults(defineProps<ChangelogTimelineProps>(), {
  items: () => [],
  loading: false,
  error: false,
  latestLabel: "Latest release",
  emptyTitle: "No releases yet",
  emptyDescription: "Published releases will appear here as changelog entries.",
  errorTitle: "Could not load releases",
  errorDescription: "Check the release source or try loading the changelog again.",
  retryLabel: "Try again",
  showRetry: false,
  ariaLabel: "Changelog timeline",
});

const emit = defineEmits<{
  retry: [];
}>();

const hasExplicitLatest = computed(() => props.items.some(item => item.latest));
const errorDescriptionText = computed(() => typeof props.error === "string" ? props.error : props.errorDescription);

function itemKey(item: ChangelogTimelineItem, index: number) {
  return item.id ?? item.tag ?? `${item.title}-${index}`;
}

function isLatest(item: ChangelogTimelineItem, index: number) {
  if (hasExplicitLatest.value) return item.latest === true;
  return index === 0;
}
</script>

<template>
  <section
    data-slot="changelog-timeline"
    :class="cn('py-12 md:py-16', props.class)"
  >
    <div
      v-if="error"
      data-slot="changelog-timeline-error"
      class="mx-auto max-w-xl rounded-xl border border-destructive/30 bg-card p-6 text-card-foreground shadow-sm"
      role="alert"
    >
      <div class="flex items-start gap-3">
        <span
          class="mt-0.5 flex size-8 shrink-0 items-center justify-center rounded-full bg-destructive/10 text-sm font-semibold text-destructive"
          aria-hidden="true"
        >!</span>
        <div class="min-w-0">
          <h2 class="text-base font-semibold tracking-tight">
            {{ errorTitle }}
          </h2>
          <p class="mt-1 text-sm leading-6 text-muted-foreground">
            {{ errorDescriptionText }}
          </p>
          <button
            v-if="showRetry"
            type="button"
            class="mt-4 inline-flex h-8 items-center justify-center rounded-md border border-input bg-background px-3 text-sm font-medium shadow-xs transition-colors hover:bg-accent hover:text-accent-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
            @click="emit('retry')"
          >
            {{ retryLabel }}
          </button>
        </div>
      </div>
    </div>

    <ol
      v-else-if="loading && !items.length"
      data-slot="changelog-timeline-loading"
      class="relative mx-auto max-w-3xl"
      aria-label="Loading releases"
      aria-busy="true"
    >
      <li
        v-for="index in 3"
        :key="index"
        class="relative grid gap-x-6 pb-16 last:pb-0 sm:grid-cols-[8rem_2rem_minmax(0,36rem)] sm:gap-x-8"
      >
        <div class="h-5 w-24 animate-pulse rounded bg-muted sm:ms-auto sm:mt-2" />
        <div class="sticky top-0 -mt-12 hidden w-8 shrink-0 justify-center self-stretch pt-12 sm:flex md:-mt-16 md:pt-16">
          <div class="absolute inset-y-0 left-1/2 w-px -translate-x-1/2 bg-border/70" />
          <div class="relative mt-2 size-3 rounded-full border border-border bg-background ring-4 ring-background" />
        </div>
        <article class="min-w-0 max-w-xl sm:col-start-3">
          <div class="h-8 w-2/3 animate-pulse rounded bg-muted" />
          <div class="mt-8 space-y-3">
            <div class="h-4 w-full animate-pulse rounded bg-muted" />
            <div class="h-4 w-5/6 animate-pulse rounded bg-muted" />
            <div class="h-4 w-2/3 animate-pulse rounded bg-muted" />
          </div>
        </article>
      </li>
    </ol>

    <div
      v-else-if="!items.length"
      data-slot="changelog-timeline-empty"
      class="mx-auto max-w-xl rounded-xl border bg-card p-6 text-card-foreground shadow-sm"
    >
      <p class="text-sm font-medium">
        {{ emptyTitle }}
      </p>
      <p class="mt-1 text-sm leading-6 text-muted-foreground">
        {{ emptyDescription }}
      </p>
    </div>

    <ol
      v-else
      data-slot="changelog-timeline-list"
      class="relative mx-auto max-w-3xl"
      :aria-label="ariaLabel"
      :aria-busy="loading || undefined"
    >
      <li
        v-for="(item, index) in items"
        :key="itemKey(item, index)"
        class="relative grid gap-x-6 pb-16 last:pb-0 sm:grid-cols-[8rem_2rem_minmax(0,36rem)] sm:gap-x-8"
      >
        <time
          data-slot="changelog-timeline-date"
          :datetime="item.date"
          class="mb-3 inline-flex w-fit items-center rounded-full border bg-muted/40 px-2.5 py-1 font-mono text-xs text-muted-foreground sm:mb-0 sm:ms-auto sm:mt-1 sm:border-0 sm:bg-transparent sm:px-0 sm:py-0 sm:text-right sm:text-xs/9 sm:text-foreground"
        >
          {{ item.dateLabel }}
        </time>

        <div class="sticky top-0 -mt-12 hidden w-8 shrink-0 justify-center self-stretch pt-12 sm:flex md:-mt-16 md:pt-16">
          <div class="absolute inset-y-0 left-1/2 w-px -translate-x-1/2 bg-border/80" />
          <div
            data-slot="changelog-timeline-marker"
            class="relative mt-2 size-3 rounded-full border bg-background ring-4 ring-background"
            :class="isLatest(item, index) ? 'border-primary bg-primary shadow-[0_0_0_3px] shadow-primary/10' : 'border-border'"
          />
        </div>

        <article
          data-slot="changelog-timeline-item"
          class="min-w-0 max-w-xl text-card-foreground sm:col-start-3"
          :aria-current="isLatest(item, index) ? 'step' : undefined"
        >
          <header class="border-b border-border pb-4">
            <div class="mb-3 flex items-center gap-2 sm:hidden">
              <span
                class="size-2.5 rounded-full border"
                :class="isLatest(item, index) ? 'border-primary bg-primary' : 'border-border bg-background'"
                aria-hidden="true"
              />
              <span
                v-if="(isLatest(item, index) && latestLabel) || item.tag"
                class="text-xs font-medium text-muted-foreground"
              >
                {{ isLatest(item, index) ? latestLabel : item.tag }}
              </span>
            </div>
            <p
              v-if="isLatest(item, index) && latestLabel"
              data-slot="changelog-timeline-latest-label"
              class="mb-2 hidden text-xs font-medium text-muted-foreground sm:block"
            >
              {{ latestLabel }}
            </p>
            <h2
              data-slot="changelog-timeline-title"
              class="text-balance text-2xl font-semibold tracking-tight sm:text-3xl"
            >
              {{ item.title }}
            </h2>
          </header>

          <div
            v-if="item.body || $slots.item"
            data-slot="changelog-timeline-body"
            class="mt-7 text-sm leading-7 text-muted-foreground"
          >
            <slot
              name="item"
              :item="item"
              :index="index"
              :latest="isLatest(item, index)"
            >
              <p
                v-if="item.body"
                class="whitespace-pre-line"
              >
                {{ item.body }}
              </p>
            </slot>
          </div>
        </article>
      </li>
    </ol>
  </section>
</template>
