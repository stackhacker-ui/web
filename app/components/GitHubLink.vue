<template>
  <Button
    as-child
    class="h-8 shadow-none"
    size="sm"
    variant="ghost"
  >
    <NuxtLink
      :to="siteConfig.links.github"
      rel="noreferrer"
      target="_blank"
    >
      <Icon name="mdi:github" />
      <span class="text-muted-foreground w-8 text-xs tabular-nums">
        {{ starsLabel }}
      </span>
    </NuxtLink>
  </Button>
</template>

<script lang="ts" setup>
import { siteConfig } from "~/lib/config";

interface RepoResponse {
  repo?: {
    stars?: number;
  };
}

const { data } = await useAsyncData<RepoResponse | null>("github-stars", async () => {
  const repoPath = new URL(siteConfig.links.github).pathname.slice(1);

  try {
    return await $fetch<RepoResponse>(`https://ungh.cc/repos/${repoPath}`, {
      timeout: 3000,
    });
  }
  catch {
    return null;
  }
}, {
  default: () => null,
  lazy: true,
  server: false,
});

const starsLabel = computed(() => {
  const count = data.value?.repo?.stars;

  if (typeof count !== "number" || !Number.isFinite(count)) {
    return "N/A";
  }

  return count >= 1000 ? `${(count / 1000).toFixed(1)}k` : count.toLocaleString();
});
</script>
