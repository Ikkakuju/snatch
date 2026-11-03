import type { Messages } from "./en";

export const ja: Messages = {
	language: {
		label: "言語",
	},
	nav: {
		features: "使い方",
		setup: "初回起動",
		download: "ダウンロード",
		menu: "メニュー",
	},
	errors: {
		generic: "問題が発生しました。もう一度お試しください。",
	},
	errorBoundary: {
		title: "問題が発生しました",
		retry: "再試行",
		reload: "ページを再読み込み",
		details: "エラーの詳細",
	},
	seo: {
		homeTitle: "Snatch – Mac用の無料動画ダウンローダー | snatchvideos",
		homeDescription:
			"Snatchは、YouTube、X、TikTok、Instagram、Bilibiliなど数千のサイトから動画をMP4またはMP3で保存できる、無料・オープンソースのMacアプリです。",
	},
	home: {
		tagline: "リンクを貼るだけで、動画を手元に。",
		subtitle:
			"Snatchは、YouTube、X、TikTok、Instagram、Bilibiliほか1,800のサイトの動画を、MP4またはMP3でMacに保存します。それ以外のページも、内蔵ブラウザで開けば再生中の動画を保存できます。",
		download: "Mac版をダウンロード",
		requirements: "無料。Apple silicon搭載のmacOS 14以降に対応。",
		source: "GitHubでソースコードを見る",
		waysTitle: "動画を保存する2つの方法",
		ways: [
			{
				title: "リンクを貼る",
				body: "YouTube、X、TikTok、Instagram、Bilibiliなど、yt-dlpが対応するサイト向け。動画のすべての解像度とMP3から選べます。",
			},
			{
				title: "ページを開く",
				body: "それ以外のサイト向け。Snatchの中でページを開いて動画を再生すると、Snatchがストリームを見つけて保存します。ログイン状態もそのままです。",
			},
		],
		featuresTitle: "詳しく",
		features: [
			{
				title: "どこでも再生できるMP4",
				body: "動画はH.264とAACで保存されるので、QuickTimeでもiPhoneでも開けます。音声だけをMP3で保存することもできます。",
			},
			{
				title: "一時停止しても、終了しても続きから",
				body: "ダウンロードは2本ずつ進みます。一時停止しても、Snatchを終了しても、止まったところから再開します。",
			},
			{
				title: "ログインしたまま",
				body: "自分のアカウントでしか見られない動画もダウンロードできます。内蔵ブラウザでログインするか、SnatchにSafari、Chrome、Firefoxのログイン情報を使わせてください。",
			},
			{
				title: "Macの外には何も出ません",
				body: "動画はサイトから「ダウンロード」フォルダへ直接保存されます。Snatchのサーバーも、アカウントも、トラッキングもありません。",
			},
			{
				title: "オープンソース",
				body: "MITライセンスでGitHubに公開しています。中で動くyt-dlpは、サイトの変更に合わせて毎日更新されます。",
			},
			{
				title: "保存できないもの",
				body: "NetflixやDisney+などのコピー防止されたストリームは暗号化されたままです。ページがそれを使っているときは、Snatchがお知らせします。",
			},
		],
		firstOpenTitle: "Snatchを初めて開くとき",
		firstOpenIntro:
			"Snatchは無料で、Appleの公証を受けていないため、最初に一度だけmacOSで確認が必要です。",
		firstOpenSteps: [
			"Snatch.dmgを開き、Snatchを「アプリケーション」にドラッグします。",
			"Snatchを開きます。macOSが確認できないと表示したら、「完了」をクリックします。",
			"システム設定 → プライバシーとセキュリティで「このまま開く」をクリックします。",
			"Snatchがyt-dlp（約55 MB）のインストールを確認します。最初に動画を保存するときは、ffmpegのインストールも確認します。",
		],
		legal: "保存する権利のある動画だけをダウンロードし、各サイトの利用規約を守ってください。",
	},
};
