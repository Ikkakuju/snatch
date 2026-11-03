import { createFileRoute } from "@tanstack/react-router";
import { Github } from "lucide-react";
import { useEffect } from "react";
import { BrowseDemo, LinkDemo } from "../components/Demos";
import { DownloadButton } from "../components/DownloadButton";
import { DOWNLOAD_URL, REPO_URL } from "../config";
import { en } from "../i18n";
import { useI18n } from "../i18n/context";
import { pageHead, SITE_URL } from "../seo";

const softwareApplication = JSON.stringify({
	"@context": "https://schema.org",
	"@type": "SoftwareApplication",
	name: "Snatch",
	...(SITE_URL ? { url: `${SITE_URL}/` } : {}),
	description: en.seo.homeDescription,
	applicationCategory: "MultimediaApplication",
	operatingSystem: "macOS 14 or later",
	downloadUrl: DOWNLOAD_URL,
	isAccessibleForFree: true,
	license: "https://opensource.org/licenses/MIT",
	offers: { "@type": "Offer", price: "0", priceCurrency: "USD" },
	featureList: en.home.features.map((feature) => feature.title),
});

export const Route = createFileRoute("/")({
	head: () => ({
		...pageHead({ path: "/", title: en.seo.homeTitle, description: en.seo.homeDescription }),
		scripts: [{ type: "application/ld+json", children: softwareApplication }],
	}),
	component: Home,
});

function Home() {
	const { t } = useI18n();
	useEffect(() => {
		document.title = t.seo.homeTitle;
	}, [t.seo.homeTitle]);

	return (
		<main className="relative isolate text-paper">
			<div
				aria-hidden="true"
				className="pointer-events-none absolute inset-x-0 top-0 -z-10 h-[1100px] bg-[radial-gradient(ellipse_70%_60%_at_50%_0%,rgba(90,58,255,0.38),transparent_70%)]"
			/>

			<section className="mx-auto max-w-5xl px-4 pt-20 pb-24 text-center sm:pt-28 sm:pb-32">
				<h1 className="mx-auto max-w-4xl font-['Outfit'] text-[3.25rem] leading-[0.98] font-semibold tracking-[-0.045em] text-balance sm:text-7xl lg:text-[5.5rem]">
					{t.home.tagline}
				</h1>
				<p className="mx-auto mt-7 max-w-2xl text-base leading-relaxed text-pretty text-[#b9b2d6] sm:text-lg">
					{t.home.subtitle}
				</p>
				<div className="mt-10 flex flex-col items-center justify-center gap-4 sm:flex-row sm:gap-8">
					<DownloadButton className="h-14 w-full px-8 text-base sm:w-auto">
						{t.home.download}
					</DownloadButton>
					<a
						href={REPO_URL}
						className="inline-flex items-center gap-2 text-sm text-[#b9b2d6] transition-colors hover:text-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-light"
					>
						<Github className="h-4 w-4" aria-hidden="true" />
						{t.home.source}
					</a>
				</div>
				<p className="mt-5 text-sm text-[#8f86b8]">{t.home.requirements}</p>
				<div className="mt-16 sm:mt-20">
					<LinkDemo />
				</div>
			</section>

			<section id="features" className="scroll-mt-16 border-t border-white/[0.08]">
				<div className="mx-auto grid max-w-6xl items-center gap-12 px-4 py-20 sm:py-28 lg:grid-cols-[minmax(0,1fr)_minmax(0,1.15fr)] lg:gap-20">
					<div>
						<h2 className="font-['Outfit'] text-4xl font-semibold tracking-[-0.03em] text-balance sm:text-5xl">
							{t.home.waysTitle}
						</h2>
						<div className="mt-10 space-y-8">
							{t.home.ways.map((way) => (
								<div key={way.title} className="border-l-2 border-brand pl-5">
									<h3 className="text-lg font-semibold">{way.title}</h3>
									<p className="mt-2 max-w-md leading-relaxed text-[#b9b2d6]">{way.body}</p>
								</div>
							))}
						</div>
					</div>
					<BrowseDemo />
				</div>
			</section>

			<section className="border-t border-white/[0.08]">
				<div className="mx-auto max-w-6xl px-4 py-20 sm:py-28">
					<h2 className="font-['Outfit'] text-4xl font-semibold tracking-[-0.03em] sm:text-5xl">
						{t.home.featuresTitle}
					</h2>
					<dl className="mt-12 grid gap-x-12 gap-y-10 sm:grid-cols-2 lg:grid-cols-3">
						{t.home.features.map((feature) => (
							<div key={feature.title}>
								<dt className="font-semibold">{feature.title}</dt>
								<dd className="mt-2 max-w-sm leading-relaxed text-[#b9b2d6]">{feature.body}</dd>
							</div>
						))}
					</dl>
				</div>
			</section>

			<section id="setup" className="scroll-mt-16 border-t border-white/[0.08]">
				<div className="mx-auto grid max-w-6xl gap-10 px-4 py-20 sm:py-28 lg:grid-cols-[minmax(0,1fr)_minmax(0,1.15fr)] lg:gap-20">
					<div>
						<h2 className="font-['Outfit'] text-4xl font-semibold tracking-[-0.03em] text-balance sm:text-5xl">
							{t.home.firstOpenTitle}
						</h2>
						<p className="mt-5 max-w-md leading-relaxed text-[#b9b2d6]">{t.home.firstOpenIntro}</p>
					</div>
					<ol className="space-y-6">
						{t.home.firstOpenSteps.map((step, index) => (
							<li key={step} className="flex gap-5">
								<span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full border border-brand/60 font-['Outfit'] font-semibold text-[#c9bdff]">
									{index + 1}
								</span>
								<p className="pt-1.5 leading-relaxed text-paper/90">{step}</p>
							</li>
						))}
					</ol>
				</div>
			</section>
		</main>
	);
}
