<script setup lang="ts">
import type { SelectSeparatorProps } from "reka-ui";
import type { HTMLAttributes } from "vue";
import { SelectSeparator } from "reka-ui";
import { cn } from "@/lib/utils";

const props = defineProps<SelectSeparatorProps & { class?: HTMLAttributes["class"] }>();
</script>

<template>
  <SelectSeparator
    data-slot="select-separator"
    v-bind="props"
    :class="cn('bg-border pointer-events-none -mx-1 my-1 h-px', props.class)"
  />
</template>
