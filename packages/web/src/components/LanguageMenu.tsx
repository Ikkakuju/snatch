import { Check, Languages } from "lucide-react";
import { type KeyboardEvent as ReactKeyboardEvent, useEffect, useRef, useState } from "react";
import { LOCALE_CODES, LOCALE_LABELS } from "../i18n";
import { useI18n } from "../i18n/context";

/** The language picker: a compact button over a two-column dark panel. */
export function LanguageMenu() {
	const { locale, t, setLocale } = useI18n();
	const [open, setOpen] = useState(false);
	const rootRef = useRef<HTMLDivElement>(null);
	const triggerRef = useRef<HTMLButtonElement>(null);
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
			if (event.key !== "Escape") return;
			setOpen(false);
			triggerRef.current?.focus();
		};
		document.addEventListener("pointerdown", closeOnOutside);
		document.addEventListener("keydown", closeOnEscape);
		return () => {
			document.removeEventListener("pointerdown", closeOnOutside);
			document.removeEventListener("keydown", closeOnEscape);
		};
	}, [open]);

	// `role="menu"` promises focus inside it: land on the current language.
	useEffect(() => {
		if (open) menuRef.current?.querySelector<HTMLButtonElement>('[aria-checked="true"]')?.focus();
	}, [open]);

	return (
		<div ref={rootRef} className="relative flex h-16 items-center">
			<button
				ref={triggerRef}
				type="button"
				aria-haspopup="menu"
				aria-expanded={open}
				aria-controls={open ? "language-menu" : undefined}
				aria-label={`${t.language.label}: ${LOCALE_LABELS[locale]}`}
				onClick={() => setOpen((current) => !current)}
				className="flex h-11 items-center gap-2 rounded-md px-2.5 text-xs font-medium text-gray-400 transition-colors hover:bg-white/[0.04] hover:text-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-light"
			>
				<Languages className="h-4 w-4" aria-hidden="true" />
				<span className="hidden sm:inline">{LOCALE_LABELS[locale]}</span>
			</button>

			{open && (
				<div
					ref={menuRef}
					id="language-menu"
					role="menu"
					aria-label={t.language.label}
					onKeyDown={handleMenuKeys}
					className="fixed inset-x-2 top-[4.25rem] z-50 grid max-h-[calc(100dvh-5rem)] grid-cols-2 gap-0.5 overflow-y-auto rounded-lg border border-white/10 bg-[#14111f] p-1.5 shadow-2xl sm:absolute sm:inset-x-auto sm:top-full sm:right-0 sm:mt-2 sm:max-h-[70vh] sm:w-[min(92vw,26rem)]"
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
								triggerRef.current?.focus();
							}}
							className={`w-full rounded-md px-3 py-2.5 text-left text-sm transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-purple-400 ${
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
