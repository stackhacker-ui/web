import { dirname, resolve } from "node:path";
import { fileURLToPath } from "node:url";
import { cp, mkdir, readFile, rm, unlink, writeFile } from "node:fs/promises";
import pkg from "../package.json";
import components from "../components.json";
import { generateShadcnRegistry } from "shadcn-vue-registry";
import { x } from "tinyexec";

(async () => {
  const __filename = fileURLToPath(import.meta.url);
  const __dirname = dirname(__filename);

  const cwd = resolve(__dirname, "../");
  const registryPath = resolve(cwd, "./app/registry");
  const outputPath = resolve(cwd, "./public/r/");
  const fieldBlockPath = resolve(registryPath, "blocks/field");
  const fieldUiPath = resolve(registryPath, "components/ui/field");
  const config = {
    root: cwd,
    name: pkg.name,
    homepage: "https://ui.stackhacker.io",
    registries: components.registries,
    cwd: registryPath,
    output: registryPath,
  };

  const registryJson = await generateShadcnRegistry(config);

  const customItemNames = new Set(registryJson.items.map(item => item.name));
  const itemPackageDependencies: Record<string, string[]> = {
    "chat-message": ["@lucide/vue"],
    "field": ["@vueuse/core", "reka-ui"],
  };

  for (const item of registryJson.items) {
    const dependencies = new Set(item.dependencies ?? []);
    const registryDependencies = new Set(item.registryDependencies ?? []);

    if (item.name === "field") {
      await rm(fieldUiPath, { recursive: true, force: true });
      await mkdir(fieldUiPath, { recursive: true });
      await cp(fieldBlockPath, fieldUiPath, { recursive: true });

      item.type = "registry:ui";
      item.files = item.files.map(file => ({
        ...file,
        path: file.path.replace("blocks/field", "components/ui/field"),
        type: "registry:ui",
      }));
    }

    for (const dependency of itemPackageDependencies[item.name] ?? []) {
      dependencies.add(dependency);
    }

    for (const file of item.files) {
      const filePath = resolve(registryPath, file.path);
      const content = await readFile(filePath, "utf8").catch(() => "");

      for (const dependency of customItemNames) {
        if (dependency === item.name) continue;
        if (
          content.includes(`../${dependency}`)
          || content.includes(`@/components/${dependency}`)
        ) {
          registryDependencies.add(dependency);
        }
      }
    }

    item.dependencies = [...dependencies];
    item.registryDependencies = [...registryDependencies].map((dependency) => {
      if (!customItemNames.has(dependency)) return dependency;
      return `${config.homepage}/r/${dependency}.json`;
    });
  }

  const registryJsonPath = resolve(registryPath, "registry.json");
  await mkdir(dirname(registryJsonPath), { recursive: true });
  await writeFile(registryJsonPath, JSON.stringify(registryJson, null, 2));
  console.log(`✓ Registry JSON saved to: ${registryJsonPath}`);

  await mkdir(outputPath, { recursive: true });
  console.log(`✓ Output directory created: ${outputPath}`);

  await x("shadcn-vue", ["build", "-c", registryPath, "-o", outputPath], {
    nodeOptions: {
      cwd,
      shell: true,
    },
  });

  await unlink(registryJsonPath);
  await rm(resolve(registryPath, "components"), { recursive: true, force: true });

  console.log("\n✓ Registry build complete");
  console.log("Registry files available at:\n  /r/registry.json\n  /r/{name}.json");
})();
