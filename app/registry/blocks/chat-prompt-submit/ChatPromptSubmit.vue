<script setup lang="ts">
import { computed, type HTMLAttributes } from "vue";
import { ArrowUp, RotateCcw, Square } from "@lucide/vue";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

export interface ChatPromptSubmitProps {
  /** Current chat status */
  status?: "ready" | "streaming" | "submitted" | "error";
  /** Disable the button */
  disabled?: boolean;
  /** Accessible label for the icon-only button */
  ariaLabel?: string;
  /** Additional CSS classes */
  class?: HTMLAttributes["class"];
}

const props = withDefaults(defineProps<ChatPromptSubmitProps>(), {
  status: "ready",
});

const emit = defineEmits<{
  stop: [];
  reload: [];
}>();

const icon = computed(() => {
  if (props.status === "error") return RotateCcw;
  if (props.status === "streaming" || props.status === "submitted") return Square;
  return ArrowUp;
});

const isSubmit = computed(() => props.status === "ready");

const label = computed(() => {
  if (props.ariaLabel) return props.ariaLabel;
  if (props.status === "error") return "Retry message";
  if (props.status === "streaming" || props.status === "submitted") return "Stop response";
  return "Submit message";
});

function onClick() {
  if (props.status === "error") {
    emit("reload");
  }
  else if (props.status === "streaming" || props.status === "submitted") {
    emit("stop");
  }
}
</script>

<template>
  <Button
    data-slot="chat-prompt-submit"
    :type="isSubmit ? 'submit' : 'button'"
    variant="default"
    size="icon-sm"
    :disabled="disabled"
    :aria-label="label"
    :class="cn('size-7 rounded-md', props.class)"
    @click="!isSubmit && onClick()"
  >
    <component
      :is="icon"
      class="size-4"
    />
  </Button>
</template>
