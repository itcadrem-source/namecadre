# Hostvibe Homepage Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Rebuild the Hostvibe public landing shell in Next.js with local data, Tailwind CSS, and motion-based interactions that closely match the original WHMCS theme.

**Architecture:** The page will stay data-driven and be composed from focused React components. Static content will live under `data/hostvibe`, shared types and normalizers will adapt the source JSON, and interactive pieces will be isolated into client components for header, navigation, hero, pricing, FAQ, and footer behavior.

**Tech Stack:** Next.js 16 App Router, React 19, TypeScript, Tailwind CSS 4, `motion`, ESLint

---

## File Structure

### Create

- `data/hostvibe/header-menu.json`
- `data/hostvibe/homepage.json`
- `data/hostvibe/common-section.json`
- `data/hostvibe/footer.json`
- `lib/hostvibe/types.ts`
- `lib/hostvibe/data.ts`
- `components/hostvibe/icons.tsx`
- `components/hostvibe/header.tsx`
- `components/hostvibe/hero.tsx`
- `components/hostvibe/hosting-carousel.tsx`
- `components/hostvibe/pricing-section.tsx`
- `components/hostvibe/sections.tsx`
- `components/hostvibe/footer.tsx`

### Modify

- `app/page.tsx`
- `app/layout.tsx`
- `app/globals.css`
- `AGENTS.md`

### Verify

- `npm run lint`
- `npm run build`
- browser verification against the running page

---

### Task 1: Copy Source Data And Add Typed Normalizers

**Files:**
- Create: `data/hostvibe/header-menu.json`
- Create: `data/hostvibe/homepage.json`
- Create: `data/hostvibe/common-section.json`
- Create: `data/hostvibe/footer.json`
- Create: `lib/hostvibe/types.ts`
- Create: `lib/hostvibe/data.ts`

- [ ] **Step 1: Copy the source JSON files into the app**

Run:

```bash
mkdir -p data/hostvibe
cp /Users/mustafijur_rhaman/Sites/allsite/whmcs/templates/hostvibe/json/header-menu.json data/hostvibe/header-menu.json
cp /Users/mustafijur_rhaman/Sites/allsite/whmcs/templates/hostvibe/json/homepage.json data/hostvibe/homepage.json
cp /Users/mustafijur_rhaman/Sites/allsite/whmcs/templates/hostvibe/json/common-section.json data/hostvibe/common-section.json
cp /Users/mustafijur_rhaman/Sites/allsite/whmcs/templates/hostvibe/json/footer.json data/hostvibe/footer.json
```

Expected: four JSON files exist under `data/hostvibe`.

- [ ] **Step 2: Add the Hostvibe TypeScript types**

Create `lib/hostvibe/types.ts` with the core structures:

```ts
export type HostvibeLink = {
  type?: "url" | "route";
  value: string;
};

export type HostvibeMenuCard = {
  title: string;
  desc: string;
  url: string;
  badge?: string;
  authAwareClientDomains?: boolean;
};

export type HostvibeMenuRail = {
  title: string;
  icon?: string;
  sections: Array<{
    heading: string;
    cards: HostvibeMenuCard[];
  }>;
};

export type HostvibeHeaderData = {
  tabs: Array<{
    key: string;
    label: string;
    defaultRail: string;
  }>;
  railGroups: Record<string, string[]>;
  rails: Record<string, HostvibeMenuRail>;
  notifications?: Array<{
    id: string;
    title: string;
    desc: string;
    url: string;
    timeLabel?: string;
    unread?: boolean;
    flagged?: boolean;
    priority?: boolean;
    avatarIcon?: string;
    avatarBg?: string;
    extraCount?: number;
  }>;
};

export type HostvibeHomepageData = Record<string, unknown>;
export type HostvibeFooterData = Record<string, unknown>;
```

- [ ] **Step 3: Add the data loader and merge helpers**

Create `lib/hostvibe/data.ts`:

```ts
import commonSection from "@/data/hostvibe/common-section.json";
import footer from "@/data/hostvibe/footer.json";
import headerMenu from "@/data/hostvibe/header-menu.json";
import homepage from "@/data/hostvibe/homepage.json";
import type { HostvibeFooterData, HostvibeHeaderData, HostvibeHomepageData } from "./types";

function mergeHomepageData(): HostvibeHomepageData {
  return {
    ...commonSection,
    ...homepage,
  } as HostvibeHomepageData;
}

export function getHostvibeHeaderData() {
  return headerMenu as HostvibeHeaderData;
}

export function getHostvibeHomepageData() {
  return mergeHomepageData();
}

export function getHostvibeFooterData() {
  return footer as HostvibeFooterData;
}
```

- [ ] **Step 4: Run lint to verify the new data layer is valid**

Run: `npm run lint`

Expected: PASS or only unrelated pre-existing warnings. If lint fails on the new files, fix the types/imports before moving on.

- [ ] **Step 5: Commit**

```bash
git add data/hostvibe lib/hostvibe
git commit -m "feat: add hostvibe local data layer"
```

### Task 2: Build The Shared Styling Foundation And Layout Metadata

**Files:**
- Modify: `app/layout.tsx`
- Modify: `app/globals.css`

- [ ] **Step 1: Update metadata to reflect the Hostvibe landing page**

Replace the metadata in `app/layout.tsx` with:

```ts
export const metadata: Metadata = {
  title: "NameCadre | Hostvibe React Port",
  description: "Hostvibe-inspired hosting landing page rebuilt in Next.js",
};
```

- [ ] **Step 2: Replace the default global styles with Hostvibe tokens**

Add the following foundations in `app/globals.css`:

```css
@import "tailwindcss";

:root {
  --hv-background: #f5f7f9;
  --hv-foreground: #131415;
  --hv-body: #404248;
  --hv-blue: #2148f5;
  --hv-blue-2: #4f63ff;
  --hv-blue-3: #4776ff;
  --hv-hero-start: #1d2d8d;
  --hv-hero-end: #2337a3;
  --hv-surface: #ffffff;
  --hv-border: rgba(19, 20, 21, 0.08);
  --hv-shadow: 0 26px 56px rgba(16, 27, 89, 0.18);
}

@theme inline {
  --color-background: var(--hv-background);
  --color-foreground: var(--hv-foreground);
  --font-sans: var(--font-geist-sans);
  --font-mono: var(--font-geist-mono);
}

html {
  scroll-behavior: smooth;
}

body {
  background: var(--hv-background);
  color: var(--hv-body);
  font-family: var(--font-geist-sans), sans-serif;
}
```

- [ ] **Step 3: Add reusable utility classes for the Hostvibe shell**

Append component classes such as:

```css
@layer components {
  .hv-container {
    @apply mx-auto w-full max-w-[1350px] px-4 sm:px-5 lg:px-6;
  }

  .hv-surface {
    @apply rounded-[28px] border border-white/10 bg-white;
  }

  .hv-section-title {
    @apply text-center text-3xl font-semibold tracking-[-0.02em] text-[#131415] sm:text-4xl;
  }

  .hv-pill-button {
    @apply inline-flex items-center justify-center rounded-full px-5 py-3 text-sm font-semibold transition;
  }
}
```

- [ ] **Step 4: Run lint to verify layout/style edits are clean**

Run: `npm run lint`

Expected: PASS.

- [ ] **Step 5: Commit**

```bash
git add app/layout.tsx app/globals.css
git commit -m "feat: add hostvibe styling foundation"
```

### Task 3: Implement Header, Mega Menu, And Footer Shell

**Files:**
- Create: `components/hostvibe/icons.tsx`
- Create: `components/hostvibe/header.tsx`
- Create: `components/hostvibe/footer.tsx`
- Modify: `app/page.tsx`

- [ ] **Step 1: Add a minimal icon wrapper used by the header/footer**

Create `components/hostvibe/icons.tsx`:

```tsx
export function DotIcon() {
  return <span className="size-2 rounded-full bg-current" aria-hidden="true" />;
}
```

- [ ] **Step 2: Build the interactive header component**

Create `components/hostvibe/header.tsx` as a client component with:

```tsx
"use client";

import { AnimatePresence, motion } from "motion/react";
import { useEffect, useState } from "react";

export function HostvibeHeader() {
  const [sticky, setSticky] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setSticky(window.scrollY > 245);
    onScroll();
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header className={sticky ? "fixed inset-x-0 top-0 z-50" : "fixed inset-x-0 top-0 z-50"}>
      {/* shell, nav, utilities, mega menu, mobile drawer */}
    </header>
  );
}
```

The finished component must render:

- logo area
- top navigation tabs
- desktop mega menu panels
- whois search field
- notifications/account/locale/currency/theme utilities
- mobile drawer with grouped links

- [ ] **Step 3: Build the footer shell**

Create `components/hostvibe/footer.tsx` with:

```tsx
export function HostvibeFooter() {
  return (
    <footer className="bg-[#0f1436] pb-8 pt-16 text-white">
      {/* top content, columns, payment row, bottom legal links */}
    </footer>
  );
}
```

- [ ] **Step 4: Mount the header and footer in `app/page.tsx` with placeholder body content**

Use:

```tsx
import { HostvibeFooter } from "@/components/hostvibe/footer";
import { HostvibeHeader } from "@/components/hostvibe/header";

export default function Home() {
  return (
    <>
      <HostvibeHeader />
      <main className="pt-20">
        <div className="hv-container py-20" />
      </main>
      <HostvibeFooter />
    </>
  );
}
```

- [ ] **Step 5: Run lint to verify header/footer compile**

Run: `npm run lint`

Expected: PASS.

- [ ] **Step 6: Commit**

```bash
git add components/hostvibe/icons.tsx components/hostvibe/header.tsx components/hostvibe/footer.tsx app/page.tsx
git commit -m "feat: add hostvibe header and footer shell"
```

### Task 4: Implement Hero And Hosting Sections

**Files:**
- Create: `components/hostvibe/hero.tsx`
- Create: `components/hostvibe/hosting-carousel.tsx`
- Modify: `app/page.tsx`

- [ ] **Step 1: Build the hero section with domain search and TLD strip**

Create `components/hostvibe/hero.tsx` with:

```tsx
"use client";

import { motion } from "motion/react";

export function HostvibeHero() {
  return (
    <section className="px-0 pb-12 pt-8">
      {/* hero gradient shell, title, description, search, CTA, TLD cards */}
    </section>
  );
}
```

The section must visually match:

- gradient shell
- large centered title
- white search bar with action cluster
- lower TLD card strip

- [ ] **Step 2: Build the hosting services carousel/scroll section**

Create `components/hostvibe/hosting-carousel.tsx`:

```tsx
"use client";

export function HostingCarouselSection() {
  return (
    <section id="hosting" className="py-24">
      {/* services cards with horizontal scroll or snap-based carousel feel */}
    </section>
  );
}
```

- [ ] **Step 3: Mount the hero and hosting sections in page order**

Update `app/page.tsx` to render:

```tsx
<main className="pt-20">
  <HostvibeHero />
  <HostingCarouselSection />
</main>
```

- [ ] **Step 4: Run lint to verify the sections compile**

Run: `npm run lint`

Expected: PASS.

- [ ] **Step 5: Commit**

```bash
git add components/hostvibe/hero.tsx components/hostvibe/hosting-carousel.tsx app/page.tsx
git commit -m "feat: add hostvibe hero and hosting sections"
```

### Task 5: Implement Pricing, Content Sections, And FAQ

**Files:**
- Create: `components/hostvibe/pricing-section.tsx`
- Create: `components/hostvibe/sections.tsx`
- Modify: `app/page.tsx`

- [ ] **Step 1: Build the pricing tabs and location-switching UI**

Create `components/hostvibe/pricing-section.tsx` with:

```tsx
"use client";

import { useState } from "react";

export function PricingSection() {
  const [activeTab, setActiveTab] = useState("startup");
  const [activeLocation, setActiveLocation] = useState("usa");
  return <section id="vps-plans" className="py-24">{/* tabbed plans */}</section>;
}
```

- [ ] **Step 2: Build the remaining stack sections**

Create `components/hostvibe/sections.tsx` exporting:

```tsx
export function CpanelFeaturesSection() {
  return <section className="py-24">{/* cpanel features */}</section>;
}

export function FeaturesSection() {
  return <section className="py-24">{/* homepage features */}</section>;
}

export function ChooseSection() {
  return <section className="py-24">{/* why choose us */}</section>;
}

export function SupportSection() {
  return <section className="py-24">{/* support card block */}</section>;
}

export function SupportFrameworkSection() {
  return <section className="py-24">{/* framework strip */}</section>;
}

export function FaqSection() {
  return <section className="py-24">{/* accordion */}</section>;
}

export function JoinCommunitySection() {
  return <section className="py-24">{/* final CTA */}</section>;
}
```

- [ ] **Step 3: Mount the sections in the same order as `homepage.tpl`**

Update `app/page.tsx` to render:

```tsx
<HostvibeHero />
<HostingCarouselSection />
<PricingSection />
<CpanelFeaturesSection />
<FeaturesSection />
<ChooseSection />
<SupportSection />
<SupportFrameworkSection />
<FaqSection />
<JoinCommunitySection />
```

- [ ] **Step 4: Run lint to verify the section stack compiles**

Run: `npm run lint`

Expected: PASS.

- [ ] **Step 5: Commit**

```bash
git add components/hostvibe/pricing-section.tsx components/hostvibe/sections.tsx app/page.tsx
git commit -m "feat: add hostvibe homepage section stack"
```

### Task 6: Update Project Instructions For Future Agents

**Files:**
- Modify: `AGENTS.md`

- [ ] **Step 1: Extend `AGENTS.md` with project-specific rules**

Append guidance covering:

```md
## Hostvibe Port Rules

- Preserve same-to-same Hostvibe parity for the landing page unless the user explicitly asks for a redesign.
- Use local data under `data/hostvibe/` as the source for the public landing shell.
- Prefer Tailwind CSS utilities and `app/globals.css` design tokens over importing legacy WHMCS CSS wholesale.
- Use `motion` for interactive transitions and avoid jQuery-era animation patterns.
- Use Superpowers process skills for design/planning/verification on substantial landing page changes.
- Use browser verification when changing the landing page UI.
- Magic/21st MCP may be used for UI exploration/refinement, but the Hostvibe source files remain the primary reference.
```

- [ ] **Step 2: Run lint to confirm the repo still passes after docs-only edits**

Run: `npm run lint`

Expected: PASS.

- [ ] **Step 3: Commit**

```bash
git add AGENTS.md
git commit -m "docs: add hostvibe port workflow rules"
```

### Task 7: Verify The Full Port End-To-End

**Files:**
- Verify only

- [ ] **Step 1: Run the final lint pass**

Run: `npm run lint`

Expected: PASS.

- [ ] **Step 2: Run the production build**

Run: `npm run build`

Expected: PASS with a generated production build.

- [ ] **Step 3: Run the local dev server**

Run: `npm run dev`

Expected: Next.js dev server starts successfully.

- [ ] **Step 4: Verify in the browser**

Check:

- sticky header after scrolling
- desktop mega menu behavior
- mobile drawer open/close
- hero layout and search shell
- hosting carousel/scroll section
- pricing tab and location switching
- FAQ accordion
- footer layout
- responsive layout on mobile width

- [ ] **Step 5: Commit final integration**

```bash
git add app components data lib AGENTS.md
git commit -m "feat: rebuild hostvibe landing page in nextjs"
```

---

## Self-Review

### Spec coverage

- local Hostvibe data copy: Task 1
- Tailwind styling foundation and metadata: Task 2
- header, mega menu, mobile drawer, footer: Task 3
- hero, TLD strip, hosting section: Task 4
- pricing, feature stack, FAQ, community CTA: Task 5
- AGENTS.md update: Task 6
- verification with lint, build, browser: Task 7

### Placeholder scan

- No `TODO`/`TBD` placeholders remain in task instructions.
- Each task names exact files and explicit commands.

### Type consistency

- The plan consistently uses `HostvibeHeader`, `HostvibeFooter`, `HostvibeHero`, `HostingCarouselSection`, and `PricingSection`.
- Data-layer filenames and imports match the file structure section.
