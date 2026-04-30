#!/usr/bin/env node

import { readFileSync } from "node:fs";
import { resolve } from "node:path";

const root = process.cwd();
const common = JSON.parse(
  readFileSync(resolve(root, "data/hostvibe/common-section.json"), "utf8")
);
const homepage = JSON.parse(
  readFileSync(resolve(root, "data/hostvibe/homepage.json"), "utf8")
);
const merged = { ...common, ...homepage };

const expectedOrder = [
  "banner",
  "hosting",
  "pricingThree",
  "cpanelFeatures",
  "features",
  "choose",
  "support",
  "supportFramework",
  "faq",
  "joinCommunity",
];

const missing = expectedOrder.filter((key) => !merged[key]);
if (missing.length) {
  throw new Error(
    `Homepage merge contract failed. Missing merged keys: ${missing.join(", ")}`
  );
}

console.log(
  `Homepage contract OK: merged keys present in template order (${expectedOrder.join(
    " -> "
  )})`
);
