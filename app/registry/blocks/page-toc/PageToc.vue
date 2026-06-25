<script setup lang="ts">
import type { HTMLAttributes } from "vue";
import { computed, nextTick, onBeforeUnmount, onMounted, ref, watch } from "vue";
import { cn } from "@/lib/utils";

export interface PageTocItem {
  id: string;
  title: string;
  href?: string;
  depth?: number;
}

export interface PageTocProps {
  /** Heading links supplied by the consuming app */
  items?: PageTocItem[];
  /** Label rendered above the links. Use an empty string to hide it. */
  title?: string;
  /** Observe matching page headings and highlight the active item. */
  trackActive?: boolean;
  /** Controlled active heading id. Disables internal active tracking when supplied. */
  activeId?: string;
  /** Additional CSS classes for the root nav */
  class?: HTMLAttributes["class"];
}

const props = withDefaults(defineProps<PageTocProps>(), {
  items: () => [],
  title: "On this page",
  trackActive: true,
});

const internalActiveId = ref("");
const isMounted = ref(false);
let observer: IntersectionObserver | undefined;
let observerSetupId = 0;

const activeItemId = computed(() => props.activeId ?? internalActiveId.value);

const links = computed(() => props.items.map(item => ({
  ...item,
  href: item.href ?? `#${item.id}`,
  depth: item.depth ?? 2,
})));

function getIndentStyle(depth: number) {
  return {
    paddingInlineStart: `${Math.max(depth - 2, 0) * 1}rem`,
  };
}

function disconnectObserver() {
  observer?.disconnect();
  observer = undefined;
}

async function setupObserver() {
  const setupId = ++observerSetupId;
  disconnectObserver();

  if (!props.trackActive || props.activeId !== undefined) {
    internalActiveId.value = "";
  }

  if (!isMounted.value || !props.trackActive || props.activeId !== undefined || typeof IntersectionObserver === "undefined") return;

  await nextTick();

  if (!isMounted.value || setupId !== observerSetupId) return;

  const elements = links.value
    .map(item => document.getElementById(item.id))
    .filter((element): element is HTMLElement => Boolean(element));

  if (!elements.length) return;

  observer = new IntersectionObserver((entries) => {
    for (const entry of entries) {
      if (entry.isIntersecting) {
        internalActiveId.value = entry.target.id;
      }
    }
  }, { rootMargin: "0% 0% -80% 0%" });

  for (const element of elements) {
    observer.observe(element);
  }
}

onMounted(() => {
  isMounted.value = true;
  setupObserver();
});

onBeforeUnmount(() => {
  isMounted.value = false;
  observerSetupId++;
  disconnectObserver();
});

watch(() => [props.items, props.trackActive, props.activeId] as const, () => {
  setupObserver();
}, { deep: true });
</script>

<template>
  <nav
    v-if="links.length"
    data-slot="page-toc"
    :class="cn('flex flex-col gap-2 text-sm', props.class)"
    aria-label="Table of contents"
  >
    <p
      v-if="title"
      class="text-xs font-medium text-muted-foreground"
    >
      {{ title }}
    </p>

    <a
      v-for="item in links"
      :key="item.id"
      :data-active="item.id === activeItemId"
      :data-depth="item.depth"
      :href="item.href"
      :style="getIndentStyle(item.depth)"
      class="text-muted-foreground text-[0.8rem] leading-6 no-underline transition-colors hover:text-foreground data-[active=true]:font-medium data-[active=true]:text-foreground"
    >
      {{ item.title }}
    </a>
  </nav>
</template>
