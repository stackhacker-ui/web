<script setup lang="ts">
import type { HTMLAttributes } from "vue";
import { computed } from "vue";
import { cn } from "@/lib/utils";

export interface WorkExperienceItem {
  /** Stable id for rendering. Falls back to role, organization, and index. */
  id?: string;
  /** App-formatted date or date range. */
  dateLabel: string;
  /** Role, title, or short position label. */
  role: string;
  /** Organization or team name. */
  organization: string;
  /** Optional organization URL. */
  href?: string;
  /** Anchor target used when href is supplied. */
  target?: HTMLAnchorElement["target"];
  /** Anchor rel used when href is supplied. */
  rel?: string;
  /** Optional supporting detail for the role. */
  description?: string;
}

export interface WorkExperienceProps {
  /** Optional section title. */
  title?: string;
  /** Optional supporting section copy. */
  description?: string;
  /** Work-history items supplied by the consuming app. */
  items?: WorkExperienceItem[] | null;
  /** Additional CSS classes for the section. */
  class?: HTMLAttributes["class"];
}

const props = withDefaults(defineProps<WorkExperienceProps>(), {
  items: () => [],
});

const experienceItems = computed(() => props.items ?? []);
const hasHeader = computed(() => Boolean(props.title || props.description));
const hasContent = computed(() => hasHeader.value || experienceItems.value.length > 0);

function itemKey(item: WorkExperienceItem, index: number) {
  return item.id ?? `${item.dateLabel}-${item.role}-${item.organization}-${index}`;
}

function linkRel(item: WorkExperienceItem) {
  if (item.rel) return item.rel;
  if (item.target === "_blank") return "noopener noreferrer";
  return undefined;
}
</script>

<template>
  <section
    v-if="hasContent"
    data-slot="work-experience"
    :class="cn('py-12 md:py-16', props.class)"
  >
    <div class="mx-auto w-full max-w-3xl px-4 sm:px-6 lg:px-8">
      <div
        v-if="hasHeader"
        data-slot="work-experience-header"
      >
        <h2
          v-if="title"
          data-slot="work-experience-title"
          class="text-balance text-3xl font-semibold tracking-tight sm:text-4xl"
        >
          {{ title }}
        </h2>
        <p
          v-if="description"
          data-slot="work-experience-description"
          class="mt-4 text-pretty text-base/7 text-muted-foreground"
        >
          {{ description }}
        </p>
      </div>

      <div
        v-if="experienceItems.length"
        data-slot="work-experience-items"
        :class="cn('mt-8 grid gap-4', !hasHeader && 'mt-0')"
      >
        <article
          v-for="(item, index) in experienceItems"
          :key="itemKey(item, index)"
          data-slot="work-experience-item"
          class="grid gap-3 rounded-2xl border bg-card/70 p-5 text-card-foreground shadow-sm sm:grid-cols-[8rem_minmax(0,1fr)] sm:gap-6 sm:p-6"
        >
          <time
            data-slot="work-experience-date"
            class="font-mono text-xs/6 text-muted-foreground sm:pt-1"
          >
            {{ item.dateLabel }}
          </time>

          <div class="min-w-0">
            <div class="flex flex-col gap-3 sm:flex-row sm:items-start sm:justify-between">
              <div class="min-w-0">
                <h3
                  data-slot="work-experience-role"
                  class="text-base font-semibold tracking-tight"
                >
                  {{ item.role }}
                </h3>
                <component
                  :is="item.href ? 'a' : 'p'"
                  data-slot="work-experience-organization"
                  :href="item.href"
                  :target="item.href ? item.target : undefined"
                  :rel="item.href ? linkRel(item) : undefined"
                  :class="cn(
                    'mt-1 inline-flex max-w-full items-center gap-2 text-sm text-muted-foreground',
                    item.href && 'rounded-sm underline-offset-4 hover:text-foreground hover:underline focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2',
                  )"
                >
                  <span class="truncate">{{ item.organization }}</span>
                  <slot
                    name="organization"
                    :item="item"
                    :index="index"
                  />
                </component>
              </div>
            </div>

            <p
              v-if="item.description"
              data-slot="work-experience-item-description"
              class="mt-3 text-sm/6 text-muted-foreground"
            >
              {{ item.description }}
            </p>
          </div>
        </article>
      </div>
    </div>
  </section>
</template>
