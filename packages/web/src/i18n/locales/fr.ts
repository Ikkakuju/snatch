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
		skip: "Aller au contenu",
		issues: "Problèmes",
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
			"Snatch est une app Mac gratuite et open source qui télécharge les vidéos de YouTube, X, TikTok, Instagram, Bilibili et de 1 800 autres sites en MP4 ou MP3.",
	},
	home: {
		whatsNew: "Nouveau : le navigateur intégré",
		tagline: "Collez un lien. Gardez la vidéo.",
		subtitle:
			"Snatch enregistre sur votre Mac les vidéos de YouTube, X, TikTok, Instagram, Bilibili et 1 800 autres sites, en MP4 ou MP3.",
		download: "Télécharger pour Mac",
		requirements: "Gratuit, pour macOS 14 ou ultérieur sur Apple Silicon.",
		unsignedNote:
			"Version non signée : macOS vous demande une confirmation lors de la première ouverture.",
		closingTitle: "Collez votre premier lien.",
		stepsToggle: "Voir les étapes",
		source: "Code source sur GitHub",
		demo: {
			get: "Obtenir",
			downloadVideo: "Télécharger la vidéo",
			stream: "Vidéo 1",
		},
		waysTitle: "Deux façons d’enregistrer une vidéo",
		ways: [
			{
				title: "Collez un lien",
				body: "Pour YouTube, X, TikTok, Instagram, Bilibili et tous les autres sites pris en charge par yt-dlp. Snatch propose toutes les résolutions disponibles, ainsi que l’extraction en MP3.",
			},
			{
				title: "Ouvrez la page",
				body: "Pour tout le reste. Ouvrez la page dans Snatch et lancez la vidéo. Snatch repère le flux et l’enregistre en direct, avec votre session connectée.",
			},
		],
		featuresTitle: "Les détails",
		features: [
			{
				title: "Du MP4 lisible partout",
				body: "La vidéo est enregistrée en H.264 et AAC, donc elle s’ouvre directement dans QuickTime et sur iPhone. Ou gardez seulement le son, en MP3.",
			},
			{
				title: "Pause, fermeture, reprise",
				body: "Plusieurs téléchargements s’exécutent en même temps. Mettez-en un en pause ou quittez Snatch : il reprendra exactement là où il s’était arrêté.",
			},
			{
				title: "Conservez vos connexions",
				body: "Les vidéos réservées à votre compte se téléchargent aussi : connectez-vous dans le navigateur intégré, ou autorisez Snatch à utiliser les sessions de Safari, Chrome ou Firefox.",
			},
			{
				title: "Rien ne quitte votre Mac",
				body: "La vidéo va directement du site vers votre dossier Téléchargements. Aucun serveur tiers Snatch, aucun compte à créer, aucun pistage.",
			},
			{
				title: "Totalement open source",
				body: "Sous licence MIT, sur GitHub. yt-dlp, le moteur sous le capot, est mis à jour chaque jour pour suivre les évolutions des sites.",
			},
			{
				title: "Contenus protégés non pris en charge",
				body: "Les flux protégés par DRM (comme Netflix ou Disney+) restent chiffrés et ne peuvent pas être enregistrés. Snatch vous prévient lorsqu’une page utilise cette protection.",
			},
		],
		firstOpenIntro:
			"Snatch est gratuit et n’est pas notarié par Apple, donc macOS vous demande une confirmation lors de la première ouverture.",
		firstOpenSteps: [
			"Ouvrez Snatch.dmg et glissez Snatch dans le dossier Applications.",
			"Ouvrez Snatch. Quand macOS indique qu’il ne peut pas vérifier le développeur, cliquez sur « Terminé ».",
			"Dans Réglages Système → Confidentialité et sécurité, cliquez sur « Ouvrir quand même ».",
			"Snatch propose d’installer yt-dlp (environ 55 Mo). Lors du premier téléchargement, il propose aussi d’installer ffmpeg.",
		],
		legal:
			"Ne téléchargez que les vidéos que vous avez le droit de conserver, et respectez les conditions de chaque site.",
	},
};
