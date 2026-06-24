<script setup lang="ts">
import { Copy, RotateCcw } from "@lucide/vue";
import { ChatMessages } from "~/registry/blocks/chat-messages";

const assistantActions = [
  { label: "Copy message", icon: Copy },
  { label: "Retry message", icon: RotateCcw },
];

const messages = ref([
  {
    id: "1",
    role: "user" as const,
    parts: [{ type: "text" as const, text: "What is Nuxt?" }],
    createdAt: new Date(),
  },
  {
    id: "2",
    role: "assistant" as const,
    parts: [{ type: "text" as const, text: "Nuxt is a Vue.js framework that provides server-side rendering, file-based routing, and a powerful module ecosystem for building modern web applications." }],
    createdAt: new Date(),
  },
  {
    id: "3",
    role: "user" as const,
    parts: [{ type: "text" as const, text: "How do I get started?" }],
    createdAt: new Date(),
  },
  {
    id: "4",
    role: "assistant" as const,
    parts: [{ type: "text" as const, text: "You can create a new Nuxt project by running `npx nuxi@latest init my-app`. This will scaffold a new project with the recommended configuration." }],
    createdAt: new Date(),
  },
]);
</script>

<template>
  <div class="w-full max-w-xl">
    <ChatMessages
      :messages="messages"
      status="ready"
      :assistant="{ actions: assistantActions }"
    />
  </div>
</template>
