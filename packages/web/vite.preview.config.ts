import { defineConfig } from "vite";

// Preview the same static files served in production, without an SSR bundle.
export default defineConfig({
	build: { outDir: "dist/client" },
	preview: { host: "127.0.0.1" },
});
