<script setup lang="ts">
import { FaqTabs, type FaqTabsCategory } from "~/registry/blocks/faq-tabs";

const categories: FaqTabsCategory[] = [
  {
    value: "services",
    label: "Services",
    items: [
      {
        value: "services-offered",
        question: "What services do you offer?",
        answers: [
          "We help teams design and ship Nuxt interfaces, registry blocks, and production-ready templates.",
          "Your app keeps ownership of content, routes, analytics, and any data loading behavior.",
        ],
      },
      {
        value: "startup-fit",
        question: "Do you work with early-stage teams?",
        answer: "Yes. The block works well for compact launch pages, pricing pages, and support sections where users need quick answers.",
      },
    ],
  },
  {
    value: "pricing",
    label: "Pricing",
    items: [
      {
        value: "project-cost",
        question: "How much does a typical project cost?",
        answer: "Pricing depends on scope, timeline, and required integration work. Most teams start with a focused design and implementation sprint.",
      },
      {
        value: "retainers",
        question: "Do you offer ongoing support?",
        answer: "Yes. Retainers are a good fit when your team needs recurring design systems work, documentation, or registry maintenance.",
      },
    ],
  },
];
</script>

<template>
  <div class="rounded-xl border bg-muted/20 p-4 sm:p-6">
    <FaqTabs
      title="Frequently asked questions"
      description="Answer common questions with app-owned content while the block handles category navigation and disclosure UI."
      :categories="categories"
      class="py-0"
    />
  </div>
</template>
