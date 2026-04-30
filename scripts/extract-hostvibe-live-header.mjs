#!/usr/bin/env node

import { mkdir, writeFile } from "node:fs/promises";
import { resolve } from "node:path";
import { execFileSync } from "node:child_process";

const SOURCE_URL = "https://whmcs.dev/";
const OUTPUT_DIR = resolve(process.cwd(), "data/hostvibe/live");
const REQUIRED_DOM_TOKENS = [
  'id="hvxHeader"',
  'id="hvxMobileMenu"',
  'id="hvxQuickPad"',
  "data-hvx-tab=",
  "data-hvx-rail=",
  "data-hvx-rail-panel=",
  "data-hvx-mobile-rail=",
  "data-hvx-qp-item",
];

function decodeHtml(value = "") {
  return value
    .replace(/&#(\d+);/g, (_, code) => String.fromCharCode(Number(code)))
    .replace(/&#x([0-9a-fA-F]+);/g, (_, code) =>
      String.fromCharCode(parseInt(code, 16))
    )
    .replace(/&quot;/g, '"')
    .replace(/&#39;/g, "'")
    .replace(/&amp;/g, "&")
    .replace(/&lt;/g, "<")
    .replace(/&gt;/g, ">");
}

function stripTags(value = "") {
  return decodeHtml(value.replace(/<[^>]+>/g, " ").replace(/\s+/g, " ").trim());
}

function parseAttrs(tag = "") {
  const attrs = {};
  const re = /([a-zA-Z0-9_:-]+)\s*=\s*"([^"]*)"/g;
  for (const match of tag.matchAll(re)) {
    attrs[match[1]] = decodeHtml(match[2]);
  }
  return attrs;
}

function extractRailList(html, listId) {
  const listRe = new RegExp(
    `<ul class="hvx-rail-list" id="${listId}">([\\s\\S]*?)</ul>`,
    "i"
  );
  const listMatch = html.match(listRe);
  if (!listMatch) return [];

  const buttons = [];
  const btnRe =
    /<button[^>]*class="hvx-rail-item"[^>]*data-hvx-rail="([^"]+)"[^>]*>([\s\S]*?)<\/button>/gi;
  for (const match of listMatch[1].matchAll(btnRe)) {
    const key = decodeHtml(match[1]).trim();
    const iconMatch = match[2].match(/<i[^>]*class="([^"]+)"/i);
    const label = stripTags(match[2].replace(/<i[^>]*>[\s\S]*?<\/i>/i, ""));
    buttons.push({
      key,
      title: label,
      icon: iconMatch ? decodeHtml(iconMatch[1]).trim() : undefined,
    });
  }
  return buttons;
}

function extractGroupsFromPanel(panelHtml) {
  const groups = [];
  const groupRe =
    /<section class="hvx-group"[^>]*data-hvx-group="[^"]+"[^>]*>([\s\S]*?)<\/section>/gi;

  for (const groupMatch of panelHtml.matchAll(groupRe)) {
    const groupHtml = groupMatch[1];
    const headingMatch = groupHtml.match(
      /<h6[^>]*class="hvx-group-title"[^>]*>([\s\S]*?)<\/h6>/i
    );
    const heading = headingMatch ? stripTags(headingMatch[1]) : "";

    const cards = [];
    const cardRe =
      /<a[^>]*class="hvx-card-link[^"]*"[^>]*href="([^"]*)"[^>]*>([\s\S]*?)<\/a>/gi;
    for (const cardMatch of groupHtml.matchAll(cardRe)) {
      const href = decodeHtml(cardMatch[1]).trim();
      const cardHtml = cardMatch[2];
      const titleBlockMatch = cardHtml.match(
        /<p[^>]*class="hvx-card-title"[^>]*>([\s\S]*?)<\/p>/i
      );
      const titleBlock = titleBlockMatch ? titleBlockMatch[1] : "";
      const badgeMatch = titleBlock.match(
        /<span[^>]*class="hvx-badge"[^>]*>([\s\S]*?)<\/span>/i
      );
      const badge = badgeMatch ? stripTags(badgeMatch[1]) : undefined;
      const title = stripTags(titleBlock.replace(/<span[\s\S]*?<\/span>/i, ""));
      const descMatch = cardHtml.match(
        /<p[^>]*class="hvx-card-desc"[^>]*>([\s\S]*?)<\/p>/i
      );
      const desc = descMatch ? stripTags(descMatch[1]) : "";

      cards.push({
        title,
        desc,
        url: href,
        ...(badge ? { badge } : {}),
      });
    }

    groups.push({ heading, cards });
  }
  return groups;
}

function extractPanels(html) {
  const panels = {};
  const chunks = html.split('<section class="hvx-rail-panel');
  for (const chunk of chunks.slice(1)) {
    const panelHtml = `<section class="hvx-rail-panel${chunk}`;
    const railKeyMatch = panelHtml.match(/data-hvx-rail-panel="([^"]+)"/i);
    if (!railKeyMatch) continue;
    const railKey = decodeHtml(railKeyMatch[1]).trim();
    panels[railKey] = {
      sections: extractGroupsFromPanel(panelHtml),
    };
  }
  return panels;
}

function extractTabs(html) {
  const tabs = [];
  const tabRe =
    /<button[^>]*class="hvx-tab"[^>]*data-hvx-tab="([^"]+)"[^>]*data-hvx-default-rail="([^"]+)"[^>]*>([\s\S]*?)<\/button>/gi;
  for (const match of html.matchAll(tabRe)) {
    tabs.push({
      key: decodeHtml(match[1]).trim(),
      defaultRail: decodeHtml(match[2]).trim(),
      label: stripTags(match[3]),
    });
  }
  return tabs;
}

function extractQuickPad(html) {
  const sections = [];
  const qpStart = html.indexOf('<div class="hvx-qp-content"');
  if (qpStart < 0) return { sections };
  const qpHtml = html.slice(qpStart);

  const sectionRe = /<section class="hvx-qp-section">([\s\S]*?)<\/section>/gi;
  for (const sectionMatch of qpHtml.matchAll(sectionRe)) {
    const block = sectionMatch[1];
    const headingMatch = block.match(/<h5[^>]*>([\s\S]*?)<\/h5>/i);
    const heading = headingMatch ? stripTags(headingMatch[1]) : "Section";
    const items = [];
    const itemRe = /<a[^>]*data-hvx-qp-item[^>]*href="([^"]*)"[^>]*>([\s\S]*?)<\/a>/gi;
    for (const itemMatch of block.matchAll(itemRe)) {
      const href = decodeHtml(itemMatch[1]).trim();
      const itemBlock = itemMatch[2];
      const iconMatch = itemBlock.match(/<i[^>]*class="([^"]+)"/i);
      const labelMatch = itemBlock.match(/<span[^>]*>([\s\S]*?)<\/span>/i);
      items.push({
        label: labelMatch ? stripTags(labelMatch[1]) : "Item",
        icon: iconMatch ? decodeHtml(iconMatch[1]).trim() : "fas fa-link",
        url: href,
        loginRequired: href.includes("/login.php?goto="),
      });
    }
    sections.push({ heading, items });
  }
  return { sections };
}

function extractUtilities(html) {
  const locales = [];
  const localeRe =
    /<button[^>]*class="hvx-language-option([^"]*)"[^>]*data-hvx-language-url="([^"]+)"[^>]*data-hvx-language-name="([^"]+)"[^>]*>/gi;
  for (const match of html.matchAll(localeRe)) {
    locales.push({
      code: decodeHtml(match[3]).trim().toLowerCase().slice(0, 2),
      label: decodeHtml(match[3]).trim(),
      url: decodeHtml(match[2]).trim(),
      active: match[1].includes("is-active"),
    });
  }

  const currencies = [];
  const currencyRe =
    /<button[^>]*class="hvx-currency-option([^"]*)"[^>]*data-hvx-currency-url="([^"]+)"[^>]*data-hvx-currency-name="([^"]+)"[^>]*>/gi;
  for (const match of html.matchAll(currencyRe)) {
    const label = decodeHtml(match[3]).trim();
    currencies.push({
      code: label.split(/\s+/)[0] || label,
      label,
      url: decodeHtml(match[2]).trim(),
      active: match[1].includes("is-active"),
    });
  }

  const accountLinks = [];
  const accountBlockMatch = html.match(
    /<div class="hvx-popover hvx-popover--account"[\s\S]*?<ul>([\s\S]*?)<\/ul>[\s\S]*?<\/div>/i
  );
  if (accountBlockMatch) {
    const linkRe = /<a[^>]*class="hvx-pop-link"[^>]*href="([^"]+)"[^>]*>([\s\S]*?)<\/a>/gi;
    for (const match of accountBlockMatch[1].matchAll(linkRe)) {
      const labelMatch = match[2].match(/<span>([^<]+)<\/span><\/span>\s*<i/i);
      accountLinks.push({
        label: labelMatch ? stripTags(labelMatch[1]) : stripTags(match[2]),
        href: { type: "url", value: decodeHtml(match[1]).trim() },
      });
    }
  }

  const logoMatch = html.match(/<a class="hvx-logo"[^>]*>\s*<img([^>]+)>/i);
  const mobileLogoMatch = html.match(
    /<a class="hvx-mobile-menu-brand"[^>]*>\s*<img([^>]+)>/i
  );
  const logoAttrs = logoMatch ? parseAttrs(logoMatch[1]) : {};
  const mobileLogoAttrs = mobileLogoMatch ? parseAttrs(mobileLogoMatch[1]) : {};

  return {
    locales,
    currencies,
    accountLinks,
    logos: {
      primary: logoAttrs.src || "",
      primaryDark: logoAttrs["data-hvx-logo-dark"] || "",
      primaryLight: logoAttrs["data-hvx-logo-light"] || "",
      mobile: mobileLogoAttrs.src || "",
      mobileDark: mobileLogoAttrs["data-hvx-logo-mobile-dark"] || "",
      mobileLight: mobileLogoAttrs["data-hvx-logo-mobile-light"] || "",
    },
  };
}

function extractMobileData(html) {
  const links = [];
  const linkRe =
    /data-hvx-mobile-rail="([^"]+)"[^>]*data-hvx-mobile-title="([^"]+)"[\s\S]*?<span>([^<]*)<\/span><\/span>/gi;
  for (const match of html.matchAll(linkRe)) {
    links.push({
      key: decodeHtml(match[1]).trim(),
      title: decodeHtml(match[2]).trim(),
      label: decodeHtml(match[3]).trim(),
    });
  }

  const themeLabelMatch = html.match(
    /<button[^>]*class="hvx-mobile-theme-btn"[\s\S]*?<span>([^<]+)<\/span>/i
  );

  return {
    railLinks: links,
    appearance: {
      themeToggleLabel: themeLabelMatch ? stripTags(themeLabelMatch[1]) : "",
    },
  };
}

async function main() {
  let html = "";
  try {
    const res = await fetch(SOURCE_URL, {
      redirect: "follow",
      headers: {
        "user-agent":
          "Mozilla/5.0 (compatible; HostvibeExtractor/1.0; +https://whmcs.dev/)",
      },
    });
    if (!res.ok) {
      throw new Error(`HTTP ${res.status}`);
    }
    html = await res.text();
  } catch {
    html = execFileSync("curl", ["-L", "--max-time", "30", SOURCE_URL], {
      encoding: "utf8",
      maxBuffer: 10 * 1024 * 1024,
    });
  }

  if (!html.trim()) {
    throw new Error(`Failed to fetch ${SOURCE_URL}`);
  }

  for (const token of REQUIRED_DOM_TOKENS) {
    if (!html.includes(token)) {
      throw new Error(`DOM contract token missing in live HTML: ${token}`);
    }
  }
  const tabs = extractTabs(html);
  const hotRails = extractRailList(html, "hvxHotRail");
  const productRails = extractRailList(html, "hvxProductsRail");
  const supportRails = extractRailList(html, "hvxSupportBillingRail");
  const universeRails = extractRailList(html, "hvxUniverseRail");
  const rails = extractPanels(html);
  const utilities = extractUtilities(html);
  const quickPad = extractQuickPad(html);
  const mobileData = extractMobileData(html);

  const railCatalog = [...hotRails, ...productRails, ...supportRails, ...universeRails];
  for (const rail of railCatalog) {
    if (!rails[rail.key]) {
      rails[rail.key] = { sections: [] };
    }
    rails[rail.key].title = rail.title;
    if (rail.icon) {
      rails[rail.key].icon = rail.icon;
    }
  }

  const headerMenu = {
    extractedAt: new Date().toISOString(),
    sourceUrl: SOURCE_URL,
    tabs,
    railGroups: {
      hot: hotRails.map((item) => item.key),
      products: productRails.map((item) => item.key),
      supportBilling: supportRails.map((item) => item.key),
      universe: universeRails.map((item) => item.key),
    },
    rails,
  };

  const utilityData = {
    extractedAt: new Date().toISOString(),
    sourceUrl: SOURCE_URL,
    ...utilities,
    mobileMenu: mobileData,
  };

  if (!tabs.length || !Object.keys(rails).length || !quickPad.sections.length) {
    throw new Error(
      "Extraction output is incomplete (tabs/rails/quickpad sections missing)"
    );
  }

  await mkdir(OUTPUT_DIR, { recursive: true });
  await writeFile(
    resolve(OUTPUT_DIR, "header-menu.json"),
    `${JSON.stringify(headerMenu, null, 2)}\n`,
    "utf8"
  );
  await writeFile(
    resolve(OUTPUT_DIR, "quick-pad.json"),
    `${JSON.stringify(quickPad, null, 2)}\n`,
    "utf8"
  );
  await writeFile(
    resolve(OUTPUT_DIR, "header-utilities.json"),
    `${JSON.stringify(utilityData, null, 2)}\n`,
    "utf8"
  );

  console.log(
    `Extracted live header data: tabs=${tabs.length}, rails=${Object.keys(rails).length}, quickpadSections=${quickPad.sections.length}`
  );
}

main().catch((error) => {
  console.error(error instanceof Error ? error.message : String(error));
  process.exit(1);
});
