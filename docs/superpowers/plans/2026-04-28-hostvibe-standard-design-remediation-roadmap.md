# Hostvibe Standard Design Remediation Roadmap

Date: 2026-04-28
Source: `docs/superpowers/specs/2026-04-28-hostvibe-standard-design-audit.md`

## Goal

Close parity and usability gaps while preserving Hostvibe same-to-same intent and minimizing visual drift.

## Wave 1 (Parity Regressions and Broken/Unverifiable Baselines)

1. Restore missing canonical source artifact
- Add `references/hostvibe/templates/footer.tpl` from WHMCS source.
- Add verification note in docs linking footer React blocks to footer template segments.

2. Freeze canonical component ownership
- Define one authoritative path per subsystem:
  - Header: `components/hostvibe/header/*`
  - Hero: `components/hostvibe/hero/*`
  - Homepage stack: `components/hostvibe/homepage/*`
  - Footer: `components/hostvibe/shared/footer.tsx`
- Deprecate duplicate wrapper/legacy variants with explicit comments or removal plan.

3. Add parity guard checks
- Extend contract checks to include required wrapper/class/ID presence for key sections (header shell, hero shell, hosting slider shell, FAQ wrapper, footer wrapper).

Acceptance for Wave 1:
- Footer template exists in references.
- One canonical module path per subsystem documented and enforced.
- Contract checks cover section order + required structural hooks.

## Wave 2 (Usability + Accessibility with Low Structural Risk)

1. Keyboard and focus pass
- Validate tab order and focus-visible styles for:
  - Header tools/popovers
  - Mega menu rails/cards
  - Mobile drawer navigation
  - FAQ accordion controls

2. Semantic and ARIA consistency pass
- Ensure interactive controls use semantic buttons/links with matching ARIA state.
- Ensure accordion and popover state attributes are synchronized.

3. Contrast and reduced motion pass
- Review gradient/overlay text contrast hotspots.
- Apply reduced-motion fallbacks for motion-heavy entry/transition points.

Acceptance for Wave 2:
- Keyboard-only navigation is complete and predictable.
- No major contrast failures on primary content blocks.
- Reduced-motion mode preserves functionality and readability.

## Wave 3 (Maintainability Without Visual Drift)

1. Consolidate duplicate components and exports
- Remove or archive stale variants (`NewHeroSection.tsx`-style leftovers) after confirming no imports.
- Keep stable, minimal public exports.

2. Tighten data determinism for audits
- Add an explicit local-only data mode for reproducible parity checks.
- Document precedence between `data/hostvibe/live/*` and local JSON.

3. Token and styling consistency cleanup
- Align repeated spacing/surface/shadow patterns under existing CSS variables.
- Avoid introducing new visual language that diverges from Hostvibe source.

Acceptance for Wave 3:
- Reduced component surface area and clearer ownership.
- Reproducible audit behavior across environments.
- No visual regression from parity baseline.

## Test and Verification Matrix

For each wave, run:
- `npm run lint`
- `npm run build`
- `npm run verify:hostvibe-homepage`
- Browser validation (desktop + mobile): sticky header, mega menu, mobile drawer, hero search shell, hosting section behavior, pricing tabs, FAQ accordion, footer layout.

## Risk Controls

- Do not rename/remove Hostvibe classes/IDs/data hooks used by reference templates until parity checks are updated.
- Any modernization changes must show side-by-side parity evidence before merge.
- Keep AGENTS.md Hostvibe parity rules as gating constraints for future edits.
