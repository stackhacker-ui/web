<script setup lang="ts">
import type { HTMLAttributes } from "vue";
import { ref } from "vue";
import { cn } from "@/lib/utils";

defineOptions({
  name: "TestimonialsBlock",
});

export interface TestimonialAvatar {
  src: string;
  alt?: string;
  srcset?: string;
}

export interface TestimonialAuthor {
  name: string;
  role?: string;
  description?: string;
  avatar?: TestimonialAvatar;
}

export interface TestimonialItem {
  id?: string;
  quote: string;
  author: TestimonialAuthor;
}

export interface TestimonialsProps {
  /** Section heading shown above the testimonials */
  title?: string;
  /** Optional supporting copy shown below the title */
  description?: string;
  /** Testimonials supplied by the consuming app */
  items?: TestimonialItem[];
  /** Additional CSS classes for the section */
  class?: HTMLAttributes["class"];
}

const props = withDefaults(defineProps<TestimonialsProps>(), {
  title: "What our customers say",
  description: "Real feedback from teams using this product to move faster.",
  items: () => [],
});

const failedAvatarKeys = ref(new Set<string>());

function itemKey(item: TestimonialItem, index: number) {
  return item.id ?? `${item.author.name}-${index}`;
}

function avatarKey(item: TestimonialItem, index: number) {
  return `${itemKey(item, index)}:${item.author.avatar?.src ?? ""}`;
}

function initials(name: string) {
  return name
    .split(" ")
    .filter(Boolean)
    .slice(0, 2)
    .map(part => part.charAt(0))
    .join("")
    .toUpperCase();
}

function onAvatarError(key: string) {
  failedAvatarKeys.value = new Set(failedAvatarKeys.value).add(key);
}
</script>

<template>
  <section
    data-slot="testimonials"
    :class="cn('py-12 md:py-16', props.class)"
  >
    <div class="mx-auto w-full max-w-7xl px-4 sm:px-6 lg:px-8">
      <div class="mx-auto max-w-2xl text-center">
        <h2 class="text-balance text-3xl font-semibold tracking-tight sm:text-4xl">
          {{ title }}
        </h2>
        <p
          v-if="description"
          class="mt-3 text-base/7 text-muted-foreground"
        >
          {{ description }}
        </p>
      </div>

      <div class="mt-10 grid gap-4 md:grid-cols-3">
        <figure
          v-for="(item, index) in items"
          :key="itemKey(item, index)"
          class="flex min-w-0 flex-col justify-between rounded-2xl border bg-card p-6 text-card-foreground shadow-sm"
        >
          <blockquote class="text-base/7 text-foreground">
            <p class="break-words before:mr-1 before:text-muted-foreground before:content-[open-quote] after:ml-1 after:text-muted-foreground after:content-[close-quote]">
              {{ item.quote }}
            </p>
          </blockquote>

          <figcaption class="mt-8 flex items-center gap-3">
            <span class="relative flex size-12 shrink-0 items-center justify-center overflow-hidden rounded-full bg-muted text-sm font-medium text-muted-foreground ring-1 ring-border">
              <img
                v-if="item.author.avatar && !failedAvatarKeys.has(avatarKey(item, index))"
                :src="item.author.avatar.src"
                :srcset="item.author.avatar.srcset"
                :alt="item.author.avatar.alt ?? item.author.name"
                class="size-full object-cover"
                @error="onAvatarError(avatarKey(item, index))"
              >
              <span v-else>{{ initials(item.author.name) }}</span>
            </span>
            <span class="min-w-0">
              <cite class="block truncate text-sm font-medium not-italic">
                {{ item.author.name }}
              </cite>
              <span
                v-if="item.author.role || item.author.description"
                class="block truncate text-sm text-muted-foreground"
              >
                {{ item.author.role || item.author.description }}
              </span>
            </span>
          </figcaption>
        </figure>
      </div>
    </div>
  </section>
</template>
