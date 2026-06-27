<script setup lang="ts">
import type { Component } from "vue";
import { Blocks, ChartNoAxesColumnIncreasing, Files, Route, Search, ShieldCheck } from "lucide-vue-next";
import { FeatureGrid, type FeatureGridItem } from "~/registry/blocks/feature-grid";

const features: FeatureGridItem[] = [
  {
    id: "blocks",
    title: "Composable blocks",
    description: "Ship complete sections without moving product copy, route decisions, or data ownership into the registry item.",
  },
  {
    id: "content",
    title: "App-owned content",
    description: "Pass the exact feature list your product needs, from static arrays, CMS records, or localized copy.",
  },
  {
    id: "routing",
    title: "Route-ready links",
    description: "Link selected features to deeper docs or marketing pages while preserving your app's navigation model.",
    href: "/docs/components",
  },
  {
    id: "analytics",
    title: "Analytics friendly",
    description: "Keep click tracking and campaign metadata in your app instead of coupling the block to one analytics tool.",
  },
  {
    id: "search",
    title: "Discovery surfaces",
    description: "Use the same data shape for landing pages, onboarding screens, docs overviews, and searchable feature indexes.",
  },
  {
    id: "security",
    title: "Safe external links",
    description: "Blank-target feature links receive a safe default rel while still allowing app-specific rel overrides.",
    href: "https://ui.stackhacker.io/r/feature-grid.json",
    target: "_blank",
  },
];

const icons: Partial<Record<string, Component>> = {
  blocks: Blocks,
  content: Files,
  routing: Route,
  analytics: ChartNoAxesColumnIncreasing,
  search: Search,
  security: ShieldCheck,
};

function featureIcon(item: FeatureGridItem) {
  return item.id ? icons[item.id] : undefined;
}
</script>

<template>
  <FeatureGrid
    headline="Feature sections"
    title="A complete grid for product capabilities"
    description="Render a polished feature section from app-owned data while keeping icons, routes, analytics, and content sources under your control."
    :items="features"
    class="py-0"
  >
    <template #icon="{ item }">
      <component
        :is="featureIcon(item)"
        v-if="featureIcon(item)"
        class="size-5"
        aria-hidden="true"
      />
    </template>
  </FeatureGrid>
</template>
