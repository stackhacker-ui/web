<script setup lang="ts">
import { ArrowUpRight, ChartNoAxesColumnIncreasing, Sparkles } from "lucide-vue-next";
import { FeatureCard } from "~/registry/blocks/feature-card";
</script>

<template>
  <div class="mx-auto grid w-full max-w-4xl gap-4 sm:grid-cols-2">
    <FeatureCard
      title="Launch-ready sections"
      description="Compose product pages from focused blocks while keeping copy, data, and route logic in your app."
    />

    <FeatureCard title="Title-only highlight" />

    <FeatureCard
      title="Feature library"
      description="Link each card to a deeper product, docs, or marketing page without coupling the component to Nuxt routing."
      href="/docs/components"
      class="sm:row-span-2"
    >
      <template #icon>
        <Sparkles
          class="size-5"
          aria-hidden="true"
        />
      </template>
    </FeatureCard>

    <FeatureCard
      title="Usage analytics"
      description="Open external dashboards safely with a default rel for blank-target links."
      href="https://ui.stackhacker.io"
      target="_blank"
    >
      <template #icon>
        <ChartNoAxesColumnIncreasing
          class="size-5"
          aria-hidden="true"
        />
      </template>
    </FeatureCard>

    <FeatureCard
      title="Custom rel link"
      description="Override rel when your app has a specific security or attribution policy."
      href="https://ui.stackhacker.io/r/feature-card.json"
      target="_blank"
      rel="noreferrer"
      class="sm:col-span-2"
    >
      <template #icon>
        <ArrowUpRight
          class="size-5"
          aria-hidden="true"
        />
      </template>
    </FeatureCard>
  </div>
</template>
