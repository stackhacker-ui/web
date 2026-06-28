<script setup lang="ts">
import type { HTMLAttributes } from "vue";
import { Check, ChevronDown, Search } from "@lucide/vue";
import { computed, nextTick, ref, watch } from "vue";
import { cn } from "@/lib/utils";

export interface ModelPickerModel {
  /** Stable model value controlled by the consuming app. */
  value: string;
  /** Visible model label. */
  label: string;
  /** Optional supporting copy. */
  description?: string;
  /** Optional provider label supplied by the consuming app. */
  provider?: string;
  /** Prevent this option from being selected. */
  disabled?: boolean;
}

export interface ModelPickerProps {
  /** Controlled selected model value. */
  modelValue?: string;
  /** Models supplied by the consuming app. */
  models?: ModelPickerModel[] | null;
  /** Trigger placeholder when selected value is unknown. */
  placeholder?: string;
  /** Search input placeholder. */
  searchPlaceholder?: string;
  /** Empty state text. */
  emptyLabel?: string;
  /** Disable the picker. */
  disabled?: boolean;
  /** Align the menu against the trigger. */
  align?: "start" | "end";
  /** Additional CSS classes for the root element. */
  class?: HTMLAttributes["class"];
}

const props = withDefaults(defineProps<ModelPickerProps>(), {
  models: () => [],
  placeholder: "Select model",
  searchPlaceholder: "Search models...",
  emptyLabel: "No models found.",
  disabled: false,
  align: "start",
});

const emit = defineEmits<{
  "update:modelValue": [value: string];
}>();

const open = ref(false);
const query = ref("");
const searchRef = ref<HTMLInputElement>();

const modelItems = computed(() => props.models ?? []);
const selectedModel = computed(() => modelItems.value.find(model => model.value === props.modelValue));
const filteredModels = computed(() => {
  const value = query.value.trim().toLowerCase();
  if (!value) return modelItems.value;

  return modelItems.value.filter((model) => {
    return [model.label, model.description, model.provider]
      .filter(Boolean)
      .join(" ")
      .toLowerCase()
      .includes(value);
  });
});

function selectModel(model: ModelPickerModel) {
  if (model.disabled) return;

  emit("update:modelValue", model.value);
  open.value = false;
}

watch(open, async (value) => {
  if (value) {
    await nextTick();
    searchRef.value?.focus();
  }
  else {
    query.value = "";
  }
});
</script>

<template>
  <div
    data-slot="model-picker"
    :class="cn('relative inline-block text-left', props.class)"
  >
    <button
      type="button"
      data-slot="model-picker-trigger"
      class="inline-flex h-9 min-w-44 items-center justify-between gap-3 rounded-md border bg-background px-3 text-sm font-medium shadow-xs transition-colors hover:bg-accent hover:text-accent-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50"
      :aria-expanded="open"
      aria-haspopup="listbox"
      :disabled="disabled"
      @click="open = !open"
    >
      <span class="flex min-w-0 items-center gap-2">
        <slot
          name="icon"
          :model="selectedModel"
        />
        <slot
          name="selected"
          :model="selectedModel"
        >
          <span class="truncate">{{ selectedModel?.label ?? placeholder }}</span>
        </slot>
      </span>
      <ChevronDown
        class="size-4 shrink-0 opacity-60"
        aria-hidden="true"
      />
    </button>

    <div
      v-if="open"
      data-slot="model-picker-content"
      :class="cn(
        'absolute z-50 mt-2 w-72 overflow-hidden rounded-xl border bg-popover text-popover-foreground shadow-xl',
        align === 'end' ? 'right-0' : 'left-0',
      )"
    >
      <div class="flex items-center gap-2 border-b px-3 py-2">
        <Search
          class="size-4 text-muted-foreground"
          aria-hidden="true"
        />
        <input
          ref="searchRef"
          v-model="query"
          type="search"
          :placeholder="searchPlaceholder"
          class="h-8 flex-1 bg-transparent text-sm outline-none placeholder:text-muted-foreground"
        >
      </div>

      <div
        v-if="filteredModels.length"
        data-slot="model-picker-list"
        class="max-h-72 overflow-y-auto p-1"
        role="listbox"
      >
        <button
          v-for="model in filteredModels"
          :key="model.value"
          type="button"
          data-slot="model-picker-option"
          role="option"
          :aria-selected="model.value === modelValue"
          :disabled="model.disabled"
          class="flex w-full items-start gap-3 rounded-lg px-3 py-2 text-left text-sm transition-colors hover:bg-accent hover:text-accent-foreground focus-visible:bg-accent focus-visible:text-accent-foreground focus-visible:outline-none disabled:pointer-events-none disabled:opacity-50"
          @click="selectModel(model)"
        >
          <slot
            name="icon"
            :model="model"
          />
          <slot
            name="option"
            :model="model"
            :selected="model.value === modelValue"
          >
            <span class="min-w-0 flex-1">
              <span class="block truncate font-medium">{{ model.label }}</span>
              <span
                v-if="model.description || model.provider"
                class="mt-0.5 block truncate text-xs text-muted-foreground"
              >{{ model.description ?? model.provider }}</span>
            </span>
            <Check
              class="mt-0.5 size-4 shrink-0"
              :class="model.value === modelValue ? 'opacity-100' : 'opacity-0'"
              aria-hidden="true"
            />
          </slot>
        </button>
      </div>

      <div
        v-else
        data-slot="model-picker-empty"
        class="p-6 text-center text-sm text-muted-foreground"
      >
        <slot
          name="empty"
          :query="query"
        >
          {{ emptyLabel }}
        </slot>
      </div>
    </div>
  </div>
</template>
