import { defineConfig } from "void/config";

export default defineConfig({
	target: "cloudflare",
	routing: {
		isr: false,
	},
	cloudflare: {
		name: "snatch",
		compatibility_date: "2026-10-01",
		// A Custom Domain: Cloudflare creates the DNS record and certificate.
		routes: [{ pattern: "snatchvideos.com", custom_domain: true }],
		workers_dev: false,
		preview_urls: false,
	},
});
