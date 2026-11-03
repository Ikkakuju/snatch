import { defineConfig, loadEnv } from "vite";

// Preview the same static files served in production, without an SSR bundle.
export default defineConfig(({ mode }) => {
	const env = loadEnv(mode, process.cwd(), "VITE_");
	return {
		build: { outDir: "dist/client" },
		preview: {
			host: "127.0.0.1",
			proxy: {
				"/api": {
					target: env.VITE_API_TARGET || "http://localhost:3001",
					changeOrigin: true,
				},
			},
		},
	};
});
