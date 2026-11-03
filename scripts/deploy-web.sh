#!/bin/bash
# Cloudflare Workers Builds deploy command for the SPA Worker.
#
# The Workers Builds build command (`bun run build:web`) has already produced
# packages/web/dist/client. Vite owns the build; Void only uploads the finished
# static directory as a static-assets Worker.
set -euo pipefail
cd "$(dirname "$0")/.."

# Public Vite values and the Cloudflare identifiers live here; the deploy
# authenticates with the Workers Builds build token, not a repository secret.
set -a
[ -f packages/web/.env.production ] && . packages/web/.env.production
set +a

bun run --cwd packages/web deploy -- --dir dist/client --spa
