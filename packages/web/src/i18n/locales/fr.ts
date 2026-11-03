import type { Messages } from "./en";

export const fr: Messages = {
	language: {
		label: "Langue",
	},
	errors: {
		generic: "Une erreur est survenue. Réessayez.",
	},
	errorBoundary: {
		title: "Une erreur est survenue",
		retry: "Réessayer",
		reload: "Recharger la page",
		details: "Détails de l'erreur",
	},
	seo: {
		homeTitle: "Snatch – Téléchargeur de vidéos gratuit pour Mac | snatchvideos",
		homeDescription:
			"Snatch est une app Mac gratuite et open source qui télécharge les vidéos de YouTube, X, TikTok, Instagram, Bilibili et de milliers d'autres sites en MP4 ou MP3.",
	},
	home: {
		h1Suffix: "— le téléchargeur de vidéos gratuit pour Mac",
		tagline: "Téléchargez n'importe quelle vidéo sur votre Mac.",
		subtitle:
			"Collez un lien YouTube, X, TikTok, Instagram, Bilibili ou de milliers d'autres sites, et Snatch l'enregistre en MP4 ou MP3. Gratuit et open source.",
		download: "Télécharger pour Mac",
		requirements: "macOS 14 ou ultérieur · Apple silicon",
		source: "Code source sur GitHub",
		featuresTitle: "Ce que fait Snatch",
		features: [
			{
				title: "Des milliers de sites",
				body: "Basé sur yt-dlp, qui reconnaît plus de 1 800 sites et se met à jour tout seul quand ils changent.",
			},
			{
				title: "La qualité de votre choix",
				body: "Toutes les résolutions proposées par la vidéo, en MP4 lisible partout, ou seulement l'audio en MP3.",
			},
			{
				title: "Pause et reprise",
				body: "Ajoutez autant de liens que vous voulez. Mettez un téléchargement en pause et reprenez-le plus tard, même après avoir quitté l'app.",
			},
			{
				title: "Vidéos réservées aux comptes connectés",
				body: "Laissez Snatch utiliser vos cookies Safari, Chrome ou Firefox pour les vidéos que seul votre compte peut voir.",
			},
			{
				title: "Tout se passe sur votre Mac",
				body: "Les vidéos vont directement du site à votre dossier Téléchargements. Aucun serveur intermédiaire, rien n'est envoyé.",
			},
			{
				title: "Gratuit et open source",
				body: "Sous licence MIT. Pas de compte, pas de pub, aucun pistage dans l'app.",
			},
		],
		firstOpenTitle: "Ouvrir Snatch pour la première fois",
		firstOpenBody:
			"Snatch est gratuit et n'est pas notarié par Apple, donc macOS bloque le premier lancement. Glissez Snatch dans Applications et ouvrez-le une fois, puis allez dans Réglages Système → Confidentialité et sécurité et cliquez sur « Ouvrir quand même ». Snatch vous propose ensuite d’installer yt-dlp, puis ffmpeg au premier enregistrement d’une vidéo, soit environ 110 Mo au total.",
		legal:
			"Ne téléchargez que les vidéos que vous avez le droit de conserver, et respectez les conditions de chaque site.",
	},
};
