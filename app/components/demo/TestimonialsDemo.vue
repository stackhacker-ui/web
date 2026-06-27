<script setup lang="ts">
import { Testimonials, type TestimonialItem } from "~/registry/blocks/testimonials";

const testimonials: TestimonialItem[] = [
  {
    id: "sarah-chen",
    quote: "Stackhacker UI gave our team a polished starting point without locking us into a product model. We shipped our customer portal redesign in half the time.",
    author: {
      name: "Sarah Chen",
      role: "Product Director, Bloom Finance",
      avatar: {
        src: "https://images.unsplash.com/photo-1487412720507-e7ab37603c6f?auto=format&fit=facearea&facepad=2&w=96&h=96&q=80",
        srcset: "https://images.unsplash.com/photo-1487412720507-e7ab37603c6f?auto=format&fit=facearea&facepad=2&w=192&h=192&q=80 2x",
      },
    },
  },
  {
    id: "michael-rodriguez",
    quote: "The blocks feel production-ready, but still simple enough for our engineers to understand and adapt. That balance is hard to find.",
    author: {
      name: "Michael Rodriguez",
      role: "Co-founder, Wavelength Music",
      avatar: {
        src: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?auto=format&fit=facearea&facepad=2&w=96&h=96&q=80",
        srcset: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?auto=format&fit=facearea&facepad=2&w=192&h=192&q=80 2x",
      },
    },
  },
  {
    id: "aisha-johnson",
    quote: "We could bring our own data, avatars, and copy while keeping the interface consistent with our design system. It removed a lot of busywork.",
    author: {
      name: "Dr. Aisha Johnson",
      role: "Chief Innovation Officer, GreenTech Solutions",
      avatar: {
        src: "https://images.unsplash.com/photo-1573497019940-1c28c88b4f3e?auto=format&fit=facearea&facepad=2&w=96&h=96&q=80",
        srcset: "https://images.unsplash.com/photo-1573497019940-1c28c88b4f3e?auto=format&fit=facearea&facepad=2&w=192&h=192&q=80 2x",
      },
    },
  },
];
</script>

<template>
  <div class="overflow-hidden rounded-xl border bg-muted/20">
    <Testimonials
      title="Trusted by teams shipping faster"
      description="Use app-owned testimonial data to add focused social proof to a landing page, pricing page, or launch announcement."
      :items="testimonials"
      class="py-10"
    />
  </div>
</template>
