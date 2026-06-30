<script setup lang="ts">
import type { HTMLAttributes } from "vue";
import { cn } from "@/lib/utils";

const props = withDefaults(defineProps<{
  orientation?: "vertical" | "horizontal" | "responsive";
  class?: HTMLAttributes["class"];
}>(), {
  orientation: "vertical",
});

defineOptions({
  name: "StackhackerField",
});
</script>

<template>
  <div
    data-slot="field"
    :data-orientation="orientation"
    :class="cn(
      'grid gap-2 data-[orientation=horizontal]:grid-cols-[auto_1fr] data-[orientation=horizontal]:items-center data-[orientation=responsive]:gap-3 @md/field-group:data-[orientation=responsive]:grid-cols-[auto_1fr] @md/field-group:data-[orientation=responsive]:items-center',
      props.class,
    )"
    role="group"
  >
    <slot />
  </div>
</template>
