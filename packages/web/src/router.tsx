import { createRouter } from "@tanstack/react-router";
import { initSentry } from "./lib/sentry";
import { routeTree } from "./routeTree.gen";

initSentry();

// A fresh router per request (and once on the client); SPA mode comes from the Vite plugin.
export function getRouter() {
	return createRouter({
		routeTree,
		scrollRestoration: true,
		defaultPreload: "intent",
	});
}

declare module "@tanstack/react-router" {
	interface Register {
		router: ReturnType<typeof getRouter>;
	}
}
