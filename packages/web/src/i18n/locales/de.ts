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
		skip: "Zum Inhalt springen",
		issues: "Probleme",
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
			"Snatch ist eine kostenlose Open-Source-App für den Mac, die Videos von YouTube, X, TikTok, Instagram, Bilibili und 1.800 weiteren Seiten als MP4 oder MP3 speichert.",
	},
	home: {
		whatsNew: "Neu: der integrierte Browser",
		tagline: "Link einfügen. Video behalten.",
		subtitle:
			"Snatch speichert Videos von YouTube, X, TikTok, Instagram, Bilibili und 1.800 weiteren Seiten auf deinem Mac, als MP4 oder MP3.",
		download: "Für Mac herunterladen",
		requirements: "Kostenlos, für macOS 14 oder neuer auf Apple Silicon.",
		unsignedNote: "Unsignierter Build: macOS bittet beim ersten Start einmalig um Bestätigung.",
		closingTitle: "Füge deinen ersten Link ein.",
		stepsToggle: "Schritte anzeigen",
		source: "Quellcode auf GitHub",
		demo: {
			get: "Laden",
			downloadVideo: "Video laden",
			stream: "Video 1",
		},
		waysTitle: "Zwei Wege, ein Video zu speichern",
		ways: [
			{
				title: "Link einfügen",
				body: "Für YouTube, X, TikTok, Instagram, Bilibili und alle anderen von yt-dlp unterstützten Websites. Snatch listet jede verfügbare Auflösung des Videos sowie MP3 auf.",
			},
			{
				title: "Seite öffnen",
				body: "Für alle anderen Websites. Öffne die Seite in Snatch und spiele das Video ab. Snatch erkennt den Stream und speichert ihn – direkt mit deinem bestehenden Login.",
			},
		],
		featuresTitle: "Die Details",
		features: [
			{
				title: "MP4, das überall läuft",
				body: "Videos werden als H.264 und AAC gespeichert, also öffnen sie sich direkt in QuickTime und auf dem iPhone. Oder behalte nur die Tonspur als MP3.",
			},
			{
				title: "Pausieren, beenden, später weitermachen",
				body: "Mehrere Downloads laufen gleichzeitig. Pausiere einen Download oder beende Snatch – der Vorgang wird nahtlos an der unterbrochenen Stelle fortgesetzt.",
			},
			{
				title: "Bestehende Logins nutzen",
				body: "Auch Videos, die nur mit deinem Konto sichtbar sind, lassen sich laden: Melde dich im integrierten Browser an oder erlaube Snatch, Cookies und Anmeldungen aus Safari, Chrome oder Firefox zu verwenden.",
			},
			{
				title: "Keine Daten verlassen deinen Mac",
				body: "Videos werden direkt von der Quellseite in deinen Downloads-Ordner geladen. Kein Snatch-Server, kein Account erforderlich, keinerlei Tracking.",
			},
			{
				title: "Vollständig Open Source",
				body: "Unter MIT-Lizenz auf GitHub verfügbar. Die zugrundeliegende Engine yt-dlp wird täglich aktualisiert, um mit Änderungen der Webseiten Schritt zu halten.",
			},
			{
				title: "Nicht unterstützte Inhalte",
				body: "Kopiergeschützte DRM-Streams (z. B. von Netflix oder Disney+) bleiben verschlüsselt und können nicht gespeichert werden. Snatch weist dich darauf hin, wenn eine Seite solchen Schutz nutzt.",
			},
		],
		firstOpenIntro:
			"Snatch ist kostenlos und nicht von Apple notarisiert, deshalb bittet macOS dich beim ersten Öffnen um Bestätigung.",
		firstOpenSteps: [
			"Öffne Snatch.dmg und ziehe Snatch in den Ordner „Programme“.",
			"Öffne Snatch. Wenn macOS meldet, dass die App nicht überprüft werden kann, klicke auf „Fertig“.",
			"Klicke in den Systemeinstellungen unter „Datenschutz & Sicherheit“ auf „Dennoch öffnen“.",
			"Snatch bittet um die Installation von yt-dlp (ca. 55 MB). Beim ersten Speichern eines Videos wird zusätzlich ffmpeg angefordert.",
		],
		legal:
			"Lade nur Videos herunter, die du behalten darfst, und beachte die Nutzungsbedingungen jeder Seite.",
	},
};
