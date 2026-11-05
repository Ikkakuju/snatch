import { CheckCircle, Clock, FilmStrip, Link as LinkIcon } from "@phosphor-icons/react";
import { useI18n } from "../i18n/context";

/*
 * A window of the actual app, drawn with HTML so it never goes stale: sidebar, the
 * link bar, and one card per state (downloading, saved, waiting). Decorative only.
 */

const panel = "bg-white/[0.035]";

function Still({ src, className = "" }: { src: string; className?: string }) {
	return (
		<span className={`relative block overflow-hidden bg-brand/80 ${className}`}>
			<img
				src={src}
				alt=""
				className="h-full w-full object-cover opacity-90 mix-blend-luminosity grayscale brightness-[0.78] contrast-[1.08]"
			/>
		</span>
	);
}

function SidebarRow({
	label,
	count,
	active = false,
}: {
	label: string;
	count?: number;
	active?: boolean;
}) {
	return (
		<span
			className={`flex h-8 items-center justify-between rounded-[3px] px-2 text-[12px] ${
				active ? "bg-brand/15 text-paper" : "text-muted"
			}`}
		>
			<span className="truncate">{label}</span>
			{typeof count === "number" && <span className="font-mono text-[10px] text-dim">{count}</span>}
		</span>
	);
}

export function AppWindow() {
	const { t } = useI18n();

	return (
		<div
			aria-hidden="true"
			className="w-full overflow-hidden rounded-xl border border-line bg-black text-left shadow-[0_60px_140px_-60px_rgba(167,139,250,0.4)]"
		>
			<div className="flex h-9 items-center gap-1.5 border-b border-line px-3">
				<span className="h-2.5 w-2.5 rounded-full bg-white/15" />
				<span className="h-2.5 w-2.5 rounded-full bg-white/15" />
				<span className="h-2.5 w-2.5 rounded-full bg-white/15" />
			</div>

			<div className="flex">
				<aside className="hidden w-44 shrink-0 flex-col gap-4 border-r border-line p-3 sm:flex">
					<div className="flex items-center gap-2 px-1">
						<img src="/logo.svg" alt="" className="h-5 w-5" />
						<span className="text-[12px] font-medium">Snatch</span>
					</div>
					<div className="space-y-0.5">
						<SidebarRow label="All Downloads" count={3} active />
						<SidebarRow label="In Progress" count={1} />
						<SidebarRow label="Finished" count={2} />
					</div>
					<div className="space-y-0.5">
						<SidebarRow label="Browse" />
						<SidebarRow label="General" />
					</div>
				</aside>

				<div className="min-w-0 flex-1 p-3 sm:p-4">
					<div className="flex h-10 items-center gap-2 rounded-full bg-white/[0.05] pr-1 pl-3">
						<LinkIcon weight="bold" className="h-3.5 w-3.5 shrink-0 text-dim" />
						<span className="min-w-0 flex-1 truncate font-mono text-[11px] text-muted">
							youtube.com/watch?v=aqz-KE-bpKQ
						</span>
						<span className="label flex h-8 items-center rounded-full bg-brand px-3 text-black">
							{t.home.demo.get}
						</span>
					</div>

					<div className="mt-4 grid gap-3 sm:grid-cols-3">
						<div className={`${panel} flex flex-col overflow-hidden rounded-lg`}>
							<Still src="/stills/big-buck-bunny.jpg" className="aspect-video w-full" />
							<div className="flex items-center justify-between gap-2 px-2.5 pt-2">
								<span className="label rounded-[2px] bg-brand px-1.5 py-0.5 text-black">1080p</span>
								<span className="label text-[10px] text-dim">62%</span>
							</div>
							<div className="px-2.5 pt-2">
								<span className="block h-0.5 overflow-hidden rounded-full bg-white/10">
									<span className="block h-full w-[62%] bg-brand" />
								</span>
							</div>
							<p className="truncate px-2.5 py-2 text-[11px] text-muted">Big Buck Bunny</p>
						</div>

						<div className={`${panel} flex flex-col overflow-hidden rounded-lg`}>
							<Still src="/stills/sintel.jpg" className="aspect-video w-full" />
							<div className="flex items-center justify-between gap-2 px-2.5 pt-2">
								<span className="label flex items-center gap-1 text-[10px] text-brand">
									<CheckCircle weight="fill" className="h-3 w-3" />
									1080p
								</span>
								<span className="label text-[10px] text-dim">1.2 GB</span>
							</div>
							<p className="truncate px-2.5 py-2 text-[11px] text-muted">Sintel</p>
						</div>

						<div className={`${panel} flex flex-col overflow-hidden rounded-lg`}>
							<span className="flex aspect-video w-full items-center justify-center bg-white/[0.03]">
								<FilmStrip weight="regular" className="h-6 w-6 text-dim" />
							</span>
							<div className="flex items-center justify-between gap-2 px-2.5 pt-2">
								<span className="label flex items-center gap-1 text-[10px] text-muted">
									<Clock weight="bold" className="h-3 w-3" />
									720p
								</span>
								<span className="label text-[10px] text-dim">—</span>
							</div>
							<p className="truncate px-2.5 py-2 text-[11px] text-muted">Local recording</p>
						</div>
					</div>
				</div>
			</div>
		</div>
	);
}
