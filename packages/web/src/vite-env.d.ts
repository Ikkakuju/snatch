/// <reference types="vite/client" />

interface ImportMetaEnv {
	/** Browser Sentry DSN; when unset, error reporting is disabled. */
	readonly VITE_SENTRY_DSN?: string;
	/** Public origin for the canonical link and social tags; unset = not advertised. */
	readonly VITE_SITE_URL?: string;
	/** Microsoft Clarity project id; when unset, no analytics script is emitted. */
	readonly VITE_CLARITY_ID?: string;
	/** Ad link opened on the first download click; unset → no ad. */
	readonly VITE_AD_URL?: string;
}

interface ImportMeta {
	readonly env: ImportMetaEnv;
}
