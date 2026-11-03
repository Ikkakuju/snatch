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
		whatsNew: "Novedad: el navegador integrado",
		tagline: "Pega un enlace. Quédate el vídeo.",
		subtitle:
			"Snatch guarda en tu Mac vídeos de YouTube, X, TikTok, Instagram, Bilibili y otros 1800 sitios, en MP4 o MP3. Cualquier otra página, ábrela en el navegador integrado y guarda lo que reproduce.",
		download: "Descargar para Mac",
		requirements: "Gratis, para macOS 14 o posterior con Apple silicon.",
		unsignedNote: "Compilación sin firmar: macOS te pide confirmarlo una vez.",
		closingTitle: "Pega tu primer enlace.",
		stepsToggle: "Ver los pasos",
		source: "Código fuente en GitHub",
		waysTitle: "Dos formas de guardar un vídeo",
		ways: [
			{
				title: "Pega un enlace",
				body: "Para YouTube, X, TikTok, Instagram, Bilibili y los demás sitios que conoce yt-dlp. Snatch muestra todas las resoluciones del vídeo, y además MP3.",
			},
			{
				title: "Abre la página",
				body: "Para todo lo demás. Abre la página dentro de Snatch y reproduce el vídeo. Snatch detecta el stream y lo guarda, con tu sesión iniciada.",
			},
		],
		featuresTitle: "Los detalles",
		features: [
			{
				title: "MP4 que se reproduce en todas partes",
				body: "El vídeo se guarda en H.264 y AAC, así que se abre en QuickTime y en el iPhone. O quédate solo con el audio, en MP3.",
			},
			{
				title: "Pausa, cierra y sigue después",
				body: "Se descargan dos vídeos a la vez. Pausa uno o cierra Snatch, y continúa donde se quedó.",
			},
			{
				title: "Tus sesiones",
				body: "También se descargan los vídeos que solo tu cuenta puede ver: inicia sesión en el navegador integrado o deja que Snatch use Safari, Chrome o Firefox.",
			},
			{
				title: "Nada sale de tu Mac",
				body: "El vídeo va directo del sitio a tu carpeta Descargas. Sin servidor de Snatch, sin cuenta, sin rastreo.",
			},
			{
				title: "Código abierto",
				body: "Licencia MIT, en GitHub. yt-dlp, el motor que hay debajo, se actualiza cada día a medida que cambian los sitios.",
			},
			{
				title: "Lo que no puede guardar",
				body: "Las emisiones con protección anticopia, como Netflix o Disney+, siguen cifradas. Snatch te avisa cuando una página las usa.",
			},
		],
		firstOpenTitle: "Abrir Snatch por primera vez",
		firstOpenIntro:
			"Snatch es gratis y no está notarizado por Apple, así que macOS te pide confirmarlo una vez.",
		firstOpenSteps: [
			"Abre Snatch.dmg y arrastra Snatch a Aplicaciones.",
			"Abre Snatch. Cuando macOS diga que no puede comprobarla, haz clic en «OK».",
			"En Ajustes del Sistema → Privacidad y seguridad, haz clic en «Abrir igualmente».",
			"Snatch te pide instalar yt-dlp, unos 55 MB. Al guardar tu primer vídeo, te pide también ffmpeg.",
		],
		legal:
			"Descarga solo vídeos que tengas derecho a conservar y respeta las condiciones de cada sitio.",
	},
};
