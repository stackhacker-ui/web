import { readFile } from "node:fs/promises";
import { resolve } from "node:path";
import registryConfig from "../registry.config";

interface RegistryItem {
  name: string;
  dependencies?: string[];
  registryDependencies?: string[];
}

interface RegistryIndex {
  homepage: string;
  items: Array<{ name: string }>;
}

interface ExpectedRegistryItem {
  dependencies?: string[];
  registryDependencies?: string[];
}

const root = resolve(import.meta.dirname, "..");
const registryOutputPath = resolve(root, "public/r");
const expectedHomepage = registryConfig.homepage;
const errors: string[] = [];

async function readRegistryIndex() {
  const filePath = resolve(registryOutputPath, "registry.json");

  try {
    return JSON.parse(await readFile(filePath, "utf8")) as RegistryIndex;
  }
  catch (error) {
    const message = error instanceof Error ? error.message : String(error);
    errors.push(`registry: failed to read ${filePath}. Run pnpm registry:build first. ${message}`);
    return null;
  }
}

async function readRegistryItem(name: string) {
  const filePath = resolve(registryOutputPath, `${name}.json`);

  try {
    return JSON.parse(await readFile(filePath, "utf8")) as RegistryItem;
  }
  catch (error) {
    const message = error instanceof Error ? error.message : String(error);
    errors.push(`${name}: failed to read ${filePath}. Run pnpm registry:build first. ${message}`);
    return null;
  }
}

function assertExactValues(itemName: string, fieldName: string, actual: string[], expected: string[]) {
  const actualSet = new Set(actual);
  const expectedSet = new Set(expected);

  for (const value of expectedSet) {
    if (!actualSet.has(value)) {
      errors.push(`${itemName}: missing ${fieldName} ${value}`);
    }
  }

  for (const value of actualSet) {
    if (!expectedSet.has(value)) {
      errors.push(`${itemName}: unexpected ${fieldName} ${value}`);
    }
  }
}

const registryIndex = await readRegistryIndex();
if (registryIndex?.homepage !== expectedHomepage) {
  errors.push(`registry: expected homepage ${expectedHomepage}, received ${registryIndex?.homepage ?? "missing"}`);
}

const stackhackerRegistryUrl = `${expectedHomepage}/r`;
const stackhackerDependency = (name: string) => `${stackhackerRegistryUrl}/${name}.json`;

const expectedItems: Record<string, ExpectedRegistryItem> = {
  "chat-prompt-submit": {
    dependencies: ["@lucide/vue"],
    registryDependencies: ["button"],
  },
  "chat-prompt": {
    dependencies: [],
    registryDependencies: [],
  },
  "chat-messages": {
    dependencies: ["@lucide/vue", "ai"],
    registryDependencies: ["button", stackhackerDependency("chat-message")],
  },
  "chat-message": {
    dependencies: ["@lucide/vue", "ai"],
    registryDependencies: ["button", "tooltip"],
  },
  "docs-search-modal": {
    dependencies: ["@lucide/vue"],
    registryDependencies: [],
  },
  "pricing-plans": {
    dependencies: ["@lucide/vue"],
    registryDependencies: ["badge", "button", "card"],
  },
  "reasoning-disclosure": {
    dependencies: ["@lucide/vue"],
    registryDependencies: ["button", "collapsible"],
  },
  "home-cta": {
    dependencies: [],
    registryDependencies: ["button"],
  },
};

if (registryIndex) {
  const expectedNames = new Set(Object.keys(expectedItems));
  const actualNames = new Set(registryIndex.items.map(item => item.name));

  for (const name of expectedNames) {
    if (!actualNames.has(name)) {
      errors.push(`registry: missing item ${name}`);
    }
  }

  for (const name of actualNames) {
    if (!expectedNames.has(name)) {
      errors.push(`registry: unexpected item ${name}. Add registry:verify expectations for this item.`);
    }
  }
}

for (const [name, expected] of Object.entries(expectedItems)) {
  const item = await readRegistryItem(name);
  if (!item) continue;

  assertExactValues(name, "package dependency", item.dependencies ?? [], expected.dependencies ?? []);
  assertExactValues(name, "registry dependency", item.registryDependencies ?? [], expected.registryDependencies ?? []);
}

if (errors.length > 0) {
  console.error("Registry verification failed:");
  for (const error of errors) {
    console.error(`- ${error}`);
  }
  process.exit(1);
}

console.log("✓ Registry dependency verification passed");
