import type { Messages } from "./en";

export const fr: Messages = {
	language: {
		label: "Langue",
	},
	nav: {
		features: "Comment ça marche",
		setup: "Premier lancement",
		download: "Télécharger",
		menu: "Menu",
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
		whatsNew: "Nouveau : le navigateur intégré",
		tagline: "Collez un lien. Gardez la vidéo.",
		subtitle:
			"Snatch enregistre sur votre Mac les vidéos de YouTube, X, TikTok, Instagram, Bilibili et 1 800 autres sites, en MP4 ou MP3. Toute autre page, ouvrez-la dans le navigateur intégré et enregistrez ce qu’elle lit.",
		download: "Télécharger pour Mac",
		requirements: "Gratuit, pour macOS 14 ou ultérieur sur Apple silicon.",
		unsignedNote: "Version non signée : macOS vous demande de confirmer une fois.",
		closingTitle: "Collez votre premier lien.",
		stepsToggle: "Voir les étapes",
		source: "Code source sur GitHub",
		waysTitle: "Deux façons d’enregistrer une vidéo",
		ways: [
			{
				title: "Collez un lien",
				body: "Pour YouTube, X, TikTok, Instagram, Bilibili et les autres sites que yt-dlp connaît. Snatch propose toutes les résolutions disponibles, plus le MP3.",
			},
			{
				title: "Ouvrez la page",
				body: "Pour tout le reste. Ouvrez la page dans Snatch et lancez la vidéo. Snatch repère le flux et l’enregistre, connecté comme vous.",
			},
		],
		featuresTitle: "Les détails",
		features: [
			{
				title: "Du MP4 lisible partout",
				body: "La vidéo est enregistrée en H.264 et AAC, donc elle s’ouvre dans QuickTime et sur iPhone. Ou gardez seulement le son, en MP3.",
			},
			{
				title: "Pause, fermeture, reprise",
				body: "Deux téléchargements tournent en même temps. Mettez-en un en pause ou quittez Snatch, et il reprend là où il s’était arrêté.",
			},
			{
				title: "Vos connexions",
				body: "Les vidéos visibles seulement par votre compte se téléchargent aussi. Connectez-vous dans le navigateur intégré, ou laissez Snatch utiliser Safari, Chrome ou Firefox.",
			},
			{
				title: "Rien ne quitte votre Mac",
				body: "La vidéo va directement du site à votre dossier Téléchargements. Pas de serveur Snatch, pas de compte, pas de pistage.",
			},
			{
				title: "Open source",
				body: "Sous licence MIT, sur GitHub. yt-dlp, le moteur sous le capot, est mis à jour chaque jour pour suivre les changements des sites.",
			},
			{
				title: "Ce qu’il ne peut pas enregistrer",
				body: "Les flux protégés contre la copie, comme Netflix ou Disney+, restent chiffrés. Snatch vous prévient quand une page en utilise.",
			},
		],
		firstOpenTitle: "Ouvrir Snatch pour la première fois",
		firstOpenIntro:
			"Snatch est gratuit et n’est pas notarié par Apple, donc macOS vous demande une confirmation, une seule fois.",
		firstOpenSteps: [
			"Ouvrez Snatch.dmg et glissez Snatch dans Applications.",
			"Ouvrez Snatch. Quand macOS indique qu’il ne peut pas le vérifier, cliquez sur « Terminé ».",
			"Dans Réglages Système → Confidentialité et sécurité, cliquez sur « Ouvrir quand même ».",
			"Snatch propose d’installer yt-dlp, environ 55 Mo. Au premier enregistrement d’une vidéo, il propose aussi ffmpeg.",
		],
		legal:
			"Ne téléchargez que les vidéos que vous avez le droit de conserver, et respectez les conditions de chaque site.",
	},
};
