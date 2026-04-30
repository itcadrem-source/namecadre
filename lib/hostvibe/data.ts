import businessEmailRaw from "@/data/hostvibe/business-email.json";
import cloudHostingRaw from "@/data/hostvibe/cloud-hosting.json";
import codeguardRaw from "@/data/hostvibe/codeguard.json";
import commonSectionRaw from "@/data/hostvibe/common-section.json";
import dedicatedServerRaw from "@/data/hostvibe/dedicated-server.json";
import domainPromosRaw from "@/data/hostvibe/domain-promos.json";
import domainSearchRaw from "@/data/hostvibe/domain-search.json";
import enterpriseEmailRaw from "@/data/hostvibe/enterprise-email.json";
import footerRaw from "@/data/hostvibe/footer.json";
import googleWorkspaceRaw from "@/data/hostvibe/google-workspace.json";
import headerMenuRaw from "@/data/hostvibe/header-menu.json";
import headerUtilitiesRaw from "@/data/hostvibe/header-utilities.json";
import homepageRaw from "@/data/hostvibe/homepage.json";
import liveHeaderMenuRaw from "@/data/hostvibe/live/header-menu.json";
import liveHeaderUtilitiesRaw from "@/data/hostvibe/live/header-utilities.json";
import liveQuickPadRaw from "@/data/hostvibe/live/quick-pad.json";
import quickPadRaw from "@/data/hostvibe/quick-pad.json";
import resellerHostingRaw from "@/data/hostvibe/reseller-hosting.json";
import sharedHostingRaw from "@/data/hostvibe/shared-hosting.json";
import sitelockRaw from "@/data/hostvibe/sitelock.json";
import sslCertificatesRaw from "@/data/hostvibe/ssl-certificates.json";
import transferDomainRaw from "@/data/hostvibe/transfer-domain.json";
import vpsServerRaw from "@/data/hostvibe/vps-server.json";
import wordpressHostingRaw from "@/data/hostvibe/wordpress-hosting.json";

import type {
  HostvibeFooterData,
  HostvibeHeaderData,
  HostvibeHeaderUtilityData,
  HostvibeHomepageData,
  HostvibeLiveHeaderData,
  HostvibeLiveQuickPadData,
  HostvibeLiveUtilityData,
  HostvibePageDataMap,
  HostvibeQuickPadData,
} from "./types";

const HOSTVIBE_IMAGE_KEYS = new Set([
  "image",
  "images",
  "main",
  "ratingImage",
  "src",
  "flag",
  "shape",
  "shape1",
  "shape2",
  "primary",
  "primaryDark",
  "primaryLight",
  "mobile",
  "mobileDark",
  "mobileLight",
]);

const HOSTVIBE_LINK_KEYS = new Set(["href", "link", "url", "value"]);

const HOSTVIBE_NEXT_IMAGE_PREFIX = "https://namecadre.com/_next/image?url=";

function isPlainObject(value: unknown): value is Record<string, unknown> {
  return typeof value === "object" && value !== null && !Array.isArray(value);
}

function unwrapNextImageUrl(value: string): string {
  if (!value.startsWith(HOSTVIBE_NEXT_IMAGE_PREFIX)) {
    return value;
  }

  try {
    const parsed = new URL(value);
    const source = parsed.searchParams.get("url");
    return source ? decodeURIComponent(source) : value;
  } catch {
    return value;
  }
}

export function normalizeHostvibeImagePath(value: string): string {
  const unwrapped = unwrapNextImageUrl(value);

  if (unwrapped !== value) {
    return unwrapped;
  }

  if (/^(?:https?:|data:|blob:)/i.test(value)) {
    return value;
  }

  const normalized = value.replace(/^\/?templates\/hostvibe\//, "/hostvibe/");
  return normalized.startsWith("/") ? normalized : `/${normalized}`;
}

export function normalizeHostvibeLinkPath(value: string): string {
  if (/^(?:https?:|mailto:|tel:|#|\?)/i.test(value)) {
    return value;
  }

  const match = value.match(/^([^?#]*)(.*)$/);
  const pathname = match?.[1] ?? value;
  const suffix = match?.[2] ?? "";
  const normalizedPathname = pathname
    .replace(/\/index\.php$/i, "/")
    .replace(/\.php$/i, "");

  return `${normalizedPathname}${suffix}`;
}

export function normalizeHostvibeValue<T>(
  value: T,
  key?: string,
  parentKey?: string
): T {
  if (Array.isArray(value)) {
    return value.map((item) => normalizeHostvibeValue(item, key, parentKey)) as T;
  }

  if (isPlainObject(value)) {
    return Object.fromEntries(
      Object.entries(value).map(([entryKey, entryValue]) => [
        entryKey,
        normalizeHostvibeValue(entryValue, entryKey, key),
      ])
    ) as T;
  }

  if (typeof value === "string") {
    if (key && HOSTVIBE_IMAGE_KEYS.has(key)) {
      return normalizeHostvibeImagePath(value) as T;
    }

    if (key && HOSTVIBE_LINK_KEYS.has(key)) {
      return normalizeHostvibeLinkPath(value) as T;
    }

    if (key === "value" && parentKey && HOSTVIBE_LINK_KEYS.has(parentKey)) {
      return normalizeHostvibeLinkPath(value) as T;
    }
  }

  return value;
}

function hasItems<T>(value?: T[]): value is T[] {
  return Array.isArray(value) && value.length > 0;
}

function mergeHostvibeHomepageData(): HostvibeHomepageData {
  return normalizeHostvibeValue({
    ...commonSectionRaw,
    ...homepageRaw,
  }) as HostvibeHomepageData;
}

function mergeHeaderData(
  live: HostvibeLiveHeaderData,
  local: HostvibeHeaderData
): HostvibeHeaderData {
  const railGroupKeys = new Set([
    ...Object.keys(local.railGroups || {}),
    ...Object.keys(live.railGroups || {}),
  ]);

  const railKeys = new Set([
    ...Object.keys(local.rails || {}),
    ...Object.keys(live.rails || {}),
  ]);

  const railGroups: Record<string, string[]> = {};
  for (const key of railGroupKeys) {
    const liveList = live.railGroups?.[key];
    const localList = local.railGroups?.[key];
    railGroups[key] = hasItems(liveList) ? liveList : localList || [];
  }

  const rails: HostvibeHeaderData["rails"] = {};
  for (const key of railKeys) {
    const liveRail = live.rails?.[key];
    const localRail = local.rails?.[key];
    if (!liveRail && !localRail) continue;
    rails[key] = {
      title: liveRail?.title || localRail?.title || key,
      icon: liveRail?.icon || localRail?.icon,
      sections: hasItems(liveRail?.sections)
        ? liveRail.sections
        : localRail?.sections || [],
    };
  }

  return {
    tabs: hasItems(live.tabs) ? live.tabs : local.tabs || [],
    railGroups,
    rails,
    notifications: hasItems(live.notifications)
      ? live.notifications
      : local.notifications || [],
  };
}

function mergeQuickPadData(
  live: HostvibeLiveQuickPadData,
  local: HostvibeQuickPadData
): HostvibeQuickPadData {
  return {
    sections: hasItems(live.sections) ? live.sections : local.sections || [],
  };
}

function mergeUtilityData(
  live: HostvibeLiveUtilityData,
  local: HostvibeHeaderUtilityData
): HostvibeHeaderUtilityData {
  return {
    locales: hasItems(live.locales) ? live.locales : local.locales || [],
    currencies: hasItems(live.currencies) ? live.currencies : local.currencies || [],
    accountLinks: hasItems(live.accountLinks)
      ? live.accountLinks
      : local.accountLinks || [],
    logos: live.logos || local.logos,
    mobileMenu: live.mobileMenu || local.mobileMenu,
  };
}

const localHeaderData = normalizeHostvibeValue(headerMenuRaw) as HostvibeHeaderData;
const localQuickPadData = normalizeHostvibeValue(quickPadRaw) as HostvibeQuickPadData;
const localUtilityData = normalizeHostvibeValue(
  headerUtilitiesRaw
) as HostvibeHeaderUtilityData;

export const hostvibeLiveHeaderData = normalizeHostvibeValue(
  liveHeaderMenuRaw
) as HostvibeLiveHeaderData;
export const hostvibeLiveQuickPadData = normalizeHostvibeValue(
  liveQuickPadRaw
) as HostvibeLiveQuickPadData;
export const hostvibeLiveUtilityData = normalizeHostvibeValue(
  liveHeaderUtilitiesRaw
) as HostvibeLiveUtilityData;

export const hostvibeHeaderData = mergeHeaderData(
  hostvibeLiveHeaderData,
  localHeaderData
);
export const hostvibeHomepageData = mergeHostvibeHomepageData();
export const hostvibeFooterData = normalizeHostvibeValue(
  footerRaw
) as HostvibeFooterData;
export const hostvibeQuickPadData = mergeQuickPadData(
  hostvibeLiveQuickPadData,
  localQuickPadData
);
export const hostvibeHeaderUtilityData = mergeUtilityData(
  hostvibeLiveUtilityData,
  localUtilityData
);

export const hostvibePageDataMap = normalizeHostvibeValue({
  "business-email": businessEmailRaw,
  "cloud-hosting": cloudHostingRaw,
  codeguard: codeguardRaw,
  "common-section": commonSectionRaw,
  "dedicated-server": dedicatedServerRaw,
  "domain-promos": domainPromosRaw,
  "domain-search": domainSearchRaw,
  "enterprise-email": enterpriseEmailRaw,
  footer: footerRaw,
  "google-workspace": googleWorkspaceRaw,
  "header-menu": headerMenuRaw,
  "header-utilities": headerUtilitiesRaw,
  homepage: homepageRaw,
  "quick-pad": quickPadRaw,
  "reseller-hosting": resellerHostingRaw,
  "shared-hosting": sharedHostingRaw,
  sitelock: sitelockRaw,
  "ssl-certificates": sslCertificatesRaw,
  "transfer-domain": transferDomainRaw,
  "vps-server": vpsServerRaw,
  "wordpress-hosting": wordpressHostingRaw,
}) as HostvibePageDataMap;

export function getHostvibeHeaderData(): HostvibeHeaderData {
  return hostvibeHeaderData;
}

export function getHostvibeLiveHeaderData(): HostvibeLiveHeaderData {
  return hostvibeLiveHeaderData;
}

export function getHostvibeHomepageData(): HostvibeHomepageData {
  return hostvibeHomepageData;
}

export function getHostvibeFooterData(): HostvibeFooterData {
  return hostvibeFooterData;
}

export function getHostvibeQuickPadData(): HostvibeQuickPadData {
  return hostvibeQuickPadData;
}

export function getHostvibeLiveQuickPadData(): HostvibeLiveQuickPadData {
  return hostvibeLiveQuickPadData;
}

export function getHostvibeHeaderUtilityData(): HostvibeHeaderUtilityData {
  return hostvibeHeaderUtilityData;
}

export function getHostvibeLiveUtilityData(): HostvibeLiveUtilityData {
  return hostvibeLiveUtilityData;
}

export function getHostvibePageData(key: string) {
  return hostvibePageDataMap[key];
}

export function getAllHostvibePageData(): HostvibePageDataMap {
  return hostvibePageDataMap;
}
