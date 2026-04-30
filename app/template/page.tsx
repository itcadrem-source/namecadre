import fs from "node:fs/promises";
import path from "node:path";
import TemplateLibrary from "./template-library";
import type { TemplateCatalogEntry } from "./types";
import { HOSTVIBE_LIVE_PREVIEW_REGISTRY } from "./hostvibe-live-registry";

const SOURCE_TEMPLATE_PATTERN = /HOSTVIBE_SOURCE_TEMPLATE\s*=\s*["']([^"']+)["']/;

async function walkFiles(rootDir: string): Promise<string[]> {
  const out: string[] = [];

  async function walk(current: string) {
    const entries = await fs.readdir(current, { withFileTypes: true });
    for (const entry of entries) {
      const full = path.join(current, entry.name);
      if (entry.isDirectory()) {
        await walk(full);
      } else {
        out.push(full);
      }
    }
  }

  await walk(rootDir);
  return out;
}

function toPosixRelative(base: string, file: string): string {
  return path.relative(base, file).split(path.sep).join("/");
}

function getDisplayName(filePath: string): string {
  const base = path.basename(filePath, path.extname(filePath));
  return base
    .replace(/[-_]/g, " ")
    .replace(/\b\w/g, (m) => m.toUpperCase());
}

function getFileKind(filePath: string): "code" | "asset" | "template" | "data" | "other" {
  const ext = path.extname(filePath).toLowerCase();
  if (ext === ".tpl") return "template";
  if (ext === ".json") return "data";
  if ([".ts", ".tsx", ".js", ".jsx", ".mjs", ".mts", ".css", ".scss", ".md", ".txt"].includes(ext)) {
    return "code";
  }
  if ([".png", ".jpg", ".jpeg", ".gif", ".webp", ".svg", ".ico", ".woff", ".woff2", ".ttf"].includes(ext)) {
    return "asset";
  }
  return "other";
}

function makePreviewText(content: string): string {
  const lines = content.split("\n").slice(0, 220);
  return lines.join("\n");
}

async function buildCatalog(): Promise<TemplateCatalogEntry[]> {
  const repoRoot = process.cwd();
  const componentsRoot = path.join(repoRoot, "components", "hostvibe");

  const componentFilesAbs = await walkFiles(componentsRoot);
  const previewablePaths = new Set(HOSTVIBE_LIVE_PREVIEW_REGISTRY.map((entry) => entry.componentPath));

  const componentEntries: TemplateCatalogEntry[] = [];

  for (const fileAbs of componentFilesAbs) {
    const relativePath = toPosixRelative(repoRoot, fileAbs);
    const fileKind = getFileKind(relativePath);
    let fileContent = "";
    let previewText = "";
    try {
      fileContent = await fs.readFile(fileAbs, "utf8");
      previewText = makePreviewText(fileContent);
    } catch {
      previewText = "Binary or unsupported text encoding. Preview unavailable.";
    }
    const sourceTemplateMatch = fileContent.match(SOURCE_TEMPLATE_PATTERN);
    const sourceTemplatePath = sourceTemplateMatch?.[1] ?? null;
    let templatePreviewText: string | null = null;

    if (sourceTemplatePath) {
      const templateAbs = path.join(repoRoot, sourceTemplatePath);
      try {
        const templateRaw = await fs.readFile(templateAbs, "utf8");
        templatePreviewText = makePreviewText(templateRaw);
      } catch {
        templatePreviewText = null;
      }
    }

    const relativeWithinHostvibe = relativePath.replace(/^components\/hostvibe\//, "");
    const domain = relativeWithinHostvibe.split("/")[0] || "hostvibe";

    componentEntries.push({
      id: `component:${relativePath}`,
      name: getDisplayName(relativePath),
      componentPath: relativePath,
      sourceTemplatePath,
      sourceType: "component",
      domain,
      fileKind,
      hostvibe: true,
      previewable: previewablePaths.has(relativePath),
      previewKey: previewablePaths.has(relativePath) ? relativePath : null,
      previewText,
      templatePreviewText,
      statusNote: previewablePaths.has(relativePath)
        ? "Live preview attempted"
        : "No default export registry match; showing diagnostics preview",
    });
  }
  return componentEntries.sort((a, b) =>
    a.name.localeCompare(b.name)
  );
}

export default async function TemplatePage() {
  const entries = await buildCatalog();

  return <TemplateLibrary entries={entries} />;
}
