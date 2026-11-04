import type { Messages } from "./en";

export const es: Messages = {
	language: {
		label: "Idioma",
	},
	nav: {
		features: "Cómo funciona",
		setup: "Primer inicio",
		download: "Descargar",
		menu: "Menú",
		skip: "Saltar al contenido",
		issues: "Problemas",
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
			"Snatch es una app gratuita y de código abierto para Mac que descarga vídeos de YouTube, X, TikTok, Instagram, Bilibili y 1,800 sitios más en MP4 o MP3.",
	},
	home: {
		whatsNew: "Novedad: el navegador integrado",
		tagline: "Pega un enlace. Quédate el vídeo.",
		subtitle:
			"Snatch guarda en tu Mac vídeos de YouTube, X, TikTok, Instagram, Bilibili y otros 1800 sitios, en MP4 o MP3.",
		download: "Descargar para Mac",
		requirements: "Gratis, para macOS 14 o posterior con Apple Silicon.",
		unsignedNote:
			"Compilación sin firmar: macOS te pedirá confirmación la primera vez que la abras.",
		closingTitle: "Pega tu primer enlace.",
		stepsToggle: "Ver los pasos",
		source: "Código fuente en GitHub",
		demo: {
			get: "Obtener",
			downloadVideo: "Descargar vídeo",
			stream: "Vídeo 1",
		},
		waysTitle: "Dos formas de guardar un vídeo",
		ways: [
			{
				title: "Pega un enlace",
				body: "Para YouTube, X, TikTok, Instagram, Bilibili y demás sitios compatibles con yt-dlp. Snatch muestra todas las resoluciones disponibles, además de extracción en MP3.",
			},
			{
				title: "Abre la página",
				body: "Para todo lo demás. Abre la página dentro de Snatch y reproduce el vídeo. Snatch detectará la transmisión y la guardará con tu sesión actual iniciada.",
			},
		],
		featuresTitle: "Los detalles",
		features: [
			{
				title: "MP4 que se reproduce en todas partes",
				body: "El vídeo se guarda en H.264 y AAC, así que se abre directamente en QuickTime y en el iPhone. O quédate solo con el audio, en MP3.",
			},
			{
				title: "Pausa, cierra y sigue después",
				body: "Se descargan varios vídeos a la vez. Pausa una descarga o cierra Snatch, y continuará exactamente desde donde se quedó.",
			},
			{
				title: "Mantén tus sesiones",
				body: "También se pueden descargar vídeos accesibles solo con tu cuenta: inicia sesión en el navegador integrado o permite que Snatch use las sesiones de Safari, Chrome o Firefox.",
			},
			{
				title: "Nada sale de tu Mac",
				body: "El vídeo va directo del sitio web a tu carpeta Descargas. Sin servidores intermediarios de Snatch, sin registro de cuenta y sin rastreo.",
			},
			{
				title: "Totalmente de código abierto",
				body: "Licencia MIT, en GitHub. yt-dlp, el motor interno, se actualiza a diario para adaptarse a los cambios de cada sitio web.",
			},
			{
				title: "Contenido no admitido",
				body: "Las transmisiones protegidas por DRM anticopia (como Netflix o Disney+) permanecen cifradas y no se pueden guardar. Snatch te avisará cuando una página las utilice.",
			},
		],
		firstOpenIntro:
			"Snatch es gratis y no está notarizado por Apple, así que macOS te pide confirmarlo una vez.",
		firstOpenSteps: [
			"Abre Snatch.dmg y arrastra Snatch a la carpeta Aplicaciones.",
			"Abre Snatch. Cuando macOS diga que no puede comprobarla, haz clic en «OK».",
			"En Ajustes del Sistema → Privacidad y seguridad, haz clic en «Abrir igualmente».",
			"Snatch te pedirá instalar yt-dlp (unos 55 MB). Al guardar tu primer vídeo, también te pedirá instalar ffmpeg.",
		],
		legal:
			"Descarga solo vídeos que tengas derecho a conservar y respeta las condiciones de cada sitio.",
	},
};
