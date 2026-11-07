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
# so only main is allowed to publish. A local run has no WORKERS_CI and proceeds.
if [ "${WORKERS_CI:-}" = "1" ]; then
	case "${WORKERS_CI_BRANCH:-}" in
	main) ;;
	*)
		echo "Not main (${WORKERS_CI_TYPE:-branch} ${WORKERS_CI_BRANCH:-unknown}); built, not deployed."
		exit 0
		;;
	esac
fi

# Public Vite values and the Cloudflare identifiers live here; the deploy
# authenticates with the Workers Builds build token, not a repository secret.
set -a
[ -f packages/web/.env.production ] && . packages/web/.env.production
set +a

bun run --cwd packages/web deploy -- --dir dist/client --spa
