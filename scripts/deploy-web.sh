#!/bin/bash
# Cloudflare Workers Builds deploy command for the SPA Worker.
#
# The Workers Builds build command (`bun run build:web`) has already produced
# packages/web/dist/client. Vite owns the build; Void only uploads the finished
# static directory as a static-assets Worker.
set -euo pipefail
cd "$(dirname "$0")/.."

# Workers Builds runs this for every branch, and every branch deploys to the same
# Worker (workers_dev and preview_urls are both off). Two builds landing at once
# supersede each other and the losing one leaves the old version serving traffic,
# so only a commit on main is allowed to publish. A local run has no WORKERS_CI and
# proceeds. The check is on the commit rather than on WORKERS_CI_BRANCH because a
# PR build checks out its own head, which is not an ancestor of main either way.
if [ "${WORKERS_CI:-}" = "1" ]; then
	git fetch --quiet origin main || true
	if ! git merge-base --is-ancestor HEAD origin/main; then
		echo "Not a main commit (${WORKERS_CI_BRANCH:-unknown}); built, not deployed."
		exit 0
	fi
	echo "Deploying $(git rev-parse --short HEAD) on main."
fi

# Public Vite values and the Cloudflare identifiers live here; the deploy
# authenticates with the Workers Builds build token, not a repository secret.
set -a
[ -f packages/web/.env.production ] && . packages/web/.env.production
set +a

bun run --cwd packages/web deploy -- --dir dist/client --spa
