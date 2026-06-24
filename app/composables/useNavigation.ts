import type { ContentNavigationItem } from "@nuxt/content";

export const sectionCategories: Record<string, { id: string; title: string }[]> = {
  "getting-started": [
    { id: "overview", title: "Getting Started" },
  ],
  "components": [
    { id: "overview", title: "Overview" },
    { id: "content", title: "Content" },
    { id: "element", title: "Element" },
    { id: "chat", title: "AI Chat" },
  ],
};

export const useNavigation = async () => {
  const { data } = await useAsyncData("navigation", async () => {
    try {
      return await queryCollectionNavigation("docs");
    }
    catch {
      return [];
    }
  }, {
    default: () => ([]),
  });

  return {
    data,
  };
};

export const useGroupedNavigation = async (
  navigation: Ref<ContentNavigationItem[]>,
  section: Ref<string>,
) => {
  const fallbackRoot = computed<ContentNavigationItem>(() => ({
    title: "Docs",
    path: "/docs",
    stem: "docs",
    children: [],
  }));

  const { data: pages } = await useAsyncData("docs-pages-category", async () => {
    try {
      return await queryCollection("docs")
        .select("path", "category" as never)
        .all();
    }
    catch {
      return [];
    }
  }, {
    default: () => ([]),
  });

  const grouped = computed(() => {
    const root = navigation.value?.find(i => i.stem === "docs");
    if (!root?.children) {
      return root ?? fallbackRoot.value;
    }

    const sectionNode = root.children.find(c => c.path === `/docs/${section.value}`);
    if (!sectionNode) {
      return root;
    }

    const categories = sectionCategories[section.value];
    if (!categories) return sectionNode;

    // Build category map from page data
    const categoryMap = new Map<string, string>();
    for (const page of pages.value) {
      const p = page as { path: string; category?: string };
      if (p.category) {
        categoryMap.set(p.path, p.category);
      }
    }

    // Group children by category
    const groups = new Map<string, ContentNavigationItem[]>();
    const uncategorized: ContentNavigationItem[] = [];

    for (const child of sectionNode.children ?? []) {
      const cat = categoryMap.get(child.path!);
      if (cat) {
        if (!groups.has(cat)) groups.set(cat, []);
        groups.get(cat)!.push(child);
      }
      else {
        uncategorized.push(child);
      }
    }

    // Build grouped tree in defined order
    const groupedChildren: ContentNavigationItem[] = [];

    for (const { id, title } of categories) {
      const items = groups.get(id);
      if (items?.length) {
        groupedChildren.push({
          title,
          stem: id,
          path: "",
          children: items,
        } as ContentNavigationItem);
      }
    }

    if (uncategorized.length) {
      groupedChildren.push({
        title: "Other",
        stem: "other",
        path: "",
        children: uncategorized,
      } as ContentNavigationItem);
    }

    return {
      ...sectionNode,
      children: groupedChildren,
    };
  });

  return { grouped };
};
