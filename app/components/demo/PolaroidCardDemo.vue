<script setup lang="ts">
import { PolaroidCard, type PolaroidCardImage } from "~/registry/blocks/polaroid-card";

const images: Array<{
  image: PolaroidCardImage;
  caption?: string;
  rotation: "left" | "right" | "none";
  interactive?: boolean;
}> = [
  {
    image: {
      src: "https://images.unsplash.com/photo-1500530855697-b586d89ba3ee?auto=format&fit=crop&w=320&q=80",
      alt: "Cabin beside a lake",
    },
    caption: "Weekend cabin",
    rotation: "left",
  },
  {
    image: {
      src: "https://images.unsplash.com/photo-1500534314209-a25ddb2bd429?auto=format&fit=crop&w=320&q=80",
      alt: "Desert road at sunset",
    },
    rotation: "right",
  },
  {
    image: {
      src: "https://images.unsplash.com/photo-1495567720989-cebdbdd97913?auto=format&fit=crop&w=320&q=80",
      alt: "Mountain ridge above clouds",
    },
    caption: "Static layout",
    rotation: "none",
    interactive: false,
  },
];
</script>

<template>
  <div class="overflow-hidden rounded-xl border bg-muted/30 p-8">
    <div class="mx-auto flex max-w-2xl flex-col items-center gap-8 sm:flex-row sm:justify-center sm:gap-6">
      <PolaroidCard
        v-for="item in images"
        :key="item.image.src"
        :image="item.image"
        :caption="item.caption"
        :rotation="item.rotation"
        :interactive="item.interactive"
      />
    </div>
  </div>
</template>
