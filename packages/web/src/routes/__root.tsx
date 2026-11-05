import { createRootRoute, HeadContent, Outlet, Scripts } from "@tanstack/react-router";
import type { ReactNode } from "react";
import { ErrorBoundary } from "../components/ErrorBoundary";
import { SiteFooter } from "../components/SiteFooter";
import { SiteHeader } from "../components/SiteHeader";
import { I18nProvider, useI18n } from "../i18n/context";
import { SITE_URL } from "../seo";
import appCss from "../styles.css?url";

const CLARITY_ID = import.meta.env.VITE_CLARITY_ID ?? "";
const ogImage = SITE_URL ? `${SITE_URL}/og.png` : undefined;
const OG_ALT = "Snatch — download any video on your Mac";

const clarity = CLARITY_ID
	? `(function (c, l, a, r, i, t, y) {
c[a] = c[a] || function () { (c[a].q = c[a].q || []).push(arguments); };
t = l.createElement(r); t.async = 1; t.src = "https://www.clarity.ms/tag/" + i;
y = l.getElementsByTagName(r)[0]; y.parentNode.insertBefore(t, y);
})(window, document, "clarity", "script", ${JSON.stringify(CLARITY_ID)});`
	: null;

export const Route = createRootRoute({
	head: () => ({
		meta: [
			{ charSet: "utf-8" },
			{ name: "viewport", content: "width=device-width, initial-scale=1" },
			{ name: "robots", content: "index, follow, max-image-preview:large" },
			{ name: "yandex-verification", content: "3665309d16ecf0b4" },
			{ name: "theme-color", content: "#000000" },
			{ property: "og:type", content: "website" },
			{ property: "og:site_name", content: "snatchvideos" },
			{ property: "og:locale", content: "en_US" },
			...(ogImage
				? [
						{ property: "og:image", content: ogImage },
						{ property: "og:image:width", content: "1200" },
						{ property: "og:image:height", content: "630" },
						{ property: "og:image:alt", content: OG_ALT },
					]
				: []),
			{ name: "twitter:card", content: "summary_large_image" },
			...(ogImage
				? [
						{ name: "twitter:image", content: ogImage },
						{ name: "twitter:image:alt", content: OG_ALT },
					]
				: []),
		],
		links: [
			{ rel: "icon", type: "image/svg+xml", href: "/logo.svg" },
			{ rel: "icon", type: "image/png", sizes: "192x192", href: "/logo192.png" },
			{ rel: "apple-touch-icon", href: "/logo192.png" },
			{ rel: "manifest", href: "/manifest.json" },
			{ rel: "stylesheet", href: appCss },
		],
		scripts: clarity ? [{ children: clarity }] : [],
	}),
	shellComponent: RootDocument,
	component: () => (
		<I18nProvider>
			<LocalizedErrorBoundary>
				<SkipLink />
				<SiteHeader />
				<Outlet />
				<SiteFooter />
			</LocalizedErrorBoundary>
		</I18nProvider>
	),
});

/** First tab stop, invisible until focused: the header's links are otherwise a wall. */
function SkipLink() {
	const { t } = useI18n();
	return (
		<a
			href="#main"
			className="label sr-only focus:not-sr-only focus:fixed focus:top-2 focus:left-2 focus:z-50 focus:bg-brand focus:px-3 focus:py-2.5 focus:text-black focus:outline-none"
		>
			{t.nav.skip}
		</a>
	);
}

/** The boundary is a class and cannot use the hook, so the copy is passed in. */
function LocalizedErrorBoundary({ children }: { children: ReactNode }) {
	const { t } = useI18n();
	return (
		<ErrorBoundary
			labels={{
				title: t.errorBoundary.title,
				retry: t.errorBoundary.retry,
				reload: t.errorBoundary.reload,
				details: t.errorBoundary.details,
				fallbackMessage: t.errors.generic,
			}}
		>
			{children}
		</ErrorBoundary>
	);
}

function RootDocument({ children }: { children: ReactNode }) {
	return (
		<html lang="en" className="dark" suppressHydrationWarning>
			<head>
				<HeadContent />
			</head>
			<body>
				{children}
				<Scripts />
			</body>
		</html>
	);
}
