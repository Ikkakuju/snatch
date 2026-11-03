import tailwindcss from "@tailwindcss/vite";
import { tanstackStart } from "@tanstack/react-start/plugin/vite";
import react from "@vitejs/plugin-react";
import { defineConfig, loadEnv } from "vite";

// TanStack Start prerendered to static files at build time — no SSR runtime.
export default defineConfig(({ mode }) => {
	// Same VITE_SITE_URL the app reads: `process.env` alone would miss a `.env.<mode>` file.
	const env = loadEnv(mode, process.cwd(), "VITE_");
	const SITE_URL = (env.VITE_SITE_URL ?? "").replace(/\/+$/, "");
	return {
		server: {
			port: 5173,
		},
		// Pin IPv4 loopback: the build-time prerender fetches its own preview URL, and
		// "localhost" can resolve to a different family than the bind under Bun.
		preview: {
			host: "127.0.0.1",
		},
		plugins: [
			tanstackStart({
				// Pre-render to static HTML so crawlers get the text; the browser hydrates.
				// Nothing renders on the server at runtime.
				prerender: { enabled: true, crawlLinks: true },
				// Needs an absolute origin, so only a deployment that names one gets it.
				sitemap: SITE_URL ? { enabled: true, host: SITE_URL } : undefined,
			}),
			// Built here rather than kept in public/ because the Sitemap line needs the
			// same absolute origin, and only a deployment that names one should advertise it.
			{
				name: "robots-txt",
				applyToEnvironment: (environment) => environment.name === "client",
				generateBundle() {
					this.emitFile({
						type: "asset",
						fileName: "robots.txt",
						source: `User-agent: *\nAllow: /\n${SITE_URL ? `\nSitemap: ${SITE_URL}/sitemap.xml\n` : ""}`,
					});
				},
			},
			// react's plugin must come after start's plugin
			react(),
			tailwindcss(),
		],
	};
});
