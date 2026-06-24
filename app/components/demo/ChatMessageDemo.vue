<script setup lang="ts">
import { Copy, RotateCcw } from "@lucide/vue";
import { ChatMessage } from "~/registry/blocks/chat-message";

const assistantActions = [
  { label: "Copy message", icon: Copy },
  { label: "Retry message", icon: RotateCcw },
];
</script>

<template>
  <div class="flex w-full max-w-xl flex-col gap-4">
    <ChatMessage
      id="1"
      role="assistant"
      :parts="[{ type: 'text', text: 'Hello! How can I help you today?' }]"
      side="left"
      :actions="assistantActions"
    />
    <ChatMessage
      id="2"
      role="user"
      :parts="[{ type: 'text', text: 'Can you explain what Vue composables are?' }]"
      side="right"
    />
  </div>
</template>
