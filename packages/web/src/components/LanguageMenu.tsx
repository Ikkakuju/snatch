import { Check, Languages } from "lucide-react";
import { type KeyboardEvent as ReactKeyboardEvent, useEffect, useRef, useState } from "react";
import { LOCALE_CODES, LOCALE_LABELS } from "../i18n";
import { useI18n } from "../i18n/context";

/** The language picker: a compact button over a two-column dark panel. */
export function LanguageMenu() {
	const { locale, t, setLocale } = useI18n();
	const [open, setOpen] = useState(false);
	const rootRef = useRef<HTMLDivElement>(null);
	const menuRef = useRef<HTMLDivElement>(null);

	// `role="menu"` promises arrow-key navigation; without this the roles lie to AT.
	const handleMenuKeys = (event: ReactKeyboardEvent<HTMLDivElement>) => {
		const items = Array.from(
			menuRef.current?.querySelectorAll<HTMLButtonElement>('[role="menuitemradio"]') ?? [],
		);
		if (!items.length) return;
		const index = items.indexOf(document.activeElement as HTMLButtonElement);
		const moveTo = (next: number) => {
			event.preventDefault();
			items[(next + items.length) % items.length]?.focus();
		};
		if (event.key === "ArrowDown") moveTo(index + 1);
		else if (event.key === "ArrowUp") moveTo(index - 1);
		else if (event.key === "Home") moveTo(0);
		else if (event.key === "End") moveTo(items.length - 1);
	};

	useEffect(() => {
		if (!open) return;
		const closeOnOutside = (event: PointerEvent) => {
			if (!rootRef.current?.contains(event.target as Node)) setOpen(false);
		};
		const closeOnEscape = (event: KeyboardEvent) => {
			if (event.key === "Escape") setOpen(false);
		};
		document.addEventListener("pointerdown", closeOnOutside);
		document.addEventListener("keydown", closeOnEscape);
		return () => {
			document.removeEventListener("pointerdown", closeOnOutside);
			document.removeEventListener("keydown", closeOnEscape);
		};
	}, [open]);

	return (
		<div
			ref={rootRef}
			className="fixed top-4 right-4 z-30 pt-[env(safe-area-inset-top)] pr-[env(safe-area-inset-right)]"
		>
			<button
				type="button"
				aria-haspopup="menu"
				aria-expanded={open}
				aria-label={t.language.label}
				onClick={() => setOpen((current) => !current)}
				className="flex items-center gap-2 rounded-full border border-white/10 bg-black/60 px-3 py-2 text-xs font-medium text-gray-300 backdrop-blur transition-colors hover:border-white/25 hover:text-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-purple-400 focus-visible:ring-offset-2 focus-visible:ring-offset-black"
			>
				<Languages className="h-4 w-4" aria-hidden="true" />
				<span className="hidden sm:inline">{LOCALE_LABELS[locale]}</span>
			</button>

			{open && (
				<div
					ref={menuRef}
					role="menu"
					aria-label={t.language.label}
					onKeyDown={handleMenuKeys}
					className="absolute right-0 mt-2 grid w-[min(92vw,26rem)] grid-cols-2 gap-1 rounded-2xl border border-white/10 bg-zinc-950/95 p-2 shadow-2xl backdrop-blur"
				>
					{LOCALE_CODES.map((code) => (
						<button
							key={code}
							type="button"
							role="menuitemradio"
							aria-checked={code === locale}
							lang={code}
							onClick={() => {
								setLocale(code);
								setOpen(false);
							}}
							className={`w-full rounded-xl px-4 py-3 text-left text-base transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-purple-400 ${
								code === locale
									? "font-semibold text-white"
									: "text-gray-400 hover:bg-white/5 hover:text-white"
							}`}
						>
							<span className="flex items-center justify-between gap-3">
								<span>{LOCALE_LABELS[code]}</span>
								{code === locale && (
									<Check className="h-4 w-4 shrink-0 text-purple-300" aria-hidden="true" />
								)}
							</span>
						</button>
					))}
				</div>
			)}
		</div>
	);
}
