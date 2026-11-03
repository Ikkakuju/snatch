# Contributing

Thanks for considering a contribution!

## Mac app (`macos/`)

Prerequisites: Swift 6 (Xcode 16+ or the Command Line Tools), macOS 14+.

```bash
cd macos
swift test          # SnatchCore: formats, progress parsing, checksums, process groups
swift run Snatch    # run the app from source
```

`SnatchCore` must not import SwiftUI; anything testable goes there. No third-party
Swift packages.

## Website (`packages/web/`)

Prerequisites: [Bun](https://bun.sh/) (version in `.bun-version`).

```bash
bun install          # installs git hooks via lefthook
bun dev              # http://localhost:5173
bunx biome ci .      # lint (Biome: tabs, 100 cols, double quotes)
bun run typecheck
bun run build        # never bare `bun build` (Bun's bundler)
```

TanStack Start prerenders to static HTML at build time; do not add an SSR runtime,
and keep components renderable without `window`/`document`.

## Pull Requests

- Keep PRs focused and small; delete old code paths instead of shimming.
- Describe the change and how you tested it (which video links for app changes).
- AI-assisted commits must include a `Co-Authored-By: Claude` trailer.

See `AGENTS.md` for the architecture reference.
