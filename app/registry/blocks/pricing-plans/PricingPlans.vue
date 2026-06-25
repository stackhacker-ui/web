<script setup lang="ts">
import type { HTMLAttributes } from "vue";
import { Check } from "@lucide/vue";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { cn } from "@/lib/utils";

export interface PricingPlanPrice {
  month: string;
  year: string;
}

export interface PricingPlanCta {
  label: string;
  href: string;
}

export interface PricingPlan {
  title: string;
  description: string;
  price: PricingPlanPrice;
  cta: PricingPlanCta;
  features: string[];
  highlight?: boolean;
}

export interface PricingPlansProps {
  /** Pricing plans supplied by the consuming app */
  plans?: PricingPlan[];
  /** Selected billing period to render */
  billingPeriod?: "month" | "year";
  /** Label for highlighted plans. Use an empty string to hide the badge. */
  highlightLabel?: string;
  /** Additional CSS classes for the section */
  class?: HTMLAttributes["class"];
}

const props = withDefaults(defineProps<PricingPlansProps>(), {
  plans: () => [],
  billingPeriod: "month",
  highlightLabel: "Popular",
});
</script>

<template>
  <section
    data-slot="pricing-plans"
    :class="cn('py-12 md:py-16', props.class)"
  >
    <div class="mx-auto grid w-full max-w-7xl gap-4 px-4 sm:px-6 lg:grid-cols-3 lg:px-8">
      <Card
        v-for="plan in plans"
        :key="plan.title"
        class="relative flex rounded-2xl p-0"
        :class="plan.highlight ? 'border-primary/50 ring-1 ring-primary/30' : 'bg-card/70'"
      >
        <CardContent class="flex w-full flex-col p-6">
          <Badge
            v-if="plan.highlight && highlightLabel"
            class="absolute right-4 top-4"
          >
            {{ highlightLabel }}
          </Badge>

          <h2 class="text-xl font-semibold">
            {{ plan.title }}
          </h2>
          <p class="mt-2 text-sm/6 text-muted-foreground">
            {{ plan.description }}
          </p>

          <div class="mt-6 flex items-end gap-1">
            <span class="text-4xl font-semibold tracking-tight">
              {{ plan.price[billingPeriod] }}
            </span>
            <span class="pb-1 text-sm text-muted-foreground">/{{ billingPeriod }}</span>
          </div>

          <Button
            as="a"
            :href="plan.cta.href"
            class="mt-6"
            :variant="plan.highlight ? 'default' : 'outline'"
          >
            {{ plan.cta.label }}
          </Button>

          <ul class="mt-6 space-y-3 text-sm/6">
            <li
              v-for="feature in plan.features"
              :key="feature"
              class="flex gap-3"
            >
              <Check
                class="mt-0.5 size-4 shrink-0 text-primary"
                aria-hidden="true"
              />
              <span>{{ feature }}</span>
            </li>
          </ul>
        </CardContent>
      </Card>
    </div>
  </section>
</template>
