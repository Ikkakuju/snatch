import { Apple, Github } from "lucide-react";
import { DOWNLOAD_URL, REPO_URL } from "../config";
import { useI18n } from "../i18n/context";
import { Logo } from "./Logo";

/** Site footer: brand, license and the legal note, closed by a quiet download link. */
export function SiteFooter() {
	const { t } = useI18n();

	return (
		<footer className="border-t border-white/[0.08]">
			<div className="mx-auto flex max-w-6xl flex-col gap-6 px-4 py-10 sm:flex-row sm:items-start sm:justify-between">
				<div className="space-y-2">
					<a
						href="/"
						aria-label="Snatch"
						className="inline-block rounded-md focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-light"
					>
						<Logo className="text-base" />
					</a>
					<p className="max-w-md text-xs leading-relaxed text-gray-400">{t.home.legal}</p>
					<p className="max-w-md text-[11px] leading-relaxed text-gray-400">
						Stills from Big Buck Bunny and Sintel by the Blender Foundation, CC BY 3.0.
					</p>
				</div>
				<nav className="flex flex-wrap items-center gap-5 text-sm text-gray-400">
					<a
						href={DOWNLOAD_URL}
						className="inline-flex items-center gap-1.5 text-gray-200 transition-colors hover:text-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-light"
					>
						<Apple className="h-4 w-4" aria-hidden="true" />
						{t.home.download}
					</a>
					<a
						href={REPO_URL}
						className="inline-flex items-center gap-1.5 transition-colors hover:text-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-light"
					>
						<Github className="h-4 w-4" aria-hidden="true" />
						GitHub
					</a>
					<a
						href={`${REPO_URL}/blob/main/LICENSE`}
						className="transition-colors hover:text-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-light"
					>
						MIT
					</a>
				</nav>
			</div>
		</footer>
	);
}
