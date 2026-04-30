"use client";

import { Component, useMemo, useState } from "react";
import type { ComponentType, ReactNode } from "react";
import HostvibePricingSection from "@/components/hostvibe/pricing/pricing-section";
import PricingServiceSelector from "@/components/hostvibe/pricing/pricing-service-selector";
import HostvibeSearchPopup from "@/components/hostvibe/header/search-popup";
import { getHostvibeHomepageData } from "@/lib/hostvibe/data";
import type { TemplateCatalogEntry } from "./types";

type Props = {
  entries: TemplateCatalogEntry[];
};

function PreviewPricingServiceSelector() {
  const homepage = getHostvibeHomepageData() as unknown as {
    pricingThree?: { tabs?: Array<{ id: string; label: string }> };
  };
  const tabs = homepage.pricingThree?.tabs || [];
  return <PricingServiceSelector tabs={tabs} />;
}

const PREVIEW_COMPONENTS: Record<string, ComponentType> = {
  "pricing-section": HostvibePricingSection,
  "pricing-service-selector": PreviewPricingServiceSelector,
  "header-search-popup": () => (
    <HostvibeSearchPopup
      open={false}
      query=""
      trendingSearches={["vps hosting", "domain transfer"]}
      recentSearches={["namecadre.com"]}
      onClose={() => {}}
      onSearch={() => {}}
      onQueryChange={() => {}}
    />
  ),
};

class PreviewErrorBoundary extends Component<
  { children: ReactNode },
  { hasError: boolean }
> {
  constructor(props: { children: ReactNode }) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError() {
    return { hasError: true };
  }

  override componentDidUpdate(prevProps: { children: ReactNode }) {
    if (prevProps.children !== this.props.children && this.state.hasError) {
      this.setState({ hasError: false });
    }
  }

  override render() {
    if (this.state.hasError) {
      return (
        <div className="rounded-xl border border-amber-300 bg-amber-50 p-4 text-sm text-amber-900">
          Preview failed for this entry. Use the import path below in a real page context.
        </div>
      );
    }
    return this.props.children;
  }
}

function ImportSnippet({ path }: { path: string | null }) {
  if (!path) return <code className="text-xs text-slate-500">No component import</code>;
  return (
    <code className="block overflow-x-auto rounded bg-slate-900 px-3 py-2 text-xs text-slate-100">
      {`import Item from "@/${path}";`}
    </code>
  );
}

export default function TemplateLibrary({ entries }: Props) {
  const [query, setQuery] = useState("");
  const [sourceFilter, setSourceFilter] = useState<"all" | "component" | "reference-only">("all");
  const [kindFilter, setKindFilter] = useState<"all" | "code" | "asset" | "template" | "data" | "other">("all");
  const [previewFilter, setPreviewFilter] = useState<"all" | "previewable" | "non-previewable">("all");

  const filtered = useMemo(() => {
    const needle = query.trim().toLowerCase();
    return entries.filter((entry) => {
      if (sourceFilter !== "all" && entry.sourceType !== sourceFilter) return false;
      if (kindFilter !== "all" && entry.fileKind !== kindFilter) return false;
      if (previewFilter === "previewable" && !entry.previewable) return false;
      if (previewFilter === "non-previewable" && entry.previewable) return false;

      if (!needle) return true;
      const hay = [
        entry.name,
        entry.componentPath ?? "",
        entry.sourceTemplatePath ?? "",
        entry.statusNote,
      ]
        .join(" ")
        .toLowerCase();
      return hay.includes(needle);
    });
  }, [entries, kindFilter, previewFilter, query, sourceFilter]);

  return (
    <main className="min-h-screen bg-slate-50 px-4 py-8 text-slate-900 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-7xl">
        <header className="mb-6 rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
          <h1 className="text-2xl font-semibold tracking-tight sm:text-3xl">Template Library</h1>
          <p className="mt-2 text-sm text-slate-600 sm:text-base">
            Browse component files and Hostvibe source templates. Use filters to find reusable blocks and inspect import paths.
          </p>
          <div className="mt-4 grid gap-3 sm:grid-cols-4">
            <input
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Search name, path, template..."
              className="w-full rounded-lg border border-slate-300 bg-white px-3 py-2 text-sm outline-none ring-blue-500 focus:ring-2"
            />
            <select
              value={sourceFilter}
              onChange={(e) => setSourceFilter(e.target.value as "all" | "component" | "reference-only")}
              className="rounded-lg border border-slate-300 bg-white px-3 py-2 text-sm outline-none ring-blue-500 focus:ring-2"
            >
              <option value="all">All source types</option>
              <option value="component">Component files</option>
              <option value="reference-only">Reference-only templates</option>
            </select>
            <select
              value={previewFilter}
              onChange={(e) => setPreviewFilter(e.target.value as "all" | "previewable" | "non-previewable")}
              className="rounded-lg border border-slate-300 bg-white px-3 py-2 text-sm outline-none ring-blue-500 focus:ring-2"
            >
              <option value="all">All preview states</option>
              <option value="previewable">Preview available</option>
              <option value="non-previewable">No preview</option>
            </select>
            <select
              value={kindFilter}
              onChange={(e) => setKindFilter(e.target.value as "all" | "code" | "asset" | "template" | "data" | "other")}
              className="rounded-lg border border-slate-300 bg-white px-3 py-2 text-sm outline-none ring-blue-500 focus:ring-2"
            >
              <option value="all">All file kinds</option>
              <option value="code">Code</option>
              <option value="template">Template</option>
              <option value="data">Data</option>
              <option value="asset">Asset</option>
              <option value="other">Other</option>
            </select>
          </div>
        </header>

        <div className="mb-3 text-sm text-slate-600">Showing {filtered.length} entries</div>
        <section className="space-y-6">
          {filtered.map((entry) => {
            const SelectedPreview = entry.previewKey ? PREVIEW_COMPONENTS[entry.previewKey] : null;
            return (
              <article key={entry.id} className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
                <div className="flex flex-wrap items-center gap-2">
                  <h2 className="text-lg font-semibold tracking-tight">{entry.name}</h2>
                  <span className="rounded-full bg-slate-100 px-2 py-1 text-xs text-slate-700">{entry.sourceType}</span>
                  <span className="rounded-full bg-slate-100 px-2 py-1 text-xs text-slate-700">{entry.fileKind}</span>
                  <span className="rounded-full bg-slate-100 px-2 py-1 text-xs text-slate-700">
                    {entry.previewable ? "live preview" : "code preview"}
                  </span>
                </div>
                <div className="mt-3 grid gap-4 md:grid-cols-2">
                  <div>
                    <p className="mb-2 text-xs font-semibold uppercase tracking-wide text-slate-500">Preview 1: Component</p>
                    <div className="rounded-xl border border-slate-200 bg-slate-50 p-3">
                      {SelectedPreview ? (
                        <PreviewErrorBoundary>
                          <SelectedPreview />
                        </PreviewErrorBoundary>
                      ) : (
                        <pre className="max-h-[420px] overflow-auto rounded-lg bg-slate-900 p-3 text-xs leading-5 text-slate-100">
                          {entry.previewText || "No preview source available."}
                        </pre>
                      )}
                    </div>
                  </div>
                  <div>
                    <p className="mb-2 text-xs font-semibold uppercase tracking-wide text-slate-500">Preview 2: Template</p>
                    <div className="rounded-xl border border-slate-200 bg-slate-50 p-3">
                      <pre className="max-h-[420px] overflow-auto rounded-lg bg-slate-900 p-3 text-xs leading-5 text-slate-100">
                        {entry.templatePreviewText || entry.sourceTemplatePath || "No template preview available."}
                      </pre>
                    </div>
                  </div>
                </div>
                <div className="mt-4 grid gap-3 md:grid-cols-2">
                  <div>
                    <p className="mb-1 text-xs font-semibold uppercase tracking-wide text-slate-500">Import</p>
                    <ImportSnippet path={entry.componentPath} />
                  </div>
                  <div>
                    <p className="mb-1 text-xs font-semibold uppercase tracking-wide text-slate-500">Source template path</p>
                    <code className="block overflow-x-auto rounded bg-slate-100 px-3 py-2 text-xs text-slate-700">
                      {entry.sourceTemplatePath ?? "No mapped template path"}
                    </code>
                  </div>
                </div>
              </article>
            );
          })}
          {!filtered.length ? <p className="text-sm text-slate-600">No entries match current filters.</p> : null}
        </section>
      </div>
    </main>
  );
}
