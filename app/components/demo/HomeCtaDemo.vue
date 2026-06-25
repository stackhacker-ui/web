<script setup lang="ts">
import { HomeCta, type HomeCtaLink } from "~/registry/blocks/home-cta";

const links: HomeCtaLink[] = [
  {
    label: "Start building",
    href: "#",
  },
  {
    label: "View components",
    href: "https://ui.stackhacker.io/docs/components",
    target: "_blank",
    variant: "outline",
  },
];
</script>

<template>
  <HomeCta
    title="Launch your product surface faster"
    description="Drop in a focused CTA section, then connect your own routes, analytics, campaigns, and conversion logic."
    :links="links"
    class="rounded-xl border py-16 md:py-20"
  />
</template>
