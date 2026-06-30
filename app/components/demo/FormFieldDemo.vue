<script setup lang="ts">
import { Input } from "~/components/ui/input";
import { FormField } from "~/registry/blocks/form-field";
</script>

<template>
  <div class="w-full max-w-md space-y-4">
    <FormField
      v-slot="field"
      label="Project name"
      description="This appears in your workspace switcher."
      hint="Required"
      required
    >
      <Input
        v-bind="field"
        placeholder="Acme dashboard"
      />
    </FormField>

    <FormField
      v-slot="field"
      label="Slug"
      error="Use lowercase letters, numbers, and dashes only."
    >
      <Input
        v-bind="field"
        model-value="Acme Dashboard"
      />
    </FormField>
  </div>
</template>
