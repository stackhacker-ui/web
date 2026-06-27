<script setup lang="ts">
import type { HTMLAttributes } from "vue";
import { computed } from "vue";
import { cn } from "@/lib/utils";

export interface BlogPostGridImage {
  /** Image source supplied by the consuming app. */
  src: string;
  /** Accessible image alt text. */
  alt?: string;
}

export interface BlogPostGridAuthor {
  /** Visible author name. */
  name: string;
  /** Optional author avatar image. */
  avatar?: BlogPostGridImage;
}

export interface BlogPostGridPost {
  /** Stable id for rendering. Falls back to title and index when omitted. */
  id?: string;
  /** Internal Nuxt route. */
  to?: string;
  /** External or plain anchor href. */
  href?: string;
  /** Anchor target used when href is supplied. */
  target?: HTMLAnchorElement["target"];
  /** Anchor rel used when href is supplied. */
  rel?: string;
  /** Post title. */
  title: string;
  /** Supporting excerpt supplied by the consuming app. */
  description?: string;
  /** App-formatted date label. */
  dateLabel?: string;
  /** Optional badge or category label. */
  badge?: string;
  /** Optional read-time label. */
  readTime?: string;
  /** Optional post image. */
  image?: BlogPostGridImage;
  /** Optional authors supplied by the consuming app. */
  authors?: BlogPostGridAuthor[];
}

export interface BlogPostGridProps {
  /** Optional section title. */
  title?: string;
  /** Optional supporting section copy. */
  description?: string;
  /** Display-ready posts supplied by the consuming app. */
  posts?: BlogPostGridPost[] | null;
  /** Feature the first card on medium and larger screens. */
  featuredFirst?: boolean;
  /** Additional CSS classes for the section. */
  class?: HTMLAttributes["class"];
}

const props = withDefaults(defineProps<BlogPostGridProps>(), {
  posts: () => [],
  featuredFirst: true,
});

const postItems = computed(() => props.posts ?? []);
const hasHeader = computed(() => Boolean(props.title || props.description));
const hasContent = computed(() => hasHeader.value || postItems.value.length > 0);

function postKey(post: BlogPostGridPost, index: number) {
  return post.id ?? post.to ?? post.href ?? `${post.title}-${index}`;
}

function linkRel(post: BlogPostGridPost) {
  if (post.rel) return post.rel;
  if (post.target === "_blank") return "noopener noreferrer";
  return undefined;
}

function linkComponent(post: BlogPostGridPost) {
  if (post.to) return "NuxtLink";
  if (post.href) return "a";
  return "article";
}

function metaItems(post: BlogPostGridPost) {
  return [post.badge, post.dateLabel, post.readTime].filter(Boolean);
}
</script>

<template>
  <section
    v-if="hasContent"
    data-slot="blog-post-grid"
    :class="cn('py-12 md:py-16', props.class)"
  >
    <div class="mx-auto w-full max-w-7xl px-4 sm:px-6 lg:px-8">
      <div
        v-if="hasHeader"
        data-slot="blog-post-grid-header"
        class="mx-auto max-w-3xl text-center"
      >
        <h2
          v-if="title"
          data-slot="blog-post-grid-title"
          class="text-balance text-3xl font-semibold tracking-tight sm:text-4xl"
        >
          {{ title }}
        </h2>
        <p
          v-if="description"
          data-slot="blog-post-grid-description"
          class="mt-4 text-pretty text-base/7 text-muted-foreground sm:text-lg/8"
        >
          {{ description }}
        </p>
      </div>

      <div
        v-if="postItems.length"
        data-slot="blog-post-grid-posts"
        :class="cn(
          'grid gap-5 md:grid-cols-2 lg:grid-cols-3',
          hasHeader && 'mt-10 md:mt-12',
        )"
      >
        <component
          :is="linkComponent(post)"
          v-for="(post, index) in postItems"
          :key="postKey(post, index)"
          data-slot="blog-post-grid-post"
          :to="post.to"
          :href="post.href"
          :target="post.href ? post.target : undefined"
          :rel="post.href ? linkRel(post) : undefined"
          :class="cn(
            'group overflow-hidden rounded-2xl border bg-card/70 text-card-foreground transition-colors',
            (post.to || post.href) && 'block hover:bg-card focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2',
            featuredFirst && index === 0 && 'md:col-span-2 md:grid md:grid-cols-2 lg:col-span-3',
          )"
        >
          <div
            v-if="post.image?.src"
            data-slot="blog-post-grid-post-image"
            :class="cn(
              'aspect-video overflow-hidden bg-muted',
              featuredFirst && index === 0 && 'md:h-full',
            )"
          >
            <img
              :src="post.image.src"
              :alt="post.image.alt ?? post.title"
              class="size-full object-cover transition-transform duration-300 group-hover:scale-105"
            >
          </div>

          <div
            data-slot="blog-post-grid-post-body"
            class="p-6"
          >
            <div
              v-if="metaItems(post).length"
              data-slot="blog-post-grid-post-meta"
              class="flex flex-wrap items-center gap-2 text-sm text-muted-foreground"
            >
              <span
                v-for="item in metaItems(post)"
                :key="item"
                class="rounded-full bg-secondary px-2.5 py-1 text-xs font-medium text-secondary-foreground first:bg-primary/10 first:text-primary"
              >
                {{ item }}
              </span>
            </div>

            <h3
              data-slot="blog-post-grid-post-title"
              :class="cn(
                'text-pretty text-xl font-semibold tracking-tight group-hover:text-primary',
                metaItems(post).length && 'mt-4',
                featuredFirst && index === 0 && 'md:text-3xl',
              )"
            >
              {{ post.title }}
            </h3>

            <p
              v-if="post.description"
              data-slot="blog-post-grid-post-description"
              class="mt-3 line-clamp-3 text-sm/6 text-muted-foreground"
            >
              {{ post.description }}
            </p>

            <div
              v-if="post.authors?.length"
              data-slot="blog-post-grid-post-authors"
              class="mt-5 flex flex-wrap gap-3"
            >
              <div
                v-for="author in post.authors"
                :key="author.name"
                class="flex items-center gap-2 text-sm text-muted-foreground"
              >
                <img
                  v-if="author.avatar?.src"
                  :src="author.avatar.src"
                  :alt="author.avatar.alt ?? author.name"
                  class="size-6 rounded-full object-cover"
                >
                <span class="text-foreground">{{ author.name }}</span>
              </div>
            </div>
          </div>
        </component>
      </div>
    </div>
  </section>
</template>
