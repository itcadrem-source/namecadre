"use client";

import Link from "next/link";
import { useEffect, useMemo, useState } from "react";

type PricingTab = {
  id: string;
  label: string;
};

type Props = {
  tabs: PricingTab[];
};

const tabIconMap: Record<string, string> = {
  startup: "fa fa-rocket",
  pro: "fa fa-gem",
  vps: "fa fa-server",
  email: "fa fa-envelope",
};

const tabHashMap: Record<string, string> = {
  startup: "startup",
  pro: "pro",
  vps: "vps-hosting",
  email: "email",
};

const hashToTabMap: Record<string, string> = {
  startup: "startup",
  pro: "pro",
  vps: "vps",
  "vps-hosting": "vps",
  email: "email",
  "e-mail": "email",
};

export default function PricingServiceSelector({ tabs }: Props) {
  const defaultTab = tabs[0]?.id || "startup";
  const [activeTab, setActiveTab] = useState(defaultTab);

  const validTabIds = useMemo(() => new Set(tabs.map((tab) => tab.id)), [tabs]);

  useEffect(() => {
    const syncFromHash = () => {
      const raw = window.location.hash.replace("#", "").toLowerCase().trim();
      const mapped = hashToTabMap[raw];
      if (!mapped || !validTabIds.has(mapped)) {
        setActiveTab(defaultTab);
        return;
      }
      setActiveTab(mapped);
    };

    syncFromHash();
    window.addEventListener("hashchange", syncFromHash);
    return () => window.removeEventListener("hashchange", syncFromHash);
  }, [defaultTab, validTabIds]);

  return (
    <div className="mt-8 grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
      {tabs.map((tab) => {
        const isActive = tab.id === activeTab;
        return (
          <Link
            key={tab.id}
            href={`#${tabHashMap[tab.id] || "pricing-three"}`}
            onClick={() => {
              setActiveTab(tab.id);
              if (typeof window !== "undefined") {
                window.dispatchEvent(
                  new CustomEvent("pricing-tab-change", {
                    detail: { tabId: tab.id },
                  })
                );
              }
            }}
            className={`flex cursor-pointer items-center gap-3 rounded-2xl border px-4 py-3 text-sm font-semibold transition-all duration-200 ${
              isActive
                ? "border-[var(--hv-brand)] bg-[var(--hv-brand-soft)] text-[var(--hv-brand)] shadow-[0_10px_24px_rgba(33,72,245,0.24)]"
                : "border-slate-200 bg-white text-slate-800 shadow-[0_14px_30px_-24px_rgba(15,23,42,0.34)] hover:bg-slate-100"
            }`}
          >
            <span
              className={`inline-flex h-8 w-8 items-center justify-center rounded-full ${
                isActive ? "bg-white text-[var(--hv-brand)]" : "bg-sky-100 text-sky-700"
              }`}
            >
              <i className={tabIconMap[tab.id] || "fa fa-layer-group"} aria-hidden />
            </span>
            <span>{tab.label}</span>
          </Link>
        );
      })}
    </div>
  );
}
