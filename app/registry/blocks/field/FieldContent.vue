<script setup lang="ts">
import type { HTMLAttributes } from "vue";
import { cn } from "@/lib/utils";

const props = defineProps<{ class?: HTMLAttributes["class"] }>();
</script>

<template>
  <div
    data-slot="field-content"
    :class="cn('grid gap-1.5 leading-none', props.class)"
  >
    <slot />
  </div>
</template>
