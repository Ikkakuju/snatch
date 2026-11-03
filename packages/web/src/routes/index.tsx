import { createFileRoute } from "@tanstack/react-router";
import {
	CirclePause,
	CodeXml,
	Download,
	Globe,
	KeyRound,
	type LucideIcon,
	MonitorDown,
	ShieldAlert,
	SlidersHorizontal,
} from "lucide-react";
import { useEffect } from "react";
import { Logo } from "../components/Logo";
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

/** One icon per entry of `home.features`, in the same order. */
const FEATURE_ICONS: LucideIcon[] = [
	Globe,
	SlidersHorizontal,
	CirclePause,
	KeyRound,
	MonitorDown,
	CodeXml,
];

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
		<div className="min-h-screen bg-black text-white selection:bg-purple-500/30">
			<div className="fixed inset-0 z-0 overflow-hidden pointer-events-none">
				<div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] rounded-full bg-purple-600/20 blur-[120px]" />
				<div className="absolute bottom-[-10%] right-[-10%] w-[40%] h-[40%] rounded-full bg-blue-600/20 blur-[120px]" />
			</div>

			<main className="relative z-10 container mx-auto px-4 py-20 max-w-5xl space-y-20">
				<section className="text-center space-y-6">
					<h1>
						<Logo />
						<span className="sr-only"> {t.home.h1Suffix}</span>
					</h1>
					<p className="text-3xl sm:text-4xl font-bold text-gray-100">{t.home.tagline}</p>
					<p className="text-lg text-gray-400 max-w-2xl mx-auto leading-relaxed">
						{t.home.subtitle}
					</p>
					<div className="flex flex-col items-center gap-3 pt-2">
						<a
							href={DOWNLOAD_URL}
							className="inline-flex items-center gap-2.5 rounded-xl bg-purple-600 px-6 py-3.5 text-lg font-semibold text-white transition-colors hover:bg-purple-500 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-purple-300"
						>
							<Download className="h-5 w-5" aria-hidden="true" />
							{t.home.download}
						</a>
						<p className="text-sm text-gray-500">{t.home.requirements}</p>
						<a
							href={REPO_URL}
							className="inline-flex items-center gap-1.5 rounded text-sm text-gray-400 underline underline-offset-4 hover:text-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-purple-400"
						>
							<CodeXml className="h-4 w-4" aria-hidden="true" />
							{t.home.source}
						</a>
					</div>
				</section>

				<section aria-labelledby="features" className="space-y-8">
					<h2 id="features" className="text-center text-2xl font-bold text-gray-100">
						{t.home.featuresTitle}
					</h2>
					<ul className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
						{t.home.features.map((feature, index) => {
							const Icon = FEATURE_ICONS[index] ?? Globe;
							return (
								<li
									key={feature.title}
									className="rounded-2xl border border-zinc-800 bg-zinc-900/40 p-5 space-y-2"
								>
									<Icon className="h-6 w-6 text-purple-400" aria-hidden="true" />
									<h3 className="font-semibold text-gray-100">{feature.title}</h3>
									<p className="text-sm text-gray-400 leading-relaxed">{feature.body}</p>
								</li>
							);
						})}
					</ul>
				</section>

				<section
					aria-labelledby="first-open"
					className="rounded-2xl border border-amber-500/20 bg-amber-500/5 p-6 space-y-2"
				>
					<h2
						id="first-open"
						className="flex items-center gap-2 text-lg font-semibold text-amber-200"
					>
						<ShieldAlert className="h-5 w-5" aria-hidden="true" />
						{t.home.firstOpenTitle}
					</h2>
					<p className="text-sm text-gray-300 leading-relaxed">{t.home.firstOpenBody}</p>
				</section>

				<footer className="text-center text-xs text-gray-500">{t.home.legal}</footer>
			</main>
		</div>
	);
}
