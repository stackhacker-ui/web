<script setup lang="ts">
import { DocsSearchModal, type DocsSearchItem } from "~/registry/blocks/docs-search-modal";

const open = ref(false);

const items: DocsSearchItem[] = [
  {
    title: "Introduction",
    description: "Start here to understand the docs template structure.",
    href: "/docs/components",
    section: "Getting Started",
    content: "overview installation usage documentation template",
  },
  {
    title: "Chat Messages",
    description: "Render chat message lists with scrolling behavior.",
    href: "/docs/components/chat-messages",
    section: "Chat",
    content: "chat messages auto scroll assistant actions",
  },
  {
    title: "Chat Prompt",
    description: "Build chat input flows with keyboard shortcuts.",
    href: "/docs/components/chat-prompt",
    section: "Chat",
    content: "prompt input enter shift enter submit",
  },
];
</script>

<template>
  <div class="flex w-full justify-center">
    <button
      type="button"
      class="inline-flex h-9 items-center gap-2 rounded-md border bg-background px-3 text-sm text-muted-foreground shadow-sm transition-colors hover:bg-accent hover:text-accent-foreground"
      @click="open = true"
    >
      Search docs
      <kbd class="rounded border bg-muted px-1.5 font-mono text-[10px] text-muted-foreground">Cmd K</kbd>
    </button>

    <DocsSearchModal
      v-model:open="open"
      :items="items"
      :shortcut="false"
    />
  </div>
</template>
