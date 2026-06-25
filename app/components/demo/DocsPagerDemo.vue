<script setup lang="ts">
import { DocsPager, type DocsPagerItem } from "~/registry/blocks/docs-pager";

const previous: DocsPagerItem = {
  title: "Docs Search Modal",
  description: "Add a lightweight local search modal to Nuxt documentation interfaces.",
  href: "/docs/components/docs-search-modal",
};

const next: DocsPagerItem = {
  title: "Pricing Plans",
  description: "Render pricing cards with billing-period controls and feature lists.",
  href: "/docs/components/pricing-plans",
};
</script>

<template>
  <div class="mx-auto grid w-full max-w-2xl gap-8">
    <DocsPager
      :previous="previous"
      :next="next"
    />

    <DocsPager
      :next="next"
      class="border-dashed"
    />
  </div>
</template>
