## What and why

<!-- The problem this solves, and what it changes. Link an issue if there is one. -->

## How it was verified

<!--
App changes: `swift test` in macos/, plus the links you downloaded with `swift run Snatch`.
Website changes: `bun dev`, which browser.
-->

## Checklist

- [ ] `swift test` passes (app changes)
- [ ] `bunx biome ci .`, `bun run typecheck` and `bun run build` pass (website changes)
- [ ] The old code path was deleted rather than shimmed
- [ ] AI-assisted commits carry the `Co-Authored-By` trailer

<!-- Architecture and conventions live in AGENTS.md. -->
