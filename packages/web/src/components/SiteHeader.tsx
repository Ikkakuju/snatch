import { useI18n } from "../i18n/context";
import { DownloadButton } from "./DownloadButton";
import { LanguageMenu } from "./LanguageMenu";
import { Logo } from "./Logo";
import { MobileMenu } from "./MobileMenu";

/** Sticky header: brand, mono in-page links, language and the one download button. */
export function SiteHeader() {
	const { t } = useI18n();

	return (
		<header className="sticky top-0 z-40 border-b border-line bg-black/85 backdrop-blur-md">
			<div className="mx-auto flex h-14 max-w-6xl items-center gap-3 px-5 sm:gap-8 sm:px-8">
				<a
					href="/"
					aria-label="Snatch"
					className="shrink-0 rounded-[2px] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand"
				>
					<Logo />
				</a>

				<nav aria-label={t.nav.menu} className="label hidden items-center gap-7 text-muted md:flex">
					<a
						href="#features"
						className="transition-colors hover:text-paper focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand"
					>
						{t.nav.features}
					</a>
					<a
						href="#setup"
						className="transition-colors hover:text-paper focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand"
					>
						{t.nav.setup}
					</a>
				</nav>

				<div className="ml-auto flex items-center gap-2">
					<LanguageMenu />
					<DownloadButton label={t.nav.download} className="h-11 px-4 lg:h-9 lg:px-3">
						<span className="whitespace-nowrap">{t.nav.download}</span>
					</DownloadButton>
					<MobileMenu />
				</div>
			</div>
		</header>
	);
}
