<script setup lang="ts">
import { Testimonials, type TestimonialItem } from "~/registry/blocks/testimonials";

const testimonials: TestimonialItem[] = [
  {
    id: "no-avatar",
    quote: "The fallback initials keep author identity clear even when a profile photo is not available.",
    author: {
      name: "Jordan Lee",
      role: "Founder, Northstar Labs",
    },
  },
  {
    id: "broken-avatar",
    quote: "A failed avatar image falls back to initials without changing the testimonial layout.",
    author: {
      name: "Priya Shah",
      role: "Design Lead, Orbit Studio",
      avatar: {
        src: "data:image/gif;base64,invalid",
        alt: "Priya Shah",
      },
    },
  },
];
</script>

<template>
  <div class="overflow-hidden rounded-xl border bg-muted/20">
    <Testimonials
      title="Avatar fallbacks"
      description="Testimonials stay readable when app-owned avatar data is missing or fails to load."
      :items="testimonials"
      class="py-10"
    />
  </div>
</template>
