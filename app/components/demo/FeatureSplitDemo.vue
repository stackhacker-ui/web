<script setup lang="ts">
import type { Component } from "vue";
import { Boxes, PanelsTopLeft, Sparkles, Workflow } from "lucide-vue-next";
import { FeatureSplit, type FeatureSplitFeature, type FeatureSplitSection } from "~/registry/blocks/feature-split";

const sections: FeatureSplitSection[] = [
  {
    id: "compose",
    title: "Compose sections from product-owned content",
    description: "Render a full split layout while your app keeps ownership of copy, media, icons, routing, and analytics.",
    features: [
      {
        id: "slots",
        title: "Slot-owned media",
        description: "Bring screenshots, videos, SVGs, or custom cards without coupling the block to one asset pipeline.",
      },
      {
        id: "features",
        title: "Display-ready features",
        description: "Pass the exact bullets your product needs from static data, CMS records, or localized strings.",
      },
    ],
  },
  {
    id: "ship",
    title: "Alternate the story without rebuilding the layout",
    description: "Use the same API for product walkthroughs, docs callouts, and marketing proof sections.",
    reverse: true,
    features: [
      {
        id: "portable",
        title: "Portable by default",
        description: "No Nuxt Icon strings, no local placeholder imports, and no runtime data fetching.",
      },
      {
        id: "responsive",
        title: "Responsive split rhythm",
        description: "The section stacks naturally on mobile and switches to two columns on larger screens.",
      },
    ],
  },
];

const icons: Partial<Record<string, Component>> = {
  slots: PanelsTopLeft,
  features: Boxes,
  portable: Workflow,
  responsive: Sparkles,
};

function featureIcon(feature: FeatureSplitFeature) {
  return feature.id ? icons[feature.id] : undefined;
}
</script>

<template>
  <FeatureSplit
    title="Feature split sections"
    description="A complete split layout for product stories with app-owned visuals."
    :sections="sections"
    class="py-0"
  >
    <template #icon="{ feature }">
      <component
        :is="featureIcon(feature)"
        v-if="featureIcon(feature)"
        class="size-5"
        aria-hidden="true"
      />
    </template>

    <template #media="{ section }">
      <div class="rounded-2xl border bg-muted/40 p-2 shadow-sm">
        <div class="relative flex aspect-video items-center justify-center overflow-hidden rounded-xl border border-dashed bg-background/80">
          <div class="absolute inset-0 bg-[radial-gradient(circle_at_1px_1px,hsl(var(--muted-foreground)/0.18)_1px,transparent_0)] [background-size:18px_18px]" />
          <div class="relative max-w-xs rounded-xl border bg-card p-5 text-center shadow-sm">
            <p class="text-sm font-medium text-muted-foreground">
              {{ section.id === "compose" ? "Media slot" : "Reversed layout" }}
            </p>
            <p class="mt-2 text-lg font-semibold tracking-tight">
              {{ section.title }}
            </p>
          </div>
        </div>
      </div>
    </template>
  </FeatureSplit>
</template>
