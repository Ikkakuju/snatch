import type { Messages } from "./en";

export const de: Messages = {
	language: {
		label: "Sprache",
	},
	errors: {
		generic: "Etwas ist schiefgelaufen. Bitte erneut versuchen.",
	},
	errorBoundary: {
		title: "Etwas ist schiefgelaufen",
		retry: "Erneut versuchen",
		reload: "Seite neu laden",
		details: "Fehlerdetails",
	},
	seo: {
		homeTitle: "Snatch – kostenloser Video-Downloader für den Mac | snatchvideos",
		homeDescription:
			"Snatch ist eine kostenlose Open-Source-App für den Mac, die Videos von YouTube, X, TikTok, Instagram, Bilibili und Tausenden weiteren Seiten als MP4 oder MP3 speichert.",
	},
	home: {
		h1Suffix: "– kostenloser Video-Downloader für den Mac",
		tagline: "Lade jedes Video auf deinen Mac.",
		subtitle:
			"Füge einen Link von YouTube, X, TikTok, Instagram, Bilibili oder Tausenden anderen Seiten ein, und Snatch speichert ihn als MP4 oder MP3. Kostenlos und Open Source.",
		download: "Für Mac herunterladen",
		requirements: "macOS 14 oder neuer · Apple Silicon",
		source: "Quellcode auf GitHub",
		featuresTitle: "Was Snatch kann",
		features: [
			{
				title: "Tausende Seiten",
				body: "Basiert auf yt-dlp, das über 1.800 Seiten kennt und sich selbst aktualisiert, wenn sie sich ändern.",
			},
			{
				title: "Qualität nach Wahl",
				body: "Jede Auflösung, die das Video bietet, als MP4, das überall läuft – oder nur der Ton als MP3.",
			},
			{
				title: "Pausieren und fortsetzen",
				body: "Reihe beliebig viele Links ein. Pausiere jeden Download und setze ihn später fort, auch nach dem Beenden.",
			},
			{
				title: "Videos hinter einem Login",
				body: "Lass Snatch deine Cookies aus Safari, Chrome oder Firefox nutzen – für Videos, die nur dein Konto sehen kann.",
			},
			{
				title: "Läuft auf deinem Mac",
				body: "Downloads gehen direkt von der Seite in deinen Download-Ordner. Kein Server dazwischen, nichts wird hochgeladen.",
			},
			{
				title: "Kostenlos und Open Source",
				body: "MIT-lizenziert. Kein Konto, keine Werbung, kein Tracking in der App.",
			},
		],
		firstOpenTitle: "Snatch zum ersten Mal öffnen",
		firstOpenBody:
			"Snatch ist kostenlos und nicht von Apple notarisiert, deshalb blockiert macOS den ersten Start. Zieh Snatch in den Ordner „Programme“ und öffne es einmal. Gehe dann zu Systemeinstellungen → Datenschutz & Sicherheit und klicke auf „Dennoch öffnen“. Snatch fragt dann, ob es yt-dlp und später ffmpeg installieren soll, zusammen etwa 110 MB.",
		legal:
			"Lade nur Videos herunter, die du behalten darfst, und beachte die Nutzungsbedingungen jeder Seite.",
	},
};
