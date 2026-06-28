<script setup lang="ts">
import { Bot, Sparkles, Zap } from "lucide-vue-next";
import type { Component } from "vue";
import { ref } from "vue";
import { ModelPicker, type ModelPickerModel } from "~/registry/blocks/model-picker";

const selected = ref("openai/gpt-5-nano");

const models: ModelPickerModel[] = [
  {
    value: "openai/gpt-5-nano",
    label: "GPT-5 Nano",
    provider: "OpenAI",
    description: "Fast everyday responses",
  },
  {
    value: "anthropic/claude-haiku-4.5",
    label: "Claude Haiku 4.5",
    provider: "Anthropic",
    description: "Concise writing and coding help",
  },
  {
    value: "google/gemini-3-flash",
    label: "Gemini 3 Flash",
    provider: "Google",
    description: "Multimodal reasoning",
  },
  {
    value: "local/offline",
    label: "Offline model",
    provider: "Local",
    description: "Disabled until downloaded",
    disabled: true,
  },
];

const icons: Partial<Record<string, Component>> = {
  OpenAI: Sparkles,
  Anthropic: Bot,
  Google: Zap,
};

function providerIcon(model?: ModelPickerModel) {
  return model?.provider ? icons[model.provider] : undefined;
}
</script>

<template>
  <ModelPicker
    v-model="selected"
    :models="models"
  >
    <template #icon="{ model }">
      <component
        :is="providerIcon(model)"
        v-if="providerIcon(model)"
        class="size-4 shrink-0"
        aria-hidden="true"
      />
    </template>
  </ModelPicker>
</template>
