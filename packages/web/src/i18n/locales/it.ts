import type { Messages } from "./en";

export const it: Messages = {
	language: {
		label: "Lingua",
	},
	nav: {
		features: "Come funziona",
		setup: "Primo avvio",
		download: "Scarica",
		menu: "Menu",
	},
	errors: {
		generic: "Qualcosa è andato storto. Riprova.",
	},
	errorBoundary: {
		title: "Qualcosa è andato storto",
		retry: "Riprova",
		reload: "Ricarica la pagina",
		details: "Dettagli dell'errore",
	},
	seo: {
		homeTitle: "Snatch – Downloader di video gratuito per Mac | snatchvideos",
		homeDescription:
			"Snatch è un'app per Mac gratuita e open source che scarica video da YouTube, X, TikTok, Instagram, Bilibili e migliaia di altri siti in MP4 o MP3.",
	},
	home: {
		whatsNew: "Novità: il browser integrato",
		tagline: "Incolla un link. Tieni il video.",
		subtitle:
			"Snatch salva sul tuo Mac i video di YouTube, X, TikTok, Instagram, Bilibili e altri 1.800 siti, in MP4 o MP3. Qualsiasi altra pagina, aprila nel browser integrato e salva ciò che riproduce.",
		download: "Scarica per Mac",
		requirements: "Gratis, per macOS 14 o successivo su Apple silicon.",
		unsignedNote: "Build non firmato: macOS chiede conferma una volta.",
		closingTitle: "Incolla il tuo primo link.",
		stepsToggle: "Mostra i passaggi",
		source: "Codice sorgente su GitHub",
		waysTitle: "Due modi per salvare un video",
		ways: [
			{
				title: "Incolla un link",
				body: "Per YouTube, X, TikTok, Instagram, Bilibili e gli altri siti che yt-dlp conosce. Snatch elenca tutte le risoluzioni disponibili, più l’MP3.",
			},
			{
				title: "Apri la pagina",
				body: "Per tutto il resto. Apri la pagina dentro Snatch e avvia il video. Snatch individua lo stream e lo salva, con il tuo stesso accesso.",
			},
		],
		featuresTitle: "I dettagli",
		features: [
			{
				title: "MP4 che si apre ovunque",
				body: "Il video viene salvato in H.264 e AAC, quindi si apre in QuickTime e su iPhone. Oppure tieni solo l’audio, in MP3.",
			},
			{
				title: "Metti in pausa, esci, riprendi",
				body: "I download procedono due alla volta. Mettine in pausa uno o esci da Snatch: riparte da dove si era fermato.",
			},
			{
				title: "I tuoi accessi",
				body: "Si scaricano anche i video che solo il tuo account può vedere: accedi nel browser integrato o lascia che Snatch usi Safari, Chrome o Firefox.",
			},
			{
				title: "Niente lascia il tuo Mac",
				body: "Il video va dritto dal sito alla cartella Download. Nessun server Snatch, nessun account, nessun tracciamento.",
			},
			{
				title: "Open source",
				body: "Licenza MIT, su GitHub. yt-dlp, il motore sottostante, si aggiorna ogni giorno man mano che i siti cambiano.",
			},
			{
				title: "Cosa non può salvare",
				body: "Gli stream protetti da copia, come Netflix o Disney+, restano cifrati. Snatch ti avvisa quando una pagina li usa.",
			},
		],
		firstOpenTitle: "Aprire Snatch per la prima volta",
		firstOpenIntro:
			"Snatch è gratuito e non è autenticato da Apple, quindi macOS ti chiede di confermarlo una volta.",
		firstOpenSteps: [
			"Apri Snatch.dmg e trascina Snatch in Applicazioni.",
			"Apri Snatch. Quando macOS dice che non può verificarlo, fai clic su “Fine”.",
			"In Impostazioni di Sistema → Privacy e sicurezza, fai clic su “Apri comunque”.",
			"Snatch chiede di installare yt-dlp, circa 55 MB. Quando salvi il primo video, chiede anche ffmpeg.",
		],
		legal:
			"Scarica solo i video che hai il diritto di conservare e rispetta le condizioni di ogni sito.",
	},
};
