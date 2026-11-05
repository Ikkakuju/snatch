import {
	ArrowClockwise,
	ArrowLeft,
	ArrowRight,
	CaretDown,
	LockSimple,
} from "@phosphor-icons/react";
import { useI18n } from "../i18n/context";
import { Still } from "./Still";

/*
 * Decorative pictures of the app, drawn with HTML in its own palette so they never
 * go stale like screenshots. Hidden from assistive tech: the copy beside them says
 * the same thing. Stills: Blender Foundation, CC BY 3.0 (credited in the footer).
 */

const panel = "border border-line bg-white/[0.015]";

/** The built-in browser: a page playing a video, and Snatch offering to save it. */
export function BrowseDemo() {
	const { t } = useI18n();
	return (
		<div
			aria-hidden="true"
			className={`overflow-hidden rounded-[2px] ${panel} self-start text-left`}
		>
			<div className="flex items-center gap-2 border-b border-line px-3 py-2.5 text-dim">
				<ArrowLeft weight="bold" className="h-3.5 w-3.5" aria-hidden="true" />
				<ArrowRight weight="bold" className="h-3.5 w-3.5 opacity-40" aria-hidden="true" />
				<ArrowClockwise weight="bold" className="h-3 w-3" aria-hidden="true" />
				<span className="flex min-w-0 flex-1 items-center gap-1.5 border border-line px-2 py-1">
					<LockSimple weight="bold" className="h-2.5 w-2.5 shrink-0" aria-hidden="true" />
					<span className="truncate font-mono text-[11px]">films.example/watch/sintel</span>
				</span>
				<span className="label flex shrink-0 items-center gap-1 rounded-[2px] bg-brand px-2 py-1 text-black">
					{t.home.demo.downloadVideo} · 1
					<CaretDown weight="bold" className="h-3 w-3" aria-hidden="true" />
				</span>
			</div>
			<div className="flex items-center gap-2 border-b border-line px-3 py-2 font-mono text-[11px] text-muted">
				<span className="h-1 w-1 shrink-0 bg-brand" />
				{t.home.demo.stream} · HLS · cdn.films.example
			</div>
			<div className="relative">
				<Still src="/stills/sintel.jpg" className="aspect-video w-full" />
				<div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/80 to-transparent px-4 pt-10 pb-3">
					<div className="h-0.5 bg-white/25">
						<div className="h-full w-1/3 bg-paper" />
					</div>
				</div>
			</div>
		</div>
	);
}
