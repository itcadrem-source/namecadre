<!-- BEGIN:nextjs-agent-rules -->
# This is NOT the Next.js you know

This version has breaking changes — APIs, conventions, and file structure may all differ from your training data. Read the relevant guide in `node_modules/next/dist/docs/` before writing any code. Heed deprecation notices.
<!-- END:nextjs-agent-rules -->

## Hostvibe Port Rules

- Preserve same-to-same Hostvibe parity for the landing page unless the user explicitly asks for a redesign.
- Copy original WHMCS source files into `references/hostvibe/` before porting them so React work stays traceable to the source template.
- Treat `references/hostvibe/includes/` and `references/hostvibe/section-components/` as the canonical markup reference for React ports.
- Do not rename or casually rewrite Hostvibe classes, IDs, data attributes, or structural wrappers when porting source templates to React.
- Use local data under `data/hostvibe/` only to replace Smarty variables and WHMCS runtime state, not to invent new markup structures.
- Preserve legacy Hostvibe CSS and imported header inline styles when parity depends on them.
- Use `motion` only for stateful React show/hide behavior where the original theme relied on imperative JS, while keeping the original DOM hooks intact.
- Use Superpowers process skills for design, planning, and verification on substantial landing page changes.
- Use multi-subagent execution when the task can be split cleanly by file ownership.
- Prefer `ui-ux-pro-max` for UI direction and browser verification tooling for final UI checks.
- Magic/21st MCP may be used for UI exploration or refinement when operational, but the Hostvibe source files remain the primary reference.
- Vercel/browser tooling is the preferred verification path for this landing page UI.
