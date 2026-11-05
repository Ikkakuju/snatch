import { ArrowUpRight, CaretRight } from "@phosphor-icons/react";
import { createFileRoute } from "@tanstack/react-router";
import { useEffect } from "react";
import { AppWindow } from "../components/AppWindow";
import { Backdrop } from "../components/Backdrop";
import { BrowseDemo } from "../components/Demos";
import { DownloadButton } from "../components/DownloadButton";
import { DOWNLOAD_URL } from "../config";
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

/** A hairline rule with a mono label, the page's only section marker. */
function SectionMark({ label, heading = false }: { label: string; heading?: boolean }) {
	return (
		<div className="flex items-center gap-4">
			{heading ? (
				<h2 className="label text-brand">{label}</h2>
			) : (
				<span className="label text-brand">{label}</span>
			)}
		</div>
	);
}

function Home() {
	const { t } = useI18n();
	useEffect(() => {
		document.title = t.seo.homeTitle;
	}, [t.seo.homeTitle]);

	return (
		<main id="main" className="relative isolate text-paper">
			<section className="relative overflow-hidden border-b border-line">
				<div aria-hidden="true" className="pointer-events-none absolute inset-0 -z-10">
					<Backdrop className="h-full w-full" />
					{/* The limb stays at the edges; the reading area stays black. */}
					<div className="absolute inset-0 bg-[radial-gradient(52%_46%_at_50%_42%,rgba(0,0,0,0.88),transparent_74%)]" />
				</div>

				<div className="mx-auto max-w-6xl px-5 pt-24 pb-14 text-center sm:px-8 sm:pt-28 sm:pb-16">
					<a
						href="#features"
						className="label inline-flex items-center gap-2 rounded-full border border-line bg-white/[0.03] px-4 py-2 text-muted transition-colors hover:border-brand/50 hover:text-brand focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand"
					>
						<span className="h-1.5 w-1.5 rounded-full bg-brand" />
						{t.home.whatsNew}
						<CaretRight weight="bold" className="h-3 w-3" aria-hidden="true" />
					</a>

					<h1 className="mx-auto mt-8 max-w-4xl text-[clamp(2.75rem,6.2vw,4.75rem)] leading-[1.02] font-semibold tracking-[-0.04em] text-balance whitespace-pre-line">
						{t.home.tagline}
					</h1>
					<p className="mx-auto mt-6 max-w-xl text-[15px] leading-7 text-balance text-muted sm:text-base">
						{t.home.subtitle}
					</p>

					<div className="mt-9 flex flex-col items-center justify-center gap-3 sm:flex-row">
						<DownloadButton className="h-12 w-full px-7 sm:w-auto">
							{t.home.download}
						</DownloadButton>
						<a
							href="#features"
							className="label inline-flex h-12 w-full items-center justify-center gap-2 rounded-full border border-line px-6 text-muted transition-colors hover:border-white/25 hover:text-paper focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand sm:w-auto"
						>
							{t.nav.features}
							<CaretRight weight="bold" className="h-3 w-3" aria-hidden="true" />
						</a>
					</div>

					<div className="mt-5 flex flex-col items-center gap-1.5">
						<p className="text-[13px] leading-5 text-dim">{t.home.requirements}</p>
						<a
							href="#setup"
							className="inline-flex items-center gap-1 text-[13px] leading-5 text-brand transition-colors hover:text-brand-light focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand"
						>
							{t.home.unsignedNote}
							<ArrowUpRight weight="bold" className="h-3 w-3" aria-hidden="true" />
						</a>
					</div>

					<div className="mt-14 sm:mt-16">
						<AppWindow />
					</div>
				</div>
			</section>

			<section id="features" className="scroll-mt-14">
				<div className="mx-auto max-w-6xl px-5 py-14 sm:px-8 sm:py-20">
					<SectionMark label={t.nav.features} />
					<div className="mt-10 grid gap-10 lg:grid-cols-[minmax(0,1fr)_minmax(0,1.1fr)] lg:gap-16">
						<div>
							<h2 className="max-w-md text-3xl leading-tight font-semibold tracking-[-0.03em] text-balance sm:text-4xl">
								{t.home.waysTitle}
							</h2>
							<div className="mt-8 space-y-3">
								{t.home.ways.map((way, index) => (
									<div key={way.title} className="rounded-lg bg-white/[0.025] px-5 py-4">
										<div className="flex items-baseline gap-3">
											<span className="label text-brand">{String(index + 1).padStart(2, "0")}</span>
											<h3 className="text-base font-medium text-paper">{way.title}</h3>
										</div>
										<p className="mt-2 text-sm leading-6 text-muted">{way.body}</p>
									</div>
								))}
							</div>
						</div>
						<BrowseDemo />
					</div>
				</div>
			</section>

			<section>
				<div className="mx-auto max-w-6xl px-5 py-14 sm:px-8 sm:py-20">
					<SectionMark label={t.home.featuresTitle} heading />
					<dl className="mt-8 grid gap-y-8 sm:grid-cols-2 sm:gap-x-12">
						{t.home.features.map((feature) => (
							<div key={feature.title}>
								<dt className="text-[15px] font-medium text-paper">{feature.title}</dt>
								<dd className="mt-2 max-w-md text-sm leading-6 text-muted">{feature.body}</dd>
							</div>
						))}
					</dl>
				</div>
			</section>

			<section id="setup" className="scroll-mt-14">
				<div className="mx-auto max-w-6xl px-5 py-14 sm:px-8 sm:py-20">
					<SectionMark label={t.nav.setup} heading />
					<div className="mt-8 grid gap-10 lg:grid-cols-[minmax(0,1fr)_minmax(0,1.1fr)] lg:gap-16">
						<p className="max-w-sm text-[15px] leading-7 text-muted">{t.home.firstOpenIntro}</p>
						<details className="group w-fit rounded-lg bg-white/[0.025]">
							<summary className="flex cursor-pointer list-none items-center gap-3 px-5 py-3.5 marker:content-none focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand">
								<CaretRight
									weight="bold"
									className="h-3.5 w-3.5 shrink-0 text-brand transition-transform group-open:rotate-90"
									aria-hidden="true"
								/>
								<span className="label text-paper">{t.home.stepsToggle}</span>
							</summary>
							<ol className="px-5 pb-2">
								{t.home.firstOpenSteps.map((step) => (
									<li key={step} className="py-3 text-sm leading-6 text-muted">
										{step}
									</li>
								))}
							</ol>
						</details>
					</div>
				</div>
			</section>

			<section>
				<div className="mx-auto max-w-3xl px-5 py-20 text-center sm:px-8 sm:py-28">
					<h2 className="text-4xl leading-tight font-semibold tracking-[-0.035em] text-balance sm:text-5xl">
						{t.home.closingTitle}
					</h2>
					<div className="mt-8 flex justify-center">
						<DownloadButton className="h-12 w-full px-7 sm:w-auto">
							{t.home.download}
						</DownloadButton>
					</div>
					<p className="mt-6 text-[13px] leading-5 text-dim">{t.home.requirements}</p>
				</div>
			</section>
		</main>
	);
}
