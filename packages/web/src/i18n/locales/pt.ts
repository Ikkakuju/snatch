import type { Messages } from "./en";

export const pt: Messages = {
	language: {
		label: "Idioma",
	},
	nav: {
		features: "Como funciona",
		setup: "Primeira execução",
		download: "Baixar",
		menu: "Menu",
	},
	errors: {
		generic: "Algo deu errado. Tente novamente.",
	},
	errorBoundary: {
		title: "Algo deu errado",
		retry: "Tentar novamente",
		reload: "Recarregar a página",
		details: "Detalhes do erro",
	},
	seo: {
		homeTitle: "Snatch – Baixador de vídeos grátis para Mac | snatchvideos",
		homeDescription:
			"Snatch é um app gratuito e de código aberto para Mac que baixa vídeos do YouTube, X, TikTok, Instagram, Bilibili e milhares de outros sites em MP4 ou MP3.",
	},
	home: {
		tagline: "Cole um link. Fique com o vídeo.",
		subtitle:
			"O Snatch salva no seu Mac vídeos do YouTube, X, TikTok, Instagram, Bilibili e de outros 1.800 sites, em MP4 ou MP3. Qualquer outra página, abra no navegador integrado e salve o que ela reproduz.",
		download: "Baixar para Mac",
		requirements: "Grátis, para macOS 14 ou posterior com Apple silicon.",
		source: "Código-fonte no GitHub",
		waysTitle: "Duas formas de salvar um vídeo",
		ways: [
			{
				title: "Cole um link",
				body: "Para YouTube, X, TikTok, Instagram, Bilibili e os outros sites que o yt-dlp conhece. O Snatch lista todas as resoluções do vídeo, além de MP3.",
			},
			{
				title: "Abra a página",
				body: "Para todo o resto. Abra a página dentro do Snatch e reproduza o vídeo. O Snatch detecta o stream e salva, com a sua conta já conectada.",
			},
		],
		featuresTitle: "Os detalhes",
		features: [
			{
				title: "MP4 que toca em qualquer lugar",
				body: "O vídeo é salvo em H.264 e AAC, então abre no QuickTime e no iPhone. Ou fique só com o áudio, em MP3.",
			},
			{
				title: "Pause, feche, continue depois",
				body: "Os downloads rodam dois de cada vez. Pause um ou feche o Snatch, e ele continua de onde parou.",
			},
			{
				title: "Suas contas",
				body: "Vídeos que só a sua conta vê também são baixados: entre no navegador integrado ou deixe o Snatch usar o Safari, Chrome ou Firefox.",
			},
			{
				title: "Nada sai do seu Mac",
				body: "O vídeo vai direto do site para a sua pasta Downloads. Sem servidor do Snatch, sem conta, sem rastreamento.",
			},
			{
				title: "Código aberto",
				body: "Licença MIT, no GitHub. O yt-dlp, o motor por trás, é atualizado todo dia conforme os sites mudam.",
			},
			{
				title: "O que ele não salva",
				body: "Streams com proteção contra cópia, como Netflix ou Disney+, continuam criptografados. O Snatch avisa quando uma página usa esse tipo de proteção.",
			},
		],
		firstOpenTitle: "Abrindo o Snatch pela primeira vez",
		firstOpenIntro:
			"O Snatch é grátis e não é notarizado pela Apple, por isso o macOS pede que você confirme uma vez.",
		firstOpenSteps: [
			"Abra o Snatch.dmg e arraste o Snatch para Aplicativos.",
			"Abra o Snatch. Quando o macOS disser que não consegue verificá-lo, clique em “OK”.",
			"Em Ajustes do Sistema → Privacidade e Segurança, clique em “Abrir Mesmo Assim”.",
			"O Snatch pede para instalar o yt-dlp, cerca de 55 MB. Ao salvar o primeiro vídeo, pede também o ffmpeg.",
		],
		legal:
			"Baixe apenas vídeos que você tem o direito de guardar e respeite os termos de cada site.",
	},
};
