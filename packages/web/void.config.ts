import { defineConfig } from "void/config";

export default defineConfig({
	target: "cloudflare",
	routing: {
		isr: false,
	},
	cloudflare: {
		name: "snatch",
		compatibility_date: "2026-10-01",
		routes: [{ pattern: "snatchvideos.com/*", zone_name: "snatchvideos.com" }],
		workers_dev: false,
		preview_urls: false,
	},
});
