import type { Messages } from "./en";

export const de: Messages = {
	language: {
		label: "Sprache",
	},
	nav: {
		features: "So funktioniert’s",
		setup: "Erster Start",
		download: "Herunterladen",
		menu: "Menü",
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
		whatsNew: "Neu: der integrierte Browser",
		tagline: "Link einfügen. Video behalten.",
		subtitle:
			"Snatch speichert Videos von YouTube, X, TikTok, Instagram, Bilibili und 1.800 weiteren Seiten auf deinem Mac, als MP4 oder MP3. Jede andere Seite öffnest du im eingebauten Browser und speicherst, was dort läuft.",
		download: "Für Mac herunterladen",
		requirements: "Kostenlos, für macOS 14 oder neuer auf Apple silicon.",
		source: "Quellcode auf GitHub",
		waysTitle: "Zwei Wege, ein Video zu speichern",
		ways: [
			{
				title: "Link einfügen",
				body: "Für YouTube, X, TikTok, Instagram, Bilibili und alle anderen Seiten, die yt-dlp kennt. Snatch zeigt jede Auflösung, in der es das Video gibt, dazu MP3.",
			},
			{
				title: "Seite öffnen",
				body: "Für alles andere. Öffne die Seite in Snatch und spiel das Video ab. Snatch erkennt den Stream und speichert ihn, angemeldet wie du.",
			},
		],
		featuresTitle: "Die Details",
		features: [
			{
				title: "MP4, das überall läuft",
				body: "Videos werden als H.264 und AAC gespeichert, also öffnen sie sich in QuickTime und auf dem iPhone. Oder behalte nur den Ton, als MP3.",
			},
			{
				title: "Pausieren, beenden, später weitermachen",
				body: "Es laufen zwei Downloads gleichzeitig. Pausiere einen oder beende Snatch – es macht dort weiter, wo es aufgehört hat.",
			},
			{
				title: "Deine Anmeldungen",
				body: "Auch Videos, die nur dein Konto sehen kann, lassen sich laden: Melde dich im eingebauten Browser an oder lass Snatch Safari, Chrome oder Firefox nutzen.",
			},
			{
				title: "Nichts verlässt deinen Mac",
				body: "Videos gehen direkt von der Seite in deinen Downloads-Ordner. Kein Snatch-Server, kein Konto, kein Tracking.",
			},
			{
				title: "Open Source",
				body: "MIT-Lizenz, auf GitHub. yt-dlp, die Engine darunter, wird täglich aktualisiert, wenn sich Seiten ändern.",
			},
			{
				title: "Was es nicht speichern kann",
				body: "Kopiergeschützte Streams wie Netflix oder Disney+ bleiben verschlüsselt. Snatch sagt dir, wenn eine Seite sie nutzt.",
			},
		],
		firstOpenTitle: "Snatch zum ersten Mal öffnen",
		firstOpenIntro:
			"Snatch ist kostenlos und nicht von Apple notarisiert, deshalb bittet macOS dich einmal um Bestätigung.",
		firstOpenSteps: [
			"Öffne Snatch.dmg und zieh Snatch in den Ordner „Programme“.",
			"Öffne Snatch. Wenn macOS meldet, dass es die App nicht überprüfen kann, klicke auf „Fertig“.",
			"Klicke in Systemeinstellungen → Datenschutz & Sicherheit auf „Dennoch öffnen“.",
			"Snatch fragt, ob es yt-dlp (etwa 55 MB) installieren soll. Beim ersten Speichern eines Videos fragt es zusätzlich nach ffmpeg.",
		],
		legal:
			"Lade nur Videos herunter, die du behalten darfst, und beachte die Nutzungsbedingungen jeder Seite.",
	},
};
