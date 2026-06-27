<script setup lang="ts">
import type { HTMLAttributes } from "vue";
import { computed } from "vue";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "@/components/ui/tabs";
import { cn } from "@/lib/utils";

export interface FaqTabsItem {
  /** Stable id for the accordion item. */
  value: string;
  /** Visible question text. */
  question: string;
  /** Plain text answer for simple one-paragraph FAQs. */
  answer?: string;
  /** Plain text answer paragraphs when paragraph boundaries matter. */
  answers?: string[];
}

export interface FaqTabsCategory {
  /** Stable id for the tab value. */
  value: string;
  /** Visible tab label. */
  label: string;
  /** FAQ items supplied by the consuming app. */
  items?: FaqTabsItem[];
}

export interface FaqTabsProps {
  /** Optional section title. */
  title?: string;
  /** Optional supporting section copy. */
  description?: string;
  /** Categorized FAQ data supplied by the consuming app. */
  categories?: FaqTabsCategory[] | null;
  /** Initial selected category. Falls back to the first category with items. */
  defaultCategoryValue?: string;
  /** Accordion expansion behavior for each category. */
  type?: "single" | "multiple";
  /** Allows the open item to close when type is single. */
  collapsible?: boolean;
  /** Additional CSS classes for the section. */
  class?: HTMLAttributes["class"];
}

const props = withDefaults(defineProps<FaqTabsProps>(), {
  categories: () => [],
  type: "multiple",
  collapsible: false,
});

const categoriesWithItems = computed(() => {
  return (props.categories ?? []).filter(category => (category.items?.length ?? 0) > 0);
});

const defaultCategory = computed(() => {
  if (props.defaultCategoryValue && categoriesWithItems.value.some(category => category.value === props.defaultCategoryValue)) {
    return props.defaultCategoryValue;
  }

  return categoriesWithItems.value[0]?.value;
});

const hasHeader = computed(() => Boolean(props.title || props.description));
const hasContent = computed(() => hasHeader.value || categoriesWithItems.value.length > 0);

function itemAnswers(item: FaqTabsItem) {
  if (item.answers?.length) return item.answers;
  if (item.answer) return [item.answer];
  return [];
}
</script>

<template>
  <section
    v-if="hasContent"
    data-slot="faq-tabs"
    :class="cn('py-12 md:py-16', props.class)"
  >
    <div class="mx-auto w-full max-w-4xl px-4 sm:px-6 lg:px-8">
      <div
        v-if="hasHeader"
        data-slot="faq-tabs-header"
        class="max-w-2xl"
      >
        <h2
          v-if="title"
          data-slot="faq-tabs-title"
          class="text-balance text-3xl font-semibold tracking-tight sm:text-4xl"
        >
          {{ title }}
        </h2>
        <p
          v-if="description"
          data-slot="faq-tabs-description"
          class="mt-4 text-pretty text-base/7 text-muted-foreground"
        >
          {{ description }}
        </p>
      </div>

      <Tabs
        v-if="defaultCategory"
        :default-value="defaultCategory"
        :class="cn(hasHeader && 'mt-8')"
      >
        <TabsList class="flex h-auto flex-wrap justify-start gap-2 bg-transparent p-0">
          <TabsTrigger
            v-for="category in categoriesWithItems"
            :key="category.value"
            :value="category.value"
            class="data-[state=active]:bg-muted hover:bg-muted/60 h-auto rounded-lg border px-3 py-2 text-sm text-muted-foreground shadow-none data-[state=active]:text-foreground data-[state=active]:shadow-none"
          >
            {{ category.label }}
          </TabsTrigger>
        </TabsList>

        <TabsContent
          v-for="(category, categoryIndex) in categoriesWithItems"
          :key="category.value"
          :value="category.value"
          class="mt-5"
        >
          <Accordion
            :type="type"
            :collapsible="type === 'single' ? collapsible : undefined"
            class="space-y-3"
          >
            <AccordionItem
              v-for="(item, itemIndex) in category.items"
              :key="item.value"
              :value="item.value"
              class="rounded-2xl border bg-card/70 px-4"
            >
              <AccordionTrigger class="py-4 text-base hover:no-underline">
                {{ item.question }}
              </AccordionTrigger>
              <AccordionContent class="text-sm/6 text-muted-foreground">
                <slot
                  v-if="$slots.answer"
                  name="answer"
                  :category="category"
                  :item="item"
                  :category-index="categoryIndex"
                  :item-index="itemIndex"
                />
                <div
                  v-else
                  class="space-y-3"
                >
                  <p
                    v-for="answer in itemAnswers(item)"
                    :key="answer"
                  >
                    {{ answer }}
                  </p>
                </div>
              </AccordionContent>
            </AccordionItem>
          </Accordion>
        </TabsContent>
      </Tabs>
    </div>
  </section>
</template>
