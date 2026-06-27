<script setup lang="ts">
import { MetricsGrid, type MetricsGridItem } from "~/registry/blocks/metrics-grid";

const metrics: MetricsGridItem[] = [
  {
    id: "activation",
    value: "42%",
    label: "Activation lift",
    description: "More teams reach their first successful workflow in week one.",
    tone: "primary",
  },
  {
    id: "response-time",
    value: "< 90s",
    label: "Median response",
    description: "Support queues stay fast during product launches and migrations.",
    tone: "success",
  },
  {
    id: "accounts",
    value: "12k+",
    label: "Accounts monitored",
    description: "Usage, billing, and health signals roll into one operator view.",
    tone: "warning",
  },
  {
    id: "retention",
    value: "98.4%",
    label: "Enterprise retention",
    description: "Contract renewals stay predictable with proactive account alerts.",
    tone: "muted",
  },
];
</script>

<template>
  <div class="rounded-xl border bg-muted/20 p-4 sm:p-6">
    <MetricsGrid
      headline="Growth signals"
      title="A compact proof section for product momentum"
      description="Show formatted metrics from your app without moving analytics, formatting, or tracking behavior into the block."
      :items="metrics"
      variant="cards"
      class="py-0"
    />
  </div>
</template>
