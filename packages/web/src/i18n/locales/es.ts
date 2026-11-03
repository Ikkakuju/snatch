import type { Messages } from "./en";

export const es: Messages = {
	language: {
		label: "Idioma",
	},
	errors: {
		generic: "Algo salió mal. Inténtalo de nuevo.",
	},
	errorBoundary: {
		title: "Algo ha ido mal",
		retry: "Reintentar",
		reload: "Recargar la página",
		details: "Detalles del error",
	},
	seo: {
		homeTitle: "Snatch – Descargador de vídeos gratis para Mac | snatchvideos",
		homeDescription:
			"Snatch es una app gratuita y de código abierto para Mac que descarga vídeos de YouTube, X, TikTok, Instagram, Bilibili y miles de sitios más en MP4 o MP3.",
	},
	home: {
		h1Suffix: "— descargador de vídeos gratis para Mac",
		tagline: "Descarga cualquier vídeo en tu Mac.",
		subtitle:
			"Pega un enlace de YouTube, X, TikTok, Instagram, Bilibili o miles de sitios más, y Snatch lo guarda en MP4 o MP3. Gratis y de código abierto.",
		download: "Descargar para Mac",
		requirements: "macOS 14 o posterior · Apple silicon",
		source: "Código fuente en GitHub",
		featuresTitle: "Qué hace Snatch",
		features: [
			{
				title: "Miles de sitios",
				body: "Funciona con yt-dlp, que reconoce más de 1800 sitios y se actualiza solo cuando estos cambian.",
			},
			{
				title: "Tú eliges la calidad",
				body: "Todas las resoluciones que ofrezca el vídeo, en un MP4 que se reproduce en cualquier parte, o solo el audio en MP3.",
			},
			{
				title: "Pausa y reanuda",
				body: "Pon en cola todos los enlaces que quieras. Pausa cualquier descarga y retómala más tarde, incluso después de cerrar la app.",
			},
			{
				title: "Vídeos que requieren iniciar sesión",
				body: "Deja que Snatch use las cookies de Safari, Chrome o Firefox para los vídeos que solo tu cuenta puede ver.",
			},
			{
				title: "Funciona en tu Mac",
				body: "Las descargas van directamente del sitio a tu carpeta Descargas. Sin servidores de por medio, sin subir nada.",
			},
			{
				title: "Gratis y de código abierto",
				body: "Licencia MIT. Sin cuenta, sin anuncios y sin rastreo en la app.",
			},
		],
		firstOpenTitle: "Abrir Snatch por primera vez",
		firstOpenBody:
			"Snatch es gratis y no está notarizado por Apple, así que macOS bloquea el primer arranque. Arrastra Snatch a Aplicaciones y ábrelo una vez; después ve a Ajustes del Sistema → Privacidad y seguridad y haz clic en «Abrir igualmente». Después, Snatch te pide instalar yt-dlp y, al guardar tu primer vídeo, ffmpeg: unos 110 MB en total.",
		legal:
			"Descarga solo vídeos que tengas derecho a conservar y respeta las condiciones de cada sitio.",
	},
};
