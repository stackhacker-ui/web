<script setup lang="ts">
import { reactive, ref } from "vue";
import { Button } from "~/components/ui/button";
import { Input } from "~/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "~/components/ui/select";
import { Textarea } from "~/components/ui/textarea";
import { Form, type FormError } from "~/registry/blocks/form";
import { FormField } from "~/registry/blocks/form-field";

const state = reactive({
  email: "",
  message: "",
  role: "",
});
const submitted = ref(false);

function validate(values: typeof state): FormError[] {
  const errors: FormError[] = [];

  if (!values.email.includes("@")) {
    errors.push({ name: "email", message: "Enter a valid email address." });
  }
  if (values.message.trim().length < 10) {
    errors.push({ name: "message", message: "Message must be at least 10 characters." });
  }
  if (!values.role) {
    errors.push({ name: "role", message: "Select a role." });
  }

  return errors;
}

function onSubmit() {
  submitted.value = true;
}
</script>

<template>
  <Form
    :state="state"
    :validate="validate"
    class="w-full max-w-md space-y-4"
    @submit="onSubmit"
  >
    <FormField
      v-slot="field"
      label="Email"
      name="email"
      description="Use your work email."
      required
    >
      <Input
        v-model="state.email"
        v-bind="field"
        type="email"
        placeholder="you@example.com"
      />
    </FormField>

    <FormField
      v-slot="field"
      label="Message"
      name="message"
      help="Tell us what you are building."
    >
      <Textarea
        v-model="state.message"
        v-bind="field"
        placeholder="I am building..."
        rows="3"
      />
    </FormField>

    <FormField
      v-slot="field"
      label="Role"
      name="role"
    >
      <Select v-model="state.role">
        <SelectTrigger
          class="w-full"
          v-bind="field"
        >
          <SelectValue placeholder="Select role" />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="admin">
            Admin
          </SelectItem>
          <SelectItem value="editor">
            Editor
          </SelectItem>
          <SelectItem value="viewer">
            Viewer
          </SelectItem>
        </SelectContent>
      </Select>
    </FormField>

    <div class="flex items-center gap-3">
      <Button type="submit">
        Submit
      </Button>
      <p
        v-if="submitted"
        class="text-sm text-muted-foreground"
      >
        Submitted locally. Your app owns the API call.
      </p>
    </div>
  </Form>
</template>
