import { de } from "./locales/de";
import { en, type Messages } from "./locales/en";
import { es } from "./locales/es";
import { fr } from "./locales/fr";
import { id } from "./locales/id";
import { it } from "./locales/it";
import { ja } from "./locales/ja";
import { ko } from "./locales/ko";
import { pt } from "./locales/pt";
import { ru } from "./locales/ru";
import { vi } from "./locales/vi";
import { zhCN } from "./locales/zh-CN";
import { zhTW } from "./locales/zh-TW";

export { en, type Messages } from "./locales/en";

/** Native names, in the order the menu shows them. */
export const LOCALE_LABELS = {
	en: "English",
	"zh-CN": "中文简体",
	"zh-TW": "中文繁體",
	ja: "日本語",
	ko: "한국어",
	es: "Español",
	de: "Deutsch",
	fr: "Français",
	pt: "Português",
	it: "Italiano",
	ru: "Русский",
	vi: "Tiếng Việt",
	id: "Bahasa Indonesia",
} as const;

export type LocaleCode = keyof typeof LOCALE_LABELS;

export const LOCALE_CODES = Object.keys(LOCALE_LABELS) as LocaleCode[];

export const MESSAGES: Record<LocaleCode, Messages> = {
	en,
	"zh-CN": zhCN,
	"zh-TW": zhTW,
	ja,
	ko,
	es,
	de,
	fr,
	pt,
	it,
	ru,
	vi,
	id,
};

export function isLocaleCode(value: string | null | undefined): value is LocaleCode {
	return !!value && Object.hasOwn(MESSAGES, value);
}

/** Map a BCP 47 tag onto a dictionary; `zh` splits by script/region. */
function matchLocale(tag: string): LocaleCode | undefined {
	const lower = tag.toLowerCase();
	if (lower === "zh" || lower.startsWith("zh-")) {
		return /hant|-tw|-hk|-mo/.test(lower) ? "zh-TW" : "zh-CN";
	}
	const base = lower.split("-")[0] ?? "";
	return Object.hasOwn(MESSAGES, base) ? (base as LocaleCode) : undefined;
}

/** The first of the browser's languages that has a dictionary; English otherwise. */
export function detectLocale(): LocaleCode {
	if (typeof navigator === "undefined") return "en";
	for (const tag of [...(navigator.languages ?? []), navigator.language]) {
		if (!tag) continue;
		const match = matchLocale(tag);
		if (match) return match;
	}
	return "en";
}
