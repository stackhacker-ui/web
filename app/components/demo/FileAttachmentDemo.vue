<script setup lang="ts">
import { FileSpreadsheet } from "lucide-vue-next";
import { FileAttachment } from "~/registry/blocks/file-attachment";
</script>

<template>
  <div class="flex flex-wrap items-center gap-4">
    <FileAttachment
      name="product-shot.png"
      type="image/png"
      display-name="product-shot.png"
      preview-url="https://images.unsplash.com/photo-1498050108023-c5249f4df085?q=80&w=240&auto=format&fit=crop"
      status="uploaded"
      removable
      @remove="() => {}"
    />

    <FileAttachment
      name="quarterly-report.csv"
      type="text/csv"
      status="uploading"
    >
      <template #icon>
        <FileSpreadsheet
          class="size-5"
          aria-hidden="true"
        />
      </template>
    </FileAttachment>

    <FileAttachment
      name="brief.pdf"
      type="application/pdf"
      status="error"
      error="File is larger than the allowed limit"
      removable
      @remove="() => {}"
    />
  </div>
</template>
