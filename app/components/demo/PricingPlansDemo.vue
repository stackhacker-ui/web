<script setup lang="ts">
import { PricingPlans, type PricingPlan } from "~/registry/blocks/pricing-plans";

const billingPeriod = ref<"month" | "year">("month");

const plans: PricingPlan[] = [
  {
    title: "Basic",
    description: "For solo builders validating a product idea.",
    price: { month: "$9", year: "$90" },
    cta: { label: "Start basic", href: "#" },
    features: ["1 workspace", "Core analytics", "Community support"],
  },
  {
    title: "Standard",
    description: "For small teams shipping customer-facing apps.",
    price: { month: "$19", year: "$190" },
    cta: { label: "Start standard", href: "#" },
    features: ["5 workspaces", "Priority analytics", "Email support", "Team roles"],
    highlight: true,
  },
  {
    title: "Premium",
    description: "For teams that need more scale and control.",
    price: { month: "$49", year: "$490" },
    cta: { label: "Contact sales", href: "#" },
    features: ["Unlimited workspaces", "Advanced reporting", "Priority support", "SAML SSO"],
  },
];
</script>

<template>
  <div class="w-full space-y-6">
    <div class="flex justify-center">
      <div class="inline-flex rounded-lg border bg-muted p-1">
        <button
          type="button"
          :class="[
            'rounded-md px-3 py-1.5 text-sm transition-colors',
            billingPeriod === 'month' ? 'bg-background text-foreground shadow-sm' : 'text-muted-foreground hover:text-foreground',
          ]"
          @click="billingPeriod = 'month'"
        >
          Monthly
        </button>
        <button
          type="button"
          :class="[
            'rounded-md px-3 py-1.5 text-sm transition-colors',
            billingPeriod === 'year' ? 'bg-background text-foreground shadow-sm' : 'text-muted-foreground hover:text-foreground',
          ]"
          @click="billingPeriod = 'year'"
        >
          Yearly
        </button>
      </div>
    </div>

    <PricingPlans
      :plans="plans"
      :billing-period="billingPeriod"
      class="py-0"
    />
  </div>
</template>
