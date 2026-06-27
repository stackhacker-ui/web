<script setup lang="ts">
import { ref } from "vue";
import { ChangelogTimeline, type ChangelogTimelineItem } from "~/registry/blocks/changelog-timeline";

const releases: ChangelogTimelineItem[] = [
  {
    id: "2026-06-27",
    tag: "v1.4.0",
    title: "Registry-ready release timeline",
    dateLabel: "Jun 27, 2026",
    date: "2026-06-27",
    body: "Ship a portable timeline block with app-owned release data, display dates, and body rendering.",
  },
  {
    id: "2026-06-12",
    tag: "v1.3.0",
    title: "Component docs refresh",
    dateLabel: "Jun 12, 2026",
    date: "2026-06-12",
    body: "Improve install examples and clarify which data stays inside the consuming app.",
  },
  {
    id: "2026-05-29",
    tag: "v1.2.0",
    title: "Template publishing baseline",
    dateLabel: "May 29, 2026",
    date: "2026-05-29",
    body: "Align public template metadata, screenshots, and cross-template navigation.",
  },
];

const retryCount = ref(0);
</script>

<template>
  <div class="space-y-10 rounded-xl border bg-muted/20 p-6">
    <ChangelogTimeline :items="releases">
      <template #item="{ item, latest }">
        <div class="space-y-3">
          <p class="text-sm leading-7 text-muted-foreground">
            {{ item.body }}
          </p>
          <ul
            v-if="latest"
            class="space-y-2 text-sm leading-6 text-muted-foreground"
          >
            <li class="flex gap-2">
              <span class="mt-2 size-1.5 shrink-0 rounded-full bg-primary" />
              <span>Accept app-owned release items instead of GitHub API responses.</span>
            </li>
            <li class="flex gap-2">
              <span class="mt-2 size-1.5 shrink-0 rounded-full bg-primary" />
              <span>Render rich release notes through a scoped slot.</span>
            </li>
          </ul>
        </div>
      </template>
    </ChangelogTimeline>

    <div class="grid gap-4 lg:grid-cols-3">
      <ChangelogTimeline
        loading
        class="rounded-xl border bg-background p-4"
      />
      <ChangelogTimeline
        :items="[]"
        empty-title="No public releases"
        empty-description="Connect your app-owned release source when you are ready to publish."
        class="rounded-xl border bg-background p-4"
      />
      <ChangelogTimeline
        error="The release source did not respond."
        show-retry
        class="rounded-xl border bg-background p-4"
        @retry="retryCount++"
      />
    </div>
  </div>
</template>
