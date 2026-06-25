<script setup lang="ts">
import { ReasoningDisclosure } from "~/registry/blocks/reasoning-disclosure";

const completedReasoning = `# Plan
Compare the user's request with the current chat state.
**Then** choose the smallest UI boundary that can be installed as source code.`;

const streamingReasoning = `Reading the latest message...
Checking available tools and context...
Drafting a concise response.`;
</script>

<template>
  <div class="flex w-full max-w-xl flex-col gap-4">
    <ReasoningDisclosure :text="completedReasoning" />
    <ReasoningDisclosure
      :text="streamingReasoning"
      is-streaming
    />
  </div>
</template>
