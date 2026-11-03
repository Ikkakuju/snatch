/**
 * Baked in at build time. Empty means "not ours to claim": a self-hosted instance
 * must not advertise another deployment's domain.
 */
export const SITE_URL = (import.meta.env.VITE_SITE_URL ?? "").replace(/\/+$/, "");

/**
 * Per-page title, description, social copies and canonical — set per route, never
 * in the root, or every page would claim to be the home page.
 */
export function pageHead({
	path,
	title,
	description,
}: {
	path: string;
	title: string;
	description: string;
}) {
	const url = SITE_URL ? `${SITE_URL}${path}` : undefined;
	return {
		meta: [
			{ title },
			{ name: "description", content: description },
			{ property: "og:title", content: title },
			{ property: "og:description", content: description },
			{ name: "twitter:title", content: title },
			{ name: "twitter:description", content: description },
			...(url ? [{ property: "og:url", content: url }] : []),
		],
		links: url ? [{ rel: "canonical", href: url }] : [],
	};
}
