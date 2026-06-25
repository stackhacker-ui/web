<script setup lang="ts">
import type { HTMLAttributes } from "vue";
import { computed, ref, watch } from "vue";
import { ChevronDown } from "@lucide/vue";
import { Button } from "@/components/ui/button";
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "@/components/ui/collapsible";
import { cn } from "@/lib/utils";

export interface ReasoningDisclosureProps {
  /** Reasoning text supplied by the consuming app */
  text: string;
  /** Whether the model is currently streaming reasoning content */
  isStreaming?: boolean;
  /** Label shown while streaming */
  streamingLabel?: string;
  /** Label shown after streaming is complete */
  completeLabel?: string;
  /** Initial open state when not streaming */
  defaultOpen?: boolean;
  /** Additional CSS classes */
  class?: HTMLAttributes["class"];
}

const props = withDefaults(defineProps<ReasoningDisclosureProps>(), {
  isStreaming: false,
  streamingLabel: "Thinking...",
  completeLabel: "Thoughts",
  defaultOpen: false,
});

const open = ref(props.isStreaming || props.defaultOpen);

const lines = computed(() => cleanMarkdown(props.text).split("\n").filter(Boolean));

watch(() => props.isStreaming, (isStreaming) => {
  if (isStreaming) {
    open.value = true;
  }
}, { immediate: true });

function cleanMarkdown(text: string): string {
  return text
    .replace(/\*\*(.+?)\*\*/g, "$1")
    .replace(/\*(.+?)\*/g, "$1")
    .replace(/`(.+?)`/g, "$1")
    .replace(/^#+\s+/gm, "");
}
</script>

<template>
  <Collapsible
    v-model:open="open"
    data-slot="reasoning-disclosure"
    :class="cn('relative min-w-0 w-full text-pretty *:first:mt-0 *:last:mb-0', props.class)"
  >
    <CollapsibleTrigger as-child>
      <Button
        type="button"
        class="group p-0! text-muted-foreground"
        variant="link"
      >
        {{ isStreaming ? streamingLabel : completeLabel }}
        <ChevronDown
          v-if="text.length > 0"
          class="size-4 transition-transform duration-200 group-data-[state=open]:rotate-180"
          aria-hidden="true"
        />
      </Button>
    </CollapsibleTrigger>

    <CollapsibleContent>
      <div
        v-for="(line, index) in lines"
        :key="index"
      >
        <span class="whitespace-pre-wrap text-sm font-normal text-muted-foreground">{{ line }}</span>
      </div>
    </CollapsibleContent>
  </Collapsible>
</template>
