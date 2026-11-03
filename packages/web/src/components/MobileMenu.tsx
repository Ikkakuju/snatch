import { Github, Menu, X } from "lucide-react";
import { useEffect, useRef, useState } from "react";
import { REPO_URL } from "../config";
import { useI18n } from "../i18n/context";

/** The header links collapsed into a disclosure below `md`, where they do not fit. */
export function MobileMenu() {
	const { t } = useI18n();
	const [open, setOpen] = useState(false);
	const rootRef = useRef<HTMLDivElement>(null);
	const triggerRef = useRef<HTMLButtonElement>(null);

	useEffect(() => {
		if (!open) return;
		const closeOnOutside = (event: PointerEvent) => {
			if (!rootRef.current?.contains(event.target as Node)) setOpen(false);
		};
		const closeOnEscape = (event: KeyboardEvent) => {
			if (event.key !== "Escape") return;
			setOpen(false);
			triggerRef.current?.focus();
		};
		// Any activation inside the panel (mouse or Enter) dismisses it.
		const closeOnLink = (event: MouseEvent) => {
			if ((event.target as Element).closest("#mobile-menu a")) setOpen(false);
		};
		document.addEventListener("pointerdown", closeOnOutside);
		document.addEventListener("keydown", closeOnEscape);
		document.addEventListener("click", closeOnLink);
		return () => {
			document.removeEventListener("pointerdown", closeOnOutside);
			document.removeEventListener("keydown", closeOnEscape);
			document.removeEventListener("click", closeOnLink);
		};
	}, [open]);

	return (
		<div ref={rootRef} className="relative flex h-16 items-center md:hidden">
			<button
				ref={triggerRef}
				type="button"
				aria-expanded={open}
				aria-controls={open ? "mobile-menu" : undefined}
				aria-label={t.nav.menu}
				onClick={() => setOpen((current) => !current)}
				className="flex h-11 w-11 items-center justify-center rounded-md text-gray-400 transition-colors hover:bg-white/[0.04] hover:text-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-light"
			>
				{open ? (
					<X className="h-4 w-4" aria-hidden="true" />
				) : (
					<Menu className="h-4 w-4" aria-hidden="true" />
				)}
			</button>

			{open && (
				<nav
					id="mobile-menu"
					aria-label={t.nav.menu}
					className="absolute top-full right-0 z-50 mt-2 w-52 rounded-lg border border-white/10 bg-[#14111f] p-1.5 shadow-2xl"
				>
					<a
						href="#features"
						className="block rounded-md px-3 py-3 text-sm text-gray-300 transition-colors hover:bg-white/5 hover:text-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-light"
					>
						{t.nav.features}
					</a>
					<a
						href="#setup"
						className="block rounded-md px-3 py-3 text-sm text-gray-300 transition-colors hover:bg-white/5 hover:text-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-light"
					>
						{t.nav.setup}
					</a>
					<a
						href={REPO_URL}
						className="flex items-center gap-2 rounded-md px-3 py-3 text-sm text-gray-300 transition-colors hover:bg-white/5 hover:text-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-light"
					>
						<Github className="h-4 w-4" aria-hidden="true" />
						GitHub
					</a>
				</nav>
			)}
		</div>
	);
}
