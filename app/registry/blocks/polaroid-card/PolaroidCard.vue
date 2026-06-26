<script setup lang="ts">
import type { HTMLAttributes } from "vue";
import { computed } from "vue";
import { cn } from "@/lib/utils";

export interface PolaroidCardImage {
  src: string;
  alt: string;
}

export interface PolaroidCardProps {
  /** Image source and accessible alt text supplied by the consuming app */
  image: PolaroidCardImage;
  /** Optional handwritten-style caption. Falls back to image.alt when omitted. */
  caption?: string;
  /** Fixed card rotation for standalone placement */
  rotation?: "left" | "right" | "none";
  /** Enable hover lift and straightening interaction */
  interactive?: boolean;
  /** Additional CSS classes for the root card */
  class?: HTMLAttributes["class"];
}

const props = withDefaults(defineProps<PolaroidCardProps>(), {
  rotation: "left",
  interactive: true,
});

const captionText = computed(() => props.caption ?? props.image.alt);

const rotationClass = computed(() => {
  if (props.rotation === "right") return "rotate-5";
  if (props.rotation === "none") return "rotate-0";
  return "-rotate-5";
});

const interactiveClass = computed(() => {
  if (!props.interactive) return "";
  if (props.rotation === "right") return "hover:z-10 hover:translate-x-4 hover:scale-105 hover:rotate-0";
  if (props.rotation === "left") return "hover:z-10 hover:-translate-x-4 hover:scale-105 hover:rotate-0";
  return "hover:z-10 hover:scale-105";
});
</script>

<template>
  <figure
    data-slot="polaroid-card"
    :data-rotation="rotation"
    :data-interactive="interactive"
    :class="cn(
      'inline-flex flex-col bg-white p-2 text-black drop-shadow-2xl transition-transform duration-300 ease-in-out',
      rotationClass,
      interactiveClass,
      props.class,
    )"
  >
    <img
      :src="image.src"
      :alt="image.alt"
      class="aspect-square size-32 object-cover"
    >
    <figcaption class="mt-2 w-32 text-center font-serif text-xs font-medium text-black">
      {{ captionText }}
    </figcaption>
  </figure>
</template>
