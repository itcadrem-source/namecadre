# Hostvibe Homepage React Port Design

## Goal

Rebuild the public `hostvibe` WHMCS landing experience inside this Next.js 16 app as a same-to-same React/Tailwind port, including the fixed interactive header, the homepage section stack, and the matching footer. The result should preserve the original visual hierarchy, spacing, colors, gradients, section order, and key interactions while replacing legacy jQuery/Slick/Swiper behavior with React state and `motion`.

## Source Of Truth

- Theme templates:
  - `/Users/mustafijur_rhaman/Sites/allsite/whmcs/templates/hostvibe/header.tsx`
  - `/Users/mustafijur_rhaman/Sites/allsite/whmcs/templates/hostvibe/homepage.tsx`
  - `/Users/mustafijur_rhaman/Sites/allsite/whmcs/templates/hostvibe/footer.tsx`
- Theme data:
  - `/Users/mustafijur_rhaman/Sites/allsite/whmcs/templates/hostvibe/json/header-menu.json`
  - `/Users/mustafijur_rhaman/Sites/allsite/whmcs/templates/hostvibe/json/homepage.json`
  - `/Users/mustafijur_rhaman/Sites/allsite/whmcs/templates/hostvibe/json/common-section.json`
  - `/Users/mustafijur_rhaman/Sites/allsite/whmcs/templates/hostvibe/json/footer.json`
- Theme styling/behavior:
  - `/Users/mustafijur_rhaman/Sites/allsite/whmcs/templates/hostvibe/css/main.css`
  - `/Users/mustafijur_rhaman/Sites/allsite/whmcs/templates/hostvibe/js/main.js`
  - `/Users/mustafijur_rhaman/Sites/allsite/whmcs/templates/hostvibe/section-components/homepage/banner.tsx`
  - `/Users/mustafijur_rhaman/Sites/allsite/whmcs/templates/hostvibe/section-components/homepage/hosting.tsx`

## Product Scope

This first pass includes:

- Public desktop header with sticky behavior
- Desktop mega menu rail system
- Mobile drawer navigation
- Demo utilities in header:
  - whois/domain search field
  - locale selector
  - currency selector
  - theme toggle
  - notifications panel
  - account panel
  - quick-pad launcher
- Homepage sections rendered in the same order as `homepage.tsx`
- Matching footer shell and its content blocks

This first pass does not include:

- WHMCS backend integration
- Real authentication state
- Real cart, notification, locale, or currency APIs
- Internal WHMCS pages beyond the public shell

## Rendering Model

The Next.js app will keep a local copy of the `hostvibe` content model under `data/hostvibe/`. The app will not read from the WHMCS directory at runtime. Data will be normalized into typed objects and consumed by React components so the UI can remain same-to-same without hardcoding copy inside JSX.

The App Router page will stay as a server component entry point that loads the local data and composes client components where interaction is required.

## Visual Direction

The rebuild must match the `hostvibe` look rather than reinterpret it.

Required visual characteristics:

- Blue-driven brand palette centered on `#2148f5`, `#4f63ff`, `#4776ff`
- Light gray page background with a high-contrast gradient hero card
- 80px fixed header shell with rounded utility controls
- Large centered hero headline with white-on-blue gradient card
- Rounded cards, medium-large radii, soft blue shadows, and layered surfaces
- `Inter` as the primary typeface, with sizing/weight close to the source theme
- Desktop container width behavior approximating the source `1350px` layout
- Original section order, anchors, spacing rhythm, and CTA emphasis

The implementation should preserve the look in Tailwind CSS 4 using design tokens and component-level utility classes rather than importing the full legacy CSS.

## Component Architecture

The page should be decomposed into focused units:

- `HostvibePage`
  - root composition layer
- `HostvibeHeader`
  - logo
  - menu tabs
  - whois search
  - utilities cluster
  - mega menu
  - mobile drawer
- `HeroSection`
  - hero card
  - domain search
  - CTA
  - TLD strip
- `HostingCarouselSection`
  - service cards
  - carousel controls or scroll-snapping equivalent
- `PricingSection`
  - tabs
  - location filter
  - plan cards
- `CpanelFeaturesSection`
- `FeaturesSection`
- `ChooseSection`
- `SupportSection`
- `SupportFrameworkSection`
- `FaqSection`
- `JoinCommunitySection`
- `HostvibeFooter`

Shared support units:

- icon wrappers
- popover shell
- accordion item
- section heading
- data normalizers
- link resolver for copied WHMCS-like URLs

## Data Model

Local copied files should include:

- `data/hostvibe/header-menu.json`
- `data/hostvibe/homepage.json`
- `data/hostvibe/common-section.json`
- `data/hostvibe/footer.json`

Normalization requirements:

- preserve section order from `homepage.tsx`
- merge `common-section.json` as defaults with `homepage.json` as overrides
- expose typed arrays/records for:
  - header tabs and rails
  - hero content
  - hosting items
  - pricing tabs, locations, and plans
  - support and FAQ entries
  - footer columns and links
- provide local demo state for:
  - notifications
  - account menu
  - locale list
  - currency list
  - theme mode

## Interaction Requirements

Header:

- sticky header activates after scroll threshold similar to the source theme
- desktop mega menu opens from the top navigation and displays rail-based content
- mobile drawer opens/closes and supports expandable groups
- header utility popovers open/close without layout shift
- theme toggle changes page theme state locally

Hero:

- domain action selector supports at least register/transfer style demo options
- search UI mirrors source alignment and CTA treatment
- TLD cards animate or auto-scroll using React + `motion`

Homepage body:

- hosting section should feel like the source slider on desktop and mobile
- pricing section must support tab switching and location switching
- FAQ uses accordion behavior
- section reveals may use restrained motion on entry

Footer:

- preserve the multi-column information structure
- preserve payment icons row and bottom legal links

## Motion Requirements

Use the installed `motion` package instead of jQuery-era animation libraries.

Required motion behavior:

- sticky header state transitions
- mega menu and drawer open/close transitions
- hero/TLD strip entrance movement
- hover/focus states on cards and buttons
- accordion expand/collapse
- restrained section reveals

Motion must respect reduced-motion preferences.

## Responsive Requirements

The rebuild must preserve the source theme’s effective breakpoints and behavior:

- large desktop around `>= 1200`
- tablet around `992`
- small tablet around `768`
- mobile around `576` and below

Responsive expectations:

- desktop mega menu becomes mobile drawer
- hero content and search controls reflow cleanly
- service cards and pricing cards remain legible without horizontal overflow
- footer stacks into narrower columns while preserving hierarchy

## Tooling And Workflow Requirements

The implementation must follow the requested tool choices where they are usable in this environment:

- Superpowers process skills are required
- multi-subagent execution is required
- Tailwind CSS is required
- `motion` is required for animation
- 21st/Magic MCP should be used when helpful; if a specific call fails, continue with local implementation based on the source theme
- available plugins should be used when applicable; in this session, Superpowers and Vercel are directly relevant, while Google Drive has no connected resources for this task

## AGENTS.md Update

`AGENTS.md` must be updated so future agents are explicitly told:

- this project is a Next.js 16 App Router app
- hostvibe parity is a standing requirement when working on this landing page
- required process skills include Superpowers brainstorming/planning/verification
- preferred UI skill is `ui-ux-pro-max`
- preferred MCP/tooling includes Magic/21st when operational and browser verification through the Vercel/browser tooling
- `motion` is the preferred animation library in this project

## Verification

Before claiming completion:

- run `eslint`
- run `next build`
- run the page in a browser and verify:
  - sticky header
  - mega menu open/close
  - mobile drawer
  - hero layout
  - hosting carousel behavior
  - pricing tabs
  - FAQ accordion
  - footer layout
  - mobile responsiveness

## Risks And Constraints

- Source assets reference WHMCS paths; the React port must adapt these safely for the Next.js app
- The original theme mixes inline styles, template logic, and jQuery; parity requires careful extraction, not blind copying
- 21st/Magic MCP may fail for some calls; that should not block implementation because the source theme is already the required reference
- Exact backend-auth behavior is out of scope, so demo state must be visually faithful but clearly local
