import type { Messages } from "./en";

export const pt: Messages = {
	language: {
		label: "Idioma",
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
		h1Suffix: "— baixador de vídeos grátis para Mac",
		tagline: "Baixe qualquer vídeo no seu Mac.",
		subtitle:
			"Cole um link do YouTube, X, TikTok, Instagram, Bilibili ou de milhares de outros sites, e o Snatch salva em MP4 ou MP3. Grátis e de código aberto.",
		download: "Baixar para Mac",
		requirements: "macOS 14 ou posterior · Apple silicon",
		source: "Código-fonte no GitHub",
		featuresTitle: "O que o Snatch faz",
		features: [
			{
				title: "Milhares de sites",
				body: "Feito com o yt-dlp, que reconhece mais de 1.800 sites e se atualiza sozinho quando eles mudam.",
			},
			{
				title: "Você escolhe a qualidade",
				body: "Todas as resoluções que o vídeo oferece, em um MP4 que roda em qualquer lugar, ou só o áudio em MP3.",
			},
			{
				title: "Pause e retome",
				body: "Coloque quantos links quiser na fila. Pause qualquer download e continue depois, mesmo após fechar o app.",
			},
			{
				title: "Vídeos que exigem login",
				body: "Deixe o Snatch usar os cookies do Safari, Chrome ou Firefox para vídeos que só a sua conta pode ver.",
			},
			{
				title: "Roda no seu Mac",
				body: "Os downloads vão direto do site para a sua pasta Downloads. Sem servidor no meio, nada é enviado.",
			},
			{
				title: "Grátis e de código aberto",
				body: "Licença MIT. Sem conta, sem anúncios, sem rastreamento no app.",
			},
		],
		firstOpenTitle: "Abrindo o Snatch pela primeira vez",
		firstOpenBody:
			"O Snatch é grátis e não é notarizado pela Apple, por isso o macOS bloqueia a primeira abertura. Arraste o Snatch para Aplicativos e abra-o uma vez; depois vá em Ajustes do Sistema → Privacidade e Segurança e clique em “Abrir Mesmo Assim”. Depois, o Snatch pede para instalar o yt-dlp e, ao salvar o primeiro vídeo, o ffmpeg: cerca de 110 MB no total.",
		legal:
			"Baixe apenas vídeos que você tem o direito de guardar e respeite os termos de cada site.",
	},
};
