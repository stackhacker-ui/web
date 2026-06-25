<script setup lang="ts">
import { PageToc, type PageTocItem } from "~/registry/blocks/page-toc";

const activeId = ref("installation");

const items: PageTocItem[] = [
  {
    id: "overview",
    title: "Overview",
    depth: 2,
  },
  {
    id: "installation",
    title: "Installation",
    depth: 2,
  },
  {
    id: "usage",
    title: "Usage",
    depth: 2,
  },
  {
    id: "nuxt-content-adapter",
    title: "Nuxt Content adapter",
    depth: 3,
  },
  {
    id: "api-reference",
    title: "API reference",
    depth: 2,
  },
];
</script>

<template>
  <div class="grid w-full gap-6 rounded-xl border bg-card/40 p-4 md:grid-cols-[14rem_1fr]">
    <PageToc
      :active-id="activeId"
      :items="items"
      :track-active="false"
      class="rounded-lg border bg-background p-4 md:sticky md:top-4 md:self-start"
    />

    <div class="space-y-4 text-sm">
      <div class="space-y-2">
        <p class="text-xs font-medium uppercase tracking-wide text-muted-foreground">
          Preview state
        </p>
        <div class="flex flex-wrap gap-2">
          <button
            v-for="item in items"
            :key="item.id"
            type="button"
            class="rounded-full border px-3 py-1 text-xs transition-colors hover:bg-accent hover:text-accent-foreground"
            :class="item.id === activeId ? 'bg-primary text-primary-foreground hover:bg-primary hover:text-primary-foreground' : 'bg-background text-muted-foreground'"
            @click="activeId = item.id"
          >
            {{ item.title }}
          </button>
        </div>
      </div>

      <div class="rounded-lg border bg-background p-5">
        <h3 class="font-semibold">
          Documentation article
        </h3>
        <p class="mt-2 text-muted-foreground">
          Supply already-discovered headings from your app, then let PageToc render the aside and active-link treatment.
        </p>
        <div class="mt-4 grid gap-3 sm:grid-cols-2">
          <div class="rounded-md bg-muted/60 p-3">
            <p class="font-medium">
              App owns
            </p>
            <p class="mt-1 text-muted-foreground">
              Markdown parsing, route paths, and page layout.
            </p>
          </div>
          <div class="rounded-md bg-muted/60 p-3">
            <p class="font-medium">
              Component owns
            </p>
            <p class="mt-1 text-muted-foreground">
              Link list rendering, indentation, and active state display.
            </p>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
