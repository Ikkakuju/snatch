import type { Messages } from "./en";

export const ja: Messages = {
	language: {
		label: "言語",
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
		h1Suffix: "— Mac用の無料動画ダウンローダー",
		tagline: "どんな動画もMacに保存。",
		subtitle:
			"YouTube、X、TikTok、Instagram、Bilibiliなど数千のサイトのリンクを貼り付けるだけで、SnatchがMP4またはMP3で保存します。無料でオープンソースです。",
		download: "Mac版をダウンロード",
		requirements: "macOS 14以降 · Appleシリコン搭載Mac",
		source: "GitHubでソースコードを見る",
		featuresTitle: "Snatchでできること",
		features: [
			{
				title: "数千のサイトに対応",
				body: "1,800以上のサイトに対応するyt-dlpを採用。サイトの仕様が変わっても自動でアップデートされます。",
			},
			{
				title: "画質を自由に選べる",
				body: "動画が提供するすべての解像度から選んで、どこでも再生できるMP4で保存。音声だけをMP3で保存することもできます。",
			},
			{
				title: "一時停止と再開",
				body: "リンクはいくつでもキューに追加できます。ダウンロードはいつでも一時停止でき、アプリを終了した後でも再開できます。",
			},
			{
				title: "ログインが必要な動画にも",
				body: "Safari、Chrome、FirefoxのCookieをSnatchに使わせれば、自分のアカウントでしか見られない動画も保存できます。",
			},
			{
				title: "Mac上で完結",
				body: "サイトから「ダウンロード」フォルダへ直接保存。間にサーバを挟まず、何もアップロードしません。",
			},
			{
				title: "無料でオープンソース",
				body: "MITライセンス。アカウント不要、広告なし、アプリ内のトラッキングもありません。",
			},
		],
		firstOpenTitle: "Snatchを初めて開くとき",
		firstOpenBody:
			"Snatchは無料で、Appleの公証を受けていないため、初回起動時にmacOSがブロックします。Snatchを「アプリケーション」にドラッグして一度開いてから、システム設定 → プライバシーとセキュリティで「このまま開く」をクリックしてください。その後、Snatchがyt-dlpのインストールを、最初に動画を保存するときにffmpegのインストールを確認します（合計約110 MB）。",
		legal: "保存する権利のある動画だけをダウンロードし、各サイトの利用規約を守ってください。",
	},
};
