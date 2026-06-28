<script setup lang="ts">
import type { HTMLAttributes } from "vue";
import { computed } from "vue";
import { cn } from "@/lib/utils";

export interface FeatureSplitFeature {
  /** Stable id for rendering. Falls back to title when omitted. */
  id?: string;
  /** Feature title supplied by the consuming app. */
  title: string;
  /** Supporting feature copy supplied by the consuming app. */
  description?: string;
}

export interface FeatureSplitSection {
  /** Stable id for rendering and optional section anchor. */
  id?: string;
  /** Section title supplied by the consuming app. */
  title: string;
  /** Supporting section copy supplied by the consuming app. */
  description?: string;
  /** Reverse text and media columns on large screens. */
  reverse?: boolean;
  /** Feature details supplied by the consuming app. */
  features?: FeatureSplitFeature[] | null;
}

export interface FeatureSplitProps {
  /** Optional group title shown above all sections. */
  title?: string;
  /** Optional group description shown above all sections. */
  description?: string;
  /** Split sections supplied by the consuming app. */
  sections?: FeatureSplitSection[] | null;
  /** Additional CSS classes for the section group. */
  class?: HTMLAttributes["class"];
}

const props = withDefaults(defineProps<FeatureSplitProps>(), {
  sections: () => [],
});

const sectionItems = computed(() => props.sections ?? []);
const hasHeader = computed(() => Boolean(props.title || props.description));
const hasContent = computed(() => hasHeader.value || sectionItems.value.length > 0);

function sectionKey(section: FeatureSplitSection, index: number) {
  return section.id ?? `${section.title}-${index}`;
}

function featureItems(section: FeatureSplitSection) {
  return section.features ?? [];
}

function featureKey(feature: FeatureSplitFeature, index: number) {
  return feature.id ?? `${feature.title}-${index}`;
}
</script>

<template>
  <section
    v-if="hasContent"
    data-slot="feature-split"
    :class="cn('py-12 md:py-16', props.class)"
  >
    <div class="mx-auto w-full max-w-7xl px-4 sm:px-6 lg:px-8">
      <div
        v-if="hasHeader"
        data-slot="feature-split-header"
        class="mx-auto max-w-3xl text-center"
      >
        <h2
          v-if="title"
          data-slot="feature-split-title"
          class="text-balance text-3xl font-semibold tracking-tight sm:text-4xl"
        >
          {{ title }}
        </h2>
        <p
          v-if="description"
          data-slot="feature-split-description"
          class="mt-4 text-pretty text-base/7 text-muted-foreground sm:text-lg/8"
        >
          {{ description }}
        </p>
      </div>

      <div
        v-if="sectionItems.length"
        data-slot="feature-split-sections"
        :class="cn('space-y-16 md:space-y-24', hasHeader && 'mt-12 md:mt-16')"
      >
        <article
          v-for="(section, sectionIndex) in sectionItems"
          :id="section.id"
          :key="sectionKey(section, sectionIndex)"
          data-slot="feature-split-section"
          class="grid items-center gap-10 lg:grid-cols-2 lg:gap-16"
        >
          <div :class="section.reverse ? 'lg:order-2' : undefined">
            <h3
              data-slot="feature-split-section-title"
              class="text-balance text-2xl font-semibold tracking-tight sm:text-3xl"
            >
              {{ section.title }}
            </h3>
            <p
              v-if="section.description"
              data-slot="feature-split-section-description"
              class="mt-4 max-w-2xl text-pretty text-base/7 text-muted-foreground"
            >
              {{ section.description }}
            </p>

            <dl
              v-if="featureItems(section).length"
              data-slot="feature-split-features"
              class="mt-8 grid gap-5"
            >
              <div
                v-for="(feature, featureIndex) in featureItems(section)"
                :key="featureKey(feature, featureIndex)"
                data-slot="feature-split-feature"
                class="flex gap-4 rounded-xl p-2 -m-2"
              >
                <div
                  v-if="$slots.icon"
                  data-slot="feature-split-feature-icon"
                  class="flex size-10 shrink-0 items-center justify-center rounded-lg border border-primary/15 bg-primary/10 text-primary"
                >
                  <slot
                    name="icon"
                    :feature="feature"
                    :feature-index="featureIndex"
                    :section="section"
                    :section-index="sectionIndex"
                  />
                </div>
                <div>
                  <dt class="font-medium">
                    {{ feature.title }}
                  </dt>
                  <dd
                    v-if="feature.description"
                    class="mt-1 text-sm/6 text-muted-foreground"
                  >
                    {{ feature.description }}
                  </dd>
                </div>
              </div>
            </dl>
          </div>

          <div
            v-if="$slots.media"
            data-slot="feature-split-media"
            :class="section.reverse ? 'lg:order-1' : undefined"
          >
            <slot
              name="media"
              :section="section"
              :section-index="sectionIndex"
            />
          </div>
        </article>
      </div>
    </div>
  </section>
</template>
