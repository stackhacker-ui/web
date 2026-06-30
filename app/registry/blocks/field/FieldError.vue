<script setup lang="ts">
import type { HTMLAttributes } from "vue";
import { computed } from "vue";
import { cn } from "@/lib/utils";

export interface FieldErrorItem {
  message?: string;
}

const props = defineProps<{
  error?: string | boolean | null;
  errors?: Array<string | FieldErrorItem | undefined> | null;
  class?: HTMLAttributes["class"];
}>();

const messages = computed(() => {
  if (typeof props.error === "string") return [props.error];
  return (props.errors ?? [])
    .map(error => typeof error === "string" ? error : error?.message)
    .filter((message): message is string => Boolean(message));
});
</script>

<template>
  <div
    v-if="messages.length || $slots.default"
    data-slot="field-error"
    :class="cn('text-destructive text-sm font-medium', props.class)"
  >
    <slot>
      <p v-if="messages.length === 1">
        {{ messages[0] }}
      </p>
      <ul
        v-else
        class="list-disc ps-5"
      >
        <li
          v-for="message in messages"
          :key="message"
        >
          {{ message }}
        </li>
      </ul>
    </slot>
  </div>
</template>
