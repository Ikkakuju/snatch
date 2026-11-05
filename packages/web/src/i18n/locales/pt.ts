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
		skip: "Ir para o conteúdo",
		issues: "Problemas",
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
			"Snatch é um app gratuito e de código aberto para Mac que baixa vídeos do YouTube, X, TikTok, Instagram, Bilibili e de outros 1.800 sites em MP4 ou MP3.",
	},
	home: {
		whatsNew: "Novo: o navegador integrado",
		tagline: "Cole um link. Fique com o vídeo.",
		subtitle:
			"O Snatch salva no seu Mac vídeos do YouTube, X, TikTok, Instagram, Bilibili e de outros 1.800 sites, em MP4 ou MP3.",
		download: "Baixar para Mac",
		requirements: "Grátis, para macOS 14 ou posterior com Apple Silicon.",
		unsignedNote: "Versão não assinada: o macOS solicitará uma confirmação na primeira abertura.",
		closingTitle: "Cole o seu primeiro link.",
		stepsToggle: "Ver os passos",
		source: "Código-fonte no GitHub",
		demo: {
			get: "Obter",
			downloadVideo: "Baixar vídeo",
			stream: "Vídeo 1",
		},
		waysTitle: "Duas formas de salvar um vídeo",
		ways: [
			{
				title: "Cole um link",
				body: "Para YouTube, X, TikTok, Instagram, Bilibili e todos os outros sites compatíveis com o yt-dlp. O Snatch lista todas as resoluções do vídeo, além de extração em MP3.",
			},
			{
				title: "Abra a página",
				body: "Para todo o resto. Abra a página no Snatch e reproduza o vídeo. O Snatch detecta a transmissão e a salva, mantendo a sua sessão conectada.",
			},
		],
		featuresTitle: "Os detalhes",
		features: [
			{
				title: "MP4 que toca em qualquer lugar",
				body: "O vídeo é salvo em H.264 e AAC, então abre diretamente no QuickTime e no iPhone. Ou fique só com o áudio, em MP3.",
			},
			{
				title: "Pause, feche, continue depois",
				body: "Os downloads são executados em paralelo. Pause um download ou feche o Snatch, e ele continuará exatamente de onde parou.",
			},
			{
				title: "Mantenha suas sessões",
				body: "Vídeos exclusivos para sua conta também podem ser baixados: faça login no navegador integrado ou permita que o Snatch use as sessões do Safari, Chrome ou Firefox.",
			},
			{
				title: "Nada sai do seu Mac",
				body: "O vídeo vai direto do site para a sua pasta Downloads. Sem servidores intermediários do Snatch, sem cadastro de conta e sem rastreamento.",
			},
			{
				title: "Totalmente de código aberto",
				body: "Licença MIT, no GitHub. O motor yt-dlp é atualizado diariamente para acompanhar as mudanças de cada plataforma.",
			},
			{
				title: "Conteúdos não suportados",
				body: "Transmissões protegidas por DRM anticópia (como Netflix ou Disney+) continuam criptografadas e não podem ser salvas. O Snatch avisa quando uma página utiliza essa proteção.",
			},
		],
		firstOpenIntro:
			"O Snatch é grátis e não é notarizado pela Apple, por isso o macOS pede que você confirme uma vez.",
		firstOpenSteps: [
			"Abra o Snatch.dmg e arraste o Snatch para a pasta Aplicativos.",
			"Abra o Snatch. Quando o macOS disser que não consegue verificá-lo, clique em “OK”.",
			"Em Ajustes do Sistema → Privacidade e Segurança, clique em “Abrir Mesmo Assim”.",
			"O Snatch pedirá para instalar o yt-dlp (cerca de 55 MB). Ao salvar o primeiro vídeo, pedirá também o ffmpeg.",
		],
		legal:
			"Baixe apenas vídeos que você tem o direito de guardar e respeite os termos de cada site.",
	},
};
