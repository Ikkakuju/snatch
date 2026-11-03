import {
	createContext,
	type ReactNode,
	useCallback,
	useContext,
	useEffect,
	useMemo,
	useState,
} from "react";
import { detectLocale, isLocaleCode, type LocaleCode, MESSAGES, type Messages } from "./index";

const STORAGE_KEY = "snatch.locale";

interface I18nValue {
	locale: LocaleCode;
	t: Messages;
	setLocale: (locale: LocaleCode) => void;
}

const I18nContext = createContext<I18nValue | null>(null);

export function I18nProvider({ children }: { children: ReactNode }) {
	const [locale, setLocaleState] = useState<LocaleCode>("en");

	// Read the stored choice after mount: the prerendered HTML is English, so
	// starting from a detected locale would be a hydration mismatch.
	useEffect(() => {
		let stored: string | null = null;
		try {
			stored = window.localStorage.getItem(STORAGE_KEY);
		} catch {
			// Storage can be unavailable (private mode, blocked cookies).
		}
		setLocaleState(isLocaleCode(stored) ? stored : detectLocale());
	}, []);

	useEffect(() => {
		document.documentElement.lang = locale;
	}, [locale]);

	const setLocale = useCallback((next: LocaleCode) => {
		setLocaleState(next);
		try {
			window.localStorage.setItem(STORAGE_KEY, next);
		} catch {
			// A failed write costs persistence, not the switch itself.
		}
	}, []);

	const value = useMemo(() => ({ locale, t: MESSAGES[locale], setLocale }), [locale, setLocale]);
	return <I18nContext.Provider value={value}>{children}</I18nContext.Provider>;
}

export function useI18n(): I18nValue {
	const value = useContext(I18nContext);
	if (!value) throw new Error("useI18n must be used inside I18nProvider");
	return value;
}
