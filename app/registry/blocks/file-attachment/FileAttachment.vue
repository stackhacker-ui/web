<script setup lang="ts">
import type { HTMLAttributes } from "vue";
import { computed } from "vue";
import { AlertCircle, File, Image, Loader2, X } from "@lucide/vue";
import { cn } from "@/lib/utils";

export type FileAttachmentStatus = "idle" | "uploading" | "uploaded" | "error";

export interface FileAttachmentProps {
  /** Original file name supplied by the consuming app. */
  name: string;
  /** Optional MIME type used for the default fallback icon. */
  type?: string;
  /** Optional display name. Falls back to name. */
  displayName?: string;
  /** Optional preview image URL supplied by the consuming app. */
  previewUrl?: string;
  /** Display status supplied by the consuming app. */
  status?: FileAttachmentStatus;
  /** Error text shown when status is error. */
  error?: string;
  /** Show a remove button when not uploading. */
  removable?: boolean;
  /** Accessible label for the remove button. */
  removeLabel?: string;
  /** Accessible label for the attachment. */
  ariaLabel?: string;
  /** Additional CSS classes for the root element. */
  class?: HTMLAttributes["class"];
}

const props = withDefaults(defineProps<FileAttachmentProps>(), {
  type: "",
  status: "idle",
  removable: false,
  removeLabel: "Remove attachment",
});

const emit = defineEmits<{
  remove: [];
}>();

const label = computed(() => props.displayName ?? props.name);
const isImage = computed(() => Boolean(props.previewUrl && props.type?.startsWith("image/")));
const statusLabel = computed(() => {
  if (props.status === "uploading") return "Uploading";
  if (props.status === "error") return props.error || "Upload failed";
  if (props.status === "uploaded") return "Uploaded";
  return "Ready";
});
const attachmentLabel = computed(() => props.ariaLabel ?? `${label.value}, ${statusLabel.value}`);

function fallbackIcon() {
  if (props.type?.startsWith("image/")) return Image;
  return File;
}
</script>

<template>
  <div
    data-slot="file-attachment"
    :class="cn('group relative inline-flex items-center gap-3 rounded-xl border bg-card p-2 pr-3 text-card-foreground shadow-sm', props.class)"
    :aria-label="attachmentLabel"
    :title="label"
  >
    <div
      data-slot="file-attachment-preview"
      class="relative flex size-11 shrink-0 items-center justify-center overflow-hidden rounded-lg bg-muted text-muted-foreground"
    >
      <slot
        name="preview"
        :file-name="name"
        :display-name="label"
        :type="type"
        :preview-url="previewUrl"
        :status="status"
      >
        <img
          v-if="isImage"
          :src="previewUrl"
          :alt="label"
          class="size-full object-cover"
        >
        <slot
          v-else
          name="icon"
          :file-name="name"
          :display-name="label"
          :type="type"
          :status="status"
        >
          <component
            :is="fallbackIcon()"
            class="size-5"
            aria-hidden="true"
          />
        </slot>
      </slot>

      <div
        v-if="status === 'uploading'"
        data-slot="file-attachment-uploading"
        class="absolute inset-0 flex items-center justify-center bg-background/70 backdrop-blur-xs"
      >
        <Loader2
          class="size-5 animate-spin"
          aria-hidden="true"
        />
      </div>

      <div
        v-else-if="status === 'error'"
        data-slot="file-attachment-error-icon"
        class="absolute inset-0 flex items-center justify-center bg-destructive/80 text-destructive-foreground"
      >
        <AlertCircle
          class="size-5"
          aria-hidden="true"
        />
      </div>
    </div>

    <div class="min-w-0">
      <p
        data-slot="file-attachment-name"
        class="max-w-40 truncate text-sm font-medium"
      >
        {{ label }}
      </p>
      <p
        data-slot="file-attachment-status"
        :class="cn('text-xs text-muted-foreground', status === 'error' && 'text-destructive')"
      >
        {{ statusLabel }}
      </p>
    </div>

    <slot
      name="actions"
      :file-name="name"
      :display-name="label"
      :type="type"
      :preview-url="previewUrl"
      :status="status"
      :remove="() => emit('remove')"
    >
      <button
        v-if="removable && status !== 'uploading'"
        type="button"
        data-slot="file-attachment-remove"
        class="absolute -right-2 -top-2 inline-flex size-6 items-center justify-center rounded-full border bg-background text-muted-foreground opacity-0 shadow-sm transition-opacity hover:text-foreground focus-visible:opacity-100 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 group-hover:opacity-100"
        :aria-label="removeLabel"
        @click="emit('remove')"
      >
        <X
          class="size-3.5"
          aria-hidden="true"
        />
      </button>
    </slot>
  </div>
</template>
