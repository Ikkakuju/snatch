import {
	ArrowLeft,
	ArrowRight,
	ChevronDown,
	Film,
	Link2,
	Lock,
	Music,
	RotateCw,
} from "lucide-react";

/*
 * Decorative pictures of the app, drawn with HTML in its own colours so they never
 * go stale like screenshots. Hidden from assistive tech: the copy beside them says
 * the same thing. Stills: Blender Foundation, CC BY 3.0 (credited in the footer).
 */

const surface = "bg-[#151030]";
const stroke = "border border-white/[0.08]";

/**
 * The hero: the app's link bar, scaled up, holding a pasted link. On load the
 * choices drop in under it and the download starts, once (`.demo-*` in styles.css).
 */
export function LinkDemo() {
	return (
		<div aria-hidden="true" className="mx-auto w-full max-w-3xl text-left">
			<div
				className={`flex h-16 items-center gap-3 rounded-full ${stroke} ${surface} pr-2 pl-6 shadow-[0_30px_80px_-30px_rgba(109,75,255,0.55)] sm:h-[4.5rem]`}
			>
				<Link2 className="h-5 w-5 shrink-0 text-[#8f86b8]" />
				<span className="min-w-0 flex-1 truncate text-base text-paper sm:text-xl">
					youtube.com/watch?v=aqz-KE-bpKQ
				</span>
				<span className="flex h-12 shrink-0 items-center rounded-full bg-[linear-gradient(90deg,#2f52ff,#6d4bff_55%,#8b4cf4)] px-6 text-base font-semibold text-white sm:h-14 sm:px-8">
					Get
				</span>
			</div>

			<div className={`demo-drop mx-4 mt-4 rounded-2xl ${stroke} ${surface} p-4 sm:mx-10 sm:p-5`}>
				<div className="flex gap-4">
					<img
						src="/stills/big-buck-bunny.jpg"
						alt=""
						className="aspect-video w-32 shrink-0 rounded-lg object-cover sm:w-44"
					/>
					<div className="min-w-0 flex-1">
						<p className="truncate font-medium text-paper">Big Buck Bunny</p>
						<p className="mt-0.5 text-sm text-[#8f86b8]">9:56</p>
						<div className="mt-3 flex flex-wrap gap-2 text-sm">
							<span className="inline-flex items-center gap-1.5 rounded-md bg-brand px-2.5 py-1 text-white">
								<Film className="h-3.5 w-3.5" />
								1080p
								<span className="text-white/70">1.2 GB</span>
							</span>
							<span
								className={`inline-flex items-center gap-1.5 rounded-md ${stroke} px-2.5 py-1 text-[#c9bdff]`}
							>
								<Film className="h-3.5 w-3.5" />
								720p
							</span>
							<span
								className={`inline-flex items-center gap-1.5 rounded-md ${stroke} px-2.5 py-1 text-[#c9bdff]`}
							>
								<Music className="h-3.5 w-3.5" />
								MP3
							</span>
						</div>
					</div>
				</div>
				<div className="mt-4 h-1.5 overflow-hidden rounded-full bg-white/[0.07]">
					<div className="demo-fill h-full rounded-full bg-[linear-gradient(90deg,#2f52ff,#8b4cf4)]" />
				</div>
				<p className="mt-2 text-xs text-[#8f86b8]">Big Buck Bunny [1080p].mp4, 7.4 MB/s</p>
			</div>
		</div>
	);
}

/** The built-in browser: a page playing a video, and Snatch offering to save it. */
export function BrowseDemo() {
	return (
		<div
			aria-hidden="true"
			className={`overflow-hidden rounded-2xl ${stroke} bg-[#0f0b22] text-left shadow-[0_40px_100px_-40px_rgba(0,0,0,0.9)]`}
		>
			<div className="flex items-center gap-2 border-b border-white/[0.06] px-3 py-2.5 text-[#8f86b8]">
				<ArrowLeft className="h-4 w-4" />
				<ArrowRight className="h-4 w-4 opacity-40" />
				<RotateCw className="h-3.5 w-3.5" />
				<span
					className={`flex min-w-0 flex-1 items-center gap-1.5 rounded-full ${stroke} ${surface} px-3 py-1 text-xs`}
				>
					<Lock className="h-3 w-3 shrink-0" />
					<span className="truncate">films.example/watch/sintel</span>
				</span>
				<span className="relative shrink-0">
					<span className="flex items-center gap-1 rounded-md bg-[linear-gradient(90deg,#2f52ff,#6d4bff_55%,#8b4cf4)] px-2.5 py-1 text-xs font-semibold text-white">
						Download Video · 1
						<ChevronDown className="h-3 w-3" />
					</span>
					<span className="absolute top-full right-0 z-10 mt-1.5 w-max rounded-lg border border-white/10 bg-[#1d1640] px-3 py-2 text-xs text-paper shadow-xl">
						Video 1 · HLS · cdn.films.example
					</span>
				</span>
			</div>
			<div className="relative">
				<img src="/stills/sintel.jpg" alt="" className="aspect-video w-full object-cover" />
				<div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/80 to-transparent px-4 pt-10 pb-3">
					<div className="h-1 rounded-full bg-white/25">
						<div className="h-full w-1/3 rounded-full bg-white" />
					</div>
				</div>
			</div>
		</div>
	);
}
