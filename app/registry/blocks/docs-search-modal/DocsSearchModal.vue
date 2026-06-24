<script setup lang="ts">
import type { HTMLAttributes } from "vue";
import { computed, nextTick, onBeforeUnmount, onMounted, ref, watch } from "vue";
import { Search } from "@lucide/vue";
import { cn } from "@/lib/utils";

export interface DocsSearchItem {
  title: string;
  href: string;
  description?: string;
  section?: string;
  content?: string;
}

export interface DocsSearchModalProps {
  /** Searchable items supplied by the consuming app */
  items?: DocsSearchItem[];
  /** Search input placeholder */
  placeholder?: string;
  /** Label used for the dialog and search input */
  searchLabel?: string;
  /** Text shown when no query is entered and no items are available */
  emptyText?: string;
  /** Text shown when a query has no matches */
  noResultsText?: string;
  /** Enable Cmd/Ctrl+K keyboard shortcut */
  shortcut?: boolean;
  /** Additional CSS classes for the modal panel */
  class?: HTMLAttributes["class"];
}

const props = withDefaults(defineProps<DocsSearchModalProps>(), {
  items: () => [],
  placeholder: "Search documentation...",
  searchLabel: "Search documentation",
  emptyText: "No pages available.",
  noResultsText: "No results found.",
  shortcut: true,
});

const open = defineModel<boolean>("open", { default: false });
const query = ref("");
const inputRef = ref<HTMLInputElement>();
const panelRef = ref<HTMLElement>();

const trimmedQuery = computed(() => query.value.trim().toLowerCase());

const results = computed(() => {
  if (!trimmedQuery.value) return props.items;

  return props.items.filter((item) => {
    const haystack = [
      item.title,
      item.description,
      item.section,
      item.content,
    ].filter(Boolean).join(" ").toLowerCase();

    return haystack.includes(trimmedQuery.value);
  });
});

function closeSearch() {
  open.value = false;
  query.value = "";
}

function onKeydown(event: KeyboardEvent) {
  if (props.shortcut && (event.metaKey || event.ctrlKey) && event.key.toLowerCase() === "k") {
    event.preventDefault();
    open.value = true;
  }

  if (event.key === "Escape" && open.value) {
    closeSearch();
  }
}

function onDialogKeydown(event: KeyboardEvent) {
  if (event.key !== "Tab") return;

  const focusable = panelRef.value?.querySelectorAll<HTMLElement>(
    "a[href], button:not([disabled]), input:not([disabled]), textarea:not([disabled]), select:not([disabled]), [tabindex]:not([tabindex='-1'])",
  );
  if (!focusable?.length) return;

  const first = focusable[0];
  const last = focusable[focusable.length - 1];
  if (!first || !last) return;

  if (event.shiftKey && document.activeElement === first) {
    event.preventDefault();
    last.focus();
  }
  else if (!event.shiftKey && document.activeElement === last) {
    event.preventDefault();
    first.focus();
  }
}

onMounted(() => {
  window.addEventListener("keydown", onKeydown);
});

onBeforeUnmount(() => {
  window.removeEventListener("keydown", onKeydown);
});

watch(open, async (value) => {
  if (value) {
    await nextTick();
    inputRef.value?.focus();
  }
  else {
    query.value = "";
  }
});
</script>

<template>
  <Teleport to="body">
    <div
      v-if="open"
      class="fixed inset-0 z-50"
      role="dialog"
      aria-modal="true"
      :aria-label="searchLabel"
      data-slot="docs-search-modal"
      @keydown="onDialogKeydown"
    >
      <button
        class="absolute inset-0 bg-background/80 backdrop-blur-sm"
        type="button"
        aria-label="Close search"
        @click="closeSearch"
      />

      <div
        ref="panelRef"
        :class="cn('relative mx-auto mt-20 w-[calc(100%-2rem)] max-w-2xl overflow-hidden rounded-xl border bg-popover text-popover-foreground shadow-xl', props.class)"
      >
        <div class="flex items-center gap-3 border-b px-4 py-3">
          <Search
            class="size-4.5 text-muted-foreground"
            aria-hidden="true"
          />
          <input
            ref="inputRef"
            v-model="query"
            type="search"
            :aria-label="searchLabel"
            :placeholder="placeholder"
            class="h-10 flex-1 bg-transparent text-sm outline-none placeholder:text-muted-foreground"
          >
          <kbd class="hidden h-6 select-none items-center rounded border bg-muted px-2 font-mono text-xs text-muted-foreground sm:inline-flex">Esc</kbd>
        </div>

        <div class="max-h-[min(28rem,calc(100vh-10rem))] overflow-y-auto p-2">
          <a
            v-for="item in results"
            :key="item.href"
            :href="item.href"
            class="block rounded-lg p-3 hover:bg-accent hover:text-accent-foreground"
            @click="closeSearch"
          >
            <slot
              name="item"
              :item="item"
              :query="query"
            >
              <div class="flex items-center justify-between gap-3">
                <p class="font-medium">
                  {{ item.title }}
                </p>
                <span
                  v-if="item.section"
                  class="text-xs text-muted-foreground"
                >{{ item.section }}</span>
              </div>
              <p
                v-if="item.description"
                class="mt-1 line-clamp-2 text-sm text-muted-foreground"
              >
                {{ item.description }}
              </p>
            </slot>
          </a>

          <p
            v-if="!results.length"
            class="px-3 py-8 text-center text-sm text-muted-foreground"
          >
            {{ trimmedQuery ? noResultsText : emptyText }}
          </p>
        </div>
      </div>
    </div>
  </Teleport>
</template>
