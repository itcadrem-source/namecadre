# Hostvibe Standard Design Audit (Parity + Usability)

Date: 2026-04-28
Scope: `app/*`, `components/hostvibe/**`, `data/hostvibe/**`, `references/hostvibe/**`
Mode: Non-runtime mutation audit (documentation only)

## 1. Executive Summary

The current implementation is close to a functional Hostvibe parity port on homepage/header interactions, with strong coverage of sticky header, mega menu, mobile drawer, utility popovers, and section ordering. The main risk is structural drift across duplicated component paths and incomplete source traceability in `references/hostvibe/templates/`.

Overall status:
- Parity baseline: Medium-High
- Usability consistency: Medium
- Accessibility baseline: Medium
- Maintainability: Medium-Low (due to duplication and mixed component generations)

## 2. Inventory and Ownership Map

### Routes and composition
- `app/page.tsx`: primary landing composition (header, hero, hosting, pricing, sections, footer)
- `app/pricing/page.tsx`: pricing-focused route with additional custom sections
- `app/layout.tsx`: global wrappers and Hostvibe header CSS include

### Active Hostvibe implementation modules
- Header system: `components/hostvibe/header/header.tsx`, `components/hostvibe/header/search-popup.tsx`
- Hero: `components/hostvibe/hero/new-hero-section.tsx` (via `components/hostvibe/hero.tsx`)
- Homepage stack: `components/hostvibe/homepage/*`
- Shared footer: `components/hostvibe/shared/footer.tsx`
- Data layer: `lib/hostvibe/data.ts`, `lib/hostvibe/types.ts`, `data/hostvibe/*.json`

### Reference source of truth in repo
- Canonical includes: `references/hostvibe/includes/**`
- Canonical section markup: `references/hostvibe/section-components/**`
- Header template present: `references/hostvibe/templates/header.tsx`

### Notable duplication/legacy surfaces
- Duplicate-export wrappers exist at top-level (`components/hostvibe/header.tsx`, `hero.tsx`, `footer.tsx`, `modern-homepage.tsx`, `hosting-carousel.tsx`) alongside nested module paths.
- Multiple generations of components co-exist (`NewHeroSection.tsx`, `hero/new-hero-section.tsx`, section-components and homepage composites), increasing parity drift risk.

## 3. Parity Checks vs Canonical Templates

## 3.1 Header parity (`references/hostvibe/templates/header.tsx`)
- Observed:
  - Sticky behavior and body state classes implemented (`hvx-header-hidden`, `hvx-header-top`, `hvx-mega-open`, `hvx-mobile-menu-open`).
  - Mega menu rail model and tab-to-rail mapping implemented from JSON.
  - Utility controls (locale/currency/account/notify/quick pad/theme) present.
- Expected:
  - Same-to-same structure/classes/data hooks with WHMCS template behavior and menu data.
- Result: Pass with minor drift risk.

## 3.2 Homepage section order parity
- Observed:
  - Order in `app/page.tsx` matches intended stack.
  - `npm run verify:hostvibe-homepage` reports template order contract OK (`banner -> hosting -> pricingThree -> cpanelFeatures -> features -> choose -> support -> supportFramework -> faq -> joinCommunity`).
- Expected:
  - Exact section order parity.
- Result: Pass.

## 3.3 Footer traceability parity
- Observed:
  - Footer is implemented (`components/hostvibe/shared/footer.tsx`) and data-driven from `data/hostvibe/footer.json`.
  - `references/hostvibe/templates/footer.tsx` is missing in repo.
- Expected:
  - Source template copy in `references/hostvibe/templates/` for traceable same-to-same port decisions.
- Result: Fail (traceability gap).

## 3.4 Common section parity
- Observed:
  - Reference section templates exist in `references/hostvibe/section-components/common/*.tsx` and homepage templates in `references/hostvibe/section-components/homepage/*.tsx`.
  - React sections are heavily modernized (utility-heavy Tailwind patterns) and not consistently DOM/class-equivalent.
- Expected:
  - Preserve original classes/IDs/wrappers/hooks where parity depends on them.
- Result: Partial pass; medium drift.

## 4. Standards Findings (Severity Ordered)

## Critical
1. Missing canonical footer source template copy
- Path: `references/hostvibe/templates/footer.tsx` (missing)
- Observed: Footer template source not present in references.
- Expected: Original source copied for auditability and parity verification.
- Impact: Blocks exact source-to-port comparison for footer behavior/style.
- Effort: S

## High
1. Structural duplication across active and wrapper components
- Paths: `components/hostvibe/*.tsx` wrappers plus nested active modules under `components/hostvibe/{header,hero,homepage,shared}/`
- Observed: Multiple entry surfaces for similar areas, increases accidental divergence.
- Expected: Single authoritative path per subsystem.
- Impact: Higher regression risk during parity fixes.
- Effort: M

2. Section markup modernization beyond strict same-to-same boundaries
- Paths: `components/hostvibe/homepage/sections.tsx`
- Observed: Many sections use redesigned card/layout idioms rather than direct class/wrapper parity from `.tsx` sources.
- Expected: Preserve Hostvibe wrappers/hooks/classes when parity-sensitive.
- Impact: Visual and behavior drift risk across future updates.
- Effort: M-L

## Medium
1. Accessibility consistency gaps likely in interactive composites
- Paths: `components/hostvibe/header/header.tsx`, section accordions and button-like elements in homepage blocks
- Observed: Good ARIA coverage in header; inconsistent semantic structure likely across custom section cards and accordions compared to canonical Bootstrap semantics.
- Expected: Uniform focus-visible, keyboard flow, and expanded/collapsed semantics.
- Impact: Uneven keyboard/screen-reader UX.
- Effort: M

2. Data-source precedence complexity (live + local merges)
- Paths: `lib/hostvibe/data.ts`, `data/hostvibe/live/*`
- Observed: Merge logic prefers live data when available; useful but adds hidden state variance for parity checks.
- Expected: Deterministic audit mode with explicit source precedence.
- Impact: Harder reproducibility of parity snapshots.
- Effort: M

## Low
1. Naming inconsistency and leftover legacy variants
- Paths: `components/hostvibe/NewHeroSection.tsx` vs `components/hostvibe/hero/new-hero-section.tsx`
- Observed: Mixed naming conventions and likely stale files.
- Expected: Clear naming and archival strategy for superseded variants.
- Impact: Developer confusion.
- Effort: S

## 5. Standards Checklist (Repo-Tailored)

## 5.1 Hostvibe parity invariants
- Preserve original class names, IDs, data attributes, and structural wrappers for parity-sensitive sections.
- Keep canonical template references under `references/hostvibe/{includes,section-components,templates}` complete and current.
- Maintain verified homepage section order contract.
- Avoid introducing parallel component implementations for same section behavior.

## 5.2 Usability baseline
- Primary navigation labels and menu exposure behavior remain predictable across desktop/mobile.
- All interactive controls have clear visible states (hover, focus, active, disabled where applicable).
- CTA hierarchy remains stable across breakpoints.

## 5.3 Accessibility minimums
- Keyboard traversal across header tools, mega menu rails, drawer, and FAQ accordion.
- Visible focus styling for all interactive controls.
- Landmark coverage (`header`, `main`, `footer`) and semantic heading progression.
- Contrast checks for text on gradients and muted surfaces.
- Reduced-motion handling for entry/reveal animations and menu transitions.

## 5.4 Motion constraints
- Use `motion` only where original JS interactions required dynamic state transitions.
- Prefer deterministic, restrained transitions; avoid decorative-only motion that changes parity intent.

## 6. Candidate Interface/Contract Changes (Future Phase Only)

No runtime changes made in this phase. Candidate future changes to consider:
- Introduce a strict `HostvibeSectionContract` type for parity-sensitive sections to prevent structural drift.
- Add a "parity mode" flag in data layer to force local-only snapshots during audits.
- Normalize component entrypoints so each subsystem has one canonical export path.

## 7. Evidence Notes

- Homepage contract check: `npm run verify:hostvibe-homepage` returned section-order OK.
- Header behavior implementation evidence: `components/hostvibe/header/header.tsx` contains sticky/mega/drawer/popover state and body class hooks.
- Footer reference gap evidence: only `references/hostvibe/templates/header.tsx` exists under `references/hostvibe/templates/`.
