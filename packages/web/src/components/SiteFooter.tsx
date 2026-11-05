import { GithubLogo } from "@phosphor-icons/react";
import { REPO_URL } from "../config";
import { useI18n } from "../i18n/context";
import { Logo } from "./Logo";

/** Site footer: brand, the legal line and the credits, and nothing that repeats the CTA. */
export function SiteFooter() {
	const { t } = useI18n();

	return (
		<footer className="border-t border-line">
			<div className="mx-auto flex max-w-6xl flex-col gap-8 px-5 py-10 sm:flex-row sm:items-start sm:justify-between sm:px-8">
				<div className="space-y-3">
					<a
						href="/"
						aria-label="Snatch"
						className="inline-block rounded-[2px] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand"
					>
						<Logo />
					</a>
					<p className="max-w-md text-xs leading-5 text-dim">{t.home.legal}</p>
					<p className="max-w-md text-[11px] leading-4 text-dim">
						Stills from Big Buck Bunny and Sintel by the Blender Foundation, CC BY 3.0.
					</p>
				</div>
				<div className="label flex flex-wrap items-center gap-x-6 gap-y-3 text-muted">
					<a
						href={REPO_URL}
						className="inline-flex items-center gap-2 transition-colors hover:text-paper focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand"
					>
						<GithubLogo weight="bold" className="h-3.5 w-3.5" aria-hidden="true" />
						GitHub
					</a>
					<a
						href={`${REPO_URL}/issues`}
						className="transition-colors hover:text-paper focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand"
					>
						{t.nav.issues}
					</a>
					<a
						href={`${REPO_URL}/blob/main/LICENSE`}
						className="transition-colors hover:text-paper focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand"
					>
						MIT
					</a>
				</div>
			</div>
		</footer>
	);
}
