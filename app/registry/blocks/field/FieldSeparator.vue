<script setup lang="ts">
import type { HTMLAttributes } from "vue";
import { cn } from "@/lib/utils";

const props = defineProps<{ class?: HTMLAttributes["class"] }>();
</script>

<template>
  <div
    data-slot="field-separator"
    :class="cn('bg-border h-px w-full', props.class)"
  >
    <slot />
  </div>
</template>
