import type { Messages } from "./en";

export const it: Messages = {
	language: {
		label: "Lingua",
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
		h1Suffix: "— downloader di video gratuito per Mac",
		tagline: "Scarica qualsiasi video sul tuo Mac.",
		subtitle:
			"Incolla un link da YouTube, X, TikTok, Instagram, Bilibili o migliaia di altri siti, e Snatch lo salva in MP4 o MP3. Gratuito e open source.",
		download: "Scarica per Mac",
		requirements: "macOS 14 o successivo · Apple silicon",
		source: "Codice sorgente su GitHub",
		featuresTitle: "Cosa fa Snatch",
		features: [
			{
				title: "Migliaia di siti",
				body: "Basato su yt-dlp, che riconosce oltre 1.800 siti e si aggiorna da solo quando cambiano.",
			},
			{
				title: "Scegli tu la qualità",
				body: "Ogni risoluzione disponibile, salvata in un MP4 che si riproduce ovunque, oppure solo l'audio in MP3.",
			},
			{
				title: "Metti in pausa e riprendi",
				body: "Metti in coda tutti i link che vuoi. Sospendi qualsiasi download e riprendilo più tardi, anche dopo aver chiuso l'app.",
			},
			{
				title: "Video che richiedono l'accesso",
				body: "Consenti a Snatch di usare i cookie di Safari, Chrome o Firefox per i video visibili solo al tuo account.",
			},
			{
				title: "Funziona sul tuo Mac",
				body: "I download vanno direttamente dal sito alla tua cartella Download. Nessun server intermedio, nulla viene caricato.",
			},
			{
				title: "Gratuito e open source",
				body: "Licenza MIT. Nessun account, nessuna pubblicità, nessun tracciamento nell'app.",
			},
		],
		firstOpenTitle: "Aprire Snatch per la prima volta",
		firstOpenBody:
			"Snatch è gratuito e non è autenticato da Apple, quindi macOS blocca il primo avvio. Trascina Snatch in Applicazioni e aprilo una volta, poi vai in Impostazioni di Sistema → Privacy e sicurezza e fai clic su “Apri comunque”. Poi Snatch ti chiede di installare yt-dlp e, quando salvi il primo video, ffmpeg: circa 110 MB in tutto.",
		legal:
			"Scarica solo i video che hai il diritto di conservare e rispetta le condizioni di ogni sito.",
	},
};
