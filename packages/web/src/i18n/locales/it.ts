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
		skip: "Vai al contenuto",
		issues: "Problemi",
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
			"Snatch è un'app per Mac gratuita e open source che scarica video da YouTube, X, TikTok, Instagram, Bilibili e altri 1.800 siti in MP4 o MP3.",
	},
	home: {
		whatsNew: "Novità: il browser integrato",
		tagline: "Incolla un link. Tieni il video.",
		subtitle:
			"Snatch salva sul tuo Mac i video di YouTube, X, TikTok, Instagram, Bilibili e altri 1.800 siti, in MP4 o MP3.",
		download: "Scarica per Mac",
		requirements: "Gratis, per macOS 14 o successivo su Apple Silicon.",
		unsignedNote: "Build non firmata: macOS richiederà una conferma al primo avvio.",
		closingTitle: "Incolla il tuo primo link.",
		stepsToggle: "Mostra i passaggi",
		source: "Codice sorgente su GitHub",
		demo: {
			get: "Scarica",
			downloadVideo: "Scarica video",
			stream: "Video 1",
		},
		waysTitle: "Due modi per salvare un video",
		ways: [
			{
				title: "Incolla un link",
				body: "Per YouTube, X, TikTok, Instagram, Bilibili e tutti gli altri siti supportati da yt-dlp. Snatch mostra tutte le risoluzioni disponibili, oltre all’estrazione audio in MP3.",
			},
			{
				title: "Apri la pagina",
				body: "Per qualsiasi altro sito. Apri la pagina dentro Snatch e avvia il video. Snatch individua lo stream e lo scarica mantenendo la tua sessione di accesso.",
			},
		],
		featuresTitle: "I dettagli",
		features: [
			{
				title: "MP4 che si apre ovunque",
				body: "Il video viene salvato in H.264 e AAC, quindi si apre direttamente in QuickTime e su iPhone. Oppure tieni solo l’audio, in MP3.",
			},
			{
				title: "Metti in pausa, esci, riprendi",
				body: "Più download procedono alla volta. Mettine uno in pausa o chiudi Snatch: la procedura riprenderà esattamente da dove si era interrotta.",
			},
			{
				title: "Mantieni i tuoi accessi",
				body: "Scarica anche i video visibili solo con il tuo account: accedi nel browser integrato o consenti a Snatch di utilizzare le sessioni di Safari, Chrome o Firefox.",
			},
			{
				title: "Niente lascia il tuo Mac",
				body: "I video vengono scaricati direttamente dal sito alla tua cartella Download. Nessun server Snatch intermedio, nessun account richiesto, nessun tracciamento.",
			},
			{
				title: "Totalmente open source",
				body: "Licenza MIT, su GitHub. yt-dlp, il motore sottostante, si aggiorna quotidianamente per adeguarsi alle modifiche dei siti.",
			},
			{
				title: "Contenuti non supportati",
				body: "Gli stream protetti da DRM anticopia (come Netflix o Disney+) restano cifrati e non possono essere salvati. Snatch ti avvisa quando una pagina li utilizza.",
			},
		],
		firstOpenIntro:
			"Snatch è gratuito e non è autenticato da Apple, quindi macOS ti chiede di confermarlo una volta.",
		firstOpenSteps: [
			"Apri Snatch.dmg e trascina Snatch nella cartella Applicazioni.",
			"Apri Snatch. Quando macOS dice che non può verificarlo, fai clic su “Fine”.",
			"In Impostazioni di Sistema → Privacy e sicurezza, fai clic su “Apri comunque”.",
			"Snatch chiede di installare yt-dlp, circa 55 MB. Quando salvi il primo video, chiede anche ffmpeg.",
		],
		legal:
			"Scarica solo i video che hai il diritto di conservare e rispetta le condizioni di ogni sito.",
	},
};
