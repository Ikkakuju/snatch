import { Github } from "lucide-react";
import { REPO_URL } from "../config";
import { useI18n } from "../i18n/context";
import { DownloadButton } from "./DownloadButton";
import { LanguageMenu } from "./LanguageMenu";
import { Logo } from "./Logo";
import { MobileMenu } from "./MobileMenu";

/** Sticky site header: brand, in-page links, language and the one download button. */
export function SiteHeader() {
	const { t } = useI18n();

	return (
		<header className="sticky top-0 z-40 border-b border-white/[0.08] bg-ink">
			<div className="mx-auto flex h-16 max-w-6xl items-center gap-2 px-4 sm:gap-6">
				<a
					href="/"
					aria-label="Snatch"
					className="shrink-0 rounded-lg focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-light focus-visible:ring-offset-2 focus-visible:ring-offset-ink"
				>
					<Logo className="text-lg max-[400px]:text-base" />
				</a>

				<nav className="hidden items-center gap-7 text-sm text-gray-400 md:flex">
					<a
						href="#features"
						className="transition-colors hover:text-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-light"
					>
						{t.nav.features}
					</a>
					<a
						href="#setup"
						className="transition-colors hover:text-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-light"
					>
						{t.nav.setup}
					</a>
					<a
						href={REPO_URL}
						className="inline-flex items-center gap-1.5 transition-colors hover:text-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-light"
					>
						<Github className="h-4 w-4" aria-hidden="true" />
						GitHub
					</a>
				</nav>

				<div className="ml-auto flex items-center gap-1">
					<LanguageMenu />
					<DownloadButton label={t.nav.download} className="h-10 px-4 text-sm">
						<span className="hidden sm:inline">{t.nav.download}</span>
					</DownloadButton>
					<MobileMenu />
				</div>
			</div>
		</header>
	);
}
