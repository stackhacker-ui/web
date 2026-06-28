<script setup lang="ts">
import { ExternalLink } from "lucide-vue-next";
import { WorkExperience, type WorkExperienceItem } from "~/registry/blocks/work-experience";

const items: WorkExperienceItem[] = [
  {
    id: "stackhacker",
    dateLabel: "2024 - Present",
    role: "Product Engineer",
    organization: "Stackhacker UI",
    href: "https://ui.stackhacker.io",
    target: "_blank",
    description: "Designs and ships reusable Nuxt and shadcn-vue blocks for product teams.",
  },
  {
    id: "northstar",
    dateLabel: "2022 - 2024",
    role: "Design Systems Lead",
    organization: "Northstar Labs",
    href: "https://example.com",
    target: "_blank",
    description: "Led a component platform across marketing, docs, and dashboard surfaces.",
  },
  {
    id: "freelance",
    dateLabel: "2020 - 2022",
    role: "Independent Interface Designer",
    organization: "Freelance",
    description: "Partnered with early-stage teams on brand systems and product launches.",
  },
];
</script>

<template>
  <WorkExperience
    title="Work experience"
    description="A compact career-history list with app-owned organization visuals."
    :items="items"
    class="py-0"
  >
    <template #organization="{ item }">
      <ExternalLink
        v-if="item.href"
        class="size-3.5 shrink-0"
        aria-hidden="true"
      />
    </template>
  </WorkExperience>
</template>
