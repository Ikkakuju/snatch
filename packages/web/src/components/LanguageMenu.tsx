import { Check, Translate } from "@phosphor-icons/react";
import { type KeyboardEvent as ReactKeyboardEvent, useEffect, useRef, useState } from "react";
import { LOCALE_CODES, LOCALE_LABELS } from "../i18n";
import { useI18n } from "../i18n/context";

/** The language picker: a mono button over a hairline panel. */
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
		<div ref={rootRef} className="relative flex h-9 items-center">
			<button
				ref={triggerRef}
				type="button"
				aria-haspopup="menu"
				aria-expanded={open}
				aria-controls={open ? "language-menu" : undefined}
				aria-label={`${t.language.label}: ${LOCALE_LABELS[locale]}`}
				onClick={() => setOpen((current) => !current)}
				className="label flex h-11 w-11 items-center justify-center gap-2 rounded-full text-muted transition-colors hover:bg-white/[0.06] hover:text-paper focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand lg:h-9 lg:w-auto lg:px-3"
			>
				<Translate weight="bold" className="h-3.5 w-3.5" aria-hidden="true" />
				<span className="hidden lg:inline">{LOCALE_LABELS[locale]}</span>
			</button>

			{open && (
				<div
					ref={menuRef}
					id="language-menu"
					role="menu"
					aria-label={t.language.label}
					onKeyDown={handleMenuKeys}
					className="fixed inset-x-2 top-[4rem] z-50 grid max-h-[calc(100dvh-5rem)] grid-cols-2 gap-0.5 overflow-y-auto border border-line bg-black p-1 sm:absolute sm:inset-x-auto sm:top-full sm:right-0 sm:mt-2 sm:max-h-[70vh] sm:w-[min(92vw,24rem)]"
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
							className={`flex h-11 w-full items-center justify-between gap-3 px-3 text-left text-sm transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand ${
								code === locale ? "text-paper" : "text-muted hover:bg-white/[0.04] hover:text-paper"
							}`}
						>
							<span>{LOCALE_LABELS[code]}</span>
							{code === locale && (
								<Check
									weight="bold"
									className="h-3.5 w-3.5 shrink-0 text-brand"
									aria-hidden="true"
								/>
							)}
						</button>
					))}
				</div>
			)}
		</div>
	);
}
